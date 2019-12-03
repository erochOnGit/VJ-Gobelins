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
    let last3keys = "NULL";
    window.addEventListener("keyup", e => {
      if (e.keyCode == 32) {
        this.autocut = !this.autocut;
      }else if (e.keyCode == 16) {
        this.reset();
      }else{
        this.randomize();
        last3keys += String.fromCharCode(e.keyCode);
        last3keys = last3keys.substr(last3keys.length - 3); 
        if(last3keys){
          window.JUL = true;
        }
      }
    });

    this.bpmSpeed = 4;
    let currentWheel = 4;
    window.addEventListener("wheel",(e)=>{
      currentWheel += Math.sign(e.deltaY) * 0.2;
      if(currentWheel < 1){
        currentWheel = 1;
      }else if(currentWheel > 8){
        currentWheel = 8;
      }
      this.bpmSpeed = Math.round(currentWheel);
      console.log(this.bpmSpeed);
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

    this.createMolecule({
      topLeftPos: new THREE.Vector2(
        -10,
        direction == "top" ? 5: cuttingPoint
      ),
      size: new THREE.Vector2(20,direction == "top" ? Math.abs(cuttingPoint - 5) : 10 - Math.abs(cuttingPoint - 5) )
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

    this.createMolecule({
      topLeftPos: new THREE.Vector2(
        direction == "left" ? -10 : cuttingPoint,
        5
      ),
      size: new THREE.Vector2(direction == "left" ? 20 - Math.abs(cuttingPoint - 10) : Math.abs(cuttingPoint - 10), 10)
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
    if (data.bpm(this.bpmSpeed) && this.autocut) {
      this.randomize();
    }

    this.gridBackground.update(data);
    for (let i = 0; i < this.molecules.length; i++) {
      this.molecules[i].update(data);
    }
  }

  randomize(){
    if (this.molecules.length < 15 && this.molecules.length > 1) {
      let rand = Math.random();
      if(rand < 0.5){
        this.dispatch({ count: 1 + Math.floor(Math.random() * 2) });
      }else{
        this.molecules[Math.floor(this.molecules.length * Math.random())].reload();
      }
    } else {
      if(Math.random() < 0.6 || this.molecules.length == 1){
        if(Math.random() < 0.8){
          this.sliceHorizontal({
            cuttingPoint: Math.round(Math.random() * 10) - 5,
            direction: Math.random() > 0.5 ? "left" : "right"
          });
        }else{
          this.sliceVertical({
            cuttingPoint: Math.round(Math.random() * 10) - 5,
            direction: Math.random() > 0.5 ? "bottom" : "top"
          });
        }
      }else{
        this.reset();
      }
    }
  }

}

export default Grid;
