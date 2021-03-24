import { isNil } from 'lodash';
import { setBrightSign, addHostBrightSign } from '../model';
import { getBrightSignInWall } from '../selector';
import { BrightSignAttributes, BrightSignConfig, NetworkInterface, NetworkInterfaceMap } from '../type';

let pollForBrightSignsTimer: ReturnType<typeof setTimeout>;

interface BrightSignDeviceList {
  brightSignDevicesInWallList: BrightSignConfig[];
}

export const launchApp = () => {
  return ((dispatch: any): any => {
    getBrightSignConfig()
      .then((brightSignConfig: BrightSignConfig) => {

        // add the BrightSign that the custom device web page is running on
        dispatch(addHostBrightSign(brightSignConfig.brightSignAttributes.serialNumber, brightSignConfig));

        console.log('launchApp, start timer');

        // get list of BrightSigns in the wall after short timeout
        setTimeout(getBrightWallDeviceList, 1000, dispatch);
        
        // start timer to get list of BrightSigns in the wall
        pollForBrightSignsTimer = setInterval(getBrightWallDeviceList, 15000, dispatch);
      });
  });
};

const getBrightWallDeviceList = (dispatch: any) => {
  console.log('getBrightWallDeviceList invoked');
  fetch('/GetBrightWallDeviceList')
    .then(response => response.json())
    .then((brightSignDeviceList: BrightSignDeviceList) => {
      console.log('response from GetBrightWallDeviceList');
      console.log(brightSignDeviceList);
      for (const brightSignConfig of brightSignDeviceList.brightSignDevicesInWallList) {
        dispatch(setBrightSign(brightSignConfig.brightSignAttributes.serialNumber, brightSignConfig));
      }
    });
};

export const getBrightSignConfig = (): Promise<BrightSignConfig> => {
  return fetch('/GetBrightWallConfiguration')
    .then(response => response.json())
    .then((brightSignConfig: BrightSignConfig) => {
      console.log('response to GetBrightWallConfiguration');
      console.log(brightSignConfig);

      if (brightSignConfig.brightSignAttributes.isBrightWall) {
        return fetch('/BrightWallDeviceCheckin')
          .then(response => response.json())
          .then((status: any) => {
            if (!isNil(status) && status.success) {
              return Promise.resolve(brightSignConfig);
            } else {
              return Promise.reject();
            }
          });
      } else {
        return Promise.reject();
      }
    });
};

export const setBrightSignWallPosition = (
  serialNumber: string,
  rowIndex: number,
  columnIndex: number,
) => {
  return ((dispatch: any, getState: any): any => {
    // convert serial number to ip address
    const state = getState();
    const brightSignConfig: BrightSignConfig | null = getBrightSignInWall(state, serialNumber);

    if (!isNil(brightSignConfig)) {
      const brightSignAttributes: BrightSignAttributes = brightSignConfig.brightSignAttributes;
      const networkInterfaces: NetworkInterfaceMap = brightSignAttributes.networkInterfaces;
      // eslint-disable-next-line no-prototype-builtins
      if (networkInterfaces.hasOwnProperty('eth0')) {
        const networkInterface: NetworkInterface = networkInterfaces['eth0'];
        const ipAddress = networkInterface.currentConfig.ip4_address;
        fetch('/SetBrightWallPosition?ipAddress=' + ipAddress + '&rowIndex=' + rowIndex.toString() + '&columnIndex=' + columnIndex.toString())
          .then(response => response.json())
          .then((status: any) => {
            console.log(status);
          });
      }
    }
  });
};
