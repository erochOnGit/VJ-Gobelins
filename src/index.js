import "./style.scss";
import { vertex, fragment } from "src/Assets/dev/testShader"
import { Renderer, Camera, Program, Mesh, Box, Transform } from 'ogl';

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

const geometry = new Box(gl);

const program = new Program(gl, {
    vertex: vertex,
    fragment: fragment,
});

const mesh = new Mesh(gl, { geometry, program });
mesh.setParent(scene);

requestAnimationFrame(update);
function update(t) {
    requestAnimationFrame(update);

    mesh.rotation.y -= 0.04;
    mesh.rotation.x += 0.03;
    renderer.render({ scene, camera });
}