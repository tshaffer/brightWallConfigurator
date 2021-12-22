import {
  BrightSignState,
  BrightWall,
  BrightSignMap,
  BrightSignConfig,
  BrightWallConfiguration,
} from '../type';

export const getIsMaster = (state: BrightSignState, serialNumber: string): boolean => {
  const brightWall: BrightWall = state.brightWall;
  const brightSignMap: BrightSignMap = brightWall.brightSignMap;
  const brightSignConfig: BrightSignConfig = brightSignMap[serialNumber];
  const brightWallConfiguration: BrightWallConfiguration = brightSignConfig.brightWallConfiguration;
  return brightWallConfiguration.isMaster;
};

// export const getRowIndex = (state: BrightSignState): number => {
//   return state.brightWallConfiguration.rowIndex;
// };

// export const getColumnIndex = (state: BrightSignState): number => {
//   return state.brightWallConfiguration.columnIndex;
// };

// export const getNumRows = (state: BrightSignState): number => {
//   return state.brightWallConfiguration.numRows;
// };

// export const getNumColumns = (state: BrightSignState): number => {
//   return state.brightWallConfiguration.numColumns;
// };
