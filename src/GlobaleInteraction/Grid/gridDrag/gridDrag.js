import gridDrag from "../gridDrag"
export default function() {
  return e => {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.point2 = this.raycaster.intersectObject(
      this.interactionPlane
    )[0].point;
    this.pointer.direction = {
      x: this.point.x + this.point2.x,
      y: this.point.y + this.point2.y
    };
    console.log(this.pointer.direction);
  };
}
