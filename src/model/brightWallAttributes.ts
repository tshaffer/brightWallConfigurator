
import { BrightWallModelAction } from './baseAction';
import { BrightWallAttributes, DeviceSetupScreen } from '../type';


// ------------------------------------
// Constants
// ------------------------------------
export const SET_NUM_ROWS = 'SET_NUM_ROWS';
export const SET_NUM_COLUMNS = 'SET_NUM_COLUMNS';
export const SET_SETUP_SCREEN_ENABLED = 'SET_SETUP_SCREEN_ENABLED';
export const SET_ACTIVE_SETUP_SCREEN = 'SET_ACTIVE_SETUP_SCREEN';


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
  return {
    type: SET_NUM_COLUMNS,
    payload: {
      serialNumber,
      numColumns,
    },
  };
};

export interface SetSetupScreenEnabledPayload {
  serialNumber: string;
  setupScreenEnabled: boolean;
}
type SetSetupScreenEnabledAction = BrightWallModelAction<SetSetupScreenEnabledPayload>;

export const setSetupScreenEnabled = (
  serialNumber: string,
  setupScreenEnabled: boolean,
): SetSetupScreenEnabledAction => {
  return {
    type: SET_SETUP_SCREEN_ENABLED,
    payload: {
      serialNumber,
      setupScreenEnabled,
    },
  };
};

export interface SetActiveSetupScreenPayload {
  serialNumber: string;
  activeSetupScreen: DeviceSetupScreen;
}
type SetActiveSetupScreenAction = BrightWallModelAction<SetActiveSetupScreenPayload>;

export const setActiveSetupScreen = (
  serialNumber: string,
  activeSetupScreen: DeviceSetupScreen,
): SetActiveSetupScreenAction => {
  return {
    type: SET_ACTIVE_SETUP_SCREEN,
    payload: {
      serialNumber,
      activeSetupScreen,
    },
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: BrightWallAttributes = {
  numRows: -1,
  numColumns: -1,
  brightWallSetupScreenEnabled: true,
  brightWallDeviceSetupActiveScreen: DeviceSetupScreen.ConfigureScreen,
};


export const brightWallAttributesReducer = (
  state: BrightWallAttributes = initialState,
  action: SetNumRowsAction & SetNumColumnsAction & SetSetupScreenEnabledAction & SetActiveSetupScreenAction,
): BrightWallAttributes => {
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
    case SET_SETUP_SCREEN_ENABLED:
      return {
        ...state,
        brightWallSetupScreenEnabled: action.payload.setupScreenEnabled,
      };
    case SET_ACTIVE_SETUP_SCREEN:
      return {
        ...state,
        brightWallDeviceSetupActiveScreen: action.payload.activeSetupScreen,
      };
    default:
      return state;
  }
};


