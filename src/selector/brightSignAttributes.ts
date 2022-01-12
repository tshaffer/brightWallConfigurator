import { isNil } from 'lodash';
import { BrightSignConfig, BrightSignState } from '../type';
import { getBrightSignInWall } from './brightWallConfiguration';

export const getIsBrightWall = (state: BrightSignState): boolean => {
  if (!isNil(state.brightWall.hostBrightWallConfiguration)) {
    return state.brightWall.hostBrightWallConfiguration.brightSignAttributes.isBrightWall;
  }
  return false;
};

export const getActivePresentationName = (state: BrightSignState): string => {
  if (!isNil(state.brightWall.hostBrightWallConfiguration)) {
    return state.brightWall.hostBrightWallConfiguration.brightSignAttributes.activePresentationName;
  }
  return '';
};

export const getSerialNumber = (state: BrightSignState): string => {
  if (!isNil(state.brightWall.hostBrightWallConfiguration)) {
    return state.brightWall.hostBrightWallConfiguration.brightSignAttributes.serialNumber;
  }
  return '';
};

export const getUnitName = (state: BrightSignState, serialNumber: string): string => {
  const brightSignConfig: BrightSignConfig | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignConfig) && !isNil(brightSignConfig.brightWallConfiguration)) {
    return brightSignConfig.brightSignAttributes.unitName;
  }
  return '';
};

