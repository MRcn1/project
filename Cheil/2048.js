
var game={
	data:null,cn:4,rn:4,
	score:0,state:0,RUNNING:1,GAMEOVER:0,
	start(){
		this.state=this.RUNNING
		this.score=0
		this.data=[]
		for(var r=0;r<this.rn;r++){
			this.data[r]=[]
			for(var c=0;c<this.cn;c++){
				this.data[r][c]=0
			}
		}
		this.randomNum()
		this.randomNum()
		this.updateview()
		document.onkeydown=function(e){
			switch(e.keyCode){
				case 37:this.moveLeft()
				break;
				case 38:this.moveTop()
				break;
				case 39:this.moveRight()
				break;
				case 40:this.moveDown()
				break;
			}
		}.bind(this)
	},

	moveLeft(){								
		var before=String(this.data);			
		for(var r=0;r<this.rn;r++){				
			this.moveLeftInRow(r)				
		}										
		var after=String(this.data);			
		if (before!=after) {					
			this.randomNum()					
			// if(this.isGameover()){this.state=this.GAMEOVER}
			this.updateview()					
		}
	},

	// isGameover(){
	// 	for(var r=0;r<this.rn;r++){
	// 		for(var c=0;c<this.cn;c++){
	// 			if(this.data[r][c]==0){
	// 				return false;
	// 			}else if(c<this.cn-1&&this.data[r][c]==this.data[r][c+1]){
	// 				return false;
	// 			}else if(r<this.rn-1&&this.data[r][c]==this.data[r+1][c]){
	// 				return false;
	// 			}else{
	// 				return true;
	// 			}
	// 		}
	// 	}
	// },
	
	moveLeftInRow(r){							
		for(var c=0;c<this.cn-1;c++){			
			var nextc=this.getNextInRow(r,c);	
			if (nextc==-1) {					
				break;
			}else if(this.data[r][c]==0){		
				this.data[r][c]=this.data[r][nextc];	
				this.data[r][nextc]=0  			
				c--  							
			}else if(this.data[r][c]==this.data[r][nextc]){		
				this.data[r][c]*=2  			
				this.score+=this.data[r][c]
				this.data[r][nextc]=0  			
			}
		}
	},
	getNextInRow(r,c){       					
		for(var i=c+1;i<this.cn;i++){ 			
			if (this.data[r][i]!=0) {			
				return i
			}											
		}
		return -1     							
	},

	moveRight(){
		var before=String(this.data)
		for(var r=0;r<this.rn;r++){
			this.moveRightInRow(r)
		}
		var after=String(this.data)
		if (before!=after) {
			this.randomNum()
			this.updateview()
		}
	},

	moveRightInRow(r){
		for(var c=this.cn-1;c>0;c--){
			var nextr=this.getRightInRow(r,c)
			if(nextr==-1){
				break;
			}else if(this.data[r][c]==0){
				this.data[r][c]=this.data[r][nextr]
				this.data[r][nextr]=0
				c++
			}else if(this.data[r][c]==this.data[r][nextr]){		
				this.data[r][c]*=2  
				this.score+=this.data[r][c]			
				this.data[r][nextr]=0  			
			}
		}
	},

	getRightInRow(r,c){
		for(var i=c-1;i>=0;i--){
			if(this.data[r][i]!=0){
				return i
			}
		}
		return -1
	},

	moveTop(){
		var before=String(this.data);					
		for(var c=0;c<this.cn;c++){				
			this.moveTopInCol(c)				
		}										
		var after=String(this.data);			
		if (before!=after) {					
			this.randomNum()					
			this.updateview()					
		}
	},

	moveTopInCol(c){
		for(var r=0;r<this.rn-1;r++){
			var nextt=this.gerTopInCol(r,c)
			if(nextt==-1){
				break;
			}else if(this.data[r][c]==0){
				this.data[r][c]=this.data[nextt][c]
				this.data[nextt][c]=0
				r--
			}else if(this.data[r][c]==this.data[nextt][c]){
				this.data[r][c]*=2
				this.score+=this.data[r][c]
				this.data[nextt][c]=0
			}
		}
	},

	gerTopInCol(r,c){
		for(var i=r+1;i<this.rn;i++){
			if(this.data[i][c]!=0){
				return i
			}
		}
		return -1
	},

	moveDown(){
		var before=String(this.data);
		for(var c=0;c<this.cn;c++){
			this.moveDownInCol(c)
		}
		var after=String(this.data)
		if(before!=after){
			this.randomNum()
			this.updateview()
		}
	},

	moveDownInCol(c){
		for(var r=this.rn-1;r>0;r--){
			var nextd=this.getDownInCol(r,c)
			if(nextd==-1){
				break;
			}else if(this.data[r][c]==0){
				this.data[r][c]=this.data[nextd][c]
				this.data[nextd][c]=0
				r++
			}else if(this.data[r][c]==this.data[nextd][c]){
				this.data[r][c]*=2
				this.score+=this.data[r][c]
				this.data[nextd][c]=0
			}
		}
	},

	getDownInCol(r,c){
		for(var i=r-1;i>=0;i--){
			if(this.data[i][c]!=0){
				return i
			}
		}
		return -1
	},

	updateview(){
		for(var r=0;r<this.rn;r++){
			for(var c=0;c<this.cn;c++){
				var n=this.data[r][c]
				var div=document.getElementById('c'+r+c)
				if(n!=0){
					div.innerHTML=n
					div.className='cell n'+n
				}else{
					div.innerHTML=''
					div.className='cell'
				}
			}
		}
		var score=document.getElementById('score')
		score.innerHTML=this.score;
		var div=document.getElementById('gameover')
		if(this.state==this.GAMEOVER){
			div.style.display='block';
			document.getElementById('final').innerHTML=this.score;
		}else{
			div.style.display='none';
		}

	},

	randomNum(){
		while(true){
		var r=Math.floor(Math.random()*this.rn);
		var c=Math.floor(Math.random()*this.cn);
		if(this.data[r][c]==0){
			this.data[r][c]=Math.random()<0.5?2:4;
			break;
			}
		}
	},
}
game.start()
