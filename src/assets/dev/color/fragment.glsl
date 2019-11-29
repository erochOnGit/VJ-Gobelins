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

    float gray = (color.r,color.g, color.b)/3.0;
    gray = smoothstep(0.0,uVolume * 0.6 + 0.1,gray);
    gl_FragColor = mix(vec4(vec3(0.0),1.0), vec4(uColor,1.0), gray);

}