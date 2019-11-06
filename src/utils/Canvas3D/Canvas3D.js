import Interaction from "./Interaction";
import GlobaleInteraction from "src/GlobaleInteraction";
var OrbitControls = require("three-orbit-controls")(THREE);
//SHADERS
import "src/../node_modules/three/examples/js/shaders/CopyShader.js";
import "src/../node_modules/three/examples/js/postprocessing/EffectComposer.js";
import "src/../node_modules/three/examples/js/postprocessing/RenderPass.js";
import "src/../node_modules/three/examples/js/postprocessing/ShaderPass.js";
import "src/../node_modules/three/examples/js/shaders/FXAAShader.js";
import {
  chromaticAberrationVs,
  chromaticAberrationFs
} from "src/assets/dev/chromaticAberration";

class Canvas3D {
  constructor({ container, setStep }) {
    this.setStep = setStep;
    this.container = container || document.body;

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // this.camera = new THREE.OrthographicCamera(
    //   window.innerWidth / -2,
    //   window.innerWidth / 2,
    //   window.innerHeight / 2,
    //   window.innerHeight / -2,
    //   1,
    //   1000
    // );
    //let initCamPos = new THREE.Vector3(20, 10, 5); //stepSettings[this.interactionsIndex].camera.position;
    this.camera.position.set(20, 10, 5);
    this.camera.lookAt(0, 0, 0);

    // this.controls = new OrbitControls(this.camera);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.intersects = [];
    var gridHelper = new THREE.GridHelper(10, 5);
    this.scene.add(gridHelper);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.clock.start();
    this.composer;
    this.createComposer();

    this.interaction = new GlobaleInteraction({
      scenePush: this.addObjectToScene.bind(this)
    });
    window.addEventListener("resize", this.onWindowResize.bind(this), false);
    this.onWindowResize();
    this.renderer.setAnimationLoop(this.render.bind(this));
  }
  render(t) {
    this.interaction.update();
    this.renderer.render(this.scene, this.camera);
    this.composer.render();
  }
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  createComposer() {
    //composer
    this.composer = new THREE.EffectComposer(this.renderer);

    //passes
    this.renderPass = new THREE.RenderPass(this.scene, this.camera);

    this.chromaticAberration = {
      uniforms: {
        tDiffuse: { type: "t", value: null },
        resolution: {
          value: new THREE.Vector2(
            window.innerWidth * window.devicePixelRatio,
            window.innerHeight * window.devicePixelRatio
          )
        },
        power: { value: 0.5 }
      },
      vertexShader: chromaticAberrationVs,
      fragmentShader: chromaticAberrationFs
    };
    let chromaticAberrationPass = new THREE.ShaderPass(
      this.chromaticAberration
    );

    // bloomPass = new THREE.UnrealBloomPass(
    //   new THREE.Vector2(window.innerWidth, window.innerHeight),
    //   1.5,
    //   0.4,
    //   0.85
    // );
    // bloomPass.threshold = params.bloomThreshold;
    // bloomPass.strength = params.bloomStrength;
    // bloomPass.radius = params.bloomRadius;
    let antialiasPass = new THREE.ShaderPass(THREE.FXAAShader);

    this.composer.addPass(this.renderPass);
    // this.composer.addPass(bloomPass);
    // this.composer.addPass(chromaticAberrationPass);
    //    this.composer.addPass(antialiasPass);
    antialiasPass.renderToScreen = true;
  }
  addObjectToScene(mesh) {
    this.scene.add(mesh);
  }
}
export default Canvas3D;
