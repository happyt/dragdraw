import React, { Component } from 'react';
import { Tabs } from './components/Tabs'
import { Tab } from './components/Tab'
import { Panel } from './components/Panel'
import List from './List'
import logo from './logo.svg';
import './App.css';

var tabList = [
    { 'id': 1, 'name': 'Play', 'url': '/play' },
    { 'id': 2, 'name': 'Custom', 'url': '/vustom' },
    { 'id': 3, 'name': 'Room', 'url': '/room' },
    { 'id': 4, 'name': 'DB', 'url': '/db' }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to here
          </h2>
        </div>
        <Tabs selected={0}>
          {tabList.map(tab =>
            <Tab label={tab.name}>{tab.content}</Tab>)
          }
        </Tabs>
        <p className="App-intro">
          status line///?
        </p>
        <div>
            <Panel >ABCD</Panel>
        </div>
        <div>
            <Panel >ABCD</Panel>
        </div>
        <div>
            <Panel >ABCD</Panel>
        </div>
        <div>
            <List />
        </div>
        
      </div>
    );
  }
}

export default App;
