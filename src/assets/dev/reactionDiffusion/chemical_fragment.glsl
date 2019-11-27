precision highp float;

varying vec2 vUv;
uniform float time;
uniform sampler2D inputTexture;
uniform sampler2D initTexture;
uniform sampler2D alpha;
uniform vec2 pointer;
uniform vec2 uResolution;
uniform float uDa;
uniform float uDb;
uniform float uFeed;
uniform float uK;

vec4 get(sampler2D tex,float x,float y){
    return texture2D(tex,(vUv+vec2(x,y))).rgba;
}

// initial versionvar
float Da=1.;
float Db=.3;
float feed=.055;
float k=.062;
float texOffsetX=uResolution.x;
float texOffsetY=uResolution.y;
float LaplaceA(float x,float y){
    float sum=0.;
    sum=
    get(inputTexture,0./texOffsetX,0./texOffsetY).r*-1.+
    get(inputTexture,-1./texOffsetX,0./texOffsetY).r*.2+
    get(inputTexture,0./texOffsetX,-1./texOffsetY).r*.2+
    get(inputTexture,0./texOffsetX,1./texOffsetY).r*.2+
    get(inputTexture,1./texOffsetX,0./texOffsetY).r*.2+
    get(inputTexture,1./texOffsetX,-1./texOffsetY).r*.05+
    get(inputTexture,-1./texOffsetX,-1./texOffsetY).r*.05+
    get(inputTexture,-1./texOffsetX,1./texOffsetY).r*.05+
    get(inputTexture,1./texOffsetX,1./texOffsetY).r*.05;
    return sum;
}
float LaplaceB(float x,float y){
    float sum=0.;
    sum=
    get(inputTexture,0./texOffsetX,0./texOffsetY).g*-1.+
    get(inputTexture,-1./texOffsetX,0./texOffsetY).g*.2+
    get(inputTexture,0./texOffsetX,-1./texOffsetY).g*.2+
    get(inputTexture,0./texOffsetX,1./texOffsetY).g*.2+
    get(inputTexture,1./texOffsetX,0./texOffsetY).g*.2+
    get(inputTexture,1./texOffsetX,-1./texOffsetY).g*.05+
    get(inputTexture,-1./texOffsetX,-1./texOffsetY).g*.05+
    get(inputTexture,-1./texOffsetX,1./texOffsetY).g*.05+
    get(inputTexture,1./texOffsetX,1./texOffsetY).g*.05;
    return sum;
}

void main(){
    vec4 backbuffer=get(inputTexture,0.,0.);
    vec4 init=get(initTexture,0.,0.);
    
    float a=get(inputTexture,0.,0.).r;
    float b=get(inputTexture,0.,0.).g;

    float nextA=a+(uDa*LaplaceA(vUv.x,vUv.y))-
    (a*b*b)+
    (uFeed  * (1.-a));

    float nextB=b+(uDb*LaplaceB(vUv.x,vUv.y))+
    (a*b*b)-
    ((uK+uFeed )*(b));

    nextA=clamp(nextA,0.,1.);
    nextB=clamp(nextB,0.,1.);

    float tap=.1;
    if(pointer.x!=.5){
        if(distance(pointer.xy,vUv.xy)<tap){
            nextB=1.;
        }
    }

    gl_FragColor=vec4(nextA,nextB,0.,1.);
}
