import * as React from 'react';

import '../styles/configurator.css';

import BezelSettings from './BezelSettings';
import BezelToolbar from './BezelToolbar';
import BezelPreview from './BezelPreview';
// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const BezelConfigurator = () => {

  return (
    <div className='bezelConfigurationContainer'>
      <BezelSettings/>
      <BezelPreview
        top={0}
        bottom={10}
        left={50}
        right={0}
      />

      <div className='rightPaddingContainer'/>
      <div className='leftPaddingContainer'/>

      <BezelToolbar/>
    </div>
  );
};

export default BezelConfigurator;
