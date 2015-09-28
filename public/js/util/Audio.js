define(["Resource"],function(Resource){
	/**
	 * 声音相关
	 */
	function Audio(){
		this._mute = false;//静音模式
		this._list = {};
	}
	var _p = Audio.prototype;
	/**
	 * 播放音乐
	 * @param  {[type]} id [description]
	 * @return {[type]}    [description]
	 */
	_p.play = function(id){
		if(this._list[id] && !this._mute) {
			this._list[id].play();
		}
	}
	/**
	 * 暂停声音
	 * @param  {[type]} id [description]
	 * @return {[type]}    [description]
	 */
	_p.pause = function(id){
		if(this._list[id]){
			this._list[id].pause();
		}
	}
	/**
	 * 暂停所有的声音
	 * @return {[type]} [description]
	 */
	_p.pauseAll = function(){
		for(var item in this._list){
			item.pause()
		}
	}
	/**
	 * 获取所有的音乐数据
	 * @return {[type]} [description]
	 */
	_p.getList = function(){
		return this._list;
	}
	/**
	 * 加载音乐
	 * @return {[type]} [description]
	 */
	_p.loadAudio = function(){
		var sounds = Resource.SOUNDS;
		var path = Resource.SOUNDPATH;
		var len = sounds.length;
		for(var i = 0;i<len;i++){
			this._list[sounds[i].name] = new Buzz(path + sounds[i].src,sounds[i].autoplay,sounds[i].loop);
		}
	}

	/**
	 * 单个音乐
	 * @param {[type]} src      [description]
	 * @param {[type]} autoplay [description]
	 * @param {[type]} loop     [description]
	 */
	function Buzz(src,autoplay,loop){
		var el = document.createElement("audio");
		//绑定路径
		if(typeof src == "string"){
			el.src=src;
		}
		if(typeof autoplay!="undefined"&&autoplay){
			el.autoplay = "autoplay";
		}
		if(typeof loop!="undefined"&&loop){
			el.loop ="loop";
		}
		this._el = el;
	}
	/**
	 * 播放
	 * @return {[type]} [description]
	 */
	Buzz.prototype.play = function(){
		this.el.play();
	}
	/**
	 * 暂停
	 * @return {[type]} [description]
	 */
	Buzz.prototype.pause = function(){
		this.el.pause();
	}
	return Audio;
})