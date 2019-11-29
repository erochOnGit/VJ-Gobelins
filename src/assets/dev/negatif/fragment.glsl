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
    vec4 color = texture2D(uSampler,uv);
    vec3 grey = vec3((1.0 + uDifference * 0.4) - (color.r + color.g + color.b)/3.0);


    gl_FragColor = vec4(grey,1.0);
}