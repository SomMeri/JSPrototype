var music;
var states = {};
states.load = {
    //FIXME: add progress bar
    preload: function() {
        this.game.stage.backgroundColor = '#a0a0a0';
        var text1 = game.add.text(16, 150, "Speed\nwriting", {font: 'bold 50pt Arial', align: "center", fill: '#bbbbbb'});
        text1.anchor.setTo(0.5, 0.5);
        text1.position.x = 300;
        text1.setShadow(5, 5, 'rgba(0, 0, 0, 0.5)', 0);

        this.loadingText = game.add.text(16, 290, "still loading music\nwon't take long", {font: 'bold 20pt Arial', align: "center", fill: '#FFFF00'});
        this.loadingText.anchor.setTo(0.5, 0.5);
        this.loadingText.position.x = 300;
        this.loadingText.setShadow(5, 5, 'rgba(0, 0, 0, 0.5)', 0);
        //this.blinkColor(this.loadingText, 0xFFff00, 0xFFA500);

        game.load.audio('shortSimpleClap', 'assets/sounds/241132__xtrgamr__shortapplause-01.ogg');
        game.load.audio('shortSimpleBoo', 'assets/sounds/239595__xtrgamr__crowdbooing-01.ogg');
        game.load.audio('music', 'assets/sounds/604452_Clean-Keyboard.ogg');
        game.load.audio('backgroundBig', 'assets/sounds/209991__kellieskitchen__big-clap.ogg');

        game.load.image('sound-on', 'assets/sound-on-small.png');
        game.load.image('sound-off', 'assets/sound-off-small.png');
    },

    create: function() {
        this.loadingText.visible = false;

        var text = game.add.text(16, 290, "Click to Enter Menu", {font: 'bold 20pt Arial', align: "center", fill: '#ffff00'});
        text.anchor.setTo(0.5, 0.5);
        text.position.x = 300;
        text.setShadow(5, 5, 'rgba(0, 0, 0, 0.5)', 0);
        this.blinkColor(text, 0xFFff00, 0xFFA500);

        this.keyboard = this.game.input.keyboard;

        if (!music) {
            music = game.add.audio('music');
            music.onStop.add(this.onMusicStop, this);
        }

        this.turnOnMusic();
    },

    update: function() {
        if (game.input.activePointer.isDown
            || this.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.keyboard.isDown(Phaser.Keyboard.ENTER)
            || this.keyboard.isDown(Phaser.Keyboard.UP) || this.keyboard.isDown(Phaser.Keyboard.DOWN)
            || this.keyboard.isDown(Phaser.Keyboard.LEFT) || this.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.game.state.start('menu', true, false);
    }
    },

    blinkColor: function (suggestion, fromColor, toColor) {
        suggestion.customTweenValue = 1;
        var tween = game.add.tween(suggestion).to({customTweenValue: 100}, 500, Phaser.Easing.Quadratic.InOut).yoyo(true).repeat().start();
        tween.onUpdateCallback(function () {
            var color = interpolateColor(fromColor, toColor, 100, suggestion.customTweenValue, 1);
            suggestion.addColor(color, 0);
        }, this);

        return tween;
    },

    turnOnMusic: function() {
        if (!music.isPlaying) {
            //marker, position, volume, loop, forceRestart
            music.play('',0,0.7,false,false);
        }
    },

    onMusicStop: function() {
        //console.log("music stopped");
        this.turnOnMusic();
    }

};