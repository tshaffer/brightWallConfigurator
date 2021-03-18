import {
  cloneDeep
} from 'lodash';

import { BrightWallModelAction } from './baseAction';
import { BrightSignAttributes, BrightSignConfig, BrightSignMap } from '../type';

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_BRIGHTSIGN = 'ADD_BRIGHTSIGN';
// export const SET_IS_BRIGHTWALL = 'SET_IS_BRIGHTWALL';
// export const SET_SERIAL_NUMBER = 'SET_SERIAL_NUMBER';

// ------------------------------------
// Actions
// ------------------------------------
export interface AddBrightSignPayload {
  serialNumber: string;
  isBrightWall: boolean;
}
type AddBrightSignAction = BrightWallModelAction<AddBrightSignPayload>;

export const addBrightSign = (
  serialNumber: string,
  isBrightWall: boolean,
): AddBrightSignAction => {
  return {
    type: ADD_BRIGHTSIGN,
    payload: {
      serialNumber,
      isBrightWall,
    },
  };
};

// export interface SetIsBrightWallPayload {
//   isBrightWall: boolean;
// }
// type SetIsBrightWallAction = BrightWallModelAction<SetIsBrightWallPayload>;

// export const setIsBrightWall = (
//   isBrightWall: boolean,
// ): SetIsBrightWallAction => {
//   return {
//     type: SET_IS_BRIGHTWALL,
//     payload: {
//       isBrightWall,
//     },
//   };
// };

// export interface SetSerialNumberPayload {
//   serialNumber: string;
// }
// type SetSerialNumberAction = BrightWallModelAction<SetSerialNumberPayload>;

// export const setSerialNumber = (
//   serialNumber: string,
// ): SetSerialNumberAction => {
//   return {
//     type: SET_SERIAL_NUMBER,
//     payload: {
//       serialNumber,
//     },
//   };
// };

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: BrightSignMap = {
  // isBrightWall: false,
  // serialNumber: '',
};


export const brightSignAttributesReducer = (
  state: BrightSignMap = initialState,
  action: AddBrightSignAction
): BrightSignMap => {
  switch (action.type) {
    // case SET_IS_BRIGHTWALL:
    //   return {
    //     ...state,
    //     isBrightWall: action.payload.isBrightWall,
    //   };
    // case SET_SERIAL_NUMBER:
    //   return {
    //     ...state,
    //     serialNumber: action.payload.serialNumber,
    //   };
    case ADD_BRIGHTSIGN:
      const brightSignConfig: BrightSignConfig = {
        brightSignAttributes: {
          isBrightWall: action.payload.isBrightWall,
          serialNumber: action.payload.serialNumber,
        },
      };
      const newState: BrightSignMap = cloneDeep(state);
      newState[action.payload.serialNumber] = brightSignConfig;
      return newState;
    default:
      return state;
  }
};
