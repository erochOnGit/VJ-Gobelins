import Interaction from "../utils/Canvas3D/Interaction";
import Grid from "./Grid";
import CellImage from "./Module/Cell/CellImage";

class GlobaleInteraction extends Interaction {
  constructor({ scenePush, getSize }) {
    super();
    this.grid = new Grid({ getSize });
    scenePush(this.grid.mesh);

    let cell = new CellImage();
    this.grid.add(cell);
  }
  update() {}
}

export default GlobaleInteraction;
