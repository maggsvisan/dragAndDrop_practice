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
var targetItems = []; //items dragged into the Target area

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

  addItem = (id, counter) => {
    console.log("se agrega el item:", counter);

    //this gets the items inside the Target Area
    targetItems.push({ id: counter });
    console.log("targetItems", targetItems);
    
    this.setState({ itemTarget: targetItems }, () => {
      this.setState({ counter: itemCounter });
    });
  }

  updateTargetItems = (array, id) => {
    this.setState({ itemTarget: array }, () => {
    
      var theArray = this.state.itemTarget;
      const result = theArray.filter(item => item.id !== id);
      targetItems = targetItems.filter(item => item.id !== id);
      
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
                  handleDrop={(id, itemCounter) => this.addItem(id, itemCounter)}
                  counter={this.state.counter}
                 />
              ))}
            </div>
            <div className="canvas-container">
              <Target 
                counter={this.state.counter}
                deletedItems={this.state.deletedItemsIds}
                updateItems={(itemsArray, id) => this.updateTargetItems(itemsArray, id)}
                targetItems= {targetItems}
              />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
