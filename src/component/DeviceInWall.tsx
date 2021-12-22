import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../styles/configurator.css';

import {
  setBrightSignWallPosition,
} from '../controller';
import {
  getUnitName
} from '../selector';

export interface DeviceInWallPropsFromParent {
  serialNumber: string;
}

export interface DeviceInWallProps extends DeviceInWallPropsFromParent {
  unitName: string;
  isMaster: boolean;
  onSetIsMaster: (serialNumber: string, isMaster: boolean) => any;
  onSetBrightSignWallPosition: (serialNumber: string, row: number, column: number) => any;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const DeviceInWall = (props: DeviceInWallProps) => {

  const handleRemoveDevice = (event: any) => {
    console.log('handleRemoveDevice invoked:');
    // props.onSetIsMaster(props.serialNumber, event.target.value);
  };

  return (
    <div className='selectedDeviceContainer'>
      <img src='/src/img/device.svg' className='deviceImage'/>

      <div className='deviceNumber'>
        {props.serialNumber}
      </div>

      <img src='/src/img/close.svg' className='deleteDeviceButton' onClick={handleRemoveDevice}/>
    </div>
  );
};

function mapStateToProps(state: any, ownProps: DeviceInWallPropsFromParent): Partial<any> {
  const serialNumber = ownProps.serialNumber;
  return {
    unitName: getUnitName(state, serialNumber),
    serialNumber,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onSetBrightWallPosition: setBrightSignWallPosition,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceInWall);
