// bombchomp.js
"use strict";

var app = app || {};

app.bombchomp = {
    	// CONSTANT properties
    	WIDTH : window.innerWidth, 
    	HEIGHT: window.innerHeight,
    	ENEMY_PROBABILITY_PER_SECOND: 0.5,
    	
		// variable properties
		canvas : undefined,
		ctx :  undefined,
		dt: 1/60.0, // "delta time"
		player: undefined,
		cooldown: 0,
		bombs: [],
		bombImage: undefined,
		score: 0,
		planet: undefined,
		explosions: [],
		explosionImage: undefined,
		explosionImage2: undefined,
		GAME_STATE_BEGIN: 0,
		GAME_STATE_PLAYING: 1,
		GAME_STATE_OVER: 2,
		gamestate: undefined,
		space: undefined,
		
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
			
			// set up player player
			this.player = app.player;
			
			//set up planet
			this.planet = app.planet;
			
			//create an image object
			var image = new Image();
			
			//get the player PNG - it was already loaded for us
			image.src = app.IMAGES['playerImage'];
			this.player.image = image;
			
			var image = new Image();
			image.src = app.IMAGES['planetImage'];
			this.planet.image = image;
			
			var image = new Image();
			image.src = app.IMAGES['bombImage'];
			this.bombImage = image;
			
			//Part C
			var image = new Image();
			image.src = app.IMAGES['explosionImage'];
			this.explosionImage = image;
			
			var image = new Image();
			image.src = app.IMAGES['explosionImage2'];
			this.explosionImage2 = image;
			
			var image = new Image();
			image.src = app.IMAGES['spaceImage'];
			this.space = image;
			
			this.gamestate = this.GAME_STATE_BEGIN;
			var game = this;
			
			
			window.addEventListener('keydown', function(event){
				if(game.gamestate == game.GAME_STATE_BEGIN){
					console.log(game.gamestate);
					game.gamestate = game.GAME_STATE_PLAYING;
				}
				if(game.gamestate == game.GAME_STATE_OVER){
					game.gamestate = game.GAME_STATE_BEGIN;
				}
			});
			
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
		// DRAW	
		if(this.gamestate == this.GAME_STATE_BEGIN){
			app.draw.start(this.ctx);
		} // end if
		
		if(this.gamestate == this.GAME_STATE_OVER){
			app.draw.gameover(this.ctx);
			app.planet.health = 10;
			this.score = 0;
			this.bombs = [];
		} // end 
		
		if(this.gamestate == this.GAME_STATE_PLAYING){
			// move sprites
			this.moveSprites();
			
			// CHECK FOR COLLISIONS	
			this.checkForCollisions();
			this.ctx.drawImage(this.space,0,0,this.WIDTH, this.HEIGHT);
			this.drawSprites();
			
			this.ctx.globalAlpha = 1.0;
			this.drawHUD();
			if(app.planet.health == 0){
				this.gamestate = this.GAME_STATE_OVER;
			}
		}
		
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
		//draw planet
		this.planet.draw(this.ctx);
		
		this.player.draw(this.ctx); // the player knows how to draw itself
		
		//draw bombs
		for(var i=0; i < this.bombs.length; i++){
			this.bombs[i].draw(this.ctx);
		};
		
		//draw explosions
		for(var i=0; i< this.explosions.length; i++){
			this.explosions[i].draw(this.ctx);
		};
	},
	
	moveSprites: function(){
		//Ask "Key Daemon" which keys are down
		if(app.keydown[app.KEYBOARD.KEY_LEFT]){
			this.player.moveLeft(this.dt);
		}
		if(app.keydown[app.KEYBOARD.KEY_RIGHT]){
			this.player.moveRight(this.dt);
		}
		if(app.keydown[app.KEYBOARD.KEY_UP]){
			this.player.moveUp(this.dt);
		}
		if(app.keydown[app.KEYBOARD.KEY_DOWN]){
			this.player.moveDown(this.dt);
		}
		
		//keep player on screen
		//clamp(val,min,max)
		var paddingX = this.player.width/2;
		var paddingY = this.player.height/2;
		this.player.x = app.utilities.clamp(this.player.x, paddingX, this.WIDTH - paddingX);
		this.player.y = app.utilities.clamp(this.player.y, paddingY, this.HEIGHT - paddingY);
				
		//Enemy
		
		for(var i=0; i<this.bombs.length; i++){
			this.bombs[i].update(this.dt);
		};
		
		//array filter() returns a new array with only active bombs
		this.bombs = this.bombs.filter(function(bomb){
			return bomb.active;
		});
		
		if(Math.random() < this.ENEMY_PROBABILITY_PER_SECOND/60){
			this.bombs.push(new app.Bomb(this.bombImage,this.WIDTH, this.HEIGHT));
			
			console.log("New Enemy created! bombs.length = " + this.bombs.length);
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
				
		//bombs v player
		this.bombs.forEach(function(bomb){
			if(self.collides(bomb, self.player, true)){
				bomb.explode();
				self.score += 5;
			}else if(self.collides(bomb, self.planet, true)){
				bomb.explode();
				self.createExplosion(bomb.x,bomb.y,-bomb.xVelocity/4,-bomb.yVelocity/4);
				app.planet.health--;
			}
		});
		if(app.planet.health == 0){
			this.gameState = this.GAME_STATE_OVER;
		}
	},
	
	/*
	a = sprite1
	b = sprite2
	Here we're assuming sprite1 and sprite2 all have x,y,width,and height
	- which they do - but if it would be nice if JS had something like
	Java Interfaces to guarantee that.
	*/
	
	collides: function(a,b,upperLeftAnchor){
		if(!upperLeftAnchor){
			//clone objects
			var a = Object.create(a);
			var b = Object.create(b);
			
			//move x,y
			a.x -= a.width/2;
			a.y -= a.height/2;
			b.x -= b.width/2;
			b.y -= b.height/2;
		}
		
		return a.x < b.x + b.width && 
		a.x + a.width > b.x && 
		a.y < b.y + b.height &&
		a.y + a.height > b.y;
	},//end collides
    
	drawHUD: function(){
		app.draw.text(this.ctx,"Score: " + this.score, 20, 20, 16,"#ddd");
		app.draw.text(this.ctx,"Planet Health: " + app.planet.health, this.WIDTH - 200, 20, 16,"#ddd");
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