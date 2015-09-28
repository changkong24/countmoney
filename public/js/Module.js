define(["util/Images","util/Audio"],function(Images,Audio){
	/**
	 * 程序模型数据
	 */
	function Module(){
		this._status = Module.LOADING;
		this._score = 0;//积分
		this._time = 60;//游戏时长 单位 秒
		this._audio = new Audio();
		this._imgs = new Images();
	}

	Module.LOADING = 0;//加载中
	Module.READY = 1;//准备好游戏
	Module.PLAYING = 2;//游戏中
	Module.GAMEOVER = 3;//游戏结束

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
	return Module;
})