import Cell from "../Cell";
import "./cell-dom.scss";
import { TweenMax } from "gsap";
import worldToScreenpoint from "src/utils/worldToScreenpoint.js"

class CellDomElement extends Cell {
  constructor({ size, camera, html, molecule }) {
    var material = new THREE.MeshBasicMaterial({
      opacity: 0,
      alphaTest: 1
    });

    super({ material, size, molecule });

    var domElement = document.createElement("dom");
    domElement.classList.add("cell-dom");
    domElement.innerHTML = html || this.getRandomHtml();

    document.body.append(domElement);

    this.domElement = domElement;
    this.camera = camera;

    this.needInit = true;
    this.updateDomElement();
  }

  update(data) {
    if (this.needInit) {
      this.initEffectJs(data);
    }
    this.updateDomElement();
    super.update(data);
  }

  updateDomElement(){
    let wpVector = new THREE.Vector3();
    let cellPos = this.mesh.getWorldPosition(wpVector).clone();
    let cellSize = this.getCurrentSize();

    let cellTopLeft = cellPos.clone();
    cellTopLeft.x += cellSize.x / 2;
    cellTopLeft.y -= cellSize.y / 2;

    let cellBotRight = cellPos.clone();
    cellBotRight.x -= cellSize.x / 2;
    cellBotRight.y += cellSize.y / 2;

    let domPos = worldToScreenpoint(cellPos, this.camera);
    let domWidth =
      worldToScreenpoint(cellTopLeft, this.camera).x -
      worldToScreenpoint(cellBotRight, this.camera).x;
    let domHeight =
      worldToScreenpoint(cellTopLeft, this.camera).y -
      worldToScreenpoint(cellBotRight, this.camera).y;

    TweenMax.set(this.domElement, {
      left: domPos.x,
      top: domPos.y,
      width: domWidth,
      height: domHeight
    });
  }

  destroy() {
    this.domElement.remove();
    super.destroy();
  }

  getRandomHtml() {
    let html = "";
    html += `
      <div class="infinite-text-wrapper">
        <span class="infinite-text ui-color-fill">test</span>
        <span class="infinite-text infinite-text--left ui-color-fill">test</span>
        <span class="infinite-text ui-color-fill">test</span>
        <span class="infinite-text infinite-text--left ui-color-fill">test</span>
        <span class="infinite-text ui-color-fill">test</span>
        <span class="infinite-text infinite-text--left ui-color-fill">test</span>
        <span class="infinite-text ui-color-fill">test</span>
        <span class="infinite-text infinite-text--left ui-color-fill">test</span>
        <span class="infinite-text ui-color-fill">test</span>
      </div>
    `;
    return html;
  }

  initEffectJs(data) {
    this.needInit = false;

    this.domElement
      .querySelectorAll(".infinite-text:not(.custom)")
      .forEach(element => {
        var str = data.artist + " " + data.trackname + " - ";
        element.innerHTML = str;
        var width = element.offsetWidth;
        console.log(element.parentElement.offsetWidth);
        var direction = element.classList.contains("infinite-text--left")
          ? 1
          : -1;
        if (width > 0) {
          var finalstr = str;
          let i = 0;
          while (i < (element.parentElement.offsetWidth * 2) / width) {
            finalstr += str;
            i++;
          }
          element.innerHTML = finalstr;
          var speed = str.length * 0.2;
          TweenMax.to(element, speed, {
            x: direction * width,
            ease: Power0.easeNone,
            repeat: -1,
            force3D: true
          });
        }
      });


    //CUSTOM INFINITE TEXT

    function index(elem) {
      var i = 0;
      while ((elem = elem.previousSibling) != null) ++i;
      return i;
    }

    document
      .querySelectorAll(".timetable-cells-wrapper .infinite-text.custom")
      .forEach(element => {
        var str = element.innerHTML;
        var width = element.offsetWidth;
        var direction = element.classList.contains("infinite-text--left")
          ? 1
          : -1;
        if (width > 0) {
          var finalstr = str;
          let i = 0;
          while (i < (element.parentElement.offsetWidth * 2) / width) {
            finalstr += str;
            i++;
          }
          element.innerHTML = finalstr;
          var speed = str.length * 0.1;
          var tween = TweenMax.to(element, speed, {
            x: direction * width,
            ease: Power0.easeNone,
            repeat: -1,
            force3D: true
          });
          tween.pause();

          document
            .querySelectorAll(".timetable-cells-wrapper>*")
            .forEach(span => {
              if (index(element) == index(span)) {
                span.addEventListener("mouseenter", event => {
                  tween.play();
                  highlight(index(span), true);
                });
                span.addEventListener("mouseleave", event => {
                  tween.pause();
                  highlight(index(span), false);
                });
              }
            });
        }
      });

    function highlight(i, on) {
      document.querySelectorAll(".timetable-cells-wrapper>*").forEach(span => {
        if (i == index(span)) {
          if (on) {
            span.classList.remove("ui-color-text");
            span.classList.add("ui-color-fill");
          } else {
            span.classList.add("ui-color-text");
            span.classList.remove("ui-color-fill");
          }
        }
      });
    }
  }
}

export default CellDomElement;
