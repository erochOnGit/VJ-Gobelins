import Cell from "../Cell";
import { fragment, vertex }  from "src/assets/dev/template";

class CellImage extends Cell {
  constructor({image}) {
    let textureLoader = new THREE.TextureLoader();
    var material = new THREE.RawShaderMaterial( {
      uniforms:{
        uSampler: { type: "t", value: textureLoader.load(image) },
        uTime: { type: "1f", value: 0 },
        uVolume: { type: "1f", value: 0 },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    super({material: material});
  }
  update(data) {
    this.material.uniforms.uTime.value = data.time.time;
    this.material.uniforms.uVolume.value = data.volume;
  }
}

export default CellImage;
