import MouseDownPointer from "./MouseDownPointer";

export default function() {
  return e => {
    console.log(e, this);
    this.originSlice = { x: e.clientX, y: e.clientY };
    this.pointer = new MouseDownPointer(this.originSlice);
  };
}
