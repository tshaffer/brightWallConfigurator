import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../styles/configurator.css';

import {
  setIsMaster,
  setBrightSignWallPosition,
} from '../controller';
import {
  getColumnIndex,
  getRowIndex,
  getIsMaster,
  getUnitName,
  getBrightSignsInWall,
  getNumRows,
  getNumColumns,
  getBrightWallUnitAssignments,
} from '../selector';
import {
  BrightSignConfig,
  BrightSignMap,
  BrightWallConfiguration,
} from '../type';
import { getDevicePositionLabel } from '../utility';
import { cloneDeep } from 'lodash';

export interface DevicePropsFromParent {
  serialNumber: string;
}

export interface DeviceProps extends DevicePropsFromParent {
  rowIndex: number;
  columnIndex: number;
  unitName: string;
  isMaster: boolean;
  brightSignsInWall: BrightSignMap;
  onSetIsMaster: (serialNumber: string, isMaster: boolean) => any;
  onSetBrightSignWallPosition: (serialNumber: string, row: number, column: number) => any;
  numRows: number;
  numColumns: number;
  brightWallUnitAssignments: string[][];
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const Device = (props: DeviceProps) => {

  const getDeviceIsAssigned = (): boolean => {
    return (props.rowIndex >= 0 || props.columnIndex >= 0);
  };

  const handleAssignDeviceToWall = (event: any) => {

    const valueOfSelectedEntry: string = event.target.value;

    if (valueOfSelectedEntry === 'noneAssigned') {
      props.onSetBrightSignWallPosition(props.serialNumber, -1, -1);

    } else {
      const valueParts = valueOfSelectedEntry.split('||');
      if (valueParts.length === 2) {
        const row: number = parseInt(valueParts[0], 10);
        const column: number = parseInt(valueParts[1], 10);
        const brightWallUnitAssignments = cloneDeep(props.brightWallUnitAssignments);

        const priorDeviceAtSelectedPosition: string = brightWallUnitAssignments[row][column];
        if (priorDeviceAtSelectedPosition !== 'noneAssigned') {
          props.onSetBrightSignWallPosition(priorDeviceAtSelectedPosition, -1, -1);
        }
        props.onSetBrightSignWallPosition(props.serialNumber, row, column);
      }
    }
  };

  const renderOption = (rowIndex: number, columnIndex: number) => {
    const label = getDevicePositionLabel(rowIndex, columnIndex);
    return (
      <option value={rowIndex.toString() + '||' + columnIndex.toString()} key={label}>{label}</option>
    );
  };

  const renderOptions = () => {
    const options: any[] = [];
    for (let rowIndex = 0; rowIndex < props.numRows; rowIndex++) {
      for (let columnIndex = 0; columnIndex < props.numColumns; columnIndex++) {
        options.push(renderOption(rowIndex, columnIndex));
      }
    }
    options.unshift(<option value={'noneAssigned'}>Unassigned</option>);
    return options;
  };

  const renderAssignDeviceToWall = () => {

    const options = renderOptions();

    let optionValue = 'noneAssigned';

    if (Object.prototype.hasOwnProperty.call(props.brightSignsInWall, props.serialNumber)) {
      const brightSignConfig: BrightSignConfig = props.brightSignsInWall[props.serialNumber];
      const brightWallConfiguration: BrightWallConfiguration = brightSignConfig.brightWallConfiguration;
      if (brightWallConfiguration.rowIndex >= 0 && brightWallConfiguration.columnIndex >= 0) {
        optionValue = brightWallConfiguration.rowIndex.toString() + '||' + brightWallConfiguration.columnIndex.toString();
      }
    }

    return (
      <select key={props.serialNumber} value={optionValue} onChange={handleAssignDeviceToWall}>
        {options}
      </select>
    );
  };

  const handleSetIsMaster = (event: any) => {
    console.log('handleSetMaster invoked:');

    // get master before selection
    let priorMasterDevice = '';
    for (const key in props.brightSignsInWall) {
      if (Object.prototype.hasOwnProperty.call(props.brightSignsInWall, key)) {
        const brightSignInWall: BrightSignConfig = props.brightSignsInWall[key];
        if (brightSignInWall.brightWallConfiguration.isMaster) {
          priorMasterDevice = brightSignInWall.brightSignAttributes.serialNumber;
        }
      }
    }
    if (priorMasterDevice !== 'noneAssigned' && priorMasterDevice !== '') {
      console.log('set ' + priorMasterDevice + ' to slave');
      props.onSetIsMaster(priorMasterDevice, false);
    }

    console.log('set ' + event.target.id + ' to master');
    props.onSetIsMaster(event.target.id, true);
  };

  // const handleAssignDeviceToWall = (event: any) => {
  //   console.log(handleAssignDeviceToWall);
  //   console.log(event);
  //   console.log(event.target);
  // }

  let deviceImage = '';
  let deviceIdsClassName = '';

  if (getDeviceIsAssigned()) {
    deviceImage = 'src/img/deviceDisabled.svg';
    deviceIdsClassName = 'deviceName disabled';
  } else {
    deviceImage = 'src/img/device.svg';
    deviceIdsClassName = 'deviceName';
  }

  const assignDeviceToWallSelect = renderAssignDeviceToWall();

  return (
    <React.Fragment>
      <img className='deviceImage' src={deviceImage} />

      <div className={deviceIdsClassName}>
        <div>{props.unitName}</div>
        <div>{props.serialNumber}</div>
        {assignDeviceToWallSelect}
      </div>

      <div className='deviceFlag'>
        <input
          type='radio'
          id={props.serialNumber}
          checked={props.isMaster}
          onChange={handleSetIsMaster}
        />
        <label htmlFor={`device_${props.serialNumber}`}>Master</label>
      </div>


    </React.Fragment>
  );
};

function mapStateToProps(state: any, ownProps: DevicePropsFromParent): Partial<any> {
  const serialNumber = ownProps.serialNumber;
  return {
    rowIndex: getRowIndex(state, serialNumber),
    columnIndex: getColumnIndex(state, serialNumber),
    unitName: getUnitName(state, serialNumber),
    serialNumber,
    isMaster: getIsMaster(state, serialNumber),
    brightSignsInWall: getBrightSignsInWall(state),
    numRows: getNumRows(state),
    numColumns: getNumColumns(state),
    brightWallUnitAssignments: getBrightWallUnitAssignments(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onSetIsMaster: setIsMaster,
    onSetBrightSignWallPosition: setBrightSignWallPosition,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Device);
