import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
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
    const loading = {}
    if(soundsJSON.length > 0) {
      soundsJSON.forEach(sound => {
        volumes[sound.title] = sound.volume;
        playing[sound.title] = false;
        loading[sound.title] = false;
      })
    }

    this.state = {
      backgrounds: backgroundsJSON,
      sounds: soundsJSON,
      volumes: volumes,
      playing: playing,
      loading: loading,
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

  toggleClip(i, title) {
    const playing = this.state.playing;
    playing[title] = !playing[title];
    
    if(playing[title]) {
      const loading = this.state.loading;
      loading[title] = true;
      this.props.audioManager.loadClip(this.state.sounds[i], () => {
        const loading = this.state.loading;
        loading[title] = false;
        this.setState({loading: loading})
      });
      this.setState({playing: playing, loading: loading})
    } else {
      this.setState({playing: playing})
    }
    this.props.audioManager.playPauseClip(title, this.state.volumes[title])
  }

  volumeChange(title, val) {
    const volumes = this.state.volumes;
    volumes[title] = val / 100;
    this.setState({volumes: volumes});
    this.props.audioManager.setClipVolume(title, this.state.volumes[title])
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
      this.setState({customBackgroundError: "Please enter a valid direct link to an image (.png, .jpg, .gif)"})
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
      this.setState({customBackgroundError: "Please check your URL's formatting"})
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
            <Tab>Sounds</Tab>
            <Tab>Background</Tab>
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
                            this.state.loading[sound.title] ? <div class="ControlPanel-sound-load">
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
              <h5>Custom Background</h5>
              <div className="ControlPanel-custom-background">
                <div className="ControlPanel-custom-input">
                  <input type="text" 
                    className="ControlPanel-custom-textbox" 
                    placeholder="Enter a direct link to an image here"
                    value={this.state.customBackgroundInput} 
                    onChange={this.onInputChange} 
                    onKeyDown={this.onInputKeyDown}/>
                  <button className="ControlPanel-custom-button" onClick={this.submitCustomBackground}>Set Background</button>
                </div>
                <p className="ControlPanel-custom-error">{this.state.customBackgroundError}</p>
              </div>
              <h5>Preset Backgrounds</h5>
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

export default ControlPanel;
