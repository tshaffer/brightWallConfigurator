import { isNil } from 'lodash';
import { addBrightSign } from '../model';
import { BrightSignConfig } from '../type';

export const launchApp = () => {
  return ((dispatch: any): any => {
    getBrightSignConfig()
      .then((brightSignConfig: BrightSignConfig) => {
        dispatch(addBrightSign(brightSignConfig.brightSignAttributes.serialNumber, brightSignConfig.brightSignAttributes.isBrightWall));
      });
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

