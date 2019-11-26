precision highp float;

varying vec2 vUv;

uniform sampler2D uSampler;
uniform float uTime;
uniform float uVolume;
uniform float uIntensity;
uniform float uDifference;
uniform vec2 ratio;

const float pi = 3.1415926;

void main() {
    vec2 uv = vUv;
    uv = (uv - 0.5) * vec2(abs(1. - uDifference),1.) + 0.5;
    //uv += sin(uTime + uv.x * pi * 2.0) * 0.3 * uIntensity;
    uv = (uv - 0.5) * ratio + 0.5;
    vec4 color = texture2D(uSampler,uv);
    gl_FragColor = color;
}