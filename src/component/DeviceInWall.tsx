import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { style } from 'typestyle';

import '../styles/configurator.css';

import {
  getUnitName
} from '../selector';

export interface DeviceInWallPropsFromParent {
  serialNumber: string;
  onRemoveBrightSignFromWall: () => any;
}

export interface DeviceInWallProps extends DeviceInWallPropsFromParent {
  unitName: string;
  isMaster: boolean;
  onSetIsMaster: (serialNumber: string, isMaster: boolean) => any;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const DeviceInWall = (props: DeviceInWallProps) => {

  const getEventContainerStyle = (scaleValue: number, isDisabled: boolean) => {
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
    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-xmark" class="svg-inline--fa fa-circle-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256C397.4 512 512 397.4 512 256S397.4 0 256 0zM336.1 303c9.375 9.375 9.375 24.56 0 33.94c-9.381 9.381-24.56 9.373-33.94 0L256 289.9l-47.03 47.03c-9.381 9.381-24.56 9.373-33.94 0c-9.375-9.375-9.375-24.56 0-33.94l47.03-47.03L175 208.1c-9.375-9.375-9.375-24.56 0-33.94s24.56-9.375 33.94 0L256 222.1l47.03-47.03c9.375-9.375 24.56-9.375 33.94 0s9.375 24.56 0 33.94l-47.03 47.03L336.1 303z"></path></svg>
    */
  };

  const renderEventIcon = () => {
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

  const renderSVG = () => {

    // const isSelected = false;
    // const scaleType = 'Large';
    const scaleValue = 1;

    const eventIcon = renderEventIcon();

    return (
      <div
        className={getEventContainerStyle(scaleValue, false)}
        onClick={props.onRemoveBrightSignFromWall}
      >
        <div className={getSVGContainerStyle(scaleValue)}>
          <svg className={getSVGStyle()}>
            {eventIcon}
          </svg>
        </div>
      </div>
    );

  };

  const closeSVG = renderSVG();

  return (
    <div className='selectedDeviceContainer'>
      <img src='/src/img/device.svg' className='deviceImage' />

      <div className='deviceNumber'>
        {props.serialNumber}
      </div>

      {/* <img src='/src/img/close.svg' className='deleteDeviceButton' onClick={props.onRemoveBrightSignFromWall} /> */}

      {closeSVG}

      <div className='buttonContainer'>
        <button onClick={props.onRemoveBrightSignFromWall}>
          Remove Device
        </button>
      </div>

    </div>
  );
};

function mapStateToProps(state: any, ownProps: DeviceInWallPropsFromParent): Partial<DeviceInWallProps> {
  const serialNumber = ownProps.serialNumber;
  return {
    unitName: getUnitName(state, serialNumber),
    serialNumber,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceInWall);
