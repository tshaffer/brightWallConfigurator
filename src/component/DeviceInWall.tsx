import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../styles/configurator.css';

import Icon from './Icon';

import {
  getIsMaster,
  getUnitName,
} from '../selector';

export interface DeviceInWallPropsFromParent {
  serialNumber: string;
  onRemoveBrightSignFromWall: () => any;
}

export interface DeviceInWallProps extends DeviceInWallPropsFromParent {
  isMaster: boolean;
  unitName: string;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const DeviceInWall = (props: DeviceInWallProps) => {

  const getIsMasterJsx = () => {
    if (!props.isMaster) {
      return null;
    }
    return (
      <div className='deviceNumber'>
        Master
      </div>
    );
  };

  const masterJsx = getIsMasterJsx();

  return (
    <div className='deviceInWallContainer'>

      <div style={{ display: 'inline-block' }}>
        <Icon iconType='device' />

        <div className='deviceNumber'>
          {props.serialNumber}
        </div>

        <div className='deviceNumber'>
          {props.unitName}
        </div>

        {masterJsx}
        
      </div>

      <div
        style={{ display: 'inline-block' }}
        onClick={props.onRemoveBrightSignFromWall}
      >
        <Icon iconType='close' />
      </div>

    </div>
  );
};

function mapStateToProps(state: any, ownProps: DeviceInWallPropsFromParent): Partial<DeviceInWallProps> {
  const serialNumber = ownProps.serialNumber;
  return {
    isMaster: getIsMaster(state, serialNumber),
    unitName: getUnitName(state, serialNumber),
    serialNumber,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceInWall);
