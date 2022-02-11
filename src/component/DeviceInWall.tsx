import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../styles/configurator.css';

import Icon from './Icon';

import {
  getIsMaster,
  getUnitName,
  getBezelWidth,
  getBezelHeight,
  getBezelScreenWidth,
  getBezelScreenHeight,
} from '../selector';

export interface DeviceInWallPropsFromParent {
  serialNumber: string;
  onRemoveBrightSignFromWall: () => any;
}

export interface DeviceInWallProps extends DeviceInWallPropsFromParent {
  isMaster: boolean;
  unitName: string;
  bezelWidth: number;
  bezelHeight: number;
  screenWidth: number;
  screenHeight: number;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const DeviceInWall = (props: DeviceInWallProps) => {

  const getIsMasterJsx = () => {
    if (!props.isMaster) {
      return (
        <div className='deviceNumber'>
          Slave
        </div>
      );
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

        <div className='deviceNumber'>
          {'Bezel width: ' + props.bezelWidth}
        </div>

        <div className='deviceNumber'>
          {'Bezel height: ' + props.bezelHeight}
        </div>

        <div className='deviceNumber'>
          {'Screen width: ' + props.screenWidth}
        </div>

        <div className='deviceNumber'>
          {'Screen height: ' + props.screenHeight}
        </div>

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
    serialNumber,
    isMaster: getIsMaster(state, serialNumber),
    unitName: getUnitName(state, serialNumber),
    bezelWidth: getBezelWidth(state, serialNumber),
    bezelHeight: getBezelHeight(state, serialNumber),
    screenWidth: getBezelScreenWidth(state, serialNumber),
    screenHeight: getBezelScreenHeight(state, serialNumber),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceInWall);
