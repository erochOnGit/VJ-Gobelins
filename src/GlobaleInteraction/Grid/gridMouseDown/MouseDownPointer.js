import "./_mouseDownPointer.scss";
import worldToScreenpoint from "src/utils/worldToScreenpoint.js";

export default class MouseDownPointer {
  constructor({ x, y, axe, point, camera }) {
    this.origin = document.createElement("div");
    this.pointDom = worldToScreenpoint(
      new THREE.Vector3(point.x, point.y, 0),
      camera
    );
    this.topleft = worldToScreenpoint(new THREE.Vector3(-10.1, 5.1, 0), camera);
    this.bottomright = worldToScreenpoint(
      new THREE.Vector3(10.1, -5.1, 0),
      camera
    );
    let dashWidth = this.bottomright.x - this.topleft.x;
    let dashHeight = this.bottomright.y - this.topleft.y;

    this.origin.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 27"><g data-name="Calque 2"><circle cx="13.5" cy="13.5" r="13" fill="none" stroke="#fff" stroke-miterlimit="10" opacity=".5" data-name="Calque 1"/></g></svg>`;
    this.origin.classList.add(`mouse-down_pointer_${axe}`);

    this.direction = document.createElement("div");
    this.direction.classList.add(`mouse-down_direction_${axe}`);
    this.direction.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 10"><path d="M.5.908v8.196l6.557-4.046L.5.908z" stroke="#FFF" fill="none" fill-rule="evenodd"/></svg>`;

    this.dash = document.createElement("div");
    this.dash.classList.add(`mouse-down_dash_${axe}`);

    this.originInverse = document.createElement("div");
    this.originInverse.classList.add(`mouse-down_reverseOrigin_${axe}`);
    this.originInverse.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 27"><g data-name="Calque 2"><circle cx="13.5" cy="13.5" r="13" fill="none" stroke="#fff" stroke-miterlimit="10" opacity=".5" data-name="Calque 1"/></g></svg>`;

    this.cursor = document.createElement("div");
    this.cursor.classList.add(`mouse-down_cursor_${axe}`);
    this.cursor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g data-name="Calque 2"><circle cx="8" cy="8" r="8" fill="#fff" data-name="Calque 1"/></g></svg>`;

    if (axe == "horizontal" && point.y > 0) {
      this.origin.style.left = this.pointDom.x + "px";
      this.origin.style.top = this.topleft.y + "px";
      this.dash.style.height = dashHeight + "px";
      this.dash.style.width = 0 + "px";
      this.dash.style.left = this.pointDom.x + "px";
      this.dash.style.top = this.topleft.y + "px";
      this.originInverse.style.left = this.pointDom.x + "px";
      this.originInverse.style.top = this.bottomright.y + "px";
    } else if (axe == "horizontal" && point.y < 0) {
      this.origin.style.left = this.pointDom.x + "px";
      this.origin.style.top = this.topleft.y + "px";
      this.dash.style.height = dashHeight + "px";
      this.dash.style.width = 0 + "px";
      this.dash.style.left = this.pointDom.x + "px";
      this.dash.style.top = this.topleft.y + "px";
      this.originInverse.style.left = this.pointDom.x + "px";
      this.originInverse.style.top = this.bottomright.y + "px";
    } else if (axe == "vertical" && point.x > 0) {
      this.origin.style.left = this.topleft.x + "px";
      this.origin.style.top = this.pointDom.y + "px";
      this.dash.style.height = 0 + "px";
      this.dash.style.width = dashWidth + "px";
      this.dash.style.left = this.topleft.x + "px";
      this.dash.style.top = this.pointDom.y + "px";
      this.originInverse.style.left = this.bottomright.x + "px";
      this.originInverse.style.top = this.pointDom.y + "px";
    } else if (axe == "vertical" && point.x < 0) {
      this.origin.style.left = this.topleft.x + "px";
      this.origin.style.top = this.pointDom.y + "px";
      this.dash.style.height = 0 + "px";
      this.dash.style.width = dashWidth + "px";
      this.dash.style.left = this.topleft.x + "px";
      this.dash.style.top = this.pointDom.y + "px";
      this.originInverse.style.left = this.bottomright.x + "px";
      this.originInverse.style.top = this.pointDom.y + "px";
    }
    document.body.appendChild(this.origin);
    document.body.appendChild(this.direction);
    document.body.appendChild(this.dash);
    document.body.appendChild(this.originInverse);
    document.body.appendChild(this.cursor);
  }
  delete() {
    document.body.removeChild(this.origin);
    document.body.removeChild(this.direction);
    document.body.removeChild(this.dash);
    document.body.removeChild(this.originInverse);
    document.body.removeChild(this.cursor);
  }
}
