define(["Render","Module"],function(Render,Module){
	/**
	 * ÓÎÏ·¿ØÖÆ
	 */
	function Game (canvas){
		this._canvas = canvas;
		this._module = new Module();
		this._render = new Render(this._canvas,this._module);
	}
	return Game;
})