import Cell from "../Cell";
import { chemicalFragment, fragment, vertex } from "src/assets/dev/reactionDiffusion";
import GPUSim from "src/utils/Canvas3D/GPUSim";

class CellReactionDiffusion extends Cell {
  constructor({ size, renderer, image }) {
    // let textureLoader = new THREE.TextureLoader();

    // var texture = textureLoader.load(image,(texture)=>{
    //   this.updateRatio();
    //   texture.minFilter = THREE.LinearFilter;
    // });

    let material = new THREE.RawShaderMaterial({
      uniforms: {
        inputTexture: { type: "t", value: null },
        uTime: { type: "1f", value: 0 },
        uVolume: { type: "1f", value: 0 },
        uChemicals: { type: "t", value: null },
        ratio: { type: "2f", value: [1, 1] }
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    super({ size, material });

    this.material2 = new THREE.RawShaderMaterial({
      uniforms: {
        inputTexture: { type: "t", value: null },
        uTime: { type: "1f", value: 0 },
        uVolume: { type: "1f", value: 0 },
        ratio: { type: "2f", value: [1, 1] },
        pointer: {value: new THREE.Vector2(0.6,0.6)}
      },
      vertexShader: vertex,
      fragmentShader: chemicalFragment,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    this.pass = new GPUSim(renderer, 1024, 1024, this.material2);
    
    this.pass.render();
    this.material2.uniforms.pointer.value = new THREE.Vector2(0.5,0.5);
    // this.texture = texture;
  }

  update(data) {
    this.pass.render();
    this.material.uniforms.uTime.value = data.time.time;
    this.material.uniforms.uVolume.value = data.volume;
    this.material.uniforms.uChemicals.value = this.pass.fbos[
      this.pass.current
    ].texture;
  }
}

export default CellReactionDiffusion;
