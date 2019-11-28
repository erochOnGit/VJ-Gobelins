precision highp float;

varying vec2 vUv;

uniform sampler2D uSampler;
uniform float uTime;
uniform float uVolume;
uniform float uIntensity;
uniform float uDifference;
uniform vec2 ratio;
uniform vec3 uColor;

const float pi = 3.1415926;    

void main() {
    vec2 uv = vUv;
    uv = (uv - 0.5) * ratio + 0.5;
    vec4 color = texture2D(uSampler,uv);

    float tint = color.r;

    gl_FragColor = vec4(uColor * tint,1.0);

}