import Audio from "./utils/Audio/Audio";
import Canvas3D from "./utils/Canvas3D";
import AudioAnalyser from "./utils/Audio/AudioAnalyser";

class App {
  constructor() {
    this.step = 0;

    /**
     *
     * Audio Handling
     *
     */

    this.audio = new Audio();
    let analyser = new AudioAnalyser({ audio: this.audio, fftSize: 1024 });
    window.addEventListener("click", () => {
      this.audio.start();
    });
    window.addEventListener("keydown", e => {
      if (e.keyCode == 37) {
        this.audio.previousTrack();
      } else if (e.keyCode == 39) {
        this.audio.nextTrack();
      }
    });
    
    /**
     *
     * 3D Handling
     *
     */
    this.can3d = new Canvas3D({
      analyser: analyser,
      container: document.querySelector("#threeContainer"),
      setStep: this.setStep
    });

  }
  setStep(step) {
    this.step = step;
  }
}

export default App;
