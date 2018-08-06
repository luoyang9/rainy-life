import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { withCookies } from 'react-cookie';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import './ControlPanel.css';
import backgroundsJSON from '../data/backgrounds.json';
import soundsJSON from '../data/sounds.json';

class ControlPanel extends Component {

  constructor(props) {
    super(props)

    const volumes = {}
    const playing = {}
    const loaded = {}
    const cookieVal = {}
    if(soundsJSON.length > 0) {
      if(this.props.sounds) {
        const decodedObj = JSON.parse(atob(decodeURIComponent(this.props.sounds)))
        soundsJSON.forEach(sound => {
          if(decodedObj.hasOwnProperty(sound.title)) {
            volumes[sound.title] = decodedObj[sound.title];
          } else {
            volumes[sound.title] = sound.volume;
          }
          playing[sound.title] = false;
          loaded[sound.title] = false;
        })
      } else {
        soundsJSON.forEach(sound => {
          cookieVal[sound.title] = this.props.cookies.get("Sound " + sound.title)
          volumes[sound.title] =  cookieVal[sound.title] ? cookieVal[sound.title] : sound.volume;
          playing[sound.title] = false;
          loaded[sound.title] = false;
        })
      }
    }

    this.state = {
      backgrounds: backgroundsJSON,
      sounds: soundsJSON,
      volumes: volumes,
      playing: playing,
      loaded: loaded,
      thumbnailHover: "",
      customBackgroundInput: this.props.customBackgroundInput,
      customBackgroundError: ""
    }

    this.volumeChange = this.volumeChange.bind(this);
    this.toggleClip = this.toggleClip.bind(this);
    this.onThumbnailEnter = this.onThumbnailEnter.bind(this);
    this.onThumbnailExit = this.onThumbnailExit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.submitCustomBackground = this.submitCustomBackground.bind(this);
  }

  componentDidMount() {
    if(this.state.sounds.length > 0) {
      if(this.props.sounds) {
        const decodedObj = JSON.parse(atob(decodeURIComponent(this.props.sounds)))
        this.state.sounds.forEach((sound, i) => {
          if(decodedObj.hasOwnProperty(sound.title)) {
            this.toggleClip(i, sound.title, true)
          } 
        })
      } else {
        this.state.sounds.forEach((sound, i) => {
          const cookieVal = this.props.cookies.get("Sound " + sound.title)
          // play sounds from cookies
          if(cookieVal) {
            this.toggleClip(i, sound.title, true)
          }
        })
      }
    }
  }

  toggleClip(i, title, init) {
    const playing = this.state.playing;
    const loaded = this.state.loaded;
    playing[title] = !playing[title];
    if(playing[title] && !init) {
      this.props.cookies.set("Sound " + title, this.state.volumes[title])
    } else if(!init){
      this.props.cookies.remove("Sound " + title)
    }

    if(!loaded[title]) {
      this.props.audioManager.loadClip(this.state.sounds[i], () => {
        const loaded = this.state.loaded;
        loaded[title] = true;
        this.setState({loaded: loaded})
      });
    }
    this.props.audioManager.playPauseClip(title, this.state.volumes[title])
    this.setState({playing: playing})
  }

  volumeChange(title, val) {
    const volumes = this.state.volumes;
    volumes[title] = val / 100;
    this.setState({volumes: volumes});
    this.props.audioManager.setClipVolume(title, this.state.volumes[title])
    if(this.props.cookies.get("Sound " + title)) {
      this.props.cookies.set("Sound " + title, this.state.volumes[title])
    }
  }

  onThumbnailEnter(title) {
    this.setState({thumbnailHover: title})
  }

  onThumbnailExit() {
    this.setState({thumbnailHover: ""})
  }

  onInputChange(evt) {
    this.setState({customBackgroundInput: evt.target.value})
  }

  onInputKeyDown(evt) {
    if(evt.keyCode === 13) {
      this.submitCustomBackground()
    }
  }

  submitCustomBackground() {
    let input = this.state.customBackgroundInput.trim();
    if(input === "") {
      this.setState({customBackgroundError: "please enter a valid direct link to an image (.png, .jpg, .gif)"})
      return
    }
    if(input.substring(0, 4) !== "http") {
      input = "http://" + input;
    }
    input.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
    try {
      new URL(input);
    } catch(e) {
      this.setState({customBackgroundError: "please check your URL's formatting"})
    }
    this.setState({customBackgroundError: ""})
    this.props.setCustomBackground(input)
  }

  render() {
    const className = this.props.className;

    return (
      <div className={"ControlPanel " + className}>
        <Tabs>
          <TabList>
            <Tab>sounds</Tab>
            <Tab>backgrounds</Tab>
          </TabList>
      
          <TabPanel>
            <div className="ControlPanel-scroll">
              {
                this.state.sounds.length > 0 && this.state.sounds.map((sound, i) => {
                  return (
                    <div className="ControlPanel-cell" key={sound.title}>
                      <div className="ControlPanel-thumbnail-container">
                        <img alt={sound.title} src={sound.thumbnailURL} className="ControlPanel-thumbnail" />
                        <div className="ControlPanel-sound-container">
                          <p className="ControlPanel-sound-title">{sound.title}</p>
                          {
                            this.state.playing[sound.title] && !this.state.loaded[sound.title] ? <div className="ControlPanel-sound-load">
                              <div className="ControlPanel-sound-load-block ControlPanel-sound-load-block-1"></div>
                              <div className="ControlPanel-sound-load-block ControlPanel-sound-load-block-2"></div>
                              <div className="ControlPanel-sound-load-block ControlPanel-sound-load-block-3"></div>
                            </div> :
                            <i onClick={() => this.toggleClip(i, sound.title)} className="material-icons ControlPanel-sound-play">
                              { this.state.playing[sound.title] ? "pause" : "play_arrow" }
                            </i>
                          }
                          
                          <Slider className="ControlPanel-sound-slider" value={this.state.volumes[sound.title] * 100} onChange={val => this.volumeChange(sound.title, val)} />
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </TabPanel>
          <TabPanel>
            <div className="ControlPanel-scroll">
              <h5 className="ControlPanel-subheader">custom background</h5>
              <div className="ControlPanel-custom-background">
                <div className="ControlPanel-custom-input">
                  <input type="text" 
                    className="ControlPanel-custom-textbox" 
                    placeholder="enter a direct link to an image here"
                    value={this.state.customBackgroundInput} 
                    onChange={this.onInputChange} 
                    onKeyDown={this.onInputKeyDown}/>
                  <button className="ControlPanel-custom-button" onClick={this.submitCustomBackground}>set</button>
                </div>
                <p className="ControlPanel-custom-error">{this.state.customBackgroundError}</p>
              </div>
              <h5 className="ControlPanel-subheader">presets</h5>
              {
                this.state.backgrounds.length > 0 && this.state.backgrounds.map(background => {
                  return (
                    <div key={background.title} 
                      onMouseEnter={() => this.onThumbnailEnter(background.title)}
                      onMouseLeave={this.onThumbnailExit}
                      className="ControlPanel-cell">
                      <div onClick={() => this.props.changeBackground(background.title)} className="ControlPanel-thumbnail-container">
                        <img alt={background.title} src={background.thumbnailURL} className="ControlPanel-thumbnail" />
                      </div>
                      <p 
                        className={
                          "ControlPanel-thumbnail-title" + (this.state.thumbnailHover === background.title ? " ControlPanel-thumbnail-title-hover" : "")
                        }
                      >{background.title}</p>
                      <a
                        target="_blank"
                        href={background.attributionURL} 
                        className={
                          "ControlPanel-thumbnail-source" + (this.state.thumbnailHover === background.title ? " ControlPanel-thumbnail-source-hover" : "")
                        }
                      >{background.attributionText}</a>
                    </div>
                  )
                })
              }
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );  
  }
}

export default withCookies(ControlPanel);
