import * as React from 'react';

import '../styles/configurator.css';

import BezelSettings from './BezelSettings';
import BezelToolbar from './BezelToolbar';
import BezelPreview from './BezelPreview';

export interface BezelConfiguratorProps {
  serialNumber: string;
  onCloseBezelConfigurator: () => any;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const BezelConfigurator = (props: BezelConfiguratorProps) => {

  return (
    <div className='bezelConfigurationContainer'>
      <BezelSettings serialNumber={props.serialNumber}/>
      <BezelPreview serialNumber={props.serialNumber} />

      <div className='rightPaddingContainer'/>
      <div className='leftPaddingContainer'/>

      <BezelToolbar
        serialNumber={props.serialNumber}
        onCloseBezelConfigurator={props.onCloseBezelConfigurator}
      />
    </div>
  );
};

export default BezelConfigurator;
