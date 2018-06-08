import React, { Component } from 'react';
import { Howler } from 'howler';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import './AudioControl.css';

class AudioControl extends Component {

  constructor(props) {
    super(props)

    this.state = {
        playing: false,
        volume: this.props.audioManager.getGlobalVolume()
    }

    this.togglePlay = this.togglePlay.bind(this)
    this.volumeChange = this.volumeChange.bind(this)
  }

  togglePlay() {
      if(this.state.playing) {
          this.setState({playing: false})
          this.props.audioManager.playPauseGlobal(false)
      } else {
          this.setState({playing: true})
          this.props.audioManager.playPauseGlobal(true)
      }
  }

  volumeChange(vol) {
    this.props.audioManager.setGlobalVolume(vol / 100)
    this.setState({volume: this.props.audioManager.getGlobalVolume()})
  }

  render() {
    return (
      <div className="AudioControl">
        {
            this.state.playing 
                ? <i onClick={this.togglePlay} className="material-icons AudioControl-play">pause</i>
                : <i onClick={this.togglePlay} className="material-icons AudioControl-pause">play_arrow</i>
        }
        {
          this.state.volume > 0.5 ? 
            <i className="material-icons AudioControl-volume">volume_up</i>
          : this.state.volume > 0 ?
            <i className="material-icons AudioControl-volume">volume_down</i>
          : <i className="material-icons AudioControl-volume">volume_off</i>
        }
        <Slider className="AudioControl-slider" value={this.state.volume * 100} onChange={this.volumeChange} />
      </div>
    );  
  }
}

export default AudioControl;
