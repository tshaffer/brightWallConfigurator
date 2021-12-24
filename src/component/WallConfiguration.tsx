import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import '../styles/configurator.css';

import DeviceList from './DeviceList';
import ScreensInWall from './ScreensInWall';

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const WallConfiguration = () => {

  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
  );
};

export default WallConfiguration;

