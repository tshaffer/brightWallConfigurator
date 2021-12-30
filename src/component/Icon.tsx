import * as React from 'react';
import { style } from 'typestyle';

export interface IconProps {
  iconType: string;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------


const Icon = (props: IconProps) => {

  const getIconContainerStyle = (scaleValue: number, isDisabled: boolean) => {
    return style({
      height: 'auto',
      width: 40 * scaleValue + 'px',
      margin: '2px 5px 5px 2px',
      display: 'inline-block',
      verticalAlign: 'top',
      backgroundSize: 'contain',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      textAlign: 'center'
    });
  };

  const getSVGStyle = () => {
    return style({
      alignContent: 'stretch',
      flex: '1',
      height: '100%',
      width: '100%',
    });
  };

  const getSVGContainerStyle = (scaleValue: number) => {
    const scaledSize = 40 * scaleValue;
    return style({
      height: scaledSize + 'px',
      width: scaledSize + 'px',
      display: 'inline-block'
    });
  };

  const getEventIconStyle = (isSelected: boolean) => style({
    fill: isSelected === true ? '#2db5fd' : '#787878',
    stroke: isSelected === true ? '#2db5fd' : '#787878',
    cursor: 'pointer',
  });

  const renderCloseIcon = () => {
    const edgeElementMarkerTranslateStyle = 'scale(0.6) translate(1, 0)';
    return (
      <path
        transform={edgeElementMarkerTranslateStyle}
        d={'M21.125,0H4.875C2.182,0,0,2.182,0,4.875v16.25C0,23.818,2.182,26,4.875,26h16.25'
          + 'C23.818,26,26,23.818,26,21.125V4.875C26,2.182,23.818,0,21.125,0z M18.78,17.394l-1.388,1.387c-0.254,0.255-0.67,0.255-0.924,0'
          + 'L13,15.313L9.533,18.78c-0.255,0.255-0.67,0.255-0.925-0.002L7.22,17.394c-0.253-0.256-0.253-0.669,0-0.926l3.468-3.467'
          + 'L7.221,9.534c-0.254-0.256-0.254-0.672,0-0.925l1.388-1.388c0.255-0.257,0.671-0.257,0.925,0L13,10.689l3.468-3.468'
          + 'c0.255-0.257,0.671-0.257,0.924,0l1.388,1.386c0.254,0.255,0.254,0.671,0.001,0.927l-3.468,3.467l3.468,3.467'
          + 'C19.033,16.725,19.033,17.138,18.78,17.394z'}
        className={getEventIconStyle(false)}
      />
    );
  };

  const renderDeviceIcon = () => {
    const edgeElementMarkerTranslateStyle = 'scale(0.6) translate(1, 0)';
    return (
      <path
        transform={edgeElementMarkerTranslateStyle}
        d={'M51.702,19.556l0.024-0.038L41.009,7.951H11.736L1.857,19.198L1.2,19.954l0.058,0.056'
          + 'C0.442,21.269,0,22.742,0,24.248v13.287c0,4.3,3.5,7.799,7.801,7.799h37.683c4.301,0,7.8-3.499,7.8-7.799V24.248'
          + 'C53.283,22.544,52.727,20.905,51.702,19.556z M39.195,12.105l4.025,4.343H32.304v4.095c0,2.294-2.285,2.638-3.647,2.638h-4.032'
          + 'c-1.362,0-3.647-0.344-3.647-2.638v-4.095H9.8l3.816-4.343H39.195z M4.152,24.248c0-2.012,1.636-3.647,3.648-3.647h9.025'
          + ' c0.03,4.029,3.156,6.731,7.8,6.731h4.032c4.643,0,7.77-2.702,7.8-6.731h9.026c0.954,0,1.854,0.366,2.54,1.032l0.038,0.04'
          + 'c0.688,0.688,1.068,1.604,1.068,2.575v13.287c0,2.011-1.636,3.646-3.646,3.646H7.8c-2.012,0-3.648-1.635-3.648-3.646'
          + 'C4.152,37.535,4.152,24.248,4.152,24.248z'}
        className={getEventIconStyle(false)}
      />
    );
  };

  const renderCloseSVG = () => {

    const scaleValue = 1;

    const closeIcon = renderCloseIcon();

    return (
      <div
        className={getIconContainerStyle(scaleValue, false)}
      >
        <div className={getSVGContainerStyle(scaleValue)}>
          <svg className={getSVGStyle()}>
            {closeIcon}
          </svg>
        </div>
      </div>
    );
  };

  const renderDeviceSVG = () => {

    const scaleValue = 1;

    const deviceIcon = renderDeviceIcon();

    return (
      <div
        className={getIconContainerStyle(scaleValue, false)}
      >
        <div className={getSVGContainerStyle(scaleValue)}>
          <svg className={getSVGStyle()}>
            {deviceIcon}
          </svg>
        </div>
      </div>
    );
  };


  let svg;

  switch (props.iconType) {
    case 'device':
      svg = renderDeviceSVG();
      break;
    case 'close':
      svg = renderCloseSVG();
      break;
    default:
      svg = null;
      break;
  }

  return (
    <React.Fragment>
      {svg}
    </React.Fragment>
  );
};

export default Icon;
