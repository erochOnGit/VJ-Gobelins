class Sight {
  constructor({ scenePush }) {
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    this.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
    this.frustumSize = 15;

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(20, 10, 5);
    this.camera.lookAt(0, 0, 0);

    this.cameraOrtho = new THREE.OrthographicCamera(
      (this.frustumSize * this.aspect) / -2,
      (this.frustumSize * this.aspect) / 2,
      this.frustumSize / 2,
      this.frustumSize / -2,
      0.001,
      100
    );
    this.cameraOrtho.position.set(0, 0, 12);
    this.cameraOrtho.lookAt(0, 0, 0);
    console.log(this.cameraOrtho);

    this.cameraOrthoHelper = new THREE.CameraHelper(this.camera);
  //  scenePush(this.cameraOrthoHelper);
    this.activeCamera = this.cameraOrtho;
    //this.cameraOrtho.rotation.y = Math.PI;
  }
  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    this.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;

    this.camera.aspect = this.aspect;
    this.camera.updateProjectionMatrix();

    this.cameraOrtho.left = (-this.frustumSize * this.aspect) / 2;
    this.cameraOrtho.right = (this.frustumSize * this.aspect) / 2;
    this.cameraOrtho.top = this.frustumSize / 2;
    this.cameraOrtho.bottom = -this.frustumSize / 2;
    this.cameraOrtho.updateProjectionMatrix();
  }
  update() {
    this.cameraOrtho.updateProjectionMatrix();
    this.cameraOrthoHelper.update();
    this.cameraOrthoHelper.visible = true;
  }
  getScreenSize() {
    return { width: this.SCREEN_WIDTH, height: this.SCREEN_HEIGHT };
  }
}
export default Sight;
