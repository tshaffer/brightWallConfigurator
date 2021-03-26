import { isNil } from 'lodash';
import { BezelMeasureByType, BrightSignAttributes, BrightSignConfig, BrightSignMap, BrightSignState } from '../type';

export const getIsBrightWall = (state: BrightSignState): boolean => {
  if (!isNil(state.brightWall.hostBrightWallConfiguration)) {
    return state.brightWall.hostBrightWallConfiguration.brightSignAttributes.isBrightWall;
  }
  return false;
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

export const getBezelMeasureByType= (state: BrightSignState, serialNumber: string): BezelMeasureByType => {
  const brightSignConfig: BrightSignConfig | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignConfig) && !isNil(brightSignConfig.brightWallConfiguration)) {
    return brightSignConfig.brightWallConfiguration.bezelMeasureByType;
  }
  return BezelMeasureByType.Measurement;
};

export const getBezelWidthPercentage = (state: BrightSignState, serialNumber: string): number => {
  const brightSignConfig: BrightSignConfig | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignConfig) && !isNil(brightSignConfig.brightWallConfiguration)) {
    return brightSignConfig.brightWallConfiguration.bezelWidthPercentage;
  }
  return 0;
};

export const getBezelHeightPercentage = (state: BrightSignState, serialNumber: string): number => {
  const brightSignConfig: BrightSignConfig | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignConfig) && !isNil(brightSignConfig.brightWallConfiguration)) {
    return brightSignConfig.brightWallConfiguration.bezelHeightPercentage;
  }
  return 0;
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
