import React, { Component } from 'react';
import { Howler } from 'howler';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import './AudioControl.css';

class AudioControl extends Component {

  constructor(props) {
    super(props)

    this.state = {
        volume: this.props.audioManager.getGlobalVolume(),
        prevVolume: 0
    }

    this.volumeChange = this.volumeChange.bind(this)
    this.toggleMute = this.toggleMute.bind(this)
  }

  volumeChange(vol) {
    this.props.audioManager.setGlobalVolume(vol / 100)
    this.setState({volume: this.props.audioManager.getGlobalVolume()})
  }

  toggleMute() {
    if(this.state.volume != 0) {
      this.setState({volume: 0, prevVolume: this.state.volume})
    } else {
      this.setState({volume: this.state.prevVolume})
    }
  }

  render() {
    return (
      <div className="AudioControl">
        {
          this.state.volume > 0.5 ? 
            <i onClick={this.toggleMute} className="material-icons AudioControl-volume">volume_up</i>
          : this.state.volume > 0 ?
            <i onClick={this.toggleMute} className="material-icons AudioControl-volume">volume_down</i>
          : <i onClick={this.toggleMute} className="material-icons AudioControl-volume">volume_off</i>
        }
        <Slider className="AudioControl-slider" value={this.state.volume * 100} onChange={this.volumeChange} />
      </div>
    );  
  }
}

export default AudioControl;
