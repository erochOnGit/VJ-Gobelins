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
    float lum = (color.r + color.g + color.b)/3.0;
    vec3 negatif = vec3((1.0 + uDifference * 0.4) - lum);


    gl_FragColor = vec4(negatif,1.0);
}