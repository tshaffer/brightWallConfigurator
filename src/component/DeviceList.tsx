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
} from '../selector';

import Device from './Device';

export interface DeviceListProps {
  brightSignsInWall: BrightSignMap;
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
    <form className='deviceListContainer'>
      {
        map(serialNumbers, serialNumber =>
          <Device
            serialNumber={serialNumber}
            key={`device_${serialNumber}`}
          />
        )
      }
    </form>
  );
};

function mapStateToProps(state: any, ownProps: any): Partial<any> {
  return {
    isBrightWall: getIsBrightWall(state),
    brightWallDeviceSetupActiveScreen: getBrightWallDeviceSetupActiveScreen(state),
    numRows: getNumRows(state),
    numColumns: getNumColumns(state),
    brightSignsInWall: getBrightSignsInWall(state),
    brightWallUnitAssignments: getBrightWallUnitAssignments(state),
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

