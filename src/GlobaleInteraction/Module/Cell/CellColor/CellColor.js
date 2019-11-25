import Cell from "../Cell";

class CellColor extends Cell {
  constructor({ size, color }) {

    var material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color)
    });
    
    super({ material, size });
  }

  update(data) {

  }

}

export default CellColor;

