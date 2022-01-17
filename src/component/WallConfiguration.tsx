import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import '../styles/configurator.css';

import DeviceList from './DeviceList';
import ScreensInWall from './ScreensInWall';
import { exitConfigurator, launchAlignmentTool, launchApp } from '../controller';
import {
  getActivePresentationName,
  getBrightWallSetupScreenEnabled,
  getIsMasterInWall,
} from '../selector';

export interface WallConfigurationProps {
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

  React.useEffect(props.onLaunchApp, []);

  const handleExitConfigurator = (event: any) => {
    console.log('handleExitConfigurator invoked');
    props.onExitConfigurator();
  };

  const handleLaunchAlignment = (event: any) => {
    console.log('handleLaunchAlignment invoked');
    props.onLaunchAlignmentTool();
  };

  const renderStartWall = () => {
    return (
      <div className='rightButtonContainer'>
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
      <div className='leftButtonContainer'>
        <button
          className='configuratorButtonStyle'
          onClick={handleLaunchAlignment}>
          Test Alignment
        </button>
      </div>
    );
  };

  const testAlignmentJsx = renderTestAlignment();
  const startWallJsx = renderStartWall();

  // TEDTODOBW - what to display if there is no presentation???
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='wallConfigurationContainer'>

        <div className='presentationName'>
          <p>Presentation Name: {props.activePresentationName}</p>
        </div>
        <DeviceList />
        <ScreensInWall />

        {testAlignmentJsx}
        {startWallJsx}

      </div>
    </DndProvider>
  );
};

function mapStateToProps(state: any): Partial<WallConfigurationProps> {
  return {
    brightWallSetupScreenEnabled: getBrightWallSetupScreenEnabled(state),
    activePresentationName: getActivePresentationName(state),
    isMasterInWall: getIsMasterInWall(state),
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


