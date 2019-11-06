

export default class Audio {
  constructor() {
    this.audio = document.querySelector("#audio");
    this.source = this.audio.querySelector("source");
    // this.tracks = Object.values(trackList);\
    this.currentTrackIndex = 0;

    fetch("/Users/eroch/VJ-Gobelins/trackList.js")
      .then(function(response) {
        console.log(response);
        return response.blob();
      })
      .then(function(myBlob) {
        console.log(blob);
        
        var objectURL = URL.createObjectURL(myBlob);
        console.log(objectURL);
        myImage.src = objectURL;
      });
  }
  setTrack(id) {
    if (id < 0) {
      id = this.tracks.length - 1;
    } else if (id > this.tracks.length) {
      id = 0;
    }
    this.currentTrackIndex = id;
    this.source.src = this.getCurrentTrack().url;
    this.audio.play();
  }
  getCurrentTrack() {
    return this.tracks[this.currentTrackIndex];
  }
  next() {
    setTrack(this.currentTrackIndex + 1);
  }
  previous() {
    setTrack(this.currentTrackIndex - 1);
  }
}
