/** @module Types:base */

/** @internal */
/** @private */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export interface BrightSignState {
  appAttributes: AppAttributes;
  brightWall: BrightWall;
  // brightSignMap: BrightSignMap;
  // brightSignAttributes: BrightSignAttributes;
  // brightWallConfiguration: BrightWallConfiguration;
}

export interface AppAttributes {
  platform: string;
}

export interface BrightSignConfig {
  brightSignAttributes: BrightSignAttributes;
  brightWallConfiguration: BrightWallConfiguration;
}

export interface BrightSignAttributes {
  isBrightWall: boolean;
  serialNumber: string;
}

export interface BrightWallConfiguration {
  isMaster: boolean;
  rowIndex: number;
  columnIndex: number;
  numRows: number;
  numColumns: number;
}

export interface BrightWall {
  hostBrightWallConfiguration: BrightSignConfig | null;
  brightSignMap: BrightSignMap;
}

export interface BrightSignMap {
  [key: string]: BrightSignConfig;
}

