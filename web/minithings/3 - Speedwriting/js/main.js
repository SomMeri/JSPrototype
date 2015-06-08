var totalMaxX=600, totalMaxY=520;
var theme = {
    font_1: { font: "normal normal 70px Courier New", fill: "#eeee99", align: "center", weight: 'bold' },
}

var gameStateObject = function() {
    this.cheated = false;
    this.doneLevels = 0;
    this.level= 1;
    this.score= 0;
    this.mistakes = 0;
    this.pressedLetters= 0;
    this.textStrIndex= 0;
    this.textIndex=0;
    this.startingTime = Date.now();

    this.skipWhitespaces= function() {
        if (isSpace(this.textStr, this.textStrIndex)) {
            this.textIndex += 1; //this is not a bug, this is how it should be
        }

        if (isWhitespace(this.textStr, this.textStrIndex)) {
            this.textStrIndex += 1;
        }
    };

    this.currentLetter= function() {
        return this.textStr.charCodeAt(this.textStrIndex)
    };

    this.levelDone = function() {
        return this.textStrIndex == this.textStr.length;
    }

};

var keyboardState = {
    pressedKeys: [],

    onDown: function(event){
        this.pressedKeys.push({ keyCode: event.keyCode });
    },

    onUp: function(event){ },

    consumePressedKey: function() {
        if (this.pressedKeys.length===0)
            return null;

        return this.pressedKeys.shift();
    }
};

function chooseTextChallenge(level) {
    var screenText_s = definition.screens[level - 1].text, screenText;
    if (screenText_s.constructor === Array) {
        screenText = screenText_s[getRandomInt(0, screenText_s.length-1)];
    } else {
        screenText = screenText_s;
    }
    return screenText;
}

states.game = {
    init: function(playMode) {
      this.playMode = playMode || this.playMode || new ArcadeMode();
      buildDefinition(this.playMode.randomizedLevels);
    },
    preload: function() {
        this.game.stage.backgroundColor = '#0000ff';
    },

    create: function() {
        this.gameState = new gameStateObject();
        this.juicy = this.game.plugins.add(new Phaser.Plugin.Juicy(this));

        this.keyboard = this.game.input.keyboard;
        this.group_text = game.add.group();
        this.init_sentence(this.gameState.level);
        this.speedCounter = new OverallSpeedCounter(this.game.time, 41, 40, this.playMode.timerBarUpTick);
        this.soundGenerator = new SoundGenerator();
        this.createScoreFieldRightLetters();
        this.keyboard.addCallbacks(keyboardState, keyboardState.onDown, keyboardState.onUp);
        this.shortSimpleClap = game.add.audio('shortSimpleClap');
        this.shortSimpleBoo = game.add.audio('shortSimpleBoo');

        this.backgroundBig = game.add.audio('backgroundBig');
        this.backgroundBig.addMarker('background', 0, 22.0, 1, true);
        this.backgroundBigFadingOut = false;
        this.backgroundBig.onFadeComplete.add(function() {
            this.backgroundBigFadingOut = false;
            this.backgroundBig.stop();
        }, this);
    },
    packEndingFadeOut: function() {
        if (this.backgroundBig.isPlaying && !this.backgroundBigFadingOut) {
            this.backgroundBigFadingOut = true;
            this.backgroundBig.fadeOut(2000);
        }
    },
    packEndingSound: function() {
        if (!this.backgroundBig.isPlaying && !this.backgroundBigFadingOut)
            this.backgroundBig.play('background');
    },
    clappingSound: function () {
        if (!this.shortSimpleClap.isPlaying)
            this.shortSimpleClap.play();
    },
    booSound: function () {
        if (!this.shortSimpleBoo.isPlaying)
            this.shortSimpleBoo.play();
    },

    createScoreFieldRightLetters: function() {
        function rgbToHex(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }
        var X =totalMaxX-10;
        var graphic = game.add.graphics(0, 0);
        graphic.beginFill(0x7f7f7f,1);
        graphic.drawRect(X-10, 0, 100, totalMaxY); //TODO: this removed from square, offset letters and make square bigger
        this.scoreBar = game.add.graphics(0, 0);
        this.scoreBar.beginFill(0x000000,1);
        this.scoreBar.drawRect(X-10, 0, 100, totalMaxY); //TODO: this removed from square, offset letters and make square bigger

        //game.debug.text('Typing speed: ' + gameState.pressedLetters*60/this.game.time.totalElapsedSeconds(), 32, 32);
        var i, string = 'Dead Slow Acceptable Good Fast Insane WOW'.toUpperCase();

        this.scoreText = [];
        for (i=0; i< string.length;i++) {
            var font =  { font: "65px Arial", fill: "#ffffff", align: "center" },Y = 12*i + 10;
            font.fill = rgbToHex(i*255/string.length, 0 , 0);
            this.scoreText[i] = game.add.text(X, Y, string[i],  { font: "65px Courier", fill: "#0000", weight: 'bold', align: "center" });
            this.scoreText[i].font = 'Lucida';
            this.scoreText[i].fontSize = 10;
            //this.scoreText[i].fontWeight = 'bold';
            this.scoreText[i].alpha = 1;
            this.scoreText[i].anchor.set(0.5, 0.5);
        }
    },

    update: function() {
        var skippedToTheEnd = false, cheatedOnLevel = false;
        function shouldIgnore(key) {
            var esc = 27, ctrl =17, alt = 18, shift = 16, capsLock = 18, tab= 9, fn = 255, something = 93;
            var space = 32;
            var up=38, right=39,down =40;
            var all = [esc, ctrl, alt, shift, capsLock, tab, fn, something, up, right, down, space];
            var f1=112, f12 = 123;
            if (!key)
                return true;

            if (-1 != all.indexOf(key))
                return true;

            if (f1<=key && key <= f12)
                return true;

            return false;

        }

        function failed() {
            return this.playMode.canFail && this.speedCounter.bar <= 0;
        }

        function noMoreLevelsToDo() {
            return this.gameState.level > definition.screens.length || skippedToTheEnd;
        }

        function levelsCount() {
            return definition.screens.length;
        }

        if (definition.screens[this.gameState.level-1].update) {
            definition.screens[this.gameState.level-1].update(this.text);
        }

        this.gameState.skipWhitespaces();
        var expectedLetter = this.gameState.currentLetter();

        var pressedKey = keyboardState.consumePressedKey();
        var pressedRightKey = (pressedKey!==null) && (pressedKey.keyCode + 32 === expectedLetter);
        var pressedEscapeKey = (pressedKey!==null) && (pressedKey.keyCode === 27);
        var pressedSoundOnOffKey = (pressedKey!==null) && (pressedKey.keyCode === 113); //F2
        var pressedJumpToEndCheatKey = (pressedKey!==null) && (pressedKey.keyCode === 120); //F8
        //if (pressedKey!==null)
        //    console.log("pressedKey:" + pressedKey.keyCode);

        if (pressedSoundOnOffKey) {
            game.sound.mute = !game.sound.mute;
        } else if (pressedJumpToEndCheatKey) {
            this.gameState.textStrIndex = this.gameState.textStr.length;
            this.gameState.cheated = true;
            skippedToTheEnd = true;
        } else if (pressedEscapeKey && this.playMode.canSkipLevels) {
            this.gameState.textStrIndex = this.gameState.textStr.length;
            this.gameState.cheated = true;
            cheatedOnLevel = true;
        } else if (pressedRightKey) {
            this.hitRightLetter();
        } else if (pressedKey!==null && !shouldIgnore(pressedKey.keyCode)) {
            this.booSound();
            this.juicy.shake(20, 20);//function (duration, strength)
            this.gameState.mistakes++;
            if (this.playMode.mistakePenalty)
                this.speedCounter.mishit();
        }

        if (this.speedCounter.bar <= 5) {
            this.booSound();
        }

        if (failed.call(this) || skippedToTheEnd) {
            this.gameState.endingTime = Date.now();
            var time = (this.gameState.endingTime - this.gameState.startingTime)/1000, averageSpeed = null, mistakes = this.gameState.mistakes, minimumSpeed = null, totalScore = null;
            this.game.state.start('ending', true, false, time, averageSpeed, mistakes, minimumSpeed, totalScore,this.gameState.doneLevels,levelsCount(), this.playMode);
            return ;
        }
        if (this.gameState.levelDone()) {
            if (!cheatedOnLevel) {
                this.gameState.doneLevels++;
            }
            this.gameState.level++;
            if (noMoreLevelsToDo.call(this)) {
                this.gameState.endingTime = Date.now();
                var time = (this.gameState.endingTime - this.gameState.startingTime)/1000, averageSpeed = null, mistakes = this.gameState.mistakes, minimumSpeed = null, totalScore = null;
                this.game.state.start('ending', true, false, time, averageSpeed, mistakes, minimumSpeed, totalScore,this.gameState.doneLevels,levelsCount(), this.playMode);
                return ;
            }

            this.init_sentence(this.gameState.level);
            this.clappingSound();
            if (definition.specialProperties[this.gameState.level-1].packEnding) {
                this.packEndingSound();
            } else {
                this.packEndingFadeOut();
            }
        }

        this.scoreBar.y = this.speedCounter.bar*10;
        for (var i = 0 ; i< this.scoreText.length; i++) {
            if (this.scoreText[i].y > this.scoreBar.y) {
                this.scoreText[i].fill = '#a0a0a0';
            } else {
                this.scoreText[i].fill = '#000000';
            }
        }
    },

    hitRightLetter: function() {
        this.speedCounter.countHit();
        this.soundGenerator.hit();
        var letter = this.text[this.gameState.textIndex];
        letter.anchor.set(0.5, 0.5);
        game.tweens.removeFrom(letter);
        game.add.tween(letter).to({alpha:0, rotation:4}, 200).start();
        this.gameState.pressedLetters++;
        this.gameState.textIndex++;
        this.gameState.textStrIndex++;
        this.gameState.score++;
    },

    init_sentence: function(level) {
        var nextLevelText;
        if (this.group_text)
            this.group_text.removeAll(true);

        this.text = [];
        nextLevelText = chooseTextChallenge(level);
        this.gameState.textStr = nextLevelText.toLowerCase();

        var colorPalette = definition.defaultColors[level-1];
        this.game.stage.backgroundColor = colorPalette.background || this.game.stage.backgroundColor;

        var verticalSpace = 75, currentLevel = definition.screens[level-1];
        var lines = nextLevelText.split('\n'), letterWidth = currentLevel.letterWidth || 70;
        var startY = totalMaxY/2 - verticalSpace*lines.length/2;
        var i= 0;
        for (var lineIndx=0; lineIndx< lines.length; lineIndx++) {
            var row = lines[lineIndx];
            var offsetX = (totalMaxX-(row.length*letterWidth - letterWidth))/2 -10;
            for (var letterIndx=0; letterIndx< row.length; letterIndx++) {
                var font = JSON.parse(JSON.stringify(theme.font_1));
                font.fill = colorPalette.text || font.fill;
                this.text[i] = game.add.text(offsetX, startY, row[letterIndx], font);
                this.text[i].fontSize = currentLevel.fontSize || 70;
                this.text[i].fontWeight = 'bold';
                this.text[i].alpha = 0;
                this.text[i].anchor.set(0.5, 0.5);
                game.add.tween(this.text[i]).to({alpha:1}, 200).delay(i).start();
                this.group_text.add(this.text[i]);
                offsetX += letterWidth;
                i++;
            }
            startY += verticalSpace;
        }

        var visualModifier = definition.screens[level-1].visualModifier;
        if (visualModifier) {
            visualModifier(this.text);
        }

        this.gameState.textStrIndex = 0;
        this.gameState.textIndex = 0;
    },

    shutdown: function() {
        this.keyboard.addCallbacks(null, null, null);
        if (this.backgroundBig.isPlaying)
            this.backgroundBig.stop();
    }

};

/* ****************************** game definition */
var game = new Phaser.Game(totalMaxX, totalMaxY, Phaser.AUTO, 'gameContainer');
game.state.add('load', states.load);
game.state.add('menu', states.menu);
game.state.add('game', states.game);
game.state.add('ending', states.ending);

game.state.start('load');

