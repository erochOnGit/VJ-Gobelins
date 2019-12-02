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
      uv = (uv - 0.5) * ratio + 0.5;
    vec2 dir = vec2(0.5) - uv;
    uv = uv + dir * length(dir) * uDifference * 2.0;
    vec2 kuv = fract(uv * sign(uv - 0.5) - (uTime * 0.1));
    kuv = fract(kuv * sign(mod(kuv,2.0) - 0.5) * 2.0);
    vec4 color = texture2D(uSampler,kuv);
    gl_FragColor = color;
}