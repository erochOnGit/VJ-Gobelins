import gridDrag from "../gridDrag";
import { TweenMax } from "gsap";
let clamp = function(a, b, c) {
  return Math.max(b, Math.min(c, a));
};

let map = function(value, low1, high1, low2, high2) {
  return low2 + ((value - low1) * (high2 - low2)) / (high1 - low1);
};

export default function() {
  return e => {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.point2 = this.raycaster.intersectObject(
      this.interactionPlane
    )[0].point;
    let horizontalMarginTop = 0;
    let verticalMarginLeft = 0;
    let arrowPadding = 0;
    if (window.innerHeight < 1000) {
      horizontalMarginTop = 48;
      verticalMarginLeft = 48;
    } else if (window.innerHeight < 1400) {
      horizontalMarginTop = 64;
      verticalMarginLeft = 64;
      arrowPadding = 0;
    } else if (window.innerHeight > 1400) {
      horizontalMarginTop = 80;
      verticalMarginLeft = 80;
      arrowPadding = 25;
    }
    if (this.sliceType == "horizontal") {
      console.log(horizontalMarginTop);
      TweenMax.set(this.pointer.cursor, {
        x: this.pointer.pointDom.x,
        y: clamp(
          this.pointer.bottomright.y,
          this.pointer.topleft.y - horizontalMarginTop, //- 80)+ 9000 /window.innerHeight,
          e.clientY - 40
        ),
        rotation: -0
      });
      if (e.clientX > this.pointer.pointDom.x) {
        TweenMax.set(this.pointer.direction, {
          x: this.pointer.pointDom.x,
          y: clamp(
            this.pointer.bottomright.y,
            this.pointer.topleft.y - horizontalMarginTop,
            e.clientY - 40
          ),
          rotation: -0
        });
      } else {
        TweenMax.set(this.pointer.direction, {
          x: this.pointer.pointDom.x - 80 - arrowPadding,
          y: clamp(
            this.pointer.bottomright.y,
            this.pointer.topleft.y - horizontalMarginTop,
            e.clientY - 40
          ),
          rotation: -180
        });
      }
    }
    if (this.sliceType == "vertical") {
      TweenMax.set(this.pointer.cursor, {
        x: clamp(
          this.pointer.bottomright.x,
          this.pointer.topleft.x - verticalMarginLeft,
          e.clientX - 40
        ),
        y: this.pointer.pointDom.y,
        rotation: 90
      });
      if (e.clientY > this.pointer.pointDom.y) {
        TweenMax.set(this.pointer.direction, {
          x: clamp(
            this.pointer.bottomright.x,
            this.pointer.topleft.x - verticalMarginLeft,
            e.clientX - 40
          ),
          y: this.pointer.pointDom.y,
          rotation: 90
        });
      } else {
        TweenMax.set(this.pointer.direction, {
          x: clamp(
            this.pointer.bottomright.x,
            this.pointer.topleft.x - verticalMarginLeft,
            e.clientX - 40
          ),
          y: this.pointer.pointDom.y - 80 - arrowPadding,
          rotation: -90
        });
      }
    }
  };
}
