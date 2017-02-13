
import React, { Component } from 'react'
import { Panel } from './Panel'
import {
    getPlayerInList,
    checkPlayerInList
} from '../lib/helpers'
import { FormName } from './FormName'
import { ChromePicker } from 'react-color';

export class PlayerWho extends Component {

    constructor(props) {
        super(props);
        this.state = {
            replyMessage: "",
            nameText: "",
            errorMessage: "",
            message: "",
            colour: { r: 255, g: 200, b: 100, a: 255 },
            currentPlayer: "?"
        }
    }

    showTempMessage = (msg) => {
        this.setState({
            message: msg
        })
        setTimeout(() => this.setState({ message: "" }), 2500)
    }

    handleEmptySubmit = (evt) => {
        evt.preventDefault();
        this.setState({
            errorMessage: "Supply a name"
        })
        setTimeout(() => this.setState({ errorMessage: "" }), 2500)
    }

    handlePlayerSubmit = (evt) => {
        let replyMessage = "??"
        let currentlyWho = this.state.nameText
       
        evt.preventDefault();
        if (!checkPlayerInList(this.state.nameText, this.props.players)) {
            this.props.addPlayer({
                name: this.state.nameText,
                colour: this.state.colour,
                status: 'playing',
                posX: 0,
                posY: 0,
                toggleA: false,
                ammo: 10
            })
            currentlyWho = this.state.nameText
            this.setState({
                currentPlayer: this.state.nameText
            });
            this.showTempMessage("adding player");
        } else {

            // set this player
            let p = getPlayerInList(this.state.nameText, this.props.players)
            if (p) {
                // p.colour = this.state.colour
                // this.props.updatePlayer(p.id, p)
                replyMessage = "OK, " + p.name
                currentlyWho = p.name
                this.setState({
                    currentPlayer: p.name
                });
            } else {
                replyMessage = "null"
            }
            this.showTempMessage(`setting player: ${replyMessage}`);
            localStorage.setItem("dragdrawplayer", p.name);
            console.log("Name ", currentlyWho, "Colour: ", p.colour)
            this.setState({
                colour: p.colour
            })
        }
        this.props.whois(currentlyWho)

    }

    handleColourChangeComplete = (color) => {
        this.setState({ colour: color.rgb });
 //       document.getElementById('box').style.backgroundColor = color.hex;
        // set current player colour
        let p = getPlayerInList(this.state.nameText, this.props.players)
        if (p) {
            p.colour = this.state.colour
            this.props.updatePlayer(p.id, p)
        }
    };

    handleInputChange = (evt) => {
        this.setState({
            nameText: evt.target.value
        })
    }

    render() {
        const submitHandler = this.state.nameText ? this.handlePlayerSubmit : this.handleEmptySubmit;

        return (
            <div>
                <Panel>Player choices</Panel>
                <div className="central white">
                    <div>{this.props.currentPlayer}</div>
                    <ul>
                        {this.props.players.map(mm =>
                            <div key={mm.id}> {mm.name} </div>
                        )}
                    </ul>
                    <FormName handleInputChange={this.handleInputChange}
                        nameText={this.state.nameText}
                        handleSubmit={submitHandler} />
                    <button onClick={submitHandler}>
                        Set player
                    </button>
                    <div className="success">{this.state.message}</div>
                    <div className="error">{this.state.errorMessage}</div>
                    <div className="central">
                        <ChromePicker color={this.state.colour}
                            onChangeComplete={this.handleColourChangeComplete} />
                        
                    </div>
                </div>
            </div>
        )
    }
}