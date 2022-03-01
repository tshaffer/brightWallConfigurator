import React, { useState, useEffect, useRef } from 'react';

import { isNil } from 'lodash';

import '../../styles/configurator.css';

export interface BezelPreviewProps {
  bezelLeft: number;
  bezelRight: number;
  bezelTop: number;
  bezelBottom: number;
  screenWidth: number;
  screenHeight: number;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const BezelPreview = (props: BezelPreviewProps) => {

  let width: number = 0;
  let height: number = 0;

  const { bezelLeft, bezelRight, bezelTop, bezelBottom, screenWidth, screenHeight } = props;

  const $outerContainer = useRef(null);

  const [outerContainerWidth, setOuterContainerWidth] = useState(0);
  const [outerContainerHeight, setOuterContainerHeight] = useState(0);

  useEffect(() => {
    if (!isNil($outerContainer) && !isNil($outerContainer.current)) {
      setOuterContainerWidth(($outerContainer.current as any).clientWidth);
      setOuterContainerHeight(($outerContainer.current as any).clientHeight);
    }
  }, [$outerContainer.current]);

  let leftOffset = 0;
  let rightOffset = 0;
  let topOffset = 0;
  let bottomOffset = 0;

  if (!isNil($outerContainer) && !isNil($outerContainer.current)) {
    leftOffset = bezelLeft / screenWidth * outerContainerWidth;
    rightOffset = bezelRight / screenWidth * outerContainerWidth;
    width = outerContainerWidth - (leftOffset + rightOffset);
    topOffset = bezelTop / screenHeight * outerContainerHeight;
    bottomOffset = bezelBottom / screenHeight * outerContainerHeight;
    height = outerContainerHeight - (topOffset + bottomOffset);
  }

  const style = {
    width: `${width}px`,
    height: `${height}px`,

    top: `${topOffset}px`,
    left: `${leftOffset}px`,
  };

  return (
    <div ref={$outerContainer} className='bezelPreviewWrapper'>
      <div className='bezelPreviewDevice' style={style} />
    </div>
  );
};

export default BezelPreview;
