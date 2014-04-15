// ship.js
// dependencies: app.draw module
// description: singleton object
"use strict";
var app = app || {};

var dtr = function(degrees){
	return degrees * Math.PI / 180; 
}
app.player = {
	color: "yellow",
	x: 320,
	y: 420,
	width: 34,
	height: 42,
	angle: 0,
	speed: window.innerWidth/3,
	image: undefined,
	
	
	draw: function(ctx){
		//ctx.fillRect() draws from the upper left of the x,y
		// we're doing these calculations so we are drawing the ship
		// from the center x,y
		var halfW = this.width/2;
		var halfH = this.height/2;
		var sourceX = 28;
		var sourceY = 2;
		var sourceWidth = 17;
		var sourceHeight = 21;
		var destX = this.x - halfW;
		var destY = this.y - halfH;
		var destWidth = this.width;
		var destHeight = this.height;
		
		if(!this.image){
			ctx.save();
			ctx.translate(this.x+halfW,this.y+halfH);
			ctx.rotate(dtr(this.angle));
							
			app.draw.rect(ctx, 0-halfW, 0-halfH, this.width, this.height, this.color);
			
			ctx.restore();
		} else{
			ctx.drawImage(this.image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
		}
	},
	
	moveLeft: function(dt){
		this.angle -=2;
	},
	
	moveRight: function(dt){
		this.angle +=2;
	},
	
	moveUp: function(dt){
		var rotAsRad = dtr(this.angle -90);
			
		// second, find the x component of the change
		var vx =  Math.cos(rotAsRad) * this.speed;
		
		// third, find the y component of the change
		var vy =  Math.sin(rotAsRad) * this.speed;
		
		// update the x and y of the player
		this.x += vx * dt;
		this.y += vy * dt;
	},
	
	moveDown: function(dt){
		//this.y += this.speed * dt;
	}
};