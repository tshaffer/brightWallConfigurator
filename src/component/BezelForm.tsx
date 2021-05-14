import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { BezelMeasureByType } from '../type';

import {
  getBezelHeight,
  getBezelHeightPercentage,
  getBezelMeasureByType,
  getBezelScreenHeight,
  getBezelScreenWidth,
  getBezelWidth,
  getBezelWidthPercentage
} from '../selector';
import { useMemo } from 'react';
import { withStyles } from '@material-ui/core';
import {
  replicateBezel,
  setBezelMeasureByType,
  setBezelWidthPercentage,
  setBezelHeightPercentage,
  setBezelWidth,
  setBezelHeight,
  setBezelScreenWidth,
  setBezelScreenHeight,
} from '../controller';
import { PowerInputSharp } from '@material-ui/icons';

const useStyles = makeStyles({
  formStyle: {
    textAlign: 'left',
    color: 'white',
    marginTop: '10px',
    marginLeft: '16px',
  },
  textField: {
    color: 'white',
    marginLeft: '10px',
    marginRight: '10px',
    width: 200,
  },
  noTopMarginTextField: {
    color: 'white',
    marginTop: '0px',
    marginBottom: '0px',
    marginLeft: '10px',
    marginRight: '10px',
    width: 200,
    height: 32,
  },
  whiteText: {
    color: 'white',
  },
  MsgStyle: {
    // fontSize: '3vmin',
    textAlign: 'left',
  },
});

// -----------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------

export interface BezelFormPropsFromParent {
  serialNumber: string;
}

export interface BezelFormProps extends BezelFormPropsFromParent {
  bezelMeasureByType: BezelMeasureByType;
  bezelWidthPercentage: number;
  bezelHeightPercentage: number;
  bezelWidth: number;
  bezelHeight: number;
  bezelScreenWidth: number;
  bezelScreenHeight: number;
  onReplicateBezel: (serialNumber: string) => any;
  onSetBezelMeasureByType: (serialNumber: string, bezelMeasureByType: BezelMeasureByType) => any;
  onSetBezelWidthPercentage: (serialNumber: string, value: number) => any;
  onSetBezelHeightPercentage: (serialNumber: string, value: number) => any;
  onSetBezelWidth: (serialNumber: string, value: number) => any;
  onSetBezelHeight: (serialNumber: string, value: number) => any;
  onSetBezelScreenWidth: (serialNumber: string, value: number) => any;
  onSetBezelScreenHeight: (serialNumber: string, value: number) => any;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const BezelForm = (props: BezelFormProps) => {

  const classes = useStyles();

  const handleReplicateBezel = (event: any) => {
    console.log('handleReplicateBezel invoked');
    props.onReplicateBezel(props.serialNumber);
  };

  const handleSetBezelMeasureByType = (event: any) => {
    console.log('handleSetBezelMeasureByType invoked:');
    console.log(parseInt(event.target.value, 10));
    props.onSetBezelMeasureByType(props.serialNumber, parseInt(event.target.value, 10));
  };

  const handleSetBezelWidthPercentage = (event: any) => {
    console.log('handleSetBezelWidthPercentage invoked:');
    console.log(parseInt(event.target.value, 10));
    props.onSetBezelWidthPercentage(props.serialNumber, parseInt(event.target.value, 10));
  };

  const handleSetBezelHeightPercentage = (event: any) => {
    props.onSetBezelHeightPercentage(props.serialNumber, parseInt(event.target.value, 10));
  };

  const handleSetBezelWidth = (event: any) => {
    props.onSetBezelWidth(props.serialNumber, parseInt(event.target.value, 10));
  };

  const handleSetBezelHeight = (event: any) => {
    props.onSetBezelHeight(props.serialNumber, parseInt(event.target.value, 10));
  };

  const handleSetScreenWidth = (event: any) => {
    props.onSetBezelScreenWidth(props.serialNumber, parseInt(event.target.value, 10));
  };

  const handleSetScreenHeight = (event: any) => {
    props.onSetBezelScreenHeight(props.serialNumber, parseInt(event.target.value, 10));
  };

  const StyledTextField = useMemo(
    () => {
      return withStyles({
        root: {
          margin: 0,
          maxHeight: 24,
          color: 'white',
        }
      })(TextField);
    }, []
  );

  return (
    <div className={classes.formStyle}>

      <p>Bezel Width and Height</p>

      <button className={classes.MsgStyle} onClick={handleReplicateBezel}>
        {'Replicate on all devices in wall'}
      </button>
      <br />
      <br />

      <input
        type="radio"
        id="byPercentage"
        name="bezelMeasurementType"
        checked={props.bezelMeasureByType === BezelMeasureByType.Percentage}
        value={BezelMeasureByType.Percentage}
        onClick={handleSetBezelMeasureByType}
      />
      <label>By percentage</label>
      <br></br>
      <br></br>

      <label style={{ marginLeft: '24px' }}>Bezel width Percentage:</label><br></br>
      <input type="number" id="widthPercentage" name="widthPercentage"
        min="0" max="100"
        onChange={handleSetBezelWidthPercentage}
        value={props.bezelWidthPercentage}
        style={{ marginLeft: '24px', width: '110px' }} />

      <br></br>
      <br></br>
      <label style={{ marginLeft: '24px' }}>Bezel height Percentage:</label><br></br>
      <input type="number" id="heightPercentage" name="heightPercentage"
        min="0" max="100"
        onChange={handleSetBezelHeightPercentage}
        value={props.bezelHeightPercentage}
        style={{ marginLeft: '24px', width: '110px' }} />

      <br></br>
      <br></br>
      <br></br>
      <input
        type="radio"
        id="byMeasurement"
        name="bezelMeasurementType"
        checked={props.bezelMeasureByType === BezelMeasureByType.Measurement}
        value={BezelMeasureByType.Measurement}
        onClick={handleSetBezelMeasureByType}
      />
      <label>By measurement</label><br></br>
      <br></br>

      <label style={{ marginLeft: '24px' }}>Bezel width (mm):</label><br></br>
      <input type="number" id="width" name="width"
        min="0" max="100"
        onChange={handleSetBezelWidth}
        value={props.bezelWidth}
        style={{ marginLeft: '24px', width: '110px' }} />

      <br></br>
      <br></br>

      <label style={{ marginLeft: '24px' }}>Bezel height (mm):</label><br></br>
      <input type="number" id="height" name="height"
        min="0" max="100"
        onChange={handleSetBezelHeight}
        value={props.bezelHeight}
        style={{ marginLeft: '24px', width: '110px' }} />

      <br></br>

      <label style={{ marginLeft: '24px' }}>Screen width (mm):</label><br></br>
      <input type="number" id="width" name="width"
        min="0" max="100"
        onChange={handleSetScreenWidth}
        value={props.bezelScreenWidth}
        style={{ marginLeft: '24px', width: '110px' }} />

      <br></br>
      <br></br>

      <label style={{ marginLeft: '24px' }}>Screen height (mm):</label><br></br>
      <input type="number" id="height" name="height"
        min="0" max="100"
        onChange={handleSetScreenHeight}
        value={props.bezelScreenHeight}
        style={{ marginLeft: '24px', width: '110px' }} />

    </div >
  );
};

function mapStateToProps(state: any, ownProps: BezelFormPropsFromParent): Partial<BezelFormProps> {
  return {
    bezelMeasureByType: getBezelMeasureByType(state, ownProps.serialNumber),
    bezelWidthPercentage: getBezelWidthPercentage(state, ownProps.serialNumber),
    bezelHeightPercentage: getBezelHeightPercentage(state, ownProps.serialNumber),
    bezelWidth: getBezelWidth(state, ownProps.serialNumber),
    bezelHeight: getBezelHeight(state, ownProps.serialNumber),
    bezelScreenWidth: getBezelScreenWidth(state, ownProps.serialNumber),
    bezelScreenHeight: getBezelScreenHeight(state, ownProps.serialNumber),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onReplicateBezel: replicateBezel,
    onSetBezelMeasureByType: setBezelMeasureByType,
    onSetBezelWidthPercentage: setBezelWidthPercentage,
    onSetBezelHeightPercentage: setBezelHeightPercentage,
    onSetBezelWidth: setBezelWidth,
    onSetBezelHeight: setBezelHeight,
    onSetBezelScreenWidth: setBezelScreenWidth,
    onSetBezelScreenHeight: setBezelScreenHeight,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BezelForm);
