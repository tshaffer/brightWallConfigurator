import { isNil, isNumber } from 'lodash';
import * as React from 'react';

import '../../styles/configurator.css';

export interface BezelSizeSettingPropsFromParent {
  onUpdateBezelSetting: (bezelSetting: number) => any;
}

export interface BezelSizeSettingProps extends BezelSizeSettingPropsFromParent {
  id: string;
  label: string;
  value: number;

}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

// TEDTODOBW - derived from BsFormNumberInput - refer to that file for possible fixes / improvements.

const BezelSizeSetting = (props: BezelSizeSettingProps) => {

  const [focus, setFocus] = React.useState(false);
  const [value, setValue] = React.useState(props.value.toString());

  const getValue = (): number => {
    const value = props.value;
    if (!isNumber(value)) {
      return 0;
    } else {
      return value;
    }
  };

  const getDecimalDigit = (): number => {
    // TEDTODOBW
    // if not specified assume integer, i.e. 0 digits
    // const decimalDigit = !isNil(prevProps) ? prevProps.decimalDigit : this.props.decimalDigit;
    // if (!isNumber(decimalDigit)) {
    //   return 0;
    // } else {
    //   return decimalDigit;
    // }
    return 2;
  };

  const getFormattedValue = (): string | number => {
    const inputAsNumber: number = getValue();
    const decimalDigit = getDecimalDigit();
    if (isNumber(decimalDigit)) {
      return inputAsNumber.toFixed(decimalDigit);
    } else {
      return inputAsNumber;
    }
  };

  const isValueOutOfBounds = (value: number): boolean => {
    // TEDTODOBW
    const maximum = 10000;
    const minimum = 0;
    if (isNumber(maximum) && value > maximum) {
      return true;
    } else if (value > Number.MAX_SAFE_INTEGER || value === Number.POSITIVE_INFINITY) {
      return true;
    }
    if (isNumber(minimum) && value < minimum) {
      return true;
    } else if (value < Number.MIN_SAFE_INTEGER || value === Number.NEGATIVE_INFINITY) {
      return true;
    }
    return false;
  };

  const parseValueInBoundsLimit = (value: number): number => {
    // TEDTODOBW
    const maximum = 10000;
    const minimum = 0;
    if (isNumber(maximum) && value > maximum) {
      return maximum;
    } else if (value > (Number.MAX_SAFE_INTEGER) || value === Number.POSITIVE_INFINITY) {
      return Number.MAX_SAFE_INTEGER;
    }
    if (isNumber(minimum) && value < minimum) {
      return minimum;
    } else if (value < Number.MIN_SAFE_INTEGER || value === Number.NEGATIVE_INFINITY) {
      return Number.MIN_SAFE_INTEGER;
    }
    return value;
  };

  const handleUpdate = (input: HTMLInputElement) => {
    const decimalDigit = getDecimalDigit();
    const value = input.value;
    const parsed = value === '' || value === '-'
      ? 0
      : parseFloat(value);
    if (isNumber(parsed)) {
      if (isNil(decimalDigit)) {
        props.onUpdateBezelSetting(parsed);
      } else {
        props.onUpdateBezelSetting(Number(parsed.toFixed(decimalDigit)));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueAsNumber = Number(e.target.value);
    const valueStr = e.target.value + '';
    const decimalDigit = getDecimalDigit();
    const decimalDigitOffset = isNumber(decimalDigit) ? decimalDigit : 0;
    const decimalChar = valueStr.charAt(valueStr.length - decimalDigitOffset - 2);
    let parsed = '';

    if (valueStr === '') {
      parsed = '';
    } else if (isNaN(Number(valueAsNumber))) {
      parsed = value;
    } else if (isValueOutOfBounds(Number(valueAsNumber)) && isNumber(decimalDigit)) {
      parsed = parseValueInBoundsLimit(Number(valueAsNumber)).toFixed(decimalDigit);
    } else if (decimalChar === '.') {
      parsed = valueStr.substring(0, valueStr.length - 1);
    } else if (decimalDigit === 0) {
      parsed = valueAsNumber + '';
    } else {
      parsed = valueStr;
    }

    setValue(parsed);
    // this.props.onChange(valueStr === '-' ? 0 : (isNaN(value) ? Number(parsed) : value));
  };

  const handleFocus = () => {
    setFocus(true);
    setValue(getFormattedValue() + '');
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (focus) {
      setFocus(false);
      handleUpdate(e.target as HTMLInputElement);
    }
  };

  return (
    <React.Fragment>
      <label className='leftToolbarContainerLabel' htmlFor={props.id}>{props.label}</label>
      <input
        className='leftToolbarContainerInput'
        id={props.label}
        value={focus ? value : getFormattedValue()}
        type='text'
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </React.Fragment>
  );
};

export default BezelSizeSetting;
