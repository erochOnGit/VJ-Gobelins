class OffGridMotion{
  constructor() {
    this.size = size || new THREE.Vector2(5, 5);
    this.geometry =
      geometry || new THREE.PlaneBufferGeometry(this.size.x, this.size.y, 32);
    this.material =
      material ||
      new THREE.MeshBasicMaterial({
        color: 0xffff00,
        side: THREE.DoubleSide
      });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 0, 11);
  }
}

export default OffGridMotion;
