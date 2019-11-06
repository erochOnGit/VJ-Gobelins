import "./style.scss";
import SplitModule from "./modules/SplitModule"
import { vertex, fragment } from "src/Assets/dev/testShader"
import { Renderer, Camera, Program, Mesh, Box, Transform } from 'ogl';
import Audio from "./Audio"

const renderer = new Renderer();
const gl = renderer.gl;
document.body.appendChild(gl.canvas);

const camera = new Camera(gl);
camera.position.z = 5;

function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.perspective({
        aspect: gl.canvas.width / gl.canvas.height,
    });
}
window.addEventListener('resize', resize, false);
resize();

const scene = new Transform();
let splitModule = new SplitModule({ gl: gl, vertex: vertex, fragment: fragment });

splitModule.mesh.setParent(scene);

let audio = new Audio();

requestAnimationFrame(update);
function update(t) {
    requestAnimationFrame(update);

    splitModule.mesh.rotation.y -= 0.04;
    splitModule.mesh.rotation.x += 0.03;
    renderer.render({ scene, camera });
}