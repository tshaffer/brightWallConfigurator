import * as React from 'react';

import '../../styles/configurator.css';

import BezelSizeSetting from './BezelSizeSetting';

export interface BezelSettingsProps {
  onSetBezelLeft: (bezelLeft: number) => any;
  onSetBezelRight: (bezelRight: number) => any;
  onSetBezelTop: (bezelTop: number) => any;
  onSetBezelBottom: (bezelBottom: number) => any;
  onSetScreenWidth: (width: number) => any;
  onSetScreenHeight: (height: number) => any;
  initialBezelLeft: number;
  initialBezelRight: number;
  initialBezelTop: number;
  initialBezelBottom: number;
  initialScreenWidth: number;
  initialScreenHeight: number;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const BezelSettings = (props: BezelSettingsProps) => {

  const [bezelLeft, setBezelLeft] = React.useState(props.initialBezelLeft);
  const [bezelRight, setBezelRight] = React.useState(props.initialBezelRight);
  const [bezelTop, setBezelTop] = React.useState(props.initialBezelTop);
  const [bezelBottom, setBezelBottom] = React.useState(props.initialBezelBottom);
  const [screenWidth, setScreenWidth] = React.useState(props.initialScreenWidth);
  const [screenHeight, setScreenHeight] = React.useState(props.initialScreenHeight);

  const handleUpdateBezelLeft = (width: number) => {
    props.onSetBezelLeft(width);
    setBezelLeft(width);
  };

  const handleUpdateBezelRight = (width: number) => {
    props.onSetBezelRight(width);
    setBezelRight(width);
  };

  const handleUpdateBezelTop = (height: number) => {
    props.onSetBezelTop(height);
    setBezelTop(height);
  };

  const handleUpdateBezelBottom = (height: number) => {
    props.onSetBezelBottom(height);
    setBezelBottom(height);
  };

  const handleUpdateScreenWidth = (width: number) => {
    props.onSetScreenWidth(width);
    setScreenWidth(width);
  };

  const handleUpdateScreenHeight = (height: number) => {
    props.onSetScreenHeight(height);
    setScreenHeight(height);
  };

  return (
    <form className='leftToolbarContainer'>
      <BezelSizeSetting
        id='bezelLeft'
        label='Left bezel (mm)'
        value={bezelLeft}
        onUpdateBezelSetting={handleUpdateBezelLeft}
      />
      <BezelSizeSetting
        id='bezelRight'
        label='Right bezel (mm)'
        value={bezelRight}
        onUpdateBezelSetting={handleUpdateBezelRight}
      />
      <BezelSizeSetting
        id='bezelTop'
        label='Top bezel (mm)'
        value={bezelTop}
        onUpdateBezelSetting={handleUpdateBezelTop}
      />
      <BezelSizeSetting
        id='bezelBottom'
        label='Bottom bezel (mm)'
        value={bezelBottom}
        onUpdateBezelSetting={handleUpdateBezelBottom}
      />
      <BezelSizeSetting
        id='screenWidth'
        label='Screen Width (mm)'
        value={screenWidth}
        onUpdateBezelSetting={handleUpdateScreenWidth}
      />
      <BezelSizeSetting
        id='screenHeight'
        label='Screen Height (mm)'
        value={screenHeight}
        onUpdateBezelSetting={handleUpdateScreenHeight}
      />
    </form>
  );
};

export default BezelSettings;
