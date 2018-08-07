import React, { Component } from 'react';
import './App.css';

import Background from './components/Background'
import ControlPanel from './components/ControlPanel'
import MusicPanel from './components/MusicPanel'
import AudioControl from './components/AudioControl'
import AudioManager from './AudioManager'
import backgroundsJSON from './data/backgrounds.json';
import AboutPanel from './components/AboutPanel';
import SharePanel from './components/SharePanel';


class App extends Component { 
  
  constructor(props) {
    super(props);

    // parse local storage
    const localBackground = localStorage.getItem('background')
    let firstTime = true;
    let preset = false
    for(var i = 0; i < backgroundsJSON.length; i++) {
      if(localBackground === backgroundsJSON[i].id) preset = true
    }
    if(localStorage.getItem("firsttime")) {
      firstTime = false;
    } else {
      localStorage.setItem("firsttime", false)
    }

    // parse url params
    const params = window.location.search ? window.location.search.substring(1).split("&") : []
    let youtubeUrlID = ""
    let background = ""
    let backgroundUrl = ""
    let soundsUrlParam = ""
    params.forEach(param => {
      const keyVal = param.split("=")
      if(keyVal[0] === "v") {
        youtubeUrlID = keyVal[1]
      } else if(keyVal[0] === "b") {
        background = keyVal[1]
      } else if(keyVal[0] === "u") {
        backgroundUrl = decodeURIComponent(keyVal[1])
      } else if(keyVal[0] === "s") {
        soundsUrlParam = keyVal[1]
      }
    })

    this.state = {
      activeBackground: background ? parseInt(background, 10) : ((!backgroundUrl && preset) ? localBackground : 0),
      url: backgroundUrl ? backgroundUrl : ((!background && !preset) ? localBackground : ""),
      audioManager: new AudioManager(),
      controlPanelClass: "",
      MusicPanelClass: "",
      settingsClass: "",
      musicClass: "",
      aboutPanelClass: firstTime ? "AboutPanel-show" : "",
      sharePanelClass: "",
      youtubeUrlID: youtubeUrlID,
      soundsUrlParam: soundsUrlParam,
      volumes: {},
      playing: {},
      youtubeID: ""
    }

    this.changeBackground = this.changeBackground.bind(this)
    this.setCustomBackground = this.setCustomBackground.bind(this)
    this.toggleSettings = this.toggleSettings.bind(this)
    this.toggleMusic = this.toggleMusic.bind(this)
    this.toggleAbout = this.toggleAbout.bind(this)
    this.toggleShare = this.toggleShare.bind(this)
  }

  changeBackground(id) {
    this.setState({activeBackground: id, url: ""});
    localStorage.setItem('background', id);
  }

  setCustomBackground(url) {
    this.setState({url: url, activeBackground: ""})
    localStorage.setItem('background', url);
  }

  toggleSettings() {
    if(this.state.controlPanelClass) {
      this.setState({controlPanelClass: "", settingsClass: ""})
      
    } else {
      this.setState({controlPanelClass: "ControlPanel-show", settingsClass: "App-settingsShow"})
    }
  }

  toggleMusic() {
    if(this.state.MusicPanelClass) {
      this.setState({MusicPanelClass: "", musicClass: ""})
    } else {
      this.setState({MusicPanelClass: "MusicPanel-show", musicClass: "App-musicShow"})
    }
  }

  toggleAbout() {
    if(this.state.aboutPanelClass) {
      this.setState({aboutPanelClass: ""})
    } else {
      this.setState({aboutPanelClass: "AboutPanel-show"})
    }
  }

  toggleShare() {
    if(this.state.sharePanelClass) {
      this.setState({sharePanelClass: ""})
    } else {
      this.setState({sharePanelClass: "SharePanel-show"})
    }
  }

  render() {
    return (
      <div className="App">
        <Background activeBackground={this.state.activeBackground} url={this.state.url} />
        <h1 onClick={this.toggleAbout} className="App-header">rainy life</h1>
        <i onClick={this.toggleShare} className="material-icons App-share">share</i>
        <a href="https://twitter.com/rainydotlife" target="_blank" rel="noopener noreferrer">
          <svg className="App-twitter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path id="twitter" fill="white" fillOpacity="0.8" d="M492 109.5c-17.4 7.7-36 12.9-55.6 15.3 20-12 35.4-31 42.6-53.6-18.7 11.1-39.4 19.2-61.5 23.5C399.8 75.8 374.6 64 346.8 64c-53.5 0-96.8 43.4-96.8 96.9 0 7.6.8 15 2.5 22.1-80.5-4-151.9-42.6-199.6-101.3-8.3 14.3-13.1 31-13.1 48.7 0 33.6 17.2 63.3 43.2 80.7-16-.4-31-4.8-44-12.1v1.2c0 47 33.4 86.1 77.7 95-8.1 2.2-16.7 3.4-25.5 3.4-6.2 0-12.3-.6-18.2-1.8 12.3 38.5 48.1 66.5 90.5 67.3-33.1 26-74.9 41.5-120.3 41.5-7.8 0-15.5-.5-23.1-1.4C62.8 432 113.7 448 168.3 448 346.6 448 444 300.3 444 172.2c0-4.2-.1-8.4-.3-12.5C462.6 146 479 129 492 109.5z"/></svg>
        </a>
        <SharePanel className={this.state.sharePanelClass} 
          volumes={this.state.volumes} 
          playing={this.state.playing}
          youtubeID={this.state.youtubeID}
          background={this.state.activeBackground}
          url={this.state.url} />
        <AudioControl audioManager={this.state.audioManager} />
        <AboutPanel className={this.state.aboutPanelClass} 
          toggleAbout={this.toggleAbout} />
        <i onClick={this.toggleSettings} className={"material-icons App-settings " + this.state.settingsClass}>settings</i>
        <MusicPanel className={this.state.MusicPanelClass} 
          setYoutubeId={id => this.setState({youtubeID: id})}
          youtubeUrlID={this.state.youtubeUrlID} />
        <ControlPanel className={this.state.controlPanelClass} 
          audioManager={this.state.audioManager} 
          changeBackground={this.changeBackground}
          setVolumes={volumes => this.setState({volumes: volumes})}
          setPlaying={playing => this.setState({playing: playing})}
          setCustomBackground={this.setCustomBackground}
          customBackgroundInput={this.state.url}
          soundsUrlParam={this.state.soundsUrlParam} />
        <i onClick={this.toggleMusic} className={"material-icons App-music " + this.state.musicClass}>library_music</i>
      </div>
    );  
  }
}

export default App;
