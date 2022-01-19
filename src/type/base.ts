/** @module Types:base */

/** @internal */
/** @private */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export interface AppState {
  hostSerialNumber: string;
  brightWallAttributes: BrightWallAttributes;
  brightSignMap: BrightSignMap;
}

export interface BrightWallAttributes {
  brightWallSetupScreenEnabled: boolean;
  brightWallDeviceSetupActiveScreen: DeviceSetupScreen;
  numRows: number;
  numColumns: number;
}

export interface BrightSignMap {
  [key: string]: BrightSignConfiguration;  // key is serialNumber
}

export interface BrightSignConfiguration {
  isBrightWall: boolean;
  activePresentationName: string;
  serialNumber: string;
  autorunVersion: string;
  deviceFWVersion: string;
  deviceModel: string;
  deviceFamily: string;
  unitName: string;
  unitNamingMethod: string;
  unitDescription: string;
  networkInterfaces: NetworkInterfaceMap;

  isMaster: boolean;
  rowIndex: number;
  columnIndex: number;
  bezelWidth: number;
  bezelHeight: number;
  bezelScreenWidth: number;
  bezelScreenHeight: number;
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

export interface NetworkInterfaceMap {
  [key: string]: NetworkInterface;
}

export enum DeviceSetupScreen {
  ConfigureScreen = 'ConfigureScreen',
  AlignScreen = 'AlignScreen',
}

