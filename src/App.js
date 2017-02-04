import React, { Component } from 'react';
import { Tabs } from './components/Tabs'
import { Panel } from './components/Panel'
import List from './List'
import logo from './logo.svg';
import './App.css';

var tabList = [
    { 'id': 1, 'name': 'Play', 'url': '/play' },
    { 'id': 2, 'name': 'Custom', 'url': '/vustom' },
    { 'id': 3, 'name': 'Room', 'url': '/room' },
    { 'id': 4, 'name': 'Stats', 'url': '/stats' },
    { 'id': 5, 'name': 'DB', 'url': '/db' }
];

var activeTab = 1;



class App extends Component {
  
  handleKeyPress = (e) => {
    e.preventDefault()
    
    if (e.nativeEvent.keyCode === 13) {
      console.log('This is enter!')
    }
  }
  
  handleClick = (e) => {
    console.log(e)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to here
          </h2>
        </div>
        <Tabs tabList={tabList} activeTab={activeTab} 
                    clickHandler={ (e) => this.handleClick(e)} />
        <p className="App-intro">
          status line///?
        </p>
        <div>
            <Panel >ABCD</Panel>
        </div>
        <div>
            <Panel className="tabcontent">DEFG</Panel>
        </div>
        <div>
            <Panel >PORT</Panel>
        </div>
        <div>
            <List />
        </div>
        
      </div>
    );
  }
}

export default App;
