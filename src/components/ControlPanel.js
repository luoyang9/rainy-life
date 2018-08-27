import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import './ControlPanel.css';

@observer
class ControlPanel extends Component {
  constructor(props) {
    super(props);

    const { backgroundsStore } = this.props;
    const customBackgroundInput = backgroundsStore.customBackgroundUrl
      ? backgroundsStore.customBackgroundUrl
      : '';

    this.state = {
      thumbnailHover: '',
      customBackgroundInput,
      customBackgroundError: ''
    };

    this.onThumbnailEnter = this.onThumbnailEnter.bind(this);
    this.onThumbnailExit = this.onThumbnailExit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.submitCustomBackground = this.submitCustomBackground.bind(this);
  }

  onThumbnailEnter(id) {
    this.setState({ thumbnailHover: id });
  }

  onThumbnailExit() {
    this.setState({ thumbnailHover: '' });
  }

  onInputChange(evt) {
    this.setState({ customBackgroundInput: evt.target.value });
  }

  onInputKeyDown(evt) {
    if (evt.keyCode === 13) {
      this.submitCustomBackground();
    }
  }

  submitCustomBackground() {
    const { backgroundsStore } = this.props;
    const { customBackgroundInput } = this.state;
    let input = customBackgroundInput.trim();
    if (input === '') {
      this.setState({
        customBackgroundError: 'please enter a valid direct link to an image (.png, .jpg, .gif)'
      });
      return;
    }
    if (input.substring(0, 4) !== 'http') {
      input = `http://${input}`;
    }
    input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&quot;')
      .replace(/'/g, '&#039;');
    try {
      /* eslint no-new: "off" */
      new URL(input);
    } catch (e) {
      this.setState({
        customBackgroundError: `please check your URL's formatting`
      });
      return;
    }
    this.setState({
      customBackgroundError: ''
    });
    backgroundsStore.setCustomBackground(input);
  }

  renderSoundIcon(sound) {
    const { soundsStore } = this.props;
    if (sound.playing && !sound.loaded) {
      return (
        <div className="ControlPanel-sound-load">
          <div className="ControlPanel-sound-load-block ControlPanel-sound-load-block-1" />
          <div className="ControlPanel-sound-load-block ControlPanel-sound-load-block-2" />
          <div className="ControlPanel-sound-load-block ControlPanel-sound-load-block-3" />
        </div>
      );
    }
    return (
      <button
        type="button"
        onClick={() => soundsStore.toggleSound(sound.id)}
        className="material-icons ControlPanel-sound-play"
      >
        {sound.playing ? 'pause' : 'play_arrow'}
      </button>
    );
  }

  renderSounds() {
    const { soundsStore } = this.props;

    if (soundsStore.sounds.length > 0) {
      return soundsStore.sounds.map(sound => (
        <div className="ControlPanel-cell" key={sound.id}>
          <div className="ControlPanel-thumbnail-container">
            <img alt={sound.title} src={sound.thumbnailURL} className="ControlPanel-thumbnail" />
            <div className="ControlPanel-sound-container">
              <p className="ControlPanel-sound-title">{sound.title}</p>
              {this.renderSoundIcon(sound)}
              <Slider
                className="ControlPanel-sound-slider"
                value={sound.volume * 100}
                onChange={val => soundsStore.changeVolume(sound.id, val)}
              />
            </div>
          </div>
        </div>
      ));
    }

    return null;
  }

  renderBackgrounds() {
    const { backgroundsStore } = this.props;
    const { thumbnailHover } = this.state;

    if (backgroundsStore.backgrounds.length > 0) {
      return backgroundsStore.backgrounds.map(background => {
        const titleClassNameExtra =
          thumbnailHover === background.id ? 'ControlPanel-thumbnail-title-hover' : '';
        const attributionClassNameExtra =
          thumbnailHover === background.id ? 'ControlPanel-thumbnail-source-hover' : '';
        const titleClassName = `ControlPanel-thumbnail-title ${titleClassNameExtra}`;
        const attributionClassName = `ControlPanel-thumbnail-source ${attributionClassNameExtra}`;

        return (
          <div
            key={background.id}
            onMouseEnter={() => this.onThumbnailEnter(background.id)}
            onMouseLeave={this.onThumbnailExit}
            className="ControlPanel-cell"
          >
            <button
              type="button"
              onClick={() => backgroundsStore.changeBackground(background.id)}
              className="ControlPanel-thumbnail-container"
            >
              <img
                alt={background.title}
                src={background.thumbnailURL}
                className="ControlPanel-thumbnail"
              />
            </button>
            <p className={titleClassName}>{background.title}</p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={background.attributionURL}
              className={attributionClassName}
            >
              {background.attributionText}
            </a>
          </div>
        );
      });
    }

    return null;
  }

  render() {
    const { className } = this.props;
    const { customBackgroundInput, customBackgroundError } = this.state;

    return (
      <div className={`ControlPanel ${className}`}>
        <Tabs>
          <TabList>
            <Tab>sounds</Tab>
            <Tab>backgrounds</Tab>
          </TabList>
          <TabPanel>
            <div className="ControlPanel-scroll">{this.renderSounds()}</div>
          </TabPanel>
          <TabPanel>
            <div className="ControlPanel-scroll">
              <h5 className="ControlPanel-subheader" style={{ marginTop: 10 }}>
                custom background
              </h5>
              <div className="ControlPanel-custom-background">
                <div className="ControlPanel-custom-input">
                  <input
                    type="text"
                    className="ControlPanel-custom-textbox"
                    placeholder="enter a direct link to an image here"
                    value={customBackgroundInput}
                    onChange={this.onInputChange}
                    onKeyDown={this.onInputKeyDown}
                  />
                  <button
                    type="button"
                    className="ControlPanel-custom-button"
                    onClick={this.submitCustomBackground}
                  >
                    set
                  </button>
                </div>
                <p className="ControlPanel-custom-error">{customBackgroundError}</p>
              </div>
              <h5 className="ControlPanel-subheader">presets</h5>
              {this.renderBackgrounds()}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

ControlPanel.propTypes = {
  className: PropTypes.string.isRequired,
  soundsStore: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  backgroundsStore: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default ControlPanel;
