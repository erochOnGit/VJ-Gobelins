import CellImage from "src/GlobaleInteraction/Module/Cell/CellImage";
import CellPass from "src/GlobaleInteraction/Module/Cell/CellPass";
import image from "src/assets/image/ARP_A_Escalier_01.jpg";

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
    console.log(this.renderer);
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
    console.log(this.renderer);
    return [
      new Molecule({
        posX:
          this.getFirstChildCenter(cuttingPoint).horizontal + this.margin / 2,
        posY: this.posY,
        width: this.getFirstChildSize(cuttingPoint).width - this.margin * 2,
        height: this.height,
        renderer: this.renderer,
        cell: new CellPass({ renderer: this.renderer, image: image })
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
        cell: new CellPass({ renderer: this.renderer, image: image })
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
        posY: this.getFirstChildCenter(cuttingPoint).vertical + this.margin / 2,
        width: this.width,
        height: this.getFirstChildSize(cuttingPoint).height - this.margin * 2,
        renderer: this.renderer,
        cell: new CellImage({ image: image })
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
        cell: new CellImage({ image: image })
      })
    ];
  }
  update(data) {
    this.cell.update(data);
  }
}

export default Molecule;
