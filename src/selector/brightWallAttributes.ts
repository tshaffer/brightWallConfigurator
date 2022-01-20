import { AppState, DeviceSetupScreen } from '../type';

export const getBrightWallSetupScreenEnabled = (state: AppState): boolean => {
  return state.brightWallAttributes.brightWallSetupScreenEnabled;
};

export const getBrightWallDeviceSetupActiveScreen = (state: AppState): DeviceSetupScreen => {
  return state.brightWallAttributes.brightWallDeviceSetupActiveScreen;
};

export const getNumRows = (state: AppState): number => {
  return state.brightWallAttributes.numRows;
};

export const getNumColumns = (state: AppState): number => {
  return state.brightWallAttributes.numColumns;
};
