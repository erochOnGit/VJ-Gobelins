import Cell from "../Cell";
import "./cell-dom.scss";
import { TweenMax } from "gsap";
import worldToScreenpoint from "src/utils/worldToScreenpoint.js"

class CellDomElement extends Cell {
  constructor({size, camera, html,molecule}) {

    var domElement = document.createElement("dom");
    domElement.classList.add("cell-dom");
    domElement.innerHTML = html || `<p>ERROR</p>`;

    document.body.append(domElement);
    
    var material = new THREE.MeshBasicMaterial({
      opacity:0,
      alphaTest: 1,
    });

    super({material, size});
    this.domElement = domElement;
    this.camera = camera;
  }

  update(data) {
    super.update(data);
    this.updateDomElement();
  }

  updateDomElement(){

    let wpVector = new THREE.Vector3();
    let cellPos = this.mesh.getWorldPosition(wpVector).clone();
    let cellSize = this.getCurrentSize();

    let cellTopLeft = cellPos.clone();
    cellTopLeft.x += cellSize.x/2;
    cellTopLeft.y -= cellSize.y/2;

    let cellBotRight = cellPos.clone();
    cellBotRight.x -= cellSize.x/2;
    cellBotRight.y += cellSize.y/2;

    let domPos = worldToScreenpoint(cellPos, this.camera);
    let domWidth = worldToScreenpoint(cellTopLeft, this.camera).x - worldToScreenpoint(cellBotRight, this.camera).x;
    let domHeight = worldToScreenpoint(cellTopLeft, this.camera).y - worldToScreenpoint(cellBotRight, this.camera).y;

    TweenMax.set(this.domElement, {left: domPos.x,top:domPos.y, width: domWidth, height: domHeight});
  }

  destroy(){
    this.domElement.remove();
    super.destroy();
  }

}

export default CellDomElement;
