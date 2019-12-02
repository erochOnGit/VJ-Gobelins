import MouseDownPointer from "./MouseDownPointer";
import gridDrag from "../gridDrag";
export default function() {
  return e => {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // calculate objects intersecting the picking ray
    this.point = this.raycaster.intersectObject(this.interactionPlane)[0].point;
    this.point2 = this.raycaster.intersectObject(
      this.interactionPlane
    )[0].point;
    this.isEventCreated = false;
    if (
      Math.abs(this.point.x) > this.width / 2 ||
      Math.abs(this.point.y) > this.height / 2
    ) {
      if (Math.abs(this.point.x * 0.5) > Math.abs(this.point.y)) {
        this.sliceType = "vertical";
        this.point.y = Math.round(this.point.y);
      } else {
        this.sliceType = "horizontal";
        this.point.x = Math.round(this.point.x);
      }

      window.addEventListener("mousemove", this.dragEvent);
      this.isEventCreated = true;
      this.originSlice = { x: e.clientX, y: e.clientY };
      this.pointer = new MouseDownPointer(this.originSlice);
    }
  };
}
