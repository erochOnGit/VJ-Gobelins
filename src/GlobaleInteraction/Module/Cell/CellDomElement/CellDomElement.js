import Cell from "../Cell";


class CellDomElement extends Cell {
  constructor({size}) {

    var dom = document.createElement("dom");
    
    var material = new THREE.MeshBasicMaterial({
      color: THREE.Color("red")
    });

    super({material, size});
    this.texture = texture;
    this.dom = dom;
  }

  update(data) {
    super.update(data);
  }

  updateRatio(){

  }

  destroy(){
    this.dom.remove();
    super.destroy();
  }

}

export default CellDomElement;
