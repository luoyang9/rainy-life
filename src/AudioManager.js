import { Howl } from 'howler';

export default class AudioManager {
  constructor() {
    this.sounds = {};
    this.instances = {};
  }

  loadClip(clip, callback) {
    if (!this.sounds.hasOwnProperty(clip.id)) {
      this.sounds[clip.id] = new Howl({
        src: [clip.src],
        loop: true,
        volume: clip.volume,
        onload: () => {
          this.playClip(clip.id);
          callback();
        }
      });
    }
  }

  toggleClip(id, vol) {
    if (this.instances.hasOwnProperty(id)) {
      if (this.sounds[id].playing(this.instances[id])) {
        this.pauseClip(id);
      } else {
        this.setClipVolume(id, vol);
        this.resumeClip(id);
      }
    } else {
      this.setClipVolume(id, vol);
      this.playClip(id);
    }
  }

  pauseClip(id) {
    this.sounds[id].pause(this.instances[id]);
  }

  setClipVolume(id, vol) {
    if (this.sounds.hasOwnProperty(id)) {
      this.sounds[id].volume(vol, this.instances[id]);
    }
  }

  resumeClip(id) {
    this.sounds[id].play(this.instances[id]);
  }

  playClip(id) {
    this.instances[id] = this.sounds[id].play();
  }

  playPauseGlobal(play) {
    Object.keys(this.instances).forEach(id => {
      if (play) {
        this.playClip(id);
      } else {
        this.pauseClip(id);
      }
    });
  }

  pauseAll() {
    Object.keys(this.instances).forEach(id => {
      this.pauseClip(id);
    });
  }

  resumeAll(ids) {
    ids.forEach(id => {
      this.resumeClip(id);
    });
  }
}
