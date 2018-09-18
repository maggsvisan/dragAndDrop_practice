import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const itemSource = {
  beginDrag(props) {
    console.log('dragging');
    return props.item;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    
    return props.handleDrop(props.item.id);
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
    console.log(props);
    this.state = {
      inputField: ''

    }
  }

  handleChange = event => {
    this.setState({ inputField: event.target.value });
  };

  sendToProps = () => {
    this.props.triggerUpdateCounter(this.state.inputField);
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
