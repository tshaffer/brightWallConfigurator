import * as React from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';

export interface DeviceIdentifiersProps {
  serialNumber: string;
  unitName: string;
  deviceIsAssigned: boolean;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const DeviceIdentifiers = (props: DeviceIdentifiersProps) => {

  const { serialNumber, unitName } = props;

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'Device',
    canDrag: !props.deviceIsAssigned,
    item: { serialNumber, unitName },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
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
