import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../styles/configurator.css';

import BezelSizeSetting from './BezelSizeSetting';

import {
  getBezelWidthPercentage,
  getBezelHeightPercentage,
} from '../selector';
import { setBezelHeightPercentage, setBezelWidthPercentage } from '../controller';

export interface BezelSettingsPropsFromParent {
  serialNumber: string;
}

export interface BezelSettingsProps extends BezelSettingsPropsFromParent {
  bezelWidthPercentage: number;
  bezelHeightPercentage: number;
  onSetBezelWidthPercentage: (serialNumber: string, bezelWidthPercentage: number) => any;
  onSetBezelHeightPercentage: (serialNumber: string, bezelHeightPercentage: number) => any;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const BezelSettings = (props: BezelSettingsProps) => {

  const handleUpdateBezelWidth = (bezelWidth: number) => {
    console.log('handleUpdateBezelWidth:', bezelWidth);
    props.onSetBezelWidthPercentage(props.serialNumber, bezelWidth);
  };

  const handleUpdateBezelHeight = (bezelHeight: number) => {
    console.log('handleUpdateBezelHeight:', bezelHeight);
    props.onSetBezelHeightPercentage(props.serialNumber, bezelHeight);
  };
  
  return (
    <form className='leftToolbarContainer'>
      <BezelSizeSetting
        id='bezelWidth'
        label='Bezel Width'
        value={props.bezelWidthPercentage.toString()}
        onUpdateBezelSetting={handleUpdateBezelWidth}
      />
      <BezelSizeSetting
        id='bezelHeight'
        label='Bezel Height'
        value={props.bezelHeightPercentage.toString()}
        onUpdateBezelSetting={handleUpdateBezelHeight}
      />
    </form>
  );
};

function mapStateToProps(state: any, ownProps: BezelSettingsPropsFromParent): Partial<any> {
  const serialNumber = ownProps.serialNumber;
  return {
    serialNumber,
    bezelWidthPercentage: getBezelWidthPercentage(state, serialNumber),
    bezelHeightPercentage: getBezelHeightPercentage(state, serialNumber),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onSetBezelWidthPercentage: setBezelWidthPercentage,
    onSetBezelHeightPercentage: setBezelHeightPercentage,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BezelSettings);
