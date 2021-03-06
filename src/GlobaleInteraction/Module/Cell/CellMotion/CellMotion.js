import Cell from "../Cell";
import shader from "src/assets/dev/motion";

class CellMotion extends Cell {
  constructor({ url, size, molecule }) {
    var video = document.createElement("video");
    video.style.display = "none";
    video.src = url;
    video.volume = 0.0001;
    video.loop = true;
    video.autoplay = true;

    document.body.append(video);

    var texture = new THREE.VideoTexture(video);

    var material = new THREE.RawShaderMaterial({
      uniforms: {
        uSampler: { type: "t", value: texture },
        uColor: { type: "c", value: new THREE.Color("white") },
        ratio: { type: "2f", value: [1, 1] }
      },
      vertexShader: shader.vertex,
      fragmentShader: shader.fragment,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    super({ material, size, molecule });
    this.texture = texture;
    this.video = video;
    this.video.onloadeddata = () => this.updateRatio();
  }

  update(data) {
    super.update(data);
    this.material.uniforms.uColor.value = new THREE.Color(data.color);
  }

  updateRatio() {
    let px = this.getCurrentSize().y / this.getCurrentSize().x;
    let py = this.getCurrentSize().x / this.getCurrentSize().y;

    let tx = this.video.videoWidth / this.video.videoHeight;
    let ty = this.video.videoHeight / this.video.videoWidth;

    let x = py * ty;
    let y = px * tx;

    if (y < 1) {
      this.material.uniforms.ratio.value = [1, y];
    } else {
      this.material.uniforms.ratio.value = [x, 1];
    }
  }

  tweenMaxUpdate(){
    this.updateRatio();
  }

  destroy() {
    this.video.remove();
    super.destroy();
  }
}

export default CellMotion;
