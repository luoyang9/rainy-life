import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ClipboardJS from 'clipboard';
import './SharePanel.css';

@observer
class SharePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shareURL: ''
    };
    this.generateShareURL = this.generateShareURL.bind(this);
  }

  componentDidMount() {
    /* eslint no-new: "off" */
    new ClipboardJS('#SharePanelURL');
  }

  componentWillReceiveProps(props) {
    this.generateShareURL(props);
  }

  generateShareURL(props) {
    let shareURL = `https://${window.location.host}/?`;
    const urlParams = [];
    const { soundsStore, backgroundsStore } = props;

    if (soundsStore.youtubeVideoID) {
      urlParams.push(`v=${soundsStore.youtubeVideoID}`);
    }

    const soundParam = [];
    for (let i = 0; i < soundsStore.sounds.length; i++) {
      const sound = soundsStore.sounds[i];
      soundParam[sound.id] = sound.playing ? sound.volume : 0;
    }
    urlParams.push(`s=${soundParam.join('s')}`);

    if (backgroundsStore.customBackgroundUrl) {
      urlParams.push(`u=${encodeURIComponent(backgroundsStore.customBackgroundUrl)}`);
    } else if (backgroundsStore.activeBackground !== null) {
      urlParams.push(`b=${backgroundsStore.activeBackground}`);
    }

    shareURL += urlParams.join('&');
    this.setState({ shareURL });
  }

  render() {
    const { className } = this.props;
    const { shareURL } = this.state;

    return (
      <div className={`SharePanel ${className}`}>
        <p id="SharePanelURL" data-clipboard-target="#SharePanelURL">
          {shareURL}
        </p>
      </div>
    );
  }
}

SharePanel.propTypes = {
  className: PropTypes.string.isRequired
};

export default SharePanel;
