import React, { Component } from 'react';
import './AudioControl.css';

class AudioControl extends Component {

  constructor(props) {
    super(props)

    this.state = {
        playing: false
    }

    this.togglePlay = this.togglePlay.bind(this)
  }

  togglePlay() {
      if(this.state.playing) {
          this.setState({playing: false})
      } else {
          this.setState({playing: true})
      }
  }

  render() {
    return (
      <div className="AudioControl">
        {
            this.state.playing 
                ? <i onClick={this.togglePlay} className="material-icons AudioControl-play">pause</i>
                : <i onClick={this.togglePlay} className="material-icons AudioControl-pause">play_arrow</i>
        }
        
      </div>
    );  
  }
}

export default AudioControl;
