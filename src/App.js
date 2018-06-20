import React, { Component } from 'react';
import './App.css';

import Background from './components/Background'
import ControlPanel from './components/ControlPanel'
import AudioControl from './components/AudioControl'
import AudioManager from './AudioManager'

class App extends Component { 
  
  constructor(props) {
    super(props);

    this.state = {
      activeBackground: "Forest",
      audioManager: new AudioManager(),
      controlPanelClass: "",
      settingsClass: ""
    }

    this.changeBackground = this.changeBackground.bind(this)
    this.toggleSettings = this.toggleSettings.bind(this)
  }

  changeBackground(title) {
    this.setState({activeBackground: title});
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
        <Background activeBackground={this.state.activeBackground} />
        <h1 className="App-header">rainy life</h1>
        <AudioControl audioManager={this.state.audioManager} />
        <i onClick={this.toggleSettings} className={"material-icons App-settings " + this.state.settingsClass}>settings</i>
        <ControlPanel className={this.state.controlPanelClass} audioManager={this.state.audioManager} changeBackground={this.changeBackground} />
      </div>
    );  
  }
}

export default App;
