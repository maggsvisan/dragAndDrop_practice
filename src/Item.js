import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

var itemCounter=0;

const itemSource = {
  beginDrag(props) {
    console.log('dragging');
    return props.item;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    console.log("Is dragged");
    itemCounter= itemCounter + 1;
    
    console.log(itemCounter);

    return props.handleDrop(props.item.id, itemCounter);
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

class Item extends  Component {
  constructor(props){
    super(props);
    this.state = {
      inputField: '',
      counter:0

    }
  }

  handleChange = event => {
    this.setState({ inputField: event.target.value });
  };

  sendToProps = () => {
    this.props.triggerUpdateCounter(this.state.inputField);
    console.log("counterSend", itemCounter);
  }
 
  render() {
    const { isDragging, connectDragSource, item } = this.props;
   // const opacity = isDragging ? 0 : 1;      {/* <div className="item" style={{ opacity }}> */}

    return connectDragSource(
    
      <div className="item">
        <span>{item.name}</span>
        <br />
        <input type="text" onChange={this.handleChange} />
        <button onClick={this.sendToProps}> Save! </button>
      </div>
    );
  }
}



export default DragSource('item', itemSource, collect)(Item);
