import * as React from 'react';
import { connect } from 'react-redux';
import { DragSourceMonitor, useDrag } from 'react-dnd';

import { getDeviceIsInWall } from '../selector';
import Icon from './Icon';

export interface DeviceIdentifiersPropsFromParent {
  serialNumber: string;
  unitName: string;
}

export interface DeviceIdentifiersProps extends DeviceIdentifiersPropsFromParent {
  deviceIsInWall: boolean;
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
      <Icon iconType='device' />
      <div style={{ display: 'inline-block' }}>
        <div>{props.unitName}</div>
        <div>{props.serialNumber}</div>
      </div>
    </div>
  );
};

function mapStateToProps(state: any, ownProps: DeviceIdentifiersPropsFromParent): Partial<DeviceIdentifiersProps> {
  return {
    deviceIsInWall: getDeviceIsInWall(state, ownProps.serialNumber),
  };
}

export default connect(mapStateToProps)(DeviceIdentifiers);
