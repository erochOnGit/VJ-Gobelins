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
    this.mesh.position.set(this.posX, this.posY, Math.random() * 2);
  }
  getFirstChildCenter(cuttingPoint, axe) {
    return {
      horizontal: (cuttingPoint - this.posX) / 2,
      vertical: (cuttingPoint - this.posY) / 2
    };
  }

  getEdgesPos() {
    return (edgesPos = {
      left: this.posX - this.width / 2,
      right: this.posX + this.width / 2,
      top: this.posY + this.height / 2,
      bottom: this.posY - this.height / 2
    });
  }
  split(cuttingPoint, axes) {
    if (cucttingPoint < width) {
      if (axes == "horizontal") {
        if (this.width <= 1) {
          return false;
        }
        return [
          new Molecule({
            posX:
              getEdgesPos().left +
              getFirstChildCenter(cuttingPoint).horizontal,
            posY: this.posY,
            width: cuttingPoint - this.posX,
            height: this.height
          }),
          new Molecule({
            posX: cuttingPoint,
            posY: this.posY,
            width: this.width - (cuttingPoint - this.posX),
            height: this.height
          })
        ];
      } else {
        if (this.height <= 1) {
          return false;
        }
        return [
          new Molecule({
            posX: getEdgesPos().left +
            getFirstChildCenter(cuttingPoint).vertical,
            posY: this.posY,
            width: this.width,
            height: cuttingPoint - this.posY
          }),
          new Molecule({
            posX: this.posX,
            posY: cuttingPoint,
            width: this.width,
            height: this.height - (cuttingPoint - this.posY)
          })
        ];
      }
    }
  }
}

export default Molecule;
