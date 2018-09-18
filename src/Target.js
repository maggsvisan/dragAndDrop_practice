import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import Item from './Item';
import ItemTarget from './ItemTarget';
import Card from './Card';
const update = require('immutability-helper');

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem(),
  }
}

var objResponse = [{}];

class Target extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cards: [{}],
    response: [{}],
    targetItems :[{}]
    }
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state
    const dragCard = cards[dragIndex]

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
    )
   
  }

  componentDidMount (props) {
    objResponse = objResponse.slice(1);
  }

  updateThisCounter = (id,input) => {
    
    console.log("id", id);
    console.log("inout",input)

    objResponse.push({id:id, text: input});
    console.log("objResponse", objResponse);
    
    this.setState({response: objResponse}, ()=>{
      console.log("repsosneObjRes", this.state.response);
    })

  }

  sendForm = () => {
    console.log("sending form...", this.state.response);
    console.log("the items", this.props.theItems);
  }

  removeItemTarget = (id) => {
    console.log("now in tARGET",id);
    console.log("this.props.theItems", this.props.theItems);
    var deleteItem = this.state.response;

    const result = deleteItem.filter(item => item.id !== id);
    console.log("reusltFulter", result);

    this.props.updateItems(result,id);
  }
  

  render() {
    const { connectDropTarget, hovered, item } = this.props;
    const backgroundColor = hovered ? 'lightgreen' : 'white';

    return connectDropTarget(
      <div className="target" style={{ background: backgroundColor }}>
      Form Canvas
         <div className="align-div">
            <div className="card-container-target align-div">
            {this.props.theItems.map((item, i) => (
              <ItemTarget key={item.id} 
                    item={item}
                    draggable="true"
                    removeItem={(value)=>  this.removeItemTarget(value)}
                    triggerUpdateCounter = {(id,input)=>  this.updateThisCounter(id,input)}
              />
            ))}
          </div>
          <button type="button" onClick={this.sendForm} > Save Form </button>
        </div>
      </div>
    );
  }
}

export default DropTarget('item', {}, collect)(Target);
