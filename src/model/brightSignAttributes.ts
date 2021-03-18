import {
  cloneDeep
} from 'lodash';

import { BrightWallModelAction } from './baseAction';
import { BrightSignConfig, BrightWall } from '../type';

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_HOST_BRIGHTSIGN = 'ADD_HOST_BRIGHTSIGN';
export const ADD_BRIGHTSIGN_WITH_CONFIG = 'ADD_BRIGHTSIGN_WITH_CONFIG';

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

export interface AddBrightSignWithConfigPayload {
  serialNumber: string;
  brightSignConfig: BrightSignConfig;
}
type AddBrightSignWithConfigAction = BrightWallModelAction<AddBrightSignWithConfigPayload>;

export const addBrightSignWithConfig = (
  serialNumber: string,
  brightSignConfig: BrightSignConfig,
): AddBrightSignWithConfigAction => {
  return {
    type: ADD_BRIGHTSIGN_WITH_CONFIG,
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
  action: AddHostBrightSignAction & AddBrightSignWithConfigAction
): BrightWall => {
  let newState;
  switch (action.type) {
    case ADD_HOST_BRIGHTSIGN:
      newState = cloneDeep(state) as BrightWall;
      newState.hostBrightWallConfiguration = cloneDeep(action.payload.brightSignConfig);
      return newState;
    case ADD_BRIGHTSIGN_WITH_CONFIG:
      newState = cloneDeep(state);
      newState[action.payload.serialNumber] = action.payload.brightSignConfig;
      return newState;
    default:
      return state;
  }
};
