import { isNil } from 'lodash';
import {
  BrightSignState,
  BrightWall,
  BrightSignMap,
  BrightSignConfig,
  BrightWallConfiguration,
  DeviceSetupScreen,
  BrightSignAttributes,
} from '../type';

export const getBrightWallSetupScreenEnabled = (state: BrightSignState): boolean => {
  if (!isNil(state.brightWall.hostBrightWallConfiguration)) {
    return state.brightWall.hostBrightWallConfiguration.brightWallConfiguration.brightWallSetupScreenEnabled;
  }
  return false;
};

export const getBrightWallDeviceSetupActiveScreen = (state: BrightSignState): DeviceSetupScreen => {
  if (!isNil(state.brightWall.hostBrightWallConfiguration)) {
    return state.brightWall.hostBrightWallConfiguration.brightWallConfiguration.brightWallDeviceSetupActiveScreen;
  }
  return DeviceSetupScreen.ConfigureScreen;
};

export const getIsMasterInWall = (state: BrightSignState): boolean => {

  const brightWall: BrightWall = state.brightWall;
  const brightSignMap: BrightSignMap = brightWall.brightSignMap;

  for (const serialNumber in brightSignMap) {
    if (Object.prototype.hasOwnProperty.call(brightSignMap, serialNumber)) {
      const brightSignInWall: BrightSignConfig = brightSignMap[serialNumber];
      if (brightSignInWall.brightWallConfiguration.isMaster && getDeviceIsInWall(state, serialNumber)) {
        return true;
      }
    }
  }

  return false;
};

export const getIsMaster = (state: BrightSignState, serialNumber: string): boolean => {
  const brightWall: BrightWall = state.brightWall;
  const brightSignMap: BrightSignMap = brightWall.brightSignMap;
  const brightSignConfig: BrightSignConfig = brightSignMap[serialNumber];
  const brightWallConfiguration: BrightWallConfiguration = brightSignConfig.brightWallConfiguration;
  return brightWallConfiguration.isMaster;
};

export const getRowIndex = (state: BrightSignState, serialNumber: string): number => {
  const brightSignConfig: BrightSignConfig | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignConfig) && !isNil(brightSignConfig.brightWallConfiguration)) {
    return brightSignConfig.brightWallConfiguration.rowIndex;
  }
  return -1;
};

export const getColumnIndex = (state: BrightSignState, serialNumber: string): number => {
  const brightSignConfig: BrightSignConfig | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignConfig) && !isNil(brightSignConfig.brightWallConfiguration)) {
    return brightSignConfig.brightWallConfiguration.columnIndex;
  }
  return -1;
};

export const getNumRows = (state: BrightSignState): number => {
  if (!isNil(state.brightWall.hostBrightWallConfiguration)) {
    return state.brightWall.hostBrightWallConfiguration.brightWallConfiguration.numRows;
  }
  return -1;
};

export const getNumColumns = (state: BrightSignState): number => {
  if (!isNil(state.brightWall.hostBrightWallConfiguration)) {
    return state.brightWall.hostBrightWallConfiguration.brightWallConfiguration.numColumns;
  }
  return -1;
};

export const getBezelWidth = (state: BrightSignState, serialNumber: string): number => {
  const brightSignConfig: BrightSignConfig | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignConfig) && !isNil(brightSignConfig.brightWallConfiguration)) {
    return brightSignConfig.brightWallConfiguration.bezelWidth;
  }
  return 0;
};

export const getBezelHeight = (state: BrightSignState, serialNumber: string): number => {
  const brightSignConfig: BrightSignConfig | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignConfig) && !isNil(brightSignConfig.brightWallConfiguration)) {
    return brightSignConfig.brightWallConfiguration.bezelHeight;
  }
  return 0;
};

export const getBezelScreenWidth = (state: BrightSignState, serialNumber: string): number => {
  const brightSignConfig: BrightSignConfig | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignConfig) && !isNil(brightSignConfig.brightWallConfiguration)) {
    return brightSignConfig.brightWallConfiguration.bezelScreenWidth;
  }
  return 0;
};

export const getBezelScreenHeight = (state: BrightSignState, serialNumber: string): number => {
  const brightSignConfig: BrightSignConfig | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignConfig) && !isNil(brightSignConfig.brightWallConfiguration)) {
    return brightSignConfig.brightWallConfiguration.bezelScreenHeight;
  }
  return 0;
};

export const getBrightWallUnitAssignments = (state: BrightSignState): string[][] => {

  const brightWallGrid: string[][] = [];

  const numRows = getNumRows(state);
  const numColumns = getNumColumns(state);

  if (numRows > 0 && numColumns > 0) {

    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
      brightWallGrid.push([]);
      for (let columnIndex = 0; columnIndex < numColumns; columnIndex++) {
        brightWallGrid[rowIndex].push('noneAssigned');
      }
    }

    const brightSignMap: BrightSignMap = getBrightSignsInWall(state);
    for (const key in brightSignMap) {
      if (Object.prototype.hasOwnProperty.call(brightSignMap, key)) {
        const brightSignConfig: BrightSignConfig = brightSignMap[key];
        if (brightSignConfig.brightWallConfiguration.rowIndex >= 0 && brightSignConfig.brightWallConfiguration.columnIndex >= 0) {
          brightWallGrid[brightSignConfig.brightWallConfiguration.rowIndex][brightSignConfig.brightWallConfiguration.columnIndex] =
            brightSignConfig.brightSignAttributes.serialNumber;
        }
      }
    }
  }

  return brightWallGrid;
};

export const getDeviceIsInWall = (state: BrightSignState, serialNumber: string): boolean => {
  const rowIndex = getRowIndex(state, serialNumber);
  const columnIndex = getColumnIndex(state, serialNumber);
  return (rowIndex >= 0 && columnIndex >= 0);
};

export const getBrightSignsInWall = (state: BrightSignState): BrightSignMap => {
  return state.brightWall.brightSignMap;
};

export const getBrightSignInWall = (state: BrightSignState, serialNumber: string): BrightSignConfig | null => {
  const brightSignMap: BrightSignMap = getBrightSignsInWall(state);
  for (const key in brightSignMap) {
    if (Object.prototype.hasOwnProperty.call(brightSignMap, key)) {
      const brightSignConfig: BrightSignConfig = brightSignMap[key];
      const brightSignAttributes: BrightSignAttributes = brightSignConfig.brightSignAttributes;
      if (brightSignAttributes.serialNumber === serialNumber) {
        return brightSignConfig;
      }
    }
  }
  return null;
};

