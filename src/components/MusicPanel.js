import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { withCookies } from 'react-cookie';
import YouTube from 'react-youtube';
import './MusicPanel.css';

const presetVideos = [
  "3jWRrafhO7M",
  "-eohHwsplvY"
]

class MusicPanel extends Component {

  constructor(props) {
    super(props)

    const youtubeCookieID = this.props.cookies.get('youTubeVideoID')
    this.state = {
      youTubeVideoID: youtubeCookieID ? youtubeCookieID : presetVideos[Math.floor((Math.random() * presetVideos.length))],
      youTubeVideoIDInput: youtubeCookieID ? "https://youtu.be/" + youtubeCookieID  : "",
      youTubeError: "",
      youTubeOptions: {
        playerVars: { // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
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
    this.setState({youTubeVideoIDInput: evt.target.value})
  }

  onInputKeyDown(evt) {
    if(evt.keyCode === 13) {
      this.submitVideoID()
    }
  }

  submitVideoID() {
    let input = this.state.youTubeVideoIDInput.trim();
    if(input === "") {
      this.setState({youTubeError: "Please enter a YouTube video url"})
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
        this.setState({youTubeError: "Please enter a valid YouTube video url"})
        return;
      }
    } catch(e) {
      this.setState({youTubeError: "Please check your URL's formatting"})
    }
    console.log(videoId)
    let youTubeOptions = this.state.youTubeOptions
    youTubeOptions.playerVars.autoplay = 1
    this.setState({youTubeError: "", youTubeVideoID: videoId, youTubeOptions: youTubeOptions})
    this.props.cookies.set('youTubeVideoID', videoId)
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
            <div className="MusicPanel-YouTube">
              <div className="MusicPanel-YT-input">
                <input type="text" 
                  className="MusicPanel-YT-textbox" 
                  placeholder="YouTube Video URL" 
                  value={this.state.youTubeVideoIDInput} 
                  onChange={this.onInputChange} 
                  onKeyDown={this.onInputKeyDown}/>
                <button className="MusicPanel-YT-button" onClick={this.submitVideoID}>play</button>
              </div>
              <p className="MusicPanel-YT-error">{this.state.youTubeError}</p>
              <div className="MusicPanel-YT-video-container">
                {
                  this.state.youTubeVideoID && <YouTube
                    className="MusicPanel-YT-video"
                    videoId={this.state.youTubeVideoID}
                    opts={this.state.youTubeOptions}
                  />
                }
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );  
  }
}

export default withCookies(MusicPanel);
