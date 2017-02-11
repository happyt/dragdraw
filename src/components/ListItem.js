import React, { Component } from 'react'

export class ListItem extends Component {

  render() {
    console.log(this.props);

    return (
      <div>{this.props.item.text}</div>
    );
  }
}