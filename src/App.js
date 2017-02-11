import React, { Component } from 'react'
import { Tabs } from './components/Tabs'
import { ListItem } from './components/ListItem'
import { Panel } from './components/Panel'
import { Statistics } from './components/Statistics'
import { PlanView } from './components/PlanView'
import { PlayerView } from './components/PlayerView'
import { PlayerWho } from './components/PlayerWho'
import StrategyList from './components/StrategyList'
import { objectToPlayers } from './lib/helpers'
import Reorder from 'react-reorder'

// import DraggableList from './components/DraggableList';

// import Container from './components/Container';  // was for drag

import logo from './logo.svg';
import './App.css';

var tabList = [
  { 'id': 1, 'name': 'Play' },
  { 'id': 2, 'name': 'Skill' },
  { 'id': 3, 'name': 'Room' },
  { 'id': 4, 'name': 'Stats' },
  { 'id': 5, 'name': 'Who' },
  { 'id': 6, 'name': 'Test' }
];

// var listItems = [
//         'AAAAAA',
//         'BBBBBB',
//         'CCCCCC'
//       ];

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

  handleTabClick = (tab) => {
    //    console.log("t", tab)
    this.setState({
      activeTab: tab
    })
  }

  // tried this for drag
  //  <Container hideSourceOnDrag={true} />

  // renderList = () => {
  //     let i=0;
  //     const items = listItems.map(value => {
  //         return (<li key={i++}>{value}</li>);
  //       });
  //     return (<ul>{items}</ul>);
  //   }

    // // These event handling callbacks are all optional. To handle changes to the
    //   // list that result from user actions, set a callback as the value the
    //   // `onDragUpdate` option (`onListUpdated` below).

    // onListMoveStart = (index) => {
    //     console.log('START:', index);
    //   }

    //   onListMoved = (index) => {
    //     console.log('MOVE', index);
    //   }

    //   onListMoveComplete = (index) => {
    //     console.log('COMPLETE', index);
    //   }

    //   onListUpdated = (newOrder) => {
    //     console.log('UPDATED');
    //     let items = newOrder.map(index => {
    //       return this.state.items[index];
    //     });
    //     this.setState({ items });
    //   }

  render() {

    //  const listOpts = {
    //   onDragStart: this.onListMoveStart,
    //   onDrag: this.onListMoved,
    //   onDragComplete: this.onListMoveComplete,
    //   onDragUpdate: this.onListUpdated,
    // };

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="App-title">Strategy app</span><span className="version">  v{this.state.version}</span>
        </div>
        <Tabs tabList={tabList} activeTab={this.state.activeTab}
          clickHandler={(e) => this.handleTabClick(e)} />

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

        <div className={this.state.activeTab === 6 ? "dash tabcontent" : "tabhidden"}>
          <Reorder
            // The key of each object in your list to use as the element key
            itemKey='id'
            // Lock horizontal to have a vertical list
            lock='horizontal'
            // The milliseconds to hold an item for before dragging begins
            holdTime='100'
            // The list to display
            list={ [{
                      id: 1,
                      text: 'Strength'
                    }, {
                      id: 2,
                      text: 'Cunning'
                    }, {
                      id: 3,
                      text: 'Agility'
                    }, {
                      id: 4,
                      text: 'Speed'
                    }, {
                      id: 5,
                      text: 'Weight'
                    }, {
                      id: 6,
                      text: 'Wisdom'
                    }, {
                      id: 7,
                      text: 'Senses'
                    }, {
                      id: 8,
                      text: 'Dexterity'
                    }, {
                      id: 9,
                      text: 'Empathy'
                    }]}
            
            // A template to display for each list item
            template={ListItem}
            // Function that is called once a reorder has been performed
            callback={this.callback}
            // Class to be applied to the outer list element
            listClass='my-list'
            // Class to be applied to each list item's wrapper element
            itemClass='list-item'
            // A function to be called if a list item is clicked (before hold time is up)
            itemClicked={this.itemClicked}
            // The item to be selected (adds 'selected' class)
            selected={this.state.selected}
            // The key to compare from the selected item object with each item object
            selectedKey='uuid'
            // Allows reordering to be disabled
            disableReorder={false}/>
        </div>
      </div>
    );
  }
}

            /*<div className="container">
              <DraggableList {...listOpts}>
                {this.renderList()}
              </DraggableList>
            </div>*/