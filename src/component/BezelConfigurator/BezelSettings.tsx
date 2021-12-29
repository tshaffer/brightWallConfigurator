import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../styles/configurator.css';

import BezelSizeSetting from './BezelSizeSetting';

import {
  getBezelWidth,
  getBezelHeight,
  getBezelScreenWidth,
  getBezelScreenHeight,
} from '../../selector';
import { setBezelHeight, setBezelScreenHeight, setBezelScreenWidth, setBezelWidth } from '../../controller';

export interface BezelSettingsPropsFromParent {
  serialNumber: string;
}

export interface BezelSettingsProps extends BezelSettingsPropsFromParent {
  bezelWidth: number;
  bezelHeight: number;
  screenWidth: number;
  screenHeight: number;
  onSetBezelWidth: (serialNumber: string, bezelWidth: number) => any;
  onSetBezelHeight: (serialNumber: string, bezelHeight: number) => any;
  onSetBezelScreenWidth: (serialNumber: string, width: number) => any;
  onSetBezelScreenHeight: (serialNumber: string, height: number) => any;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const BezelSettings = (props: BezelSettingsProps) => {

  const [bezelWidth, setBezelWidth] = React.useState(0);
  const [bezelHeight, setBezelHeight] = React.useState(0);
  const [screenWidth, setScreenWidth] = React.useState(0);
  const [screenHeight, setScreenHeight] = React.useState(0);

  const handleUpdateBezelWidth = (width: number) => {
    // props.onSetBezelWidth(props.serialNumber, bezelWidth);
    setBezelWidth(width);
  };

  const handleUpdateBezelHeight = (height: number) => {
    // props.onSetBezelHeight(props.serialNumber, bezelHeight);
    setBezelHeight(height);
  };
  
  const handleUpdateScreenWidth = (width: number) => {
    // props.onSetBezelScreenWidth(props.serialNumber, width);
    setScreenWidth(width);
  };

  const handleUpdateScreenHeight = (height: number) => {
    // props.onSetBezelScreenHeight(props.serialNumber, height);
    setScreenHeight(height);
  };
  
  return (
    <form className='leftToolbarContainer'>
      <BezelSizeSetting
        id='bezelWidth'
        label='Bezel Width (mm)'
        value={bezelWidth.toString()}
        onUpdateBezelSetting={handleUpdateBezelWidth}
      />
      <BezelSizeSetting
        id='bezelHeight'
        label='Bezel Height (mm)'
        value={bezelHeight.toString()}
        onUpdateBezelSetting={handleUpdateBezelHeight}
      />
      <BezelSizeSetting
        id='bezelWidth'
        label='Screen Width (mm)'
        value={screenWidth.toString()}
        onUpdateBezelSetting={handleUpdateScreenWidth}
      />
      <BezelSizeSetting
        id='bezelHeight'
        label='Screen Height (mm)'
        value={screenHeight.toString()}
        onUpdateBezelSetting={handleUpdateScreenHeight}
      />
    </form>
  );
};

function mapStateToProps(state: any, ownProps: BezelSettingsPropsFromParent): Partial<BezelSettingsProps> {
  const serialNumber = ownProps.serialNumber;
  return {
    serialNumber,
    bezelWidth: getBezelWidth(state, serialNumber),
    bezelHeight: getBezelHeight(state, serialNumber),
    screenWidth: getBezelScreenWidth(state, serialNumber),
    screenHeight: getBezelScreenHeight(state, serialNumber),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onSetBezelWidth: setBezelWidth,
    onSetBezelHeight: setBezelHeight,
    onSetBezelScreenWidth: setBezelScreenWidth,
    onSetBezelScreenHeight: setBezelScreenHeight,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BezelSettings);
