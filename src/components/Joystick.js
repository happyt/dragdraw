import React, { Component } from 'react'

import Draggable from 'react-draggable';

export class Joystick extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      activeDrags: 0,
      deltaPosition: { dx: 0, dy: 0 },
      controlledPosition: { x: 60, y: 60 }
    };
  }
  onDrag = (event, ui) => {
 //   console.log('Drag Event: ', this.state,  ui);
   const {dx, dy} = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
          dx: dx + ui.deltaX,
          dy: dy + ui.deltaY,
        }
    });
    // console.log(x,y);
    this.props.monitor(this.state.deltaPosition)
  }

  // deltaPosition -  where joystick is
  // controlledPosition - centre position ? didn't change

  onStart = (event) => {
    // console.log('Start Event: ', event);
    // console.log('Position: ', this.state.controlledPosition);    
    this.setState({ activeDrags: ++this.state.activeDrags });
  }

  onStop = (event) => {
    // console.log('Stop Event: ', event);
    // console.log('Position: ', this.state.deltaPosition);   
    this.setState({ activeDrags: --this.state.activeDrags });
    this.setState({
      deltaPosition: {
          dx: 0,
          dy: 0,
        }
    });
    this.props.monitor(this.state.deltaPosition)
  }


  render() {
    const dragHandlers = { onStart: this.onStart, onDrag: this.onDrag, onStop: this.onStop };
 //   const {deltaPosition, controlledPosition} = this.state;

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
