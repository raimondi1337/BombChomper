"use strict";
app.Bomb = function(){

	function Bomb(image,canvasWidth,canvasHeight) {
		// ivars
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.active = true;
		this.color = "red";
		this.x = this.canvasWidth * Math.random();
		this.y = 0;
		this.yVelocity = 5;
		this.radius = 20;
	};

	var p = Bomb.prototype;
	
	p.draw = function(ctx) {
		ctx.beginPath();
		ctx.arc(this.x,this.y,radius,0,2*Math.PI);
		ctx.stroke();
	};
	
	p.update = function(dt) {
		this.y += this.yVelocity *dt;
		this.active = this.active && inBounds(this);
	};
	
	p.explode = function() {
		this.active = false;
	};
	
	// private
	function inBounds(obj) {
		return obj.y <= obj.canvasHeight + obj.height * 0.5;
	};
	return Bomb;
}