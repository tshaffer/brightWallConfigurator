import { isNil } from 'lodash';
import { AppState, BrightSignAttributes, BrightSignsState } from '../type';
import { getBrightSignInWall } from './brightSignState';

export const getBezelLeft = (state: AppState, serialNumber: string): number => {
  const brightSignAttributes: BrightSignAttributes | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignAttributes)) {
    return brightSignAttributes.bezelLeft;
  }
  return 0;
};

export const getBezelRight = (state: AppState, serialNumber: string): number => {
  const brightSignAttributes: BrightSignAttributes | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignAttributes)) {
    return brightSignAttributes.bezelRight;
  }
  return 0;
};

export const getBezelTop = (state: AppState, serialNumber: string): number => {
  const brightSignAttributes: BrightSignAttributes | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignAttributes)) {
    return brightSignAttributes.bezelTop;
  }
  return 0;
};

export const getBezelBottom = (state: AppState, serialNumber: string): number => {
  const brightSignAttributes: BrightSignAttributes | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignAttributes)) {
    return brightSignAttributes.bezelBottom;
  }
  return 0;
};

export const getBezelScreenWidth = (state: AppState, serialNumber: string): number => {
  const brightSignAttributes: BrightSignAttributes | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignAttributes)) {
    return brightSignAttributes.bezelScreenWidth;
  }
  return 0;
};

export const getBezelScreenHeight = (state: AppState, serialNumber: string): number => {
  const brightSignAttributes: BrightSignAttributes | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignAttributes)) {
    return brightSignAttributes.bezelScreenHeight;
  }
  return 0;
};

export const getUnitName = (state: AppState, serialNumber: string): string => {
  const brightSignAttributes: BrightSignAttributes | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignAttributes)) {
    return brightSignAttributes.unitName;
  }
  return '';
};

export const getHostSerialNumber = (state: AppState): string => {
  const brightSigns: BrightSignsState = state.brightSigns;
  const hostSerialNumber: string = brightSigns.hostSerialNumber;
  return hostSerialNumber;
};

export const getActivePresentationName = (state: AppState): string => {
  const brightSigns: BrightSignsState = state.brightSigns;
  const hostSerialNumber: string = brightSigns.hostSerialNumber;
  const brightSignAttributes: BrightSignAttributes = brightSigns.brightSignBySerialNumber[hostSerialNumber];
  if (!isNil(brightSignAttributes)) {
    return brightSignAttributes.activePresentationName;
  }
  return '';
};

export const getIsBrightWall = (state: AppState): boolean => {
  const brightSigns: BrightSignsState = state.brightSigns;
  const hostSerialNumber: string = brightSigns.hostSerialNumber;
  const brightSignAttributes: BrightSignAttributes = brightSigns.brightSignBySerialNumber[hostSerialNumber];
  if (!isNil(brightSignAttributes)) {
    return brightSignAttributes.isBrightWall;
  }
  return false;
};

export const getIsMaster = (state: AppState, serialNumber: string): boolean => {
  const brightSignAttributes: BrightSignAttributes | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignAttributes)) {
    return brightSignAttributes.isMaster;
  }
  return false;
};

export const getRowIndex = (state: AppState, serialNumber: string): number => {
  const brightSignAttributes: BrightSignAttributes | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignAttributes)) {
    return brightSignAttributes.rowIndex;
  }
  return 0;
};

export const getColumnIndex = (state: AppState, serialNumber: string): number => {
  const brightSignAttributes: BrightSignAttributes | null = getBrightSignInWall(state, serialNumber);
  if (!isNil(brightSignAttributes)) {
    return brightSignAttributes.columnIndex;
  }
  return 0;
};

export const getDeviceIsInWall = (state: AppState, serialNumber: string): boolean => {
  const rowIndex = getRowIndex(state, serialNumber);
  const columnIndex = getColumnIndex(state, serialNumber);
  return (rowIndex >= 0 && columnIndex >= 0);
};



