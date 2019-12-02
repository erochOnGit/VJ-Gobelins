import Cell from "../Cell";

class CellEmpty extends Cell {
  constructor({ size, molecule }) {
    var material = new THREE.MeshBasicMaterial({
      opacity: 0,
      alphaTest: 1
    });
    super({ material, size, noBackground: true, molecule });
  }

  update(data) {}
}

export default CellEmpty;
