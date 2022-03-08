import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ReactModal from 'react-modal';

import { map } from 'lodash';

import '../styles/configurator.css';

import BezelConfigurator from './BezelConfigurator/BezelConfigurator';

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
  getSerialNumber,
} from '../selector';

import Device from './Device';

export interface DeviceListProps {
  brightSignsInWall: BrightSignMap;
  serialNumber: string;
  bezelLeft: number;
  bezelRight: number;
  bezelTop: number;
  bezelBottom: number;
  screenWidth: number;
  screenHeight: number;
}

const DeviceList = (props: DeviceListProps) => {

  const [showBezelConfigurator, setShowBezelConfigurator] = React.useState(false);

  const bezelModalStyle = {
    content: {
      top: '10%',
      left: '10%',
      right: '10%',
      bottom: '10%',
    },
  };

  const handleEditBezel = () => {
    setShowBezelConfigurator(true);
  };

  const handleCloseBezelConfigurator = () => {
    setShowBezelConfigurator(false);
  };

  console.log(props.brightSignsInWall);

  const serialNumbers: string[] = [];
  for (const key in props.brightSignsInWall) {
    if (Object.prototype.hasOwnProperty.call(props.brightSignsInWall, key)) {
      const brightSignInWall: BrightSignAttributes = props.brightSignsInWall[key];
      serialNumbers.push(brightSignInWall.serialNumber);
    }
  }

  return (
    <React.Fragment>

      <div>
        <ReactModal
          isOpen={showBezelConfigurator}
          style={bezelModalStyle}
          ariaHideApp={false}
        >
          <BezelConfigurator
            serialNumber={props.serialNumber}
            onCloseBezelConfigurator={handleCloseBezelConfigurator}
          />
        </ReactModal>
      </div>

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
          <div className='editScreenButtonContainer'>
            <button
              className='configuratorButtonStyle'
              onClick={handleEditBezel}
            >
              Edit Screen
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

function mapStateToProps(state: any, ownProps: any): Partial<any> {
  const serialNumber = getSerialNumber(state);
  return {
    serialNumber,
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

