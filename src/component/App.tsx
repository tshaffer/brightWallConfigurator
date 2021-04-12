import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BezelForm from './BezelForm';

import { makeStyles } from '@material-ui/core/styles';
import {
  launchApp,
  // setBrightSignWallPosition,
} from '../controller';
import {
  getIsBrightWall,
  getNumRows,
  getNumColumns,
  getBrightSignsInWall,
  getBrightWallUnitAssignments,
} from '../selector';
import { BrightSignConfig, BrightSignMap } from '../type';
import { cloneDeep } from 'lodash';

/** @internal */
/** @private */
export interface AppProps {
  isBrightWall: boolean;
  numRows: number;
  numColumns: number;
  brightSignsInWall: BrightSignMap;
  brightWallUnitAssignments: string[][];
  serialNumber: string;
  isMaster: boolean;
  rowIndex: number;
  columnIndex: number;
  onLaunchApp: () => any;
  // onSetBrightSignWallPosition: (serialNumber: string, row: number, column: number) => any;
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
    // fontSize: '3vmin',
    textAlign: 'left',
  }
});

const App = (props: AppProps) => {

  const classes = useStyles();

  // Equivalent to old componentDidMount
  React.useEffect(props.onLaunchApp, []);

  const handleAssignDeviceToWall = (event: any) => {
    console.log('handleAssignDeviceToWall');
    console.log(event);

    const valueOfSelectedEntry: string = event.target.value;

    console.log('value of selected item: ', valueOfSelectedEntry);

    const valueParts = valueOfSelectedEntry.split('||');
    if (valueParts.length === 3) {
      const serialNumber = valueParts[0];
      const row: number = parseInt(valueParts[1], 10);
      const column: number = parseInt(valueParts[2], 10);
      const brightWallUnitAssignments = cloneDeep(props.brightWallUnitAssignments);

      // const priorDeviceAtSelectedPosition: string = brightWallUnitAssignments[row][column];
      // if (priorDeviceAtSelectedPosition !== 'noneAssigned') {
      //   props.onSetBrightSignWallPosition(priorDeviceAtSelectedPosition, -1, -1);
      // }
      // props.onSetBrightSignWallPosition(serialNumber, row, column);
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

    const options = serialNumbers.map((serialNumber) => {
      const value = serialNumber + '||' + rowIndex.toString() + '||' + columnIndex.toString();
      return (
        <option value={value} key={serialNumber}>{serialNumber}</option>
      );
    });
    const noneAssignedValue = 'noneAssigned||' + rowIndex.toString() + '||' + columnIndex.toString();
    options.unshift(<option value={noneAssignedValue}>None assigned</option>);

    let optionValue;
    if (props.brightWallUnitAssignments.length === 0) {
      optionValue = 'noneAssigned';
    } else {
      optionValue = props.brightWallUnitAssignments[rowIndex][columnIndex] + '||' + rowIndex.toString() + '||' + columnIndex.toString();
    }
    console.log('selected device: ', optionValue);

    const uniqueId = rowIndex.toString() + '||' + columnIndex.toString();
    return (
      <select key={uniqueId} value={optionValue} onChange={handleAssignDeviceToWall}>
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

    const positionLabel = brightSignConfig.brightWallConfiguration.rowIndex >= 0 ?
      rowIndexLbl + brightSignConfig.brightWallConfiguration.rowIndex.toString() +
      colIndexLbl + brightSignConfig.brightWallConfiguration.columnIndex.toString()
      : 'Unassigned';

    const masterSlaveDesignator: string = brightSignConfig.brightWallConfiguration.isMaster ? 'Master' : 'Slave';
    return (
      <div key={brightSignConfig.brightSignAttributes.serialNumber}>
        <div className={classes.MsgStyle}>
          <span>{serialNumberLbl}</span>
          <span>{brightSignConfig.brightSignAttributes.serialNumber}</span>
          <span>{msdSeparator}</span>
          <span>{masterSlaveDesignator}</span>
          <span>{positionLabel}</span>
        </div>
        <BezelForm
          serialNumber={brightSignConfig.brightSignAttributes.serialNumber}
        />
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
    brightWallUnitAssignments: getBrightWallUnitAssignments(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onLaunchApp: launchApp,
    // onSetBrightSignWallPosition: setBrightSignWallPosition,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

