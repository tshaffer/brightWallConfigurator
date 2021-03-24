import {
  cloneDeep, isNil
} from 'lodash';

import { BrightWallModelAction } from './baseAction';
import { BrightSignConfig, BrightWall } from '../type';

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_HOST_BRIGHTSIGN = 'ADD_HOST_BRIGHTSIGN';
export const SET_BRIGHTSIGN = 'SET_BRIGHTSIGN';

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

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: BrightWall = {
  hostBrightWallConfiguration: null,
  brightSignMap: {},
};


export const brightSignAttributesReducer = (
  state: BrightWall = initialState,
  action: AddHostBrightSignAction & SetBrightSignAction
): BrightWall => {
  let newState;
  switch (action.type) {
    case ADD_HOST_BRIGHTSIGN:
      newState = cloneDeep(state) as BrightWall;
      newState.hostBrightWallConfiguration = cloneDeep(action.payload.brightSignConfig);
      return newState;
    case SET_BRIGHTSIGN:
      newState = cloneDeep(state) as BrightWall;
      newState.brightSignMap[action.payload.serialNumber] = action.payload.brightSignConfig;
      return newState;
    default:
      return state;
  }
};
