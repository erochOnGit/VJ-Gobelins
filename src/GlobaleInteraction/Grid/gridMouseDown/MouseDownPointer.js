import "./_mouseDownPointer.scss";

export default class MouseDownPointer {
  constructor({x, y}) {
    this.domElement = document.createElement("div");
    this.domElement.classList.add("mouseDownPointer");
    this.domElement.style.left = x-50 + "px";
    this.domElement.style.top = y-50 + "px";
    document.body.appendChild(this.domElement);
  }
  delete() {
    // document.body.removeChild(this.domElement);
  }
}
