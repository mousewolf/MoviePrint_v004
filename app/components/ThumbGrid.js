// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Thumb from './Thumb';
import ThumbGridHeader from './ThumbGridHeader';
import styles from './ThumbGrid.css';

const SortableThumb = SortableElement(Thumb);

const ThumbGrid = ({
  thumbs,
  thumbImages,
  file,
  columnWidth,
  controlersAreVisible,
  onToggleClick, onRemoveClick, onInPointClick, onOutPointClick,
  onBackClick, onForwardClick, onScrubClick,
  onMouseOverResult, onMouseOutResult
}) => (
  <div
    className={styles.grid}
    style={{
      width: columnWidth,
    }}
    id="ThumbGrid"
  >
    <ThumbGridHeader
      file={file}
    />
    {thumbs.map(thumb => (
      <SortableThumb
        key={thumb.id}
        indexValue={thumb.index}
        thumbImageObjectUrl={thumbImages !== undefined ? thumbImages[thumb.id] !== undefined ? thumbImages[thumb.id].objectUrl : undefined : undefined}
        width={file.width || 1920}
        height={file.height || 1080}
        controlersAreVisible={(thumb.id === controlersAreVisible)}
        {...thumb}
        onToggle={() => onToggleClick(file.id, thumb.id)}
        onRemove={() => onRemoveClick(file.id, thumb.id)}
        onInPoint={() => onInPointClick(file, thumbs, thumb.id, thumb.frameNumber)}
        onOutPoint={() => onOutPointClick(file, thumbs, thumb.id, thumb.frameNumber)}
        onBack={() => onBackClick(file, thumb.id, thumb.frameNumber)}
        onForward={() => onForwardClick(file, thumb.id, thumb.frameNumber)}
        onScrub={() => onScrubClick(file, thumb.id, thumb.frameNumber)}
        onOver={() => onMouseOverResult(thumb.id)}
        onOut={() => onMouseOutResult()}
      />))}
  </div>
);

ThumbGrid.defaultProps = {
  controlersAreVisible: 'false'
};

ThumbGrid.propTypes = {
  thumbs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    hidden: PropTypes.bool.isRequired,
    frameNumber: PropTypes.number.isRequired
  }).isRequired).isRequired,
  thumbImages: PropTypes.object,
  // thumbImages: PropTypes.objectOf(PropTypes.objectOf(PropTypes.shape({
  //   objectUrl: PropTypes.string.isRequired
  // }).isRequired).isRequired).isRequired,
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  columnWidth: PropTypes.number.isRequired,
  controlersAreVisible: PropTypes.string.isRequired,
  onToggleClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onInPointClick: PropTypes.func.isRequired,
  onOutPointClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onForwardClick: PropTypes.func.isRequired,
  onScrubClick: PropTypes.func.isRequired,
  onMouseOverResult: PropTypes.func.isRequired,
  onMouseOutResult: PropTypes.func.isRequired,
};

const SortableThumbGrid = SortableContainer(ThumbGrid);

// export default ThumbGrid;
export default SortableThumbGrid;
