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
			name:"d0",
			src:"d0.png"
		},{
			name:"m0",
			src:"m0.png"
		},{
			name:"mb0",
			src:"mb0.png"
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
		},{
			name:"logo",
			src:"logo.png"
		},{
			name:"start_bg",
			src:"start_bg.png"
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