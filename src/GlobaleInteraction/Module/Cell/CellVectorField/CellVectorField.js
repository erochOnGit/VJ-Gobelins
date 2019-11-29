import Cell from "../Cell";
import dat from "dat.gui";
import {
  chemical_fragment,
  chemical_vertex
} from "src/assets/dev/reactionDiffusion";
import {
  fragment,
  vertex,
  fragment_copy,
  vertex_copy
} from "src/assets/dev/vectorField";
import GPUSim from "src/utils/Canvas3D/GPUSim";

class CellVectorField extends Cell {
  constructor({ size, renderer, image, reacDiffData }) {
    var textureWidth = size.x * 100;
    var textureHeight = size.y * 100;

    let material = new THREE.RawShaderMaterial({
      uniforms: {
        inputTexture: { type: "t", value: null },
        uChemicals: { type: "t", value: null },
        uTime: { type: "1f", value: 0 },
        uVolume: { type: "1f", value: 0 },
        ratio: { type: "2f", value: [1, 1] }
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    super({ size, material });

    this.reacDiffData = reacDiffData || {};

    this.material2 = new THREE.RawShaderMaterial({
      uniforms: {
        inputTexture: { type: "t", value: null },
        pointer: { value: new THREE.Vector2(0.3, 0.51) },
        uTime: { type: "1f", value: 0 }
      },
      vertexShader: vertex_copy,
      fragmentShader: fragment_copy,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    this.pass = new GPUSim(
      renderer,
      textureWidth,
      textureHeight,
      this.material2
    );
    for (let i = 0; i < 10; i++) {
      this.pass.render();
    }
  }

  update(data) {}
}

export default CellVectorField;
