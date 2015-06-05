var states = {};
states.load = {
    //FIXME: add progress bar
    preload: function() {
        this.game.stage.backgroundColor = '#a0a0a0';
        game.load.audio('shortSimpleClap', 'assets/sounds/241132__xtrgamr__shortapplause-01.ogg');
        game.load.audio('shortSimpleBoo', 'assets/sounds/239595__xtrgamr__crowdbooing-01.ogg');
        game.load.audio('music', 'assets/sounds/604452_Clean-Keyboard.ogg');
        game.load.audio('backgroundBig', 'assets/sounds/209991__kellieskitchen__big-clap.ogg');

        game.load.image('sound-on', 'assets/sound-on-small.png');
        game.load.image('sound-off', 'assets/sound-off-small.png');
    },

    create: function() {
        this.game.state.start('menu', true, false);
    }

};