// blastem.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

app.blastem = {
    	// CONSTANT properties
    	WIDTH : window.innerWidth, 
    	HEIGHT: window.innerHeight,
    	ENEMY_PROBABILITY_PER_SECOND: 1.0,
    	
		// variable properties
		canvas : undefined,
		ctx :  undefined,
		dt: 1/60.0, // "delta time"
		ship: undefined,
		cooldown: 0,
		enemies: [],
		enemyImage: undefined,
		score: 0,
		
		//Part C
		explosions: [],
		explosionImage: undefined,
		explosionImage2: undefined,
		explosionImage3: undefined,
		
    	init : function() {
			this.canvas = document.querySelector('canvas');
			this.canvas.style.position = "absolute";
			this.canvas.style.top = "0";
			this.canvas.style.left = "0";
			this.canvas.width = this.WIDTH;
			this.canvas.height = this.HEIGHT;
			
			// the canvas context enables us to 
			// interact with the canvas api
			this.ctx = this.canvas.getContext('2d');
			
			// set up player ship
			this.ship = app.ship;
			
			//create an image object
			var image = new Image();
			
			//get the ship PNG - it was already loaded for us
			image.src = app.IMAGES['shipImage'];
			this.ship.image = image;
			
			var image = new Image();
			image.src = app.IMAGES['enemyImage'];
			this.enemyImage = image;
			
			//Part C
			var image = new Image();
			image.src = app.IMAGES['explosionImage'];
			this.explosionImage = image;
			
			var image = new Image();
			image.src = app.IMAGES['explosionImage2'];
			this.explosionImage2 = image;
			
			var image = new Image();
			image.src = app.IMAGES['explosionImage3'];
			this.explosionImage3 = image;
			
			// draw the screen once
			this.update();
    	},
    	
    	
    update: function(){
    	// clear screen
    	
    	app.draw.clear(this.ctx,0,0,this.WIDTH,this.HEIGHT);
		// PAUSED?
		if (app.paused){
			this.drawPauseScreen(this.ctx);
			return;
		 }
	
		// UPDATE
		// move sprites
		this.moveSprites();
		
		// CHECK FOR COLLISIONS	
		this.checkForCollisions();
		
		// DRAW	
		// i) draw background
		app.draw.backgroundGradient(this.ctx,this.WIDTH,this.HEIGHT);
		
		// ii) draw sprites
		this.ctx.globalAlpha = 0.9;
		this.drawSprites();
		
		
		// iii) draw HUD
		this.ctx.globalAlpha = 1.0;
		this.drawHUD();
		
		// LOOP
		// this calls the update() function 60 FPS
		// what happens is we don't use bind?
		app.animationID = requestAnimationFrame(this.update.bind(this));
	},
	
	drawPauseScreen: function(ctx){
		ctx.save();
		app.draw.backgroundGradient(this.ctx,this.WIDTH,this.HEIGHT);
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		app.draw.text(this.ctx, "... PAUSED ...", this.WIDTH/2, this.HEIGHT/2, 60, "white");
		ctx.restore();
	},
	
	
	drawSprites : function (){
		this.ship.draw(this.ctx); // the player knows how to draw itself
		
		//draw enemies
		for(var i=0; i < this.enemies.length; i++){
			this.enemies[i].draw(this.ctx);
		};
		
		//draw explosions
		for(var i=0; i< this.explosions.length; i++){
			this.explosions[i].draw(this.ctx);
		};
	},
	
	moveSprites: function(){
		//Ask "Key Daemon" which keys are down
		if(app.keydown[app.KEYBOARD.KEY_LEFT]){
			this.ship.moveLeft(this.dt);
		}
		if(app.keydown[app.KEYBOARD.KEY_RIGHT]){
			this.ship.moveRight(this.dt);
		}
		if(app.keydown[app.KEYBOARD.KEY_UP]){
			this.ship.moveUp(this.dt);
		}
		if(app.keydown[app.KEYBOARD.KEY_DOWN]){
			this.ship.moveDown(this.dt);
		}
		
		//keep ship on screen
		//clamp(val,min,max)
		var paddingX = this.ship.width/2;
		var paddingY = this.ship.height/2;
		this.ship.x = app.utilities.clamp(this.ship.x, paddingX, this.WIDTH - paddingX);
		this.ship.y = app.utilities.clamp(this.ship.y, paddingY, this.HEIGHT - paddingY);
				
		//Enemy
		
		for(var i=0; i<this.enemies.length; i++){
			this.enemies[i].update(this.dt);
		};
		
		//array filter() returns a new array with only active enemies
		this.enemies = this.enemies.filter(function(enemy){
			return enemy.active;
		});
		
		if(Math.random() < this.ENEMY_PROBABILITY_PER_SECOND/60){
			this.enemies.push(new app.Enemy(this.enemyImage,this.WIDTH, this.HEIGHT));
			
			console.log("New Enemy created! enemies.length = " + this.enemies.length);
		}
		
		//Part C
		//Explosions
		for(var i=0; i < this.explosions.length; i++){
			this.explosions[i].update(this.dt);
		}
		
		this.explosions = this.explosions.filter(function(exp){
			return exp.active;
		});
	},
	
	checkForCollisions: function(){
		//"this" becomes undefined in a foreach loop
		// self will preserve "this" i.e. app.blastum
		var self = this;
				
		//enemies v ship
		this.enemies.forEach(function(enemy){
			if(self.collides(enemy, self.ship)){
				enemy.explode();
				//self.ship.explode();
				self.score += 5;
				self.createExplosion(enemy.x,enemy.y,-enemy.xVelocity/4,-enemy.yVelocity/4);
			}
		});
	},
	
	/*
	a = sprite1
	b = sprite2
	Here we're assuming sprite1 and sprite2 all have x,y,width,and height
	- which they do - but if it would be nice if JS had something like
	Java Interfaces to guarantee that.
	*/
	
	collides: function(a,b){
		return a.x < b.x + b.width && 
		a.x + a.width > b.x && 
		a.y < b.y + b.height &&
		a.y + a.height > b.y;
	},//end collides
    
	drawHUD: function(){
		this.drawText("Score: " + this.score, 20, 20, 16,"#ddd");
	},
	
	drawText: function(string, x, y, size, color) {
			this.ctx.font = 'bold '+size+'px Monospace';
			this.ctx.fillStyle = color;
			this.ctx.fillText(string, x, y);
	},
	
	//Part C
	createExplosion: function(x,y,xVelocity,yVelocity){
	//ExplosionSprite(image,width,height,frameWidth, frameHeight, frameDelay)
		//var exp = new app.ExplosionSprite(this.explosionImage,84,84,84,84,1/7);
		
		//faster and larger
		var exp = new app.ExplosionSprite(this.explosionImage,200,200,84,84,1/14);
		
		//slower and smaller
		//var exp = new app.ExplosionSprite(this.explosionImage,30,30,84,84,1/3);
		
		//image 2
		//var exp = new app.ExplosionSprite(this.explosionImage2,128,128,64,64,1/16);
		
		//image 3
		//var exp = new app.ExplosionSprite(this.explosionImage3,64,32,256,128,1/12);
		
		exp.x = x;
		exp.y = y;
		exp.xVelocity = xVelocity;
		exp.yVelocity = yVelocity;
		this.explosions.push(exp);
		createjs.Sound.play("explosion");
	},
	
	startSoundtrack: function(){
		createjs.Sound.stop();
		createjs.Sound.play("soundtrack", {loop:-1, volume:0.5});
	},
};