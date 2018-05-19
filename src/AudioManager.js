import { Howl, Howler } from "howler";

export default class AudioManager { 
  

  constructor() {
    this.sounds = {}
    this.instances = {}
  }

  loadClips(clips) {
    clips.forEach(clip => {
      this.sounds[clip.title] = new Howl({
        src: [clip.src],
        loop: true,
        volume: clip.volume
      })
    });
  }

  playPauseClip(title) {
    if(this.instances.hasOwnProperty(title)) {
      if(this.sounds[title].playing(this.instances[title])) {
        this.sounds[title].pause(this.instances[title]);
      } else {
        this.sounds[title].play(this.instances[title]);
      }
    } else {
      this.instances[title] = this.sounds[title].play();
    }
  }

  setGlobalVolume(volume) {
    Howler.volume(volume);
  }

}