precision highp float;

varying vec2 vUv;

uniform sampler2D uSampler;
uniform float uTime;
uniform float uVolume;
uniform float uIntensity;
uniform float uDifference;
uniform float uSaturation;
uniform vec2 ratio;

const float pi = 3.1415926;

vec4 saturation(vec4 color){
    float lum = color.r * 0.2 + color.g * 0.7 + color.g * 0.1;
    vec3 diff = color.rgb - vec3(lum);
    return vec4(diff * uSaturation + lum,1.0);
}

void main() {
    vec2 uv = vUv;
      uv = (uv - 0.5) * ratio + 0.5;
    vec2 dir = vec2(0.5) - uv;
    uv = uv + dir * length(dir) * uDifference * 2.0;
    vec2 kuv = fract(uv * sign(uv - 0.5) - (uTime * 0.1));
    kuv = fract(kuv * sign(mod(kuv,2.0) - 0.5) * 2.0);
    vec4 color = texture2D(uSampler,kuv);
    gl_FragColor = saturation(color);
}