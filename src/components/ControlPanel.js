import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import './ControlPanel.css';

@observer
class ControlPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      thumbnailHover: "",
      customBackgroundInput: this.props.backgroundsStore.customBackgroundUrl,
      customBackgroundError: ""
    }
    
    this.onThumbnailEnter = this.onThumbnailEnter.bind(this);
    this.onThumbnailExit = this.onThumbnailExit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.submitCustomBackground = this.submitCustomBackground.bind(this);
  }

  onThumbnailEnter(id) {
    this.setState({thumbnailHover: id})
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
      return
    }
    this.setState({customBackgroundError: ""})
    this.props.backgroundsStore.setCustomBackground(input)
  }

  render() {
    const className = this.props.className;
    const soundsStore = this.props.soundsStore;
    const backgroundsStore = this.props.backgroundsStore;

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
                soundsStore.sounds.length > 0 && soundsStore.sounds.map(sound => {
                  return (
                    <div className="ControlPanel-cell" key={sound.id}>
                      <div className="ControlPanel-thumbnail-container">
                        <img alt={sound.title} src={sound.thumbnailURL} className="ControlPanel-thumbnail" />
                        <div className="ControlPanel-sound-container">
                          <p className="ControlPanel-sound-title">{sound.title}</p>
                          {
                            sound.playing && !sound.loaded 
                              ? <div className="ControlPanel-sound-load">
                                  <div className="ControlPanel-sound-load-block ControlPanel-sound-load-block-1"></div>
                                  <div className="ControlPanel-sound-load-block ControlPanel-sound-load-block-2"></div>
                                  <div className="ControlPanel-sound-load-block ControlPanel-sound-load-block-3"></div>
                                </div> 
                              : <i onClick={() => soundsStore.toggleSound(sound.id)} className="material-icons ControlPanel-sound-play">
                                  { sound.playing ? "pause" : "play_arrow" }
                                </i>
                          }
                          
                          <Slider className="ControlPanel-sound-slider" value={sound.volume * 100} onChange={val => soundsStore.changeVolume(sound.id, val)} />
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
              <h5 className="ControlPanel-subheader" style={{marginTop: 10}}>custom background</h5>
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
                backgroundsStore.backgrounds.length > 0 && backgroundsStore.backgrounds.map(background => {
                  return (
                    <div key={background.id} 
                      onMouseEnter={() => this.onThumbnailEnter(background.id)}
                      onMouseLeave={this.onThumbnailExit}
                      className="ControlPanel-cell">
                      <div onClick={() => backgroundsStore.changeBackground(background.id)} className="ControlPanel-thumbnail-container">
                        <img alt={background.title} src={background.thumbnailURL} className="ControlPanel-thumbnail" />
                      </div>
                      <p 
                        className={
                          "ControlPanel-thumbnail-title" + (this.state.thumbnailHover === background.id ? " ControlPanel-thumbnail-title-hover" : "")
                        }
                      >{background.title}</p>
                      <a
                        target="_blank"
                        href={background.attributionURL} 
                        className={
                          "ControlPanel-thumbnail-source" + (this.state.thumbnailHover === background.id ? " ControlPanel-thumbnail-source-hover" : "")
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
