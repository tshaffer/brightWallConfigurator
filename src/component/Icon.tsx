import * as React from 'react';
import { style } from 'typestyle';

export interface IconProps {
  iconType: string;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------


const Icon = (props: IconProps) => {

  const getDeviceIconContainerStyle = (isDisabled: boolean) => {
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

  const getCloseIconContainerStyle = (isDisabled: boolean) => {
    return style({
      backgroundSize: 'contain',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      display: 'inline-block',
      height: 'auto',
      margin: '-10px 0 0 0',
      textAlign: 'center',
      verticalAlign: 'top',
      width: '26px',
    });
  };

  const getDeviceSVGContainerStyle = () => {
    return style({
      height: '40px',
      width: '80px',
      display: 'inline-block'
    });
  };

  const getCloseSVGContainerStyle = () => {
    return style({
      width: '26px',
      display: 'inline-block'
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

  const getCloseIconStyle = () => style({
    fill: '#31006F',
    fillRule: 'evenodd',
    clipRule: 'evenodd',
  });

  const renderCloseIcon = (scaleValue: number) => {
    const edgeElementMarkerTranslateStyle = 'scale(' + scaleValue + ') translate(-640, -136)';
    return (
      <path
        transform={edgeElementMarkerTranslateStyle}
        d={'M692.1,193.6l-5.3-7c-2.1-2.7-3.4-4.4-4.7-6.3h-0.1c-1.2,1.8-2.4,3.5-4.5,6.3l-5,7h-6.1l12.6-16L666.8,162h6.2'
          + 'l5.4,7.4c1.5,2.1,2.7,3.7,3.8,5.4h0.2c1.2-1.9,2.2-3.3,3.7-5.4l5.6-7.4h6.2l-12.5,15.4l12.8,16.3H692.1z M716.4,143h-69.6v66.7h69.6'
          + 'V143z M715.8,144h-68.2v64.9h68.2V144z'}
        className={getCloseIconStyle()}
      />
    );
  };

  const renderDeviceIcon = (iconStyle: string, scaleValue: number) => {
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
        className={iconStyle}
      />
    );
  };

  const renderCloseSVG = () => {

    const scaleValue = 0.3;

    const closeIcon = renderCloseIcon(scaleValue);

    return (
      <div
        className={getCloseIconContainerStyle(false)}
      >
        <div className={getCloseSVGContainerStyle()}>
          <svg className={getSVGStyle()}>
            {closeIcon}
          </svg>
        </div>
      </div>
    );
  };

  const renderDeviceEnabledSVG = () => {

    const scaleValue = 0.1;

    const deviceEnabledIcon = renderDeviceIcon(getDeviceEnabledIconStyle(), scaleValue);

    return (
      <div
        className={getDeviceIconContainerStyle(false)}
      >
        <div className={getDeviceSVGContainerStyle()}>
          <svg className={getSVGStyle()}>
            {deviceEnabledIcon}
          </svg>
        </div>
      </div>
    );
  };

  const renderDeviceDisabledSVG = () => {

    const scaleValue = 0.1;

    const deviceDisabledIcon = renderDeviceIcon(getDeviceDisabledIconStyle(), scaleValue);

    return (
      <div
        className={getDeviceIconContainerStyle(false)}
      >
        <div className={getDeviceSVGContainerStyle()}>
          <svg className={getSVGStyle()}>
            {deviceDisabledIcon}
          </svg>
        </div>
      </div>
    );
  };

  let svg;

  switch (props.iconType) {
    case 'device':
      svg = renderDeviceEnabledSVG();
      break;
    case 'deviceDisabled':
      svg = renderDeviceDisabledSVG();
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
