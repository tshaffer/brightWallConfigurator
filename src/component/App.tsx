import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeStyles } from '@material-ui/core/styles';
// import {
//   serialNumber,
//   videoWallRowIndex,
//   videoWallColumnIndex,
// } from '../config/config';
// import { getBrightSignConfig } from '../controller';
import { 
  getIsBrightWall,
  getSerialNumber,
  getIsMaster,
  getRowIndex,
  getColumnIndex,
 } from '../selector';

/** @internal */
/** @private */
export interface AppProps {
  isBrightWall: boolean;
  serialNumber: string;
  isMaster: boolean;
  rowIndex: number;
  columnIndex: number;
  // onGetBrightSignConfig: () => any;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const useStyles = makeStyles({
  parentDiv: {
    position: 'relative',
    // height: '1080px',
    height: '100%',
  },
  App: {
    // background: linear - gradient(90deg, #753CD9, #290D5B),
    background: 'lightBlue',
    minHeight: '100vh',
    color: 'white',
    fontFamily: "PTSans",
    textAlign: 'center',
  },
  AppHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
  },
  logoContainerStyle: {
    height: '346px',
    width: '1603px',
    margin: '100px 10px 5px 10px',
    position: 'absolute',
    // background: url('BrightSign_logo_white.png') no-repeat 50% 80%',
    backgroundSize: '400px',
  },
  bodyDiv: {
    marginTop: '22%'
  }

});

const App = (props: AppProps) => {

  const classes = useStyles();

  // Equivalent to old componentDidMount
  // React.useEffect(props.onGetBrightSignConfig, []);

  console.log('render app');

  return (
    <div className={classes.App}>
      <header className={classes.AppHeader}>
        <div className={classes.logoContainerStyle} />
      </header>
      <div className={classes.bodyDiv}>
        BrightWall Device Setup
        <p>Serial Number:&nbsp;&nbsp;{props.serialNumber}</p>
        <p>Row Index:&nbsp;&nbsp;{props.rowIndex}</p>
        <p>Column Index:&nbsp;&nbsp;{props.columnIndex}</p>
      </div>
    </div>
  )
};

function mapStateToProps(state: any, ownProps: any): Partial<any> {
  return {
    isBrightWall: getIsBrightWall(state),
    serialNumber: getSerialNumber(state),
    isMaster: getIsMaster(state),
    rowIndex: getRowIndex(state),
    columnIndex: getColumnIndex(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    // onGetBrightSignConfig: getBrightSignConfig,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

