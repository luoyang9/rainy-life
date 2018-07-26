import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import './App.css';

import Background from './components/Background'
import ControlPanel from './components/ControlPanel'
import MusicPanel from './components/MusicPanel'
import AudioControl from './components/AudioControl'
import AudioManager from './AudioManager'
import backgroundsJSON from './data/backgrounds.json';


class App extends Component { 
  
  constructor(props) {
    super(props);

    const cookieBackground = this.props.cookies.get('background')
    let preset = false
    for(var i = 0; i < backgroundsJSON.length; i++) {
      if(cookieBackground === backgroundsJSON[i].title) preset = true
    }
    this.state = {
      activeBackground: preset ? cookieBackground : "Forest",
      url: !preset ? cookieBackground : "",
      audioManager: new AudioManager(),
      controlPanelClass: "ControlPanel-show",
      MusicPanelClass: "",
      settingsClass: "App-settingsShow"
    }

    this.changeBackground = this.changeBackground.bind(this)
    this.setCustomBackground = this.setCustomBackground.bind(this)
    this.toggleSettings = this.toggleSettings.bind(this)
    this.toggleMusic = this.toggleMusic.bind(this)
  }

  changeBackground(title) {
    this.setState({activeBackground: title, url: ""});
    this.props.cookies.set('background', title);
  }

  setCustomBackground(url) {
    this.setState({url: url, activeBackground: ""})
    this.props.cookies.set('background', url);
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
        <Background activeBackground={this.state.activeBackground} url={this.state.url} />
        <h1 className="App-header">rainy life</h1>
        <AudioControl audioManager={this.state.audioManager} />
        <i onClick={this.toggleSettings} className={"material-icons App-settings " + this.state.settingsClass}>settings</i>
        <ControlPanel className={this.state.controlPanelClass} 
          audioManager={this.state.audioManager} 
          changeBackground={this.changeBackground}
          setCustomBackground={this.setCustomBackground}
          customBackgroundInput={this.state.url} />
        <i onClick={this.toggleMusic} className="material-icons App-music">library_music</i>
        <MusicPanel className={this.state.MusicPanelClass} />
      </div>
    );  
  }
}

export default withCookies(App);
