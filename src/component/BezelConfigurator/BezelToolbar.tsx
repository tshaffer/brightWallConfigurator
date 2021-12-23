import * as React from 'react';

import '../../styles/configurator.css';

export interface BezelToolbarProps {
  onCloseBezelConfigurator: () => any;
  serialNumber: string;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const BezelToolbar = (props: BezelToolbarProps) => {

  const handleApplyToAll = () => {
    console.log('handleApplyToAll');
  };

  const handleApply = () => {
    console.log('handleApply');
  };

  const handleCancel = () => {
    console.log('handleCancel');
    props.onCloseBezelConfigurator();
  };

  return (
    <div className='buttonContainer'>
      <button onClick={handleApplyToAll}>Apply to All</button>
      <button onClick={handleApply}>Apply</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default BezelToolbar;
