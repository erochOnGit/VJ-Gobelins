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
    this.molecules.push(new Molecule({ width: 20, height: 10 }));
    this.molecules.forEach(mol => {
      this.mesh.add(mol.mesh);
    });
    this.cellQueue = [];
    window.addEventListener("keydown", e => {
      if (e.keyCode == 65) {

        this.dispatch({count: 1})
      }
    });
  }
  add(cell) {
    this.cellQueue.push(cell);
  }
  remove() {}
  onResize() {}
  dispatch({ count }) {
    //slice
    //instanciate two molecules from the first one
    let axe = "horizontal";
    console.log(count)
    for (let i = 0; i < count; i++) {
      console.log("im' here")
      this.molecules.forEach((molecule, index) => {
        //console.log(this.mesh.children)
        let molSplitting = molecule.split(10, axe);
        this.molecules.splice(index, 1, molSplitting[0],molSplitting[1]);
        this.mesh.children.splice(index, 1, molSplitting[0].mesh,molSplitting[1].mesh)
      });
      console.log(this.molecules)

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
