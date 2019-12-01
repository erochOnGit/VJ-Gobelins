import Interaction from "../utils/Canvas3D/Interaction";
import Grid from "./Grid";
import UI from "./UI";
import OffGrid from "./OffGrid";
import Stats from "stats.js";

class GlobaleInteraction extends Interaction {
  constructor({
    analyser,
    scenePush,
    renderer,
    camera,
    mouse,
    raycaster,
    scene
  }) {
    super();
    this.analyser = analyser;
    this.grid = new Grid({
      renderer,
      camera,
      mouse,
      raycaster,
      scene
    });
    this.UI = new UI({grid:this.grid, audio: this.analyser.audio, camera});
    this.stats = new Stats();
    this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( this.stats.dom );
    scenePush(this.grid.mesh);

    //  scenePush(this.grid2.mesh);

    //   //this.cell = new CellImage({image: image});
    //   this.cell = new CellVideo({url: url, shader: shader1});
    //  // this.grid.add(this.cell);
    //   scenePush(this.cell.mesh);
  }

  update() {
    this.stats.begin();
    let data = this.analyser.getData();
    this.grid.update(data);
    this.UI.update(data);
    this.stats.end()
    /// this.grid2.update(data);
  }
}

export default GlobaleInteraction;
