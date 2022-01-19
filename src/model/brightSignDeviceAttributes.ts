import {
  cloneDeep,
} from 'lodash';

import { BrightWallModelAction } from './baseAction';
import {
  BrightSignConfig,
  BrightWall,
} from '../type';

// ------------------------------------
// Constants
// ------------------------------------
const ADD_HOST_BRIGHTSIGN = 'ADD_HOST_BRIGHTSIGN';
const SET_BRIGHTSIGN = 'SET_BRIGHTSIGN';
const ADD_NEW_BRIGHTSIGN = 'ADD_NEW_BRIGHTSIGN';

// ------------------------------------
// Actions
// ------------------------------------
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

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: BrightWall = {
  hostBrightWallConfiguration: null,
  brightSignMap: {},
};


export const brightSignDeviceAttributesReducer = (
  state: BrightWall = initialState,
  action: AddHostBrightSignAction & SetBrightSignAction,
): BrightWall => {
  let newState;
  console.log('****-- brightSignDeviceAttributesReducer: ', action.type);
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
    default:
      return state;
  }
};
