precision highp float;

varying vec2 vUv;

uniform sampler2D uSampler1;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;
uniform sampler2D uSampler4;
uniform sampler2D uSampler5;
uniform sampler2D uSampler6;
uniform sampler2D uSampler7;
uniform sampler2D uSampler8;
uniform sampler2D uSampler9;
uniform sampler2D uSampler10;

uniform float uTime;
uniform float uVolume;
uniform float uIntensity;
uniform float uDifference;
uniform vec2 ratio;

const float pi = 3.1415926;

void main() {
    vec2 uv = vUv;

    uv = (uv - 0.5) * ratio + 0.5;

    float val = (sin(uv.y * pi * 15.0)+1.0)*0.5;

    vec4 color = texture2D(uSampler1,uv);

    if(val > 0.9){
        color = texture2D(uSampler10,uv);
    }else if(val > 0.8){
        color = texture2D(uSampler9,uv);
    }else if(val > 0.7){
        color = texture2D(uSampler8,uv);
    }else if(val > 0.6){
        color = texture2D(uSampler7,uv);
    }else if(val > 0.5){
        color = texture2D(uSampler6,uv);
    }else if(val > 0.4){
        color = texture2D(uSampler5,uv);
    }else if(val > 0.3){
        color = texture2D(uSampler4,uv);
    }else if(val > 0.2){
        color = texture2D(uSampler3,uv);
    }else if(val > 0.1){
        color = texture2D(uSampler2,uv);
    }

    gl_FragColor = color;
}