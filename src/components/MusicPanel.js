import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import YouTube from 'react-youtube';
import './MusicPanel.css';

const presetVideos = [
  "3jWRrafhO7M",
  "-eohHwsplvY"
]

@observer
class MusicPanel extends Component {
  constructor(props) {
    super(props)

    const randomPresetVideoID = presetVideos[Math.floor(Math.random() * presetVideos.length)];
    this.state = {
      randomPresetVideoID: randomPresetVideoID,
      youtubeVideoIDInput: this.props.soundsStore.youtubeVideoID 
        ? "https://youtu.be/" + this.props.soundsStore.youtubeVideoID 
        : "https://youtu.be/" + randomPresetVideoID, // play a preset video by default
      youtubeError: "",
      youtubeOptions: {
        playerVars: { // https://developers.google.com/youtube/player_parameters
          autoplay: this.props.soundsStore.youtubeVideoID ? 1 : 0,
          loop: 1,
          playsinline: 1
        }
      }
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.onInputKeyDown = this.onInputKeyDown.bind(this)
    this.submitVideoID = this.submitVideoID.bind(this)
  }

  onInputChange(evt) {
    this.setState({youtubeVideoIDInput: evt.target.value})
  }

  onInputKeyDown(evt) {
    if(evt.keyCode === 13) {
      this.submitVideoID()
    }
  }

  submitVideoID() {
    let input = this.state.youtubeVideoIDInput.trim();
    if(input === "") {
      this.setState({youtubeError: "please enter a youtube video url"})
      return;
    }
    let videoId = "";
    try {
      if(input.includes("youtube.com")) {
        if(input.substring(0, 4) !== "http") {
          input = "http://" + input;
        }
        const parsedURL = new URL(input);
        videoId = parsedURL.searchParams.get("v");
      } else if(input.includes("youtu.be")) {
        if(input.substring(0, 4) !== "http") {
          input = "http://" + input;
        }
        const parsedURL = new URL(input)
        videoId = parsedURL.pathname.substring(1)
      } else {
        this.setState({youtubeError: "please enter a valid youtube video url"})
        return;
      }
    } catch(e) {
      this.setState({youtubeError: "please check your url's formatting"})
      return
    }
    
    let youtubeOptions = this.state.youtubeOptions;
    youtubeOptions.playerVars.autoplay = 1;
    this.setState({youtubeError: "", youtubeOptions: youtubeOptions});
    this.soundsStore.setYoutubeVideoID(videoId);
  }

  render() {
    const className = this.props.className;

    return (
      <div className={"MusicPanel " + className}>
        <Tabs>
          <TabList>
            <Tab>youtube</Tab>
          </TabList>
      
          <TabPanel>
            <div className="MusicPanel-youtube">
              <div className="MusicPanel-YT-input">
                <input type="text" 
                  className="MusicPanel-YT-textbox" 
                  placeholder="enter a youtube video url here" 
                  value={this.state.youtubeVideoIDInput} 
                  onChange={this.onInputChange} 
                  onKeyDown={this.onInputKeyDown}/>
                <button className="MusicPanel-YT-button" onClick={this.submitVideoID}>play</button>
              </div>
              <p className="MusicPanel-YT-error">{this.state.youtubeError}</p>
              <div className="MusicPanel-YT-video-container">
                <YouTube
                  className="MusicPanel-YT-video"
                  videoId={this.props.soundsStore.youtubeVideoID ? this.props.soundsStore.youtubeVideoID : this.state.randomPresetVideoID}
                  opts={this.state.youtubeOptions}
                />
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );  
  }
}

export default MusicPanel;
