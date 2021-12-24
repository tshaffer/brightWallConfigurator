import * as React from 'react';

export interface DeviceIdentifiersProps {
  serialNumber: string;
  unitName: string;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const DeviceIdentifiers = (props: DeviceIdentifiersProps) => {

  return (
    <div>
      <div>{props.unitName}</div>
      <div>{props.serialNumber}</div>
    </div>
  );
};

export default DeviceIdentifiers;
