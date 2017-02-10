import React, { Component } from 'react'
import { Tabs } from './components/Tabs'
import { Panel } from './components/Panel'
import { Statistics } from './components/Statistics'
import { PlanView } from './components/PlanView'
import { PlayerView } from './components/PlayerView'
import { PlayerWho } from './components/PlayerWho'
import StrategyList from './components/StrategyList'
import { Dragger } from './components/Dragger'
import { objectToPlayers } from './lib/helpers'

// import Container from './components/Container';  // was for drag

import logo from './logo.svg';
import './App.css';

var tabList = [
  { 'id': 1, 'name': 'Play' },
  { 'id': 2, 'name': 'Talent' },
  { 'id': 3, 'name': 'Room' },
  { 'id': 4, 'name': 'Stats' },
  { 'id': 5, 'name': 'Who' },
  { 'id': 6, 'name': 'Test' }
];

export default class App extends Component {
  constructor(props) {
    super(props)

    var lastPlayer = localStorage.getItem("dragdrawplayer")

    //    console.log(JSON.stringify(this.props));
    const playerList = objectToPlayers(props);
    this.state = {
      version: 1.1,
      activeTab: 1,
      nameText: "",
      players: playerList,
      currentPlayer: lastPlayer,
      currentPlayerId: "0",
      colour: { r: 255, g: 200, b: 100, a: 255 }
    }
  }

  componentWillReceiveProps(nextProps) {
    const playerList = objectToPlayers(nextProps);
    this.setState({
      players: playerList
    })
  }

  whois = (name) => {
    this.setState({
      currentPlayer: name
    })
  }

  handleClick = (tab) => {
    //    console.log("t", tab)
    this.setState({
      activeTab: tab
    })
  }

  // tried this for drag
  //  <Container hideSourceOnDrag={true} />

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="App-title">Strategy app</span><span className="version">  v{this.state.version}</span>
        </div>
        <Tabs tabList={tabList} activeTab={this.state.activeTab}
          clickHandler={(e) => this.handleClick(e)} />

        <div className={this.state.activeTab === 1 ? "dash tabcontent" : "tabhidden"}>
          <PlayerView
            currentName={this.state.currentPlayer}
            updatePlayer={this.props.updatePlayer}
            players={this.state.players}
            />
        </div>

        <div className={this.state.activeTab === 2 ? "dash tabcontent" : "tabhidden"}>
          <Panel >Strategy list</Panel>
          <StrategyList />
        </div>

        <div className={this.state.activeTab === 3 ? "tabcontent" : "tabhidden"}>
          <Panel >Location details</Panel>
          <div className="central">
            <PlanView squad={this.state.players} />
          </div>
        </div>

        <div className={this.state.activeTab === 4 ? "tabcontent" : "tabhidden"}>
          <Panel >Statistics</Panel>
          <div className="central">
            Current player: {this.state.currentPlayer}
            <Statistics />
          </div>
        </div>

        <div className={this.state.activeTab === 5 ? "dash tabcontent" : "tabhidden"}>
          <PlayerWho currentPlayer={this.state.currentPlayer}
                      players={this.state.players}
                      addPlayer={this.props.addPlayer}
                      updatePlayer={this.props.updatePlayer}
                      whois={this.whois} />
        </div>

        <div className={this.state.activeTab === 6 ? "tabcontent" : "tabhidden"}>
            <Dragger />
        </div>
      </div>
    );
  }
}

