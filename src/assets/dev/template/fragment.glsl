precision highp float;

varying vec2 vUv;

uniform sampler2D uSampler;
uniform float uTime;
uniform float uVolume;

void main() {
    vec2 uv = vUv;
    vec2 dir = vec2(0.5) - uv;
    uv = uv + dir * length(dir) * uVolume * 2.0;
    vec4 color = texture2D(uSampler,uv);
    gl_FragColor = color;
}