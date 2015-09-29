define([],function(){
	/**
	 * 资源数据相关
	 */
	function Resource (){
	}
	/**
	 * 图片资源
	 * @type {Object}
	 */
	Resource.IMGPATH = "../images/"
	Resource.IMAGES = [
		{
			name:"tmbg",
			src:"tmbg.png",
		},{
			name:"main",
			src:"main.jpg"
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
			src:"tmicon1.png"
		}
	]
	Resource.SOUNDPATH = "../audio/";
	Resource.SOUNDS = [{
			name:"all",
			src:"all.mp3"
		},{
			name:"coin",
			src:"coin.mp3"
		},{
			name:"count",
			src:"count.mp3"
		}
	];
	return Resource;
});