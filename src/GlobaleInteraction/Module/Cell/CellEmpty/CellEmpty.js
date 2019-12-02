import Cell from "../Cell";

class CellEmpty extends Cell {
  constructor({ size }) {
    var material = new THREE.MeshBasicMaterial({
      opacity: 0,
      alphaTest: 1
    });
    super({ material, size, noBackground: true });
  }

  update(data) {}
}

export default CellEmpty;
