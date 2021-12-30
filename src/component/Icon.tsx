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
      // width: 60 * scaleValue + 'px',
      // margin: '10px 5px 5px 5px',
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
    /*
            <InteractiveCanvasEdgeEventIcon
              eventType={type}
              isSelected={isSelected}
              pathElementMarkerTranslate={'scale(' + 0.6 * scaleValue + ') translate(1, 0)'}
              isDisabled={isDisabled}
            />
    */
    // const edgeElementMarkerTranslateStyle = 'scale(0.6) translate(1, 0)';
    /* timeout icon
        d={'M32,0A32,32,0,1,0,64,32,32,32,0,0,0,32,0Zm0,61A29,29,0,1,1,61,32,29,29,0,0,1,32,61ZM12'
          + '.88,26V51.55H50.3V26ZM37,27.74,33,32.84h-6.8l4.08-5.1Zm-20.41,0h6.8l-4.08,5.1H14.58V3'
          + '0.29Zm29.94,5.1H39.75l4.09-5.1H48.6v2.55ZM12.88,26l36.45-8.47L47.4,9.28,11,17.75ZM46.'
          + '71,13.81l.58,2.48-4.64,1.08-5.13-4,6.62-1.54ZM30.89,14.87l5.13,4-6.63,1.54-5.13-4ZM13'
          + ',19,17.64,18l5.13,4-6.63,1.54-2.57-2Z'}
    */
    /* close icon from Sergey
         d={'M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256C397.4,512,512,397.4,512,256S397.4,0,256,0zM336.1'
           + '303c9.375,9.375,9.375,24.56,0,33.94c-9.381,9.381-24.56,9.373-33.94,0L256,289.9l-47.03'
           + '47.03c-9.381,9.381-24.56,9.373-33.94,0c-9.375-9.375-9.375-24.56,0-33.94l47.03-47.03L175'
           + '208.1c-9.375-9.375-9.375-24.56,0-33.94s24.56-9.375,33.94,0L256,222.1l47.03-47.03c9.375-9.375'
           + '24.56-9.375,33.94,0s9.375,24.56,0,33.94l-47.03,47.03L336.1,303z'}
    */
    // const edgeElementMarkerTranslateStyle = 'scale(0.3) translate(1, 0)';
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
  }

  const renderCloseSVG = () => {

    // const isSelected = false;
    // const scaleType = 'Large';
    const scaleValue = 1;

    const closeIcon = renderCloseIcon();

    //         onClick={props.onRemoveBrightSignFromWall}

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

    // const isSelected = false;
    // const scaleType = 'Large';
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
