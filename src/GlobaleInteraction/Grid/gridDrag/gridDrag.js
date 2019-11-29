import gridDrag from "../gridDrag";
import { TweenMax } from "gsap";
export default function() {
  return e => {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.point2 = this.raycaster.intersectObject(
      this.interactionPlane
    )[0].point;
    if(this.sliceType == "horizontal"){
      TweenMax.set(this.pointer.direction,{x:e.clientX > this.originSlice.x?this.originSlice.x:this.originSlice.x-100,y:e.clientY})
    }
    if(this.sliceType == "vertical"){
      TweenMax.set(this.pointer.direction,{x:e.clientX ,y:e.clientY> this.originSlice.y?this.originSlice.y:this.originSlice.y-100})
    }
  };
}
