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
      audioManager: new AudioManager(),
      controlPanelClass: "",
      settingsClass: ""
    }

    this.changeBackground = this.changeBackground.bind(this)
    this.toggleSettings = this.toggleSettings.bind(this)
  }

  changeBackground(backgroundURL) {
    this.setState({backgroundURL: backgroundURL});
  }

  toggleSettings() {
    if(this.state.controlPanelClass) {
      this.setState({controlPanelClass: ""})
      this.setState({settingsClass: ""})
      
    } else {
      this.setState({controlPanelClass: "ControlPanel-show"})
      this.setState({settingsClass: "App-settingsShow"})
    }
  }

  render() {
    return (
      <div className="App">
        <Background backgroundURL={this.state.backgroundURL} />
        <i onClick={this.toggleSettings} className={"material-icons App-settings " + this.state.settingsClass}>settings</i>
        <ControlPanel className={this.state.controlPanelClass} audioManager={this.state.audioManager} changeBackground={this.changeBackground} />
      </div>
    );  
  }
}

export default App;
