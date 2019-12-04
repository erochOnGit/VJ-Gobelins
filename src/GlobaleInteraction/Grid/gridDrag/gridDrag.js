import gridDrag from "../gridDrag";
import { TweenMax } from "gsap";
let clamp = function(a, b, c) {
  return Math.max(b, Math.min(c, a));
};

export default function() {
  return e => {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.point2 = this.raycaster.intersectObject(
      this.interactionPlane
    )[0].point;
    if (this.sliceType == "horizontal") {
      TweenMax.set(this.pointer.cursor, {
        x: this.pointer.pointDom.x,
        y: clamp(
          this.pointer.bottomright.y - 15,
          this.pointer.topleft.y - 65,
          e.clientY - 40
        ),
        rotation: -0
      });
      if (e.clientX > this.pointer.pointDom.x) {
        TweenMax.set(this.pointer.direction, {
          x: this.pointer.pointDom.x,
          y: clamp(
            this.pointer.bottomright.y - 15,
            this.pointer.topleft.y - 65,
            e.clientY - 40
          ),
          rotation: -0
        });
 
      } else {
        TweenMax.set(this.pointer.direction, {
          x: this.pointer.pointDom.x - 80,
          y: clamp(
            this.pointer.bottomright.y - 15,
            this.pointer.topleft.y - 65,
            e.clientY - 40
          ),
          rotation: -180
        });
      }
    }
    if (this.sliceType == "vertical") {
      TweenMax.set(this.pointer.cursor, {
        x: clamp(
          this.pointer.bottomright.x-10,
          this.pointer.topleft.x-60,
          e.clientX - 40
        ),
        y: this.pointer.pointDom.y,
        rotation: 90
      });
      if (e.clientY > this.pointer.pointDom.y) {
        TweenMax.set(this.pointer.direction, {
          x: clamp(
            this.pointer.bottomright.x-10,
            this.pointer.topleft.x-60,
            e.clientX - 40
          ),
          y: this.pointer.pointDom.y,
          rotation: 90
        });
      } else {
        TweenMax.set(this.pointer.direction, {
          x: clamp(
            this.pointer.bottomright.x-15,
            this.pointer.topleft.x-65,
            e.clientX - 40
          ),
          y: this.pointer.pointDom.y - 80,
          rotation: -90
        });
      }
    }
  };
}
