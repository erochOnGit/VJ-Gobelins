import Canvas3D from "src/utils/Canvas3D";

export default class AudioAnalyser {
  constructor({ audio, fftSize }) {
    this.audio = audio;
    this.context = new AudioContext();
    this.src = this.context.createMediaElementSource(this.audio.audioNode);
    this.analyser = this.context.createAnalyser();
    this.src.connect(this.analyser);

    this.analyser.connect(this.context.destination);
    this.analyser.fftSize = fftSize;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.beats = new Float32Array(16);
    this.data = {
      time: { time: 0, delta: 0 },
      volume: 0
    };

    this.audio.audioNode.addEventListener("trackset", () => {
      this.context.resume();
      console.log("resume");
    });

    /*
            DEBUGGER
        */
    let debugCanvas = document.createElement("canvas");
    debugCanvas.width = window.innerWidth;
    debugCanvas.height = window.innerHeight;
    debugCanvas.style = `
            position: absolute;
            top: 0;
            left: 0;
            z-index: 9999;
            pointer-events: none;
        `;
    document.querySelector("body").append(debugCanvas);
    this.debugger = {
      canvas: debugCanvas,
      ctx: debugCanvas.getContext("2d"),
      swapColor: false
    };
  }

  refreshData(time) {
    this.analyser.getByteFrequencyData(this.dataArray);
    for (let i = 0; i < this.beats.length; i++) {
      let _min = (i / this.beats.length) * 100;
      let _max = ((i + 1) / this.beats.length) * 100;
      this.beats[i] = this.getAverage({ min: _min, max: _max });
    }
    this.data.time = time;
    this.data.volume = this.getAverage({ min: 0, max: 100 });
  }

  debug() {
    this.debugger.canvas.width = window.innerWidth;
    this.debugger.canvas.height = window.innerHeight;
    this.debugger.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    let widthData = window.innerWidth / this.dataArray.length;
    let widthBeat = widthData * (this.bufferLength / this.beats.length);

    this.debugger.ctx.fillStyle = "#FFF";
    for (let i = 0; i < this.beats.length; i++) {
      let height = (this.beats[i] * window.innerHeight) / 3 + 10;
      this.debugger.ctx.fillRect(
        widthBeat * i + 1,
        window.innerHeight - height,
        widthBeat - 2,
        height
      );
    }

    this.debugger.ctx.fillStyle = "#FF0000";
    for (let i = 0; i < this.dataArray.length; i++) {
      let height = ((this.dataArray[i] / 255) * window.innerHeight) / 3;
      this.debugger.ctx.fillRect(
        widthData * i + 2,
        window.innerHeight - height,
        widthData - 4,
        height
      );
    }
  }

  extractData(range) {
    let _min = Math.floor((range.min / 100) * this.dataArray.length);
    let _max = Math.ceil((range.max / 100) * this.dataArray.length);
    return this.dataArray.slice(_min, _max);
  }

  getAverage(range) {
    let array = this.extractData(range);
    let moy = 0;
    for (let i = 0; i < array.length; i++) {
      moy += array[i];
    }
    return moy / array.length / 255;
  }

  getMax(range) {
    let array = this.extractData(range);
    return Math.max(...array) / 255;
  }

  getMin(range) {
    let array = this.extractData(range);
    return Math.min(...array) / 255;
  }

  getQuartile(range, q) {
    let array = this.extractData(range);
    array = array.sort((a, b) => {
      return a - b;
    });
    var pos = (array.length - 1) * q;
    var base = Math.floor(pos);
    var rest = pos - base;
    if (array[base + 1] !== undefined) {
      return array[base] + rest * (array[base + 1] - array[base]);
    } else {
      return array[base];
    }
  }

  getData() {
    return this.data;
  }
}

class BeatDetector {
  constructor({ analyser, range }) {
    this.analyser = analyser;
    this.range = range;
    this.averages = [];
    this.average = 0;
    this.timer = 0;
    this.hasbeated = false;
  }

  getValue() {
    this.timer += Canvas3D.time.delta;
    let currentAverage = this.analyser.getAverage(this.range);
    if (this.timer > 0.05) {
      this.timer = 0;
      this.averages.push(currentAverage);
      if (this.averages.length > 30) {
        this.averages.shift();
      }
      this.calculateAverage();
    }

    if (currentAverage > this.average) {
      if (!this.hasbeated) {
        console.log("beat");
        this.analyser.debugger.swapColor = !this.analyser.debugger.swapColor;
        this.hasbeated = true;
        return true;
      }
    } else {
      this.hasbeated = false;
    }
    return false;
  }

  calculateAverage() {
    this.average = 0;
    for (let i = 0; i < this.averages.length; i++) {
      this.average += this.averages[i];
    }
    this.average = this.average / this.averages.length;
  }

  debug() {}
}
