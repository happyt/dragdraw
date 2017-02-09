import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DndCard from 'react-dnd-card';
import { createItem } from './Item';
 
class StrategyList extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      items: [{
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
      }]
    };
  }
 
  moveCard(dragIndex, hoverIndex) {
    const { items } = this.state;
    const dragItem = items[dragIndex];
 
    this.setState(update(this.state, {
      items: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem]
        ]
      }
    }));
  }
 
  render() {
    const { items } = this.state;
 
    return (
      <div>
        <h3 className="white">Strategy list</h3>
        <p  className="white">Drag items into the desired order</p>
        {items.map((item, index) => (
          <DndCard
            key={item.id}
            index={index}
            source={item}
            createItem={createItem}
            moveCard={this.moveCard}
            style={{ 
              marginBottom: '.5em',
              background: "#a8ddfd"
             }}
          />
        ))}
      </div>
    );
  }
}
 
export default DragDropContext(HTML5Backend)(StrategyList);