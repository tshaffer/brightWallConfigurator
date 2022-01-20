import {
  cloneDeep
} from 'lodash';

import { BrightWallModelAction } from './baseAction';
import { BrightSignAttributes, BrightSignsState } from '../type';

// ------------------------------------
// Constants
// ------------------------------------
const SET_HOST_SERIAL_NUMBER = 'SET_HOST_SERIAL_NUMBER';
const ADD_BRIGHTSIGN = 'ADD_BRIGHTSIGN';
const SET_ROW_INDEX = 'SET_ROW_INDEX';
const SET_COLUMN_INDEX = 'SET_COLUMN_INDEX';
const SET_IS_MASTER = 'SET_IS_MASTER';
const SET_BEZEL_DIMENSIONS = 'SET_BEZEL_DIMENSIONS';

// ------------------------------------
// Actions
// ------------------------------------

export interface SetHostSerialNumberPayload {
  serialNumber: string;
}
type SetHostSerialNumberAction = BrightWallModelAction<SetHostSerialNumberPayload>;

export const setHostSerialNumber = (
  serialNumber: string,
): SetHostSerialNumberAction => {
  return {
    type: SET_HOST_SERIAL_NUMBER,
    payload: {
      serialNumber,
    },
  };
};

export interface AddBrightSignPayload {
  serialNumber: string;
  brightSignAttributes: BrightSignAttributes;
}
type AddBrightSignAction = BrightWallModelAction<AddBrightSignPayload>;

export const addBrightSign = (
  serialNumber: string,
  brightSignConfig: BrightSignAttributes,
): AddBrightSignAction => {
  return {
    type: ADD_BRIGHTSIGN,
    payload: {
      serialNumber,
      brightSignAttributes: brightSignConfig,
    },
  };
};

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


// old BrightSignAttributes
//  setRowIndex
//  setColumnIndex
//  setBezelDimensions
//  setIsMasterPlayer
//  addHostBrightSign
//  setBrightSign

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: BrightSignsState = {
  hostSerialNumber: '',
  brightSignBySerialNumber: {},
};

export const brightSignsStateReducer = (
  state: BrightSignsState = initialState,
  action: SetHostSerialNumberAction & AddBrightSignAction & SetRowIndexAction & SetColumnIndexAction & SetIsMasterAction & SetBezelDimensionsAction
): BrightSignsState => {
  switch (action.type) {
    case SET_HOST_SERIAL_NUMBER:
      return {
        ...state,
        hostSerialNumber: action.payload.serialNumber,
      };
    case ADD_BRIGHTSIGN:
      const newState = cloneDeep(state) as BrightSignsState;
      // eslint-disable-next-line no-prototype-builtins
      if (!newState.brightSignBySerialNumber.hasOwnProperty(action.payload.serialNumber)) {
        newState.brightSignBySerialNumber[action.payload.serialNumber] = action.payload.brightSignAttributes;
      }
      return newState;
    case SET_ROW_INDEX:
      return {
        ...state,
        brightSignBySerialNumber: {
          ...state.brightSignBySerialNumber,
          [action.payload.serialNumber]: {
            ...state.brightSignBySerialNumber[action.payload.serialNumber],
            rowIndex: action.payload.rowIndex,
          }
        }
      };
    case SET_COLUMN_INDEX:
      return {
        ...state,
        brightSignBySerialNumber: {
          ...state.brightSignBySerialNumber,
          [action.payload.serialNumber]: {
            ...state.brightSignBySerialNumber[action.payload.serialNumber],
            columnIndex: action.payload.columnIndex,
          }
        }
      };
    case SET_IS_MASTER:
      return {
        ...state,
        brightSignBySerialNumber: {
          ...state.brightSignBySerialNumber,
          [action.payload.serialNumber]: {
            ...state.brightSignBySerialNumber[action.payload.serialNumber],
            isMaster: action.payload.isMaster,
          }
        }
      };
    case SET_BEZEL_DIMENSIONS:
      return {
        ...state,
        brightSignBySerialNumber: {
          ...state.brightSignBySerialNumber,
          [action.payload.serialNumber]: {
            ...state.brightSignBySerialNumber[action.payload.serialNumber],
            bezelWidth: action.payload.bezelWidth,
            bezelHeight: action.payload.bezelHeight,
            bezelScreenWidth: action.payload.screenWidth,
            bezelScreenHeight: action.payload.screenHeight,
          }
        }
      };
    default:
      return state;
  }
};
