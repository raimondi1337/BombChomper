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
	speed: 250,
	image: undefined,
	exhaust: undefined,
	init: function(){
		this.exhaust = new app.Emitter();
		this.exhaust.numParticles = 100;
		this.exhaust.red = 255;
		this.exhaust.green = 150;
		
		this.exhaust.createParticles(this.emitterPoint());
	},
	
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
		
		this.exhaust.updateAndDraw(ctx, this.emitterPoint());
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
	},
	
	emitterPoint : function(){
		// 2 pixels underneath the bottom of the ship
		return{
			x:this.x,
			y:this.y + this.height/2 + 2
		};
	}
};