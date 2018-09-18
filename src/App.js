import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Item from './Item';
import Target from './Target';
import Card from './Card';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
const update = require('immutability-helper');

var itemCounter = 0;
var newArray = [];


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
      deletedItemsIds:'',
      items: [
        { id: 1, name: 'Item 1' }
      ],
      itemTarget: [],
    }
  }

  deleteItem = (id) => {
    itemCounter = this.state.counter;
    itemCounter = itemCounter + 1;

    //this gets the items inside the Target Area
    newArray.push({ id: itemCounter });

    this.setState({ itemTarget: newArray }, () => {
      this.setState({ counter: itemCounter });
    });
  }

  updateThisCounter = (response) => {
    console.log("updateThisCounter", response)
  }

  updateTargetItems = (array, id) => {
    console.log("the array", array);
    this.setState({ itemTarget: array }, () => {
      var theArray = this.state.itemTarget;
      const result = theArray.filter(item => item.id !== id);
      newArray = newArray.filter(item => item.id !== id);
      
      this.setState({ itemTarget: result });
      this.setState({deletedItemsIds:id});
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <div className="app-container">
            <div className="item-container">
              {this.state.items.map((item, index) => (
                <Item key={item.id}
                  item={item}
                  handleDrop={(id, itemCounter) => this.deleteItem(id, itemCounter)}
                  counter={this.state.counter}
                  triggerUpdateCounter={this.updateThisCounter} />
              ))}
            </div>
            <div className="canvas-container">
              <Target theItems={this.state.itemTarget}
                counter={this.state.counter}
                deletedItems={this.state.deletedItemsIds}
                updateItems={(itemsArray, id) => this.updateTargetItems(itemsArray, id)}
              />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
