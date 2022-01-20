export interface AppState {
  brightSigns: BrightSignsState;
  brightWallAttributes: BrightWallAttributes;
}

export interface BrightSignsState {
  hostSerialNumber: string;
  brightSignBySerialNumber: BrightSignMap;
}

export interface BrightSignMap {
  [key: string]: BrightSignAttributes;  // key is serialNumber
}

export interface BrightSignConfig {
  brightSignAttributes: BrightSignAttributes;
  brightWallAttributes: BrightWallAttributes;
}

export interface BrightSignAttributes {
  serialNumber: string;
  autorunVersion: string;
  deviceFWVersion: string;
  deviceModel: string;
  deviceFamily: string;
  unitName: string;
  unitNamingMethod: string;
  unitDescription: string;
  activePresentationName: string;
  networkInterfaces: NetworkInterfaceMap;
  isBrightWall: boolean;
  isMaster: boolean;
  rowIndex: number;
  columnIndex: number;
  bezelWidth: number;
  bezelHeight: number;
  bezelScreenWidth: number;
  bezelScreenHeight: number;
}

// TEDTODOBW - these are reports for all devices, but the code currently only looks at the hosts's settings.
export interface BrightWallAttributes {
  numRows: number;
  numColumns: number;
  brightWallSetupScreenEnabled: boolean;
  brightWallDeviceSetupActiveScreen: DeviceSetupScreen;
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

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

