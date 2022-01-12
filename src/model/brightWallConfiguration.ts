import { BrightWallModelAction } from './baseAction';
import { BrightWallConfiguration, DeviceSetupScreen } from '../type';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_NUM_ROWS = 'SET_NUM_ROWS';
export const SET_NUM_COLUMNS = 'SET_NUM_COLUMNS';

// ------------------------------------
// Actions
// ------------------------------------

export interface SetNumRowsPayload {
  serialNumber: string;
  numRows: number;
}
type SetNumRowsAction = BrightWallModelAction<SetNumRowsPayload>;

export const setNumRows = (
  serialNumber: string,
  numRows: number,
): SetNumRowsAction => {
  debugger;
  return {
    type: SET_NUM_ROWS,
    payload: {
      serialNumber,
      numRows,
    },
  };
};

export interface SetNumColumnsPayload {
  serialNumber: string;
  numColumns: number;
}
type SetNumColumnsAction = BrightWallModelAction<SetNumColumnsPayload>;

export const setNumColumns = (
  serialNumber: string,
  numColumns: number,
): SetNumColumnsAction => {
  debugger;
  return {
    type: SET_NUM_COLUMNS,
    payload: {
      serialNumber,
      numColumns,
    },
  };
};


// ------------------------------------
// Reducer
// ------------------------------------

const initialState: BrightWallConfiguration = {
  brightWallSetupScreenEnabled: false,
  brightWallDeviceSetupActiveScreen: DeviceSetupScreen.ConfigureScreen,
  isMaster: false,
  rowIndex: -1,
  columnIndex: -1,
  numRows: -1,
  numColumns: -1,
  bezelWidth: 0,
  bezelHeight: 0,
  bezelScreenWidth: 0,
  bezelScreenHeight: 0,
};


export const brightWallConfigurationReducer = (
  state: BrightWallConfiguration = initialState,
  action: SetNumRowsAction & SetNumColumnsAction,
): BrightWallConfiguration => {
  console.log('****-- brightWallConfigurationReducer: ', action.type);
  switch (action.type) {
    case SET_NUM_ROWS:
      return {
        ...state,
        numRows: action.payload.numRows,
      };
    case SET_NUM_COLUMNS:
      return {
        ...state,
        numColumns: action.payload.numColumns,
      };
    default:
      return state;
  }
};


