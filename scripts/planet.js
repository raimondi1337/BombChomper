"use strict";
var app = app || {};

app.Planet = function(){

	function Planet(x,y){
		// ivars - unique for every instance
		this.x = x;
		this.y = y;
		this.health = 5;
		this.width = 3;
		this.height = 3;
		this.color = "#FFF";
	} // end Bullet Constructor
	
	
	var p = Planet.prototype;
		
	p.update = function(dt) {
		this.x += this.xVelocity * dt;
		this.y += this.yVelocity * dt;
		this.active = this.active && inBounds(this.y);
	};

	p.draw = function(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};
	
	return Planet; 
}();