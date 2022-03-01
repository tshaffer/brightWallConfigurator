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
  getBezelLeft,
  getBezelRight,
  getBezelTop,
  getBezelBottom,
  getBezelScreenWidth,
  getBezelScreenHeight,
} from '../../selector';

export interface BezelConfiguratorPropsFromParent {
  serialNumber: string;
  onCloseBezelConfigurator: () => any;
}

export interface BezelConfiguratorProps extends BezelConfiguratorPropsFromParent {
  bezelLeft: number;
  bezelRight: number;
  bezelTop: number;
  bezelBottom: number;
  screenWidth: number;
  screenHeight: number;

  onSetBezelDimensions: (
    serialNumber: string,
    bezelLeft: number,
    bezelRight: number,
    bezelTop: number,
    bezelBottom: number,
    screenWidth: number,
    screenHeight: number,
  ) => any;

  onSetBezelDimensionsOnAllDevices: (
    bezelLeft: number,
    bezelRight: number,
    bezelTop: number,
    bezelBottom: number,
    screenWidth: number,
    screenHeight: number,
  ) => any;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const BezelConfigurator = (props: BezelConfiguratorProps) => {

  const [displayedBezelLeft, setDisplayedBezelLeft] = React.useState(props.bezelLeft);
  const [displayedBezelRight, setDisplayedBezelRight] = React.useState(props.bezelRight);
  const [displayedBezelTop, setDisplayedBezelTop] = React.useState(props.bezelTop);
  const [displayedBezelBottom, setDisplayedBezelBottom] = React.useState(props.bezelBottom);
  const [displayedScreenWidth, setDisplayedScreenWidth] = React.useState(props.screenWidth);
  const [displayedScreenHeight, setDisplayedScreenHeight] = React.useState(props.screenHeight);

  const handleSetDisplayedBezelLeft = (bezelLeft: number) => {
    setDisplayedBezelLeft(bezelLeft);
  };

  const handleSetDisplayedBezelRight = (bezelRight: number) => {
    setDisplayedBezelRight(bezelRight);
  };

  const handleSetDisplayedBezelTop = (bezelTop: number) => {
    setDisplayedBezelTop(bezelTop);
  };

  const handleSetDisplayedBezelBottom = (bezelBottom: number) => {
    setDisplayedBezelBottom(bezelBottom);
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
      displayedBezelLeft,
      displayedBezelRight,
      displayedBezelTop,
      displayedBezelBottom,
      displayedScreenWidth,
      displayedScreenHeight
    );
    props.onCloseBezelConfigurator();
  };

  const handleApplyToAll = () => {
    props.onSetBezelDimensionsOnAllDevices(
      displayedBezelLeft,
      displayedBezelRight,
      displayedBezelTop,
      displayedBezelBottom,
      displayedScreenWidth,
      displayedScreenHeight
    );
    props.onCloseBezelConfigurator();
  };

  return (
    <div className='bezelConfigurationContainer'>
      <BezelSettings
        initialBezelLeft={props.bezelLeft}
        initialBezelRight={props.bezelRight}
        initialBezelTop={props.bezelTop}
        initialBezelBottom={props.bezelBottom}
        initialScreenWidth={props.screenWidth}
        initialScreenHeight={props.screenHeight}
        onSetBezelLeft={handleSetDisplayedBezelLeft}
        onSetBezelRight={handleSetDisplayedBezelRight}
        onSetBezelTop={handleSetDisplayedBezelTop}
        onSetBezelBottom={handleSetDisplayedBezelBottom}
        onSetScreenWidth={handleSetDisplayedScreenWidth}
        onSetScreenHeight={handleSetDisplayedScreenHeight}
      />
      <BezelPreview
        bezelLeft={displayedBezelLeft}
        bezelRight={displayedBezelRight}
        bezelTop={displayedBezelTop}
        bezelBottom={displayedBezelBottom}
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
    onSetBezelDimensions: setBezelDimensions,
    onSetBezelDimensionsOnAllDevices: setBezelDimensionsOnAllDevices,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BezelConfigurator);
