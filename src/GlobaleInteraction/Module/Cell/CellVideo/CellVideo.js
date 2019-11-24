import Cell from "../Cell";
import { fragment, vertex }  from "src/assets/dev/boomboom";


class CellVideo extends Cell {
  constructor({url, shader, size}) {

    var video = document.createElement("video");
    video.style.display = "none";
    video.src = url;
    video.volume = 0.0001;
    video.loop = true;
    video.autoplay = true;

    document.body.append(video);

    var texture = new THREE.VideoTexture( video );
    
    var material = new THREE.RawShaderMaterial( {
      uniforms:{
        uSampler: { type: "t", value: texture },
        uTime: { type: "1f", value: 0 },
        uVolume: { type: "1f", value: 0 },
        uIntensity: { type: "1f", value: 0 },
        uDifference: { type: "1f", value: 0 },
        ratio: {type: "2f", value: [1,1] },
      },
      vertexShader: shader.vertex,
      fragmentShader: shader.fragment,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    super({material, size});
    this.texture = texture;
    this.video = video;
    this.video.onloadeddata = () => this.updateRatio();

  }

  update(data) {
    this.material.uniforms.uTime.value = data.time.time;
    this.material.uniforms.uVolume.value = data.volume;
    this.material.uniforms.uIntensity.value = data.intensity;
    this.material.uniforms.uDifference.value = data.difference;
  }

  updateRatio(){
    if(this.texture.image != undefined){

      let px = this.size.y/this.size.x;
      let py = this.size.x/this.size.y;

      let tx = this.video.videoWidth/ this.video.videoHeight;
      let ty = this.video.videoHeight/ this.video.videoWidth;

      let x = py * ty;
      let y = px * tx;

      if (y < 1) {
        this.material.uniforms.ratio.value = [1, y];
      } else {
        this.material.uniforms.ratio.value = [x, 1];
      }
    }  
  }

}

export default CellVideo;
