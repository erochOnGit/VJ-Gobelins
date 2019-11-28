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
      tl.to(this.mesh.scale, 30 / 122, { x: 0.0001, ease: Power4.easeOut }, 0);
      tl.to(
        this.mesh.position,
        30 / 122,
        {
          x:
            this.mesh.position.x +
            (this.size.x / 2) * Math.sign(Math.random() - 0.5),
          ease: Power4.easeOut
        },
        0
      );
    } else {
      tl.to(this.mesh.scale, 30 / 122, { y: 0.0001, ease: Power4.easeOut }, 0);
      tl.to(
        this.mesh.position,
        30 / 122,
        {
          y:
            this.mesh.position.y +
            (this.size.y / 2) * Math.sign(Math.random() - 0.5),
          ease: Power4.easeOut
        },
        0
      );
    }
    tl.addCallback(() => {
      this.mesh.parent.remove(this.mesh);
    });
  }

  resize({ axe, direction, size }) {
    let tl = new TimelineMax();
    //console.log("je la baise", axe, direction, size);

    if (axe == "horizontal") {
      let scale = size / this.getCurrentSize().x;
      tl.to(this.mesh.scale, 30 / 122, { x: scale, ease: Power4.easeOut }, 0);
      tl.to(
        this.mesh.position,
        30 / 122,
        {
          x: this.mesh.position.x + ((this.size.x - size) / 2) * direction,
          ease: Power4.easeOut
        },
        0
      );
    } else {
      let scale = size / this.getCurrentSize().y;
      tl.to(this.mesh.scale, 30 / 122, { y: scale, ease: Power4.easeOut }, 0);
      tl.to(
        this.mesh.position,
        30 / 122,
        {
          y: this.mesh.position.y + ((this.size.y - size) / 2) * direction,
          ease: Power4.easeOut
        },
        0
      );
    }
    return tl;
  }
  reveal() {
    let tl = new TimelineMax();
    tl.delay(30 / 122);
    tl.addLabel("START");
    if (Math.random() >= 0.5) {
      tl.from(
        this.mesh.scale,
        30 / 122,
        { x: 0.0001, ease: Power4.easeOut },
        "START"
      );
      tl.from(
        this.mesh.position,
        30 / 122,
        {
          x:
            this.mesh.position.x +
            (this.size.x / 2) * Math.sign(Math.random() - 0.5),
          ease: Power4.easeOut
        },
        "START"
      );
    } else {
      tl.from(
        this.mesh.scale,
        30 / 122,
        { y: 0.0001, ease: Power4.easeOut },
        "START"
      );
      tl.from(
        this.mesh.position,
        30 / 122,
        {
          y:
            this.mesh.position.y +
            (this.size.y / 2) * Math.sign(Math.random() - 0.5),
          ease: Power4.easeOut
        },
        "START"
      );
    }
  }
}

export default Cell;
