"use strict";
app.Missle = function(){

	function Missle(image,canvasWidth,canvasHeight) {
		// ivars
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.active = true;
		this.age = Math.floor(Math.random() * 128);
		this.color = "#A2B";
		this.x = this.canvasWidth / 4 + Math.random() * this.canvasWidth / 2;
		this.y = 0;
		this.xVelocity = 0
		this.yVelocity = 200;
		this.amplitude = app.utilities.getRandom(1.5,7.0); // in utils.js
		this.image = image;
		this.width = 20;
		this.height = 40;
	};

	var p = Missle.prototype;
	
	p.draw = function(ctx) {
		var halfW = this.width/2;
		var halfH = this.height/2;
		if(!this.image){
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x - halfW, this.y - halfH,
			this.width, this.height);
		} else{
			ctx.drawImage(this.image,this.x - halfW, this.y - halfH,this.width, this.height);
		}
	};
	
	p.update = function(dt) {
		this.xVelocity = this.amplitude * Math.sin(this.age * Math.PI * dt);
		this.x += this.xVelocity;
		this.y += this.yVelocity *dt;
		this.age++;
		this.active = this.active && inBounds(this);
	};
	
	p.explode = function() {
		this.active = false;
	};
	
	// private
	function inBounds(obj) {
		return obj.y <= obj.canvasHeight + obj.height * 0.5;
	};
	return Enemy;
}();