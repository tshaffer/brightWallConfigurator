import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getActivePresentationName } from '../selector';

import { reenterConfigurator } from '../controller';

export interface PresentationRunningProps {
  activePresentationName: string;
  onReenterConfigurator: () => any;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------


const PresentationRunning = (props: PresentationRunningProps) => {

  const handleReenterConfigurator = (event: any) => {
    console.log('handleReenterConfigurator invoked');
    props.onReenterConfigurator();
  };


  return (
    <div>
      <p>{props.activePresentationName} is currently running. Would you like to stop it and re-enter configuration?</p>
      <button onClick={handleReenterConfigurator}>
        Enter Configuration
      </button>

    </div>
  );
};

function mapStateToProps(state: any): Partial<PresentationRunningProps> {
  return {
    activePresentationName: getActivePresentationName(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onReenterConfigurator: reenterConfigurator,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PresentationRunning);

