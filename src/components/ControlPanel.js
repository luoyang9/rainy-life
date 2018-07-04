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
    if(soundsJSON.length > 0) {
      soundsJSON.forEach(sound => {
        volumes[sound.title] = 0.5;
        playing[sound.title] = false;
      })
    }

    this.state = {
      backgrounds: backgroundsJSON,
      sounds: soundsJSON,
      volumes: volumes,
      playing: playing,
      thumbnailHover: ""
    }

    this.props.audioManager.loadClips(this.state.sounds);
    
    this.volumeChange = this.volumeChange.bind(this);
    this.toggleClip = this.toggleClip.bind(this);
    this.onThumbnailEnter = this.onThumbnailEnter.bind(this);
    this.onThumbnailExit = this.onThumbnailExit.bind(this);
  }

  toggleClip(title) {
    this.props.audioManager.playPauseClip(title, this.state.volumes[title])
    const playing = this.state.playing;
    playing[title] = !playing[title]
    this.setState({playing: playing})
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
                this.state.sounds.length > 0 && this.state.sounds.map(sound => {
                  return (
                    <div className="ControlPanel-cell" key={sound.title}>
                      <div className="ControlPanel-thumbnail-container">
                        <img alt={sound.title} src={sound.thumbnailURL} className="ControlPanel-thumbnail" />
                        <div className="ControlPanel-sound-container">
                          <p className="ControlPanel-sound-title">{sound.title}</p>
                          <i onClick={() => this.toggleClip(sound.title)} className="material-icons ControlPanel-sound-play">
                            { this.state.playing[sound.title] ? "pause" : "play_arrow" }
                          </i>
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
