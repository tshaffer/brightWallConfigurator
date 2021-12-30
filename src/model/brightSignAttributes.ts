import {
  cloneDeep, isNil
} from 'lodash';

import { BrightWallModelAction } from './baseAction';
import {
  BezelMeasureByType,
  BrightSignConfig,
  BrightWall,
  BrightWallConfiguration,
} from '../type';

// ------------------------------------
// Constants
// ------------------------------------
const ADD_HOST_BRIGHTSIGN = 'ADD_HOST_BRIGHTSIGN';
const SET_BRIGHTSIGN = 'SET_BRIGHTSIGN';
const ADD_NEW_BRIGHTSIGN = 'ADD_NEW_BRIGHTSIGN';
const SET_BEZEL_DIMENSIONS = 'SET_BEZEL_DIMENSIONS';
const SET_ROW_INDEX = 'SET_ROW_INDEX';
const SET_COLUMN_INDEX = 'SET_COLUMN_INDEX';
const SET_IS_MASTER = 'SET_IS_MASTER';

// ------------------------------------
// Actions
// ------------------------------------
export interface SetRowIndexPayload {
  serialNumber: string;
  rowIndex: number;
}
type SetRowIndexAction = BrightWallModelAction<SetRowIndexPayload>;

export const setRowIndex = (
  serialNumber: string,
  rowIndex: number,
): SetRowIndexAction => {
  return {
    type: SET_ROW_INDEX,
    payload: {
      serialNumber,
      rowIndex,
    },
  };
};

export interface SetColumnIndexPayload {
  serialNumber: string;
  columnIndex: number;
}
type SetColumnIndexAction = BrightWallModelAction<SetColumnIndexPayload>;

export const setColumnIndex = (
  serialNumber: string,
  columnIndex: number,
): SetColumnIndexAction => {
  return {
    type: SET_COLUMN_INDEX,
    payload: {
      serialNumber,
      columnIndex,
    },
  };
};

export interface SetIsMasterPayload {
  serialNumber: string;
  isMaster: boolean;
}
type SetIsMasterAction = BrightWallModelAction<SetIsMasterPayload>;

export const setIsMasterPlayer = (
  serialNumber: string,
  isMaster: boolean,
): SetIsMasterAction => {
  return {
    type: SET_IS_MASTER,
    payload: {
      serialNumber,
      isMaster,
    },
  };
};


export interface AddHostBrightSignPayload {
  serialNumber: string;
  brightSignConfig: BrightSignConfig;
}
type AddHostBrightSignAction = BrightWallModelAction<AddHostBrightSignPayload>;

export const addHostBrightSign = (
  serialNumber: string,
  brightSignConfig: BrightSignConfig,
): AddHostBrightSignAction => {
  return {
    type: ADD_HOST_BRIGHTSIGN,
    payload: {
      serialNumber,
      brightSignConfig,
    },
  };
};


// TEDTODOBW - remove - unused?
export interface SetBrightSignPayload {
  serialNumber: string;
  brightSignConfig: BrightSignConfig;
}
type SetBrightSignAction = BrightWallModelAction<SetBrightSignPayload>;

export const setBrightSign = (
  serialNumber: string,
  brightSignConfig: BrightSignConfig,
): SetBrightSignAction => {
  return {
    type: SET_BRIGHTSIGN,
    payload: {
      serialNumber,
      brightSignConfig,
    },
  };
};

export interface AddNewBrightSignPayload {
  serialNumber: string;
  brightSignConfig: BrightSignConfig;
}
type AddNewBrightSignAction = BrightWallModelAction<AddNewBrightSignPayload>;

export const addNewBrightSign = (
  serialNumber: string,
  brightSignConfig: BrightSignConfig,
): AddNewBrightSignAction => {
  return {
    type: ADD_NEW_BRIGHTSIGN,
    payload: {
      serialNumber,
      brightSignConfig,
    },
  };
};

export interface SetBezelDimensionsPayload {
  serialNumber: string;
  bezelWidth: number;
  bezelHeight: number;
  screenWidth: number;
  screenHeight: number;
}
type SetBezelDimensionsAction = BrightWallModelAction<SetBezelDimensionsPayload>;

export const updateBezelDimensions = (
  serialNumber: string,
  bezelWidth: number,
  bezelHeight: number,
  screenWidth: number,
  screenHeight: number,
): SetBezelDimensionsAction => {
  return {
    type: SET_BEZEL_DIMENSIONS,
    payload: {
      serialNumber,
      bezelWidth,
      bezelHeight,
      screenWidth,
      screenHeight,
    },
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: BrightWall = {
  hostBrightWallConfiguration: null,
  brightSignMap: {},
};


export const brightSignAttributesReducer = (
  state: BrightWall = initialState,
  action: AddHostBrightSignAction & SetBrightSignAction & SetRowIndexAction & SetColumnIndexAction & SetIsMasterAction & SetBezelDimensionsAction,
): BrightWall => {
  let newState;
  let brightWallConfiguration;
  let brightSignConfig: BrightSignConfig;
  console.log('****-- brightSignAttributesReducer: ', action.type);
  switch (action.type) {
    case ADD_HOST_BRIGHTSIGN:
      newState = cloneDeep(state) as BrightWall;
      newState.hostBrightWallConfiguration = cloneDeep(action.payload.brightSignConfig);
      return newState;
    case SET_BRIGHTSIGN:
      newState = cloneDeep(state) as BrightWall;
      newState.brightSignMap[action.payload.serialNumber] = action.payload.brightSignConfig;
      return newState;
    case ADD_NEW_BRIGHTSIGN:
      newState = cloneDeep(state) as BrightWall;
      // eslint-disable-next-line no-prototype-builtins
      if (!newState.brightSignMap.hasOwnProperty(action.payload.serialNumber)) {
        newState.brightSignMap[action.payload.serialNumber] = action.payload.brightSignConfig;
      }
      return newState;
    case SET_ROW_INDEX:
      newState = cloneDeep(state) as BrightWall;
      brightSignConfig = newState.brightSignMap[action.payload.serialNumber];
      brightSignConfig.brightWallConfiguration.rowIndex = action.payload.rowIndex;
      return newState;
    case SET_COLUMN_INDEX:
      newState = cloneDeep(state) as BrightWall;
      brightSignConfig = newState.brightSignMap[action.payload.serialNumber];
      brightSignConfig.brightWallConfiguration.columnIndex = action.payload.columnIndex;
      return newState;
    case SET_IS_MASTER:
      newState = cloneDeep(state) as BrightWall;
      brightSignConfig = newState.brightSignMap[action.payload.serialNumber];
      brightSignConfig.brightWallConfiguration.isMaster = action.payload.isMaster;
      return newState;
    case SET_BEZEL_DIMENSIONS:
      newState = cloneDeep(state) as BrightWall;
      brightWallConfiguration = newState.brightSignMap[action.payload.serialNumber].brightWallConfiguration as BrightWallConfiguration;
      brightWallConfiguration.bezelWidth = action.payload.bezelWidth;
      brightWallConfiguration.bezelHeight = action.payload.bezelHeight;
      brightWallConfiguration.bezelScreenWidth = action.payload.screenWidth;
      brightWallConfiguration.bezelScreenHeight = action.payload.screenHeight;
      return newState;
    default:
      return state;
  }
};
