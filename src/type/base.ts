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

export interface BrightSignAttributes {
  isBrightWall: boolean;
  serialNumber: string;
  networkInterfaces: NetworkInterfaceMap;
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

