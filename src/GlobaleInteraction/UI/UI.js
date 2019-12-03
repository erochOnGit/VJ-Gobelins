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
    window.addEventListener("keyup", e => {
      if (e.keyCode == 86) {
        this.homeLayout();
      }
    });

    this.homeLayout();
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
        html: `<p class="ui-color-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>`
      }
    });

    this.createCell({
      topLeftPos: new THREE.Vector2(-9, 2),
      size: new THREE.Vector2(8, 1),
      cellData: {
        type: "dom",
        html: `<h3 class="ui-color-fill">Click to change effects</h3>`
      }
    });
    this.createCell({
      topLeftPos: new THREE.Vector2(-9, 1),
      size: new THREE.Vector2(8, 4),
      cellData: {
        type: "motion",
        url: tuto1
      }
    });

    this.createCell({
      topLeftPos: new THREE.Vector2(1, 2),
      size: new THREE.Vector2(8, 1),
      cellData: {
        type: "dom",
        html: `<h3 class="ui-color-fill">Slice the grid</h3>`
      }
    });
    this.createCell({
      topLeftPos: new THREE.Vector2(1, 1),
      size: new THREE.Vector2(8, 4),
      cellData: {
        type: "motion",
        url: tuto2
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
  }
}

export default UI;
