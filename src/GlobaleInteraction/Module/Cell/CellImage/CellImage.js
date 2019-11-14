import Cell from "../Cell";
import { fragment, vertex }  from "src/assets/dev/template";

class CellImage extends Cell {
  constructor({image}) {
    let textureLoader = new THREE.TextureLoader();

    var texture = textureLoader.load(image,(texture)=>{
      this.updateRatio();
      texture.minFilter = THREE.LinearFilter;
    });
    
    var material = new THREE.RawShaderMaterial( {
      uniforms:{
        uSampler: { type: "t", value: texture },
        uTime: { type: "1f", value: 0 },
        uVolume: { type: "1f", value: 0 },
        ratio: {type: "2f", value: [1,1] },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    super({material: material});
    this.texture = texture;
  }

  update(data) {
    this.material.uniforms.uTime.value = data.time.time;
    this.material.uniforms.uVolume.value = data.volume;
  }

  updateRatio(){
    if(this.texture.image != undefined){

      let px = this.size.y/this.size.x;
      let py = this.size.x/this.size.y;

      let tx = this.texture.image.width/this.texture.image.height;
      let ty = this.texture.image.height/this.texture.image.width;

      if((this.texture.width > this.texture.height && this.size.x > this.size.y) || (this.texture.image.width < this.texture.image.height && this.size.x > this.size.y)){
        this.material.uniforms.ratio.value = [1, px * tx];
      }else{
        this.material.uniforms.ratio.value = [py * ty, 1];
      }
    }  
  }
}

export default CellImage;
