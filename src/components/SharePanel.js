import React, { Component } from 'react';
import ClipboardJS from 'clipboard';
import './SharePanel.css';

class SharePanel extends Component {

  constructor(props) {
    super(props)

    this.state = {
      shareURL: ""
    }
    this.generateShareURL = this.generateShareURL.bind(this)
  }

  componentDidMount() {
    new ClipboardJS("#SharePanelURL")
  }

  componentWillReceiveProps(props) {
    this.generateShareURL(props)
  }

  generateShareURL(props) {
    let shareURL = "https://" + window.location.host + "/?";
    let urlParams = [];

    if(props.youtubeID) {
      urlParams.push("v=" + props.youtubeID)
    }
    
    const soundParam = []
    if(props.playing) {
      for(var id in props.playing) {
        if(props.playing[id]) {
          soundParam[id] = props.volumes[id]
        } else {
          soundParam[id] = 0;
        }
      }
    }
    if(soundParam.length > 0) {
      const soundStr = soundParam.join("s")
      urlParams.push("s=" + soundStr)
    }
    
    if(this.props.url) {
      urlParams.push("u=" + encodeURIComponent(this.props.url));
    } else if(this.props.background !== null) {
      urlParams.push("b=" + this.props.background);
    }

    shareURL += urlParams.join("&")
    this.setState({shareURL: shareURL})
  }

  render() {
    const className = this.props.className;

    return (
      <div className={"SharePanel " + className}>
       <p id="SharePanelURL" data-clipboard-target="#SharePanelURL">{this.state.shareURL}</p>
      </div>
    );  
  }
}

export default SharePanel;
