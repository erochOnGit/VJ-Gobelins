precision highp float;

varying vec2 vUv;
uniform float time;
uniform sampler2D inputTexture;
uniform sampler2D initTexture;
uniform vec2 pointer;

vec4 get(sampler2D tex,float x,float y){
    return texture2D(tex,(vUv+vec2(x,y))).rgba;
}

// initial versionvar
float Da = 1.;
float Db = 0.5;
float feed = 0.055;
float k = 0.062;

        float diffuse=512.;
// vec2 Laplace(){
// 		vec2 sum = vec2(0.);
// 		sum =
// 		get(inputTexture,0./diffuse,0./diffuse).rg*-1.+
// 		get(inputTexture,-1./diffuse, 0./diffuse).rg *0.2+
// 	  	get(inputTexture,0./diffuse, -1./diffuse).rg *0.2+
// 		get(inputTexture,0./diffuse, 1./diffuse).rg *0.2+
// 	  	get(inputTexture,1./diffuse, 0./diffuse).rg *0.2 +
// 	  	get(inputTexture,1./diffuse, -1./diffuse).rg *0.05+
// 	  	get(inputTexture,-1./diffuse, -1./diffuse).rg*0.05+
// 	  	get(inputTexture,-1./diffuse, 1./diffuse).rg *0.05+
// 	  	get(inputTexture,1./diffuse, 1./diffuse).rg * 0.05;
//    return sum;
// }
float LaplaceA(){
		float sum = 0.;
		sum =
		get(inputTexture,0./diffuse,0./diffuse).r*-1.+
		get(inputTexture,-1./diffuse, 0./diffuse).r *0.2+
	  	get(inputTexture,0./diffuse, -1./diffuse).r *0.2+
		get(inputTexture,0./diffuse, 1./diffuse).r *0.2+
	  	get(inputTexture,1./diffuse, 0./diffuse).r *0.2 +
	  	get(inputTexture,1./diffuse, -1./diffuse).r *0.05+
	  	get(inputTexture,-1./diffuse, -1./diffuse).r*0.05+
	  	get(inputTexture,-1./diffuse, 1./diffuse).r *0.05+
	  	get(inputTexture,1./diffuse, 1./diffuse).r * 0.05;
   return sum;
}
float LaplaceB(){
		float sum = 0.;
		sum =
		get(inputTexture,0./diffuse,0./diffuse).g*-1.+
		get(inputTexture,-1./diffuse, 0./diffuse).g *0.2+
	  	get(inputTexture,0./diffuse, -1./diffuse).g *0.2+
		get(inputTexture,0./diffuse, 1./diffuse).g *0.2+
	  	get(inputTexture,1./diffuse, 0./diffuse).g *0.2 +
	  	get(inputTexture,1./diffuse, -1./diffuse).g *0.05+
	  	get(inputTexture,-1./diffuse, -1./diffuse).g*0.05+
	  	get(inputTexture,-1./diffuse, 1./diffuse).g *0.05+
	  	get(inputTexture,1./diffuse, 1./diffuse).g * 0.05;
   return sum;
}

vec2 render(float a,float b,float laplaceA,float laplaceB){
	float nextA = a + (Da * laplaceA) -
				 (a * b * b) +
				 (feed * (1. - a));
float nextB = b + (Db * laplaceB) +
				 (a * b * b)-
				 ((k +feed) * (b));

 return vec2(clamp(nextA,0.,1.),clamp(nextB,0.,1.));
	}

void main(){
    vec4 backbuffer=get(inputTexture,0.,0.);
    vec4 init=get(initTexture,0.,0.);

float a = get(inputTexture,0.,0.).r;
float b = get(inputTexture,0.,0.).g;

float nextA = a + (Da * LaplaceA()) -
				 (a * b * b) +
				 (feed * (1. - a));
float nextB = b + (Db * LaplaceB()) +
				 (a * b * b)-
				 ((k +feed) * (b));

    float tap=.03;
    if(pointer.x!=.5){
        if(distance(pointer.xy,vUv.xy)<tap){
            nextB = 1.;
        }
    }
    
    gl_FragColor=vec4(
        nextA+init.r,
        nextB+init.g,
        nextA/nextB+init.b,
        1.
    );
}