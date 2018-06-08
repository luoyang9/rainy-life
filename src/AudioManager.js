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
        this.pauseClip(title)
      } else {
        this.resumeClip(title)
      }
    } else {
      this.playClip(title)
    }
  }

  pauseClip(title) {
    this.sounds[title].pause(this.instances[title]);
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