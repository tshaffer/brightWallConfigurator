import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isNil } from 'lodash';

import '../styles/configurator.css';

import {
  getBezelWidthPercentage,
  getBezelHeightPercentage,
} from '../selector';

export interface BezelPreviewPropsFromParent {
  serialNumber: string;
}

export interface BezelPreviewProps extends BezelPreviewPropsFromParent {
  bezelWidthPercentage: number;
  bezelHeightPercentage: number;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const BezelPreview = (props: BezelPreviewProps) => {

  let width: number = 0;
  let height: number = 0;

  const { bezelWidthPercentage, bezelHeightPercentage } = props;

  console.log('BezelPreview');
  console.log('width', bezelWidthPercentage);
  console.log('height', bezelHeightPercentage);

  const $outerContainer = useRef(null);

  const [outerContainerWidth, setOuterContainerWidth] = useState(0);
  const [outerContainerHeight, setOuterContainerHeight] = useState(0);

  useEffect(() => {
    if (!isNil($outerContainer) && !isNil($outerContainer.current)) {
      setOuterContainerWidth(($outerContainer.current as any).clientWidth);
      setOuterContainerHeight(($outerContainer.current as any).clientHeight);
    }
  }, [$outerContainer.current]);

  let topOffset = 0;
  let leftOffset = 0;

  if (!isNil($outerContainer) && !isNil($outerContainer.current)) {
    leftOffset = bezelWidthPercentage / 100 * outerContainerWidth;
    width = outerContainerWidth - (leftOffset * 2);
    topOffset = bezelHeightPercentage / 100 * outerContainerHeight;
    height = outerContainerHeight - (topOffset * 2);
  }

  const style = {
    width: `${width}px`,
    height: `${height}px`,

    top: `${topOffset}px`,
    left: `${leftOffset}px`,
  };

  return (
    <div ref={$outerContainer} className='demoAreaContainer'>
      <div className='demoElementContainer' style={style} />
    </div>
  );
};

function mapStateToProps(state: any, ownProps: BezelPreviewProps): Partial<any> {
  const serialNumber = ownProps.serialNumber;
  return {
    serialNumber,
    bezelWidthPercentage: getBezelWidthPercentage(state, serialNumber),
    bezelHeightPercentage: getBezelHeightPercentage(state, serialNumber),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BezelPreview);
