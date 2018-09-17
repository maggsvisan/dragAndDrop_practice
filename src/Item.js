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
    this.state = {
      inputField: ''

    }
  }

  handleChange = event => {
    this.setState({ inputField: event.target.value }, () => {
      console.log(this.state.inputField);
    });
  };

  sendToProps = () => {
    console.log("Click!")
    //var newInput = this.state.inputField;
    this.props.triggerUpdateCounter(this.state.inputField);
    console.log("newInput", this.state.inputField);
  }
 
  render() {
    const { isDragging, connectDragSource, item } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      <div className="item" style={{ opacity }}>
        <span>{item.name}</span>
        <br />
        <input type="text" onChange={this.handleChange} />
        <button onClick={this.sendToProps}> Save! </button>
      </div>
    );
  }
}



export default DragSource('item', itemSource, collect)(Item);
