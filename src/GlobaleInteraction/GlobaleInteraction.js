import Interaction from "../utils/Canvas3D/Interaction";
import Grid from "./Grid";

class GlobaleInteraction extends Interaction {
  constructor({ analyser, scenePush, getSize, renderer }) {
    super();
    this.analyser = analyser;
    this.grid = new Grid({ renderer, getSize });

    scenePush(this.grid.mesh);

  //   //this.cell = new CellImage({image: image});
  //   this.cell = new CellVideo({url: url, shader: shader1});
  //  // this.grid.add(this.cell);
  //   scenePush(this.cell.mesh);
  }

  update() {
    let data = this.analyser.getData();
    this.grid.update(data);
  }
}

export default GlobaleInteraction;
