import CellImage from "src/GlobaleInteraction/Module/Cell/CellImage";
import CellPass from "src/GlobaleInteraction/Module/Cell/CellPass";
import image from "src/assets/image/ARP_A_Escalier_01.jpg";
import shader2 from "src/assets/dev/template";

class Molecule {
  constructor({ posX, posY, width, height, renderer, cell }) {
    /**
     * width in cell
     */
    this.width = width || 1;
    this.height = height || 1;
    this.posX = posX || 0;
    this.posY = posY || 0;
    this.margin = 0.2;
    this.geometry = new THREE.PlaneBufferGeometry(width, height, 1, 1);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffff00
      // side: THREE.DoubleSide
    });
    // this.mesh = new THREE.Mesh(this.geometry, this.material);
    // cell = {
    //   mesh: new THREE.Mesh(this.geometry, this.material),
    //   update: () => {}
    // };
    this.cell = cell;
    this.cell.mesh.position.set(this.posX, this.posY, 0);

    this.renderer = renderer;
  }

  getFirstChildSize(cuttingPoint) {
    return {
      width: cuttingPoint - this.getEdgesPos().left,
      height: cuttingPoint - this.getEdgesPos().bottom
    };
  }

  getFirstChildCenter(cuttingPoint, axe) {
    return {
      horizontal: (cuttingPoint - Math.abs(this.getEdgesPos().left)) / 2,
      vertical: (cuttingPoint - Math.abs(this.getEdgesPos().bottom)) / 2
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

    let width = this.getFirstChildSize(cuttingPoint).width - this.margin * 2;
    let height = this.height;
    let width2 =
      this.width - this.getFirstChildSize(cuttingPoint).width - this.margin * 2;
    let height2 = this.height;
    return [
      new Molecule({
        posX:
          this.getFirstChildCenter(cuttingPoint).horizontal + this.margin / 2,
        posY: this.posY,
        width: this.getFirstChildSize(cuttingPoint).width - this.margin * 2,
        height: this.height,
        renderer: this.renderer,
        cell: new CellImage({
          image: image,
          shader: shader2,
          size: new THREE.Vector2(width, height)
        })
      }),
      new Molecule({
        posX:
          cuttingPoint +
          (this.width - this.getFirstChildSize(cuttingPoint).width) / 2 -
          this.margin / 2,
        posY: this.posY,
        width:
          this.width -
          this.getFirstChildSize(cuttingPoint).width -
          this.margin * 2,
        height: this.height,
        renderer: this.renderer,
        cell: new CellImage({
          image: image,
          shader: shader2,
          size: new THREE.Vector2(width2, height2)
        })
      })
    ];
  }
  splitVertical(cuttingPoint) {
    if (cuttingPoint == undefined) {
      throw "Parameter is not a number!";
    }

    let width = this.width;
    let height = this.getFirstChildSize(cuttingPoint).height - this.margin * 2;
    let width2 = this.width;
    let height2 =
      this.height -
      this.getFirstChildSize(cuttingPoint).height -
      this.margin * 2;
    return [
      new Molecule({
        posX: this.posX,
        posY: this.getFirstChildCenter(cuttingPoint).vertical + this.margin / 2,
        width: this.width,
        height: this.getFirstChildSize(cuttingPoint).height - this.margin * 2,
        renderer: this.renderer,
        cell: new CellImage({
          image: image,
          shader: shader2,
          size: new THREE.Vector2(width, height)
        })
      }),
      new Molecule({
        posX: this.posX,
        posY:
          cuttingPoint +
          (this.height - this.getFirstChildSize(cuttingPoint).height) / 2 -
          this.margin / 2,
        width: this.width,
        height:
          this.height -
          this.getFirstChildSize(cuttingPoint).height -
          this.margin * 2,
        renderer: this.renderer,
        cell: new CellImage({
          image: image,
          shader: shader2,
          size: new THREE.Vector2(width2, height2)
        })
      })
    ];
  }
  update(data) {
    this.cell.update(data);
  }
}

export default Molecule;
