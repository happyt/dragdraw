
import React, { Component } from 'react'
import Trigonometry from './trig'
import { Panel } from './Panel'
import { Joystick } from './Joystick'
import { getPlayerInList } from '../lib/helpers'


const DELAY = 100;
const MIN = 1;
const SPEEDMOD = 10;
const LIMIT = 780;

export class PlayerView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            maxSpeed: 10,
            replyMessage: "",
            velocity: {vx: 0, vy:0},
            position: {x: 0, y:0},
            moving: false
        }
        this.moving = false
        this.x = 0
        this.y = 0
        this.vx = 0
        this.vy = 0
    }

// set acceleration
// start timer

// timer fires
// set speed
// if zero speed, clear timer

    updateState() {
        this.setState({
            position: {
                x: this.x,
                y: this.y,
            },
            velocity: {
                vx: this.vx, 
                vy: this.vy
            },
            moving : this.moving
        })
    }

    updatePosition = () => {
        this.x = this.x + this.vx
        this.y = this.y + this.vy
        if (this.x < 0) this.x = 20
        if (this.x > LIMIT) this.x = LIMIT
        if (this.y < 0) this.y = 20
        if (this.y > LIMIT) this.y = LIMIT

         let p = getPlayerInList(this.props.currentName, this.props.players)
        if (p) {
            p.posX = this.x;
            p.posY = this.y;
 //           console.log("UPDATE: ", p.id, p.name)
            this.props.updatePlayer(p.id, p)
        }
 //       console.log(`POS: ${this.x}, ${this.y}`)
    }

    sign = (x) => { return x ? x < 0 ? -1 : 1 : 0; }

    setSpeed = () => {
        this.vx = this.vx + this.ax - 1*this.sign(this.vx);
        this.vy = this.vy + this.ay - 1*this.sign(this.vy);
 //        console.log(`VEL: ${this.ax}, ${this.ay} -> ${this.vx}, ${this.vy} `)

        if (Math.abs(this.vx) < MIN && Math.abs(this.vy) < MIN
                && Math.abs(this.ax) < MIN && Math.abs(this.ay) < MIN) {
                    
            this.moving = false
 //           console.log("clear")
            clearTimeout(this.timeout)
        }
    }

    joyPosition = (offset) => {
        this.ax = Math.floor(offset.dx/SPEEDMOD);
        this.ay = -Math.floor(offset.dy/SPEEDMOD);  // negative to give positive top right
  //      console.log(`ACCN: ${this.ax}, ${this.ay}, DXY  ${offset.dx}, ${offset.dy}, ${this.moving ? "MOVING": "STOPPED"}`)
        if (!this.moving) {
           this.timeout = setInterval(() => {
  //                      console.log("fired")
                        this.setSpeed()
  //                      console.log(`ACCN FIRED: VEL  ${this.vx}, ${this.vy} ACC ${this.ax}, ${this.ay}, ${DELAY}`)
                        this.updatePosition()
                        this.updateState()
                    }, DELAY);
            // do this time
            
            this.moving = true
            this.setSpeed();
            this.updatePosition()
            this.updateState()
        }      
       // console.log(this.timeout)
    }

    moveHandler = (evt) => {
        evt.preventDefault();

    }

    render() {

        return (
           
            <div>
                <Panel>Player dashboard</Panel>
                <div className="central white">

                Current player: {this.props.currentName} : {this.state.moving ? "MOVING": "STOPPED"} : V {this.state.velocity.vx},{this.state.velocity.vy} - P {this.state.position.x},{this.state.position.y}
                    <div>
                        <button onClick={this.moveHandler}>
                            ??
                        </button>
                        <div className="error">{this.state.replyMessage}</div>
                    </div>
                    <Joystick  monitor={this.joyPosition} />
                    <div className="central">
                        <Trigonometry
                            circleRadius={60}
                            sketchSize={300} />
                    </div>
                </div>
            </div>
        )
    }
}