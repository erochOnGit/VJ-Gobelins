class Molecule {
  constructor({ posX, posY, width, height }) {
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
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(this.posX, this.posY, Math.abs(Math.random()) * 2);
  }

  getFirstChildSize(cuttingPoint) {
    return {
      width: cuttingPoint - this.getEdgesPos().left,
      height: cuttingPoint - this.getEdgesPos().top
    };
  }

  getFirstChildCenter(cuttingPoint, axe) {
    return {
      horizontal: (cuttingPoint - Math.abs(this.getEdgesPos().left)) / 2,
      vertical: (cuttingPoint - Math.abs(this.getEdgesPos().top)) / 2
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

  split(cuttingPoint, axes) {
    if (cuttingPoint < this.width) {
      if (axes == "horizontal") {
        console.log("horizontal", cuttingPoint);
        if (this.width <= 1) {
          return false;
        }
        return [
          new Molecule({
            posX:
              this.getFirstChildCenter(cuttingPoint).horizontal +
              this.margin / 2,
            posY: this.posY,
            width: this.getFirstChildSize(cuttingPoint).width - this.margin * 2,
            height: this.height
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
            height: this.height
          })
        ];
      } else {
        console.log("vertical");
        if (this.height <= 1) {
          return false;
        }
        console.log(
          "vertical2",
          "posX: ",
          this.posX,
          " posY:,",
          this.getFirstChildCenter(cuttingPoint).vertical + this.margin / 2,
          "width:",
          this.width,
          "height:",
          this.getFirstChildSize(cuttingPoint).height - this.margin * 2
        );
        return [
          new Molecule({
            posX: this.posX,
            posY:
              this.getFirstChildCenter(cuttingPoint).vertical + this.margin / 2,
            width: this.width,
            height:
              this.getFirstChildSize(cuttingPoint).height - this.margin * 2
          }),
          new Molecule({
            posX: this.posX,
            posY:
              cuttingPoint +
              (this.width - this.getFirstChildSize(cuttingPoint).height) / 2 -
              this.margin / 2,
            width: this.width,
            height:
              this.width -
              this.getFirstChildSize(cuttingPoint).height -
              this.margin * 2
          })
        ];
      }
    }
  }
}

export default Molecule;
