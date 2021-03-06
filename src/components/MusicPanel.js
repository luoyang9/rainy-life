import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import YouTube from 'react-youtube';
import './MusicPanel.css';

const presetVideos = ['3jWRrafhO7M', '-eohHwsplvY'];

@observer
class MusicPanel extends Component {
  constructor(props) {
    super(props);

    const { soundsStore } = this.props;
    const randomPresetVideoID = presetVideos[Math.floor(Math.random() * presetVideos.length)];
    this.state = {
      randomPresetVideoID,
      youtubeVideoIDInput: soundsStore.youtubeVideoID
        ? `https://youtu.be/${soundsStore.youtubeVideoID}`
        : `https://youtu.be/${randomPresetVideoID}`, // play a preset video by default
      youtubeError: '',
      youtubeOptions: {
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          loop: 1,
          playsinline: 1
        }
      }
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.submitVideoID = this.submitVideoID.bind(this);
  }

  onInputChange(evt) {
    this.setState({ youtubeVideoIDInput: evt.target.value });
  }

  onInputKeyDown(evt) {
    if (evt.keyCode === 13) {
      this.submitVideoID();
    }
  }

  submitVideoID() {
    const { youtubeVideoIDInput, youtubeOptions } = this.state;
    const { soundsStore } = this.props;
    let input = youtubeVideoIDInput.trim();
    if (input === '') {
      this.setState({ youtubeError: 'please enter a youtube video url' });
      return;
    }
    let videoId = '';
    try {
      if (input.includes('youtube.com')) {
        if (input.substring(0, 4) !== 'http') {
          input = `http://${input}`;
        }
        const parsedURL = new URL(input);
        videoId = parsedURL.searchParams.get('v');
      } else if (input.includes('youtu.be')) {
        if (input.substring(0, 4) !== 'http') {
          input = `http://${input}`;
        }
        const parsedURL = new URL(input);
        videoId = parsedURL.pathname.substring(1);
      } else {
        this.setState({ youtubeError: 'please enter a valid youtube video url' });
        return;
      }
    } catch (e) {
      this.setState({ youtubeError: "please check your url's formatting" });
      return;
    }

    youtubeOptions.playerVars.autoplay = 1;
    this.setState({ youtubeError: '', youtubeOptions });
    soundsStore.setYoutubeVideoID(videoId);
  }

  render() {
    const { className, soundsStore } = this.props;
    const { youtubeVideoIDInput, youtubeError, randomPresetVideoID, youtubeOptions } = this.state;

    return (
      <div className={`MusicPanel ${className}`}>
        <Tabs>
          <TabList>
            <Tab>youtube</Tab>
          </TabList>

          <TabPanel>
            <div className="MusicPanel-youtube">
              <div className="MusicPanel-YT-input">
                <input
                  type="text"
                  className="MusicPanel-YT-textbox"
                  placeholder="enter a youtube video url here"
                  value={youtubeVideoIDInput}
                  onChange={this.onInputChange}
                  onKeyDown={this.onInputKeyDown}
                />
                <button type="button" className="MusicPanel-YT-button" onClick={this.submitVideoID}>
                  play
                </button>
              </div>
              <p className="MusicPanel-YT-error">{youtubeError}</p>
              <div className="MusicPanel-YT-video-container">
                <YouTube
                  className="MusicPanel-YT-video"
                  videoId={
                    soundsStore.youtubeVideoID ? soundsStore.youtubeVideoID : randomPresetVideoID
                  }
                  opts={youtubeOptions}
                />
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

MusicPanel.propTypes = {
  className: PropTypes.string.isRequired,
  soundsStore: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default MusicPanel;
