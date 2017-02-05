import React, { Component } from 'react';
import { Tabs } from './components/Tabs'
import { Panel } from './components/Panel'
import List from './List'
import logo from './logo.svg';
import './App.css';


var tabList = [
    { 'id': 1, 'name': 'Play'},
    { 'id': 2, 'name': 'Custom'},
    { 'id': 3, 'name': 'Room'},
    { 'id': 4, 'name': 'Stats' },
    { 'id': 5, 'name': 'DB2' }
];

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
         activeTab : 1
    }  
  }
  handleKeyPress = (e) => {
    e.preventDefault()
    
    if (e.nativeEvent.keyCode === 13) {
      console.log('This is enter!')
    }
  }
  
  handleClick = (tab) => {
//    console.log("t", tab)
    this.setState ({
      activeTab : tab
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Strategy app<span className="version">  v {this.state.activeTab}</span></h2>
        </div>
        <Tabs tabList={tabList} activeTab={this.state.activeTab} 
                    clickHandler={ (e) => this.handleClick(e)} />

        <div className={this.state.activeTab===1 ? "tabcontent" : "tabhidden"}>
            <Panel >Game point</Panel>
        </div>
        <div  className={this.state.activeTab===2 ? "tabcontent" : "tabhidden"}>
             <List />
        </div>
        <div className={this.state.activeTab===3 ? "tabcontent" : "tabhidden"}>
            <Panel >Details</Panel>
        </div>
         <div className={this.state.activeTab===4 ? "tabcontent" : "tabhidden"}>
            <Panel >Statistics</Panel>
        </div>
        <div className={this.state.activeTab===5 ? "tabcontent" : "tabhidden"}>
           <Panel >Connections</Panel>
        </div>
        
      </div>
    );
  }
}

export default App;
