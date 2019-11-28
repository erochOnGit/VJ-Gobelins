import Cell from "../Cell";

class CellColor extends Cell {
  constructor({ size }) {

    var material = new THREE.MeshBasicMaterial({
      color: new THREE.Color("red")
    });
    
    super({ material, size });
  }

  update(data) {
    this.material.color = new THREE.Color(data.color);
    this.material.needUpdate = true;
  }

}

export default CellColor;

