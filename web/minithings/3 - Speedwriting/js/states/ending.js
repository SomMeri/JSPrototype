states.ending = {
    init: function(timeSecons, averageSpeed, mistakes, minimumSpeed, totalScore, levelsFinished, totalLevels, playMode) {
        this.time = (Math.round(timeSecons*10)/10 || '??') + ' sec';
        this.averageSpeed = averageSpeed || 10;
        this.mistakes = mistakes || mistakes===0 ? mistakes : '??';
        this.minimumSpeed = minimumSpeed || 10;
        this.totalScore = totalScore || 10;
        if (!(levelsFinished==null || totalLevels==null)) {
            this.totalLevels = totalLevels;
            this.levelsFinished = levelsFinished;
        } else {
            this.totalLevels = '0';
            this.levelsFinished = '???';
        }

        this.playMode = playMode;
        this.previousMaxScore = loadMaxScore(this.playMode.name, -1);
        if (this.previousMaxScore<this.levelsFinished) {
            saveMaxScore(this.playMode.name, this.levelsFinished);
        }
    },

    create: function() {
        this.game.stage.backgroundColor = '#3d01a2'; //FFA500
        var doubleDotX = 300;
        var bestX = 430;
        function alignText(text) {
            text.position.x = doubleDotX - text.width;
        }
        function centerText(text) {
            text.position.x = doubleDotX - text.width/2 -20;
        }
        //FIXME: show best results and show acquired medals
        var y = 60, yShift = 48;
        var style = {font: "bold 16pt Arial", fill: '#FFA500'}; // FFD700 FFA500 FFD700 aa00aa FFA500
        var bestStyle = {font: style.font, fill: '#bbbbbb'}; // FFD700 FFA500 FFD700 aa00aa FFA500
        var topStyle = {font: "bold 18pt Arial", fill: '#fafa00'}; // FFD700 FFA500 FFD700 aa00aa FFA500
        var motivationalStyle = {font: "bold 18pt Arial", fill: '#bbbbbb'}; // FFD700 FFA500 FFD700 aa00aa FFA500

        function rowDown() {
            y += yShift;
        }
        function halfRowDown() {
            y += yShift/2;
        }
        function createMenuLine(text, value, best) {
            var newText = game.add.text(16, y, text, style); //#345
            alignText(newText);

            if (value===0) { // uhm ... FIXME: report bug??
                value = '0';
            }

            var newValue = game.add.text(doubleDotX+20, y, value, style); //#345
            if (best || best===0) {
                best = best===0?'0':best;
            }
            var bestValue = null;
            if (best)
                bestValue = game.add.text(bestX, y, best, bestStyle); //#345
            halfRowDown();
            return { newText: newText, newValue: newValue };
        }

        function createSuggestion(text) {
            var newText = game.add.text(16, y, text, style);
            centerText(newText);
            rowDown();
            newText.customTweenValue = 1;
            var tween = game.add.tween(newText).to({ customTweenValue: 100 }, 500, Phaser.Easing.Quadratic.InOut).yoyo(true).repeat().start();
            tween.onUpdateCallback(function(){
                var color = interpolateColor(0xFFff00, 0xFFA500, 100, newText.customTweenValue, 1);
                newText.addColor(color, 0);
            }, this);
            return newText;
        }

        function createTopLine(text, style) {
            var newText = game.add.text(16, y, text, style); //#345
            centerText(newText);
            halfRowDown();
            return { newText: newText};
        }
         function motivationalText(levelsFinished) {
             if (levelsFinished===0)
                return "Well, not much";

             if (levelsFinished < 5)
                 return "Better Then Nothing";

             if (levelsFinished < 15)
                 return "Good Start";

             if (levelsFinished < 30)
                 return "Pretty Good";

             if (levelsFinished < 40)
                 return "Getting There";

             if (levelsFinished < this.totalLevels)
                 return "Almost";

             return "EVERYTHING DONE";

         }

        //createTopLine("EVERYTHING DONE");
        //createTopLine("GOOD JOB");
        //doneLevels
        createTopLine("Completed "+this.levelsFinished+" of "+this.totalLevels+"", topStyle);
        //motivationalText(this.levelsFinished)
//        createTopLine('* record *', motivationalStyle);
        if (this.previousMaxScore<this.levelsFinished) {
            var recordText = createTopLine('New Record', motivationalStyle);
            game.add.tween(recordText.newText).to( { alpha: 0.3 }, 500, "Linear", true, 0).yoyo(true).repeat().start();
        } else {
            createTopLine('* Best * ' + this.previousMaxScore + " *", motivationalStyle);
        }
        rowDown();halfRowDown();
        createMenuLine("Time Taken: ", this.time, null);
        createMenuLine("Mistakes: ", this.mistakes, null);
        //createMenuLine("Average Speed: ", this.averageSpeed);
        //createMenuLine("Minimum Speed: ", this.minimumSpeed);
        //createSuggestion("--------------------------------------");
        //createMenuLine("Score: ", this.totalScore);

        rowDown();
        rowDown();
        var suggestion = createSuggestion("<Press Enter or Arrow or Space>");

        this.keyboard = this.game.input.keyboard;
    },

    update: function() {
        if (game.input.activePointer.isDown
            || this.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.keyboard.isDown(Phaser.Keyboard.ENTER)
            || this.keyboard.isDown(Phaser.Keyboard.UP) || this.keyboard.isDown(Phaser.Keyboard.DOWN)
            || this.keyboard.isDown(Phaser.Keyboard.LEFT) || this.keyboard.isDown(Phaser.Keyboard.RIGHT)) {

            this.game.state.start('menu', true, false);
        } else if (this.keyboard.isDown(Phaser.Keyboard.F2)) {
            if (!this.keyUsed) {
                game.sound.mute = !game.sound.mute;
                if (!game.sound.mute) {
                    this.turnOnMusic();
                }
                this.keyUsed = true;
            } else {
                this.keyUsed = false;
            }
        }

        if (!game.sound.mute) {
            this.turnOnMusic();
        }

    },

    turnOnMusic: function() {
        if (!music.isPlaying) {
            music.play('',0,0.7,true,true);
        }
    }

};