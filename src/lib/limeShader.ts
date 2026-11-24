// Ray-traced lime slice (finite cylinder) — cross-section with segments,
// juice vesicles, pith and rind; wet specular light follows the pointer.
export const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

export const FRAG = `precision highp float;
uniform vec2 uRes;uniform float uTime;uniform vec2 uTilt;uniform vec2 uLight;
#define PI 3.14159265
#define N 10.0
float hash(vec2 p){return fract(sin(dot(p,vec2(41.3,289.1)))*45758.5453);}
vec2 hash2(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return fract(sin(p)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}
vec2 voronoi(vec2 x){vec2 n=floor(x),f=fract(x);float md=8.;float id=0.;
 for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){vec2 g=vec2(float(i),float(j));vec2 o=.15+.7*hash2(n+g);vec2 r=g+o-f;float d=dot(r,r);if(d<md){md=d;id=hash(n+g);}}
 return vec2(sqrt(md),id);}
mat3 rX(float a){float c=cos(a),s=sin(a);return mat3(1.,0.,0.,0.,c,s,0.,-s,c);}
mat3 rY(float a){float c=cos(a),s=sin(a);return mat3(c,0.,-s,0.,1.,0.,s,0.,c);}
mat3 rZ(float a){float c=cos(a),s=sin(a);return mat3(c,s,0.,-s,c,0.,0.,0.,1.);}
void main(){
 vec2 uv=(gl_FragCoord.xy-.5*uRes)/min(uRes.x,uRes.y);
 vec3 ro=vec3(0.,0.,3.4);vec3 rd=normalize(vec3(uv,-1.5));
 float spin=uTime*.07;
 mat3 R=rY(uTilt.x)*rX(uTilt.y)*rZ(spin);
 mat3 Ri=rZ(-spin)*rX(-uTilt.y)*rY(-uTilt.x);
 vec3 o=Ri*ro,d=Ri*rd;
 float H=.11;float tb=1e9;int hit=0;vec3 nl=vec3(0.);
 for(int k=0;k<2;k++){float s=k==0?1.:-1.;
  if(abs(d.z)>1e-5){float t=(s*H-o.z)/d.z;vec3 q=o+t*d;if(t>0.&&dot(q.xy,q.xy)<=1.&&t<tb){tb=t;hit=1;nl=vec3(0.,0.,s);}}}
 float a=dot(d.xy,d.xy),b=dot(o.xy,d.xy),c=dot(o.xy,o.xy)-1.;float disc=b*b-a*c;
 if(disc>0.){float t=(-b-sqrt(disc))/a;vec3 q=o+t*d;if(t>0.&&abs(q.z)<=H&&t<tb){tb=t;hit=2;nl=vec3(normalize(q.xy),0.);}}
 if(hit==0){gl_FragColor=vec4(0.);return;}
 vec3 p=o+tb*d;vec3 col;float wet=0.;float gloss=40.;
 vec3 rindOut=vec3(.13,.29,.05),rindIn=vec3(.47,.63,.17),pith=vec3(1.,.99,.86);
 if(hit==1){
  float r=length(p.xy);float ang=atan(p.y,p.x);
  float segW=2.*PI/N;float seg=floor((ang+segW*.5)/segW);
  float sa=mod(ang+segW*.5,segW)-segW*.5;
  float md=(segW*.5-abs(sa))*r;
  float outer=.835-.035*pow(abs(sa)/(segW*.5),3.);
  float pm=smoothstep(.007,.016,md)*smoothstep(.07,.11,r)*(1.-smoothstep(outer-.012,outer,r));
  vec2 vp=vec2(r*7.5,sa*r*30.)+vec2(seg*3.7,seg*9.1);
  vec2 v=voronoi(vp);
  float ves=1.-smoothstep(.05,.85,v.x);
  vec3 pa=vec3(.55,.72,.16),pb=vec3(.86,.94,.48);
  float radial=smoothstep(.85,.15,r);
  vec3 pulp=mix(pa,pb,ves*.6+v.y*.15+radial*.25)*(.82+.26*ves);
  pulp+=vec3(.04,.05,0.)*noise(p.xy*25.);
  col=mix(pith,pulp,pm);
  col=mix(col,pith*.97,1.-smoothstep(.045,.075,r));
  float rb=smoothstep(.895,.905,r);
  col=mix(col,mix(rindIn,rindOut,smoothstep(.905,.975,r)),rb);
  col*=1.-.18*smoothstep(.6,.84,r)*pm;
  wet=pm*(.35+.65*ves)+(1.-pm)*.25*(1.-rb);
  gloss=mix(24.,90.,ves*pm);
 }else{
  float ang=atan(p.y,p.x);
  float n=noise(vec2(ang*60.,p.z*55.))*.6+noise(vec2(ang*160.,p.z*150.))*.4;
  col=rindOut*(.78+.45*n);
  col=mix(col,rindIn*.8,smoothstep(.06,.11,abs(p.z))*.0);
  wet=.35;gloss=30.;
 }
 vec3 N3=normalize(R*nl);vec3 L=normalize(vec3(uLight,1.1));vec3 V=-rd;
 float dif=.82+.3*max(dot(N3,L),0.);
 float spec=pow(max(dot(reflect(-L,N3),V),0.),gloss)*wet;
 float fres=pow(1.-max(dot(N3,V),0.),3.);
 col=col*dif+spec*vec3(1.,1.,.92)*1.1+fres*.08;
 col+=vec3(.04,.06,.0)*wet;
 gl_FragColor=vec4(pow(col,vec3(.96)),1.);
}`;
