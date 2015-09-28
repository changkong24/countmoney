define(["Render","Module","util/Audio","util/Images","Resource"],function(Render,Module,Audio,Images,Resource){
	/**
	 * 游戏控制
	 */
	function Game (canvas){
		this._canvas = canvas;
		this._module = new Module();//游戏状态
		this._render = new Render(this._canvas,this._module);
		this.resize();//初始化
		this._loadResource();//加载数据
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
	_p.handleClick = function(){
		alert("aaa");
	}
	return Game;
})