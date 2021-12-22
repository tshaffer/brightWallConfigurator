import * as React from 'react';

import '../styles/configurator.css';

import BezelSizeSetting from './BezelSizeSetting';
// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const BezelSettings = () => {

  return (
    <form className='leftToolbarContainer'>
      <BezelSizeSetting
        id='bezelTop'
        label='Bezel Top'
        value='1'
      />
      <BezelSizeSetting
        id='bezelBottom'
        label='Bezel Bottom'
        value='2'
      />
      <BezelSizeSetting
        id='bezelRight'
        label='Bezel Right'
        value='3'
      />
      <BezelSizeSetting
        id='bezelLeft'
        label='Bezel Left'
        value='4'
      />
    </form>
  );
};

export default BezelSettings;
