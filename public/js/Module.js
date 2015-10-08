define(["util/Images","util/Audio"],function(Images,Audio){
	/**
	 * 程序模型数据
	 */
	function Module(canvas){
		this._canvas = canvas;
		this._status = Module.LOADING;
		this._score = 0;//积分
		this._time = 30;//游戏时长 单位 秒
		this._audio = new Audio();
		this._imgs = new Images();
		this._ran_money = [];//随机生成的五张 从上飞下的钱
		this._time_interval = null;//定时器
		this._isShow = false;//是否显示
		this._isDown = false;//是否点下
		this._shareRect = {
			x1:0,
			x2:0,
			y1:0,
			y2:0
		};
		this._restartRect = {
			x1:0,
			x2:0,
			y1:0,
			y2:0
		};//按钮的区域
	}

	Module.LOADING = 0;//加载中
	Module.READY = 1;//准备好游戏
	Module.START = 2;//开始游戏
	Module.PLAYING = 3;//游戏中
	Module.GAMEOVER = 4;//游戏结束

	var _p = Module.prototype;
	/**
	 * 修改游戏状态
	 * @param {[type]} status [description]
	 */
	_p.setStatus = function(status){
		this._status = status;//
	}
	/**
	 * 获取游戏状态
	 * @return {[type]} [description]
	 */
	_p.getStatus = function(){
		return this._status;
	}
	/**
	 * 获取图片
	 * @return {[type]} [description]
	 */
	_p.getImgs = function(){
		return this._imgs;
	}
	/**
	 * 获取声音文件
	 * @return {[type]} [description]
	 */
	_p.getAudio = function(){
		return this._audio;
	}
	/**
	 * 分数
	 * @return {[type]} [description]
	 */
	_p.getScore = function(){
		return this._score;
	}
	/**
	 * 分数
	 * @param {[type]} score [description]
	 */
	_p.addScore = function(){
		this._score += 100;
	}
	/**
	 * 获取时间
	 * @return {[type]} [description]
	 */
	_p.getTime = function(){
		return this._time;
	}
	/**
	 * 设置剩余时间
	 * @param {[type]} second [description]
	 */
	_p.setTimeCount = function (){
		this._time --;
	}
	/**
	 * 设置随机生成的五张从上飞下的钱
	 * @param {[type]} obj [description]
	 */
	_p.setRanMoney = function(obj){
		var num = 5;
		this._ran_money = [];
		for(var i = 0 ;i< num; i++){
			var img = this._imgs.getList()["d0"];
			var obj = {
				img:img,
				vx : 0,//x方向速度
				vy : this._canvas.height / 60,//速度
				x : this._getRanX(),
				y : this._getRanY(img.height),
				g : 0,//加速度
				angle: 0//角度
			}
			this._ran_money.push(obj);
		}
	}
	/**
	 * 重新开始时候用
	 * @param {[type]} arr [description]
	 */
	_p.setImgsAll = function(obj){
		this._imgs = obj;
	}
	/**
	 * 生成随机的x位置
	 * @return {[type]} [description]
	 */
	_p._getRanX = function(){
		return Math.random() * this._canvas.width;
	}
	/**
	 * 随机生成y的位置
	 * @return {[type]} [description]
	 */
	_p._getRanY = function(){
		return -(1 - Math.random())* 250;
	}
	/**
	 * 获取随机生成的五张从上飞下的钱
	 * @return {[type]} [description]
	 */
	_p.getRanMoney = function(){
		return this._ran_money;
	}
	/**
	 * 倒计时定时器
	 * @return {[type]} [description]
	 */
	_p.getTimeInterval = function(){
		return this._time_interval;
	}
	/**
	 * 清除定时器
	 * @return {[type]} [description]
	 */
	_p.clearTimeInterval = function(){
		clearInterval(this._time_interval);
	}
	/**
	 * 是否显示移动上去的图片
	 * @param {[type]} flag [description]
	 */
	_p.setIsShow = function(flag){
		this._isShow = flag;
	}
	/**
	 * 获取。。。
	 * @return {[type]} [description]
	 */
	_p.getIsShow = function(){
		return this._isShow;
	}
	/**
	 * 设置鼠标按下
	 * @param {[type]} flag [description]
	 */
	_p.setIsDown = function(flag){
		this._isDown = flag;
	}
	/**
	 * 鼠标按下
	 * @return {[type]} [description]
	 */
	_p.getIsDown = function(){
		return this._isDown;
	}
	/**
	 * 分享按钮的位置
	 * @return {[type]} [description]
	 */
	_p.getShareRect = function(){
		return this._shareRect;
	}
	/**
	 * 重新开始按钮位置
	 * @return {[type]} [description]
	 */
	_p.getRestartRect = function(){
		return this._restartRect;
	}
	/**
	 * 提示文本
	 * @return {[type]} [description]
	 */
	_p.getText = function(){
		var score = this._score;
		if(score < 10000){
			return "铜指王";
		}
		if( score >= 10000 && score < 30000){
			return "银指王";
		}
		if(score >= 30000){
			return "金指王";
		}
	}
	return Module;
})