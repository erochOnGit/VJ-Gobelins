import Interaction from "../utils/Canvas3D/Interaction";
import Grid from "./Grid";
import OffGrid from "./OffGrid";

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

    scenePush(this.grid.mesh);

    //  scenePush(this.grid2.mesh);

    //   //this.cell = new CellImage({image: image});
    //   this.cell = new CellVideo({url: url, shader: shader1});
    //  // this.grid.add(this.cell);
    //   scenePush(this.cell.mesh);
  }

  update() {
    let data = this.analyser.getData();
    this.grid.update(data);
    /// this.grid2.update(data);
  }
}

export default GlobaleInteraction;
