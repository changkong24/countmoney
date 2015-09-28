define([],function(){
	/**
	 * 资源数据相关
	 */
	function Resource (){
	}
	_p = Resource.prototype;//原型

	/**
	 * 加载数据资源
	 * @param  {[type]} src [description]
	 * @return {[type]}     [description]
	 */
	_p.loadImages = function(i,src,callback){
		var img = new Image();
		img.src = src;
		Resource.IMAGES[i].img = img;
		img.onload = callback;
	}
	/**
	 * 图片资源
	 * @type {Object}
	 */
	Resource.IMGPATH = "../images/"
	Resource.IMAGES = [
		{
			name:"bg",
			src:"tmbg.png"
		},{
			name:"main",
			src:"main.png"
		},{
			name:"d0",
			src:"d0.png"
		},{
			name:"dlgbg",
			src:"dlgbg.png"
		},{
			name:"follow_anim",
			src:"follow_anim.png"
		},{
			name:"m0",
			src:"m0.png"
		},{
			name:"mb0",
			src:"mb0.png"
		},{
			name:"rank",
			src:"rank.png"
		},{
			name:"share",
			src:"share.png"
		},{
			name:"share_tip",
			src:"share_tip.png"
		},{
			name:"splashtitle",
			src:"splashtitle.png"
		},{
			name:"start",
			src:"start.png"
		},{
			name:"starttip",
			src:"starttip.png"
		},{
			name:"tmicon",
			src:"tmicon.png"
		}
	]
	Resource.SOUNDPATH = "../Sound/";
	Resource.SOUNDS = [];
	return Resource;
});