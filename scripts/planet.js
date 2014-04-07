"use strict";
var app = app || {};

app.Planet = function(){

	function Planet(x,y){
		// ivars - unique for every instance
		this.x = ;
		this.y = ;
		this.health = 5;
		this.width = canvas.width;
		this.height = canvas.height - 100;
		this.color = "green";
	} // end Bullet Constructor
	
	
	var p = Planet.prototype;
		
	p.update = function(dt) {
		this.x += this.xVelocity * dt;
		this.y += this.yVelocity * dt;
		this.active = this.active && inBounds(this.y);
	};

	p.draw = function(ctx) {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(288, 75, 70, 0, Math.PI, false);
		ctx.closePath();
		ctx.lineWidth = 5;
		ctx.fillStyle = 'red';
		ctx.fill();
		ctx.strokeStyle = '#550000';
		ctx.stroke();
	};
	
	return Planet; 
}();