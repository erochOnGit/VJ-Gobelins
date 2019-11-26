import Cell from "../Cell";

class CellEmpty extends Cell {
  constructor({ size }) {

    var material = new THREE.MeshBasicMaterial({
      opacity:0,
      alphaTest: 1,
    });
    
    super({ material, size });
  }

  update(data) {

  }

}

export default CellEmpty;
