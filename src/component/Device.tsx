import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../styles/configurator.css';

import {
  setIsMaster,
  setBrightSignWallPosition,
} from '../controller';
import {
  getColumnIndex,
  getRowIndex,
  getIsMaster,
  getUnitName,
  getBrightSignsInWall
} from '../selector';
import {
  BrightSignConfig,
  BrightSignMap,
} from '../type';

export interface DevicePropsFromParent {
  serialNumber: string;
}

export interface DeviceProps extends DevicePropsFromParent {
  rowIndex: number;
  columnIndex: number;
  unitName: string;
  isMaster: boolean;
  brightSignsInWall: BrightSignMap;
  onSetIsMaster: (serialNumber: string, isMaster: boolean) => any;
  onSetBrightSignWallPosition: (serialNumber: string, row: number, column: number) => any;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const Device = (props: DeviceProps) => {

  const getDeviceIsAssigned = (): boolean => {
    return (props.rowIndex >= 0 || props.columnIndex >= 0);
  };

  const handleSetIsMaster = (event: any) => {
    console.log('handleSetMaster invoked:');

    // get master before selection
    let priorMasterDevice = '';
    for (const key in props.brightSignsInWall) {
      if (Object.prototype.hasOwnProperty.call(props.brightSignsInWall, key)) {
        const brightSignInWall: BrightSignConfig = props.brightSignsInWall[key];
        if (brightSignInWall.brightWallConfiguration.isMaster) {
          priorMasterDevice = brightSignInWall.brightSignAttributes.serialNumber;
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

  let deviceImage = '';
  let deviceIdsClassName = '';

  if (getDeviceIsAssigned()) {
    deviceImage = 'src/img/deviceDisabled.svg';
    deviceIdsClassName = 'deviceName disabled';
  } else {
    deviceImage = 'src/img/device.svg';
    deviceIdsClassName = 'deviceName';
  }

  return (
    <React.Fragment>
      <img className='deviceImage' src={deviceImage} />

      <div className={deviceIdsClassName}>
        <div>{props.unitName}</div>
        <div>{props.serialNumber}</div>
      </div>

      <div className='deviceFlag'>
        <input
          type='radio'
          id={props.serialNumber}
          checked={props.isMaster}
          onChange={handleSetIsMaster}
        />
        <label htmlFor={`device_${props.serialNumber}`}>Master</label>
      </div>

    </React.Fragment>
  );
};

function mapStateToProps(state: any, ownProps: DevicePropsFromParent): Partial<any> {
  const serialNumber = ownProps.serialNumber;
  return {
    rowIndex: getRowIndex(state, serialNumber),
    columnIndex: getColumnIndex(state, serialNumber),
    unitName: getUnitName(state, serialNumber),
    serialNumber,
    isMaster: getIsMaster(state, serialNumber),
    brightSignsInWall: getBrightSignsInWall(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onSetIsMaster: setIsMaster,
    onSetBrightWallPosition: setBrightSignWallPosition,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Device);
