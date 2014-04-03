"use strict";

var app = app || {};

app.game = {
	canvas : undefined,
	ctx :  undefined,

}

	init : function() {
		this.canvas = document.querySelector('canvas');
		this.context = this.canvas.getContext('2d');

		this.canvas.style.position="absolute";
		this.canvas.style.top="0";
		this.canvas.style.left="0";
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		this.context.fillStyle = "#222222";
		this.context.fillRect(0,0,canvas.width,canvas.height);
		
	window.onblur = function(){
		paused = true;
		cancelAnimationFrame(animationID);
		//call update() once so that our paused screen
		//gets drawn
		update();
	};
	
	window.onfocus = function(){
		paused = false;
		update();
	};
	
	}
};

window.onload = app.game.init;
