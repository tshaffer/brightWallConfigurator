import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { DropTargetMonitor, useDrop } from 'react-dnd';

import ReactModal from 'react-modal';

import BezelConfigurator from './BezelConfigurator/BezelConfigurator';

import '../styles/configurator.css';

import {
  setBrightSignWallPosition,
} from '../controller';
import DeviceInWall from './DeviceInWall';
import { isString } from 'lodash';
import { getDevicePositionLabel } from '../utility';

export interface ScreenInWallPropsFromParent {
  serialNumber: string;
  rowIndex: number;
  columnIndex: number;
}

export interface ScreenInWallProps extends ScreenInWallPropsFromParent {
  onSetBrightSignWallPosition: (serialNumber: string, row: number, column: number) => any;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const ScreenInWall = (props: ScreenInWallProps) => {

  const getScreenIsOccupied = (): boolean => {
    return (isString(props.serialNumber) && props.serialNumber.length > 0);
  };

  const canDropOntoScreen = (): boolean => {
    return !getScreenIsOccupied();
  };

  const dropDevice = (rowIndex: number, columnIndex: number, item: any) => {
    console.log('dropDevice', item.serialNumber, rowIndex, columnIndex);
    console.log(item);
    props.onSetBrightSignWallPosition(item.serialNumber, props.rowIndex, props.columnIndex);
  };

  const [, drop] = useDrop(
    () => ({
      accept: 'Device',
      canDrop: () => canDropOntoScreen(),
      drop: (item) => dropDevice(props.rowIndex, props.columnIndex, item),
      collect: (monitor: DropTargetMonitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      })
    }),
    [props.serialNumber, props.rowIndex, props.columnIndex]
  );

  const [showBezelConfigurator, setShowBezelConfigurator] = React.useState(false);

  const modalStyle = {
    content: {
      top: '10%',
      left: '10%',
      right: '10%',
      bottom: '10%',
    },
  };

  const handleEditBezel = () => {
    setShowBezelConfigurator(true);
  };

  const handleCloseBezelConfigurator = () => {
    setShowBezelConfigurator(false);
  };

  const handleRemoveBrightSignFromWall = () => {
    console.log('handleRemoveBrightSignFromWall', props);
    props.onSetBrightSignWallPosition(props.serialNumber, -1, -1);
  };

  const renderDeviceInWall = () => {
    if (isString(props.serialNumber) && props.serialNumber.length > 0) {
      return (
        <DeviceInWall
          serialNumber={props.serialNumber}
          onRemoveBrightSignFromWall={handleRemoveBrightSignFromWall}
        />
      );
    } else {
      return null;
    }
  };

  const renderedDeviceInWall = renderDeviceInWall();
  const positionLabel = getDevicePositionLabel(props.rowIndex, props.columnIndex);

  return (
    <div className='screenInWallContainer' ref={drop}>
      <div>
        <ReactModal
          isOpen={showBezelConfigurator}
          style={modalStyle}
          ariaHideApp={false}
        >
          <BezelConfigurator
            serialNumber={props.serialNumber}
            onCloseBezelConfigurator={handleCloseBezelConfigurator}
          />
        </ReactModal>
      </div>

      <div className='indexContainer'>
        {positionLabel}
      </div>
      {renderedDeviceInWall}
      <div className='buttonContainer'>
        <button
          onClick={handleEditBezel}
          className='configuratorButtonStyle'
        >
          Edit Bezel
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(state: any, ownProps: ScreenInWallPropsFromParent): Partial<ScreenInWallProps> {
  const { serialNumber, rowIndex, columnIndex } = ownProps;
  return {
    rowIndex,
    columnIndex,
    serialNumber,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onSetBrightSignWallPosition: setBrightSignWallPosition,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenInWall);
