import Cell from "src/GlobaleInteraction/Module/Cell";
import Molecule from "./Molecule";
class Grid {
  constructor({ getSize }) {
    this.mesh = new THREE.Group();
    this.width = getSize().width > 2000 ? 2000 : getSize().width;
    this.height =
      getSize().height > 1000
        ? 1000
        : (getSize().width * getSize().width) / 2000;
    this.marginH = (getSize().width - this.width) / 2;
    this.marginV = (getSize().height - this.height) / 2;
    this.gravityRegion = 20;

    this.molecules = [];
    //first molecule in the grid
    this.molecules.push(new Molecule());
  }
  add(cell) {
    this.mesh.add(cell.mesh);
  }
  remove() {}
  onResize() {}
  dispatch() {
    //slice
    //instanciate two molecules from the first one
    let axe = "horizontal";
    for (let i = 0; i < 12; i++) {
      this.molecules.forEach(molecule => {
        molecule.split((Math.random() + 1) * 20, axe);
      });
      if (axe == "horizontal") {
        axe = "vertical";
      } else {
        axe == "horizontal";
      }
    }
  }
  update() {}
}

export default Grid;
