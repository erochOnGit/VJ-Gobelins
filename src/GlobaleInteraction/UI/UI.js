import CellDomElement from "src/GlobaleInteraction/Module/Cell/CellDomElement";
import Controls from "./Controls";
import tuto1 from "src/assets/tuto/module_tuto_01.webm";
import tuto2 from "src/assets/tuto/module_tuto_02.webm";

class UI {
    constructor({ grid, audio, camera }) {
        this.grid = grid;
        this.controls = new Controls({ audio: audio, ui: this });
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

        this.createCell({
            topLeftPos: new THREE.Vector2(-10, 3), size: new THREE.Vector2(2, 7), cellData: {
                type: "dom"
            }
        });

        this.createCell({
            topLeftPos: new THREE.Vector2(-6, 3), size: new THREE.Vector2(3, 1), cellData: {
                type: "dom"
            }
        });
        this.createCell({
            topLeftPos: new THREE.Vector2(-6, 2), size: new THREE.Vector2(3, 6), cellData: {
                type: "dom"
            }
        });

        this.createCell({
            topLeftPos: new THREE.Vector2(-3, 3), size: new THREE.Vector2(3, 1), cellData: {
                type: "dom"
            }
        });
        this.createCell({
            topLeftPos: new THREE.Vector2(-3, 2), size: new THREE.Vector2(3, 6), cellData: {
                type: "dom"
            }
        });

        this.createCell({
            topLeftPos: new THREE.Vector2(0, 3), size: new THREE.Vector2(7, 1), cellData: {
                type: "dom"
            }
        });
        this.createCell({
            topLeftPos: new THREE.Vector2(0, 2), size: new THREE.Vector2(7, 6), cellData: {
                type: "dom"
            }
        });

        this.createCell({
            topLeftPos: new THREE.Vector2(10, 5), size: new THREE.Vector2(1, 1), cellData: {
                type: "dom"
            }
        });
    }

    homeLayout() {
        this.grid.clear();
        this.grid.autocut = false;

        this.createCell({ topLeftPos: new THREE.Vector2(-9, 5), size: new THREE.Vector2(18, 2),cellData: {
            type: "dom",
            html: `<p class="ui-color-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>`
        } });

        this.createCell({ topLeftPos: new THREE.Vector2(-9, 2), size: new THREE.Vector2(8, 1),cellData: {
            type: "dom",
            html: `<h3 class="ui-color-fill">Click to change effects</h3>`
        } });
        this.createCell({ topLeftPos: new THREE.Vector2(-9, 1), size: new THREE.Vector2(8, 4),cellData: {
            type: "motion",
            url: tuto1
        } });

        this.createCell({ topLeftPos: new THREE.Vector2(1, 2), size: new THREE.Vector2(8, 1),cellData: {
            type: "dom",
            html: `<h3 class="ui-color-fill">Slice the grid</h3>`
        } });
        this.createCell({ topLeftPos: new THREE.Vector2(1, 1), size: new THREE.Vector2(8, 4),cellData: {
            type: "motion",
            url: tuto2
        } });

        this.createCell({ topLeftPos: new THREE.Vector2(-9, -4), size: new THREE.Vector2(18, 1),cellData: {
            type: "dom",
            html: `<button id="btn-tunein" class="ui-color-fill">Tune in</button>`
        } });

        document.getElementById("btn-tunein").onclick = ()=>{
            this.grid.reset();
            this.grid.autocut = true;
        }
    }

    createCell({ topLeftPos, size, cellData }) {
        this.grid.createMolecule({ topLeftPos: topLeftPos, size: size, cellData });
    }

    update(data) {
        TweenMax.set(".ui-color-text", {
            color: data.color
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