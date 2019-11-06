import { vertex, fragment } from "src/Assets/dev/testShader"
import { Renderer, Camera, Program, Mesh, Box, Transform } from 'ogl';

/**
  * Module visualising experience  
  */
class SplitModule {

    constructor({ video, gl,vertex, fragment }) {

        const geometry = new Box(gl);

        const program = new Program(gl, {
            vertex: vertex,
            fragment: fragment,
        });
        
        this.mesh = new Mesh(gl, { geometry, program });
    }
}

export default SplitModule