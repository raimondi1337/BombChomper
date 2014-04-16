// draw.js
// dependencies: none
"use strict";
var app = app || {};

app.draw = {
   clear : function(ctx, x, y, w, h) {
			ctx.clearRect(x, y, w, h);
	},
	
	rect : function(ctx, x, y, w, h, col) {
			ctx.fillStyle = col;
			ctx.fillRect(x, y, w, h);
	},
	
	circle : function(ctx, x, y, r, col) {
			ctx.fillStyle = col;
			ctx.beginPath();
			ctx.arc(x, y, r, 0,  Math.PI, true);
			ctx.closePath();
			ctx.fill();
	},
	
	text : function(ctx, string, x, y, size, col) {
			ctx.font = 'bold '+size+'px Monospace';
			ctx.fillStyle = col;
			ctx.fillText(string, x, y);
	},
	
	backgroundGradient: function(ctx, width, height){
		// Create gradient - top to bottom
		var grd = ctx.createLinearGradient(0,0,0,300);
		grd.addColorStop(0,"red");
		grd.addColorStop(0.5,"yellow");
		grd.addColorStop(1,"orange");
			
		// change this to fill entire ctx with gradient
		ctx.fillStyle=grd;
		ctx.fillRect(0,0,width,height);
	},
	
	start : function(ctx){
		ctx.save();
		this.rect(ctx,0,0,window.innerWidth, window.innerHeight, "rgba(100,100,100,1.0)");
		this.text(ctx,"Bomb Chomper!", window.innerWidth*0.15, window.innerHeight*0.25, 72, "rgba(200,100,100,1.0)");
		this.text(ctx,"Use the arrow keys to move and intercept the bombs.", window.innerWidth*0.15, window.innerHeight*0.40, 36, "rgba(200,100,100,1.0)");
		this.text(ctx,"Don't let the bombs hit your home planet!", window.innerWidth*0.15, window.innerHeight*0.50, 36, "rgba(200,100,100,1.0)");
		this.text(ctx,"Press any key to continue.", window.innerWidth*0.15, window.innerHeight*0.60, 36, "rgba(200,100,100,1.0)");
		this.text(ctx,"Created by: Dustin Raimondi and Rob Prorok", window.innerWidth*0.15, window.innerHeight*0.90, 28, "rgba(200,100,100,1.0)");
		ctx.restore();
	},
	
	gameover : function(ctx){
		this.rect(ctx,0,0,window.innerWidth, window.innerHeight, "rgba(100,100,100,1.0)");
		this.text(ctx,"Your Score is " + app.bombchomp.score, window.innerWidth*0.15, window.innerHeight*0.25, 72, "rgba(200,100,100,1.0)");
		this.text(ctx,"Press any key to return to the main menu.", window.innerWidth*0.15, window.innerHeight*0.40, 36, "rgba(200,100,100,1.0)");
	},

	paused : function(ctx){
		this.rect(ctx,0,0,window.innerWidth, window.innerHeight, "rgba(100,100,100,1.0)");
		this.text(ctx,"PAUSED", window.innerWidth*0.15, window.innerHeight*0.25, 72, "rgba(200,100,100,1.0)");
	}		
};
