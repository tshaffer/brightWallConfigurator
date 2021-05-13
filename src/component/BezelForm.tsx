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
    console.log(event.target.value);
    props.onSetBezelMeasureByType(props.serialNumber, event.target.value);
  };

  const handleSetBezelWidthPercentage = (event: any) => {
    console.log('handleSetBezelWidthPercentage invoked:');
    console.log(event.target.value);
    props.onSetBezelWidthPercentage(props.serialNumber, event.target.value);
  };

  const handleSetBezelHeightPercentage = (event: any) => {
    props.onSetBezelHeightPercentage(props.serialNumber, event.target.value);
  };

  const handleSetBezelWidth = (event: any) => {
    props.onSetBezelWidth(props.serialNumber, event.target.value);
  };

  const handleSetBezelHeight = (event: any) => {
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
        value="byPercentage"
        onClick={handleSetBezelMeasureByType}
      />
      <label>By percentage</label>
      <br></br>
      <br></br>

      <label style={{ marginLeft: '24px' }}>Width Percentage:</label><br></br>
      <input type="number" id="widthPercentage" name="widthPercentage"
        min="0" max="100"
        onChange={handleSetBezelWidthPercentage}
        style={{ marginLeft: '24px', width: '110px' }} />

      <br></br>
      <br></br>
      <label style={{ marginLeft: '24px' }}>Height Percentage:</label><br></br>
      <input type="number" id="heightPercentage" name="heightPercentage"
        min="0" max="100"
        onChange={handleSetBezelHeightPercentage}
        style={{ marginLeft: '24px', width: '110px' }} />

      <br></br>
      <br></br>
      <br></br>
      <input
        type="radio"
        id="byMeasurement"
        name="bezelMeasurementType"
        value="byMeasurement"
        onClick={handleSetBezelMeasureByType}
      />
      <label>By measurement</label><br></br>
      <br></br>

      <label style={{ marginLeft: '24px' }}>Width:</label><br></br>
      <input type="number" id="width" name="width"
        min="0" max="100"
        onChange={handleSetBezelWidth}
        style={{ marginLeft: '24px', width: '110px' }} />

      <br></br>
      <br></br>
      <label style={{ marginLeft: '24px' }}>Height:</label><br></br>
      <input type="number" id="heigh" name="height"
        min="0" max="100"
        onChange={handleSetBezelHeight}
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
