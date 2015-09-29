define(["Module"],function(Module){
	function Render(canvas,module){
		this._canvas = canvas;
		this._ctx = canvas.getContext("2d");
		this._module = module;
		this._width = 0;//画布宽度
		this._height = 0;//画布高度
		this._imgs = null;
		this._audio = null;
		this._imgInterval = null;//落下的定时器
		this._upInterval = null;//数钱 背景 定时器
		this._init();
		this._top = 0;
	}
	var _p = Render.prototype;//原型
	/**
	 * 初始化数据
	 * @return {[type]} [description]
	 */
	_p._init = function(){
		this._imgs = this._module.getImgs();//图片数据
		this._audio = this._module.getAudio();//声音数据
	}
	/**
	 * 绘制加载中
	 * @param  {[type]} i   [description]
	 * @param  {[type]} len [description]
	 * @return {[type]}     [description]
	 */
	_p.renderLoading = function(i,len){
		var ctx = this._ctx;
		this.clearCanvas();
		ctx.fillStyle = "#333";
		ctx.fillRect(0,0,this._width,this._height);
		ctx.fillStyle = "#fff";
		ctx.font = "24px fontawesome";
		ctx.textAlign = "center";
		ctx.fillText("正在加载中" + i + "/" + len + "...",this._width/2,180);
	}
	/**
	 * 绘制开始界面
	 * @return {[type]} [description]
	 */
	_p.renderStart = function(){
		var ctx = this._ctx;
		this._renderBg(ctx);//绘制背景
		this._render_start_top(ctx);//绘制头部
		this._render_btm(ctx);//绘制底部钱
		this._render_starttip(ctx);//绘制向上箭头
	}
	/**
	 * 绘制开始游戏界面
	 * @return {[type]} [description]
	 */
	_p.render_game_begin = function(){
		this.clearCanvas();//清空
		var ctx = this._ctx;
		var that = this;
		var count = 60;
		var angle = 0;
		this._module.setRanMoney();
		this._top  = this._height * 0.36;
		//旋转动画
		this._imgInterval = setInterval(function(){
			that._render_game_con(that,ctx,angle);
			
			if(count <=0){
				count = 60;
			}
			if(angle >= 2400){
				angle = 0;
				that._module.setRanMoney();
			}
			
			count --;
			angle+=30;
		},50);
	}
	/**
	 * 游戏结束
	 * @return {[type]} [description]
	 */
	_p.render_game_over = function(ctx){
		var img = this._imgs.getList()["dlgbg"];
		var scale = this._width / img.width;
		ctx.save();
		ctx.translate(0,(this._height - img.height * scale)/2);
		ctx.drawImage(img,0,0,img.width,img.height,0,0,img.width * scale ,img.height * scale);
		ctx.fillStyle = "#ffff00";
		ctx.font = "bold 40px fontawesome";
		ctx.textAlign = "center";
		ctx.fillText("￥"+this._module.getScore(),this._width/2,img.height * scale * 0.25 * 0.4);//分数
		ctx.fillText("贫农",this._width/2,img.height* scale  * 0.25 * 0.95);//等级
		ctx.fillStyle = "#DA8F2C";
		ctx.font="30px fontawesome";
		ctx.textAlign = "center"
		ctx.fillText("我数了"+this._module.getScore()+",",this._width/2,img.height * scale* 0.75 * 0.58);
		ctx.fillText("比68%的人有钱,",this._width/2,img.height* scale * 0.75 * 0.73);
		ctx.fillText("我是贫农",this._width/2,img.height* scale  * 0.75 * 0.88);
		ctx.translate(0,img.height * scale * 0.75);
		this.render_btns(ctx,img.height,scale,img.height * scale * 0.75 + (this._height - img.height * scale)/2);
		ctx.restore();
	}
	/**
	 * 重玩和分享
	 * @param  {[type]} ctx [description]
	 * @return {[type]}     [description]
	 */
	_p.render_btns = function(ctx,bgHeight,bgScale,y){
		var btnRestart = this._imgs.getList()["start"],restartScale = bgHeight * bgScale * 0.2 / btnRestart.height;
		var btnShare = this._imgs.getList()["share"],shareScale = bgHeight * bgScale * 0.2 / btnShare.height;
		ctx.drawImage(btnRestart,0,0,btnRestart.width,btnRestart.height,(this._width - btnRestart.width*restartScale * 2)/3,0,btnRestart.width*restartScale,btnRestart.height*restartScale);
		ctx.drawImage(btnShare,0,0,btnShare.width,btnShare.height,(this._width - btnRestart.width*restartScale * 2)/3 * 2 + btnRestart.width *restartScale,0,btnShare.width*shareScale,btnShare.height * shareScale);
		var rect1 = this._module.getShareRect();
		rect1.x1 = (this._width - btnRestart.width*restartScale * 2)/3 * 2 + btnRestart.width *restartScale
		rect1.x2 = rect1.x1 + btnShare.width * shareScale;
		rect1.y1 = y;
		rect1.y2 = y + btnShare.height * shareScale;
		var rect2 = this._module.getRestartRect();
		rect2.x1 = (this._width - btnRestart.width*restartScale * 2)/3;
		rect2.x2 = rect2.x1 + btnRestart.width * restartScale;
		rect2.y1 = y;
		rect2.y2 = y+btnRestart.height * restartScale;
	}
	/**
	 * 绘制游戏内容
	 * @param  {[type]} that [description]
	 * @return {[type]}      [description]
	 */
	_p._render_game_con = function(that,ctx,angle){
		that._renderBg(ctx);//绘制背景
		that._render_ranMoney(ctx,angle);
		that._render_btm(ctx);//
		that._render_up_money(ctx);
		that._render_time_score_bg(ctx);//背景
		that._render_time_speed(ctx);//时间 速度
		that._render_score(ctx);//分数
		if(that._module.getStatus() != Module.PLAYING && that._module.getStatus() != Module.GAMEOVER ){
			that._render_starttip(ctx);//
		} 
		if(that._module.getStatus() == Module.GAMEOVER){
			that.render_game_over(ctx);
		}
	}
	_p._render_up_money = function(ctx){
		if(this._module.getIsShow()){
			var img = this._imgs.getList()["m0"];
			var scale = this._width * 0.6 / img.width;
			ctx.drawImage(img,0,0,img.width,img.height,(this._width - img.width * scale )/2,this._top ,img.width * scale,img.height * scale);
			this._top  -= 120;
			if(this._top  < -this._height * 0.36){
				this._module.setIsShow(false);
				this._top  = this._height * 0.36;
			}
		}
	}
	/**
	 * 绘制背景
	 * @return {[type]} [description]
	 */
	_p._renderBg = function(ctx){
		ctx.save();
		ctx.fillStyle = "#559966";//背景颜色
		ctx.fillRect(0,0,this._width,this._height);//绘制背景色
		ctx.restore();
	}
	/**
	 * 绘制顶部
	 * @return {[type]} [description]
	 */
	_p._render_start_top = function(ctx){
		var top = this._imgs.getList()["splashtitle"];
		var scale = this._width * 0.8 / top.width;
		ctx.drawImage(top,0,0,top.width,top.height,this._width * 0.2 * 0.5,top.height * scale * 0.3,top.width * scale,top.height * scale);;
	}
	/**
	 * 绘制中间向上箭头
	 * @return {[type]} [description]
	 */
	_p._render_starttip = function(ctx){
		var img = this._imgs.getList()["starttip"];
		var scale = this._width * 0.4 / img.width;
		var x = (this._width - img.width * scale) / 2,y = this._height * 0.7 - img.height * scale * 0.35;
		if(this._module.getStatus() == Module.PLAYING || this._module.getStatus() == Module.START){
			scale = this._width * 0.4 / img.width;
			y = this._height * 0.36 - img.height * scale * 0.35;
			x = (this._width - img.width * scale) / 2
		}
		ctx.drawImage(img,0,0,img.width,img.height,x,y,img.width * scale,img.height * scale);
	}
	/**
	 * 绘制底部
	 * @return {[type]} [description]
	 */
	_p._render_btm = function(ctx){
		var img = this._imgs.getList()["mb0"];
		var scale = this._width * 0.6 / img.width;
		if(this._module.getStatus() == Module.PLAYING || this._module.getStatus() == Module.START){
			ctx.drawImage(img,0,0,img.width,img.height,(this._width - img.width * scale )/2,this._height * 0.36,img.width * scale,img.height * scale )
		}
		else{
			ctx.drawImage(img,0,0,img.width,img.height/2,(this._width - img.width * scale )/2,this._height * 0.7,img.width * scale,img.height * 0.5 * scale )
		}
	}
	/**
	 * 绘制时间速度背景
	 * @param  {[type]} ctx [description]
	 * @return {[type]}     [description]
	 */
	_p._render_time_score_bg = function(ctx){
		var img = this._imgs.getList()["tmbg"];
		var x = this._width * 0.1 / 2,y = this._height * 0.04; 
		ctx.drawImage(img,0,0,img.width,img.height,x,y,this._width * 0.9,this._height * 0.23);
	}
	/**
	 * 绘制分数
	 * @param  {[type]} ctx [description]
	 * @return {[type]}     [description]
	 */
	_p._render_score = function(ctx){
		var score = this._module.getScore();
		ctx.save();
		ctx.fillStyle = "#ffff00";
		ctx.font = "bold 40px arial";
		ctx.textAlign = "center";
		ctx.fillText("￥"+score,this._width/2,this._height * 0.14);
		ctx.restore();
	}
	/**
	 * 绘制时间
	 * @param  {[type]} ctx [description]
	 * @return {[type]}     [description]
	 */
	_p._render_time_speed = function(ctx){
		var time = this._module.getTime();
		var speed = Math.floor(this._module.getScore() /(31 - this._module.getTime()) * 0.01 * 100);
		speed = speed <= 0 ? 0 : speed;
		ctx.save();
		var timeImg = this._imgs.getList()["tmicon"];
		var scale =20 / timeImg.width;
		ctx.drawImage(timeImg,0,0,timeImg.width,timeImg.height,this._width * 0.15,this._height * 0.24 - timeImg.height * scale * 0.9,timeImg.width * scale,timeImg.height * scale);
		ctx.fillStyle = "#fff";
		ctx.font = "bold 20px arial";
		ctx.textAlign = "right";
		ctx.fillText(time + "\"",this._width * 0.15+ timeImg.width * 1.2,this._height * 0.24);
		ctx.fillText("￥" + speed + "/秒",this._width * 0.95 - timeImg.width * 1,this._height * 0.24);
		ctx.restore();
	}
	/**
	 * 绘制灰下来的钱
	 * @param  {[type]} ctx [description]
	 * @return {[type]}     [description]
	 */
	_p._render_ranMoney = function(ctx,angle){
		var rans = this._module.getRanMoney();
		var len = rans.length;
		for(var i = 0;i < len;i++){
			var img = rans[i].img;
			var scale = this._width * 0.2 / img.width;
			ctx.save();
			ctx.translate(rans[i].x + img.width* scale / 2,rans[i].y + img.height* scale/2);
			ctx.rotate(angle * Math.PI / 180);
			ctx.drawImage(img,0,0,img.width,img.height,-img.width* scale / 2,- img.height* scale/2,img.width * scale,img.height * scale);
			ctx.translate(-rans[i].x + img.width / 2,-rans[i].y + img.height/2);
			rans[i].y += rans[i].vy;
			ctx.restore();
		}
	}
	/**
	 * 清空图片定时器
	 * @return {[type]} [description]
	 */
	_p.clearImgInterval = function(){
		clearInterval(this._imgInterval)
	}
	/**
	 * 页面大小改变
	 * @param  {[type]} w [description]
	 * @param  {[type]} h [description]
	 * @return {[type]}   [description]
	 */
	_p.resize = function (w,h){
		this._width = w;
		this._height = h;
		this._repaint(this._canvas,this._ctx);
	}
	/**
	 * 重绘
	 * @return {[type]}
	 */
	_p._repaint = function (canvas,ctx){
		if(!ctx){
			return; 
		}
		//清除背景
		this._reorient(ctx);
	}
	/**
	 * 反转页面后，从新映射
	 * @param  {[type]} ctx [description]
	 * @return {[type]}     [description]
	 */
	_p._reorient = function(ctx){
		var angle = window.orientation;
		if(angle){
			var rot = -Math.PI*(angle/180);
			ctx.translate(angle==-90?canvas.width :0,
			angle == 90? canvas.height : 0);
			ctx.rotate(rot);
		}
	}
	/**
	 * 清空画布
	 * @return {[type]} [description]
	 */
	_p.clearCanvas = function(){
		this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height);
	}
	return Render;
})