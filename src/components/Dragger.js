import React, { Component } from 'react'

import Draggable from 'react-draggable';

export class Dragger extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      activeDrags: 0,
      deltaPosition: { x: 0, y: 0 },
      controlledPosition: { x: 60, y: 60 }
    };
  }
  handleDrag(e, ui) {
    console.log(ui);
    const {x, y} = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
          x: x + ui.deltaX,
          y: y + ui.deltaY,
        }
    });
  }

  onStart = (event) => {
    console.log('Event: ', event);
    console.log('Position: ', this.state.controlledPosition);
    this.setState({ activeDrags: ++this.state.activeDrags });
  }

  onStop = (event) => {
    console.log('Event: ', event);
    console.log('Position: ', this.state.controlledPosition);
    this.setState({ activeDrags: --this.state.activeDrags });
  }

// For controlled component
    adjustXPos = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const {x, y} = this.state.controlledPosition;
      this.setState({controlledPosition: {x: x - 10, y}});
    }

    adjustYPos = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const {controlledPosition} = this.state;
      const {x, y} = this.state.controlledPosition;
      this.setState({controlledPosition: {x, y: y - 10}});
    }

    onControlledDrag = (e, position) => {
      const {x, y} = position;
      this.setState({controlledPosition: {x, y}});
    }

    onControlledDragStop = (e, position) => {
      const {x, y} = position;
      this.setState({controlledPosition: {x, y}});
    }


  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const {deltaPosition, controlledPosition} = this.state;

    return (
      <div className="central">
        <div className="boxOuter" style={{ height: '200px', width: '200px', position: 'relative', overflow: 'auto' }}>
          <Draggable bounds="parent" position={this.state.controlledPosition} {...dragHandlers} >
            <div className="boxy" style={{ height: '40px', width: '40px' }}>  </div>
          </Draggable>
        </div>
      </div>
    );
  }
}

// {...dragHandlers}