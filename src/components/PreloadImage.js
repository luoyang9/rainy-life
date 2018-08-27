import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PreloadImage.css';

class PreloadImage extends Component {
  constructor(props) {
    super(props);
    this.imageHD = null;
  }

  componentDidMount() {
    const loaderImg = new Image();
    const { srcLoaded } = this.props;

    loaderImg.src = srcLoaded;

    loaderImg.onload = () => {
      this.imageHD.setAttribute(
        'style',
        `background-image: url('${srcLoaded}');
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;`
      );
      this.imageHD.classList.add('PreloadImage-fade-in');
    };
  }

  render() {
    const { className, srcPreload } = this.props;
    return (
      <div className={`PreloadImage-container ${className}`}>
        <div
          className="PreloadImage-loaded"
          ref={imageLoadedElem => (this.imageHD = imageLoadedElem)} // eslint-disable-line no-return-assign
        />
        <div
          className="PreloadImage-preload"
          style={{
            backgroundImage: `url('${srcPreload}')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </div>
    );
  }
}

PreloadImage.propTypes = {
  className: PropTypes.string.isRequired,
  srcLoaded: PropTypes.string.isRequired,
  srcPreload: PropTypes.string.isRequired
};

export default PreloadImage;
