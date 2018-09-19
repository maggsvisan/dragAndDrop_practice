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

  componentDidMount (props) {
    objResponse = objResponse.slice(1);
    
  }

  updateTargetItems = (id,input) => {
    console.log("ENTRAAAAAAAAA", id);
    console.log("targetItems", this.props.targetItems);
    console.log("props", this.state.response);
    console.log("id", id);
    console.log("inout",input)
     
    console.log("the props deletedItems",this.props.deletedItems);

    //antes de darle push a uno nueo debe de ver que no tenga en el array el/los ids que ya se borrraron
    //objResponse = objResponse.filter(item => item.id !== id);
    objResponse.push({id:id, text: input});
    
    //console.log("something added", objResponse);
    
    this.setState({response: objResponse}, ()=>{
      console.log("repsosneObjRes", this.state.response);
    })

  }

  sendForm = () => {
    //fetch to post data

    console.log("sending form...", this.state.response);
    alert("Reload!");
    //window.location.reload()
    //console.log("the items", this.props.theItems);
  }

  removeItemTarget = (id) => {
    console.log("now in tARGET",id);
    console.log("this.props.theItems", this.props.theItems);
    var deleteItem = this.state.response;

    const result = deleteItem.filter(item => item.id !== id);
    console.log("reusltFulter", result);
    this.setState({response:result})
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
            {this.props.targetItems.map((item, i) => (
              <ItemTarget key={item.id} 
                    item={item}
                    draggable="true"
                    removeItem={(value)=>  this.removeItemTarget(value)}
                    triggerUpdateTarget = {(id,input)=>  this.updateTargetItems(id,input)}
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
