import { observable, action } from 'mobx';
import soundsJSON from '../data/sounds.json';

export default class SoundsStore {
    @observable sounds = soundsJSON.map(sound => Object.assign({playing: false, loaded: false}, sound))
    @observable youtubeVideoID = "";

    constructor(urlParams, audioManager) {
        this.audioManager = audioManager;
        
        // Apply cookies
        for(let i = 0; i < soundsJSON.length; i++) {
            const localVal = localStorage.getItem("Sound " + i)
            if(localVal !== null) {
                this.sounds[i].volume = localVal;
                this.sounds[i].playing = true;
            }
        }
        
        // Apply url params
        urlParams.forEach(param => {
            const keyVal = param.split("=")
            if(keyVal[0] === "v") {                                 // Youtube Url ID
                this.youtubeVideoID = keyVal[1];
            } else if(keyVal[0] === "s") {                          // Active sounds
                const volumeArr = keyVal[1].split("s");
                for(let i = 0; i < soundsJSON.length; i++) {
                    const decodedVolume = parseInt(volumeArr[i], 10) / 100.0;
                    if(decodedVolume !== 0) {
                        this.sounds[i].volume = decodedVolume;
                        this.sounds[i].playing = true;
                    }
                }
            }
        });

        // Play active sounds
        for(let i = 0; i < soundsJSON.length; i++) {
            if(this.sounds[i].playing) {
                this.audioManager.loadClip(this.sounds[this.sounds[i].id], () => {
                    this.finishLoading(this.sounds[i].id);
                });
            }
        }
    }

    @action.bound
    setYoutubeVideoID(id) {
        this.youtubeVideoID = id;
        localStorage.setItem('youtubeVideoID', id)
    }

    @action.bound
    changeVolume(id, val) {
        this.sounds[id].volume = val / 100;
        this.audioManager.setClipVolume(id, this.sounds[id].volume);
        if(this.sounds[id].playing) {
          localStorage.setItem("Sound " + id, this.sounds[id].volume)
        }
    }

    @action.bound
    toggleSound(id) {
        this.sounds[id].playing = !this.sounds[id].playing;

        if(this.sounds[id].loaded) {
            this.audioManager.toggleClip(id, this.sounds[id].volume)
        } else {
            this.audioManager.loadClip(this.sounds[id], () => {
                this.finishLoading(id);
            });
        }
            
        if(this.sounds[id].playing) {
            localStorage.setItem("Sound " + id, this.sounds[id].volume);
        } else {
            localStorage.removeItem("Sound " + id);
        }
    }
    
    @action.bound
    finishLoading(id) {
        this.sounds[id].loaded = true;
    }
}