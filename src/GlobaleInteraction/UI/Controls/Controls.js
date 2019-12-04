import "./controls.scss";
import { TweenMax } from "gsap";

class Controls {
  constructor({ audio, ui }) {

    this.audio = audio;
    this.displayTimer = 10;
    this.ui = ui;

    this.audio.audioNode.addEventListener("trackset", () => {
      document.querySelector(".controls-bar__status p").textContent =
        this.audio.getCurrentTrack().artist +
        " - " +
        this.audio.getCurrentTrack().name;
    });

    window.addEventListener("load", () => {
      document.querySelector(".controls-bar__btn-prev").onclick = () => {
        this.audio.previousTrack();
      };
      document.querySelector(".controls-bar__btn-next").onclick = () => {
        this.audio.nextTrack();
      };
      document.querySelector(".controls-bar__btn-play").onclick = () => {
        this.audio.togglePlay();
      };
      document.querySelector(".controls-bar__btn-fullscreen").onclick = () => {
        toggleFullScreen();
      };
      document.querySelector(".controls-bar h1").onclick = () => {
        this.ui.homeLayout();
      };
      document.querySelector(".controls-bar__btn-info").onclick = () => {
        this.ui.programationLayout();
      };
    });

    window.addEventListener("mousemove", ()=>{
        this.displayTimer = 7;
        TweenMax.to(".controls-bar, .bpm-display",1,{opacity: 1});
    });

    window.addEventListener("wheel", ()=>{
      this.displayTimer = 3;
      TweenMax.to(".controls-bar, .bpm-display",1,{opacity: 1});
    });

    window.addEventListener("keyup", (e)=>{
      if (e.keyCode == 32) {
        this.displayTimer = 3;
        TweenMax.to(".controls-bar, .bpm-display",1,{opacity: 1});
      }
    });


    this.bpmSpeedDisplay = document.createElement("div");
    this.bpmSpeedDisplay.classList.add("ui-color-text");
    this.bpmSpeedDisplay.classList.add("bpm-display");
    this.bpmSpeedDisplay.innerHTML = "test";
    document.body.append(this.bpmSpeedDisplay);
  }

  update(data) {
    TweenMax.set(".controls-bar__status div", {
      scaleX: this.audio.getProgress()
    });
    TweenMax.set(".controls-bar__btn-play__play", {
      display: this.audio.isPlaying() ? "none" : "block"
    });
    TweenMax.set(".controls-bar__btn-play__pause", {
      display: this.audio.isPlaying() ? "block" : "none"
    });

    this.displayTimer -= data.time.delta;
    if(this.displayTimer <= 0 && this.displayTimer != null){
        this.displayTimer = null;
        TweenMax.to(".controls-bar, .bpm-display",1,{opacity: 0});
    }

    this.bpmSpeedDisplay.innerHTML = this.ui.grid.autocut > 0 ? this.ui.grid.bpmSpeed +" / 8" : "stopped";
  }
}

function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
     (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {  
        document.documentElement.requestFullScreen();  
      } else if (document.documentElement.mozRequestFullScreen) {  
        document.documentElement.mozRequestFullScreen();  
      } else if (document.documentElement.webkitRequestFullScreen) {  
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
      }  
    } else {  
      if (document.cancelFullScreen) {  
        document.cancelFullScreen();  
      } else if (document.mozCancelFullScreen) {  
        document.mozCancelFullScreen();  
      } else if (document.webkitCancelFullScreen) {  
        document.webkitCancelFullScreen();  
      }  
    }  
  }
export default Controls;
