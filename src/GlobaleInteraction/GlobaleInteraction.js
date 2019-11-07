import Interaction from "../utils/Canvas3D/Interaction";
import Grid from "./Grid";
import CellImage from "./Module/Cell/CellImage";

class GlobaleInteraction extends Interaction {
  constructor({ scenePush }) {
    super();
    this.grid = new Grid();
    scenePush(this.grid.mesh);

    let cell = new CellImage();
    this.grid.add(cell);
  }
  update() {
    
  }
}

export default GlobaleInteraction;
