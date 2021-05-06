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
export const ADD_HOST_BRIGHTSIGN = 'ADD_HOST_BRIGHTSIGN';
export const SET_BRIGHTSIGN = 'SET_BRIGHTSIGN';
export const SET_BEZEL_MEASURE_BY_TYPE = 'SET_BEZEL_MEASURE_BY_TYPE';
export const SET_BEZEL_WIDTH_PERCENTAGE = 'SET_BEZEL_WIDTH_PERCENTAGE';
export const SET_BEZEL_HEIGHT_PERCENTAGE = 'SET_BEZEL_HEIGHT_PERCENTAGE';
export const SET_BEZEL_WIDTH = 'SET_BEZEL_WIDTH';
export const SET_BEZEL_HEIGHT = 'SET_BEZEL_HEIGHT';
export const SET_BEZEL_SCREEN_WIDTH = 'SET_BEZEL_SCREEN_WIDTH';
export const SET_BEZEL_SCREEN_HEIGHT = 'SET_BEZEL_SCREEN_HEIGHT';
export const SET_ROW_INDEX = 'SET_ROW_INDEX';
export const SET_COLUMN_INDEX = 'SET_COLUMN_INDEX';

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

export interface SetBezelMeasureByTypePayload {
  serialNumber: string;
  bezelMeasureByType: BezelMeasureByType;
}
type SetBezelMeasureByTypeAction = BrightWallModelAction<SetBezelMeasureByTypePayload>;

export const setBezelMeasureByType = (
  serialNumber: string,
  bezelMeasureByType: BezelMeasureByType,
): SetBezelMeasureByTypeAction => {
  return {
    type: SET_BEZEL_MEASURE_BY_TYPE,
    payload: {
      serialNumber,
      bezelMeasureByType,
    },
  };
};

export interface SetBezelWidthPercentagePayload {
  serialNumber: string;
  bezelWidthPercentage: number;
}
type SetBezelWidthPercentageAction = BrightWallModelAction<SetBezelWidthPercentagePayload>;

export const setBezelWidthPercentage = (
  serialNumber: string,
  bezelWidthPercentage: number,
): SetBezelWidthPercentageAction => {
  return {
    type: SET_BEZEL_WIDTH_PERCENTAGE,
    payload: {
      serialNumber,
      bezelWidthPercentage,
    },
  };
};

export interface SetBezelHeightPercentagePayload {
  serialNumber: string;
  bezelHeightPercentage: number;
}
type SetBezelHeightPercentageAction = BrightWallModelAction<SetBezelHeightPercentagePayload>;

export const setBezelHeightPercentage = (
  serialNumber: string,
  bezelHeightPercentage: number,
): SetBezelHeightPercentageAction => {
  return {
    type: SET_BEZEL_HEIGHT_PERCENTAGE,
    payload: {
      serialNumber,
      bezelHeightPercentage,
    },
  };
};

export interface SetBezelWidthPayload {
  serialNumber: string;
  bezelWidth: number;
}
type SetBezelWidthAction = BrightWallModelAction<SetBezelWidthPayload>;

export const setBezelWidth = (
  serialNumber: string,
  bezelWidth: number,
): SetBezelWidthAction => {
  return {
    type: SET_BEZEL_WIDTH,
    payload: {
      serialNumber,
      bezelWidth,
    },
  };
};

export interface SetBezelHeightPayload {
  serialNumber: string;
  bezelHeight: number;
}
type SetBezelHeightAction = BrightWallModelAction<SetBezelHeightPayload>;

export const setBezelHeight = (
  serialNumber: string,
  bezelHeight: number,
): SetBezelHeightAction => {
  return {
    type: SET_BEZEL_HEIGHT,
    payload: {
      serialNumber,
      bezelHeight,
    },
  };
};

export interface SetBezelScreenWidthPayload {
  serialNumber: string;
  bezelScreenWidth: number;
}
type SetBezelScreenWidthAction = BrightWallModelAction<SetBezelScreenWidthPayload>;

export const setBezelScreenWidth = (
  serialNumber: string,
  bezelScreenWidth: number,
): SetBezelScreenWidthAction => {
  return {
    type: SET_BEZEL_SCREEN_WIDTH,
    payload: {
      serialNumber,
      bezelScreenWidth,
    },
  };
};

export interface SetBezelScreenHeightPayload {
  serialNumber: string;
  bezelScreenHeight: number;
}
type SetBezelScreenHeightAction = BrightWallModelAction<SetBezelScreenHeightPayload>;

export const setBezelScreenHeight = (
  serialNumber: string,
  bezelScreenHeight: number,
): SetBezelScreenHeightAction => {
  return {
    type: SET_BEZEL_SCREEN_HEIGHT,
    payload: {
      serialNumber,
      bezelScreenHeight,
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
  action: AddHostBrightSignAction & SetBrightSignAction & SetRowIndexAction & SetColumnIndexAction & SetBezelMeasureByTypeAction & SetBezelWidthPercentageAction & SetBezelHeightPercentageAction & SetBezelWidthAction & SetBezelHeightAction & SetBezelScreenWidthAction & SetBezelScreenHeightAction,
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
    case SET_ROW_INDEX:
      newState = cloneDeep(state) as BrightWall;
      brightSignConfig = newState.brightSignMap[action.payload.serialNumber];
      brightSignConfig.brightWallConfiguration.rowIndex = action.payload.rowIndex;
      return newState;
    case SET_COLUMN_INDEX:
      newState = cloneDeep(state) as BrightWall;
      brightSignConfig = newState.brightSignMap[action.payload.serialNumber];
      brightSignConfig.brightWallConfiguration.rowIndex = action.payload.rowIndex;
      return newState;
    case SET_BEZEL_MEASURE_BY_TYPE:
      newState = cloneDeep(state) as BrightWall;
      brightWallConfiguration = newState.brightSignMap[action.payload.serialNumber].brightWallConfiguration as BrightWallConfiguration;
      brightWallConfiguration.bezelMeasureByType = action.payload.bezelMeasureByType;
      return newState;
    case SET_BEZEL_WIDTH_PERCENTAGE:
      newState = cloneDeep(state) as BrightWall;
      brightWallConfiguration = newState.brightSignMap[action.payload.serialNumber].brightWallConfiguration as BrightWallConfiguration;
      brightWallConfiguration.bezelWidthPercentage = action.payload.bezelWidthPercentage;
      return newState;
    case SET_BEZEL_HEIGHT_PERCENTAGE:
      newState = cloneDeep(state) as BrightWall;
      brightWallConfiguration = newState.brightSignMap[action.payload.serialNumber].brightWallConfiguration as BrightWallConfiguration;
      brightWallConfiguration.bezelHeightPercentage = action.payload.bezelHeightPercentage;
      return newState;
    case SET_BEZEL_WIDTH:
      newState = cloneDeep(state) as BrightWall;
      brightWallConfiguration = newState.brightSignMap[action.payload.serialNumber].brightWallConfiguration as BrightWallConfiguration;
      brightWallConfiguration.bezelWidth = action.payload.bezelWidth;
      return newState;
    case SET_BEZEL_HEIGHT:
      newState = cloneDeep(state) as BrightWall;
      brightWallConfiguration = newState.brightSignMap[action.payload.serialNumber].brightWallConfiguration as BrightWallConfiguration;
      brightWallConfiguration.bezelHeight = action.payload.bezelHeight;
      return newState;
    case SET_BEZEL_SCREEN_WIDTH:
      newState = cloneDeep(state) as BrightWall;
      brightWallConfiguration = newState.brightSignMap[action.payload.serialNumber].brightWallConfiguration as BrightWallConfiguration;
      brightWallConfiguration.bezelScreenWidth = action.payload.bezelScreenWidth;
      return newState;
    case SET_BEZEL_SCREEN_HEIGHT:
      newState = cloneDeep(state) as BrightWall;
      brightWallConfiguration = newState.brightSignMap[action.payload.serialNumber].brightWallConfiguration as BrightWallConfiguration;
      brightWallConfiguration.bezelScreenHeight = action.payload.bezelScreenHeight;
      return newState;
    default:
      return state;
  }
};
