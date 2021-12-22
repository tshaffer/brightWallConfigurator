import * as React from 'react';

import '../styles/configurator.css';

import Button from './ButtonComponent';

import DeviceList from './DeviceList';

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const WallConfiguration = () => {

  return (
    <div className='deviceBezelContainer'>
      <DeviceList />

      <div className='leftButtonContainer'>
        <Button label="Test Alignment" wide={true} />
      </div>

      <div className='rightButtonContainer'>
        <Button label="Start Wall" wide={true} />
      </div>
    </div>
  );
};

export default WallConfiguration;

