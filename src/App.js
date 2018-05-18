import React, { Component } from 'react';
import './App.css';

import Background from './components/Background'
import ControlPanel from './components/ControlPanel'

class App extends Component { 
  
  constructor(props) {
    super(props);

    this.state = {
      backgroundURL: "backgrounds/forest.jpg"
    }

    this.changeBackground = this.changeBackground.bind(this)
  }

  changeBackground(backgroundURL) {
    this.setState({backgroundURL: backgroundURL});
  }

  render() {
    return (
      <div className="App">
        <Background backgroundURL={this.state.backgroundURL} />
        <ControlPanel changeBackground={this.changeBackground} />
      </div>
    );  
  }
}

export default App;
