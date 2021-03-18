import { isNil } from 'lodash';
import { addBrightSignWithConfig, addHostBrightSign } from '../model';
import { BrightSignConfig } from '../type';

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

        // start timer to get list of BrightSigns in the wall
        // pollForBrightSignsTimer = setInterval(getBrightWallDeviceList, 1000, dispatch);
        setTimeout(getBrightWallDeviceList, 1000, dispatch);
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
        console.log(brightSignConfig.brightSignAttributes.serialNumber);
        dispatch(addBrightSignWithConfig(brightSignConfig.brightSignAttributes.serialNumber, brightSignConfig));
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

