import Interaction from "../utils/Canvas3D/Interaction";

class GlobaleInteraction extends Interaction {
  constructor({ scenePush }) {
    super();

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.set(0, 0, 0);

    scenePush(this.cube);
  }
  update() {
    this.cube.rotation.x += 0.1;
  }
}

export default GlobaleInteraction;
