import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import ReactModal from 'react-modal';

import '../styles/configurator.css';

import DeviceList from './DeviceList';
import ScreensInWall from './ScreensInWall';

import { exitConfigurator, launchAlignmentTool, launchApp } from '../controller';
import {
  getActivePresentationName,
  getBrightWallSetupScreenEnabled,
  getIsMasterInWall,
  getSerialNumber,
} from '../selector';

export interface WallConfigurationProps {
  serialNumber: string;
  brightWallSetupScreenEnabled: boolean;
  activePresentationName: string;
  isMasterInWall: boolean;
  onLaunchApp: () => any;
  onExitConfigurator: () => any;
  onLaunchAlignmentTool: () => any;
  onExitAlignmentTool: () => any;
}


// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const WallConfiguration = (props: WallConfigurationProps) => {

  const [showPlayerIsRebooting, setShowPlayerIsRebooting] = React.useState(false);

  React.useEffect(props.onLaunchApp, []);

  const modalStyle = {
    content: {
      top: '45%',
      right: '35%',
      bottom: '48%',
      left: '35%',
    },
  };

  const handleExitConfigurator = (event: any) => {
    console.log('handleExitConfigurator invoked');
    props.onExitConfigurator();
    setShowPlayerIsRebooting(true);
  };

  const handleLaunchAlignment = (event: any) => {
    console.log('handleLaunchAlignment invoked');
    props.onLaunchAlignmentTool();
    setShowPlayerIsRebooting(true);
  };

  const renderStartWall = () => {
    return (
      <div className='middleButtonContainer'>
        <button
          className='configuratorButtonStyle'
          onClick={handleExitConfigurator}
          disabled={!props.isMasterInWall}
        >
          Start Wall
        </button>
      </div>
    );
  };

  const renderTestAlignment = () => {
    return (
      <div className='rightButtonContainer'>
        <button
          className='configuratorButtonStyle'
          onClick={handleLaunchAlignment}>
          Test Alignment
        </button>
      </div>
    );
  };

  const startWallJsx = renderStartWall();
  const testAlignmentJsx = renderTestAlignment();

  // TEDTODOBW - what to display if there is no presentation???
  //         

  return (
    <DndProvider backend={HTML5Backend}>

      <div>
        <ReactModal
          isOpen={showPlayerIsRebooting}
          style={modalStyle}
          ariaHideApp={false}
        >
          Player is rebooting. Please wait for a few moments to return to your screen.
        </ReactModal>
      </div>

      <div className='wallConfigurationContainer'>

        <div className='presentationName'>
          <p>Presentation Name: {props.activePresentationName}</p>
        </div>
        <DeviceList />
        <ScreensInWall />

        {startWallJsx}
        {testAlignmentJsx}

      </div>
    </DndProvider>
  );
};

function mapStateToProps(state: any): Partial<WallConfigurationProps> {
  return {
    brightWallSetupScreenEnabled: getBrightWallSetupScreenEnabled(state),
    activePresentationName: getActivePresentationName(state),
    isMasterInWall: getIsMasterInWall(state),
    serialNumber: getSerialNumber(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onLaunchApp: launchApp,
    onExitConfigurator: exitConfigurator,
    onLaunchAlignmentTool: launchAlignmentTool,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(WallConfiguration);


