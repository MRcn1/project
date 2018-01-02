
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

	moveLeft(){									//左移所有行
		var before=String(this.data);			//为数组拍照保存在before中
		for(var r=0;r<this.rn;r++){				//r从0开始，到<rn结束
			this.moveLeftInRow(r)				//左移第r行
		}										//循环结束
		var after=String(this.data);			//为数组拍照保存在after中
		if (before!=after) {					//如果before!=after
			this.randomNum()					//随机生成数
			// if(this.isGameover()){this.state=this.GAMEOVER}
			this.updateview()					//更新页面
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
	
	moveLeftInRow(r){							//左移第r行
		for(var c=0;c<this.cn-1;c++){			//c从0开始，到<cn-1
			var nextc=this.getNextInRow(r,c);	//查找r行c列下一个不为0的位置nextc
			if (nextc==-1) {					//如果没找到，就退出循环
				break;
			}else if(this.data[r][c]==0){		//否则，如果c位置的值是0
				this.data[r][c]=this.data[r][nextc];	//将nextc位置的值赋值给c位置
				this.data[r][nextc]=0  			//将nextc位置的值置为0
				c--  							//c留在原地
			}else if(this.data[r][c]==this.data[r][nextc]){		//否则，如果c位置的值等于nextc的位置的值
				this.data[r][c]*=2  			//将c位置的值*2
				this.score+=this.data[r][c]
				this.data[r][nextc]=0  			//将nextc的位置的值置为0
			}
		}
	},
	getNextInRow(r,c){       					//查找r行c列下一个不为0的位置
		for(var i=c+1;i<this.cn;i++){ 			//i从c+1开始，到<cn结束
			if (this.data[r][i]!=0) {			//如果i位置的值不为0，就返回i
				return i
			}									//遍历结束				
		}
		return -1     							//返回-1
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