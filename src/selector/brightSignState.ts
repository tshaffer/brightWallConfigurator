import { AppState, BrightSignAttributes, BrightSignMap, BrightSignsState } from '../type';
import { getDeviceIsInWall } from './brightSignAttributes';
import { getNumColumns, getNumRows } from './brightWallAttributes';

export const getSerialNumber = (state: AppState): string => {
  const brightSigns: BrightSignsState = state.brightSigns;
  return brightSigns.hostSerialNumber;
};

export const getBrightSignsInWall = (state: AppState): BrightSignMap => {
  const brightSignState: BrightSignsState = state.brightSigns;
  return brightSignState.brightSignBySerialNumber;
};

export const getBrightSignInWall = (state: AppState, serialNumber: string): BrightSignAttributes | null => {
  const brightSignBySerialNumber: BrightSignMap = getBrightSignsInWall(state);
  for (const key in brightSignBySerialNumber) {
    if (Object.prototype.hasOwnProperty.call(brightSignBySerialNumber, key)) {
      const brightSignAttributes: BrightSignAttributes = brightSignBySerialNumber[key];
      if (brightSignAttributes.serialNumber === serialNumber) {
        return brightSignAttributes;
      }
    }
  }
  return null;
};

export const getBrightWallUnitAssignments = (state: AppState): string[][] => {

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
        const brightSignAttributes: BrightSignAttributes = brightSignMap[key];
        if (brightSignAttributes.rowIndex >= 0 && brightSignAttributes.columnIndex >= 0) {
          brightWallGrid[brightSignAttributes.rowIndex][brightSignAttributes.columnIndex] =
            brightSignAttributes.serialNumber;
        }
      }
    }
  }

  return brightWallGrid;
};

export const getIsMasterInWall = (state: AppState): boolean => {

  const brightSigns: BrightSignsState = state.brightSigns;
  const brightSignBySerialNumber: BrightSignMap = brightSigns.brightSignBySerialNumber;

  for (const serialNumber in brightSignBySerialNumber) {
    if (Object.prototype.hasOwnProperty.call(brightSignBySerialNumber, serialNumber)) {
      const brightSignInWall: BrightSignAttributes = brightSignBySerialNumber[serialNumber];
      if (brightSignInWall.isMaster && getDeviceIsInWall(state, serialNumber)) {
        return true;
      }
    }
  }

  return false;
};

