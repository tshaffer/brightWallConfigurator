import * as React from 'react';

import '../../styles/configurator.css';
import { tryConvertStringToNumber } from '../../utility';

export interface BezelSizeSettingPropsFromParent {
  onUpdateBezelSetting: (bezelSetting: number) => any;
}

export interface BezelSizeSettingProps extends BezelSizeSettingPropsFromParent {
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
    const bezelSetting = tryConvertStringToNumber(event.target.value, 0);
    props.onUpdateBezelSetting(bezelSetting);
  };

  return (
    <React.Fragment>
      <label className='leftToolbarContainerLabel' htmlFor={props.id}>{props.label}</label>
      <input
        className='leftToolbarContainerInput'
        id={props.label}
        value={props.value}
        type='text'
        onChange={handleChange}
      />
    </React.Fragment>
  );
};

export default BezelSizeSetting;
