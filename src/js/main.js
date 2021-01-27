MATH.load()

window.onload=function(){
	function sides(c){
		var a=[]
		for (var i=0;i<4;i++){
			a.push([c[i].to2D(),c[(i+1)%4].to2D()])
			a.push([c[i+4].to2D(),c[(i+1)%4+4].to2D()])
			a.push([c[i].to2D(),c[(i+4)].to2D()])
		}
		return a
	}
	var c=[],s=100
	c.push(create_vector(s,s,s))
	c.push(create_vector(s,s,-s))
	c.push(create_vector(-s,s,-s))
	c.push(create_vector(-s,s,s))
	c.push(create_vector(s,-s,s))
	c.push(create_vector(s,-s,-s))
	c.push(create_vector(-s,-s,-s))
	c.push(create_vector(-s,-s,s))

	var cnv=document.getElementsByTagName('canvas')[0]
	cnv.width=1000
	cnv.height=1000
	var ctx=cnv.getContext("2d")
	ctx.fillStyle="red"
	ctx.clearRect(0,0,cnv.width,cnv.height)
	ctx.lineWidth=5
	ctx.lineCap="round"
	var m=create_transform_matrix(3,"rotY",0.1)
	for (var pi=0;pi<c.length;pi++){
		c[pi].transform(create_transform_matrix(3,"rotX",45).combine(create_transform_matrix(3,"rotZ",45)).combine(create_transform_matrix(3,"rotY",45)))
	}
	function draw(){
		ctx.clearRect(0,0,cnv.width,cnv.height)
		for (var pi=0;pi<c.length;pi++){
			c[pi].transform(m)
		}
		for (var v of sides(c)){
			var l=v[0],l2=v[1]
			l.add(cnv.width/2,cnv.height/2)
			l2.add(cnv.width/2,cnv.height/2)
			ctx.beginPath();
			ctx.moveTo(l.x,l.y)
			ctx.lineTo(l2.x,l2.y)
			ctx.closePath()
			ctx.stroke()
		}
		for (var p of c){
			var k=p.copy()
			k=k.to2D()
			k.add(cnv.width/2,cnv.height/2)
			k.sub(5,5)
			ctx.fillRect(...k.toArray(),10,10)
		}
	}
	setInterval(draw,1)
}