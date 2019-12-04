import Cell from "../Cell";

class CellColor extends Cell {
  constructor({ size ,molecule}) {

    var material = new THREE.MeshBasicMaterial({
      color: new THREE.Color("red")
    });
    
    super({ material, size,molecule });
  }

  update(data) {
    this.material.color = new THREE.Color(data.color);
    this.material.needUpdate = true;
  }

}

export default CellColor;

