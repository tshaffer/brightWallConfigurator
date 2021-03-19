import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeStyles } from '@material-ui/core/styles';
// import {
//   serialNumber,
//   videoWallRowIndex,
//   videoWallColumnIndex,
// } from '../config/config';
import { launchApp } from '../controller';
import {
  getIsBrightWall,
  getNumRows,
  getNumColumns,
  getBrightSignsInWall,
  // getSerialNumber,
  // getIsMaster,
  // getRowIndex,
  // getColumnIndex,
} from '../selector';
import { BrightSignConfig, BrightSignMap } from '../type';

/** @internal */
/** @private */
export interface AppProps {
  isBrightWall: boolean;
  numRows: number;
  numColumns: number;
  brightSignsInWall: BrightSignMap;
  serialNumber: string;
  isMaster: boolean;
  rowIndex: number;
  columnIndex: number;
  onLaunchApp: () => any;
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
    background: 'url("BrightSign_logo_white.png") no-repeat 50% 80%',
    backgroundSize: '400px',
  },
  bodyDiv: {
    marginTop: '10%'
  },
  AppStyle: {
    background: 'linear-gradient(90deg, #753CD9, #290D5B)',
    color: 'white',
    textAlign: 'center',
    minHeight: '100vh',
    // font
  },
  AppHeaderStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
  },
  HeaderMsgStyle: {
    // font-family: "roboto";
    fontSize: '5vmin',
    textAlign: 'center',
    display: 'inline-block'
  },
  MsgStyle: {
    fontSize: '3vmin',
  }
});

const App = (props: AppProps) => {

  const classes = useStyles();

  // Equivalent to old componentDidMount
  React.useEffect(props.onLaunchApp, []);

  const renderDeviceInColumn = (rowIndex: number, columnIndex: number) => {
    return (
      <select>
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option value="coconut">Coconut</option>
        <option value="mango">Mango</option>
      </select>
    );
  };

  const renderRowInWall = (rowIndex: number) => {
    const columnsInRow: any[] = [];
    for (let columnIndex: number = 0; columnIndex < props.numColumns; columnIndex++) {
      columnsInRow.push(renderDeviceInColumn(rowIndex, columnIndex));
    }
    return columnsInRow;
  };

  const renderWall = () => {

    console.log('renderWall - numRows: ', props.numRows);
    console.log('renderWall - numColumns: ', props.numColumns);
  
    const rowsInWall: any[] = [];
    for (let rowIndex: number = 0; rowIndex < props.numRows; rowIndex++ ) {
      rowsInWall.push(renderRowInWall(rowIndex));
    }
    // return rowsInWall;
    return (
      <table>
        <tbody>{rowsInWall}</tbody>
      </table>
    );
  };

  const renderBrightSignInWall = (brightSignConfig: BrightSignConfig) => {

    const serialNumberLbl = 'Serial Number: ';
    const msdSeparator = '    ';
    const rowIndexLbl = '    Row    ';
    const colIndexLbl = '    Column    ';

    const masterSlaveDesignator: string = brightSignConfig.brightWallConfiguration.isMaster ? 'Master' : 'Slave';
    return (
      <div key={brightSignConfig.brightSignAttributes.serialNumber}>
        <span>{serialNumberLbl}</span>
        <span>{brightSignConfig.brightSignAttributes.serialNumber}</span>
        <span>{msdSeparator}</span>
        <span>{masterSlaveDesignator}</span>
        <span>{rowIndexLbl}</span>
        <span>{brightSignConfig.brightWallConfiguration.rowIndex}</span>
        <span>{colIndexLbl}</span>
        <span>{brightSignConfig.brightWallConfiguration.columnIndex}</span>
      </div>
    );
  };

  const renderBrightSignsInWall = () => {

    const brightSignsInWall: any[] = [];

    for (const key in props.brightSignsInWall) {
      if (Object.prototype.hasOwnProperty.call(props.brightSignsInWall, key)) {
        const brightSignInWall: BrightSignConfig = props.brightSignsInWall[key];
        brightSignsInWall.push(renderBrightSignInWall(brightSignInWall));
      }
    }

    return brightSignsInWall;
  };

  console.log('render app');

  console.log('main render - numRows: ', props.numRows);
  console.log('main render - numColumns: ', props.numColumns);

  const wall = renderWall();
  const brightSignsInWall = renderBrightSignsInWall();

  return (
    <div className={classes.AppStyle}>
      <header className={classes.AppHeader}>
        <div className={classes.logoContainerStyle} />
      </header>
      <div className={classes.bodyDiv}>
        <p className={classes.HeaderMsgStyle}>{'BrightWall Device Setup'}</p>
        <p className={classes.MsgStyle}>Number of rows:&nbsp;&nbsp;{props.numRows}</p>
        <p className={classes.MsgStyle}>Number of columns:&nbsp;&nbsp;{props.numColumns}</p>
        {wall}
        {brightSignsInWall}
      </div>
    </div>
  );
};

function mapStateToProps(state: any, ownProps: any): Partial<any> {
  return {
    isBrightWall: getIsBrightWall(state),
    numRows: getNumRows(state),
    numColumns: getNumColumns(state),
    brightSignsInWall: getBrightSignsInWall(state),
    // serialNumber: getSerialNumber(state),
    // isMaster: getIsMaster(state),
    // rowIndex: getRowIndex(state),
    // columnIndex: getColumnIndex(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onLaunchApp: launchApp,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

