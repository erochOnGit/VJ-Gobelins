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
    console.log("grid" , renderer)
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
  // mouseClickHandler(canvasThis) {
  //   let onMouseClick = event => {
  //     window.onmousemove = this.mouseClickHandler(canvasThis).bind(canvasThis);
  //     canvasThis.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  //     canvasThis.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  //     canvasThis.raycaster.setFromCamera(canvasThis.mouse, canvasThis.camera);
  //     canvasThis.intersects = canvasThis.raycaster.intersectObjects(
  //       canvasThis.scene.children
  //     );
  //     let ink = this.objects.filter(obj => {
  //       return obj instanceof InkSpreading;
  //     });
  //     for (var i = 0; i < canvasThis.intersects.length; i++) {
  //       for (let j = 0; j < ink.length; j++) {
  //         if (ink[j] && canvasThis.intersects[i].object.uuid == ink[j].id) {
  //           ink[j].updatePointer(canvasThis.intersects[i].point);
  //         }
  //       }
  //     }
  //     canvasThis.intersects = [];
  //   };
  //   return onMouseClick;
  // }
  update(data) {
    for (let i = 0; i < this.molecules.length; i++) {
      this.molecules[i].update(data);
    }
  }
}

export default Grid;
