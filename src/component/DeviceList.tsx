import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { map } from 'lodash';

import '../styles/configurator.css';

import { BrightSignAttributes, BrightSignMap } from '../type';

import {
  exitConfigurator,
  reenterConfigurator,
  exitAlignmentTool,
  launchAlignmentTool,
  launchApp,
} from '../controller';

import {
  getIsBrightWall,
  getBrightWallDeviceSetupActiveScreen,
  getNumRows,
  getNumColumns,
  getBrightSignsInWall,
  getBrightWallUnitAssignments,
  getBezelLeft,
  getBezelRight,
  getBezelTop,
  getBezelBottom,
  getBezelScreenWidth,
  getBezelScreenHeight,
  getHostSerialNumber,
} from '../selector';

import Device from './Device';

export interface DeviceListProps {
  brightSignsInWall: BrightSignMap;
  bezelLeft: number;
  bezelRight: number;
  bezelTop: number;
  bezelBottom: number;
  screenWidth: number;
  screenHeight: number;
}

const DeviceList = (props: DeviceListProps) => {

  console.log(props.brightSignsInWall);

  const serialNumbers: string[] = [];
  for (const key in props.brightSignsInWall) {
    if (Object.prototype.hasOwnProperty.call(props.brightSignsInWall, key)) {
      const brightSignInWall: BrightSignAttributes = props.brightSignsInWall[key];
      serialNumbers.push(brightSignInWall.serialNumber);
    }
  }

  return (
    <div className='deviceListContainer'>
      {
        map(serialNumbers, serialNumber =>
          <Device
            serialNumber={serialNumber}
            key={`device_${serialNumber}`}
          />
        )
      }
      <div className='screenDetailsDiv'>
        <p className='screenDetailsLabel'>Screen Details</p>
        <div className='deviceText'>
          {'Screen width: ' + props.screenWidth}
        </div>
        <div className='deviceText'>
          {'Screen height: ' + props.screenHeight}
        </div>
        <div className='deviceText'>
          {'Bezel right: ' + props.bezelRight}
        </div>
        <div className='deviceText'>
          {'Bezel left: ' + props.bezelLeft}
        </div>
        <div className='deviceText'>
          {'Bezel top: ' + props.bezelTop}
        </div>
        <div className='deviceText'>
          {'Bezel right: ' + props.bezelBottom}
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state: any, ownProps: any): Partial<any> {
  const serialNumber = getHostSerialNumber(state);
  return {
    isBrightWall: getIsBrightWall(state),
    brightWallDeviceSetupActiveScreen: getBrightWallDeviceSetupActiveScreen(state),
    numRows: getNumRows(state),
    numColumns: getNumColumns(state),
    brightSignsInWall: getBrightSignsInWall(state),
    brightWallUnitAssignments: getBrightWallUnitAssignments(state),
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
    onLaunchApp: launchApp,
    onExitConfigurator: exitConfigurator,
    onReenterConfigurator: reenterConfigurator,
    onLaunchAlignmentTool: launchAlignmentTool,
    onExitAlignmentTool: exitAlignmentTool,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList);

