import Cell from "src/GlobaleInteraction/Module/Cell";
import CellImage from "src/GlobaleInteraction/Module/Cell/CellImage";
import CellPass from "src/GlobaleInteraction/Module/Cell/CellPass";
import image from "src/assets/image/ARP_A_Escalier_01.jpg";
import Molecule from "./Molecule";
class Grid {
  constructor({ renderer, getSize }) {
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
    this.molecules.push(
      new Molecule({
        width: 20,
        height: 10,
        renderer: renderer
      })
    );
    this.molecules.forEach(mol => {
      this.mesh.add(mol.cell.mesh);
    });
    this.cellQueue = [];
    window.addEventListener("keydown", e => {
      if (e.keyCode == 65) {
        this.dispatch({ count: 1 });
      }
    });
    this.axe = "horizontal";
  }
  add(cell) {
    this.cellQueue.push(cell);
  }
  remove() { }
  onResize() { }
  getVerticalIntersectedMolecule(cuttingPoint) {
    let intersect = [];
    this.molecules.forEach((molecule, index) => {
      if (
        molecule.getEdgesPos().bottom < cuttingPoint &&
        molecule.getEdgesPos().bottom + molecule.height > cuttingPoint
      ) {
        intersect.push({ molecule: molecule, index: index });
      }
    });
    return intersect[Math.floor(Math.random() * intersect.length)];
  }
  getHorizontalIntersectedMolecule(cuttingPoint) {
    let intersect = [];

    this.molecules.forEach((molecule, index) => {
      if (
        this.axe == "horizontal" &&
        molecule.getEdgesPos().left < cuttingPoint &&
        molecule.getEdgesPos().left + molecule.width > cuttingPoint
      ) {
        intersect.push({ molecule: molecule, index: index });
      }
    });

    return intersect[Math.floor(Math.random() * intersect.length)];
  }
  dispatch({ count }) {
    //slice
    //instanciate two molecules from the first one
    for (let i = 0; i < count; i++) {
      let cuttingPoint = Math.round(Math.random() * 10) - 5;
      if (this.axe == "horizontal") {
        let intersectedMol = this.getHorizontalIntersectedMolecule(
          cuttingPoint
        );
        if (intersectedMol) {
          let molSplitting = intersectedMol.molecule.splitHorizontal(
            cuttingPoint
          );
          this.molecules.splice(
            intersectedMol.index,
            1,
            molSplitting[0],
            molSplitting[1]
          );
          this.mesh.children.splice(
            intersectedMol.index,
            1,
            molSplitting[0].cell.mesh,
            molSplitting[1].cell.mesh
          );
        }
        this.axe = "vertical";
      } else {
        let intersectedMol = this.getVerticalIntersectedMolecule(cuttingPoint);
        if (intersectedMol) {
          let molSplitting = intersectedMol.molecule.splitVertical(
            cuttingPoint
          );
          this.molecules.splice(
            intersectedMol.index,
            1,
            molSplitting[0],
            molSplitting[1]
          );
          this.mesh.children.splice(
            intersectedMol.index,
            1,
            molSplitting[0].cell.mesh,
            molSplitting[1].cell.mesh
          );
        }
        this.axe = "horizontal";
      }
    }
  }
  update(data) {
    for (let i = 0; i < this.molecules.length; i++) {
      this.molecules[i].update(data);
    }
  }
}

export default Grid;
