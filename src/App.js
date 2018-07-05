import React, { Component } from 'react';
import './App.css';

import Background from './components/Background'
import ControlPanel from './components/ControlPanel'
import MusicPanel from './components/MusicPanel'
import AudioControl from './components/AudioControl'
import AudioManager from './AudioManager'

class App extends Component { 
  
  constructor(props) {
    super(props);

    this.state = {
      activeBackground: "Forest",
      audioManager: new AudioManager(),
      controlPanelClass: "",
      MusicPanelClass: "",
      settingsClass: ""
    }

    this.changeBackground = this.changeBackground.bind(this)
    this.toggleSettings = this.toggleSettings.bind(this)
    this.toggleMusic = this.toggleMusic.bind(this)
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

  toggleMusic() {
    if(this.state.MusicPanelClass) {
      this.setState({MusicPanelClass: ""})
    } else {
      this.setState({MusicPanelClass: "MusicPanel-show"})
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
        <i onClick={this.toggleMusic} className="material-icons App-music">library_music</i>
        <MusicPanel className={this.state.MusicPanelClass} />
      </div>
    );  
  }
}

export default App;
