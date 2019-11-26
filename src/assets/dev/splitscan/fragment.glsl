precision highp float;

varying vec2 vUv;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float uTime;
uniform float uVolume;
uniform float uIntensity;
uniform float uDifference;
uniform vec2 ratio;

const float pi = 3.1415926;

void main() {
    vec2 uv = vUv;
    uv = (uv - 0.5) * ratio + 0.5;
    vec4 color = texture2D(uSampler,uv);
    gl_FragColor = color;
}