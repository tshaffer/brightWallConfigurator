import { BrightWallModelAction } from './baseAction';
import { BrightSignAttributes } from '../type';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_IS_BRIGHTWALL = 'SET_IS_BRIGHTWALL';
export const SET_SERIAL_NUMBER = 'SET_SERIAL_NUMBER';

// ------------------------------------
// Actions
// ------------------------------------
export interface SetIsBrightWallPayload {
  isBrightWall: boolean;
}
type SetIsBrightWallAction = BrightWallModelAction<SetIsBrightWallPayload>;

export const setIsBrightWall = (
  isBrightWall: boolean,
): SetIsBrightWallAction => {
  return {
    type: SET_IS_BRIGHTWALL,
    payload: {
      isBrightWall,
    },
  };
};

export interface SetSerialNumberPayload {
  serialNumber: string;
}
type SetSerialNumberAction = BrightWallModelAction<SetSerialNumberPayload>;

export const setSerialNumber = (
  serialNumber: string,
): SetSerialNumberAction => {
  return {
    type: SET_SERIAL_NUMBER,
    payload: {
      serialNumber,
    },
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: BrightSignAttributes = {
  isBrightWall: false,
  serialNumber: '',
};


export const brightSignAttributesReducer = (
  state: BrightSignAttributes = initialState,
  action: SetIsBrightWallAction & SetSerialNumberAction
): BrightSignAttributes => {
  switch (action.type) {
    case SET_IS_BRIGHTWALL:
      return {
        ...state,
        isBrightWall: action.payload.isBrightWall,
      };
      case SET_SERIAL_NUMBER:
        return {
          ...state,
          serialNumber: action.payload.serialNumber,
        };
      default:
      return state;
  }
};
