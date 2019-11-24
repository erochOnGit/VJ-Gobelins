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
    uv += sin(uTime + uv.x + uv.y * pi * 2.0) * 0.3 * uIntensity;
    vec4 color = texture2D(uSampler,uv);
    gl_FragColor = color;
}