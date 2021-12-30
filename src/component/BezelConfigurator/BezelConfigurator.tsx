import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../styles/configurator.css';

import BezelSettings from './BezelSettings';
import BezelMenu from './BezelMenu';
import BezelPreview from './BezelPreview';

import {
  setBezelDimensions,
  setBezelDimensionsOnAllDevices,
} from '../../controller';
import {
  getBezelWidth,
  getBezelHeight,
  getBezelScreenWidth,
  getBezelScreenHeight,
} from '../../selector';

export interface BezelConfiguratorPropsFromParent {
  serialNumber: string;
  onCloseBezelConfigurator: () => any;
}

export interface BezelConfiguratorProps extends BezelConfiguratorPropsFromParent {
  bezelWidth: number;
  bezelHeight: number;
  screenWidth: number;
  screenHeight: number;

  onSetBezelDimensions: (
    serialNumber: string,
    bezelWidth: number,
    bezelHeight: number,
    screenWidth: number,
    screenHeight: number,
  ) => any;

  onSetBezelDimensionsOnAllDevices: (
    bezelWidth: number,
    bezelHeight: number,
    screenWidth: number,
    screenHeight: number,
  ) => any;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const BezelConfigurator = (props: BezelConfiguratorProps) => {

  const [displayedBezelWidth, setDisplayedBezelWidth] = React.useState(props.bezelWidth);
  const [displayedBezelHeight, setDisplayedBezelHeight] = React.useState(props.bezelHeight);
  const [displayedScreenWidth, setDisplayedScreenWidth] = React.useState(props.screenWidth);
  const [displayedScreenHeight, setDisplayedScreenHeight] = React.useState(props.screenHeight);

  const handleSetDisplayedBezelWidth = (bezelWidth: number) => {
    setDisplayedBezelWidth(bezelWidth);
  };

  const handleSetDisplayedBezelHeight = (bezelHeight: number) => {
    setDisplayedBezelHeight(bezelHeight);
  };

  const handleSetDisplayedScreenWidth = (screenWidth: number) => {
    setDisplayedScreenWidth(screenWidth);
  };

  const handleSetDisplayedScreenHeight = (screenHeight: number) => {
    setDisplayedScreenHeight(screenHeight);
  };

  const handleApply = () => {
    props.onSetBezelDimensions(
      props.serialNumber,
      displayedBezelWidth,
      displayedBezelHeight,
      displayedScreenWidth,
      displayedScreenHeight
    );
    props.onCloseBezelConfigurator();
  };

  const handleApplyToAll = () => {
    props.onSetBezelDimensionsOnAllDevices (
      displayedBezelWidth,
      displayedBezelHeight,
      displayedScreenWidth,
      displayedScreenHeight
    );
    props.onCloseBezelConfigurator();
  };

  return (
    <div className='bezelConfigurationContainer'>
      <BezelSettings
        initialBezelWidth={props.bezelWidth}
        initialBezelHeight={props.bezelHeight}
        initialScreenWidth={props.screenWidth}
        initialScreenHeight={props.screenHeight}
        onSetBezelWidth={handleSetDisplayedBezelWidth}
        onSetBezelHeight={handleSetDisplayedBezelHeight}
        onSetScreenWidth={handleSetDisplayedScreenWidth}
        onSetScreenHeight={handleSetDisplayedScreenHeight}
      />
      <BezelPreview
        bezelWidth={displayedBezelWidth}
        bezelHeight={displayedBezelHeight}
        screenWidth={displayedScreenWidth}
        screenHeight={displayedScreenHeight}
      />

      <div className='rightPaddingContainer' />
      <div className='leftPaddingContainer' />

      <BezelMenu
        onApply={handleApply}
        onApplyToAll={handleApplyToAll}
        onCloseBezelConfigurator={props.onCloseBezelConfigurator}
      />
    </div>
  );
};

function mapStateToProps(state: any, ownProps: BezelConfiguratorPropsFromParent): Partial<BezelConfiguratorProps> {
  const serialNumber = ownProps.serialNumber;
  return {
    serialNumber,
    bezelWidth: getBezelWidth(state, serialNumber),
    bezelHeight: getBezelHeight(state, serialNumber),
    screenWidth: getBezelScreenWidth(state, serialNumber),
    screenHeight: getBezelScreenHeight(state, serialNumber),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onSetBezelDimensions: setBezelDimensions,
    onSetBezelDimensionsOnAllDevices: setBezelDimensionsOnAllDevices,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BezelConfigurator);
