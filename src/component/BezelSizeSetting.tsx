import * as React from 'react';

import '../styles/configurator.css';

export interface BezelSizeSettingProps {
  id: string;
  label: string;
  value: string;
}
// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const BezelSizeSetting = (props: BezelSizeSettingProps) => {

  const handleChange = (event: any) => {
    console.log('BezelSizeSetting - handleChange invoked', event.target.value);
  };

  const placeholder = 'mm';

  return (
    <React.Fragment>
      <label className='leftToolbarContainerLabel' htmlFor={props.id}>{props.label}</label>
      <input
        className='leftToolbarContainerInput'
        id={props.label}
        placeholder={placeholder}
        value={props.value}
        type='text'
        onChange={handleChange}
      />
    </React.Fragment>
  );
};

export default BezelSizeSetting;
