window.onload = init;

var app = app || {};

function init(){
	setupCanvas();

	update();
}

function setupCanvas(){
	canvas.style.position="absolute";
	canvas.style.top="0";
	canvas.style.left="0";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}