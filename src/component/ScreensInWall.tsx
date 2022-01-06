import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../styles/configurator.css';

import { BrightSignMap } from '../type';

import {
  setBrightSignWallPosition,
} from '../controller';
import {
  getNumRows,
  getNumColumns,
  getBrightSignsInWall,
  getBrightWallUnitAssignments,
} from '../selector';
import ScreenInWall from './ScreenInWall';

export interface ScreensInWallProps {
  numRows: number;
  numColumns: number;
  brightSignsInWall: BrightSignMap;
  brightWallUnitAssignments: string[][];
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const ScreensInWall = (props: ScreensInWallProps) => {

  // given rowIndex, columnIndex, retrieve information for the device at this location, if there is one.
  const renderScreenInWall = (rowIndex: number, columnIndex: number) => {
    const serialNumber = props.brightWallUnitAssignments[rowIndex][columnIndex];
    if (serialNumber === 'noneAssigned') {
      return (
        <ScreenInWall
          serialNumber={''}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          key={rowIndex.toString() + columnIndex.toString()}
        />
      );
    } else {
      return (
        <ScreenInWall
          serialNumber={serialNumber}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          key={rowIndex.toString() + columnIndex.toString()}
        />
      );
    }
  };

  const renderScreensInWall = () => {
    const screensInWall = [];
    for (let rowIndex = 0; rowIndex < props.numRows; rowIndex++) {
      for (let columnIndex = 0; columnIndex < props.numColumns; columnIndex++) {
        screensInWall.push(renderScreenInWall(rowIndex, columnIndex));
      }
    }
    return screensInWall;
  };

  const screensInWall = renderScreensInWall();

  const style = {
    gridTemplateColumns: `repeat(${props.numColumns}, 1fr)`
  };

  return (
    <div className='screensInWallContainer' style={style}>
      {screensInWall}
    </div>
  );
};

function mapStateToProps(state: any): Partial<ScreensInWallProps> {
  return {
    numRows: getNumRows(state),
    numColumns: getNumColumns(state),
    brightSignsInWall: getBrightSignsInWall(state),
    brightWallUnitAssignments: getBrightWallUnitAssignments(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onSetBrightWallPosition: setBrightSignWallPosition,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreensInWall);
