import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Item from './Item';
import Target from './Target';
import Card from './Card';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
const update = require('immutability-helper');

var newArray = [];
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      language: '',
      counter: 0,
      items: [
        { id: 1, name: 'Item 1' }
      ],

      items2: [],
      cards: [
        {
          id: 1,
          text: 'Write a cool JS library',
        },
        {
          id: 2,
          text: 'Make it generic enough',
        },
        {
          id: 3,
          text: 'Write README',
        },
        {
          id: 4,
          text: 'Create some examples',
        },
        {
          id: 5,
          text:
            'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
        },
        {
          id: 6,
          text: '???',
        },
        {
          id: 7,
          text: 'PROFIT',
        },
      ],
    }
  }

  /*
  deleteItem = id => {
    this.setState(prevState => {
      return {
        items: prevState.items.filter(item => item.id !== id)
      }
    }, () => {
      newArray.push({ id: id, name: `Entry a question` });
      this.setState({ items2: newArray }, () => {
        console.log("items2", this.state.items2);
      });
    })
  }
  */

  deleteItem = (id, itemCounter) => {
      console.log("itemCounter",itemCounter);
      newArray.push({ id: itemCounter, name: `Entry a question` });
      this.setState({ items2: newArray }, () => {
        console.log("items2", this.state.items2);
      });
  }

  //missigen Target.js function to have the response back (Target creates new objecs)
  updateThisCounter = (response) => {
    console.log("updateThisCounter", response)
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
    console.log("cards", cards);

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
                  handleDrop={(id,itemCounter) => this.deleteItem(id,itemCounter)}
                  counter = {this.state.counter}
                  triggerUpdateCounter={this.updateThisCounter} />
              ))}
            </div>
            <div className="canvas-container">
              <Target theItems={this.state.items2}  counter = {this.state.counter} />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
