window.onload = init;

var app = app || {};

function init(){
	setupCanvas();

	update();
	
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

function setupCanvas(){
	canvas.style.position="absolute";
	canvas.style.top="0";
	canvas.style.left="0";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}