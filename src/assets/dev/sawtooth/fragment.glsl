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
    float dist = 1.0 - smoothstep(0.0,1.0,(uv.y + sin((uv.x - 0.5) * pi  * 10.0 * ratio.x)));
    uv += vec2(0.0, dist* uVolume);
    uv = (uv - 0.5) * ratio + 0.5;
    vec4 color = texture2D(uSampler,uv);
    gl_FragColor = color;
}