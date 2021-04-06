var MATH={}
MATH.radians=function(a){
	return (a%360)*(Math.PI/180)
}
MATH.degrees=function(a){
	return (a*(180/Math.PI))%360
}
MATH.sin=function(a){
	return MATH.round(Math.sin(a%360)*1000000000)/1000000000
}
MATH.cos=function(a){
	return MATH.round(Math.cos(a%360)*1000000000)/1000000000
}
MATH.tan=function(a){
	return MATH.round(Math.tan(a%360)*1000000000)/1000000000
}
MATH.atan=function(a,b){
	return MATH.round(Math.atan(a,b)*1000000000)/1000000000
}
MATH.atan2=function(y,x){
	return MATH.round(Math.atan2(y,x)*1000000000)/1000000000
}
MATH.cot=function(a){
	return 1/MATH.tan(a)
}
for (var k of ["abs","ceil","exp","floor","log","log1p","log2","log10","min","max","pow","round","random","sqrt","E","LN2","LN10","LOG2E","LOG10E","PI","SQRT1_2","SQRT2"]){MATH[k]=Math[k]}
MATH.perlin={}
MATH.perlin._ni=function (...args){
	let x=args[0]||0
	let y=args[1]||0
	let z=args[2]||0
	if (args[3]){console.warn("4D Perlin Noise is not avaible!")}
	var p=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,74,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180]
	for (var i=0;i<256;i++){p[256+i]=p[i]}
	function fade(t){return t*t*t*(t*(t*6-15)+10)}
	function lerp(t,a,b){return a+t*(b-a)}
	function grad(hash,x,y,z){
		var h=hash&15
		var u=h < 8?x:y,v=h<4?y:h == 12||h == 14?x:z
		return ((h&1)==0?u:-u)+((h&2)==0?v:-v)
	}
	x=x||0
	y=y||0
	z=z||0
	x+=MATH.perlin._nc[0]
	y+=MATH.perlin._nc[1]
	z+=MATH.perlin._nc[2]
	var floorX=Math.floor(x),floorY=Math.floor(y),floorZ=Math.floor(z)
	var X=floorX&255,Y=floorY&255,Z=floorZ&255
	x-=floorX
	y-=floorY
	z-=floorZ
	var xMinus1=x-1,yMinus1=y-1,zMinus1=z-1
	var u=fade(x),v=fade(y),w=fade(z)
	var A=p[X]+Y,AA=p[A]+Z,AB=p[A+1]+Z,B=p[X+1]+Y,BA=p[B]+Z,BB=p[B+1]+Z
	return lerp(w,lerp(v,lerp(u,grad(p[AA],x,y,z),grad(p[BA],xMinus1,y,z)),lerp(u,grad(p[AB],x,yMinus1,z),grad(p[BB],xMinus1,yMinus1,z))),lerp(v,lerp(u,grad(p[AA+1],x,y,zMinus1),grad(p[BA+1],xMinus1,y,z-1)),lerp(u,grad(p[AB+1],x,yMinus1,zMinus1),grad(p[BB+1],xMinus1,yMinus1,zMinus1))))
}
MATH.perlin._nc=[MATH.random(-0.1,0.1),MATH.random(-0.1,0.1),MATH.random(-0.1,0.1)]
MATH.vector={}
MATH.vector._vec=class _Vec{
	constructor(...a){
		a=this._val(a)
		if (a[0]||a[0]==0){this.x=a[0]}else{return}
		if (a[1]||a[1]==0){this.y=a[1]}else{return}
		if (a[2]||a[2]==0){this.z=a[2]}else{return}
		if (a[3]||a[3]==0){this.w=a[3]}else{return}
	}
	set(...a){
		a=this._val(a)
		if (a[0]||a[0]==0){this.x=a[0]}else{return}
		if (a[1]||a[1]==0){this.y=a[1]}else{return}
		if (a[2]||a[2]==0){this.z=a[2]}else{return}
		if (a[3]||a[3]==0){this.w=a[3]}else{return}
		return this
	}
	add(...a){
		a=this._val(a)
		if (this.x&&(a[0]||a[0]==0)){this.x+=a[0]}else{return}
		if (this.y&&(a[1]||a[1]==0)){this.y+=a[1]}else{return}
		if (this.z&&(a[2]||a[2]==0)){this.z+=a[2]}else{return}
		if (this.w&&(a[3]||a[3]==0)){this.w+=a[3]}else{return}
		return this
	}
	sub(...a){
		a=this._val(a)
		if (this.x&&(a[0]||a[0]==0)){this.x-=a[0]}else{return}
		if (this.y&&(a[1]||a[1]==0)){this.y-=a[1]}else{return}
		if (this.z&&(a[2]||a[2]==0)){this.z-=a[2]}else{return}
		if (this.w&&(a[3]||a[3]==0)){this.w-=a[3]}else{return}
		return this
	}
	mult(a){
		a=this._val(a)
		if (this.x||this.x==0){this.x*=a}else{return}
		if (this.y||this.y==0){this.y*=a}else{return}
		if (this.z||this.z==0){this.z*=a}else{return}
		if (this.w||this.w==0){this.w*=a}else{return}
		return this
	}
	div(a){
		a=this._val(a)
		if (this.x||this.x==0){this.x/=a}else{return}
		if (this.y||this.y==0){this.y/=a}else{return}
		if (this.z||this.z==0){this.z/=a}else{return}
		if (this.w||this.w==0){this.w/=a}else{return}
		return this
	}
	limit(a){
		a=this._val(a)
		if (this.mag()**2>a**2){this.div(this.mag()).mult(a)}
		return this
	}
	mag(){
		var a=0
		if (this.x||this.x==0){a+=this.x**2}else{return Math.sqrt(a)}
		if (this.y||this.y==0){a+=this.y**2}else{return Math.sqrt(a)}
		if (this.z||this.z==0){a+=this.z**2}else{return Math.sqrt(a)}
		if (this.w||this.w==0){a+=this.w**2}else{return Math.sqrt(a)}
		return Math.sqrt(a)
	}
	normalize(){
		if (this.mag()!=0){this.mult(1/this.mag())}
		return this
	}
	setMag(a){
		a=this._val(a)
		return this.normalize().mult(a)
	}
	transform(m){
		if (m.constructor.name!="TMatrix"){return this}
		var a=this.toMatrix(true)
		a.apply(m)
		var b=[]
		for (var k of a.get()){b.push(k[0])}
		this.set(...b)
		return this
	}
	dist(...a){
		var v=parseInt(this.constructor.name.replace("Vec",""))
		if (v==1){v=new MATH.vector._vec1(this)}
		if (v==2){v=new MATH.vector._vec2(this)}
		if (v==3){v=new MATH.vector._vec3(this)}
		if (v==4){v=new MATH.vector._vec4(this)}
		return this.copy().sub(v).mag()
	}
	copy(){
		var v=parseInt(this.constructor.name.replace("Vec","")),k=null
		if (v==1){k=new MATH.vector._vec1(this)}
		if (v==2){k=new MATH.vector._vec2(this)}
		if (v==3){k=new MATH.vector._vec3(this)}
		if (v==4){k=new MATH.vector._vec4(this)}
		return k
	}
	toMatrix(_s){
		var a=[]
		if (this.x||this.x==0){a.push(this.x)}
		if (this.y||this.y==0){a.push(this.y)}
		if (this.z||this.z==0){a.push(this.z)}
		if (this.w||this.w==0){a.push(this.w)}
		if (_s==true){a.push(1)}
		return new MATH.matrix._mtr(a)
	}
	toArray(){
		var a=[]
		if (this.x||this.x==0){a.push(this.x)}else{return a}
		if (this.y||this.y==0){a.push(this.y)}else{return a}
		if (this.z||this.z==0){a.push(this.z)}else{return a}
		if (this.w||this.w==0){a.push(this.w)}else{return a}
		return a
	}
	toString(){
		var a=[]
		if (this.x||this.x==0){a+=`,${this.x}`}else{return a.substring(1)}
		if (this.y||this.y==0){a+=`,${this.y}`}else{return a.substring(1)}
		if (this.z||this.z==0){a+=`,${this.z}`}else{return a.substring(1)}
		if (this.w||this.w==0){a+=`,${this.w}`}else{return a.substring(1)}
		return a
	}
	_val(a){
		for (var i=a.length-1;i>=0;i--){if (a[i]==undefined||a[i]==null){a.splice(i,1)}}
		var v=parseInt(this.constructor.name.replace("Vec",""))
		if (Array.isArray(a)&&a.length==1&&a[0].constructor.name.startsWith("Vec")){a=a[0].toArray()}
		if (Array.isArray(a)&&Array.isArray(a[0])){a=a[0]}
		if (Array.isArray(a)&&a.length>v){a=a.splice(0,v)}
		if (Array.isArray(a)&&a.length<v){
			while (true){
				if (a.length==v){break}
				a.push(0)
			}
		}
		return a
	}
	log(){
		var str=`Vector > ${this.constructor.name}\n`
		for (var x=0;x<`Vector > ${this.constructor.name}`.length;x++){str+="-"}
		str+="\nData:"
		if (this.x||this.x==0){str+=`\n\t> x => ${this.x}`}else{console.log(str);return}
		if (this.y||this.y==0){str+=`\n\t> y => ${this.y}`}else{console.log(str);return}
		if (this.z||this.z==0){str+=`\n\t> z => ${this.z}`}else{console.log(str);return}
		if (this.w||this.w==0){str+=`\n\t> w => ${this.w}`}else{console.log(str);return}
		console.log(str)
		return this
	}
	to2D(){
		var s=200/(this.z+200)
		return new MATH.vector._vec2(s*this.x,s*this.y)
	}
}
MATH.vector._vec1=class Vec1 extends MATH.vector._vec{
	constructor(x){
		super(x)
	}
}
MATH.vector._vec2=class Vec2 extends MATH.vector._vec{
	constructor(x,y){
		super(x,y)
	}
}
MATH.vector._vec3=class Vec3 extends MATH.vector._vec{
	constructor(x,y,z){
		super(x,y,z)
	}
}
MATH.vector._vec4=class Vec4 extends MATH.vector._vec{
	constructor(x,y,z,w){
		super(x,y,z,w)
	}
}
MATH.matrix={}
MATH.matrix._mtr=class Matrix{
	constructor(w,h){
		var fl=null
		if (h==undefined&&w!=undefined){
			for (var y=0;y<w.length;y++){
				if (!Array.isArray(w[y])){w[y]=[w[y]]}
			}
			fl=Object.assign([],w)
			h=w.length
			w=w[0].length
		}
		this.data=[]
		for (var y=0;y<h;y++){
			this.data.push([])
			for (var x=0;x<w;x++){
				this.data[y].push(0)
			}
		}
		if (fl!=null){
			this.fill(fl)
		}
	}
	fill(dt){
		for (var y=0;y<dt.length;y++){
			if (!Array.isArray(dt[y])){dt[y]=[dt[y]]}
		}
		for (var y=0;y<this.data.length;y++){
			for (var x=0;x<this.data[0].length;x++){
				this.data[y][x]=dt[y][x]
			}
		}
		return this
	}
	apply(tm){
		if (tm.constructor.name!="TMatrix"){return this}
		this._opr(tm,function(a,b){return a*b},true)
	}
	set(x,y,v){
		this.data[y][x]=v
		return this
	}
	get(){
		return this.data
	}
	_opr(dt,f,st){
		if (dt.constructor.name=="Matrix"||dt.constructor.name=="TMatrix"){dt=dt.data}
		if (st!=true){
			for (var y=0;y<this.data.length;y++){
				for (var x=0;x<this.data[0].length;x++){
					this.data[y][x]=f(this.data[y][x],(Array.isArray(dt)?dt[y][x]:dt))
				}
			}
		}
		else{
			if (dt[0].length!=this.data.length){console.warn("Rows A doesn't match columns B");return this}
			var na=new MATH.matrix._mtr(this.data[0].length,this.data.length)
			for (var Ax=0;Ax<this.data[0].length;Ax++){
				for (var By=0;By<dt.length;By++){
					var pr=0
					for (var x=0;x<dt.length;x++){
						pr+=f(dt[By][x],this.data[x][Ax])
					}
					na.set(Ax,By,pr)
				}
			}
			this.data=na.data
		}
		return this
	}
	add(dt){
		return this._opr(dt,function(a,b){return a+b})
	}
	sub(dt){
		return this._opr(dt,function(a,b){return a-b})
	}
	mult(dt){
		if (dt.constructor.name=="Matrix"){dt=dt.data}
		return this._opr(dt,function(a,b){return a*b},Array.isArray(dt))
	}
	div(dt){
		if (dt.constructor.name=="Matrix"){dt=dt.data}
		return this._opr(dt,function(a,b){return a/b},Array.isArray(dt))
	}
	log(){
		var sf=this.constructor.name=="TMatrix"?` > ${this.d}D > ${this.t}`:""
		var str=`${this.constructor.name+sf} => ${this.data[0].length} x ${this.data.length}\n`
		for (var k=0;k<`${this.constructor.name+sf} => ${this.data[0].length} x ${this.data.length}`.length;k++){
			str+="-"
		}
		str+="\n"
		var wm=[],km=[]
		for (var y=0;y<this.data.length;y++){
			for (var x=0;x<this.data[0].length;x++){
				if (wm[x]==undefined){wm[x]=0}
				if (wm[x]<this.data[y][x].toString().replace("-","").length+1){wm[x]=this.data[y][x].toString().replace("-","").length+1}
				if (km[x]==undefined){km[x]=false}
				if (km[x]==false&&this.data[y][x]<0){km[x]=true}
			}
		}
		for (var y=0;y<this.data.length;y++){
			for (var x=0;x<this.data[0].length;x++){
				str+=`${(km[x]==true&&this.data[y][x]>=0)?" ":""}${this.data[y][x]}`
				for (var i=0;i<wm[x]-this.data[y][x].toString().replace("-","").length;i++){
					str+=" "
				}
			}
			str=str.substring(0,str.length-1)
			str+="\n"
		}
		console.log(str)
		return this
	}
}
MATH.matrix._tmtr=class TMatrix extends MATH.matrix._mtr{
	constructor(dt,f,st){
		super(dt)
		this.f=f
		this.st=st
		this.t=null
		this.d=null
	}
	combine(m){
		if (m.constructor.name!="TMatrix"){return this}
		this.mult(m.data)
		return this
	}
}
MATH.transform={}
MATH.transform._2={}
MATH.transform._2.blank=function(){
	return new MATH.matrix._tmtr([[1,0,0],[0,1,0],[0,0,1]])
}
MATH.transform._2.translate=function(a,b){
	return new MATH.matrix._tmtr([[0,0,a],[0,0,b],[0,0,1]])
}
MATH.transform._2.scale=function(a,b,fa,fb){
	fa=fa||0
	fb=fb||0
	return new MATH.matrix._tmtr([[a,0,0],[0,b,0],[fa*(1-a),fb*(1-b),1]])
}
MATH.transform._2.rot=function(a,fa,fb){
	fa=fa||0
	fb=fb||0
	a=MATH.radians(a)
	return new MATH.matrix._tmtr([[MATH.cos(a),-MATH.sin(a),fa*(1-MATH.cos(a))+fb*Math.sin(a)],[MATH.sin(a),MATH.cos(a),fb*(1-MATH.cos(a))+fa*Math.sin(a)],[0,0,1]])
}
MATH.transform._2.shearXY=function(a){
	a=MATH.radians(a)
	return new MATH.matrix._tmtr([[1,MATH.tan(a),0],[0,1,0],[0,0,1]])
}
MATH.transform._2.shearYX=function(a){
	a=MATH.radians(a)
	return new MATH.matrix._tmtr([[1,0,0],[MATH.tan(a),1,0],[0,0,1]])
}
MATH.transform._2.reflectX=function(fa){
	fa=fa||0
	return new MATH.matrix._tmtr([[1,0,0],[0,-1,2*fa],[0,0,1]])
}
MATH.transform._2.reflectY=function(fa){
	fa=fa||0
	return new MATH.matrix._tmtr([[-1,0,2*fa],[0,1,0],[0,0,1]])
}
MATH.transform._3={}
MATH.transform._3.blank=function(){
	return new MATH.matrix._tmtr([[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]])
}
MATH.transform._3.translate=function(a,b,c){
	return new MATH.matrix._tmtr([[1,0,0,a],[0,1,0,b],[0,0,1,c],[0,0,0,1]])
}
MATH.transform._3.scale=function(a,b,c,fa,fb,fc){
	fa=fa||0
	fb=fb||0
	fc=fc||0
	return new MATH.matrix._tmtr([[a,0,0,fa*(1-a)],[0,b,0,fb*(1-b)],[0,0,c,fc*(1-c)],[0,0,0,1]])
}
MATH.transform._3.rotX=function(a,fa,fb,fc){
	fb=fb||0
	fc=fc||0
	a=MATH.radians(a)
	return new MATH.matrix._tmtr([[1,0,0,0],[0,MATH.cos(a),-MATH.sin(a),fb*(1-MATH.cos(a))+fc*Math.sin(a)],[0,MATH.sin(a),MATH.cos(a),fc*(1-MATH.cos(a))+fb*Math.sin(a)],[0,0,0,1]])
}
MATH.transform._3.rotY=function(a,fa,fb,fc){
	fa=fa||0
	fc=fc||0
	a=MATH.radians(a)
	return new MATH.matrix._tmtr([[MATH.cos(a),0,-MATH.sin(a),fa*(1-MATH.cos(a))+fc*Math.sin(a)],[0,1,0,0],[MATH.sin(a),0,MATH.cos(a),fc*(1-MATH.cos(a))+fa*Math.sin(a)],[0,0,0,1]])
}
MATH.transform._3.rotZ=function(a,fa,fb,fc){
	fa=fa||0
	fb=fb||0
	a=MATH.radians(a)
	return new MATH.matrix._tmtr([[MATH.cos(a),-MATH.sin(a),0,fa*(1-MATH.cos(a))+fb*Math.sin(a)],[MATH.sin(a),MATH.cos(a),0,fb*(1-MATH.cos(a))+fa*Math.sin(a)],[0,0,1,0],[0,0,0,1]])
}
MATH.transform._3.shearXY=function(a){
	a=MATH.radians(a)
	return new MATH.matrix._tmtr([[1,MATH.tan(a),0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]])
}
MATH.transform._3.shearXZ=function(a){
	a=MATH.radians(a)
	return new MATH.matrix._tmtr([[1,0,MATH.tan(a),0],[0,1,0,0],[0,0,1,0],[0,0,0,1]])
}
MATH.transform._3.shearYZ=function(a){
	a=MATH.radians(a)
	return new MATH.matrix._tmtr([[1,0,0,0],[0,1,MATH.tan(a),0],[0,0,1,0],[0,0,0,1]])
}
MATH.transform._3.shearYX=function(a){
	a=MATH.radians(a)
	return new MATH.matrix._tmtr([[1,0,0,0],[MATH.tan(a),1,0,0],[0,0,1,0],[0,0,0,1]])
}
MATH.transform._3.shearZX=function(a){
	a=MATH.radians(a)
	return new MATH.matrix._tmtr([[1,0,0,0],[0,1,0,0],[MATH.tan(a),0,1,0],[0,0,0,1]])
}
MATH.transform._3.shearZY=function(a){
	a=MATH.radians(a)
	return new MATH.matrix._tmtr([[1,0,0,0],[0,1,0,0],[0,MATH.tan(a),1,0],[0,0,0,1]])
}
MATH.transform._3.reflectXY=function(fa){
	fa=fa||0
	return new MATH.matrix._tmtr([[1,0,0,0],[0,1,0,0],[0,0,-1,2*fa],[0,0,0,1]])
}
MATH.transform._3.reflectYZ=function(fa){
	fa=fa||0
	return new MATH.matrix._tmtr([[-1,0,0,2*fa],[0,1,0,0],[0,0,1,0],[0,0,0,1]])
}
MATH.transform._3.reflectZX=function(fa){
	fa=fa||0
	return new MATH.matrix._tmtr([[1,0,0,0],[0,-1,0,2*fa],[0,0,1,0],[0,0,0,1]])
}
MATH.transform._4={}
MATH.transform._4.blank=function(){
	return new MATH.matrix._tmtr([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,1]])
}
MATH.transform._4.translate=function(a,b,c,d){
	b=b||a
	c=c||b
	d=d||c
	return new MATH.matrix._tmtr([a,b,c,d,0])
}
MATH.transform._4.scale=function(a,b,c,d){
	b=b||a
	c=c||b
	d=d||c
	return new MATH.matrix._tmtr([[a,0,0,0,0],[0,b,0,0,0],[0,0,c,0,0],[0,0,0,d,0],[0,0,0,0,1]])
}
MATH.transform._4.rotXY=function(a){
	a=MATH.radians(a)
	return new MATH.matrix._tmtr([[MATH.cos(a),-MATH.sin(a),0,0,0],[MATH.sin(a),MATH.cos(a),0,0,0],[0,0,1,0,0],[0,0,0,1,0],[0,0,0,0,1]])
}
MATH.transform._4.rotYZ=function(a){
	a=MATH.radians(a)
	return new MATH.matrix._tmtr([[1,0,0,0,0],[0,MATH.cos(a),-MATH.sin(a),0,0],[0,MATH.sin(a),MATH.cos(a),0,0],[0,0,0,1,0],[0,0,0,0,1]])
}
MATH.transform._4.rotXZ=function(a){
	a=MATH.radians(a)
	return new MATH.matrix._tmtr([[MATH.cos(a),0,-MATH.sin(a),0,0],[0,1,0,0,0],[MATH.sin(a),0,MATH.cos(a),0,0],[0,0,0,1,0],[0,0,0,0,1]])
}
MATH.transform._4.rotXW=function(a){
	a=MATH.radians(a)
	return new MATH.matrix._tmtr([[MATH.cos(a),0,0,-MATH.sin(a),0],[0,1,0,0,0],[0,0,1,0,0],[MATH.sin(a),0,0,MATH.cos(a),0],[0,0,0,0,1]])
}
MATH.transform._4.rotYW=function(a){
	a=MATH.radians(a)
	return new MATH.matrix._tmtr([[1,0,0,0,0],[0,MATH.cos(a),0,-MATH.sin(a),0],[0,0,1,0,0],[0,MATH.sin(a),0,MATH.cos(a),0],[0,0,0,0,1]])
}
MATH.transform._4.rotZW=function(a){
	a=MATH.radians(a)
	return new MATH.matrix._tmtr([[1,0,0,0,0],[0,1,0,0,0],[0,0,MATH.cos(a),-MATH.sin(a),0],[0,0,MATH.sin(a),MATH.cos(a),0],[0,0,0,0,1]])
}
MATH.shape={}
MATH.shape._sh=class Shape{
	constructor(sh,prms){
		this.sh=sh
		this.formulas=MATH.shape.formulas[sh]
		this.prms={}
		if (prms){this.set(prms)}
	}
	set(prms){
		this.prms=prms||this.prms
		return this
	}
	get(f,dt){
		return this.formulas[f](dt||this.prms)||null
	}
	log(){
		function args(f){
			var str=""
			for (var k of f.toString().split(":")){
				var a=[]
				k.replace(/a\.([a-zA-Z_]+)/g,function(){
					if (a.indexOf(arguments[1])!=-1){return}
					a.push(arguments[1])
				})
				a.sort()
				var s=a.toString()
				if (s.lastIndexOf(",")!=-1){s=s.substr(0,s.lastIndexOf(","))+" & "+s.substr(s.lastIndexOf(",")+1)}
				s=s.replace(/\,/g,", ")
				str+=` OR ${s}`
			}
			return str.substring(4)
		}
		var str=`Shape => ${this.sh.replace(/\_/g,"-").toUpperCase()}\n`
		for (var x=0;x<`Shape => ${this.sh.replace(/\_/g,"-").toUpperCase()}`.length;x++){str+="-"}
		str+="\nFunctions: \n"
		for (var f of Object.keys(this.formulas)){
			str+=`\t> ${f} (${args(this.formulas[f])})\n`
		}
		str=str.substring(0,str.length-1)
		console.log(str)
		return this
	}
}
MATH.shape.formulas={}
MATH.shape.formulas.triangle={}
MATH.shape.formulas.triangle.circuit=function(a){
	return a.sideA+a.sideB+a.sideC
}
MATH.shape.formulas.triangle.surface=function(a){
	return (a.height*a.base)/2
}
MATH.shape.formulas.right_angle_triangle=Object.assign({},MATH.shape.formulas.triangle)
MATH.shape.formulas.right_angle_triangle.hypotenuse=function(a){
	return MATH.sqrt(a.cathetusA**2+a.cathetusB**2)
}
MATH.shape.formulas.square={}
MATH.shape.formulas.square.circuit=function(a){
	return a.side*4
}
MATH.shape.formulas.square.surface=function(a){
	return (a.diagonal!=undefined?a.diagonal**2/2:a.side**2)
}
MATH.shape.formulas.square.diagonal=function(a){
	return MATH.SQRT2*a.side
}
MATH.shape.formulas.rectangle={}
MATH.shape.formulas.rectangle.circuit=function(a){
	return a.width*2+a.height*2
}
MATH.shape.formulas.rectangle.surface=function(a){
	return (a.diagonal!=undefined?a.diagonal**2/2:a.width*a.height)
}
MATH.shape.formulas.rectangle.diagonal=function(a){
	return MATH.sqrt(a.width**2+a.height**2)
}
MATH.shape.formulas.trapezoid={}
MATH.shape.formulas.trapezoid.circuit=function(a){
	return a.sideA+a.sideB+a.sideC+a.sideD
}
MATH.shape.formulas.trapezoid.surface=function(a){
	return (a.baseA+a.baseB)/2*a.height
}
MATH.shape.formulas.parallelogram={}
MATH.shape.formulas.parallelogram.circuit=function(a){
	return a.base*2+a.side*2
}
MATH.shape.formulas.parallelogram.surface=function(a){
	return a.base*a.height
}
MATH.shape.formulas.parallelogram.diagonalsA=function(a){
	return MATH.sqrt(a.base**2+a.side**2-2*a.base*a.side*MATH.cos(a.angleB))
}
MATH.shape.formulas.parallelogram.diagonalsB=function(a){
	return MATH.sqrt(a.base**2+a.side**2-2*a.base*a.side*MATH.cos(a.angleA))
}
MATH.shape.formulas.rhombus={}
MATH.shape.formulas.rhombus.circuit=function(a){
	return 4*a.side
}
MATH.shape.formulas.rhombus.surface=function(a){
	return a.side*a.height
}
MATH.shape.formulas.rhombus.diagonalsA=function(a){
	return 2*a.side*MATH.cos(a.angleA/2)
}
MATH.shape.formulas.rhombus.diagonalsB=function(a){
	return 2*a.side*MATH.sin(a.angleA/2)
}
MATH.shape.formulas.regular_polygon={}
MATH.shape.formulas.regular_polygon.circuit=function(a){
	return a.side*a.n_of_sides
}
MATH.shape.formulas.regular_polygon.surface=function(a){
	return (a.n_of_sides*a.side**2*MATH.cot(MATH.PI/a.n_of_sides))/4
}
MATH.shape.formulas.circle={}
MATH.shape.formulas.circle.surface=function(a){
	return 2*MATH.PI*a.radius
}
MATH.shape.formulas.circle.volume=function(a){
	return Math.PI*a.radius**2
}
MATH.shape.formulas.prism={}
MATH.shape.formulas.prism.volume=function(a){
	return a.base*a.height
}
MATH.shape.formulas.parallelepiped={}
MATH.shape.formulas.parallelepiped.volume=function(a){
	return a.base*a.height
}
MATH.shape.formulas.rectangular_parallelepiped={}
MATH.shape.formulas.rectangular_parallelepiped.surface=function(a){
	return 2*(a.base_sideA*a.base_sideB+a.base_sideA*a.height+a.base_sideB*a.height)
}
MATH.shape.formulas.rectangular_parallelepiped.volume=function(a){
	return a.base_sideA*a.base_sideB*a.height
}
MATH.shape.formulas.pyramid={}
MATH.shape.formulas.pyramid.surface=function(a){
	return a.base_sideA*a.base_sideB+(a.base_sideA*MATH.sqrt(4*a.height**2+a.base_sideB**2)+a.base_sideB*MATH.sqrt(4*a.height**2+a.base_sideA**2))/2
}
MATH.shape.formulas.pyramid.volume=function(a){
	return (a.base_sideA*a.base_sideB*a.height)/3
}
MATH.shape.formulas.frustum={}
MATH.shape.formulas.frustum.volume=function(a){
	return (a.height*(a.baseA+a.baseB+MATH.sqrt(a.baseA*a.baseB)))/3
}
MATH.shape.formulas.irregular_cylinder={}
MATH.shape.formulas.irregular_cylinder.volume=function(a){
	return a.base*a.height
}
MATH.shape.formulas.cylinder={}
MATH.shape.formulas.cylinder.surface=function(a){
	return 2*MATH.PI*a.base_radius*(a.base_radius+a.height)
}
MATH.shape.formulas.cylinder.volume=function(a){
	return MATH.PI*a.base_radius**2*a.height
}
MATH.shape.formulas.cylinder_cone={}
MATH.shape.formulas.cylinder_cone.surface=function(a){
	return MATH.PI*a.base_radius*(a.base_radius+a.side)
}
MATH.shape.formulas.cylinder_cone.volume=function(a){
	return (MATH.PI*a.base_radius**2*a.height)/3
}
MATH.shape.formulas.cylinder_cone.side=function(a){
	return MATH.sqrt(a.base_radius**2+a.height**2)
}
MATH.shape.formulas.cylinder_cone_frustrum={}
MATH.shape.formulas.cylinder_cone_frustrum.surface=function(a){
	return MATH.PI*(a.base_radiusB**2+a.base_radiusA**2+a.side*(a.base_radiusB+a.base_radiusA))
}
MATH.shape.formulas.cylinder_cone_frustrum.volume=function(a){
	return (MATH.PI*a.height*(a.base_radiusB**2+a.base_radiusA**2+a.base_radiusB*a.base_radiusA))/3
}
MATH.shape.formulas.cylinder_cone_frustrum.side=function(a){
	return MATH.sqrt((a.base_radiusA-a.base_radiusB)**2+a.height**2)
}
MATH.shape.formulas.sphere={}
MATH.shape.formulas.sphere.surface=function(a){
	return 4*MATH.PI**2*a.radius**2
}
MATH.shape.formulas.sphere.volume=function(a){
	return (4*MATH.PI*a.radius**3)/3
}
MATH.shape.formulas.torus={}
MATH.shape.formulas.torus.surface=function(a){
	return 4*MATH.PI**2*a.radiusB*a.radiusA
}
MATH.shape.formulas.torus.volume=function(a){
	return 2*MATH.PI**2*a.radiusB**2*a.radiusA
}
MATH.shape.formulas.tetrahedron={}
MATH.shape.formulas.tetrahedron.surface=function(a){
	return a.edge**3*MATH.sqrt(3)
}
MATH.shape.formulas.tetrahedron.volume=function(a){
	return (a.edge**3*MATH.sqrt(3))/12
}
MATH.shape.formulas.cube={}
MATH.shape.formulas.cube.surface=function(a){
	return 6*a.edge**2
}
MATH.shape.formulas.cube.volume=function(a){
	return a.edge**3
}
MATH.shape.formulas.octahedron={}
MATH.shape.formulas.octahedron.surface=function(a){
	return 2*a.edge**2*MATH.sqrt(3)
}
MATH.shape.formulas.octahedron.volume=function(a){
	return (a.edge**2*MATH.sqrt(3))/3
}
MATH.shape.formulas.dodecahedron={}
MATH.shape.formulas.dodecahedron.surface=function(a){
	return 3*a.edge**2*MATH.sqrt(25+10*MATH.sqrt(5))
}
MATH.shape.formulas.dodecahedron.volume=function(a){
	return (a.edge**2*(25+10*MATH.sqrt(5)))/4
}
MATH.shape.formulas.icosahedron={}
MATH.shape.formulas.icosahedron.surface=function(a){
	return 5*a.edge**2*MATH.sqrt(3)
}
MATH.shape.formulas.icosahedron.volume=function(a){
	return (5*a.edge**2)/12*(3+MATH.sqrt(5))
}
MATH.coords={}
MATH.coords._st=class CoordinatorSystem{
	constructor(st){
		this.st=st
		this.f=MATH.coords.formulas[st]
	}
	get(f,...args){
		return this.f[f](...args)
	}
	log(){
		var str=`CoordinatorSystem > ${this.st.substring(0,1).toUpperCase()+this.st.substring(1)}\n`
		for (var x=0;x<`CoordinatorSystem > ${this.st}`.length;x++){str+="-"}
		str+="\nFunction:"
		for (var k of Object.keys(this.f)){
			str+=`\n\t> ${k}`
		}
		console.log(str)
		return this
	}
}
MATH.coords.formulas={}
MATH.coords.formulas.cartesian={}
MATH.coords.formulas.cartesian.distance=function(p1,p2){
	if (p1.constructor.name.startsWith("Vec")){p1=p1.toArray()}
		if (p2.constructor.name.startsWith("Vec")){p2=p2.toArray()}
			var s=0;for (var ki=0;ki<p1.length;ki++){s+=(p2[ki]-p1[ki])**2};return MATH.sqrt(s)
	}
MATH.coords.formulas.polar={}
MATH.coords.formulas.polar.distance=function(p1,p2){
	return MATH.formulas.cartesian.distance(MATH.formulas.polar.toCartesian(...p1),MATH.formulas.polar.toCartesian(...p2))
}
MATH.coords.formulas.polar.toCatresian=function(...args){
	var r=args[0],a=args[1],b=args[2]
	if (b==undefined){return new MATH.vector.Vec2(r*MATH.cos(a),r*MATH.sin(a))}
		return new MATH.vector.Vec3(r*MATH.sin(b)*MATH.sin(b),r*MATH.cos(b),r*MATH.sin(b)*MATH.cos(b))
}
MATH.coords.formulas.cylindrical={}
MATH.coords.formulas.cylindrical.distance=function(p1,p2){
	return MATH.formulas.cartesian.distance(MATH.formulas.cylindrical.toCartesian(...p1),MATH.formulas.cylindrical.toCartesian(...p2))
}
MATH.coords.formulas.cylindrical.toCatresian=function(r,a,z){
	return new MATH.vector.Vec3(...MATH.coords.formulas.polar.toCatresian(r,a).toArray(),z)
}
MATH.coords.formulas.spherical={}
MATH.coords.formulas.spherical.distance=function(p1,p2){
	return MATH.formulas.cartesian.distance(MATH.formulas.spherical.toCartesian(...p1),MATH.formulas.spherical.toCartesian(...p2))
}
MATH.coords.formulas.spherical.toCatresian=MATH.coords.formulas.polar.toCatresian
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
MATH.create_vector=function(...args){
	if (args.length==1&&args[0].constructor.name.startsWith("vec")){args=args[0].toArray()}
	if (Array.isArray(args)&&Array.isArray(args[0])){args=args[0]}
	var v=args.length
	if (v==1){return new MATH.vector._vec1(...args)}
	if (v==2){return new MATH.vector._vec2(...args)}
	if (v==3){return new MATH.vector._vec3(...args)}
	if (v==4){return new MATH.vector._vec4(...args)}
}
MATH.create_matrix=function(...args){
	return new MATH.matrix._mtr(...args)
}
MATH.create_transform_matrix=function(d,t,...args){
	var m=MATH.transform[`_${d}`][t](...args)
	m.t=t
	m.d=d
	return m
}
MATH.create_shape=function(sh){
	return new MATH.shape._sh(sh)
}
MATH.create_coordinates_system=function(st){
	return new MATH.coords._st(st)
}
MATH.noise=function(...args){
	return MATH.perlin._ni(...args)
}
MATH.load=function(o){
	o=o||window
	for (var f of Object.keys(MATH)){
		var v=MATH[f]
		function isJ(v){try{return JSON.stringify(v)===JSON.stringify(JSON.parse(JSON.stringify(v)))}catch(e){return false}}
		if (!!v&&typeof v==="object"&&!(v instanceof Array)&&!(v instanceof Date)&&isJ(v)){continue}
		o[f]=v
	}
}
