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
    props.onApply();
  };

  const handleApplyToAll = () => {
    props.onApplyToAll();
  };

  const handleCancel = () => {
    props.onCloseBezelConfigurator();
  };

  return (
    <div className='buttonContainer'>
      <button className='leftConfiguratorButtonStyle' onClick={handleApplyToAll}>Apply</button>
      <button className='rightConfiguratorButtonStyle' onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default BezelMenu;
