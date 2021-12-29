import * as React from 'react';

import '../../styles/configurator.css';

import BezelSizeSetting from './BezelSizeSetting';

export interface BezelSettingsProps {
  onSetBezelWidth: (bezelWidth: number) => any;
  onSetBezelHeight: (bezelHeight: number) => any;
  onSetScreenWidth: (width: number) => any;
  onSetScreenHeight: (height: number) => any;
  initialBezelWidth: number;
  initialBezelHeight: number;
  initialScreenWidth: number;
  initialScreenHeight: number;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const BezelSettings = (props: BezelSettingsProps) => {

  const [bezelWidth, setBezelWidth] = React.useState(props.initialBezelWidth);
  const [bezelHeight, setBezelHeight] = React.useState(props.initialBezelHeight);
  const [screenWidth, setScreenWidth] = React.useState(props.initialScreenWidth);
  const [screenHeight, setScreenHeight] = React.useState(props.initialScreenHeight);

  const handleUpdateBezelWidth = (width: number) => {
    props.onSetBezelWidth(width);
    setBezelWidth(width);
  };

  const handleUpdateBezelHeight = (height: number) => {
    props.onSetBezelHeight(height);
    setBezelHeight(height);
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
        id='bezelWidth'
        label='Bezel Width (mm)'
        value={bezelWidth.toString()}
        onUpdateBezelSetting={handleUpdateBezelWidth}
      />
      <BezelSizeSetting
        id='bezelHeight'
        label='Bezel Height (mm)'
        value={bezelHeight.toString()}
        onUpdateBezelSetting={handleUpdateBezelHeight}
      />
      <BezelSizeSetting
        id='bezelWidth'
        label='Screen Width (mm)'
        value={screenWidth.toString()}
        onUpdateBezelSetting={handleUpdateScreenWidth}
      />
      <BezelSizeSetting
        id='bezelHeight'
        label='Screen Height (mm)'
        value={screenHeight.toString()}
        onUpdateBezelSetting={handleUpdateScreenHeight}
      />
    </form>
  );
};

export default BezelSettings;
