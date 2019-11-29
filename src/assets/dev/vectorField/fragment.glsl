precision highp float;

varying vec2 vUv;
uniform float time;
uniform vec2 pointer;

vec4 get(sampler2D tex,float x,float y){
    return texture2D(tex,(vUv+vec2(x,y))).rgba;
}
void main(){
    
    gl_FragColor=vec4(
        0.,
        0.,
        1.,
        1.
    );
}