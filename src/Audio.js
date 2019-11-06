import trackList from "./trackList.js";

export default class Audio {
  constructor() {
    this.audio = document.querySelector("#audio");
    this.source = this.audio.querySelector("source");
    this.tracks = Object.values(trackList);
    this.started = false;
    this.audio.onended = () => {
      console.log("Song has ended")
      this.nextTrack();
    };
  }
  start() {
    if (!this.started) {
      this.setTrack(0);
      this.started = true;
      console.log("audio started ");
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
    this.audio.load();
    this.audio.play();
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
}
