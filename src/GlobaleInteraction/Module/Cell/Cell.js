import Module from "../Module";

class Cell extends Module {
  constructor({geometry, material}) {
    super();
    this.size = new THREE.Vector2(10,9.99);
    this.geometry = geometry || new THREE.PlaneBufferGeometry(this.size.x, this.size.y, 32);
    this.material = material || new THREE.MeshBasicMaterial({
      color: 0xffff00,
      side: THREE.DoubleSide
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 0, 11);
  }
  update(data) {}
}

export default Cell;
