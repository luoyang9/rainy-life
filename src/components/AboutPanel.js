import React, { Component } from 'react';
import './AboutPanel.css';

class AboutPanel extends Component {


  render() {
    const className = this.props.className;

    return (
      <div className={"AboutPanel " + className}>
        <div className="AboutPanel-content">
          <i onClick={this.props.toggleAbout} className="material-icons AboutPanel-close">close</i>
          <h1 className="AboutPanel-header">rainy life</h1>
          <p className="AboutPanel-description">listen to the soothing sound of rain.
          sit back, relax, and enjoy a peaceful moment.</p>
          <h3 className="AboutPanel-subheader">how to use</h3>
          <p className="AboutPanel-feature">click <i className="material-icons">settings</i> to set sounds/backgrounds.</p>
          <p className="AboutPanel-feature">click <i className="material-icons">library_music</i> to set music.</p>
          <h3 className="AboutPanel-subheader">features</h3>
          <p className="AboutPanel-feature"><span>autosave: </span>remembers the currently active background, sounds, and youtube link</p>
          <p className="AboutPanel-feature"><span>link sharing: </span>generate a custom URL for you to share your favourite set up</p>
          <h3 className="AboutPanel-subheader">comments & suggestions</h3>
          <p className="AboutPanel-suggestion">email me at <a href="mailto:rainylifewebsite@gmail.com" target="_blank" rel="noopener noreferrer">rainylifewebsite@gmail.com</a></p>
          <p className="AboutPanel-footer">built with <span className="AboutPanel-heart">♥</span> by <a href="https://charliezhang.me" target="_blank" rel="noopener noreferrer">charlie</a></p>
        </div>
      </div>
    );
  }
}

export default AboutPanel;
