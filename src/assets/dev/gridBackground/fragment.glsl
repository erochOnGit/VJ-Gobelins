precision highp float;

varying vec2 vUv;

uniform sampler2D uSampler;
uniform float uTime;
uniform float uVolume;
uniform float uIntensity;
uniform float uDifference;
uniform vec2 ratio;
uniform vec3 uColor;

const float pi = 3.1415926;

float box(vec2 _st, vec2 _size){
    _size = vec2(0.5)-_size*0.5;
    vec2 uv = smoothstep(_size,_size+vec2(1e-4),_st);
    uv *= smoothstep(_size,_size+vec2(1e-4),vec2(1.0)-_st);
    return uv.x*uv.y;
}

void main() {
    vec2 uv = vUv;
 //   uv = (uv - 0.5) * ratio + 0.5;

    float border = 0.025;
 
    uv = fract(uv * vec2(20. + border,10. + border)-border/2.);
    vec3 color =(1.- vec3(box(uv,vec2(1.0 - border)))) * uColor;
    gl_FragColor = vec4(color,1.);
}
