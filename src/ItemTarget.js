import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

var itemCounter=0;
var itemList =[];

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

  
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

class ItemTarget extends  Component {
  constructor(props){
    super(props);
    this.state = {
      inputField: '',
      counter:0,
      isButtonDisabled: false

    }
  }

  componentDidMount (props) {
    itemList = itemList.slice(1);
  }

  handleChange = event => {
    this.setState({ inputField: event.target.value });
  };

  deleteItem = (props) =>{
    console.log("ITEM REMOVE",this.props.item.id);
    console.log("this.state.inputField",this.state.inputField);
    this.props.removeItem(this.props.item.id);
    //this.props.removeItem(props.item.id);
  }

  sendToProps = () => {
    if (this.state.inputField === null || this.state.inputField ===''){
      alert("Please enter a value");
    } 

    else{
      itemList.push({id:this.props.item.id, text:this.state.inputField });
    
      this.props.triggerUpdateTarget(this.props.item.id,this.state.inputField );
      
  
      this.setState({
        isButtonDisabled: true
      });
    }
    
  }
 
  render() {
    const { isDragging, connectDragSource, item } = this.props;
   // const opacity = isDragging ? 0 : 1;      {/* <div className="item" style={{ opacity }}> */}

    return connectDragSource(
      <div className="item">
     
      <div className="second">  
        <input type="text" onChange={this.handleChange} className="inputText" />
        <button onClick={this.sendToProps} disabled={this.state.isButtonDisabled}> Save! </button>
        <button onClick={this.deleteItem} > Remove </button>
       </div> 
      </div>
    );
  }
}



export default DragSource('item', itemSource, collect)(ItemTarget);
