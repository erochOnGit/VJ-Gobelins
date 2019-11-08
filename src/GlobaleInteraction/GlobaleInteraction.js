import Interaction from "../utils/Canvas3D/Interaction";
import Grid from "./Grid";
import CellImage from "./Module/Cell/CellImage";
import image from "src/assets/image/ARP_A_Escalier_01.jpg";

class GlobaleInteraction extends Interaction {
  constructor({ analyser, scenePush }) {
    super();
    this.analyser = analyser;
    this.grid = new Grid();
    scenePush(this.grid.mesh);
    this.cell = new CellImage({image: image});
    this.grid.add(this.cell);
  }
  update() {
    let data = this.analyser.getData();
    this.cell.update(data);
  }
}

export default GlobaleInteraction;
