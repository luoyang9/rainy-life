import { observable, action } from 'mobx';
import backgroundsJSON from '../data/backgrounds.json';

export default class BackgroundsStore {
  @observable
  backgrounds = backgroundsJSON;

  @observable
  activeBackground = 0; // Default background is forest

  @observable
  customBackgroundUrl = '';

  constructor(urlParams) {
    // Apply cookies
    const localBackground = localStorage.getItem('background');
    this.activeBackground = parseInt(localBackground, 10);
    const localCustomBackgroundUrl = localStorage.getItem('customBackgroundUrl');
    this.customBackgroundUrl = localCustomBackgroundUrl;

    // Apply url params
    urlParams.forEach(param => {
      const keyVal = param.split('=');
      if (keyVal[0] === 'b') {
        // Preset background ID
        this.activeBackground = parseInt(keyVal[1], 10);
      } else if (keyVal[0] === 'u') {
        // Custom background Url
        this.customBackgroundUrl = decodeURIComponent(keyVal[1]);
      }
    });
  }

  @action.bound
  changeBackground(id) {
    this.activeBackground = id;
    this.customBackgroundUrl = '';
    localStorage.setItem('background', id);
    localStorage.removeItem('customBackgroundUrl');
  }

  @action.bound
  setCustomBackground(url) {
    this.customBackgroundUrl = url;
    localStorage.setItem('customBackgroundUrl', url);
  }
}
