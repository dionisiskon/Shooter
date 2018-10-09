var menu = {
	preload:function(){
		game.load.image('bg','assets/menu/bg.jpg');
		game.load.image('start','assets/menu/New_Game_Sprite.png');
	},
	create:function(){
		game.scale.pageAlignHorizontally = true;

		var background=game.add.sprite(0,0,'bg');
		var button1 = game.add.button( 400, 250, "start", function(){
			game.state.start('lvl1');
		});

		button1.anchor.set(0.5, 0.5);
	}
}