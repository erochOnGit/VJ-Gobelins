import Cell from "../Cell";
import shader from "src/assets/dev/splitscan";


class CellSplitscan extends Cell {
  constructor({url, size}) {

    var delay = 0;
    function createVideo(){
      var video = document.createElement("video");
      video.style.display = "none";
      video.src = url;
      video.volume = 0.0001;
      video.loop = true;
      video.autoplay = true;
      video.currentTime = delay;
      document.body.append(video);
      delay += 0.03;
      return video;
    }

    var video1 = createVideo();
    var video2 = createVideo();
    var video3 = createVideo();
    var video4 = createVideo();
    var video5 = createVideo();
    var video6 = createVideo();
    var video7 = createVideo();
    var video8 = createVideo();
    var video9 = createVideo();
    var video10 = createVideo();
    
    var texture1 = new THREE.VideoTexture( video1 );
    var texture2 = new THREE.VideoTexture( video2 );
    var texture3 = new THREE.VideoTexture( video3 );
    var texture4 = new THREE.VideoTexture( video4 );
    var texture5 = new THREE.VideoTexture( video5 );
    var texture6 = new THREE.VideoTexture( video6 );
    var texture7 = new THREE.VideoTexture( video7 );
    var texture8 = new THREE.VideoTexture( video8 ); 
    var texture9 = new THREE.VideoTexture( video9 );
    var texture10 = new THREE.VideoTexture( video10 );
    
    var material = new THREE.RawShaderMaterial( {
      uniforms:{
        uSampler1: { type: "t", value: texture1 },
        uSampler2: { type: "t", value: texture2 },
        uSampler3: { type: "t", value: texture3 },
        uSampler4: { type: "t", value: texture4 },
        uSampler5: { type: "t", value: texture5 },
        uSampler6: { type: "t", value: texture6 },
        uSampler7: { type: "t", value: texture7 },
        uSampler8: { type: "t", value: texture8 },
        uSampler9: { type: "t", value: texture9 },
        uSampler10: { type: "t", value: texture10 },
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
    this.texture = texture1;
    //this.texture2 = texture2;

  }

  update(data) {
    this.material.uniforms.uTime.value = data.time.time;
    this.material.uniforms.uVolume.value = data.volume;
    this.material.uniforms.uIntensity.value = data.intensity;
    this.material.uniforms.uDifference.value = data.difference;
  }

  updateRatio(){
    let px = this.size.y / this.size.x;
    let py = this.size.x / this.size.y;

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

  destroy(){
  //  this.video.remove();
    super.destroy();
  }

}

export default CellSplitscan;
