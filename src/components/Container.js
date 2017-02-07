import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import { DropTarget, DragDropContext } from 'react-dnd';
import flow from 'lodash/flow';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from './ItemTypes';
import Box from './Box';

const styles = {
  width: 300,
  height: 300,
  border: '1px solid black',
  position: 'relative',
};

const boxTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    component.moveBox(item.id, left, top);
  },
};

// @DragDropContext(HTML5Backend)
// @DropTarget(ItemTypes.BOX, boxTarget, connect => ({
//   connectDropTarget: connect.dropTarget(),
// }))


/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class Container extends Component {
  static propTypes = {
    hideSourceOnDrag: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      boxes: {
        a: { top: 20, left: 80, title: 'Drag' },
        b: { top: 180, left: 20, title: 'Drag me too' },
      },
    };
  }

  moveBox(id, left, top) {
    this.setState(update(this.state, {
      boxes: {
        [id]: {
          $merge: { left, top },
        },
      },
    }));
  }

  render() {
    const { hideSourceOnDrag, connectDropTarget } = this.props;
    const { boxes } = this.state;

    return connectDropTarget(
      <div style={styles}>
        {Object.keys(boxes).map((key) => {
          const { left, top, title } = boxes[key];
          return (
            <Box
              key={key}
              id={key}
              left={left}
              top={top}
              hideSourceOnDrag={hideSourceOnDrag}
            >
              {title}
            </Box>
          );
        })}
      </div>,
    );
  }
}

export default flow(
    DragDropContext(HTML5Backend),
    DropTarget(ItemTypes.BOX, boxTarget, collect)
)(Container);
