// ship.js
// dependencies: app.draw module
// description: singleton object
"use strict";
var app = app || {};

app.ship = {
	color: "yellow",
	x: 320,
	y: 420,
	width: 34,
	height: 42,
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
			app.draw.rect(ctx, this.x - halfW, this.y - halfH, this.width, this.height, this.color);
		} else{
			ctx.drawImage(this.image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
		}
	},
	
	moveLeft: function(dt){
		this.x -= this.speed * dt;
	},
	
	moveRight: function(dt){
		this.x += this.speed * dt;
	},
	
	moveUp: function(dt){
		this.y -= this.speed * dt;
	},
	
	moveDown: function(dt){
		this.y += this.speed * dt;
	}
};