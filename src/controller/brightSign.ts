import { isBoolean, isNil } from 'lodash';
import {
  addBrightSign,
  setActiveSetupScreen,
  setColumnIndex,
  setHostSerialNumber,
  setIsMasterPlayer,
  setNumColumns,
  setNumRows,
  setRowIndex,
  setSetupScreenEnabled,
  updateBezelDimensions
} from '../model/';
import {
  getBrightSignInWall,
  getSerialNumber,
  getBrightSignsInWall,
} from '../selector';
import {
  AppState,
  BrightSignAttributes,
  BrightSignConfig,
  BrightSignMap,
  BrightSignsState,
  NetworkInterface,
  NetworkInterfaceMap
} from '../type';

let pollForBrightSignsTimer: ReturnType<typeof setTimeout>;

interface BrightSignDeviceList {
  brightSignDevicesInWallList: BrightSignConfig[];
}

export const launchApp = () => {
  return ((dispatch: any, getState: any): any => {
    getBrightSignConfig()
      .then((brightSignConfig: BrightSignConfig) => {

        const hostSerialNumber: string = brightSignConfig.brightSignAttributes.serialNumber;

        // add the BrightSign that the custom device web page is running on
        dispatch(addBrightSign(hostSerialNumber, brightSignConfig.brightSignAttributes));

        dispatch(setHostSerialNumber(hostSerialNumber));
        dispatch(setNumRows(hostSerialNumber, brightSignConfig.brightWallAttributes.numRows));
        dispatch(setNumColumns(hostSerialNumber, brightSignConfig.brightWallAttributes.numColumns));
        dispatch(setSetupScreenEnabled(hostSerialNumber, brightSignConfig.brightWallAttributes.brightWallSetupScreenEnabled));
        dispatch(setActiveSetupScreen(hostSerialNumber, brightSignConfig.brightWallAttributes.brightWallDeviceSetupActiveScreen));

        // get list of BrightSigns in the wall after short timeout
        setTimeout(getBrightWallDeviceList, 1000, dispatch, getState);

        // start timer to get list of BrightSigns in the wall
        pollForBrightSignsTimer = setInterval(getBrightWallDeviceList, 10000, dispatch, getState);
      });
  });
};

const getBrightWallDeviceList = (dispatch: any, getState: any) => {
  fetch('/GetBrightWallDeviceList')
    .then(response => response.json())
    .then((brightSignDeviceList: BrightSignDeviceList) => {
      for (const brightSignConfig of brightSignDeviceList.brightSignDevicesInWallList) {
        if (!isNil(brightSignConfig)) {
          const brightSignInWall: BrightSignAttributes | null = getBrightSignInWall(getState(), brightSignConfig.brightSignAttributes.serialNumber);
          if (isNil(brightSignInWall)) {
            dispatch(addBrightSign(brightSignConfig.brightSignAttributes.serialNumber, brightSignConfig.brightSignAttributes));
          }
        }
      }
    });
};

// Get configuration of host device
const getBrightSignConfig = (): Promise<BrightSignConfig> => {
  return fetch('/GetBrightWallConfiguration')
    .then(response => response.json())
    .then((brightSignConfig: BrightSignConfig) => {
      console.log('response to GetBrightWallConfiguration');
      console.log(brightSignConfig);

      if (brightSignConfig.brightSignAttributes.isBrightWall) {
        return Promise.resolve(brightSignConfig);
      } else {
        return Promise.reject();
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
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
            const state: AppState = getState();
            const brightWall: BrightSignsState = state.brightSigns;
            const brightSignBySerialNumber: BrightSignMap = brightWall.brightSignBySerialNumber;
            for (const serialNumber in brightSignBySerialNumber) {
              if (Object.prototype.hasOwnProperty.call(brightSignBySerialNumber, serialNumber)) {
                const brightSignAttributes: BrightSignAttributes = brightSignBySerialNumber[serialNumber];
                const networkInterfaces: NetworkInterfaceMap = brightSignAttributes.networkInterfaces;
                for (const networkInterfaceName in networkInterfaces) {
                  if (Object.prototype.hasOwnProperty.call(networkInterfaces, networkInterfaceName)) {
                    const networkInterface: NetworkInterface = networkInterfaces[networkInterfaceName];
                    const currentConfig = networkInterface.currentConfig;
                    if (currentConfig.ip4_address === ipAddress) {
                      const serialNumber = brightSignAttributes.serialNumber;
                      dispatch(setRowIndex(serialNumber, rowIndex));
                      dispatch(setColumnIndex(serialNumber, columnIndex));
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
    const serialNumber = getSerialNumber(getState());
    const ipAddress = getDeviceIpAddress(getState(), serialNumber);
    if (ipAddress.length > 0) {
      fetch('/ExitConfigurator?ipAddress=' + ipAddress)
        .then(response => response.json())
        .then((status: any) => {
          console.log(status);
          fetch('/RebootBrightWall');
        });
    }
  });
};


export const reenterConfigurator = () => {
  return ((dispatch: any, getState: any): any => {
    const serialNumber = getSerialNumber(getState());
    const ipAddress = getDeviceIpAddress(getState(), serialNumber);
    if (ipAddress.length > 0) {
      fetch('/ReenterConfigurator?ipAddress=' + ipAddress)
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
          if (!isNil(status) && isBoolean(status.success) && status.success) {
            dispatch(setIsMasterPlayer(serialNumber, isMaster));
          }
        });
    }
  });
};

export const launchAlignmentTool = () => {
  return ((dispatch: any, getState: any): any => {
    const serialNumber = getSerialNumber(getState());
    const ipAddress = getDeviceIpAddress(getState(), serialNumber);
    if (ipAddress.length > 0) {
      fetch('/LaunchAlignmentTool?ipAddress=' + ipAddress)
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
    const serialNumber = getSerialNumber(getState());
    const ipAddress = getDeviceIpAddress(getState(), serialNumber);
    if (ipAddress.length > 0) {
      fetch('/ExitAlignmentTool?ipAddress=' + ipAddress)
        .then(response => response.json())
        .then((status: any) => {
          console.log(status);
          fetch('/RebootBrightWall');
        });
    }
  });
};

export const setBezelDimensionsOnAllDevices = (
  bezelWidth: number,
  bezelHeight: number,
  screenWidth: number,
  screenHeight: number,
) => {
  return ((dispatch: any, getState: any): any => {
    const state = getState();
    const brightSignsInWall: BrightSignMap = getBrightSignsInWall(state);
    for (const serialNumber in brightSignsInWall) {
      // TEDTODOBW - duplicates code in setBezelDimensions
      const ipAddress = getDeviceIpAddress(getState(), serialNumber);
      if (ipAddress.length > 0) {
        fetch('/SetBezelDimensions?ipAddress=' + ipAddress
          + '&bezelWidth=' + bezelWidth.toString()
          + '&bezelHeight=' + bezelHeight.toString()
          + '&screenWidth=' + screenWidth.toString()
          + '&screenHeight=' + screenHeight.toString())
          .then(response => response.json())
          .then((status: any) => {
            if (!isNil(status) && isBoolean(status.success) && status.success) {
              const serialNumber = getSerialNumberFromIpAddress(getState(), ipAddress);
              if (!isNil(serialNumber)) {
                dispatch(updateBezelDimensions(
                  serialNumber,
                  bezelWidth,
                  bezelHeight,
                  screenWidth,
                  screenHeight,
                ));
              }
            }
          });
      }
    }
  });
};

export const setBezelDimensions = (
  serialNumber: string,
  bezelWidth: number,
  bezelHeight: number,
  screenWidth: number,
  screenHeight: number,
) => {
  return ((dispatch: any, getState: any): any => {
    const ipAddress = getDeviceIpAddress(getState(), serialNumber);
    if (ipAddress.length > 0) {
      fetch('/SetBezelDimensions?ipAddress=' + ipAddress
        + '&bezelWidth=' + bezelWidth.toString()
        + '&bezelHeight=' + bezelHeight.toString()
        + '&screenWidth=' + screenWidth.toString()
        + '&screenHeight=' + screenHeight.toString())
        .then(response => response.json())
        .then((status: any) => {
          if (!isNil(status) && isBoolean(status.success) && status.success) {
            const serialNumber = getSerialNumberFromIpAddress(getState(), ipAddress);
            if (!isNil(serialNumber)) {
              dispatch(updateBezelDimensions(
                serialNumber,
                bezelWidth,
                bezelHeight,
                screenWidth,
                screenHeight,
              ));
            }
          }
        });
    }
  });
};

const getDeviceIpAddress = (
  state: AppState,
  serialNumber: string,
): string => {
  const brightSignAttributes: BrightSignAttributes | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignAttributes)) {
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

const getSerialNumberFromIpAddress = (state: AppState, ipAddress: string): string | null => {
  const brightWall: BrightSignsState = state.brightSigns;
  const brightSignBySerialNumber: BrightSignMap = brightWall.brightSignBySerialNumber;
  for (const serialNumber in brightSignBySerialNumber) {
    if (Object.prototype.hasOwnProperty.call(brightSignBySerialNumber, serialNumber)) {
      const brightSignAttributes: BrightSignAttributes = brightSignBySerialNumber[serialNumber];
      const networkInterfaces: NetworkInterfaceMap = brightSignAttributes.networkInterfaces;
      for (const networkInterfaceName in networkInterfaces) {
        if (Object.prototype.hasOwnProperty.call(networkInterfaces, networkInterfaceName)) {
          const networkInterface: NetworkInterface = networkInterfaces[networkInterfaceName];
          const currentConfig = networkInterface.currentConfig;
          if (currentConfig.ip4_address === ipAddress) {
            const serialNumber = brightSignAttributes.serialNumber;
            return serialNumber;
          }
        }
      }
    }
  }

  return null;
};

