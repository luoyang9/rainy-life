import { Howl, Howler } from "howler";

export default class AudioManager { 
  

  constructor() {
    this.sounds = {}
    this.instances = {}
  }

  loadClip(clip, callback) {
    if(!this.sounds.hasOwnProperty(clip.id)) {
      this.sounds[clip.id] = new Howl({
        src: [clip.src],
        loop: true,
        volume: clip.volume,
        onload: callback,
        onfade: () => {
          if(this.instances.hasOwnProperty(clip.id) && this.sounds[clip.id].volume() === 0){
            this.pauseClip(clip.id)
          }
        }
      });
    }
  }

  playPauseClip(id, vol) {
    if(this.instances.hasOwnProperty(id)) {
      if(this.sounds[id].playing(this.instances[id])) {
        this.sounds[id].fade(this.sounds[id].volume(), 0, 500)
      } else {
        this.sounds[id].fade(0, vol, 500)
        this.resumeClip(id)
      }
    } else {
      this.setClipVolume(id, 0)
      this.playClip(id)
      this.sounds[id].fade(0, vol, 500)
    }
  }

  pauseClip(id) {
    this.sounds[id].pause(this.instances[id]);
  }

  setClipVolume(id, vol) {
    if(this.sounds.hasOwnProperty(id)) {
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
      if(play) {
        this.playClip(id)
      } else {
        this.pauseClip(id)
      }
    })
  }

  setGlobalVolume(volume) {
    Howler.volume(volume);
  }

  getGlobalVolume() {
    return Howler.volume();
  }

}