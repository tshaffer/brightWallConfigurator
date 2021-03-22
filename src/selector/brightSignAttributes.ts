import { isNil } from 'lodash';
import { BrightSignMap, BrightSignState } from '../type';

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

export const getBrightWallUnitAssignments = (state: BrightSignState): string[][] => {
  return state.brightWall.brightWallUnitAssignments;
};
// export const getSerialNumber = (state: BrightSignState): string => {
//   return state.brightSignAttributes.serialNumber;
// };

