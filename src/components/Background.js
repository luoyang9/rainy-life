import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import PreloadImage from './PreloadImage';
import './Background.css';

@observer
class Background extends Component {
  renderPresets() {
    const { backgroundsStore } = this.props;
    if (backgroundsStore.backgrounds.length > 0) {
      return backgroundsStore.backgrounds.map(preset => {
        const className =
          backgroundsStore.activeBackground === preset.id && !backgroundsStore.customBackgroundUrl
            ? 'Background Background-show'
            : 'Background';
        return (
          <PreloadImage
            key={preset.id}
            srcPreload={preset.thumbnailURL}
            srcLoaded={preset.backgroundURL}
            className={className}
          />
        );
      });
    }
    return null;
  }

  render() {
    const { backgroundsStore } = this.props;
    const style = {
      backgroundImage: `url(${backgroundsStore.customBackgroundUrl})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    };
    const className = backgroundsStore.customBackgroundUrl
      ? 'Background Background-show'
      : 'Background';
    return (
      <div>
        {this.renderPresets()}
        <div className={className} style={style} />
      </div>
    );
  }
}

Background.propTypes = {
  backgroundsStore: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default Background;
