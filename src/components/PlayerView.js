
import React, { Component } from 'react'
import Trigonometry from './trig'

export class PlayerView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
    }

    getPlayerInList = (name) => {
        for (var i = 0; i < this.props.players.length; i++)
            if (this.props.players[i]["name"] === name)
                return this.props.players[i];
        return null;
    }

    moveHandler = (evt) => {
        evt.preventDefault();
        let p = this.getPlayerInList(this.props.currentName)
        if (p) {
            p.posX = Math.random() * 100;
            p.posY = Math.random() * 100;
            this.props.update()
        }
    }

    render() {

        return (

            <div className="central">
                Current player: {this.props.currentName}
                <div>
                    <button onClick={this.moveHandler}>
                        Move
                    </button>
                    <div className="error">{this.state.message}</div>
                </div>
                <Trigonometry
                    circleRadius={130}
                    sketchSize={26 * 16} />
            </div>
        )
    }
}