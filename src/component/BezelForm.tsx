import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

import { BezelMeasureByType } from '../type';

import {
  setBezelMeasureByType,
  setBezelWidthPercentage,
  setBezelHeightPercentage,
  setBezelWidth,
  setBezelHeight,
  setBezelScreenWidth,
  setBezelScreenHeight,
} from '../model';
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

const useStyles = makeStyles({
  formStyle: {
    textAlign: 'left',
    color: 'white',
    marginTop: '10px',
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
  }
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

  const handleSetBezelMeasureByType = (event: any) => {
    props.onSetBezelMeasureByType(props.serialNumber, event.target.value);
  };

  const handleSetBezelWidthPercentage = (event: any) => {
    props.onSetBezelWidthPercentage(props.serialNumber, event.target.value);
  };

  const handleSetBezelHeightPercentage = (event: any) => {
    props.onSetBezelHeightPercentage(props.serialNumber, event.target.value);
  };

  const handleSetBezelWidth = (event: any) => {
    props.onSetBezelWidth(props.serialNumber, event.target.value);
  };

  const handleSetBezelHeightMeasurementValue = (event: any) => {
    props.onSetBezelHeight(props.serialNumber, event.target.value);
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

  /*
          <StyledTextField
            id="standard-number"
            label="Width Percentage"
            value={props.bezelWidthPercentage}
            onChange={handleSetBezelWidthPercentage}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
  */

  /*
      <FormControl component="fieldset" className={classes.whiteText}>
        <FormLabel component="legend" className={classes.whiteText}>Bezel Width and Height</FormLabel>
          */
  return (
    <div className={classes.formStyle}>
      Bezel Width and Height


      <RadioGroup value={props.bezelMeasureByType} onChange={handleSetBezelMeasureByType} className={classes.whiteText}>
        <FormControlLabel value="byPercentage" control={<Radio />} label="By percentage" />
        <StyledTextField
          label='Width Percentage'
        />
        <TextField
          id="standard-number"
          label="Height Percentage"
          value={props.bezelHeightPercentage}
          onChange={handleSetBezelHeightPercentage}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <FormControlLabel value="byMeasurement" control={<Radio />} label="By measurement" />
        <TextField
          id="standard-number"
          label="Width"
          value={props.bezelWidth}
          onChange={handleSetBezelWidth}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          id="standard-number"
          label="Height"
          value={props.bezelHeight}
          onChange={handleSetBezelHeightMeasurementValue}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
      </RadioGroup>
    </div>
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
