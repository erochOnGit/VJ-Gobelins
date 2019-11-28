import MouseDownPointer from "./MouseDownPointer";
import gridDrag from "../gridDrag";
export default function() {
  return e => {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // calculate objects intersecting the picking ray
    this.point = this.raycaster.intersectObject(this.interactionPlane)[0].point;
    this.renderer.domElement.addEventListener("mousemove", this.dragEvent);
    this.originSlice = { x: e.clientX, y: e.clientY };
    this.pointer = new MouseDownPointer(this.originSlice);
  };
}
