import Audio from "./utils/Audio";
import Canvas3D from "./utils/Canvas3D"

class App {
  constructor() {
    this.step = 0;

    /**
     *
     * Audio Handling
     *
     */
    this.audio = new Audio();
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
      container: document.querySelector("#threeContainer"),
      setStep: this.setStep
    });
  }
  setStep(step) {
      this.step = step
  }
}

export default App;
