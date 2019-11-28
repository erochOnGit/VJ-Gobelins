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
    vec2 kuv = fract(uv * sign(uv - 0.5) - uTime * 0.05);
    kuv = fract(kuv * sign(mod(kuv,2.0) - 0.5));
    vec4 color = texture2D(uSampler,kuv);
    gl_FragColor = color;
}