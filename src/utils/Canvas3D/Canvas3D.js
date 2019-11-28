import Interaction from "./Interaction";
import GlobaleInteraction from "src/GlobaleInteraction";
import Sight from "src/utils/Sight";
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
  constructor({ container, setStep, analyser }) {
    this.setStep = setStep;
    this.container = container || document.body;
    this.analyser = analyser;
    var container;

    this.time = {
      time: 0,
      delta: 0
    };

    this.scene = new THREE.Scene();
    this.sight = new Sight({ scenePush: this.addObjectToScene.bind(this) });
    this.scene.background = new THREE.Color(0x000000);
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.intersects = [];
    var gridHelper = new THREE.GridHelper(10, 5);
    // this.scene.add(gridHelper);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.sight.SCREEN_WIDTH, this.sight.SCREEN_HEIGHT);
    this.container.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.clock.start();
    this.composer;
    this.createComposer();

    this.interaction = new GlobaleInteraction({
      renderer: this.renderer,
      analyser: this.analyser,
      scenePush: this.addObjectToScene.bind(this),
      getSize: this.sight.getScreenSize.bind(this.sight),
      camera: this.sight.cameraOrtho,
      mouse: this.mouse,
      raycaster: this.raycaster,
      scene: this.scene
    });

    this.controls = new OrbitControls(this.sight.camera);
    //this.controls = new OrbitControls(this.sight.activeCamera);

    window.addEventListener("resize", this.onWindowResize.bind(this), false);
    this.onWindowResize();
    this.renderer.setAnimationLoop(this.render.bind(this));
  }
  render(t) {
    this.time.delta = this.clock.getDelta();
    this.time.time += this.time.delta;

    this.analyser.refreshData(this.time);
    this.analyser.debug();
    //this.interaction.update();

    this.interaction.update();
    this.sight.update();

    this.composer.render();
  }
  onWindowResize() {
    this.sight.onResize();
    this.renderer.setSize(this.sight.SCREEN_WIDTH, this.sight.SCREEN_HEIGHT);
  }
  createComposer() {
    //composer
    this.composer = new THREE.EffectComposer(this.renderer);

    //passes
    this.renderPass = new THREE.RenderPass(this.scene, this.sight.cameraOrtho);

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
