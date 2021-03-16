import { BrightSignConfig } from '../type';

export const getBrightSignConfig = () => {
  return ((dispatch: any): any => {

    return fetch('/GetBrightWallConfiguration')
      .then(response => response.json())
      .then((brightSignConfig: BrightSignConfig) => {
        console.log('response to GetBrightWallConfiguration');
        console.log(brightSignConfig);

        if (brightSignConfig.brightSignAttributes.isBrightWall) {
          return fetch('/GetBrightWallSlaves')
            .then(response => response.json())
            .then((status: any) => {
              console.log(status);
            });
        } else {
          return Promise.resolve();
        }
      });
  });
};

