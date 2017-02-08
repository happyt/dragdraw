import React, { Component } from 'react'
import { Tabs } from './components/Tabs'
import { Panel } from './components/Panel'
import { FormName } from './components/FormName'
import { Statistics } from './components/Statistics'
import { PlanView } from './components/PlanView'
import { PlayerView } from './components/PlayerView'
import StrategyList from './components/StrategyList'

// import Container from './components/Container';

import { HuePicker } from 'react-color';
import logo from './logo.svg';
import './App.css';

var tabList = [
  { 'id': 1, 'name': 'Play' },
  { 'id': 2, 'name': 'Custom' },
  { 'id': 3, 'name': 'Room' },
  { 'id': 4, 'name': 'Stats' },
  { 'id': 5, 'name': 'Who' }
];


export default class App extends Component {
  constructor(props) {
    super(props)
    //    console.log(JSON.stringify(this.props));
    const playerList = this.updatePlayers(props);
    this.state = {
      activeTab: 1,
      addition: "",
      players: playerList,
      currentPlayer: "?",
      colour: { r: 255, g: 200, b: 100, a: 255 }
    }
  }

  componentWillReceiveProps(nextProps) {
    const playerList = this.updatePlayers(nextProps);
    this.setState({
      players: playerList
    })
  }

  updatePlayers = (nextProps) => {
    //    console.log("players: ", nextProps.players);
    const playerList = [];
    if (nextProps.players !== undefined) {                // is there a players list entry
      Object.keys(nextProps.players).forEach(key => {
        nextProps.players[key].id = key
        playerList.push(nextProps.players[key]);
      })
    }
    return playerList;
  }


  updateCurrentPlayer = () => {
    let message = "??"
    let p = this.getPlayerInList(this.state.currentPlayer)
    if (p) {
      this.props.updatePlayer(p.id, p)
      message = "OK"
    } else {
      message = "null"
    }
    console.log("here")
    this.setState({
      errorMessage: { message }
    })
    setTimeout(() => this.setState({ errorMessage: "" }), 2500)
  }

  handleKeyPress = (e) => {
    e.preventDefault()

    if (e.nativeEvent.keyCode === 13) {
      console.log('This is enter!')
    }
  }

  handleClick = (tab) => {
    //    console.log("t", tab)
    this.setState({
      activeTab: tab
    })
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

  checkPlayerInList = (name) => {
    for (var i = 0; i < this.state.players.length; i++)
      if (this.state.players[i]["name"] === name)
        return true;
    return false;
  }

  getPlayerInList = (name) => {
    for (var i = 0; i < this.state.players.length; i++)
      if (this.state.players[i]["name"] === name)
        return this.state.players[i];
    return null;
  }

  handlePlayerSubmit = (evt) => {
    let replyMessage = "??"
    evt.preventDefault();
    if (!this.checkPlayerInList(this.state.addition)) {
      this.props.addPlayer({
        name: this.state.addition,
        colour: this.state.colour,
        status: 'playing',
        posX: 0,
        posY: 0,
        toggleA: false,
        ammo: 10
      })
      this.showTempMessage("adding player");
    } else {

      // set this player
      let p = this.getPlayerInList(this.state.currentPlayer)
      if (p) {
        p.colour = this.state.colour
        this.props.updatePlayer(p.id, p)
        replyMessage = "OK"
      } else {
        replyMessage = "null"
      }
      this.showTempMessage(`setting player: ${replyMessage}`);
    }
    this.setState({
      currentPlayer: this.state.addition
    });
  }

  handleColourChangeComplete = (color) => {
    console.log("XX")
    this.setState({ colour: color.rgb });
    document.getElementById('box').style.backgroundColor = color.hex;
  };

  handleInputChange = (evt) => {
    this.setState({
      addition: evt.target.value
    })
  }

  // tried this for drag
  //  <Container hideSourceOnDrag={true} />

  render() {
    const submitHandler = this.state.addition ? this.handlePlayerSubmit : this.handleEmptySubmit;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Strategy app<span className="version">  v {this.state.activeTab}</span></h2>
        </div>
        <Tabs tabList={tabList} activeTab={this.state.activeTab}
          clickHandler={(e) => this.handleClick(e)} />

        <div className={this.state.activeTab === 1 ? "dash tabcontent" : "tabhidden"}>
          <Panel className="white">Game point</Panel>
          <PlayerView currentName={this.state.currentPlayer}
            update={this.updateCurrentPlayer}
            players={this.state.players} />
        </div>


        <div className={this.state.activeTab === 2 ? "tabcontent" : "tabhidden"}>
          <StrategyList />
        </div>
        <div className={this.state.activeTab === 3 ? "tabcontent" : "tabhidden"}>
          <Panel >Location details</Panel>
          <div className="central">
            <PlanView squad={this.state.players} />
          </div></div>
        <div className={this.state.activeTab === 4 ? "tabcontent" : "tabhidden"}>
          <Panel >Statistics</Panel>
          <div className="central">
            Current player: {this.state.currentPlayer}
            <Statistics />
          </div>
        </div>
        <div className={this.state.activeTab === 5 ? "tabcontent" : "tabhidden"}>
          <Panel >
            <div>Connections</div>
            <div>{this.state.currentPlayer}</div>
            <ul>
              {this.state.players.map(mm =>
                <div key={mm.id}> {mm.name} </div>
              )}
            </ul>
            <FormName handleInputChange={this.handleInputChange}
              addition={this.state.addition}
              handleSubmit={submitHandler} />
            <button onClick={submitHandler}>
              Set player
            </button>
            <div className="success">{this.state.message}</div>
            <div className="error">{this.state.errorMessage}</div>
            <div className="central">
              <HuePicker color={this.state.colour}
                onChangeComplete={this.handleColourChangeComplete} />
              <div id="box"> </div>
            </div>
          </Panel>
        </div>

      </div>
    );
  }
}

