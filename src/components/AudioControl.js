import React, { Component } from 'react';
import { Howler } from 'howler';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import './AudioControl.css';

class AudioControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      volume: Howler.volume(),
      prevVolume: 0
    };

    this.volumeChange = this.volumeChange.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
  }

  volumeChange(vol) {
    Howler.volume(vol / 100);
    this.setState({ volume: Howler.volume() });
  }

  toggleMute() {
    const { volume, prevVolume } = this.state;
    if (volume !== 0) {
      Howler.volume(0);
      this.setState({ volume: 0, prevVolume: volume });
    } else {
      Howler.volume(prevVolume);
      this.setState({ volume: prevVolume });
    }
  }

  renderVolumeIcon(volume) {
    if (volume > 0.5) {
      return (
        <button
          type="button"
          onClick={this.toggleMute}
          className="material-icons AudioControl-volume"
        >
          volume_up
        </button>
      );
    }
    if (volume > 0) {
      return (
        <button
          type="button"
          style={{ position: 'relative', right: 2 }}
          onClick={this.toggleMute}
          className="material-icons AudioControl-volume"
        >
          volume_down
        </button>
      );
    }
    return (
      <button
        type="button"
        onClick={this.toggleMute}
        className="material-icons AudioControl-volume"
      >
        volume_off
      </button>
    );
  }

  render() {
    const { volume } = this.state;
    return (
      <div className="AudioControl">
        {this.renderVolumeIcon(volume)}
        <Slider className="AudioControl-slider" value={volume * 100} onChange={this.volumeChange} />
      </div>
    );
  }
}

export default AudioControl;
