import Interaction from "../utils/Canvas3D/Interaction";
import Grid from "./Grid";
import CellImage from "./Module/Cell/CellImage";
import CellVideo from "./Module/Cell/CellVideo";
import shader1  from "src/assets/dev/template";
import shader2  from "src/assets/dev/boomboom";
import image from "src/assets/image/ARP_B_Immeuble_01.jpg";
import url from "src/assets/video/ARV_A_Vieux_02.webm";

class GlobaleInteraction extends Interaction {
  constructor({ analyser, scenePush, getSize }) {
    super();
    this.analyser = analyser;
  //  this.grid = new Grid({ getSize });

   // scenePush(this.grid.mesh);

    //this.cell = new CellImage({image: image});
    this.cell = new CellVideo({url: url, shader: shader1});
   // this.grid.add(this.cell);
    scenePush(this.cell.mesh);
  }

  update() {
    let data = this.analyser.getData();
    this.cell.update(data);
  }
}

export default GlobaleInteraction;
