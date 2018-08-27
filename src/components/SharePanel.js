import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ClipboardJS from 'clipboard';
import './SharePanel.css';

@observer
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
    let soundsStore = props.soundsStore;
    let backgroundsStore = props.backgroundsStore;

    if (soundsStore.youtubeVideoID) {
      urlParams.push("v=" + soundsStore.youtubeVideoID)
    }

    const soundParam = []
    for (let i = 0; i < soundsStore.sounds.length; i++) {
      const sound = soundsStore.sounds[i];
      soundParam[sound.id] = sound.playing ? sound.volume : 0;
    }
    urlParams.push("s=" + soundParam.join("s"))

    if (backgroundsStore.customBackgroundUrl) {
      urlParams.push("u=" + encodeURIComponent(backgroundsStore.customBackgroundUrl));
    } else if (backgroundsStore.activeBackground !== null) {
      urlParams.push("b=" + backgroundsStore.activeBackground);
    }

    shareURL += urlParams.join("&")
    this.setState({ shareURL: shareURL })
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
