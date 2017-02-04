import React, { Component } from 'react'

export class Tabs extends Component {

  render() {
    console.log(this.props);

    return (
      <ul className="tab">

        {this.props.tabList.map( (tab) => {

          let tabClass= "tablist";
          if (this.props.activeTab === tab.id) tabClass += " active";

          return (
            <li key={tab.id}>
              <a href="#" className={tabClass} 
                    onClick={this.props.clickHandler}>{tab.name}</a>
            </li>
          );
        })}
      </ul>
    );
  }
}