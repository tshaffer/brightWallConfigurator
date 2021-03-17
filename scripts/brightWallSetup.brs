Function brightWallSetup_Initialize(msgPort As Object, userVariables As Object, o as Object)

  print "brightWallSetup_Initialize - entry"
  print "type of msgPort is ";type(msgPort)
  print "type of userVariables is ";type(userVariables)
  print "type of o is ";type(o)

  brightWallSetup = newBrightWallSetup(msgPort, userVariables, o)
  return brightWallSetup

End Function


Function newBrightWallSetup(msgPort As Object, userVariables As Object, o As Object)

  brightWallSetup = { }
  brightWallSetup.msgPort = msgPort
  brightWallSetup.userVariables = userVariables
  brightWallSetup.o = o
  brightWallSetup.htmlWidget = invalid

  brightWallSetup.handlersAdded = false
  brightWallSetup.o.brightSignsInWall = {}

  brightWallSetup.ProcessEvent = brightWallSetup_ProcessEvent

  return brightWallSetup

End Function


Sub GetBrightWallConfiguration(userData as object, e as object)

  mVar = userData.mVar
  globalAA = GetGlobalAA()

  config = {}

  config.AddReplace("brightSignAttributes", {})
  config.brightSignAttributes.AddReplace("serialNumber", mVar.sysInfo.deviceUniqueID$)
  config.brightSignAttributes.AddReplace("isBrightWall", true)
  
  config.AddReplace("brightWallConfiguration", {})

  if (config.brightSignAttributes.isBrightWall) then
    if IsBoolean(globalAA.registrySettings.sync_master) and IsTruthy(globalAA.registrySection.Read("sync_master")) then
      config.brightWallConfiguration.AddReplace("isMaster", true)
    else
      config.brightWallConfiguration.AddReplace("isMaster", false)
    endif

    if len(globalAA.registrySection.Read("videoWallRowIndex")) > 0 then
      config.brightWallConfiguration.AddReplace("rowIndex", int(val(globalAA.registrySection.Read("videoWallRowIndex"))))
    else
      config.brightWallConfiguration.AddReplace("rowIndex", -1)
    endif

    if len(globalAA.registrySection.Read("videoWallColumnIndex")) > 0 then
      config.brightWallConfiguration.AddReplace("columnIndex", int(val(globalAA.registrySection.Read("videoWallColumnIndex"))))
    else
      config.brightWallConfiguration.AddReplace("columnIndex", -1)
    endif

    config.brightWallConfiguration.AddReplace("numRows", 0)
    config.brightWallConfiguration.AddReplace("numColumns", 0)

  endif

  e.AddResponseHeader("Content-type", "application/json")
  e.SetResponseBodyString(FormatJson(config))
  e.SendResponse(200)

end sub


Sub GetIsBrightWall(userData as object, e as object)

  mVar = userData.mVar

  respBody = {}
  respBody.isBrightWall = true

  e.AddResponseHeader("Content-type", "application/json")
  e.SetResponseBodyString(FormatJson(respBody))
  e.SendResponse(200)

end sub


Sub GetIsBrightWallSyncMaster(userData as object, e as object)
  
  mVar = userData.mVar

  if not mVar.sign.isVideoWall then
    ' return error
    stop
  endif

  
  root = CreateObject("roXMLElement")
  root.SetName("BrightSignIsBrightWallSyncMaster")

  elem = root.AddElement("IsBrightWallSyncMaster")

  globalAA = GetGlobalAA()
  if IsBoolean(globalAA.registrySettings.sync_master) then
    elem.SetBody("true")
  else
    elem.SetBody("false")
  endif
  
  xml = root.GenXML({ indent: " ", newline: chr(10), header: true })
  
  e.AddResponseHeader("Content-type", "text/xml; charset=utf-8")
  e.SetResponseBodyString(xml)
  e.SendResponse(200)

end sub


Sub GetBrightWallDevices(userData as object, e as object)
  
  mVar = userData.mVar

  ' broadcast UDP message to local devices
  mVar.bwUdpSender.Send("getIsBrightWallDevice")

  resp = {}
  resp.AddReplace("success", true)

  e.AddResponseHeader("Content-type", "application/json")
  e.SetResponseBodyString(FormatJson(resp))
  e.SendResponse(200)

end sub


Sub GetBrightWallDeviceList(userData as object, e as object)
  
  mVar = userData.mVar
stop
  brightSignDevicesInWall = []
  for each serialNumber in mVar.brightSignsInWall
    brightSignDevicesInWall.push(serialNumber)
  next

  brightSignDevicesInWallList = {}
  brightSignDevicesInWallList.AddReplace("brightSignDevicesInWallList", brightSignDevicesInWall)

  e.AddResponseHeader("Content-type", "application/json")
  e.SetResponseBodyString(FormatJson(brightSignDevicesInWallList))
  e.SendResponse(200)

end sub


Sub SetBrightWallIsSyncMaster(userData as object, e as object)

  mVar = userData.mVar
  
  args = e.GetFormData()

  if not mVar.sign.isVideoWall then
    ' return error
    stop
  endif

  if not IsString(args["isSyncMaster"]) then
    ' return error
    stop
  endif

  isSyncMaster = IsTruthy(args["isSyncMaster"])
  
  if not IsBoolean(isSyncMaster) then
    ' return error
    stop
  endif

  globalAA = GetGlobalAA()

  globalAA.registrySettings.sync_master = isSyncMaster

  globalAA.registrySection.Write("sync_master", args["isSyncMaster"])
  globalAA.registrySection.Flush()

  if not e.SendResponse(200) then
    stop
  end if

end sub


Sub SetBrightWallPosition(userData as object, e as object)

  mVar = userData.mVar
  
  args = e.GetFormData()

  if not mVar.sign.isVideoWall then
    ' return error
    stop
  endif

  if not IsString(args["row"]) then
    ' return error
    stop
  endif

  if not IsString(args["column"]) then
    ' return error
    stop
  endif

  row% = int(val(args["row"]))
  column% = int(val(args["column"]))

  globalAA = GetGlobalAA()
  globalAA.registrySettings.videoWallRowIndex% = row%
  globalAA.registrySettings.videoWallColumnIndex% = column%

  globalAA.registrySection.Write("videoWallRowIndex", args["row"])
  globalAA.registrySection.Write("videoWallColumnIndex", args["column"])
  globalAA.registrySection.Flush()

  if not e.SendResponse(200) then
    stop
  end if

end sub


Function brightWallSetup_ProcessEvent(event As Object) As Boolean

  print "brightWallSetup_ProcessEvent - entry"
  print "type of m is ";type(m)
  print "type of event is ";type(event)

  if type(event) = "roHttpEvent" then

    print "url: "; event.getUrl()

    if not m.handlersAdded then

      if type(m.o.sign) = "roAssociativeArray" and type(m.o.sign.localServer) = "roHttpServer" then

        print "add handlers"

        m.o.bwUdpSender = CreateObject("roDatagramSender")
        m.o.bwUdpSender.SetDestination("BCAST-LOCAL-SUBNETS", 5111)

        m.o.bwUdpReceiver = CreateObject("roDatagramReceiver", 5111)
        m.o.bwUdpReceiver.SetUserData("brightWall")
        m.o.bwUdpReceiver.SetPort(m.o.msgPort)

        getIsBrightWallAA = { HandleEvent: GetIsBrightWall, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/GetIsBrightWall", user_data: getIsBrightWallAA })

        getBrightWallConfigurationAA = { HandleEvent: GetBrightWallConfiguration, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/GetBrightWallConfiguration", user_data: getBrightWallConfigurationAA })

        getBrightWallDevicesAA = { HandleEvent: GetBrightWallDevices, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/GetBrightWallDevices", user_data: getBrightWallDevicesAA })

        getBrightWallDeviceListAA = { HandleEvent: GetBrightWallDeviceList, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/GetBrightWallDeviceList", user_data: getBrightWallDeviceListAA })

        m.handlersAdded = true

      endif
    endif

    return false
  endif

  if type(event) = "roHtmlWidgetEvent" then

    eventData = event.GetData()
    
    if type(eventData) = "roAssociativeArray" then
      
      if eventData.reason = "load-finished" then
        print "load-finished event received in plugin"
      endif
      
      if eventData.reason = "message" then
        print "message received in plugin"
        print eventData.message
        return false
      endif

    endif

  else if type(event) = "roAssociativeArray" then

    if event["EventType"] = "SEND_PLUGIN_MESSAGE" then
    
      pluginName$ = event["PluginName"]
      pluginMessage$ = event["PluginMessage"]

      m.o.diagnostics.PrintDebug("PluginMessageEvent " + pluginName$ + " " + pluginMessage$)
      
    endif

  else if type(event) = "roDatagramEvent" then
    
    udpEvent$ = event.GetString()

    m.o.diagnostics.PrintDebug("Plugin processing UDP Event " + udpEvent$)

    userData = event.GetUserData()
    if IsString(userData) and userData = "brightWall" then
      if udpEvent$ = "getIsBrightWallDevice" then
        serialNumber$ = m.o.sysInfo.deviceUniqueid$
        m.o.bwUdpSender.Send("deviceIsInBrightWall::" + serialNumber$)
      else
        regex = CreateObject("roRegEx", "::", "i")
        subStrings = regex.split(udpevent$)
        if subStrings.count() = 2 then
          if subStrings[0] = "deviceIsInBrightWall" then
            deviceInBrightWallId = subStrings[1]
            print "Found device:"
            print deviceInBrightWallId
            m.o.brightSignsInWall.AddReplace(deviceInBrightWallId, true)
          endif
        endif
      endif
    endif
  endif

  return false

End Function