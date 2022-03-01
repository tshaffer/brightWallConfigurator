import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../styles/configurator.css';

import Icon from './Icon';

import {
  getIsMaster,
  getUnitName,
  getBezelLeft,
  getBezelRight,
  getBezelTop,
  getBezelBottom,
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
  bezelLeft: number;
  bezelRight: number;
  bezelTop: number;
  bezelBottom: number;
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
        <div className='deviceText'>
          Slave
        </div>
      );
    }
    return (
      <div className='deviceText'>
        Master
      </div>
    );
  };

  const masterJsx = getIsMasterJsx();

  return (
    <div className='deviceInWallContainer'>

      <div style={{ display: 'inline-block' }}>
        <Icon iconType='device' />

        <div className='deviceText'>
          {props.serialNumber}
        </div>

        <div className='deviceText'>
          {props.unitName}
        </div>

        {masterJsx}

        <div className='deviceText'>
          {'Bezel left: ' + props.bezelLeft}
        </div>

        <div className='deviceText'>
          {'Bezel right: ' + props.bezelRight}
        </div>

        <div className='deviceText'>
          {'Bezel top: ' + props.bezelTop}
        </div>

        <div className='deviceText'>
          {'Bezel right: ' + props.bezelBottom}
        </div>

        <div className='deviceText'>
          {'Screen width: ' + props.screenWidth}
        </div>

        <div className='deviceText'>
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
    bezelLeft: getBezelLeft(state, serialNumber),
    bezelRight: getBezelRight(state, serialNumber),
    bezelTop: getBezelTop(state, serialNumber),
    bezelBottom: getBezelBottom(state, serialNumber),
    screenWidth: getBezelScreenWidth(state, serialNumber),
    screenHeight: getBezelScreenHeight(state, serialNumber),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceInWall);
