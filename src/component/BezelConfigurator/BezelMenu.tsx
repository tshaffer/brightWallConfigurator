import * as React from 'react';

import '../../styles/configurator.css';

export interface BezelMenuProps {
  onApply: () => any;
  onApplyToAll: () => any;
  onCloseBezelConfigurator: () => any;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const BezelMenu = (props: BezelMenuProps) => {

  const handleApply = () => {
    console.log('handleApply');
    props.onApply();
  };

  const handleApplyToAll = () => {
    console.log('handleApplyToAll');
    props.onApplyToAll();
  };

  const handleCancel = () => {
    console.log('handleCancel');
    props.onCloseBezelConfigurator();
  };

  return (
    <div className='buttonContainer'>
      <button className='leftConfiguratorButtonStyle' onClick={handleApplyToAll}>Apply to All</button>
      <button className='middleConfiguratorButtonStyle' onClick={handleApply}>Apply</button>
      <button className='rightConfiguratorButtonStyle' onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default BezelMenu;
