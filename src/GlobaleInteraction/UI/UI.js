import CellDomElement from "src/GlobaleInteraction/Module/Cell/CellDomElement";
import Controls from "./Controls";
import tuto1 from "src/assets/tuto/module_tuto_01.webm";
import tuto2 from "src/assets/tuto/module_tuto_02.webm";

class UI {
  constructor({ grid, audio, camera }) {
    this.grid = grid;
    this.controls = new Controls({ audio: audio, ui: this });
    this.audio = audio;
    this.camera = camera;

    this.landingLayout();
  }

  programationLayout() {
    this.grid.clear();
    this.grid.autocut = false;

    let tracklist = this.audio.getFilteredTracklist();
    console.log(tracklist);
    let hours = "";
    let genres = "";

    for (let key of Object.keys(tracklist)) {
      let arrayKey = key.split("_");
      genres += `<span class="ui-color-text">${arrayKey[0]}</span>`;

      hours += `<span class="ui-color-text">${arrayKey[1]
        .replace("-", " / ")
        .replace("h", ":00")
        .replace("h", ":00")}</span>`;
    }

    let artists = "";

    for (let tracks of Object.values(tracklist)) {
      let str = "";
      for (let track of tracks) {
        str += track.artist + " / ";
      }
      artists += `<span class="ui-color-text infinite-text custom">${str}</span>`;
    }

    this.createCell({
      topLeftPos: new THREE.Vector2(-10, 3),
      size: new THREE.Vector2(2, 7),
      cellData: {
        type: "dom",
        html: `
        <div class="ui-color-fill">
        <h2 class="ui-color-fill rotated">Timetable</h2>
        </div>
        `
      }
    });

    this.createCell({
      topLeftPos: new THREE.Vector2(-6, 3),
      size: new THREE.Vector2(3, 1),
      cellData: {
        type: "dom",
        html: `<h3 class="ui-color-fill">Time</h3>`
      }
    });
    this.createCell({
      topLeftPos: new THREE.Vector2(-6, 2),
      size: new THREE.Vector2(3, 6),
      cellData: {
        type: "dom",
        html: `
        <div class="timetable-cells-wrapper">
            ${hours}
        </div>
        `
      }
    });

    this.createCell({
      topLeftPos: new THREE.Vector2(-3, 3),
      size: new THREE.Vector2(3, 1),
      cellData: {
        type: "dom",
        html: `<h3 class="ui-color-fill">Theme</h3>`
      }
    });
    this.createCell({
      topLeftPos: new THREE.Vector2(-3, 2),
      size: new THREE.Vector2(3, 6),
      cellData: {
        type: "dom",
        html: `
        <div class="timetable-cells-wrapper">
            ${genres}
        </div>
        `
      }
    });

    this.createCell({
      topLeftPos: new THREE.Vector2(0, 3),
      size: new THREE.Vector2(7, 1),
      cellData: {
        type: "dom",
        html: `<h3 class="ui-color-fill">Lineup</h3>`
      }
    });
    this.createCell({
      topLeftPos: new THREE.Vector2(0, 2),
      size: new THREE.Vector2(7, 6),
      cellData: {
        type: "dom",
        html: `
        <div class="timetable-cells-wrapper">
            ${artists}
        </div>
        `
      }
    });

    this.createCell({
      topLeftPos: new THREE.Vector2(9, 5),
      size: new THREE.Vector2(1, 1),
      cellData: {
        type: "dom",
        locked: true,
        html: `<button id="btn-closeprogra" class="ui-color-fill">X</button>`
      }
    });

    document.getElementById("btn-closeprogra").onclick = () => {
      this.grid.reset();
      this.grid.autocut = true;
    };

    
  }

  homeLayout() {
    this.grid.clear();
    this.grid.autocut = false;

    this.createCell({
      topLeftPos: new THREE.Vector2(-9, 5),
      size: new THREE.Vector2(18, 2),
      cellData: {
        type: "dom",
        html: `<p class="ui-color-text text-intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>`
      }
    });

    //click
    this.createCell({
      topLeftPos: new THREE.Vector2(-9, 2),
      size: new THREE.Vector2(5, 1),
      cellData: {
        type: "dom",
        html: `<h3 class="ui-color-fill">Click to change effects</h3>`
      }
    });
    this.createCell({
      topLeftPos: new THREE.Vector2(-9, 1),
      size: new THREE.Vector2(5, 4),
      cellData: {
        type: "motion",
        url: tuto1
      }
    });

    //slice
    this.createCell({
      topLeftPos: new THREE.Vector2(-3, 2),
      size: new THREE.Vector2(5, 1),
      cellData: {
        type: "dom",
        html: `<h3 class="ui-color-fill">Slice the grid</h3>`
      }
    });
    this.createCell({
      topLeftPos: new THREE.Vector2(-3, 1),
      size: new THREE.Vector2(5, 4),
      cellData: {
        type: "motion",
        url: tuto2
      }
    });


    //controls
    this.createCell({
      topLeftPos: new THREE.Vector2(3, 2),
      size: new THREE.Vector2(6, 1),
      cellData: {
        type: "dom",
        html: `<h3 class="ui-color-fill">controls</h3>`
      }
    });

     //controls : scroll
    this.createCell({
      topLeftPos: new THREE.Vector2(3, 1),
      size: new THREE.Vector2(2, 1),
      cellData: {
        type: "dom",
        html: `<button class="ui-color-fill">scroll</button>`
      }
    });
    this.createCell({
      topLeftPos: new THREE.Vector2(5, 1),
      size: new THREE.Vector2(4, 1),
      cellData: {
        type: "dom",
        html: `<p class="ui-color-text">change the rythm</p>`
      }
    });

    //controls : space
    this.createCell({
      topLeftPos: new THREE.Vector2(3, 0),
      size: new THREE.Vector2(2, 1),
      cellData: {
        type: "dom",
        html: `<button class="ui-color-fill">space</button>`
      }
    });
    this.createCell({
      topLeftPos: new THREE.Vector2(5, 0),
      size: new THREE.Vector2(4, 1),
      cellData: {
        type: "dom",
        html: `<p class="ui-color-text">lock the grid</p>`
      }
    });

    //controls : shift
    this.createCell({
      topLeftPos: new THREE.Vector2(3, -1),
      size: new THREE.Vector2(2, 1),
      cellData: {
        type: "dom",
        html: `<button class="ui-color-fill">shift</button>`
      }
    });
    this.createCell({
      topLeftPos: new THREE.Vector2(5, -1),
      size: new THREE.Vector2(4, 1),
      cellData: {
        type: "dom",
        html: `<p class="ui-color-text">reset the grid</p>`
      }
    });

    //controls : fun
    this.createCell({
      topLeftPos: new THREE.Vector2(3, -2),
      size: new THREE.Vector2(1, 1),
      cellData: {
        type: "dom",
        html: `<button id="random-key" class="ui-color-fill">a</button>`
      }
    });
    this.createCell({
      topLeftPos: new THREE.Vector2(4, -2),
      size: new THREE.Vector2(5, 1),
      cellData: {
        type: "dom",
        html: `<p class="ui-color-text">have fun !</p>`
      }
    });


    this.createCell({
      topLeftPos: new THREE.Vector2(-9, -4),
      size: new THREE.Vector2(18, 1),
      cellData: {
        type: "dom",
        locked: true,
        html: `<button id="btn-tunein" class="ui-color-fill">Tune in</button>`
      }
    });

    document.getElementById("btn-tunein").onclick = () => {
      this.grid.reset();
      this.grid.autocut = true;
    };
  }

  landingLayout() {
    this.grid.clear();
    this.grid.autocut = false;

    this.createCell({
      topLeftPos: new THREE.Vector2(-2, 1),
      size: new THREE.Vector2(4, 1),
      cellData: {
        type: "dom",
        locked: true,
        html: `<h1 id="btn-starttitle" class="ui-color-fill">wormhole radio</h1>`
      }
    });

    this.createCell({
      topLeftPos: new THREE.Vector2(-2, 0),
      size: new THREE.Vector2(4, 1),
      cellData: {
        type: "dom",
        locked: true,
        html: `<button id="btn-start" class="ui-color-color">Enter the void</button>`
      }
    });

    document.getElementById("btn-start").onclick = () => {
      this.homeLayout();
      this.audio.start();
    };
  }


  createCell({ topLeftPos, size, cellData }) {
    this.grid.createMolecule({ topLeftPos: topLeftPos, size: size, cellData });
  }

  update(data) {
    TweenMax.set(".ui-color-text", {
      color: data.color,
      backgroundColor: "transparent"
    });
    TweenMax.set(".ui-color-stroke", {
      color: data.color,
      borderColor: data.color,
      stroke: data.color
    });
    TweenMax.set(".ui-color-fill", {
      backgroundColor: data.color,
      color: "black"
    });
    this.controls.update(data);

    if(data.bpm(1) && document.getElementById("random-key")){
      let keys = "abcdefghijklmnopqrstuvwxyz";
      document.getElementById("random-key").innerHTML = keys.charAt(Math.floor(Math.random() * keys.length)); 
    }

    if(!document.getElementById("btn-start")){
      this.audio.start();
    }
  }
}

export default UI;
