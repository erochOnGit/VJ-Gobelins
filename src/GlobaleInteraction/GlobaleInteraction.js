import Interaction from "../utils/Canvas3D/Interaction";
import Grid from "./Grid";

class GlobaleInteraction extends Interaction {
  constructor({ analyser, scenePush, getSize, renderer }) {
    super();
    this.analyser = analyser;
    this.grid1 = new Grid({ renderer, getSize });
    //this.grid2 = new Grid({ renderer, getSize });

    scenePush(this.grid1.mesh);

  //  scenePush(this.grid2.mesh);

  //   //this.cell = new CellImage({image: image});
  //   this.cell = new CellVideo({url: url, shader: shader1});
  //  // this.grid.add(this.cell);
  //   scenePush(this.cell.mesh);
  }

  update() {
    let data = this.analyser.getData();
    this.grid1.update(data);
   /// this.grid2.update(data);
  }
}

export default GlobaleInteraction;
