import Cell from "../Cell";
import {
  fragment,
  vertex,
  chemical_fragment,
  chemical_vertex
} from "src/assets/dev/reactionDiffusion";
import GPUSim from "src/utils/Canvas3D/GPUSim";

class CellReactionDiffusion extends Cell {
  constructor({ renderer, image }) {
    // let textureLoader = new THREE.TextureLoader();

    // var texture = textureLoader.load(image,(texture)=>{
    //   this.updateRatio();
    //   texture.minFilter = THREE.LinearFilter;
    // });

    var textureWidth = 1024;
    var textureHeight = 1024;
    // var data = this.getRandomData(textureWidth, textureHeight, 1024);

    // var positions = new THREE.DataTexture(
    //   data,
    //   textureWidth,
    //   textureHeight,
    //   THREE.RGBFormat,
    //   THREE.FloatType
    // );

    // positions.needsUpdate = true;

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

    super({ material: material });

    this.material2 = new THREE.RawShaderMaterial({
      uniforms: {
        inputTexture: { type: "t", value: null },
        // initTexture:{type:"t", value: positions},
        pointer: { value: new THREE.Vector2(0.6, 0.6) },
        uTime: { type: "1f", value: 0 },
        uVolume: { type: "1f", value: 0 },
        ratio: { type: "2f", value: [1, 1] }
      },
      vertexShader: chemical_vertex,
      fragmentShader: chemical_fragment,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    this.pass = new GPUSim(renderer, 1024, 1024, this.material2);
    this.pass.render();
    this.material2.uniforms.pointer.value = new THREE.Vector2(0.5, 0.5);
    // this.texture = texture;
  }
  getRandomData(width, height, size) {
    var len = width * height * 3;
    var data = new Float32Array(len);
    while (len--) data[len] = (Math.random() - 0.5) * size;
    return data;
  }
  updatePointer(pos) {
    let x = pos.x + 0.5;
    let y = pos.y + 0.5;
    this.material2.uniforms.pointer.value = new THREE.Vector2(x, y);
  }
  update(data) {
    for (let i = 0; i < 10; i++) {
      this.pass.render();
    }
    
    this.material.uniforms.uTime.value = data.time.time;
    this.material.uniforms.uVolume.value = data.volume;
    this.material.uniforms.uChemicals.value = this.pass.fbos[
      this.pass.current
    ].texture;
  }

  updateRatio() {
    if (this.texture.image != undefined) {
      let px = this.size.y / this.size.x;
      let py = this.size.x / this.size.y;

      let tx = this.texture.image.width / this.texture.image.height;
      let ty = this.texture.image.height / this.texture.image.width;

      if (
        (this.texture.width > this.texture.height &&
          this.size.x > this.size.y) ||
        (this.texture.image.width < this.texture.image.height &&
          this.size.x > this.size.y)
      ) {
        this.material.uniforms.ratio.value = [1, px * tx];
      } else {
        this.material.uniforms.ratio.value = [py * ty, 1];
      }
    }
  }
}

export default CellReactionDiffusion;
