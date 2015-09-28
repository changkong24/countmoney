(function(){
	require(["Money"],function(Money){
		var money = new Money("mainCanvas");
		window.onload = money.init();//初始化数据
	})
})();