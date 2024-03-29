import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../styles/configurator.css';
import DeviceIdentifiers from './DeviceIdentifiers';

import {
  setIsMaster,
} from '../controller';
import {
  getColumnIndex,
  getRowIndex,
  getIsMaster,
  getUnitName,
  getBrightSignsInWall,
  getNumRows,
  getNumColumns,
  getBrightWallUnitAssignments,
  getDeviceIsInWall,
} from '../selector';
import {
  BrightSignAttributes,
  BrightSignMap,
} from '../type';

export interface DevicePropsFromParent {
  serialNumber: string;
}

export interface DeviceProps extends DevicePropsFromParent {
  rowIndex: number;
  columnIndex: number;
  deviceIsAssigned: boolean;
  unitName: string;
  isMaster: boolean;
  brightSignsInWall: BrightSignMap;
  onSetIsMaster: (serialNumber: string, isMaster: boolean) => any;
  numRows: number;
  numColumns: number;
  brightWallUnitAssignments: string[][];
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const Device = (props: DeviceProps) => {

  const handleSetIsMaster = (event: any) => {
    console.log('handleSetMaster invoked:');

    // get master before selection
    let priorMasterDevice = '';
    for (const key in props.brightSignsInWall) {
      if (Object.prototype.hasOwnProperty.call(props.brightSignsInWall, key)) {
        const brightSignInWall: BrightSignAttributes = props.brightSignsInWall[key];
        if (brightSignInWall.isMaster) {
          priorMasterDevice = brightSignInWall.serialNumber;
        }
      }
    }
    if (priorMasterDevice !== 'noneAssigned' && priorMasterDevice !== '') {
      console.log('set ' + priorMasterDevice + ' to slave');
      props.onSetIsMaster(priorMasterDevice, false);
    }

    console.log('set ' + event.target.id + ' to master');
    props.onSetIsMaster(event.target.id, true);
  };

  let deviceIdsClassName = '';

  if (props.deviceIsAssigned) {
    deviceIdsClassName = 'deviceIds disabled';
  } else {
    deviceIdsClassName = 'deviceIds';
  }

  return (
    <React.Fragment>
      {/* <Icon iconType='device' /> */}

      <div className={deviceIdsClassName}>
        <div>
          <DeviceIdentifiers
            serialNumber={props.serialNumber}
            unitName={props.unitName}
          />
        </div>
      </div>

      <div className='deviceMasterSelector'>
        <input
          type='radio'
          id={props.serialNumber}
          checked={props.isMaster}
          onChange={handleSetIsMaster}
        />
        <label htmlFor={`device_${props.serialNumber}`}>Master</label>
      </div>

      <br />

    </React.Fragment>
  );
};

function mapStateToProps(state: any, ownProps: DevicePropsFromParent): Partial<DeviceProps> {
  const serialNumber = ownProps.serialNumber;
  return {
    rowIndex: getRowIndex(state, serialNumber),
    columnIndex: getColumnIndex(state, serialNumber),
    deviceIsAssigned: getDeviceIsInWall(state, serialNumber),
    unitName: getUnitName(state, serialNumber),
    serialNumber,
    isMaster: getIsMaster(state, serialNumber),
    brightSignsInWall: getBrightSignsInWall(state),
    numRows: getNumRows(state),
    numColumns: getNumColumns(state),
    brightWallUnitAssignments: getBrightWallUnitAssignments(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onSetIsMaster: setIsMaster,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Device);
