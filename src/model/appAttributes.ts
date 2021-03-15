import { BrightWallModelAction } from './baseAction';
import { AppAttributes } from '../type';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_PLATFORM = 'SET_PLATFORM';

// ------------------------------------
// Actions
// ------------------------------------
export interface SetPlatformPayload {
  platform: string;
}
type SetPlatformAction = BrightWallModelAction<SetPlatformPayload>;

export const setPlatform = (
  platform: string,
): SetPlatformAction => {
  return {
    type: SET_PLATFORM,
    payload: {
      platform,
    },
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: AppAttributes = {
  platform: '',
};


export const appAttributesReducer = (
  state: AppAttributes = initialState,
  action: SetPlatformAction
): AppAttributes => {
  switch (action.type) {
      case SET_PLATFORM:
        return {
          ...state,
          platform: action.payload.platform,
        };
      default:
      return state;
  }
};
