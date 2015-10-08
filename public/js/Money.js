define(["Game"],function(Game){
	/**
	 * 初始化 数钱相关的
	 */
	function Money (canvasID){
		this._canvas = this._initFullScreenCanvas(canvasID);
		this._ctx = this._canvas.getContext("2d");//canvas 文本
		this._game = new Game(this._canvas);

	}
	var _p = Money.prototype;
	/**
	 * 初始化游戏
	 * @return {[type]} [description]
	 */
	_p.init = function(){
		var that = this;
		var x,y;
		var ifDrag = false;
		var isDown = false;
		if(isTouchDevice()){
			this._canvas.addEventListener("touchstart",function(e){
				var touch = event.targetTouches[0];
				x = touch.pageX,y = touch.pageY;
				that._game.handleClick(touch.pageX,touch.pageY);
				ifDrag = false;
				isDown = true;
				e.stopPropagation();
				e.preventDefault();
			},false);
			this._canvas.addEventListener("touchmove",function(e){
				ifDrag = true;
				if(isDown){
					var touch = event.targetTouches[0];
					that._game.handleMouseMove(y - touch.pageY);
					y = touch.pageY;
				}
				e.stopPropagation();
				e.preventDefault();
			},false);
			this._canvas.addEventListener("touchend",function(e){
				if(ifDrag){
					that._game.handle();
				}
				else{
					that._game.handleMouseUp();//鼠标释放
				}
				isDown = false;
				e.stopPropagation();
				e.preventDefault();
			},false);
		}
		else{
			this._canvas.addEventListener("mousedown",function (e){
				ifDrag = false;
				isDown = true;
				y = e.pageY;
				that._game.handleClick(e.pageX - that._canvas.offsetLeft,e.pageY);
				e.stopPropagation();
				e.preventDefault();
			})
			this._canvas.addEventListener("mousemove", function (e) {
	            ifDrag = true;
	            if(isDown){
	            	that._game.handleMouseMove(y - e.pageY);
	            	y = e.pageY;
	            }
	            e.stopPropagation();
				e.preventDefault();
	        })
			this._canvas.addEventListener("mouseup",function (e){
				if(ifDrag){
					that._game.handle(e.pageX - that._canvas.offsetLeft,e.pageY);
				}
				else{
					that._game.handleMouseUp();//鼠标释放
				}
				isDown = false;
				e.stopPropagation();
				e.preventDefault();
			})

		}
	}
	/**
	 * 初始化canvas
	 * @return {[type]} [description]
	 */
	_p._initFullScreenCanvas = function(canvasID){
		var canvas = document.getElementById(canvasID);
		resizeCanvas(canvas);
		var that = this;
		window.addEventListener("resize",function(){
			resizeCanvas(canvas);
			that._game.resize();
		})
		return canvas;
	}
	/**
	* 调整大小 将canvas 设为满屏
	*/
	function resizeCanvas(canvas){
		canvas.width = document.width || document.body.clientWidth;
		canvas.height = document.height || document.body.clientHeight;
		canvas.width = canvas.width > 768 ? 768 : canvas.width;
		canvas.height = canvas.height > 1024 ? 1024 : canvas.height;
	}
	/**
	 * 判断是否是移动网页
	 * @return {Boolean} [description]
	 */
	function isTouchDevice(){
		return ('ontouchstart' in document.documentElement);
	}
	return Money;
})