import Cell from "../Cell";
import dat from "dat.gui";
import {
  fragment,
  vertex,
  chemical_fragment,
  chemical_vertex
} from "src/assets/dev/reactionDiffusion";
import GPUSim from "src/utils/Canvas3D/GPUSim";

class CellReactionDiffusion extends Cell {
  constructor({ size, renderer, image, reacDiffData, molecule }) {
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

    super({ size, material, molecule });

    this.reacDiffData = reacDiffData || {};

    this.material2 = new THREE.RawShaderMaterial({
      uniforms: {
        inputTexture: { type: "t", value: null },
        pointer: { value: new THREE.Vector2(0.3, 0.51) },
        uDa: { type: "f", value: this.reacDiffData.Da || 1 },
        uDb: { type: "f", value: this.reacDiffData.Db || 0.3 },
        uFeed: { type: "f", value: this.reacDiffData.feed || 0.055 },
        uK: { type: "f", value: this.reacDiffData.k || 0.062 },
        uTime: { type: "1f", value: 0 },
        uVolume: { type: "1f", value: 0 },
        uIntensity: { type: "1f", value: 0 },
        uDifference: { type: "1f", value: 0 },
        uBpmBoolean: { type: "bool", value: false },
        uResolution: { value: new THREE.Vector2(textureWidth, textureHeight) },
        ratio: { type: "2f", value: [1, 1] }
      },
      vertexShader: chemical_vertex,
      fragmentShader: chemical_fragment,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    let x = this.size.y / this.size.x;
    let y = this.size.x / this.size.y;

    if (y < 1) {
      this.material2.uniforms.ratio.value = [1, 1 / y];
    } else {
      this.material2.uniforms.ratio.value = [1 / x, 1];
    }

    // var FizzyText = function() {
    //   this.message = 'lets goo';
    //   // Define render logic ...
    // };

    // window.onload = function() {
    //   var text = new FizzyText();
    //   var gui = new dat.GUI();
    //   gui.add(text, 'message');
    //   gui.add(this.material2.uniforms.uDa, 'value', 0.001, 1.0)
    // .name('uDa');
    //   gui.add(this.material2.uniforms.uDb, 'value', 0.001, 1.)
    // .name('uDb');
    //   gui.add(this.material2.uniforms.uFeed, 'value', 0.001, 0.1)
    // .name('uFeed');
    //   gui.add(this.material2.uniforms.uK, 'value', 0.001, 0.1)
    // .name('uK');

    // }.bind(this);

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
    this.material2.uniforms.pointer.value = new THREE.Vector2(0.5, 0.5);
    this.material2.uniforms.uTime.value = data.time.time;
    this.material2.uniforms.uVolume.value = data.volume;
    this.material2.uniforms.uIntensity.value = data.intensity;
    this.material2.uniforms.uDifference.value = data.difference;
    this.material2.uniforms.uBpmBoolean.value = data.bpm(2);

    this.material.uniforms.uChemicals.value = this.pass.fbos[
      this.pass.current
    ].texture;
  }
}

export default CellReactionDiffusion;
