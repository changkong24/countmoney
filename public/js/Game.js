define(["Render","Module","util/Audio","util/Images","Resource"],function(Render,Module,Audio,Images,Resource){
	/**
	 * 游戏控制
	 */
	function Game (canvas){
		this._canvas = canvas;
		this._module = new Module(canvas);//游戏状态
		this._render = new Render(this._canvas,this._module);
		this.resize();//初始化
		this._loadResource();//加载数据
		this._audio = this._module.getAudio();
	}
	var _p = Game.prototype;
	/**
	 * 初始化数据
	 * @return {[type]} [description]
	 */
	_p._loadResource = function(){
		var that = this;
		var count = 0;//总数
		var len = Resource.IMAGES.length;
	 	this._module.getAudio().loadAudio();//加载音乐
		this._module.getImgs().loadImg(function(){
			count ++;
			that._render.renderLoading(count,len);
			if(count >= len){
				that._module.setStatus(Module.READY);
				that.loadComplete();
			}
		});///加载所有的图片
	}
	/**
	 * 加载完成后
	 * @return {[type]} [description]
	 */
	_p.loadComplete = function(){
		this._render.renderStart();
	}
	/**
	 * 重绘页面
	 * @return {[type]} [description]
	 */
	_p.resize = function(){
		this._render.resize(this._canvas.width,this._canvas.height);
		var status = this._module.getStatus();
		switch(status){
			case Module.LOADING:
				break;
			case Module.READY:
				this._render.renderStart();
				break;
		}
	}
	/**
	 * 滑动
	 * @return {[type]} [description]
	 */
	_p.handle = function(){
		// 滑动 游戏开始
		var status = this._module.getStatus();//当前游戏状态
		var status = this._module.getStatus();
		switch(status){
			case Module.LOADING:
				break;
			case Module.READY://准备好状态，游戏开始
				this._module.setStatus(Module.START);//设置游戏状态
				this._render.render_game_begin();//游戏开始
				break;
			case Module.START:
				this._module.setStatus(Module.PLAYING);//设置游戏状态
				this.startTimeCount();//开始倒计时
				break;
			case Module.PLAYING:
				this._game_playing();//游戏中
				break;
			case Module.GAMEOVER:
				break;
		}
	}
	/**
	 * 按钮点击
	 * @param  {[type]} x [description]
	 * @param  {[type]} y [description]
	 * @return {[type]}   [description]
	 */
	_p.handleClick = function(x,y){
		//播放音乐
		var status = this._module.getStatus();
		if(status == Module.READY){
			var width = this._canvas.width,height = this._canvas.height;
			//开始前
			if(x > 0.3 * width && x < 0.7 * width && y > 0.51 * height && y < 0.585 * height){
				this._render.showActivityRule();//显示规则
			}
		}
		else if(status == Module.PLAYING){
			this._module.setIsDown(true);// 按下后
		}
	}
	/**
	 * 鼠标释放
	 * @return {[type]} [description]
	 */
	_p.handleMouseUp = function(){
		this._module.setIsDown(false);//
	}
	/**
	 * 鼠标移动量
	 * @param  {[type]} offsetY [description]
	 * @return {[type]}         [description]
	 */
	_p.handleMouseMove = function(offsetY){
		// if(offsetY > 30){
			// this._module.setIsShow(true);
		// }
		var status = this._module.getStatus();
		if(status == Module.PLAYING){
			this._render.setTop(offsetY);
		}
	}
	/**
	 * 游戏中
	 * @return {[type]} [description]
	 */
	_p._game_playing = function(){
		this._audio.play("count");//声音播放
		if(this._module.getStatus() == Module.PLAYING ){
			this._module.addScore();//添加分数
			this._module.setIsShow(true);
			this._module.setIsDown(false);
			//播放声音
		}
		if(this._module.getStatus() == Module.START ){
			this._module.setIsShow(true);
			this._module.setIsDown(false);	
		}
	}
	/**
	 * 开始定时器
	 * @return {[type]} [description]
	 */
	_p.startTimeCount = function(){
		var that = this;
		var timeInter = this._module.getTimeInterval();
		this._module._time_interval = setInterval(function(){
			if(that._module.getTime() <= 0){
				that._module.setStatus(Module.GAMEOVER);//游戏结束
				that.gameOver();
			}else{
				that._module.setTimeCount();
			}
		},1000);
	}
	/**
	 * 重新开始
	 * @return {[type]} [description]
	 */
	_p._restart_click = function(){
		document.getElementById("gameOver").style.display = "none";
		document.getElementById("cover").style.display = "none";
		this._module.clearTimeInterval();
		this._render.clearImgInterval();
		var imgs = this._module.getImgs();
		this._module = new Module(this._canvas);
		this._module.setStatus(Module.START);//设置游戏状态
		this._module.setImgsAll(imgs);
		this._render = new Render(this._canvas,this._module);
		this._render.render_game_begin();//游戏开始
		this._render.resize(this._canvas.width,this._canvas.height);
	}
	/**
	 * 游戏结束
	 * @return {[type]} [description]
	 */
	_p.gameOver = function(){
		this._module.clearTimeInterval();
	}
	return Game;
})