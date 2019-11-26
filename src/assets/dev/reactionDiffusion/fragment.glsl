precision highp float;

varying vec2 vUv;
uniform float time;
uniform sampler2D inputTexture;
uniform sampler2D initTexture;
uniform sampler2D uChemicals;
uniform vec2 pointer;

vec4 get(sampler2D tex,float x,float y){
    return texture2D(tex,(vUv+vec2(x,y))).rgba;
}
void main(){
    vec4 backbuffer=get(inputTexture,0.,0.);
    vec4 init=get(initTexture,0.,0.);
    
    vec4 chemicals=get(uChemicals,0.,0.);
    float c=floor((chemicals.x-chemicals.y)*1.);
    c=clamp(c,0.,1.);
    
    gl_FragColor=vec4(
        chemicals.x-chemicals.y,
        chemicals.x-chemicals.y,
        chemicals.x-chemicals.y,
        1.
    );
}