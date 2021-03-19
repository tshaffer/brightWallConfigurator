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

let prevNumRows = 0;
let prevNumColumns = 0;

// this should probably (or perhaps must) go into redux
let wallOfUnits: any;

const App = (props: AppProps) => {

  const classes = useStyles();

  // Equivalent to old componentDidMount
  React.useEffect(props.onLaunchApp, []);

  const handleAssignDeviceToWall = (event: any) => {
    console.log('handleAssignDeviceToWall');
    console.log(event);

    const selectedSerial: string = event.target.value;

    console.log('selectedSerialNumber: ', selectedSerial);

    // hack due to my lack of recollection on how to do this
    // get the id of the option whose Value === selectedSerial
    for (const targetOption of event.target.options) {
      console.log('Id: ', targetOption.id, ' Value: ', targetOption.value, ' Text: ', targetOption.text);
      if (targetOption.value === selectedSerial) {
        const selectedRowColumn = targetOption.id;
        const coordinates = selectedRowColumn.split('--');
        const selectedRow = parseInt(coordinates[0], 10);
        const selectedColumn = parseInt(coordinates[1], 10);
        console.log('selectedRow: ', selectedRow, ' selectedColumn: ', selectedColumn);
        break;
      }
    }
  };

  const renderDeviceInColumn = (rowIndex: number, columnIndex: number) => {

    const serialNumbers: string[] = [];
    for (const key in props.brightSignsInWall) {
      if (Object.prototype.hasOwnProperty.call(props.brightSignsInWall, key)) {
        const brightSignInWall: BrightSignConfig = props.brightSignsInWall[key];
        serialNumbers.push(brightSignInWall.brightSignAttributes.serialNumber);
      }
    }

    const id = rowIndex.toString() + '--' + columnIndex.toString();

    const options = serialNumbers.map((serialNumber) => {
      return (
        <option id={id} value={serialNumber} key={serialNumber}>{serialNumber}</option>
      );
    });
    options.unshift(<option id={id} value='noneAssigned'>None assigned</option>);

    const selectedDevice = wallOfUnits[rowIndex][columnIndex];

    return (
      <select id={id} key={id} value={selectedDevice} onChange={handleAssignDeviceToWall}>
        {options}
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
    for (let rowIndex: number = 0; rowIndex < props.numRows; rowIndex++) {
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


  if ((props.numRows !== prevNumRows) || (props.numColumns !== prevNumColumns)) {

    // reinitializing is probably not good enough 
    wallOfUnits = [];

    for (let rowIndex = 0; rowIndex < props.numRows; rowIndex++) {
      const unitsInRow: any[] = [];
      for (let columnIndex = 0; columnIndex < props.numColumns; columnIndex++) {
        unitsInRow.push('noneAssigned');
      }
      wallOfUnits.push(unitsInRow);
    }

    console.log('wallOfUnits');
    console.log(wallOfUnits);

    prevNumRows = props.numRows;
    prevNumColumns = props.numColumns;
  }

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

