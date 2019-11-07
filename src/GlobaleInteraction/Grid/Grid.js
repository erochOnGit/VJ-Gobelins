import Cell from "src/GlobaleInteraction/Module/Cell";

class Grid {
  constructor() {
    this.mesh = new THREE.Group();
  }
  add(cell) {
    this.mesh.add(cell.mesh);
  }
  remove() {}

  update() {}
}

export default Grid;
