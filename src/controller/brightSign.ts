import { isBoolean, isNil } from 'lodash';
import { setBrightSign, addHostBrightSign, setColumnIndex, setRowIndex, addNewBrightSign } from '../model';
import { getBrightSignInWall, getSerialNumber } from '../selector';
import { BezelMeasureByType, BrightSignAttributes, BrightSignConfig, BrightSignMap, BrightSignState, BrightWall, BrightWallConfiguration, NetworkInterface, NetworkInterfaceMap } from '../type';

let pollForBrightSignsTimer: ReturnType<typeof setTimeout>;

interface BrightSignDeviceList {
  brightSignDevicesInWallList: BrightSignConfig[];
}

export const launchApp = () => {
  return ((dispatch: any, getState: any): any => {
    getBrightSignConfig()
      .then((brightSignConfig: BrightSignConfig) => {

        // add the BrightSign that the custom device web page is running on
        dispatch(addHostBrightSign(brightSignConfig.brightSignAttributes.serialNumber, brightSignConfig));

        console.log('launchApp, start timer');

        // get list of BrightSigns in the wall after short timeout
        setTimeout(getBrightWallDeviceList, 1000, dispatch, getState);

        // start timer to get list of BrightSigns in the wall
        pollForBrightSignsTimer = setInterval(getBrightWallDeviceList, 15000, dispatch, getState);
      });
  });
};

const getBrightWallDeviceList = (dispatch: any, getState: any) => {
  console.log('getBrightWallDeviceList invoked');
  fetch('/GetBrightWallDeviceList')
    .then(response => response.json())
    .then((brightSignDeviceList: BrightSignDeviceList) => {
      console.log('response from GetBrightWallDeviceList');
      console.log(brightSignDeviceList);
      for (const brightSignConfig of brightSignDeviceList.brightSignDevicesInWallList) {
        const brightSignInWall: BrightSignConfig | null = getBrightSignInWall(getState(), brightSignConfig.brightSignAttributes.serialNumber);
        if (isNil(brightSignInWall)) {
          dispatch(addNewBrightSign(brightSignConfig.brightSignAttributes.serialNumber, brightSignConfig));
        }
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

const getDeviceIpAddress = (
  state: BrightSignState,
  serialNumber: string,
): string => {
  const brightSignConfig: BrightSignConfig | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignConfig)) {
    const brightSignAttributes: BrightSignAttributes = brightSignConfig.brightSignAttributes;
    const networkInterfaces: NetworkInterfaceMap = brightSignAttributes.networkInterfaces;
    // eslint-disable-next-line no-prototype-builtins
    if (networkInterfaces.hasOwnProperty('eth0')) {
      const networkInterface: NetworkInterface = networkInterfaces['eth0'];
      const ipAddress = networkInterface.currentConfig.ip4_address;
      return ipAddress;
    }
  }
  return '';
};

export const setBrightSignWallPosition = (
  serialNumber: string,
  rowIndex: number,
  columnIndex: number,
) => {
  return ((dispatch: any, getState: any): any => {
    const ipAddress = getDeviceIpAddress(getState(), serialNumber);
    if (ipAddress.length > 0) {
      fetch('/SetBrightWallPosition?ipAddress=' + ipAddress + '&rowIndex=' + rowIndex.toString() + '&columnIndex=' + columnIndex.toString())
        .then(response => response.json())
        .then((status: any) => {
          console.log(status);
          if (!isNil(status) && isBoolean(status.success) && status.success) {
            console.log('setBrightWallPosition success');
            console.log(ipAddress);
            console.log(rowIndex);
            console.log(columnIndex);
            const state: BrightSignState = getState();
            console.log(state);
            const brightWall: BrightWall = state.brightWall;
            const brightSignMap: BrightSignMap = brightWall.brightSignMap;
            for (const serialNumber in brightSignMap) {
              if (Object.prototype.hasOwnProperty.call(brightSignMap, serialNumber)) {
                const brightSignConfig: BrightSignConfig = brightSignMap[serialNumber];
                const brightSignAttributes: BrightSignAttributes = brightSignConfig.brightSignAttributes;
                // const brightWallConfiguration: BrightWallConfiguration = brightSignConfig.brightWallConfiguration;
                const networkInterfaces: NetworkInterfaceMap = brightSignAttributes.networkInterfaces;
                for (const networkInterfaceName in networkInterfaces) {
                  if (Object.prototype.hasOwnProperty.call(networkInterfaces, networkInterfaceName)) {
                    const networkInterface: NetworkInterface = networkInterfaces[networkInterfaceName];
                    const currentConfig = networkInterface.currentConfig;
                    if (currentConfig.ip4_address === ipAddress) {
                      const serialNumber = brightSignAttributes.serialNumber;
                      console.log('state before');
                      console.log(getState());
                      dispatch(setRowIndex(serialNumber, rowIndex));
                      dispatch(setColumnIndex(serialNumber, columnIndex));
                      console.log('state after');
                      console.log(getState());
                    }
                  }
                }
              }
            }
          }
        });
    }
  });
};

export const exitConfigurator = () => {
  return ((dispatch: any, getState: any): any => {
    const ipAddress = getSerialNumber(getState());
    if (ipAddress.length > 0) {
      fetch('/ExitConfigurator')
        .then(response => response.json())
        .then((status: any) => {
          console.log(status);
          fetch('/RebootBrightWall');
        });
    }
  });
};


export const setIsMaster = (
  serialNumber: string,
  isMaster: boolean
) => {
  return ((dispatch: any, getState: any): any => {
    const ipAddress = getDeviceIpAddress(getState(), serialNumber);
    if (ipAddress.length > 0) {
      fetch('/SetBrightWallIsMaster?ipAddress=' + ipAddress + '&isMaster=' + isMaster.toString())
        .then(response => response.json())
        .then((status: any) => {
          console.log(status);
        });
    }
  });
};

export const launchAlignmentTool = () => {
  return ((dispatch: any, getState: any): any => {
    const ipAddress = getSerialNumber(getState());
    if (ipAddress.length > 0) {
      fetch('/LaunchAlignmentTool')
        .then(response => response.json())
        .then((status: any) => {
          console.log(status);
          fetch('/RebootBrightWall');
        });
    }
  });
};

export const exitAlignmentTool = () => {
  return ((dispatch: any, getState: any): any => {
    const ipAddress = getSerialNumber(getState());
    if (ipAddress.length > 0) {
      fetch('/ExitAlignmentTool')
        .then(response => response.json())
        .then((status: any) => {
          console.log(status);
          fetch('/RebootBrightWall');
        });
    }
  });
};

export const setDeviceBezelMeasureByType = (
  serialNumber: string,
  bezelMeasureByType: BezelMeasureByType,
) => {
  return ((dispatch: any, getState: any): any => {
    const ipAddress = getDeviceIpAddress(getState(), serialNumber);
    if (ipAddress.length > 0) {
      fetch('/SetBezelMeasureByType?ipAddress=' + ipAddress + '&bezelMeasureByType=' + bezelMeasureByType.toString())
        .then(response => response.json())
        .then((status: any) => {
          console.log(status);
        });
    }
  });
};
export const setDeviceBezelWidthPercentage = (
  serialNumber: string,
  bezelWidthPercentage: number,
) => {
  return ((dispatch: any, getState: any): any => {
    const ipAddress = getDeviceIpAddress(getState(), serialNumber);
    if (ipAddress.length > 0) {
      fetch('/SetBezelWidthPercentage?ipAddress=' + ipAddress + '&bezelWidthPercentage=' + bezelWidthPercentage.toString())
        .then(response => response.json())
        .then((status: any) => {
          console.log(status);
        });
    }
  });
};
export const setDeviceBezelHeightPercentage = (
  serialNumber: string,
  bezelHeightPercentage: number,
) => {
  return ((dispatch: any, getState: any): any => {
    const ipAddress = getDeviceIpAddress(getState(), serialNumber);
    if (ipAddress.length > 0) {
      fetch('/SetBezelHeightPercentage?ipAddress=' + ipAddress + '&bezelHeightPercentage=' + bezelHeightPercentage.toString())
        .then(response => response.json())
        .then((status: any) => {
          console.log(status);
        });
    }
  });
};
export const setDeviceBezelWidth = (
  serialNumber: string,
  bezelWidth: number,
) => {
  return ((dispatch: any, getState: any): any => {
    const ipAddress = getDeviceIpAddress(getState(), serialNumber);
    if (ipAddress.length > 0) {
      fetch('/SetBezelWidth?ipAddress=' + ipAddress + '&bezelWidth=' + bezelWidth.toString())
        .then(response => response.json())
        .then((status: any) => {
          console.log(status);
        });
    }
  });
};
export const setDeviceBezelHeight = (
  serialNumber: string,
  bezelHeight: number,
) => {
  return ((dispatch: any, getState: any): any => {
    const ipAddress = getDeviceIpAddress(getState(), serialNumber);
    if (ipAddress.length > 0) {
      fetch('/SetBezelHeight?ipAddress=' + ipAddress + '&bezelHeight=' + bezelHeight.toString())
        .then(response => response.json())
        .then((status: any) => {
          console.log(status);
        });
    }
  });
};
export const setDeviceBezelScreenWidth = (
  serialNumber: string,
  bezelScreenWidth: number,
) => {
  return ((dispatch: any, getState: any): any => {
    const ipAddress = getDeviceIpAddress(getState(), serialNumber);
    if (ipAddress.length > 0) {
      fetch('/SetBezelScreenWidth?ipAddress=' + ipAddress + '&bezelScreenWidth=' + bezelScreenWidth.toString())
        .then(response => response.json())
        .then((status: any) => {
          console.log(status);
        });
    }
  });
};
export const setDeviceBezelScreenHeight = (
  serialNumber: string,
  bezelScreenHeight: number,
) => {
  return ((dispatch: any, getState: any): any => {
    const ipAddress = getDeviceIpAddress(getState(), serialNumber);
    if (ipAddress.length > 0) {
      fetch('/SetBezelScreenHeight?ipAddress=' + ipAddress + '&bezelScreenHeight=' + bezelScreenHeight.toString())
        .then(response => response.json())
        .then((status: any) => {
          console.log(status);
        });
    }
  });
};
