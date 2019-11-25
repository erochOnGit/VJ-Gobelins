import Module from "../Module";
import { TweenMax, TimelineMax } from "gsap";

class Cell extends Module {
  constructor({ geometry, material, size }) {
    super();
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
  update(data) {}

  getCurrentSize() {
    return {
      x: this.size.x * this.mesh.scale.x,
      y: this.size.y * this.mesh.scale.y
    };
  }

  destroy() {
    let tl = new TimelineMax();
    if (Math.random() >= 0.5) {
      tl.to(this.mesh.scale, 1, { x: 0.0001, ease: Power4.easeInOut }, 0);
      tl.to(
        this.mesh.position,
        1,
        {
          x:
            this.mesh.position.x +
            (this.size.x / 2) * Math.sign(Math.random() - 0.5),
          ease: Power4.easeInOut
        },
        0
      );
    } else {
      tl.to(this.mesh.scale, 1, { y: 0.0001, ease: Power4.easeInOut}, 0);
      tl.to(
        this.mesh.position,
        1,
        {
          y:
            this.mesh.position.y +
            (this.size.y / 2) * Math.sign(Math.random() - 0.5),
          ease: Power4.easeInOut
        },
        0
      );
    }
    tl.addCallback(() => {
      this.mesh.parent.remove(this.mesh);
    });
  }

  reveal(){
    let tl = new TimelineMax();
    if (Math.random() >= 0.5) {
      tl.from(this.mesh.scale, 1, { x: 0.0001, ease: Power4.easeInOut }, 0);
      tl.from(
        this.mesh.position,
        1,
        {
          x:
            this.mesh.position.x +
            (this.size.x / 2) * Math.sign(Math.random() - 0.5),
          ease: Power4.easeInOut
        },
        0
      );
    } else {
      tl.from(this.mesh.scale, 1, { y: 0.0001, ease: Power4.easeInOut}, 0);
      tl.from(
        this.mesh.position,
        1,
        {
          y:
            this.mesh.position.y +
            (this.size.y / 2) * Math.sign(Math.random() - 0.5),
          ease: Power4.easeInOut
        },
        0
      );
    }
  }


}

export default Cell;
