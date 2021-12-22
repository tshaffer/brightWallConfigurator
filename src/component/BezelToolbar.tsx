import * as React from 'react';

import '../styles/configurator.css';

import ButtonComponent from './ButtonComponent';

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const BezelToolbar = () => {

  return (
    <div className='buttonContainer'>
      <ButtonComponent
        className='firstButton'
        label='Apply to All'
      />
      <ButtonComponent
        className='button'
        label='Apply'
      />
      <ButtonComponent
        className='button'
        label='Cancel'
      />
    </div>
  );
};

export default BezelToolbar;
