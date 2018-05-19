import React, { Component } from 'react';
import './App.css';

import Background from './components/Background'
import ControlPanel from './components/ControlPanel'
import AudioManager from './AudioManager'

class App extends Component { 
  
  constructor(props) {
    super(props);

    this.state = {
      backgroundURL: "backgrounds/forest.jpg",
      audioManager: new AudioManager()
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
        <ControlPanel audioManager={this.state.audioManager} changeBackground={this.changeBackground} />
      </div>
    );  
  }
}

export default App;
