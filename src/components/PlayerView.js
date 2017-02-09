
import React, { Component } from 'react'
import Trigonometry from './trig'
import { Panel } from './Panel'
import { getPlayerInList } from '../lib/helpers'

export class PlayerView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            replyMessage: ""
        }
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

                    Current player: {this.props.currentName}
                    <div>
                        <button onClick={this.moveHandler}>
                            Move
                    </button>
                        <div className="error">{this.state.replyMessage}</div>
                    </div>
                    <Trigonometry
                        circleRadius={60}
                        sketchSize={20 * 20} />
                </div>
            </div>
        )
    }
}