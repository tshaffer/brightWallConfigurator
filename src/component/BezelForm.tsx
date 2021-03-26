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

  const [value, setValue] = React.useState('byMeasurement');
  const [foodValue, setFoodValue] = React.useState('pizza');
  const [bezelWidthMeasurementValue, setBezelWidthMeasurementValue] = React.useState('0');

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  const handleFoodChange = (event: any) => {
    setFoodValue(event.target.value);
  };

  const handleSetBezelWidthMeasurementValue = (event: any) => {
    setBezelWidthMeasurementValue(event.target.value);
  };
  /*
            <TextField
              id="standard-number"
              label="Number"
              value={this.state.age}
              onChange={this.handleChange('age')}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
  */

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Bezel Width and Height</FormLabel>
        <TextField
          id="standard-number"
          label="Number"
          value={bezelWidthMeasurementValue}
          onChange={handleSetBezelWidthMeasurementValue}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <RadioGroup value={value} onChange={handleChange}>
          <FormControlLabel value="byPercentage" control={<Radio />} label="By percentage" />
          <FormControlLabel value="byMeasurement" control={<Radio />} label="By measurement" />
          <RadioGroup value={foodValue} onChange={handleFoodChange} >
            <FormControlLabel value="pizza" control={<Radio />} label="Pizza" />
            <FormControlLabel value="burrito" control={<Radio />} label="Burrito" />
          </RadioGroup>
        </RadioGroup>
      </FormControl>
    </div>
  );
  // return (
  //   <div>
  //     <input type="radio" value="Male" name="gender">Male</input>
  //     <input type="radio" value="Female" name="gender" /> Female
  //     <input type="radio" value="Other" name="gender" /> Other
  //   </div>);

  // const [selectedValue, setSelectedValue] = React.useState('a');

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedValue(event.target.value);
  // };

  // return (
  //   <div>
  //     <Radio
  //       checked={selectedValue === 'a'}
  //       onChange={handleChange}
  //       value="a"
  //       aria-label="flibbet"
  //       name="radio-button-demo"
  //       inputProps={{ 'aria-label': 'A' }}
  //     />
  //     <Radio
  //       checked={selectedValue === 'b'}
  //       onChange={handleChange}
  //       value="b"
  //       name="radio-button-demo"
  //       inputProps={{ 'aria-label': 'B' }}
  //     />
  //     <Radio
  //       checked={selectedValue === 'c'}
  //       onChange={handleChange}
  //       value="c"
  //       name="radio-button-demo"
  //       inputProps={{ 'aria-label': 'C' }}
  //     />
  //     <Radio
  //       checked={selectedValue === 'd'}
  //       onChange={handleChange}
  //       value="d"
  //       color="default"
  //       name="radio-button-demo"
  //       inputProps={{ 'aria-label': 'D' }}
  //     />
  //     <Radio
  //       checked={selectedValue === 'e'}
  //       onChange={handleChange}
  //       value="e"
  //       color="default"
  //       name="radio-button-demo"
  //       inputProps={{ 'aria-label': 'E' }}
  //       size="small"
  //     />
  //   </div>
  // );

  // const [value, setValue] = React.useState('female');

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue((event.target as HTMLInputElement).value);
  // };

  // return (
  //   <div>
  //     <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
  //       <FormControlLabel value="female" control={<Radio />} label="Female" />
  //       <FormControlLabel value="male" control={<Radio />} label="Male" />
  //       <FormControlLabel value="other" control={<Radio />} label="Other" />
  //       <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
  //     </RadioGroup>
  //   </div>
  // );
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
