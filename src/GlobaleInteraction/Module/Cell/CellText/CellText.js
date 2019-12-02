import Cell from "../Cell";


class CellText extends Cell {
  constructor({size}) {

    var canvas = document.createElement("canvas");
    canvas.height = 128 * size.y;
    canvas.width = 128 * size.x;




    document.body.append(canvas);

    var texture = new THREE.CanvasTexture(canvas);
    
    var material = new THREE.MeshBasicMaterial({
      map: texture
    });

    super({material, size});
    this.texture = texture;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  update(data) {
    super.update(data);

    this.ctx.clearRect(0,0,1024,1024);
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, 1024, 1024);
    this.ctx.fillStyle = "black";
    let text = ((Math.sin(this.lifetime) + 1.0)/2.0) * 800 + ' 48px WASA';
    this.ctx.font = text;
    this.ctx.fillText('Hello world', 50, 100);
    this.texture.needsUpdate = true
  }

  updateRatio(){

  }

  destroy(){
    this.canvas.remove();
    super.destroy();
  }

}

export default CellText;
