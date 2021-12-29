import React, { useState, useEffect, useRef } from 'react';

import { isNil } from 'lodash';

import '../../styles/configurator.css';

export interface BezelPreviewProps {
  bezelWidth: number;
  bezelHeight: number;
  screenWidth: number;
  screenHeight: number;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const BezelPreview = (props: BezelPreviewProps) => {

  let width: number = 0;
  let height: number = 0;

  const { bezelWidth, bezelHeight, screenWidth, screenHeight } = props;

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
    leftOffset = bezelWidth / screenWidth * outerContainerWidth;
    width = outerContainerWidth - (leftOffset * 2);
    topOffset = bezelHeight / screenHeight * outerContainerHeight;
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

export default BezelPreview;
