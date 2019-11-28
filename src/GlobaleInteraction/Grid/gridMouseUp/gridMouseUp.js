import gridDrag from "../gridDrag"
export default function() {
  return e => {

    this.renderer.domElement.removeEventListener("mousemove",this.dragEvent)
    this.pointer.delete();
  };
}
