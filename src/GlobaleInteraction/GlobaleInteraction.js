import Interaction from "../utils/Canvas3D/Interaction";
import Grid from "./Grid";
import Controls from "./UI/Controls";
import OffGrid from "./OffGrid";
import { TweenMax } from "gsap";

class GlobaleInteraction extends Interaction {
  constructor({ analyser, scenePush, getSize, renderer, camera }) {
    super();
    this.analyser = analyser;
    this.grid = new Grid({ camera, renderer, getSize });
    this.controls = new Controls({audio: analyser.audio});

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
    this.controls.update(data);
    
    TweenMax.set(".color",{color: data.color, borderColor: data.color, stroke: data.color});
    TweenMax.set(".color--inverted",{ backgroundColor: data.color, color: "black" });
   /// this.grid2.update(data);
  }
}

export default GlobaleInteraction;
