import Module from "../Module";
import { TweenMax, TimelineMax } from "gsap";

class Cell extends Module {
  constructor({ geometry, material, size, noBackground = false, molecule }) {
    super();
    this.molecule = molecule;
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
    this.mesh.userData.cell = this;
    this.mesh.userData.toto = "yolois";
    if (!noBackground) {
      var material2 = new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.DoubleSide
      });
      let geometry2 = new THREE.PlaneBufferGeometry(
        this.size.x + 0.16,
        this.size.y + 0.16,
        32
      );

      let meshBack = new THREE.Mesh(geometry2, material2);
      meshBack.cell = this;
      this.mesh.add(meshBack);
      meshBack.renderOrder = 2;
      meshBack.position.z -= 1;
    }
    this.mesh.renderOrder = 3;
    this.mesh.position.set(0, 0, 11);
    this.lifetime = 0;
  }

  update(data) {
    this.lifetime += data.time.delta;
  }

  getCurrentSize() {
    return {
      x: this.size.x * this.mesh.scale.x,
      y: this.size.y * this.mesh.scale.y
    };
  }

  destroy() {
    let tl = this.resize({axe: Math.random() >= 0.5 ? "horizontal" : "vertical", direction: Math.sign(Math.random() - 0.5), size:0.00001});
    tl.addCallback(() => {
       this.mesh.parent.remove(this.mesh);
    });
  }

  resize({ axe, direction, size }) {
    TweenMax.killTweensOf(this.mesh.scale);
    TweenMax.killTweensOf(this.mesh.position);
    let tl = new TimelineMax();

    if (axe == "horizontal") {
      let scale = size / this.size.x;
      tl.to(this.mesh.scale, 30 / 122, { x: scale, ease: Power4.easeOut }, 0);
      tl.to(
        this.mesh.position,
        30 / 122,
        {
          x: this.mesh.position.x + ((this.getCurrentSize().x - size) / 2) * direction,
          ease: Power4.easeOut
        },
        0
      );

    } else {
      let scale = size / this.size.y;
      tl.to(this.mesh.scale, 30 / 122, { y: scale, ease: Power4.easeOut }, 0);
      tl.to(
        this.mesh.position,
        30 / 122,
        {
          y: this.mesh.position.y + ((this.getCurrentSize().y - size) / 2) * direction,
          ease: Power4.easeOut
        },
        0
      );
    }
    tl.eventCallback("onUpdate", ()=> this.tweenMaxUpdate());
    return tl;
  }

  tweenMaxUpdate(){}

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
    tl.eventCallback("onUpdate", ()=> this.tweenMaxUpdate());
  }
}

export default Cell;
