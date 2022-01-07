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

  const getDeviceIconContainerStyle = (scaleValue: number, isDisabled: boolean) => {
    return style({
      height: 'auto',
      width: '80px',
      margin: '-10px 5px 5px 2px',
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

  const getDeviceSVGContainerStyle = () => {
    return style({
      height: '40px',
      width: '80px',
      display: 'inline-block'
    });
  };
  const getEventIconStyle = (isSelected: boolean) => style({
    fill: isSelected === true ? '#2db5fd' : '#787878',
    stroke: isSelected === true ? '#2db5fd' : '#787878',
    cursor: 'pointer',
  });

  const getDeviceEnabledIconStyle = () => style({
    fill: '#31006F',
    fillRule: 'evenodd',
    clipRule: 'evenodd',
    stroke: '#31006F',
    strokeWidth: 2,
    strokeMiterlimit: 10,
  });

  const getDeviceDisabledIconStyle = () => style({
    opacity: 0.49,
    fill: '#3D3935',
    fillRule: 'evenodd',
    clipRule: 'evenodd',
    stroke: '#3D3935',
    strokeWidth: 2,
    strokeMiterlimit: 10,
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

  const renderDeviceEnabledIcon = (scaleValue: number) => {
    const edgeElementMarkerTranslateStyle = 'scale(' + scaleValue + ') translate(0, 0)';
    return (
      <path
        transform={edgeElementMarkerTranslateStyle}
        d={'M37.3,333.5l82-134.4c18.7-18.6,28.7-18.6,44.8-20.6l482.5-1.8c28.9,0.8,46,18.7,58.2,41.9l36.9,112.8'
          + 'c7.2,21.5,6.1,34.8-9.4,34H39.8C27.9,359.2,28.7,347.9,37.3,333.5z M41.7,364l692.5,0c11.3-0.5,10.7-7.5,9.4-17'
          + 'c-3.1-22.9-11.6-38.4-22.1-51.1c-9.2-14.1-40.3-28.9-72.9-26.3L120,271.5c-23.3-1.1-40.8,8.2-53.9,19.2L36,339.1'
          + 'C27.5,346.4,29.7,360.9,41.7,364z M553.8,311.3c-5.6,0-10.1,4.5-10.1,10.1c0,5.6,4.5,10.1,10.1,10.1s10.1-4.5,10.1-10.1'
          + 'C563.9,315.8,559.3,311.3,553.8,311.3z M599.6,311.3c-5.6,0-10.1,4.5-10.1,10.1c0,5.6,4.5,10.1,10.1,10.1s10.1-4.5,10.1-10.1'
          + 'C609.8,315.8,605.2,311.3,599.6,311.3z M323.5,312.9h-67.6v17h67.6V312.9z M183.6,296.8h-49.2V346h49.2V296.8z'}
        className={getDeviceEnabledIconStyle()}
      />
    );
  };

  const renderDeviceDisabledIcon = (scaleValue: number) => {
    const edgeElementMarkerTranslateStyle = 'scale(' + scaleValue + ') translate(0, 0)';
    return (
      <path
        transform={edgeElementMarkerTranslateStyle}
        d={'M37.3,333.5l82-134.4c18.7-18.6,28.7-18.6,44.8-20.6l482.5-1.8c28.9,0.8,46,18.7,58.2,41.9l36.9,112.8'
          + 'c7.2,21.5,6.1,34.8-9.4,34H39.8C27.9,359.2,28.7,347.9,37.3,333.5z M41.7,364l692.5,0c11.3-0.5,10.7-7.5,9.4-17'
          + 'c-3.1-22.9-11.6-38.4-22.1-51.1c-9.2-14.1-40.3-28.9-72.9-26.3L120,271.5c-23.3-1.1-40.8,8.2-53.9,19.2L36,339.1'
          + 'C27.5,346.4,29.7,360.9,41.7,364z M553.8,311.3c-5.6,0-10.1,4.5-10.1,10.1c0,5.6,4.5,10.1,10.1,10.1s10.1-4.5,10.1-10.1'
          + 'C563.9,315.8,559.3,311.3,553.8,311.3z M599.6,311.3c-5.6,0-10.1,4.5-10.1,10.1c0,5.6,4.5,10.1,10.1,10.1s10.1-4.5,10.1-10.1'
          + 'C609.8,315.8,605.2,311.3,599.6,311.3z M323.5,312.9h-67.6v17h67.6V312.9z M183.6,296.8h-49.2V346h49.2V296.8z'}
        className={getDeviceDisabledIconStyle()}
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

  const renderDeviceEnabledSVG = (scaleValue: number) => {

    const deviceEnabledIcon = renderDeviceEnabledIcon(scaleValue);

    return (
      <div
        className={getDeviceIconContainerStyle(scaleValue, false)}
      >
        <div className={getDeviceSVGContainerStyle()}>
          <svg className={getSVGStyle()}>
            {deviceEnabledIcon}
          </svg>
        </div>
      </div>
    );
  };

  const renderDeviceDisabledSVG = (scaleValue: number) => {

    const deviceDisabledIcon = renderDeviceDisabledIcon(scaleValue);

    return (
      <div
        className={getDeviceIconContainerStyle(scaleValue, false)}
      >
        <div className={getDeviceSVGContainerStyle()}>
          <svg className={getSVGStyle()}>
            {deviceDisabledIcon}
          </svg>
        </div>
      </div>
    );
  };

  const scaleValue = 0.1;

  let svg;

  switch (props.iconType) {
    case 'device':
      svg = renderDeviceEnabledSVG(scaleValue);
      break;
    case 'deviceDisabled':
      svg = renderDeviceDisabledSVG(scaleValue);
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
