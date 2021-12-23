import * as React from 'react';

import '../styles/configurator.css';

import Button from './ButtonComponent';

import DeviceList from './DeviceList';
import ScreensInWall from './ScreensInWall';

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const WallConfiguration = () => {

  return (
    <div className='deviceBezelContainer'>

      <DeviceList />
      <ScreensInWall />

      <div className='leftButtonContainer'>
        <button>
          Test Alignment
        </button>
      </div>

      <div className='rightButtonContainer'>
        <button>
          Start Wall
        </button>
      </div>
    </div>
  );
};

/*
          <button className={classes.MsgStyle} onClick={handleLaunchAlignment}>
            {alignLabel}
          </button>
*/

export default WallConfiguration;

