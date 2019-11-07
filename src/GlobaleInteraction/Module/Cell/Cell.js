import Module from "../Module";

class Cell extends Module {
  constructor({geometry, material}) {
    super();

    this.geometry = geometry || new THREE.PlaneBufferGeometry(40, 40, 32);
    this.material = material || new THREE.MeshBasicMaterial({
      color: 0xffff00,
      side: THREE.DoubleSide
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 0, 11);
  }
  update() {}
}

export default Cell;
