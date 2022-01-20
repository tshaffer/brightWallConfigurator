import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import WallConfiguration from './WallConfiguration';
import AlignmentRunning from './AlignmentRunning';
import PresentationRunning from './PresentationRunning';

import { launchApp } from '../controller';
import {
  getBrightWallDeviceSetupActiveScreen,
  getBrightWallSetupScreenEnabled,
  getIsBrightWall,
} from '../selector';
import { DeviceSetupScreen } from '..';

export interface AppProps {

  isBrightWall: boolean;
  brightWallDeviceSetupActiveScreen: string;
  brightWallSetupScreenEnabled: boolean;

  onLaunchApp: () => any;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const App = (props: AppProps) => {

  React.useEffect(props.onLaunchApp, []);

  if (!props.isBrightWall) {
    return (
      <div>isBrightWall is false</div>
    );
  } else {
    if (props.brightWallSetupScreenEnabled) {
      if (props.brightWallDeviceSetupActiveScreen === DeviceSetupScreen.ConfigureScreen) {
        return (
          <WallConfiguration />
        );
      } else {
        return (
          <AlignmentRunning />
        );
      }
    } else {
      return (
        <PresentationRunning />
      );
    }
  }

};

function mapStateToProps(state: any): Partial<AppProps> {
  return {
    isBrightWall: getIsBrightWall(state),
    brightWallDeviceSetupActiveScreen: getBrightWallDeviceSetupActiveScreen(state),
    brightWallSetupScreenEnabled: getBrightWallSetupScreenEnabled(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onLaunchApp: launchApp,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
