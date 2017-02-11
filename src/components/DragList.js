import DraggableList from './DraggableList';

const Example = React.createClass({

  getInitialState() {
    return {
      items: [
        'AAAAAA',
        'BBBBBB',
        'CCCCCC'
      ]
    };
  },

  render() {
    // Define the options for the DraggableList.
    const listOpts = {
      onDragStart: this.onListMoveStart,
      onDrag: this.onListMoved,
      onDragComplete: this.onListMoveComplete,
      onDragUpdate: this.onListUpdated,
    };

    // Wrap the DraggableList around a list of items, in this case a `<ul>`.
    return (
      <div className="container">
        <DraggableList {...listOpts}>
          {this.renderList()}
        </DraggableList>
      </div>
    );
  },

  renderList() {
    const items = this.state.map(value => {
      return (<li>{value}</li>);
    });
    return (<ul>{items}</ul>);
  },

  // These event handling callbacks are all optional. To handle changes to the
  // list that result from user actions, set a callback as the value the
  // `onDragUpdate` option (`onListUpdated` below).
  onListMoveStart(index) {
    console.log('START:', index);
  },

  onListMoved(index) {
    console.log('MOVE', index);
  },

  onListMoveComplete(index) {
    console.log('COMPLETE', index);
  },

  onListUpdated(newOrder) {
    console.log('UPDATED');
    let items = newOrder.map(index => {
      return this.state.items[index];
    });
    this.setState({ items });
  }
});