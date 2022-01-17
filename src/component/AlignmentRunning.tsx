import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { style } from 'typestyle';

import { reenterConfigurator } from '../controller';

export interface AlignmentRunningProps {
  onReenterConfigurator: () => any;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------


const AlignmentRunning = (props: AlignmentRunningProps) => {

  const getDivStyle = () => {
    return style({
      margin: 0,
      padding: 0,
      display: 'block',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '100%',
      textAlign: 'center',
    });
  };

  const getButtonStyle = () => {
    return style({
      padding: '15px',
      backgroundColor: '#311c6b',
      marginTop: '15px',
      color: 'white',
    });
  };

  const handleReenterConfigurator = (event: any) => {
    console.log('handleReenterConfigurator invoked');
    props.onReenterConfigurator();
  };

  return (
    <div className={getDivStyle()}>
      Video Wall Alignment is currently running. Would you like to stop it and re-enter configuration?
      <br />
      <button
        className={getButtonStyle()}
        onClick={handleReenterConfigurator}
      >
        Enter Configuration </button>
    </div>
  );
};

function mapStateToProps(state: any): Partial<AlignmentRunningProps> {
  return {
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onReenterConfigurator: reenterConfigurator,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AlignmentRunning);

