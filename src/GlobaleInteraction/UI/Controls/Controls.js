import "./controls.scss";
import { TweenMax } from "gsap";

class Controls {
  constructor({ audio }) {

    const displayTime = 3;

    this.audio = audio;
    this.displayTimer = displayTime;

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
    });

    window.addEventListener("mousemove", ()=>{
        this.displayTimer = displayTime;
        TweenMax.to(".controls-bar",1,{opacity: 1});
    })
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
        TweenMax.to(".controls-bar",1,{opacity: 0});
    }
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
