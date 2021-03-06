import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './trig.css';
import Fraction from 'fraction.js'

class Angle extends Component {    
    handleMouseDown = (e) => {
        this.props.dragStart(e, this.props.index)
    };
    
    render() {
        const {
            angle,
            index,
            isDragging,
            ...props,
        } = this.props

        const sketchHalfSize = props.sketchSize / 2
        
        const numerator = angle.numerator !== "" ? angle.numerator : 1
        const denominator = angle.denominator !== "" ? angle.denominator : 1
        
        const radians = (numerator / denominator) * Math.PI
        const cosRadius = sketchHalfSize + Math.cos(radians) * props.circleRadius
        const sinRadius = sketchHalfSize - Math.sin(radians) * props.circleRadius
        
        const angleRadius = 40
        const cosAngleRadius = sketchHalfSize + Math.cos(radians) * angleRadius
        const sinAngleRadius = sketchHalfSize - Math.sin(radians) * angleRadius
        
        return (
            <g className="ad-SketchAngle">
                <path
                    className="ad-SketchAngle-angle"
                    d={
                        "M " + (sketchHalfSize + angleRadius) + " " + sketchHalfSize +
                        " A " + angleRadius + " " + angleRadius + ", " +
                            (Math.sin(radians) < 0 ? "0, 1, 0" : "0, 0, 0") + ", " +
                            cosAngleRadius + " " + sinAngleRadius +
                        " L " + sketchHalfSize + " " + sketchHalfSize +
                        " Z"
                    } />
                
                <g className="ad-SketchAngle-trigo">
                    <line
                        className="ad-SketchAngle-cos"
                        x1={ sketchHalfSize }
                        y1={ sinRadius }
                        x2={ cosRadius }
                        y2={ sinRadius } />
                    <line
                        className="ad-SketchAngle-sin"
                        x1={ cosRadius }
                        y1={ sketchHalfSize }
                        x2={ cosRadius }
                        y2={ sinRadius } />
                </g>
                
                <line
                    className="ad-SketchAngle-line"
                    x1={ sketchHalfSize }
                    y1={ sketchHalfSize }
                    x2={ sketchHalfSize + props.circleRadius }
                    y2={ sketchHalfSize } />
                <line
                    className="ad-SketchAngle-line"
                    x1={ sketchHalfSize }
                    y1={ sketchHalfSize }
                    x2={ cosRadius }
                    y2={ sinRadius } />
                
                <circle
                    className={
                        "ad-SketchAngle-dot" +
                        (isDragging === index ? " is-dragging" : "")
                    }
                    onMouseDown={ this.handleMouseDown }
                    cx={ cosRadius }
                    cy={ sinRadius }
                    r={ 6 } />
            </g>
        )
    }
}

class Sketch extends Component {
    render() {
        const {
            angles,
            ...props,
        } = this.props
        
        const sketchHalfSize = props.sketchSize / 2
        const svgAngles = angles.map((angle, index) => {
            return (<Angle
                key={index}
                angle={ angle }
                index={ index }
                { ...props } />)
        })

        return (
            <svg
                className="ad-Sketch"
                viewBox={ "0 0 " + props.sketchSize + " " + props.sketchSize }>
                <g className="ad-Sketch-base">
                    <line
                        className="ad-Sketch-ortho"
                        x1={ sketchHalfSize }
                        y1={ 0 }
                        x2={ sketchHalfSize }
                        y2={ props.sketchSize } />
                    <line
                        className="ad-Sketch-ortho"
                        x1={ 0 }
                        y1={ sketchHalfSize }
                        x2={ props.sketchSize }
                        y2={ sketchHalfSize } />
                    
                    <text
                        className="ad-Sketch-value"
                        x={ sketchHalfSize + props.circleRadius + 15 }
                        y={ sketchHalfSize - 10 }>
                        0
                    </text>
                    <text
                        className="ad-Sketch-value  ad-Sketch-value--r"
                        x={ sketchHalfSize - (props.circleRadius + 15) }
                        y={ sketchHalfSize - 10 }>
                        π
                    </text>
                    <text
                        className="ad-Sketch-value  ad-Sketch-value--c  ad-Sketch-value--t"
                        x={ sketchHalfSize }
                        y={ sketchHalfSize - (props.circleRadius + 10) }>
                        π / 2
                    </text>
                    <text
                        className="ad-Sketch-value  ad-Sketch-value--c  ad-Sketch-value--b"
                        x={ sketchHalfSize }
                        y={ sketchHalfSize + props.circleRadius + 10 }>
                        3π / 2
                    </text>
                    
                    <circle
                        className="ad-Sketch-circle"
                        cx={ sketchHalfSize }
                        cy={ sketchHalfSize }
                        r={ props.circleRadius } />
                </g>
                
                <g className="ad-Sketch-angles">
                    { svgAngles }
                </g>
            </svg>
        )
    }
}

export default class Trigonometry extends Component {    
    state = {
        isDragging: false,
        shouldScroll: false,
        angles: [
            {
                numerator: 7,
                denominator: 10,
            },
            {
                numerator: 3,
                denominator: 2,
            },
            {
                numerator: 1,
                denominator: 5,
            },
        ],
    };

    updateNumerator = (index, numerator) => {
        if (numerator !== "") {
            numerator = parseFloat(numerator)
        }

        const angles = this.state.angles.map((angle, angleIndex) => {
            if (angleIndex === index) {
                numerator = (numerator !== "" && isNaN(numerator)) ? angle.numerator : numerator
                
                return {
                    numerator: numerator,
                    denominator: angle.denominator,
                }
            }
            
            return angle
        })

        this.setState({ angles })
    };

    updateDenominator = (index, denominator) => {
        if (denominator !== "") {
            denominator = parseFloat(denominator)
            
            if (denominator === 0) {
                denominator = 1
            }
        }

        const angles = this.state.angles.map((angle, angleIndex) => {
            if (angleIndex === index) {
                denominator = (denominator !== "" && isNaN(denominator)) ? angle.denominator : denominator

                return {
                    numerator: angle.numerator,
                    denominator: denominator,
                }
            }

            return angle
        })

        this.setState({ angles })
    };
    
    blurAddButton = () => {
        this.setState({
            shouldScroll: false,
        })
    };
    
    addFormGroup = () => {
        const numerator = 0,
            denominator = 1,
            angles = this.state.angles
        
        angles.push({ numerator, denominator })

        this.setState({
            angles,
            shouldScroll: true,
        })
    };
            
    deleteFormGroup = (index) => {
        let angles = this.state.angles
        
        delete angles[index]
        
        this.setState({ angles })
    };

    drag = (e) => {
        let i = this.state.isDragging
        let sketch = ReactDOM.findDOMNode(this.refs.sketch).getBoundingClientRect()
        
        if (i !== false) {
            const sketchHalfSize = this.props.sketchSize / 2

            let angles = this.state.angles,
                x = (e.pageX - sketch.left) - sketchHalfSize,
                y = sketchHalfSize - (e.pageY - sketch.top),
                rad = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
                sine = y / rad,
                cosine = x / rad,
                theta
            
            theta = Math.acos(cosine)
            
            if (sine < 0) {
                theta = 2 * Math.PI - theta
            }
            
           const f = new Fraction((theta / Math.PI).toFixed(1))
            angles[i] = {
                numerator: f.n,
                denominator: f.d,
            }

            this.setState({ angles })
        }
    };
    
    dragStart = (e, index) => {
        e.preventDefault()

        this.setState({
            isDragging: index,
        })
    };
    
    dragEnd = (e) => {
        this.setState({
            isDragging: false,
        })
    };
    
    render() {       
        return (
            <div className="central">
                <div className="ad-App-head">
                    <h1 className="ad-App-title">
                        Angular battle
                    </h1>

                    <div className="ad-App-hint">
                        Drag the nodes.
                    </div>
                </div>

                <div
                    className="ad-Trigonometry"
                    onMouseUp={ this.dragEnd }
                    onMouseMove={ this.drag }>
                    <div className="ad-Trigonometry-svg">
                        <Sketch
                            ref="sketch"
                            angles={ this.state.angles }
                            drag={ this.drag }
                            dragStart={ this.dragStart }
                            dragEnd={ this.dragEnd }
                            isDragging={ this.state.isDragging }
                            { ...this.props } />
                    </div>
                </div>
            </div>
        )
    }
}

// old Angles form

                    // <div className="ad-Trigonometry-form">
                    //     <Form
                    //         angles={ this.state.angles }
                    //         shouldScroll={ this.state.shouldScroll }
                    //         updateNumerator={ this.updateNumerator }
                    //         updateDenominator={ this.updateDenominator }
                    //         blurAddButton={ this.blurAddButton }
                    //         addFormGroup={ this.addFormGroup }
                    //         deleteFormGroup={ this.deleteFormGroup } />
                    // </div>

// React.render(
//     <Trigonometry
//         circleRadius={ 130 }
//         sketchSize={ 26 * 16 } />,
//     document.querySelector("#app")
// )