(function () {  
  	var canvas = document.getElementById('campo');
  	var ctx = canvas.getContext('2d');
  
  	var campo = {
    	draw : function () {
			// Lineas salida
			ctx.beginPath();
			ctx.rect(0,0, canvas.width, canvas.height);
			ctx.fillStyle = "#060";
			ctx.fill();
			ctx.lineWidth = 1;
			ctx.strokeStyle = "#FFF";
			ctx.stroke();
			ctx.closePath();
			ctx.fillStyle = "#FFF";
			
			// Lineal Medio
			ctx.beginPath();
			ctx.moveTo(0, canvas.height/2);
			ctx.lineTo(canvas.width, canvas.height/2);
			ctx.stroke();
			ctx.closePath();
			
			// Circulo medio
			ctx.beginPath()
			ctx.arc(canvas.width / 2, canvas.height / 2, 73, 0, 2*Math.PI, false);
			ctx.stroke();
			ctx.closePath();
			
			// Arriba
			ctx.beginPath();
			ctx.rect((canvas.width - 322)/2, 0 , 322, 132);
			ctx.stroke();
			ctx.closePath();
			// Arco
			ctx.beginPath();
			ctx.rect((canvas.width - 146)/2, 0 , 146, 44);
			ctx.stroke();
			ctx.closePath();
			
			// Abajo
			ctx.beginPath();
			ctx.rect((canvas.width - 322)/2, canvas.width+150 , 322, 132);
			ctx.stroke();
			ctx.closePath();
			// Arco
			ctx.beginPath();
			ctx.rect((canvas.width - 146)/2, canvas.width+238, 146, 44);
			ctx.stroke();
			ctx.closePath();      
    	}
  	};  
  
	var playerCoordinates = [
		{ x: canvas.width/2, y: 44}, 
		// defensa		
		{ x: canvas.width/2 - 180, y: 160}, 
		{ x: canvas.width/2, y: 160}, 
		{ x: canvas.width/2 + 180, y: 160},		
		{ x: canvas.width/2 - 220, y: canvas.height/3}, 
		{ x: canvas.width/2 + 220, y: canvas.height/3},
		// mediocampo
		{ x: canvas.width/2 - 180, y: canvas.height/2}, 
		{ x: canvas.width/2, y: canvas.height/2}, 
		{ x: canvas.width/2 + 180, y: canvas.height/2},
		// delantera
		{ x: canvas.width/2 - 100, y: 2*canvas.height/3}, 
		{ x: canvas.width/2 + 100, y: 2*canvas.height/3},
	];
	
	var drawPlayers = {
		x: 0,
		y: 0,
		level: 1,
		haveBall: true,
		getLevel: function(point){
			if(point.y === 44){
				this.level = 0;
			}else if(point.y === 160){
				this.level = 1;
			}else if(point.y === canvas.height/3){
				this.level = 2;
			}else if(point.y === canvas.height/2){
				this.level = 3;
			}else if(point.y === 2*canvas.height/3){
				this.level = 4;
			}
		},
		stay: function (point) {
			this.x = point.x,
			this.y = point.y,
	        this.draw();
    	},
		draw: function () {
			ctx.beginPath();
			ctx.fillStyle = (this.haveBall===true) ? "#00F" : "#F00";
			ctx.strokeStyle = "#000";
			ctx.arc(this.x, this.y, 8, 0, 2*Math.PI, false);
			ctx.fill();
			ctx.stroke();
			ctx.closePath();
		}		
	};
  
  	var Ball = {
	    speed: 1.5,
	    x : canvas.width/2,
    	y : 44,
    	collision: function (point) {
      		return Math.abs(this.x - point.x) < 1 ? (Math.abs(this.y - point.y) < 1 ? true : false) : false;
    	},
    	move: function (point) {
      		if (!this.collision(point)) {
				var dist = Math.sqrt(Math.pow(Math.abs(this.x-point.x),2) +  Math.pow(Math.abs(this.y-point.y), 2));
				var v = Math.acos((Math.abs(this.x - point.x) / dist));
				var x = this.speed * Math.cos(v);
				var y = this.speed * Math.sin(v);

				if( point.x >= this.x && point.y >= this.y) {
					this.x += x;
					this.y += y;
				}
				else if ( point.x >= this.x && point.y < this.y) {
					this.x += x;
					this.y -= y;
				}	
				else if ( point.x < this.x && point.y >= this.y) {
					this.x -= x;
					this.y += y;
				}
				else if ( point.x < this.x && point.y < this.y) {
					this.x -= x;
					this.y -= y;
				}
				this.draw();
			}
    	},
		draw: function () {
			campo.draw()
			for (var i = 0; i < playerCoordinates.length; i++) {
				drawPlayers.stay(playerCoordinates[i]);			
			}
			ctx.beginPath();
			ctx.arc(this.x, this.y, 3, 0, 2*Math.PI, false);
			ctx.fillStyle = "#000";
			ctx.strokeStyle = "#000";
			ctx.fill();
			ctx.stroke();
			ctx.closePath(); 
		}
	};
	
	var game = {
	    timer: {},
	    step: function () {
			Ball.move(playerCoordinates[3]);   
		},
    	start: function () {  
	  		campo.draw();
			for (var i = 0; i < playerCoordinates.length; i++) {
				drawPlayers.stay(playerCoordinates[i]);			
			}
		  	this.timer = window.setInterval(this.step, 100);      
    	}
  	};
  	game.start();
})();
