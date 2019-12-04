import Cell from "../Cell";
import { fragment, vertex } from "src/assets/dev/pass";
import GPUSim from "src/utils/Canvas3D/GPUSim";

class CellPass extends Cell {
  constructor({ renderer, image, molecule }) {
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
        ratio: { type: "2f", value: [1, 1] }
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    super({ material, size, molecule });

    this.pass = new GPUSim(renderer, 1024, 1024, this.material);

    this.pass.render();

    this.material2 = new THREE.RawShaderMaterial({
      uniforms: {
        inputTexture: { type: "t", value: null },
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
    // this.texture = texture;
  }

  update(data) {
    this.pass.render();
    this.material.uniforms.uTime.value = data.time.time;
    this.material.uniforms.uVolume.value = data.volume;
  }
}

export default CellPass;
