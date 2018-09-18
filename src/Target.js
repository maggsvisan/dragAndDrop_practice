import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import Item from './Item';
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
  state = {
    cards: [{}],
    response: [{}]
  
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

  updateThisCounter = (response,item) => {
    console.log("this is the Target", response);
    console.log("item", item)
    console.log(this.props.theItems); 
    console.log("LENGTH", Object.keys(objResponse).length-1)

    this.setState({response: objResponse}, ()=>{
      console.log("repsosneObjRes", this.state.response);
    })

    console.log("counter", this.props.counter)
   }

  render() {
    const { connectDropTarget, hovered, item } = this.props;
    const backgroundColor = hovered ? 'lightgreen' : 'white';

    return connectDropTarget(
      <div className="target" style={{ background: backgroundColor }}>
      Form Canvas
         <div>
            {/*  esta es la parte que funciona, falta darle diseño
              {this.props.theItems.map((item, index) => (
                <p key={item.id}> {item.name} </p>
              ))}
            */}
            <div className="card-container-target">
            {this.props.theItems.map((item, i) => (
              <Item key={item.id} 
                    item={item}
                    triggerUpdateCounter = {(value)=>  this.updateThisCounter(value, item)}
              />
            ))}
          </div>
          <button type="button"> Save </button>
        </div>
      </div>
    );
  }
}

export default DropTarget('item', {}, collect)(Target);
