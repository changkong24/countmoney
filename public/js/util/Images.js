define(["Resource"],function(Resource){
	function ImageObj(){
		this._list = {};//所有列
	}

	var _p = ImageObj.prototype;
	/**
	 * 加载图片
	 * @return {[type]} [description]
	 */
	_p.loadImg = function(callback){
		var imgs = Resource.IMAGES;
		var path = Resource.IMGPATH;
		var len = imgs.length;
		for(var i = 0;i<len;i ++ ){
			var img = new Image();
			img.src = path + imgs[i].src;
			img.onload = callback;
			this._list[imgs[i].name] = img;
		}
	}
	/**
	 * 所有的图片数据
	 * @return {[type]} [description]
	 */
	_p.getList = function(){
		return this._list;
	}
	return ImageObj;
})