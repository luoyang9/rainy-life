import { Howl, Howler } from "howler";

export default class AudioManager { 
  

  constructor() {
    this.sounds = {}
    this.instances = {}
  }

  loadClip(clip, callback) {
    if(!this.sounds.hasOwnProperty(clip.title)) {
      this.sounds[clip.title] = new Howl({
        src: [clip.src],
        loop: true,
        volume: clip.volume,
        onload: callback,
        onfade: () => {
          if(this.instances.hasOwnProperty(clip.title) && this.sounds[clip.title].volume() === 0){
            this.pauseClip(clip.title)
          }
        }
      });
    }
  }

  playPauseClip(title, vol) {
    if(this.instances.hasOwnProperty(title)) {
      if(this.sounds[title].playing(this.instances[title])) {
        this.sounds[title].fade(this.sounds[title].volume(), 0, 500)
      } else {
        this.sounds[title].fade(0, vol, 500)
        this.resumeClip(title)
      }
    } else {
      this.setClipVolume(title, 0)
      this.playClip(title)
      this.sounds[title].fade(0, vol, 500)
    }
  }

  pauseClip(title) {
    this.sounds[title].pause(this.instances[title]);
  }

  setClipVolume(title, vol) {
    this.sounds[title].volume(vol, this.instances[title]);
  }

  resumeClip(title) {
    this.sounds[title].play(this.instances[title]);
  }

  playClip(title) {
    this.instances[title] = this.sounds[title].play();
  }

  playPauseGlobal(play) {
    Object.keys(this.instances).forEach(title => {
      if(play) {
        this.playClip(title)
      } else {
        this.pauseClip(title)
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