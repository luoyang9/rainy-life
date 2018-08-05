import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import './App.css';

import Background from './components/Background'
import ControlPanel from './components/ControlPanel'
import MusicPanel from './components/MusicPanel'
import AudioControl from './components/AudioControl'
import AudioManager from './AudioManager'
import backgroundsJSON from './data/backgrounds.json';
import AboutPanel from './components/AboutPanel';


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
      controlPanelClass: "",
      MusicPanelClass: "",
      settingsClass: "",
      aboutPanelClass: "AboutPanel-show"
    }

    this.changeBackground = this.changeBackground.bind(this)
    this.setCustomBackground = this.setCustomBackground.bind(this)
    this.toggleSettings = this.toggleSettings.bind(this)
    this.toggleMusic = this.toggleMusic.bind(this)
    this.toggleAbout = this.toggleAbout.bind(this)
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

  toggleAbout() {
    if(this.state.aboutPanelClass) {
      this.setState({aboutPanelClass: ""})
    } else {
      this.setState({aboutPanelClass: "AboutPanel-show"})
    }
  }

  render() {
    return (
      <div className="App">
        <Background activeBackground={this.state.activeBackground} url={this.state.url} />
        <h1 onClick={this.toggleAbout} className="App-header">rainy life</h1>
        <a href="https://twitter.com/rainydotlife" target="_blank" rel="noopener noreferrer">
          <svg className="App-twitter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path id="twitter" fill="white" fillOpacity="0.8" d="M492 109.5c-17.4 7.7-36 12.9-55.6 15.3 20-12 35.4-31 42.6-53.6-18.7 11.1-39.4 19.2-61.5 23.5C399.8 75.8 374.6 64 346.8 64c-53.5 0-96.8 43.4-96.8 96.9 0 7.6.8 15 2.5 22.1-80.5-4-151.9-42.6-199.6-101.3-8.3 14.3-13.1 31-13.1 48.7 0 33.6 17.2 63.3 43.2 80.7-16-.4-31-4.8-44-12.1v1.2c0 47 33.4 86.1 77.7 95-8.1 2.2-16.7 3.4-25.5 3.4-6.2 0-12.3-.6-18.2-1.8 12.3 38.5 48.1 66.5 90.5 67.3-33.1 26-74.9 41.5-120.3 41.5-7.8 0-15.5-.5-23.1-1.4C62.8 432 113.7 448 168.3 448 346.6 448 444 300.3 444 172.2c0-4.2-.1-8.4-.3-12.5C462.6 146 479 129 492 109.5z"/></svg>
        </a>
        <AudioControl audioManager={this.state.audioManager} />
        <AboutPanel className={this.state.aboutPanelClass} 
          toggleAbout={this.toggleAbout} />
        <i onClick={this.toggleSettings} className={"material-icons App-settings " + this.state.settingsClass}>settings</i>
        <MusicPanel className={this.state.MusicPanelClass} />
        <ControlPanel className={this.state.controlPanelClass} 
          audioManager={this.state.audioManager} 
          changeBackground={this.changeBackground}
          setCustomBackground={this.setCustomBackground}
          customBackgroundInput={this.state.url} />
        <i onClick={this.toggleMusic} className="material-icons App-music">library_music</i>
      </div>
    );  
  }
}

export default withCookies(App);
