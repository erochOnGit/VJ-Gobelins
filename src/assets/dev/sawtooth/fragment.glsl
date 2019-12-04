precision highp float;

varying vec2 vUv;

uniform sampler2D uSampler;
uniform float uTime;
uniform float uVolume;
uniform float uIntensity;
uniform float uDifference;
uniform vec2 ratio;
uniform float uSaturation;

const float pi = 3.1415926;


vec4 saturation(vec4 color){
    float lum = color.r * 0.2 + color.g * 0.7 + color.g * 0.1;
    vec3 diff = color.rgb - vec3(lum);
    return vec4(diff * uSaturation + lum,1.0);
}


void main() {
    vec2 uv = vUv;
    float dist = 1.0 - smoothstep(0.0,1.0,(uv.y + sin((uv.x - 0.5) * pi  * 10.0 * ratio.x)));
    uv += vec2(0.0, dist* uVolume);
    uv = (uv - 0.5) * ratio + 0.5;
    vec4 color = texture2D(uSampler,uv);
    gl_FragColor = saturation(color);
}