
import React, { Component } from 'react'
import Trigonometry from './trig'
import { Panel } from './Panel'
import { Joystick } from './Joystick'
import { getPlayerInList } from '../lib/helpers'

export class PlayerView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            maxSpeed: 10,
            speedMod: 25,
            replyMessage: "",
            offset: {dx: 0, dy:0},
            velocity: {vx: 0, vy:0},
            position: {x: 0, y:0},
            moving: false
        }
    }

// set acceleration
// start timer

// timer fires
// set speed
// if zero speed, clear timer

    setPosition = () => {
        const {x, y} = this.state.position;
        this.setState({
            position: {
                x: x + this.vx,
                y: y + this.vy,
            }
        });
    }


    setSpeed = (ax, ay) => {
        this.vx = this.state.velocity.vx + this.ax;
        this.vy = this.state.velocity.vy + this.ay;
        this.setState( {
            position: position,
            velocity: {vx: vx, vy: vy}
        })
        if (vx === 0 && vy === 0) clearTimeout(this.timeout)
    }

    joyPosition = (position) => {
//        console.log(position)
        this.accnX = Math.floor(position.dx/this.state.speedMod);
        this.accnY = Math.floor(position.dy/this.state.speedMod);
        if (!this.timeout) {
           this.timeout = setInterval(setSpeed, 250);
        }
        setSpeed(this.accnX, this.accnY)     
        setPosition()
        this.accnX = 0
        this.accnY = 0      
    }

    moveHandler = (evt) => {
        evt.preventDefault();
        let p = getPlayerInList(this.props.currentName, this.props.players)
        if (p) {
            p.posX = Math.random() * 100;
            p.posY = Math.random() * 100;
            this.props.updatePlayer(p.Id, p)
        }
    }

    render() {

        return (
           
            <div>
                <Panel>Player dashboard</Panel>
                <div className="central white">

                    Current player: {this.props.currentName} : {this.state.velocity.vx},{this.state.velocity.vy}
                    <div>
                        <button onClick={this.moveHandler}>
                            Move
                    </button>
                        <div className="error">{this.state.replyMessage}</div>
                    </div>
                    <Joystick  monitor={this.joyPosition} />
                    <Trigonometry
                        circleRadius={60}
                        sketchSize={20 * 20} />
                </div>
            </div>
        )
    }
}