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


Function GetConfig(bsp) as object

  print "GetConfig invoked"
  
  globalAA = GetGlobalAA()

  config = {}

  config.AddReplace("brightSignAttributes", {})
  config.brightSignAttributes.AddReplace("serialNumber", bsp.sysInfo.deviceUniqueID$)
  
  for each networkInterfaceAA in globalAA.settings.network.interfaces

    networkInterfaceId = networkInterfaceAA.networkInterface

    nc = CreateObject("roNetworkConfiguration", networkInterfaceId)
    currentConfig = nc.GetCurrentConfig()
    hostName = nc.GetHostName()

    networkInterface = {}
    networkInterface.AddReplace("id", networkInterfaceId)
    networkInterface.AddReplace("currentConfig", currentConfig)
    networkInterface.AddReplace("hostName", hostName)
  ' brightsign-<serial>.local
  
    networkInterfaces = {}
    networkInterfaces.AddReplace(networkInterfaceId, networkInterface)

  next

  config.brightSignAttributes.AddReplace("networkInterfaces", networkInterfaces)
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

    if len(globalAA.registrySection.Read("videoWallNumRows")) > 0 then
      config.brightWallConfiguration.AddReplace("numRows", int(val(globalAA.registrySection.Read("videoWallNumRows"))))
    else
      config.brightWallConfiguration.AddReplace("numRows", -1)
    endif

    if len(globalAA.registrySection.Read("videoWallNumColumns")) > 0 then
      config.brightWallConfiguration.AddReplace("numColumns", int(val(globalAA.registrySection.Read("videoWallNumColumns"))))
    else
      config.brightWallConfiguration.AddReplace("numColumns", -1)
    endif

    if IsBoolean(globalAA.registrySettings.brightWallSetupScreenEnabled) and IsTruthy(globalAA.registrySection.Read("brightWallSetupScreenEnabled")) then
      config.brightWallConfiguration.AddReplace("brightWallSetupScreenEnabled", true)
    else
      config.brightWallConfiguration.AddReplace("brightWallSetupScreenEnabled", false)
    endif

    if len(globalAA.registrySection.Read("brightWallDeviceSetupActiveScreen")) > 0 then
      config.brightWallConfiguration.AddReplace("brightWallDeviceSetupActiveScreen", globalAA.registrySection.Read("brightWallDeviceSetupActiveScreen"))
    else
      config.brightWallConfiguration.AddReplace("brightWallDeviceSetupActiveScreen", -1)
    endif

  endif

  return config

end Function


Sub GetBrightWallConfiguration(userData as object, e as object)

  print "GetBrightWallConfiguration handler invoked"

  mVar = userData.mVar

  config = GetConfig(mVar)

  e.AddResponseHeader("Content-type", "application/json")
  e.SetResponseBodyString(FormatJson(config))
  e.SendResponse(200)

end sub


Sub GetBrightWallDeviceList(userData as object, e as object)

  print "GetBrightWallDeviceList handler invoked"

  mVar = userData.mVar

  hostSerialNumber = mVar.sysInfo.deviceUniqueId$

  brightSignDevicesInWall = []
  
  if not mVar.brightSignsInWall.isEmpty() then

    xfer = CreateObject("roUrlTransfer")
    xfer.SetPort(mVar.msgPort)
    xfer.SetTimeout(5000)

    for each serialNumber in mVar.brightSignsInWall
      if hostSerialNumber <> serialNumber then
        print "fetch config from non host"
        url = "http://brightsign-" + serialNumber + ".local:8008/GetBrightWallConfiguration"
        xfer.SetUrl(url)
        str$ = xfer.GetToString()
        config = ParseJSON(str$)
        print "response to GetBrightWallConfiguration from ";serialNumber
        print str$
        brightSignDevicesInWall.push(config)
      endif
    next

  endif

  config = GetConfig(mVar)
  brightSignDevicesInWall.push(config)

  brightSignDevicesInWallList = {}
  brightSignDevicesInWallList.AddReplace("brightSignDevicesInWallList", brightSignDevicesInWall)

  e.AddResponseHeader("Content-type", "application/json")
  e.SetResponseBodyString(FormatJson(brightSignDevicesInWallList))
  e.SendResponse(200)

end sub


Sub GetIsBrightWallHandler(userData as object, e as object)

  print "GetIsBrightWallHandler handler invoked"

  mVar = userData.mVar

  respBody = {}
  respBody.isBrightWall = true

  e.AddResponseHeader("Content-type", "application/json")
  e.SetResponseBodyString(FormatJson(respBody))
  e.SendResponse(200)

end sub


'Sub GetIsBrightWallSyncMaster(userData as object, e as object)
  
'  mVar = userData.mVar

'  if not mVar.sign.isVideoWall then
    ' return error
'    stop
'  endif

  
'  root = CreateObject("roXMLElement")
'  root.SetName("BrightSignIsBrightWallSyncMaster")

'  elem = root.AddElement("IsBrightWallSyncMaster")

'  globalAA = GetGlobalAA()
'  if IsBoolean(globalAA.registrySettings.sync_master) then
'    elem.SetBody("true")
'  else
'    elem.SetBody("false")
'  endif
  
'  xml = root.GenXML({ indent: " ", newline: chr(10), header: true })
  
'  e.AddResponseHeader("Content-type", "text/xml; charset=utf-8")
'  e.SetResponseBodyString(xml)
'  e.SendResponse(200)

'end sub


Sub BrightWallDeviceCheckin(userData as object, e as object)
  
  print "BrightWallDeviceCheckin handler invoked"

  mVar = userData.mVar

  ' broadcast UDP message to local devices
  mVar.bwUdpSender.Send("getIsBrightWallDevice")

  resp = {}
  resp.AddReplace("success", true)

  e.AddResponseHeader("Content-type", "application/json")
  e.SetResponseBodyString(FormatJson(resp))
  e.SendResponse(200)

end sub


Sub SetBrightWallIsSyncMaster(userData as object, e as object)

  print "SetBrightWallIsSyncMaster handler invoked"

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


Sub SetDeviceBrightWallPositionHandler(userData as object, e as object)

  print "SetDeviceBrightWallPositionHandler handler invoked"

  rowIndex = e.GetRequestParam("rowIndex")
  print "rowIndex: " + rowIndex
  columnIndex = e.GetRequestParam("columnIndex")
  print "columnIndex: " + columnIndex
  SetDeviceBrightWallPosition(rowIndex, columnIndex)

end sub


Function GetHostIPAddress() as string
  
  nc = CreateObject("roNetworkConfiguration", 0)
  currentConfig = nc.GetCurrentConfig()
  ipAddress = currentConfig.ip4_address
  return ipAddress

end Function


Sub SetBrightWallPosition(userData as object, e as object)

  print "SetBrightWallPosition handler invoked"

  mVar = userData.mVar

  hostIpAddress = GetHostIPAddress()

  ipAddress = e.GetRequestParam("ipAddress")
  print "ipAddress: " + ipAddress
  rowIndex = e.GetRequestParam("rowIndex")
  print "rowIndex: " + rowIndex
  columnIndex = e.GetRequestParam("columnIndex")
  print "columnIndex: " + columnIndex

  if ipAddress = hostIpAddress then
    print "invoke SetDeviceBrightWallPosition"
    SetDeviceBrightWallPosition(rowIndex, columnIndex)
  else
    xfer = CreateObject("roUrlTransfer")
    xfer.SetPort(mVar.msgPort)
    xfer.SetTimeout(5000)
    url = ipAddress + ":8008/SetDeviceBrightWallPosition?rowIndex=" + rowIndex + "&columnIndex=" + columnIndex
    print "url: " + url
    xfer.SetUrl(url)
    str$ = xfer.GetToString()
    config = ParseJSON(str$)
    print "response to SetDeviceBrightWallPosition from ";serialNumber
    print str$
  endif

  resp = {}
  resp.AddReplace("success", true)

  e.AddResponseHeader("Content-type", "application/json")
  e.SetResponseBodyString(FormatJson(resp))
  e.SendResponse(200)

end sub


Sub SetDeviceBrightWallPosition(rowIndex as string, columnIndex as string)

  print "SetDeviceBrightWallPosition invoked"

  rowIndex% = int(val(rowIndex))
  print "rowIndex%: " + stri(rowIndex%)
  columnIndex% = int(val(columnIndex))
  print "columnIndex%: " + stri(columnIndex%)

  globalAA = GetGlobalAA()
  globalAA.registrySettings.videoWallRowIndex% = rowIndex%
  globalAA.registrySettings.videoWallColumnIndex% = columnIndex%

  globalAA.registrySection.Write("videoWallRowIndex", rowIndex)
  globalAA.registrySection.Write("videoWallColumnIndex", columnIndex)
  globalAA.registrySection.Flush()

end sub


Sub ExitConfigurator(userData as object, e as object)

  print "ExitConfigurator handler invoked"

  hostIpAddress = GetHostIPAddress()

  ExitDeviceConfigurator()

  resp = {}
  resp.AddReplace("success", true)

  e.AddResponseHeader("Content-type", "application/json")
  e.SetResponseBodyString(FormatJson(resp))
  e.SendResponse(200)

end sub


Sub ExitDeviceConfigurator()

  print "ExitDeviceConfigurator handler invoked"

  ' hostIpAddress = GetHostIPAddress()

  globalAA = GetGlobalAA()
  globalAA.registrySettings.brightWallSetupScreenEnabled = false
  globalAA.registrySection.Write("brightWallSetupScreenEnabled", "0")
  globalAA.registrySection.Flush()

end sub


Sub LaunchAlignmentTool(userData as object, e as object)

  print "LaunchAlignmentTool handler invoked"

  hostIpAddress = GetHostIPAddress()

  LaunchDeviceAlignmentTool()

  resp = {}
  resp.AddReplace("success", true)

  e.AddResponseHeader("Content-type", "application/json")
  e.SetResponseBodyString(FormatJson(resp))
  e.SendResponse(200)

end sub


Sub LaunchDeviceAlignmentTool()

  print "LaunchDeviceAlignmentTool handler invoked"

  ' hostIpAddress = GetHostIPAddress()

  globalAA = GetGlobalAA()
  globalAA.registrySettings.brightWallDeviceSetupActiveScreen = "alignScreen"
  globalAA.registrySection.Write("brightWallDeviceSetupActiveScreen", "alignScreen")
  globalAA.registrySection.Flush()

end sub


Sub ExitAlignmentTool(userData as object, e as object)

  print "ExitAlignmentTool handler invoked"

  hostIpAddress = GetHostIPAddress()

  ExitDeviceAlignmentTool()

  resp = {}
  resp.AddReplace("success", true)

  e.AddResponseHeader("Content-type", "application/json")
  e.SetResponseBodyString(FormatJson(resp))
  e.SendResponse(200)

end sub


Sub ExitDeviceAlignmentTool()

  print "ExitDeviceAlignmentTool handler invoked"

  ' hostIpAddress = GetHostIPAddress()

  globalAA = GetGlobalAA()
  globalAA.registrySettings.brightWallDeviceSetupActiveScreen = "configureScreen"
  globalAA.registrySection.Write("brightWallDeviceSetupActiveScreen", "configureScreen")
  globalAA.registrySection.Flush()

end sub


Sub RebootBrightWall(userData as object, e as object)
  RebootSystem()
end sub


Sub SetDeviceBezelMeasureByType(bezelMeasureByType as string)

  print "SetDeviceBezelMeasureByType invoked"

  globalAA = GetGlobalAA()
  globalAA.registrySettings.bezelMeasureByType = bezelMeasureByType
  globalAA.registrySection.Write("bezelMeasureByType", bezelMeasureByType)
  globalAA.registrySection.Flush()

end sub


Sub SetBezelMeasureByType(userData as object, e as object)

  print "SetBezelMeasureByType handler invoked"

  mVar = userData.mVar

  hostIpAddress = GetHostIPAddress()

  ipAddress = e.GetRequestParam("ipAddress")
  print "ipAddress: " + ipAddress

  bezelMeasureByType = e.GetRequestParam("bezelMeasureByType")
  print "bezelMeasureByType: " + bezelMeasureByType

  if ipAddress = hostIpAddress then
    print "invoke SetDeviceBezelMeasureByType"
    SetDeviceBezelMeasureByType(bezelMeasureByType)
  else
    xfer = CreateObject("roUrlTransfer")
    xfer.SetPort(mVar.msgPort)
    xfer.SetTimeout(5000)
    url = ipAddress + ":8008/SetDeviceBezelMeasureByType?bezelMeasureByType=" + bezelMeasureByType
    print "url: " + url
    xfer.SetUrl(url)
    str$ = xfer.GetToString()
    config = ParseJSON(str$)
    print "response to SetDeviceBezelMeasureByType from ";serialNumber
    print str$
  endif

  resp = {}
  resp.AddReplace("success", true)

  e.AddResponseHeader("Content-type", "application/json")
  e.SetResponseBodyString(FormatJson(resp))
  e.SendResponse(200)

end sub


Sub SetDeviceBezelWidthPercentage(bezelWidthPercentage as string)

  print "SetDeviceBezelWidthPercentage invoked"

  globalAA = GetGlobalAA()
  globalAA.registrySettings.bezelWidthPercentage = bezelWidthPercentage
  globalAA.registrySection.Write("bezelWidthPercentage", bezelWidthPercentage)
  globalAA.registrySection.Flush()

end sub


Sub SetBezelWidthPercentage(userData as object, e as object)

  print "SetBezelWidthPercentage handler invoked"

  mVar = userData.mVar

  hostIpAddress = GetHostIPAddress()

  ipAddress = e.GetRequestParam("ipAddress")
  print "ipAddress: " + ipAddress

  bezelWidthPercentage = e.GetRequestParam("bezelWidthPercentage")
  print "bezelWidthPercentage: " + bezelWidthPercentage

  if ipAddress = hostIpAddress then
    print "invoke SetDeviceBezelWidthPercentage"
    SetDeviceBezelWidthPercentage(bezelWidthPercentage)
  else
    xfer = CreateObject("roUrlTransfer")
    xfer.SetPort(mVar.msgPort)
    xfer.SetTimeout(5000)
    url = ipAddress + ":8008/SetDeviceBezelWidthPercentage?bezelWidthPercentage=" + bezelWidthPercentage
    print "url: " + url
    xfer.SetUrl(url)
    str$ = xfer.GetToString()
    config = ParseJSON(str$)
    print "response to SetDeviceBezelWidthPercentage from ";serialNumber
    print str$
  endif

  resp = {}
  resp.AddReplace("success", true)

  e.AddResponseHeader("Content-type", "application/json")
  e.SetResponseBodyString(FormatJson(resp))
  e.SendResponse(200)

end sub


Sub SetDeviceBezelHeightPercentage(bezelHeightPercentage as string)

  print "SetDeviceBezelHeightPercentage invoked"

  globalAA = GetGlobalAA()
  globalAA.registrySettings.bezelHeightPercentage = bezelHeightPercentage
  globalAA.registrySection.Write("bezelHeightPercentage", bezelHeightPercentage)
  globalAA.registrySection.Flush()

end sub


Sub SetBezelHeightPercentage(userData as object, e as object)

  print "SetBezelHeightPercentage handler invoked"

  mVar = userData.mVar

  hostIpAddress = GetHostIPAddress()

  ipAddress = e.GetRequestParam("ipAddress")
  print "ipAddress: " + ipAddress

  bezelHeightPercentage = e.GetRequestParam("bezelHeightPercentage")
  print "bezelHeightPercentage: " + bezelHeightPercentage

  if ipAddress = hostIpAddress then
    print "invoke SetDeviceBezelHeightPercentage"
    SetDeviceBezelHeightPercentage(bezelHeightPercentage)
  else
    xfer = CreateObject("roUrlTransfer")
    xfer.SetPort(mVar.msgPort)
    xfer.SetTimeout(5000)
    url = ipAddress + ":8008/SetDeviceBezelHeightPercentage?bezelHeightPercentage=" + bezelHeightPercentage
    print "url: " + url
    xfer.SetUrl(url)
    str$ = xfer.GetToString()
    config = ParseJSON(str$)
    print "response to SetDeviceBezelHeightPercentage from ";serialNumber
    print str$
  endif

  resp = {}
  resp.AddReplace("success", true)

  e.AddResponseHeader("Content-type", "application/json")
  e.SetResponseBodyString(FormatJson(resp))
  e.SendResponse(200)

end sub


Sub SetDeviceBezelWidth(bezelWidth as string)

  print "SetDeviceBezelWidth invoked"

  globalAA = GetGlobalAA()
  globalAA.registrySettings.bezelWidth = bezelWidth
  globalAA.registrySection.Write("bezelWidth", bezelWidth)
  globalAA.registrySection.Flush()

end sub


Sub SetBezelWidth(userData as object, e as object)

  print "SetBezelWidth handler invoked"

  mVar = userData.mVar

  hostIpAddress = GetHostIPAddress()

  ipAddress = e.GetRequestParam("ipAddress")
  print "ipAddress: " + ipAddress

  bezelWidth = e.GetRequestParam("bezelWidth")
  print "bezelWidth: " + bezelWidth

  if ipAddress = hostIpAddress then
    print "invoke SetDeviceBezelWidth"
    SetDeviceBezelWidth(bezelWidth)
  else
    xfer = CreateObject("roUrlTransfer")
    xfer.SetPort(mVar.msgPort)
    xfer.SetTimeout(5000)
    url = ipAddress + ":8008/SetDeviceBezelWidth?bezelWidth=" + bezelWidth
    print "url: " + url
    xfer.SetUrl(url)
    str$ = xfer.GetToString()
    config = ParseJSON(str$)
    print "response to SetDeviceBezelWidth from ";serialNumber
    print str$
  endif

  resp = {}
  resp.AddReplace("success", true)

  e.AddResponseHeader("Content-type", "application/json")
  e.SetResponseBodyString(FormatJson(resp))
  e.SendResponse(200)

end sub


Sub SetDeviceBezelHeight(bezelHeight as string)

  print "SetDeviceBezelHeight invoked"

  globalAA = GetGlobalAA()
  globalAA.registrySettings.bezelHeight = bezelHeight
  globalAA.registrySection.Write("bezelHeight", bezelHeight)
  globalAA.registrySection.Flush()

end sub


Sub SetBezelHeight(userData as object, e as object)

  print "SetBezelHeight handler invoked"

  mVar = userData.mVar

  hostIpAddress = GetHostIPAddress()

  ipAddress = e.GetRequestParam("ipAddress")
  print "ipAddress: " + ipAddress

  bezelHeight = e.GetRequestParam("bezelHeight")
  print "bezelHeight: " + bezelHeight

  if ipAddress = hostIpAddress then
    print "invoke SetDeviceBezelHeight"
    SetDeviceBezelHeight(bezelHeight)
  else
    xfer = CreateObject("roUrlTransfer")
    xfer.SetPort(mVar.msgPort)
    xfer.SetTimeout(5000)
    url = ipAddress + ":8008/SetDeviceBezelHeight?bezelHeight=" + bezelHeight
    print "url: " + url
    xfer.SetUrl(url)
    str$ = xfer.GetToString()
    config = ParseJSON(str$)
    print "response to SetDeviceBezelHeight from ";serialNumber
    print str$
  endif

  resp = {}
  resp.AddReplace("success", true)

  e.AddResponseHeader("Content-type", "application/json")
  e.SetResponseBodyString(FormatJson(resp))
  e.SendResponse(200)

end sub


Sub SetDeviceBezelScreenWidth(bezelScreenWidth as string)

  print "SetDeviceBezelScreenWidth invoked"

  globalAA = GetGlobalAA()
  globalAA.registrySettings.bezelScreenWidth = bezelScreenWidth
  globalAA.registrySection.Write("bezelWidth", bezelScreenWidth)
  globalAA.registrySection.Flush()

end sub


Sub SetBezelScreenWidth(userData as object, e as object)

  print "SetBezelScreenWidth handler invoked"

  mVar = userData.mVar

  hostIpAddress = GetHostIPAddress()

  ipAddress = e.GetRequestParam("ipAddress")
  print "ipAddress: " + ipAddress

  bezelWidth = e.GetRequestParam("bezelWidth")
  print "bezelWidth: " + bezelWidth

  if ipAddress = hostIpAddress then
    print "invoke SetDeviceBezelWidth"
    SetDeviceBezelWidth(bezelWidth)
  else
    xfer = CreateObject("roUrlTransfer")
    xfer.SetPort(mVar.msgPort)
    xfer.SetTimeout(5000)
    url = ipAddress + ":8008/SetDeviceBezelWidth?bezelWidth=" + bezelWidth
    print "url: " + url
    xfer.SetUrl(url)
    str$ = xfer.GetToString()
    config = ParseJSON(str$)
    print "response to SetDeviceBezelWidth from ";serialNumber
    print str$
  endif

  resp = {}
  resp.AddReplace("success", true)

  e.AddResponseHeader("Content-type", "application/json")
  e.SetResponseBodyString(FormatJson(resp))
  e.SendResponse(200)

end sub


Sub SetDeviceBezelScreenHeight(bezelScreenHeight as string)

  print "SetDeviceBezelScreenHeight invoked"

  globalAA = GetGlobalAA()
  globalAA.registrySettings.bezelScreenHeight = bezelScreenHeight
  globalAA.registrySection.Write("bezelScreenHeight", bezelScreenHeight)
  globalAA.registrySection.Flush()

end sub


Sub SetBezelScreenHeight(userData as object, e as object)

  print "SetBezelScreenHeight handler invoked"

  mVar = userData.mVar

  hostIpAddress = GetHostIPAddress()

  ipAddress = e.GetRequestParam("ipAddress")
  print "ipAddress: " + ipAddress

  bezelHeight = e.GetRequestParam("bezelHeight")
  print "bezelHeight: " + bezelHeight

  if ipAddress = hostIpAddress then
    print "invoke SetDeviceBezelHeight"
    SetDeviceBezelHeight(bezelHeight)
  else
    xfer = CreateObject("roUrlTransfer")
    xfer.SetPort(mVar.msgPort)
    xfer.SetTimeout(5000)
    url = ipAddress + ":8008/SetDeviceBezelHeight?bezelHeight=" + bezelHeight
    print "url: " + url
    xfer.SetUrl(url)
    str$ = xfer.GetToString()
    config = ParseJSON(str$)
    print "response to SetDeviceBezelHeight from ";serialNumber
    print str$
  endif

  resp = {}
  resp.AddReplace("success", true)

  e.AddResponseHeader("Content-type", "application/json")
  e.SetResponseBodyString(FormatJson(resp))
  e.SendResponse(200)

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

        getIsBrightWallAA = { HandleEvent: GetIsBrightWallHandler, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/GetIsBrightWall", user_data: getIsBrightWallAA })

        getBrightWallConfigurationAA = { HandleEvent: GetBrightWallConfiguration, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/GetBrightWallConfiguration", user_data: getBrightWallConfigurationAA })

        brightWallDeviceCheckinAA = { HandleEvent: BrightWallDeviceCheckin, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/BrightWallDeviceCheckin", user_data: brightWallDeviceCheckinAA })

        getBrightWallDeviceListAA = { HandleEvent: GetBrightWallDeviceList, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/GetBrightWallDeviceList", user_data: getBrightWallDeviceListAA })

        setBrightWallPositionAA = { HandleEvent: SetBrightWallPosition, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/SetBrightWallPosition", user_data: setBrightWallPositionAA })

        setDeviceBrightWallPositionHandlerAA = { HandleEvent: SetDeviceBrightWallPositionHandler, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/SetDeviceBrightWallPosition", user_data: setDeviceBrightWallPositionHandlerAA })

        exitConfiguratorAA = { HandleEvent: ExitConfigurator, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/ExitConfigurator", user_data: exitConfiguratorAA })

        launchAlignmentToolAA = { HandleEvent: LaunchAlignmentTool, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/LaunchAlignmentTool", user_data: launchAlignmentToolAA })

        exitAlignmentToolAA = { HandleEvent: ExitAlignmentTool, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/ExitAlignmentTool", user_data: exitAlignmentToolAA })

        rebootBrightWallAA = { HandleEvent: RebootBrightWall, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/RebootBrightWall", user_data: rebootBrightWallAA })

        setBezelMeasureByTypeAA = { HandleEvent: SetBezelMeasureByType, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/SetBezelMeasureByType", user_data: setBezelMeasureByTypeAA })

        setBezelWidthPercentageAA = { HandleEvent: SetBezelWidthPercentage, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/SetBezelWidthPercentage", user_data: setBezelWidthPercentageAA })

        setBezelHeightPercentageAA = { HandleEvent: SetBezelHeightPercentage, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/SetBezelHeightPercentage", user_data: setBezelHeightPercentageAA })

        setBezelWidthAA = { HandleEvent: SetBezelWidth, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/SetBezelWidth", user_data: setBezelWidthAA })

        setBezelHeightAA = { HandleEvent: SetBezelHeight, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/SetBezelHeight", user_data: setBezelHeightAA })

        setBezelScreenWidthAA = { HandleEvent: SetBezelScreenWidth, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/SetBezelScreenWidth", user_data: setBezelScreenWidthAA })

        setBezelScreenHeightAA = { HandleEvent: SetBezelScreenHeight, mVar: m.o }
        m.o.sign.localServer.AddGetFromEvent({ url_path: "/SetBezelScreenHeight", user_data: setBezelScreenHeightAA })

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

      globalAA = GetGlobalAA()

      if IsBoolean(globalAA.registrySettings.brightWallSetupScreenEnabled) and IsTruthy(globalAA.registrySection.Read("brightWallSetupScreenEnabled")) then
        bsPluginMessage$ = "bwDeviceSetup"
      else
        bsPluginMessage$ = "launchBrightWall"
      endif

      if pluginName$ = "brightWallSetup" and pluginMessage$ = "init" then
        pluginMessageCmd = {
          EventType    : "EVENT_PLUGIN_MESSAGE",
          PluginName   : "brightWallSetup",
          PluginMessage: bsPluginMessage$
        }
        m.msgPort.PostMessage(pluginMessageCmd)
      endif

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