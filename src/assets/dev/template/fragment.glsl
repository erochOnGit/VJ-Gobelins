precision highp float;

varying vec2 vUv;

uniform sampler2D uSampler;
uniform float uTime;
uniform float uVolume;
uniform vec2 ratio;

void main() {
    vec2 uv = vUv;
    vec2 dir = vec2(0.5) - uv;
   uv = uv + dir * length(dir) * uVolume * 1.8;
    //uv = uv * vec2(1.0,1.0 * (1.0-uVolume*0.5));
    uv = (uv - 0.5) * ratio + 0.5;
    vec4 color = texture2D(uSampler,uv);
    gl_FragColor = color;
}