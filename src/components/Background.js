import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PreloadImage from './PreloadImage';
import './Background.css';

@observer
class Background extends Component {
  render() {
    const store = this.props.backgroundsStore;
    return (
      <div>
        {
          store.backgrounds.length > 0 && store.backgrounds.map(background => {
            return <PreloadImage key={background.id} 
              srcPreload={background.thumbnailURL} 
              srcLoaded={background.backgroundURL}
              className={store.activeBackground === background.id && !store.customBackgroundUrl ? "Background Background-show" : "Background"} 
            />
          })
        }
        <div 
          className={store.customBackgroundUrl ? "Background Background-show" : "Background"} 
          style={{
            backgroundImage: `url(${store.customBackgroundUrl})`,
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
