import Molecule from "./Molecule";
import { cpus } from "os";
import  gridMouseDown from "./gridMouseDown/gridMouseDown"
import  gridMouseUp from "./gridMouseUp/gridMouseUp"

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

    this.axe = "horizontal";
    this.renderer = renderer;
    window.addEventListener("keyup", e => {
      if (e.keyCode == 65) {
        this.reset();
      }
      if (e.keyCode == 90) {
        this.dispatch({ count: 1 + Math.floor(Math.random() * 3) });
      }
      if (e.keyCode == 82) {
        this.sliceHorizontal({ cuttingPoint: Math.round(Math.random() * 10) - 5, direction: "right" });
      }
      if (e.keyCode == 84) {
        this.sliceVertical({ cuttingPoint: Math.round(Math.random() * 10) - 5, direction: "top" });
      }
    });

    this.originSlice = {x:null,y:null};
    this.pointer = null;
    console.dir(this.renderer.domElement)
    this.renderer.domElement.addEventListener("mousedown", gridMouseDown.bind(this)())
    this.renderer.domElement.addEventListener("mouseup", gridMouseUp.bind(this)())

    this.reset();
  }

  reset() {
    let array = [...this.molecules];
    for (let i = 0; i < array.length; i++) {
      this.remove(array[i]);
    }
    this.molecules.push(
      new Molecule({
        width: 20,
        height: 10,
        renderer: this.renderer
      })
    );

    this.molecules.forEach(mol => {
      this.mesh.add(mol.cell.mesh);
    });
    this.dispatch({ count: 20 });
  }

  remove(molecule) {
    if (molecule) {
      molecule.destroy();
      var index = this.molecules.indexOf(molecule);
      if (index > -1) {
        this.molecules.splice(index, 1);
      }
    }
  }

  onResize() {}

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
      let cuttingPointX = Math.round(Math.random() * 20) - 10;
      let cuttingPointY = Math.round(Math.random() * 10) - 5;
      if (this.axe == "horizontal") {
        let intersectedMol = null;
        for (let i = 0; i < 5 && !intersectedMol; i++) {
          cuttingPointX = Math.round(Math.random() * 20) - 10;
          intersectedMol = this.getHorizontalIntersectedMolecule(cuttingPointX);
        }
        if (intersectedMol) {
          let molSplitting = intersectedMol.molecule.splitHorizontal(
            cuttingPointX
          );

          this.molecules
            .splice(
              intersectedMol.index,
              1,
              molSplitting[0],
              molSplitting[1]
            )[0]
            .destroy();

          this.mesh.add(molSplitting[0].cell.mesh);
          this.mesh.add(molSplitting[1].cell.mesh);
        }
        this.axe = "vertical";
      } else {
        let intersectedMol = null;
        for (let i = 0; i < 5 && !intersectedMol; i++) {
          cuttingPointY = Math.round(Math.random() * 10) - 5;
          intersectedMol = intersectedMol = this.getVerticalIntersectedMolecule(
            cuttingPointY
          );
        }
        if (intersectedMol) {
          let molSplitting = intersectedMol.molecule.splitVertical(
            cuttingPointY
          );

          this.molecules
            .splice(
              intersectedMol.index,
              1,
              molSplitting[0],
              molSplitting[1]
            )[0]
            .destroy();

          this.mesh.add(molSplitting[0].cell.mesh);
          this.mesh.add(molSplitting[1].cell.mesh);
        }
        this.axe = "horizontal";
      }
    }
  }
  sliceVertical({ cuttingPoint, direction }) {
    let array = this.molecules.filter(molecule => {
      return direction == "top"
        ? molecule.getEdgesPos().bottom >= cuttingPoint
        : molecule.getEdgesPos().top <= cuttingPoint;
    });
    for (let i = 0; i < array.length; i++) {
      this.remove(array[i]);
    }
    this.molecules.forEach(molecule => {
      if (direction == "top" && molecule.getEdgesPos().top > cuttingPoint) {
          molecule.resizeVertical({ direction: -1, cuttingPoint });
      } else if (direction == "bottom" && molecule.getEdgesPos().bottom < cuttingPoint) {
        molecule.resizeVertical({ direction: 1, cuttingPoint });
      }
    });
  }
  sliceHorizontal({ cuttingPoint, direction }) {
    let array = this.molecules.filter(molecule => {
      return direction == "right"
        ? molecule.getEdgesPos().left >= cuttingPoint
        : molecule.getEdgesPos().right <= cuttingPoint;
    });
    for (let i = 0; i < array.length; i++) {
      this.remove(array[i]);
    }
    this.molecules.forEach(molecule => {
      if (
        direction == "right" &&
        molecule.getEdgesPos().right > cuttingPoint
      ) {
        molecule.resizeHorizontal({ direction: -1, cuttingPoint });
      } else if (direction == "left" && molecule.getEdgesPos().left < cuttingPoint) {
        molecule.resizeHorizontal({ direction: 1, cuttingPoint });
      }
    });
  }
  update(data) {
    // if (data.bpm(8)) {
    //   if (this.molecules.length < 15) {
    //     this.dispatch({ count: 1 + Math.floor(Math.random() * 2) });
    //   } else {
    //     this.reset();
    //   }
    // }

    for (let i = 0; i < this.molecules.length; i++) {
      this.molecules[i].update(data);
    }
  }
}

export default Grid;
