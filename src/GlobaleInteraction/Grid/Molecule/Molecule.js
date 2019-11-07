class Molecule {
  constructor({ width, height }) {
    /**
     * width in cell
     */
    this.width = width || 1;
    this.height = height || 1;
  }
  split(cuttingPoint, axes) {
    if (axes == "horizontal") {
      if (this.width <= 1) {
        return false;
      }
      return [new Molecule(), new Molecule()];
    } else {
      if (this.height <= 1) {
        return false;
      }
      return [new Molecule(), new Molecule()];
    }
  }
}

export default Molecule;
