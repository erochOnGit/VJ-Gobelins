precision highp float;

varying vec2 vUv;
uniform float uTime;
uniform sampler2D inputTexture;
uniform vec2 pointer;

vec4 get(sampler2D tex,float x,float y){
    return texture2D(tex,(vUv+vec2(x,y))).rgba;
}
void main(){

    float backy = get(inputTexture,0.,0.).x;
    gl_FragColor=vec4(
        0.,
        1.,
        0.,
        1.
    );
}