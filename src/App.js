import React, { Component } from 'react';
import { Tabs } from './components/Tabs'
import { Panel } from './components/Panel'
import { FormName } from './components/FormName'
import List from './List'
import { generateId } from './lib/helpers';
import logo from './logo.svg';
import './App.css';


var tabList = [
  { 'id': 1, 'name': 'Play' },
  { 'id': 2, 'name': 'Custom' },
  { 'id': 3, 'name': 'Room' },
  { 'id': 4, 'name': 'Stats' },
  { 'id': 5, 'name': 'DB2' }
];

class App extends Component {
  constructor(props) {
    super(props)
    //    console.log(JSON.stringify(this.props));
    const playerList = this.updatePlayers(props);
    this.state = {
      activeTab: 1,
      addition: "",
      players: playerList
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
    if (nextProps.players !== undefined) {                // is there a players entry
      Object.keys(nextProps.players).forEach(key => {
        if (nextProps.players[key].id !== undefined) {     // no correct id entry
          playerList.push(nextProps.players[key]);
        }
      })
    }
    return playerList;
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
  }

  checkPlayerInList = (name) => {
    for (var i = 0; i < this.state.players.length; i++)
      if (this.state.players[i]["name"] == name)
        return true;
    return false;
  }

  handlePlayerSubmit = (evt) => {
    evt.preventDefault();
    if (!this.checkPlayerInList(this.state.addition)) {
      this.props.addPlayer({
        id: generateId(),
        name: this.state.addition,
        state: 'buttonState'
      })
      this.showTempMessage("adding player");
    } else {
      // set this player
      this.showTempMessage(`setting player: ${this.state.addition}`);
    }
  }
  // const newId = generateId();
  // const newTeam = {
  //   name: this.state.addition, 
  //   star:false,
  //   id: newId
  // }

  // createTeam(newTeam)
  //   .then(() => this.showTempMessage( "team added"))


handleInputChange = (evt) => {
  this.setState({
    addition: evt.target.value
  })
}

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

      <div className={this.state.activeTab === 1 ? "tabcontent" : "tabhidden"}>
        <Panel >Game point</Panel>
      </div>
      <div className={this.state.activeTab === 2 ? "tabcontent" : "tabhidden"}>
        <List />
      </div>
      <div className={this.state.activeTab === 3 ? "tabcontent" : "tabhidden"}>
        <Panel >Location details</Panel>
      </div>
      <div className={this.state.activeTab === 4 ? "tabcontent" : "tabhidden"}>
        <Panel >Statistics</Panel>
      </div>
      <div className={this.state.activeTab === 5 ? "tabcontent" : "tabhidden"}>
        <Panel >
          <div>Connections</div>
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
          <div className="success">S-{this.state.message}</div>
          <div className="error">E-{this.state.errorMessage}</div>

        </Panel>
      </div>

    </div>
  );
}
}

export default App;
