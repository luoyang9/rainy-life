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
          <h3 className="AboutPanel-subheader">built for rain lovers</h3>
          <p className="AboutPanel-description">a website dedicated to the soothing sound of rain.
          sit back, relax, and enjoy a peaceful moment.</p>
          <h3 className="AboutPanel-subheader">how to use</h3>
          <p className="AboutPanel-feature">Click the <i className="material-icons">settings</i> to set sounds/backgrounds.</p>
          <p className="AboutPanel-feature">Click the <i className="material-icons">library_music</i> to set music.</p>
          <h3 className="AboutPanel-subheader">features</h3>
          <p className="AboutPanel-feature"><span>autosave: </span>remembers the currently active background, sounds, and youtube link</p>
          <p className="AboutPanel-feature"><span>link sharing: </span>generate a custom URL for you to share your favourite set up</p>
          <h3 className="AboutPanel-subheader" style={{marginTop: 30}}>comments & suggestions</h3>
          <p className="AboutPanel-suggestion">email me at <a href="mailto:rainylifewebsite@gmail.com" target="_blank" rel="noopener noreferrer">rainylifewebsite@gmail.com</a></p>
          <p className="AboutPanel-footer">built with <span className="AboutPanel-heart">♥</span> by charlie</p>
        </div>
      </div>
    );  
  }
}

export default AboutPanel;
