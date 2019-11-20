precision highp float;

varying vec2 vUv;
uniform float time;
uniform sampler2D inputTexture;
uniform sampler2D initTexture;
uniform sampler2D alpha;
uniform vec2 pointer;

vec4 get(sampler2D tex,float x,float y){
    return texture2D(tex,(vUv+vec2(x,y))).rgba;
}
void main(){
    vec4 backbuffer=get(inputTexture,0.,0.);
    vec4 init=get(initTexture,0.,0.);
    
    float diffuseR=250.;
    
    float sumR=
    get(inputTexture,-1./diffuseR,-1./diffuseR).r*.15+
    get(inputTexture,-1./diffuseR,0./diffuseR).r*.1+
    get(inputTexture,-1./diffuseR,1./diffuseR).r*.15+
    get(inputTexture,0./diffuseR,-1./diffuseR).r*.1+
    get(inputTexture,0./diffuseR,1./diffuseR).r*.1+
    get(inputTexture,1./diffuseR,-1./diffuseR).r*.15+
    get(inputTexture,1./diffuseR,0./diffuseR).r*.1+
    get(inputTexture,1./diffuseR,1./diffuseR).r*.15;
    
    float diffuseG=750.;
    
    float sumG=
    get(inputTexture,-1./diffuseG,-1./diffuseG).g*.15+
    get(inputTexture,-1./diffuseG,0./diffuseG).g*.1+
    get(inputTexture,-1./diffuseG,1./diffuseG).g*.15+
    get(inputTexture,0./diffuseG,-1./diffuseG).g*.1+
    get(inputTexture,0./diffuseG,1./diffuseG).g*.1+
    get(inputTexture,1./diffuseG,-1./diffuseG).g*.15+
    get(inputTexture,1./diffuseG,0./diffuseG).g*.1+
    get(inputTexture,1./diffuseG,1./diffuseG).g*.15;
    
    float diffuseB=150.;
    
    float sumB=
    get(inputTexture,-1./diffuseB,-1./diffuseB).b*.15+
    get(inputTexture,-1./diffuseB,0./diffuseB).b*.1+
    get(inputTexture,-1./diffuseB,1./diffuseB).b*.15+
    get(inputTexture,0./diffuseB,-1./diffuseB).b*.1+
    get(inputTexture,0./diffuseB,1./diffuseB).b*.1+
    get(inputTexture,1./diffuseB,-1./diffuseB).b*.15+
    get(inputTexture,1./diffuseB,0./diffuseB).b*.1+
    get(inputTexture,1./diffuseB,1./diffuseB).b*.15;
    
    float tap=.05;
    vec3 finalSum=vec3(0);
    if(pointer.x!=.5){
        if(distance(pointer.xy,vUv.xy)<tap){
            sumR=mix(cos(time*2.)*3.+1.,sumR,.97);
            sumG=mix(cos(time*.5)*3.+1.,sumG,.99);
            sumB=mix(cos(time)*3.+1.,sumB,.97);
        }
    }
    finalSum=vec3(
        sumR,
        sumG,
    sumB);
    
    float a=get(alpha,0.,0.).r;
    
    gl_FragColor=vec4(
        finalSum.r+init.r,
        finalSum.g+init.g,
        finalSum.b+init.b,
        1.
    );
}