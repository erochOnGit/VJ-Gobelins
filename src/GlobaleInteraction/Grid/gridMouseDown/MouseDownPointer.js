import "./_mouseDownPointer.scss";

export default class MouseDownPointer {
  constructor({x, y}) {
    this.origin = document.createElement("div");
    this.origin.classList.add("mouse-down_pointer");
    this.origin.style.left = x-50 + "px";
    this.origin.style.top = y-50 + "px";
    document.body.appendChild(this.origin);

    this.direction = document.createElement("div");
    this.direction.classList.add("mouse-down_direction");
    document.body.appendChild(this.direction);
  }
  delete() {
     document.body.removeChild(this.origin);
     document.body.removeChild(this.direction);
  }
}
