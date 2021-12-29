import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import '../styles/configurator.css';

import DeviceList from './DeviceList';
import ScreensInWall from './ScreensInWall';
import { exitConfigurator, launchAlignmentTool, reenterConfigurator } from '../controller';
import {
  getBrightWallSetupScreenEnabled,
} from '../selector';

export interface WallConfigurationProps {
  brightWallSetupScreenEnabled: boolean;
  onReenterConfigurator: () => any;
  onExitConfigurator: () => any;
  onLaunchAlignmentTool: () => any;
  onExitAlignmentTool: () => any;
}


// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const WallConfiguration = (props: WallConfigurationProps) => {

  const handleExitConfigurator = (event: any) => {
    console.log('handleExitConfigurator invoked');
    props.onExitConfigurator();
  };

  const handleReenterConfigurator = (event: any) => {
    console.log('handleReenterConfigurator invoked');
    props.onReenterConfigurator();
  };

  const handleLaunchAlignment = (event: any) => {
    console.log('handleLaunchAlignment invoked');
    props.onLaunchAlignmentTool();
  };

  const renderConfiguratorEntryExit = () => {
    if (props.brightWallSetupScreenEnabled) {
      return (
        <div className='rightButtonContainer'>
          <button onClick={handleExitConfigurator}>
            Start Wall
          </button>
        </div>
      );
    } else {
      return (
        <div className='rightButtonContainer' >
          <button onClick={handleReenterConfigurator}>
            Reboot to reenter device setup
          </button>
        </div>
      );
    }
  };

  const configuratorEntryExit = renderConfiguratorEntryExit();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='deviceBezelContainer'>
        <DeviceList />
        <ScreensInWall />

        <div className='leftButtonContainer'>
          <button onClick={handleLaunchAlignment}>
            Test Alignment
          </button>
        </div>

        {configuratorEntryExit}

      </div>
    </DndProvider>
  );
};

function mapStateToProps(state: any): Partial<WallConfigurationProps> {
  return {
    brightWallSetupScreenEnabled: getBrightWallSetupScreenEnabled(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onExitConfigurator: exitConfigurator,
    onReenterConfigurator: reenterConfigurator,
    onLaunchAlignmentTool: launchAlignmentTool,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(WallConfiguration);


