import Cell from "../Cell";
import { fragment, vertex }  from "src/assets/dev/template";

class CellImage extends Cell {
  constructor() {
    var material = new THREE.RawShaderMaterial( {
      vertexShader: vertex,
      fragmentShader: fragment,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    super({material: material});
  }
  update() {}
}

export default CellImage;
