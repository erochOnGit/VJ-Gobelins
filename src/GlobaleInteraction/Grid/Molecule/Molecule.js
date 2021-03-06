import CellFactory from "src/GlobaleInteraction/Module/CellFactory";
import { cpus } from "os";

class Molecule {
  constructor({
    posX,
    posY,
    width,
    height,
    renderer,
    camera,
    cellData,
    gridMesh
  }) {
    /**
     * width in cell
     */
    this.gridMesh = gridMesh;
    this.width = width || 1;
    this.height = height || 1;
    this.posX = posX || 0;
    this.posY = posY || 0;
    this.margin = 0.1;
    this.cell = CellFactory({
      cellData,
      size: new THREE.Vector2(
        this.width - this.margin * 2,
        this.height - this.margin * 2
      ),
      renderer,
      camera,
      molecule: this
    });
    this.cell.mesh.position.set(this.posX, this.posY, 0);
    this.gridMesh.add(this.cell.mesh);
    this.cell.reveal();
    this.cell.mesh.parent = gridMesh;
    this.renderer = renderer;
    this.camera = camera;
  }

  getFirstChildSize(cuttingPoint) {
    return {
      width: cuttingPoint - this.getEdgesPos().left,
      height: cuttingPoint - this.getEdgesPos().bottom
    };
  }

  getFirstChildCenter(cuttingPoint, axe) {
    return {
      horizontal: (cuttingPoint + this.getEdgesPos().left) / 2,
      vertical: (cuttingPoint + this.getEdgesPos().bottom) / 2
    };
  }

  getEdgesPos() {
    return {
      left: this.posX - this.width / 2,
      right: this.posX + this.width / 2,
      top: this.posY + this.height / 2,
      bottom: this.posY - this.height / 2
    };
  }
  splitHorizontal(cuttingPoint) {
    if (cuttingPoint == undefined) {
      throw "Parameter is not a number!";
    }

    return [
      new Molecule({
        posX: this.getFirstChildCenter(cuttingPoint).horizontal,
        posY: this.posY,
        width: this.getFirstChildSize(cuttingPoint).width,
        height: this.height,
        renderer: this.renderer,
        camera: this.camera,
        gridMesh: this.gridMesh
      }),
      new Molecule({
        posX:
          cuttingPoint +
          (this.width - this.getFirstChildSize(cuttingPoint).width) / 2,
        posY: this.posY,
        width: this.width - this.getFirstChildSize(cuttingPoint).width,
        height: this.height,
        renderer: this.renderer,
        camera: this.camera,
        gridMesh: this.gridMesh
      })
    ];
  }
  splitVertical(cuttingPoint) {
    if (cuttingPoint == undefined) {
      throw "Parameter is not a number!";
    }

    return [
      new Molecule({
        posX: this.posX,
        posY: this.getFirstChildCenter(cuttingPoint).vertical,
        width: this.width,
        height: this.getFirstChildSize(cuttingPoint).height,
        renderer: this.renderer,
        camera: this.camera,
        gridMesh: this.gridMesh
      }),
      new Molecule({
        posX: this.posX,
        posY:
          cuttingPoint +
          (this.height - this.getFirstChildSize(cuttingPoint).height) / 2,
        width: this.width,
        height: this.height - this.getFirstChildSize(cuttingPoint).height,
        renderer: this.renderer,
        camera: this.camera,
        gridMesh: this.gridMesh
      })
    ];
  }

  resizeHorizontal({ direction, cuttingPoint }) {
    let size =
      direction > 0
        ? this.width - this.getFirstChildSize(cuttingPoint).width
        : this.getFirstChildSize(cuttingPoint).width;

    this.posX = this.posX - ((this.width - size) / 2) * -direction;

    
    this.width = size;
    
    this.cell.resize({
      axe: "horizontal",
      direction,
      size: size - this.margin * 2
    });
  }
  resizeVertical({ direction, cuttingPoint }) {
    let size =
      direction > 0
        ? this.height - this.getFirstChildSize(cuttingPoint).height
        : this.getFirstChildSize(cuttingPoint).height;
    this.posY = this.posY - ((this.height - size) / 2) * -direction;
    this.height = size;
    this.cell.resize({
      axe: "vertical",
      direction,
      size: size - this.margin * 2
    });
  }

  update(data) {
    this.cell.update(data);
  }

  destroy() {

    this.cell.destroy();
  }
  reload() {
    this.destroy();
    this.cell = CellFactory({
      size: new THREE.Vector2(
        this.width - this.margin * 2,
        this.height - this.margin * 2
      ),
      renderer: this.renderer,
      camera: this.camera,
      molecule: this
    });
    this.cell.mesh.position.set(this.posX, this.posY, 0);
    this.gridMesh.add(this.cell.mesh);
    this.cell.reveal();
  }
}

export default Molecule;
