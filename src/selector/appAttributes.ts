import { BrightSignState } from "../type";

export const getPlatform = (state: BrightSignState): string => {
  return state.appAttributes.platform;
};

