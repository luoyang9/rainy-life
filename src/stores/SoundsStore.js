import { observable, action } from 'mobx';
import soundsJSON from '../data/sounds.json';

export default class SoundsStore {
  @observable
  sounds = soundsJSON.map(sound => Object.assign({ playing: false, loaded: false }, sound));

  @observable
  globallyPausedSounds = [];

  @observable
  globalPause = true;

  @observable
  youtubeVideoID = '';

  constructor(urlParams, audioManager) {
    this.audioManager = audioManager;

    // Apply cookies
    for (let i = 0; i < soundsJSON.length; i++) {
      const localVal = localStorage.getItem(`Sound ${i}`);
      if (localVal !== null) {
        this.sounds[i].volume = localVal;
        this.sounds[i].playing = true;
        this.globalPause = false;
      }
    }
    const localVal = localStorage.getItem('youtubeVideoID');
    if (localVal !== null) {
      this.youtubeVideoID = localVal;
    }

    // Apply url params
    urlParams.forEach(param => {
      const keyVal = param.split('=');
      if (keyVal[0] === 'v') {
        // Youtube Url ID
        this.youtubeVideoID = keyVal[1].trim();
      } else if (keyVal[0] === 's') {
        // Active sounds
        const volumeArr = keyVal[1].split('s');
        for (let i = 0; i < soundsJSON.length; i++) {
          const decodedVolume = parseInt(volumeArr[i], 10) / 100.0;
          if (decodedVolume !== 0) {
            this.sounds[i].volume = decodedVolume;
            this.sounds[i].playing = true;
            this.globalPause = false;
          }
        }
      }
    });

    // Play active sounds
    for (let i = 0; i < soundsJSON.length; i++) {
      if (this.sounds[i].playing) {
        this.audioManager.loadClip(this.sounds[this.sounds[i].id], () => {
          this.finishLoading(this.sounds[i].id);
        });
      }
    }
  }

  @action.bound
  toggleGlobalPause() {
    this.globalPause = !this.globalPause;

    if (this.globalPause) {
      this.globallyPausedSounds = Object.keys(this.audioManager.instances).filter(
        id => this.sounds[id].playing
      );
      this.globallyPausedSounds.forEach(id => {
        this.sounds[id].playing = false;
      });
      this.audioManager.pauseAll();
    } else {
      this.audioManager.resumeAll(this.globallyPausedSounds);
      this.globallyPausedSounds.forEach(id => {
        this.sounds[id].playing = true;
      });
    }
  }

  @action.bound
  setYoutubeVideoID(id) {
    this.youtubeVideoID = id;
    localStorage.setItem('youtubeVideoID', id);
  }

  @action.bound
  changeVolume(id, val) {
    this.sounds[id].volume = val / 100;
    this.audioManager.setClipVolume(id, this.sounds[id].volume);
    if (this.sounds[id].playing) {
      localStorage.setItem(`Sound ${id}`, this.sounds[id].volume);
    }
  }

  @action.bound
  toggleSound(id) {
    this.sounds[id].playing = !this.sounds[id].playing;

    if (this.sounds[id].loaded) {
      this.audioManager.toggleClip(id, this.sounds[id].volume);
    } else {
      this.audioManager.loadClip(this.sounds[id], () => {
        this.finishLoading(id);
      });
    }

    if (this.sounds[id].playing) {
      if (this.globalPause) {
        this.globalPause = false;
        this.globallyPausedSounds.forEach(oldId => {
          localStorage.removeItem(`Sound ${oldId}`);
        });
        this.globallyPausedSounds = [id];
      }
      localStorage.setItem(`Sound ${id}`, this.sounds[id].volume);
    } else {
      localStorage.removeItem(`Sound ${id}`);
      if (this.sounds.filter(sound => sound.playing).length === 0) {
        this.globalPause = true;
      }
    }
  }

  @action.bound
  finishLoading(id) {
    this.sounds[id].loaded = true;
  }
}
