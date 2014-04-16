"use strict";
var app = app || {};

app.planet = {
	color: "green",
	x: 0,
	y: window.innerHeight*0.9,
	width: window.innerWidth,
	height: window.innerHeight/10,
	health: 1,
	image: undefined,
	
	
	draw: function(ctx){		
		if(!this.image){
			app.draw.rect(ctx, this.x, this.y, this.width,this.height, this.color);
		} else{
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		}
	}
};