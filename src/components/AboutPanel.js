import React from 'react';
import PropTypes from 'prop-types';
import './AboutPanel.css';

const AboutPanel = props => {
  const { className, toggleAbout } = props;

  return (
    <div className={`AboutPanel ${className}`}>
      <div className="AboutPanel-content">
        <button type="button" onClick={toggleAbout} className="material-icons AboutPanel-close">
          close
        </button>
        <h1 className="AboutPanel-header">rainy life</h1>
        <p className="AboutPanel-description">
          listen to the soothing sound of rain. sit back, relax, and enjoy a peaceful moment.
        </p>
        <h3 className="AboutPanel-subheader">how to use</h3>
        <p className="AboutPanel-feature">
          click
          <i className="material-icons">&nbsp;settings&nbsp;</i>
          to set sounds/backgrounds.
        </p>
        <p className="AboutPanel-feature">
          click
          <i className="material-icons">&nbsp;library_music&nbsp;</i>
          to set music.
        </p>
        <h3 className="AboutPanel-subheader">features</h3>
        <p className="AboutPanel-feature">
          <span>autosave: </span>
          remembers the currently active background, sounds, and youtube link
        </p>
        <p className="AboutPanel-feature">
          <span>link sharing: </span>
          generate a custom URL for you to share your favourite set up
        </p>
        <h3 className="AboutPanel-subheader">comments & suggestions</h3>
        <p className="AboutPanel-suggestion">
          email me at
          <a href="mailto:rainylifewebsite@gmail.com" target="_blank" rel="noopener noreferrer">
            &nbsp;rainylifewebsite@gmail.com&nbsp;
          </a>
        </p>
        <p className="AboutPanel-footer">
          built with
          <span className="AboutPanel-heart">&nbsp;♥&nbsp;</span>
          by
          <a href="https://charliezhang.me" target="_blank" rel="noopener noreferrer">
            &nbsp;charlie&nbsp;
          </a>
        </p>
      </div>
    </div>
  );
};

AboutPanel.propTypes = {
  className: PropTypes.string.isRequired,
  toggleAbout: PropTypes.func.isRequired
};

export default AboutPanel;
