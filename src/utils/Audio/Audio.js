import trackList from "./trackList.js";
import trackList2 from "./trackList2.js";


export default class Audio {
  constructor() {
    this.audioNode = document.querySelector("#audio");
    this.source = this.audioNode.querySelector("source");
    this.started = false;
    this.audioNode.onended = () => {
      console.log("Song has ended")
      this.nextTrack();
    };
    this.tracksetEvent = new Event("trackset");
  }

  get tracks() {
    return Object.values(trackList2);
  }

  start() {
    if (!this.started) {
      this.setTrack(0);
      this.started = true;
      console.log("audio started");
    }
  }
  setTrack(id) {
    if (id < 0) {
      id = this.tracks.length - 1;
    } else if (id > this.tracks.length - 1) {
      id = 0;
    }
    this.currentTrackIndex = id;
    this.source.src = this.getCurrentTrack().url;
    this.audioNode.load();
    this.audioNode.play();
    this.audioNode.dispatchEvent(this.tracksetEvent);

    console.log("track setted " + this.currentTrackIndex);
  }
  getCurrentTrack() {
    return this.tracks[this.currentTrackIndex];
  }

  nextTrack() {
    this.setTrack(this.currentTrackIndex + 1);
  }

  previousTrack() {
    this.setTrack(this.currentTrackIndex - 1);
  }

  getProgress() {
    return this.audioNode.currentTime / this.audioNode.duration;
  }

  isPlaying() {
    return !this.audioNode.paused && this.audioNode.currentTime > 0;
  }

  togglePlay() {
    if (this.isPlaying()) {
      this.audioNode.pause();
    } else {
      this.audioNode.play();
    }
  }
}
