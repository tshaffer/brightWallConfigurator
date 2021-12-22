// external imports
import React from 'react';
import { defaultTo } from 'lodash';

import '../styles/configurator.css';

// styles

// type declaration
interface ButtonPropsType {
  label?: string;
  className?: string;
  wide?: boolean;
}

// implementation
function Button(props: ButtonPropsType) {
  const label: string = defaultTo(props.label, '');
  const className: string = defaultTo(props.className, '');
  const wide: boolean = defaultTo(props.wide, false);

//   <div className={`${button} ${className} ${wide ? wideButton : ''}`}>

  return (
    <div className={'button'}>
      {label}
    </div>
  );
}

// exports
export default Button;
