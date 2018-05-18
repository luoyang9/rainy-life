import React, { Component } from 'react';
import './Background.css';

class Background extends Component {
  
  render() {
    const backgroundStyle = {
      backgroundImage: `url(${this.props.backgroundURL})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    }

    return (
      <div className="Background" style={backgroundStyle}>
      </div>
    );  
  }
}

export default Background;
