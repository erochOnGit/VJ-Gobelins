import Module from "../Module";

class Cell extends Module {
  constructor() {
    super();
    var geometry = new THREE.PlaneBufferGeometry(5, 20, 32);
    var material = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      side: THREE.DoubleSide
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 0, 11);
  }
  update() {}
}

export default Cell;
