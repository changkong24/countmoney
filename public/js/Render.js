define([],function(){
	function Render(canvas,module){
		this._canvas = canvas;
		this._ctx = canvas.getContext("2d");
		this._module = module;
		this._width = 0;//画布宽度
		this._height = 0;//画布高度
		this._imgs = null;
		this._audio = null;
		this._init();
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
		this._renderBg();//绘制背景
		this._render_start_top();//绘制头部
		this._render_starttip();//绘制向上箭头
		this._render_btm();//绘制底部钱
	}
	/**
	 * 绘制背景
	 * @return {[type]} [description]
	 */
	_p._renderBg = function(){
		var ctx = this._ctx;
		ctx.save();
		ctx.fillStyle = "#559966";//背景颜色
		ctx.fillRect(0,0,this._width,this._height);//绘制背景色
		ctx.restore();
	}
	/**
	 * 绘制顶部
	 * @return {[type]} [description]
	 */
	_p._render_start_top = function(){
		var ctx = this._ctx;
		var top = this._imgs.getList()["splashtitle"];
		var scale = this._width * 0.8 / top.width;
		ctx.drawImage(top,0,0,top.width,top.height,this._width * 0.2 * 0.5,top.height * scale * 0.1,top.width * scale,top.height * scale);;
	}
	/**
	 * 绘制中间向上箭头
	 * @return {[type]} [description]
	 */
	_p._render_starttip = function(){
		var ctx = this._ctx;
		var img = this._imgs.getList()["starttip"];
		ctx.drawImage(img,0,0,img.width,img.height,(this._width - img.width) / 2,this._height * 0.6 - img.height,img.width,img.height )
	}
	/**
	 * 绘制底部
	 * @return {[type]} [description]
	 */
	_p._render_btm = function(){
		var ctx = this._ctx;
		var img = this._imgs.getList()["mb0"];
		var scale = this._width * 0.6 / img.width;
		ctx.drawImage(img,0,0,img.width,img.height/2,(this._width - img.width * scale )/2,this._height * 0.7,img.width * scale,img.height * 0.5 * scale )
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
	/**
	 * 初始化开始界面
	 * @return {[type]} [description]
	 */
	_p._render_start = function(){
		
	}
	return Render;
})