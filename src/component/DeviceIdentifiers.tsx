import * as React from 'react';
import { connect } from 'react-redux';
import { DragSourceMonitor, useDrag } from 'react-dnd';

import { getColumnIndex, getDeviceIsInWall, getRowIndex } from '../selector';

export interface DeviceIdentifiersPropsFromParent {
  serialNumber: string;
  unitName: string;
  deviceIsAssigned: boolean;
}

export interface DeviceIdentifiersProps extends DeviceIdentifiersPropsFromParent {
  deviceIsInWall: boolean;
  rowIndex: number;
  columnIndex: number;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const DeviceIdentifiers = (props: DeviceIdentifiersProps) => {

  const { serialNumber, unitName } = props;

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'Device',
    canDrag: !props.deviceIsInWall,
    item: { serialNumber, unitName },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }),
  [props.deviceIsInWall],
  );


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

function mapStateToProps(state: any, ownProps: DeviceIdentifiersPropsFromParent): Partial<DeviceIdentifiersProps> {
  const serialNumber = ownProps.serialNumber;
  const rowIndex = getRowIndex(state, serialNumber);
  const columnIndex = getColumnIndex(state, serialNumber);
  const deviceIsInWall = rowIndex >= 0 && columnIndex >= 0;
  console.log(serialNumber, deviceIsInWall);
  return {
    deviceIsInWall,
  };
}

export default connect(mapStateToProps)(DeviceIdentifiers);
