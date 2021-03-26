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

const useStyles = makeStyles({
  textField: {
    marginLeft: '10px',
    marginRight: '10px',
    width: 200,
  },
});

// -----------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------
export interface BezelFormProps {
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const BezelForm = (props: BezelFormProps) => {

  const classes = useStyles();

  const [bezelMeasureByType, setBezelMeasureByType] = React.useState('byMeasurement');

  const [bezelWidthPercentageMeasurementValue, setBezelWidthPercentageMeasurementValue] = React.useState('0');
  const [bezelHeightPercentageMeasurementValue, setBezelHeightPercentageMeasurementValue] = React.useState('0');
  const [bezelWidthMeasurementValue, setBezelWidthMeasurementValue] = React.useState('0');
  const [bezelHeightMeasurementValue, setBezelHeightMeasurementValue] = React.useState('0');

  const handleSetBezelMeasureByType = (event: any) => {
    setBezelMeasureByType(event.target.value);
  };

  const handleSetBezelWidthPercentageMeasurementValue = (event: any) => {
    setBezelWidthPercentageMeasurementValue(event.target.value);
  };
  const handleSetBezelHeightPercentageMeasurementValue = (event: any) => {
    setBezelHeightPercentageMeasurementValue(event.target.value);
  };

  const handleSetBezelWidthMeasurementValue = (event: any) => {
    setBezelWidthMeasurementValue(event.target.value);
  };
  const handleSetBezelHeightMeasurementValue = (event: any) => {
    setBezelHeightMeasurementValue(event.target.value);
  };

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Bezel Width and Height</FormLabel>
        <RadioGroup value={bezelMeasureByType} onChange={handleSetBezelMeasureByType}>
          <FormControlLabel value="byPercentage" control={<Radio />} label="By percentage" />
          <TextField
            id="standard-number"
            label="WidthPercentage"
            value={bezelWidthPercentageMeasurementValue}
            onChange={handleSetBezelWidthPercentageMeasurementValue}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            id="standard-number"
            label="HeightPercentage"
            value={bezelHeightPercentageMeasurementValue}
            onChange={handleSetBezelHeightPercentageMeasurementValue}
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
            value={bezelWidthMeasurementValue}
            onChange={handleSetBezelWidthMeasurementValue}
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
            value={bezelHeightMeasurementValue}
            onChange={handleSetBezelHeightMeasurementValue}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

function mapStateToProps(state: any): Partial<BezelFormProps> {
  return {
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BezelForm);
