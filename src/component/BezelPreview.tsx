import React, { useState, useEffect, useRef } from 'react';
import { isNil } from 'lodash';

import '../styles/configurator.css';

export interface BezelPreviewProps {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------

const BezelPreview = (props: BezelPreviewProps) => {

  let width: number = 0;
  let height: number = 0;

  const { top, bottom, left, right } = props;

  const $outerContainer = useRef(null);

  const [outerContainerWidth, setOuterContainerWidth] = useState(0);
  const [outerContainerHeight, setOuterContainerHeight] = useState(0);

  useEffect(() => {
    if (!isNil($outerContainer) && !isNil($outerContainer.current)) {
      setOuterContainerWidth(($outerContainer.current as any).clientWidth);
      setOuterContainerHeight(($outerContainer.current as any).clientHeight);
    }
  }, [$outerContainer.current]);

  if (!isNil($outerContainer) && !isNil($outerContainer.current)) {
    width = outerContainerWidth - (left + right);
    height = outerContainerHeight - (top + bottom);
  }

  const style = {
    width: `${width}px`,
    height: `${height}px`,

    top: `${top}px`,
    left: `${left}px`,
};

  return (
    <div ref={$outerContainer} className='demoAreaContainer'>
      <div className='demoElementContainer' style={style}/>
    </div>
  );
};

export default BezelPreview;
