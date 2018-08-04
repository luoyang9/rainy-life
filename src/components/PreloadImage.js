import React, { Component } from 'react';
import './PreloadImage.css';

class PreloadImage extends Component {

  constructor(props) {
    super(props);
    this.imageHD = null;
  }

  componentDidMount() {
        
    const loaderImg = new Image();

    loaderImg.src = this.props.srcLoaded;

    loaderImg.onload = () => {
      this.imageHD.setAttribute(
        'style',
        `background-image: url('${this.props.srcLoaded}');
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;`
      );
      this.imageHD.classList.add('PreloadImage-fade-in');
    }

  };

  render() {
    return (
      <div className={"PreloadImage-container " + this.props.className}>
        <div 
          className="PreloadImage-loaded" 
          ref={imageLoadedElem => this.imageHD = imageLoadedElem}>
        </div>
        <div 
          className="PreloadImage-preload" 
          style={{ 
            backgroundImage: `url('${this.props.srcPreload}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}>
        </div>
      </div>
    )
  }

}

export default PreloadImage;