import Cell from "../Cell";
import dat from "dat.gui"
import {
  fragment,
  vertex,
  chemical_fragment,
  chemical_vertex
} from "src/assets/dev/reactionDiffusion";
import GPUSim from "src/utils/Canvas3D/GPUSim";

class CellReactionDiffusion extends Cell {
  constructor({ size, renderer, image, reacDiffData }) {
    var textureWidth = 1024;
    var textureHeight = 1024;
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
    console.log(this.reacDiffData)
    this.material2 = new THREE.RawShaderMaterial({
      uniforms: {
        inputTexture: { type: "t", value: null },
        pointer: { value: new THREE.Vector2(0.6, 0.6) },
        uDa: { type: "f", value: this.reacDiffData.Da || 1 },
        uDb: { type: "f", value: this.reacDiffData.Db || 0.3 },
        uFeed: { type: "f", value: this.reacDiffData.feed || 0.055 },
        uK: { type: "f", value: this.reacDiffData.k || 0.062 },
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

    var FizzyText = function() {
      this.message = 'lets goo';
      // Define render logic ...
    };

    window.onload = function() {
      var text = new FizzyText();
      var gui = new dat.GUI();
      gui.add(text, 'message');
      gui.add(this.material2.uniforms.uDa, 'value', 0.001, 1.0)
    .name('uDa');
      gui.add(this.material2.uniforms.uDb, 'value', 0.001, 1.)
    .name('uDb');
      gui.add(this.material2.uniforms.uFeed, 'value', 0.001, 0.1)
    .name('uFeed');
      gui.add(this.material2.uniforms.uK, 'value', 0.001, 0.1)
    .name('uK');
     
    }.bind(this);


    this.pass = new GPUSim(renderer, 2048, 2048, this.material2);
    this.pass.render();
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
    this.material2.uniforms.pointer.value = new THREE.Vector2(0.5, 0.7);

    this.material.uniforms.uTime.value = data.time.time;
    this.material.uniforms.uVolume.value = data.volume;
    this.material.uniforms.uChemicals.value = this.pass.fbos[
      this.pass.current
    ].texture;
  }
}

export default CellReactionDiffusion;
