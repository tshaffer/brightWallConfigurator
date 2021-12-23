import * as React from 'react';

import '../styles/configurator.css';

import Button from './ButtonComponent';

import DeviceList from './DeviceList';
import ScreensInWall from './ScreensInWall';
import BezelConfigurator from './BezelConfigurator';

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const WallConfiguration = () => {

  return (
    <BezelConfigurator />
  );
  // return (
  //   <div className='deviceBezelContainer'>
  //     <DeviceList />
  //     <ScreensInWall />

  //     <div className='leftButtonContainer'>
  //       <Button label="Test Alignment" wide={true} />
  //     </div>

  //     <div className='rightButtonContainer'>
  //       <Button label="Start Wall" wide={true} />
  //     </div>
  //   </div>
  // );
};

export default WallConfiguration;

