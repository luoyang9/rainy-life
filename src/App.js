import React, { Component } from 'react';
import './App.css';

import Background from './components/Background';
import ControlPanel from './components/ControlPanel';
import MusicPanel from './components/MusicPanel';
import AudioControl from './components/AudioControl';
import AudioManager from './AudioManager';
import AboutPanel from './components/AboutPanel';
import SharePanel from './components/SharePanel';

import SoundsStore from './stores/SoundsStore';
import BackgroundsStore from './stores/BackgroundsStore';

// Create AudioManager
const audioManager = new AudioManager();

// Create stores
const params = window.location.search ? window.location.search.substring(1).split('&') : [];
const soundsStore = new SoundsStore(params, audioManager);
const backgroundsStore = new BackgroundsStore(params);

class App extends Component {
  constructor(props) {
    super(props);

    // Check first time visitor
    let firstTimeVisitor = true;
    if (localStorage.getItem('firsttime')) {
      firstTimeVisitor = false;
    } else {
      localStorage.setItem('firsttime', false);
    }

    this.state = {
      controlPanelClass: '',
      musicPanelClass: '',
      aboutPanelClass: firstTimeVisitor ? 'AboutPanel-show' : '',
      sharePanelClass: '',
      settingIconClass: '',
      musicIconClass: ''
    };

    this.toggleSettings = this.toggleSettings.bind(this);
    this.toggleMusic = this.toggleMusic.bind(this);
    this.toggleAbout = this.toggleAbout.bind(this);
    this.toggleShare = this.toggleShare.bind(this);
  }

  toggleSettings() {
    const { controlPanelClass } = this.state;
    if (controlPanelClass) {
      this.setState({ controlPanelClass: '', settingIconClass: '' });
    } else {
      this.setState({
        controlPanelClass: 'ControlPanel-show',
        settingIconClass: 'App-settingsShow'
      });
    }
  }

  toggleMusic() {
    const { musicPanelClass } = this.state;
    if (musicPanelClass) {
      this.setState({ musicPanelClass: '', musicIconClass: '' });
    } else {
      this.setState({ musicPanelClass: 'MusicPanel-show', musicIconClass: 'App-musicShow' });
    }
  }

  toggleAbout() {
    const { aboutPanelClass } = this.state;
    if (aboutPanelClass) {
      this.setState({ aboutPanelClass: '' });
    } else {
      this.setState({ aboutPanelClass: 'AboutPanel-show' });
    }
  }

  toggleShare() {
    const { sharePanelClass } = this.state;
    if (sharePanelClass) {
      this.setState({ sharePanelClass: '' });
    } else {
      this.setState({ sharePanelClass: 'SharePanel-show' });
    }
  }

  render() {
    const {
      settingIconClass,
      musicIconClass,
      sharePanelClass,
      aboutPanelClass,
      musicPanelClass,
      controlPanelClass
    } = this.state;
    return (
      <div className="App">
        <Background backgroundsStore={backgroundsStore} />
        <button type="button" className="App-header" onClick={this.toggleAbout}>
          rainy life
        </button>
        <button type="button" className="material-icons App-share" onClick={this.toggleShare}>
          share
        </button>
        <a href="https://twitter.com/rainydotlife" target="_blank" rel="noopener noreferrer">
          <svg className="App-twitter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              id="twitter"
              fill="white"
              fillOpacity="0.8"
              d="M492 109.5c-17.4 7.7-36 12.9-55.6 15.3 20-12 35.4-31 42.6-53.6-18.7 11.1-39.4 19.2-61.5 23.5C399.8 75.8 374.6 64 346.8 64c-53.5 0-96.8 43.4-96.8 96.9 0 7.6.8 15 2.5 22.1-80.5-4-151.9-42.6-199.6-101.3-8.3 14.3-13.1 31-13.1 48.7 0 33.6 17.2 63.3 43.2 80.7-16-.4-31-4.8-44-12.1v1.2c0 47 33.4 86.1 77.7 95-8.1 2.2-16.7 3.4-25.5 3.4-6.2 0-12.3-.6-18.2-1.8 12.3 38.5 48.1 66.5 90.5 67.3-33.1 26-74.9 41.5-120.3 41.5-7.8 0-15.5-.5-23.1-1.4C62.8 432 113.7 448 168.3 448 346.6 448 444 300.3 444 172.2c0-4.2-.1-8.4-.3-12.5C462.6 146 479 129 492 109.5z"
            />
          </svg>
        </a>
        <button
          type="button"
          className={`material-icons App-settings ${settingIconClass}`}
          onClick={this.toggleSettings}
        >
          settings
        </button>
        <button
          type="button"
          className={`material-icons App-music ${musicIconClass}`}
          onClick={this.toggleMusic}
        >
          library_music
        </button>
        <SharePanel
          className={sharePanelClass}
          backgroundsStore={backgroundsStore}
          soundsStore={soundsStore}
        />
        <AudioControl audioManager={audioManager} />
        <AboutPanel className={aboutPanelClass} toggleAbout={this.toggleAbout} />
        <MusicPanel className={musicPanelClass} soundsStore={soundsStore} />
        <ControlPanel
          className={controlPanelClass}
          soundsStore={soundsStore}
          backgroundsStore={backgroundsStore}
        />
      </div>
    );
  }
}

export default App;
