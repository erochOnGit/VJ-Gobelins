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

    this.cellQueue = [];
    this.axe = "horizontal";

    window.addEventListener("keyup", e => {
      if (e.keyCode == 65) {
       /* let randMolecule = this.molecules[Math.floor(Math.random() * this.molecules.length)];
        this.remove(randMolecule);*/
        let array = [...this.molecules];
        for(let i =0; i<array.length;i++){
          this.remove(array[i]);
        }
      }
      if (e.keyCode == 69) {
        this.generate(renderer);
      }
    });

    this.generate(renderer);

  }


  generate(renderer){
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

    this.dispatch({ count: 15 });
  }

  add(cell) {
    this.cellQueue.push(cell);
  }

  remove(molecule) { 
    if(molecule){
      molecule.destroy();
      var index = this.molecules.indexOf(molecule);
      if (index > -1) {
        this.molecules.splice(index, 1);
      }
    }
  }

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
      let cuttingPointX = Math.round(Math.random() * 20) - 10;
      let cuttingPointY = Math.round(Math.random() * 10) - 5;
      if (this.axe == "horizontal") {
        let intersectedMol = this.getHorizontalIntersectedMolecule(
          cuttingPointX
        );
        if (intersectedMol) {
          let molSplitting = intersectedMol.molecule.splitHorizontal(
            cuttingPointX
          );

          molSplitting[0].cell.mesh.parent = this.mesh;
          molSplitting[1].cell.mesh.parent = this.mesh;

          this.molecules.splice(
            intersectedMol.index,
            1,
            molSplitting[0],
            molSplitting[1]
          )[0].destroy();
          this.mesh.children.splice(
            intersectedMol.index,
            1,
            molSplitting[0].cell.mesh,
            molSplitting[1].cell.mesh
          );
        }
        this.axe = "vertical";
      } else {
        let intersectedMol = this.getVerticalIntersectedMolecule(cuttingPointY);
        if (intersectedMol) {
          let molSplitting = intersectedMol.molecule.splitVertical(
            cuttingPointY
          );

          molSplitting[0].cell.mesh.parent = this.mesh;
          molSplitting[1].cell.mesh.parent = this.mesh;

          this.molecules.splice(
            intersectedMol.index,
            1,
            molSplitting[0],
            molSplitting[1]
          )[0].destroy();


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
