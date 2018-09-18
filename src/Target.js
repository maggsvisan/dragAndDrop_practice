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

  componentDidMount () {
    objResponse = objResponse.slice(1);
  }

  updateThisCounter = (response,item) => {
    objResponse.push({text: response});

    this.setState({response: objResponse}, ()=>{
      console.log("repsosneObjRes", this.state.response);
    })

  }

  sendForm = () => {
    console.log("sending form...", this.state.response);
  }

  render() {
    const { connectDropTarget, hovered, item } = this.props;
    const backgroundColor = hovered ? 'lightgreen' : 'white';

    return connectDropTarget(
      <div className="target" style={{ background: backgroundColor }}>
      Form Canvas
         <div>
            <div className="card-container-target">
            {this.props.theItems.map((item, i) => (
              <Item key={item.id} 
                    item={item}
                    triggerUpdateCounter = {(value)=>  this.updateThisCounter(value, item)}
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
