(function(){
	require(["Money"],funciton(Money){
		var money = new Mondey("mainCanvas");
		window.onload = money.init();//初始化数据
	})
})();