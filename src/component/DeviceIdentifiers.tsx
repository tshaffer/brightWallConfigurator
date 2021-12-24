import * as React from 'react';
import { useDrag } from 'react-dnd';

export interface DeviceIdentifiersProps {
  serialNumber: string;
  unitName: string;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const DeviceIdentifiers = (props: DeviceIdentifiersProps) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'Device',
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <div>{props.unitName}</div>
      <div>{props.serialNumber}</div>
    </div>
  );
};

export default DeviceIdentifiers;
