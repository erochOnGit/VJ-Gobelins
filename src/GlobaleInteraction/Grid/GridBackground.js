import dat from "dat.gui";
import shader from "src/assets/dev/gridBackground";
import GPUSim from "src/utils/Canvas3D/GPUSim";

class GridBackground {
  constructor({ size, geometry }) {
    this.size = size || { x: 20, y: 10 };
    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Vector3(1, 0, 0) }
      },
      vertexShader: shader.vertex,
      fragmentShader: shader.fragment,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    this.geometry =
      geometry || new THREE.PlaneBufferGeometry(this.size.x, this.size.y, 32);

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.renderOrder = 1;
    this.mesh.position.set(0, 0, -1);
    this.lifetime = 0;
  }

  update(data) {
    this.material.uniforms.uColor.value = new THREE.Color(data.color)
  }
}

export default GridBackground;
