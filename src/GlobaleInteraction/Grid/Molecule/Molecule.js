import CellFactory from "src/GlobaleInteraction/Module/CellFactory";

class Molecule {
  constructor({ posX, posY, width, height, renderer, cell }) {
    /**
     * width in cell
     */
    this.width = width || 1;
    this.height = height || 1;
    this.posX = posX || 0;
    this.posY = posY || 0;
    this.margin = 0.1;
    this.cell = CellFactory({
      size: new THREE.Vector2(
        this.width - this.margin * 2,
        this.height - this.margin * 2,
        ),
        renderer
    });
    this.cell.mesh.position.set(this.posX, this.posY, 0);
    this.cell.reveal();
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
    console.log(
      "horizontal",
      Math.abs(this.getEdgesPos().left),
      "\n left",
      this.getEdgesPos().left,

      "\n parentPos : ",
      this.posX,
      "\n cuttinPoint : ",
      cuttingPoint
    );
    return [
      new Molecule({
        posX: this.getFirstChildCenter(cuttingPoint).horizontal,
        posY: this.posY,
        width: this.getFirstChildSize(cuttingPoint).width,
        height: this.height,
        renderer: this.renderer
      }),
      new Molecule({
        posX:
          cuttingPoint +
          (this.width - this.getFirstChildSize(cuttingPoint).width) / 2,
        posY: this.posY,
        width: this.width - this.getFirstChildSize(cuttingPoint).width,
        height: this.height,
        renderer: this.renderer
      })
    ];
  }
  splitVertical(cuttingPoint) {
    if (cuttingPoint == undefined) {
      throw "Parameter is not a number!";
    }
    console.log(
      "vertical",
      Math.abs(this.getEdgesPos().bottom),
      "\n bottom",
      this.getEdgesPos().bottom,
      "\n parentPos : ",
      this.posY,
      "\n cuttinPoint : ",
      cuttingPoint
    );

    return [
      new Molecule({
        posX: this.posX,
        posY: this.getFirstChildCenter(cuttingPoint).vertical,
        width: this.width,
        height: this.getFirstChildSize(cuttingPoint).height,
        renderer: this.renderer
      }),
      new Molecule({
        posX: this.posX,
        posY:
          cuttingPoint +
          (this.height - this.getFirstChildSize(cuttingPoint).height) / 2,
        width: this.width,
        height: this.height - this.getFirstChildSize(cuttingPoint).height,
        renderer: this.renderer
      })
    ];
  }

  update(data) {
    this.cell.update(data);
  }

  destroy(){
    this.cell.destroy();
  }
}

export default Molecule;
