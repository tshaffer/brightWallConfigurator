/** @module Types:base */

/** @internal */
/** @private */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export enum DeviceSetupScreen {
  ConfigureScreen = 'ConfigureScreen',
  AlignScreen = 'AlignScreen',
}

export interface BrightSignState {
  appAttributes: AppAttributes;
  brightWall: BrightWall;
}

export interface AppAttributes {
  platform: string;
}

export interface BrightSignConfig {
  brightSignDeviceAttributes: BrightSignDeviceAttributes;
  brightSignWallAttributes: BrightSignWallAttributes;
  brightWallConfiguration: BrightWallConfiguration;
}

export interface BrightSignDeviceAttributes {
  serialNumber: string;
  autorunVersion: string;
  deviceFWVersion: string;
  deviceModel: string;
  deviceFamily: string;
  unitName: string;
  unitNamingMethod: string;
  unitDescription: string;
  networkInterfaces: NetworkInterfaceMap;
}

export interface BrightSignWallAttributes {
  isBrightWall: boolean;
  activePresentationName: string;
  isMaster: boolean;
  rowIndex: number;
  columnIndex: number;
  bezelWidth: number;
  bezelHeight: number;
  bezelScreenWidth: number;
  bezelScreenHeight: number;
}

export interface BrightWallConfiguration {
  brightWallSetupScreenEnabled: boolean;
  brightWallDeviceSetupActiveScreen: DeviceSetupScreen;
  numRows: number;
  numColumns: number;
}

export interface BrightWall {
  hostBrightWallConfiguration: BrightSignConfig | null;
  brightSignMap: BrightSignMap;
}

export interface BrightSignMap {
  [key: string]: BrightSignConfig;  // key is serialNumber
}

export interface NetworkInterfaceMap {
  [key: string]: NetworkInterface;
}

export interface NetworkConfig {
  client_identifier: string;
  configured_proxy: string;
  current_proxy: string;
  dhcp: boolean;
  dns_servers: string[];
  domain: string;
  ethernet_mac: string;
  hostname: string;
  ip4_address: string;
  ip4_broadcast: string;
  ip4_gateway: string;
  ip4_netmask: string;
  link: boolean;
  mdns_hostname: string;
  metric: number;
  proxy_bypass: string;
  shape_inbound: number;
  time_server: string;
  type: string;
}

export interface NetworkInterface {
  id: string;
  hostName: string;
  currentConfig: NetworkConfig;
}


