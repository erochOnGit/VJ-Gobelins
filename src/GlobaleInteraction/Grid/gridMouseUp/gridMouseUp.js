export default function() {
  return e => {
    console.log("up", this.originSlice);
    console.log(this.pointer);
    this.pointer.delete();
  };
}
