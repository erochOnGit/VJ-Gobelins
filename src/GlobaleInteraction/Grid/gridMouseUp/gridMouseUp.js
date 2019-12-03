import gridDrag from "../gridDrag";
export default function() {
  return e => {
    if (this.isEventCreated) {
      window.removeEventListener("mousemove", this.dragEvent);
      this.isEventCreated = false;
      typeof this.pointer ? this.pointer.delete() : null;
      if (this.sliceType == "horizontal") {
        if (Math.abs(this.point.y - this.point2.y) > this.height) {
          this.sliceHorizontal({
            cuttingPoint: this.point.x,
            direction: e.clientX > this.originSlice.x ? "right" : "left"
          });
        }
      } else if (this.sliceType == "vertical") {
        if (Math.abs(this.point.x - this.point2.x) > this.width) {
          this.sliceVertical({
            cuttingPoint: this.point.y,
            direction: e.clientY > this.originSlice.y ? "top" : "bottom"
          });
        }
      }
    }
  };
}
