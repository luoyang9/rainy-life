import React, { Component } from 'react';
import PreloadImage from './PreloadImage';
import './Background.css';
import backgroundsJSON from '../data/backgrounds.json';

class Background extends Component {

  constructor(props) {
    super(props)

    this.state = {
      backgrounds: backgroundsJSON
    }
  }
  
  render() {
    return (
      <div>
        {
          this.state.backgrounds.length > 0 && this.state.backgrounds.map(background => {
            return <PreloadImage key={background.title} 
              srcPreload={background.thumbnailURL} 
              srcLoaded={background.backgroundURL}
              className={this.props.activeBackground === background.title ? "Background Background-show" : "Background"} 
            />
          })
        }
        <div 
          className={this.props.url ? "Background Background-show" : "Background"} 
          style={{
            backgroundImage: `url(${this.props.url})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}>
        </div>
      </div>
    );  
  }
}

export default Background;
