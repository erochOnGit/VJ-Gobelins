import Molecule from "./Molecule";
import gridMouseDown from "./gridMouseDown/gridMouseDown";
import gridMouseUp from "./gridMouseUp/gridMouseUp";
import gridDrag from "./gridDrag";
import GridBackground from "./GridBackground";

class Grid {
  constructor({ renderer, camera, mouse, raycaster, scene }) {
    this.mesh = new THREE.Group();
    this.scene = scene;
    this.camera = camera;
    this.mouse = mouse;
    this.raycaster = raycaster;
    this.width = 20;
    this.height = 10;
    /**
     * interesect pannel
     */
    var geometry = new THREE.PlaneBufferGeometry(100, 20, 32);
    var material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.DoubleSide
    });
    this.interactionPlane = new THREE.Mesh(geometry, material);
    this.interactionPlane.updateMatrix();
    this.interactionPlane.position.set(0, 0, -5);
    this.interactionPlane.rotation.x = Math.PI;
    this.interactionPlane.geometry.normalsNeedUpdate = true;
    this.scene.add(this.interactionPlane);

    /**
     * grid background
     */
    this.gridBackground = new GridBackground({});
    this.scene.add(this.gridBackground.mesh);

    this.molecules = [];

    this.axe = "horizontal";
    this.renderer = renderer;
    window.addEventListener("keyup", e => {
      if (e.keyCode == 65) {
        this.reset();
      }
      if (e.keyCode == 90) {
        this.dispatch({ count: 1 });
      }
      if (e.keyCode == 82) {
        this.sliceHorizontal({
          cuttingPoint: Math.round(Math.random() * 10) - 5,
          direction: "right"
        });
      }
      if (e.keyCode == 84) {
        this.sliceVertical({
          cuttingPoint: Math.round(Math.random() * 10) - 5,
          direction: "top"
        });
      }
    });
    this.autocut = false;
    this.originSlice = { x: null, y: null };
    this.pointer = null;
    this.dragEvent = gridDrag.bind(this)();
    window.addEventListener("mousedown", gridMouseDown.bind(this)());
    window.addEventListener("mouseup", gridMouseUp.bind(this)());
    //this.reset();
  }

  clear() {
    let array = [...this.molecules];
    for (let i = 0; i < array.length; i++) {
      this.remove(array[i]);
    }
  }

  reset() {
    this.clear();
    console.log("reset",this.mesh);
    this.molecules.push(
      new Molecule({
        width: 20,
        height: 10,
        renderer: this.renderer,
        camera: this.camera,
        gridMesh: this.mesh
      })
    );

    this.molecules.forEach(mol => {});
    //this.dispatch({ count: 20 });
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
      } else if (
        direction == "bottom" &&
        molecule.getEdgesPos().bottom < cuttingPoint
      ) {
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
      if (direction == "right" && molecule.getEdgesPos().right > cuttingPoint) {
        molecule.resizeHorizontal({ direction: -1, cuttingPoint });
      } else if (
        direction == "left" &&
        molecule.getEdgesPos().left < cuttingPoint
      ) {
        molecule.resizeHorizontal({ direction: 1, cuttingPoint });
      }
    });
  }

  createMolecule({ topLeftPos, size, cellData }) {
    let newMolecule = new Molecule({
      posX: topLeftPos.x + size.x / 2,
      posY: topLeftPos.y - size.y / 2,
      width: size.x,
      height: size.y,
      renderer: this.renderer,
      camera: this.camera,
      cellData,
      gridMesh: this.mesh
    });

    this.molecules.push(newMolecule);
  }

  update(data) {
    if (data.bpm(0) && this.autocut) {
      if (this.molecules.length < 15) {
        this.dispatch({ count: 1 + Math.floor(Math.random() * 2) });
      } else {
        this.reset();
      }
    }

    this.gridBackground.update(data);

    for (let i = 0; i < this.molecules.length; i++) {
      this.molecules[i].update(data);
    }
  }
}

export default Grid;
