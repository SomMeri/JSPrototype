states.menu = {
    blinkColor: function (suggestion, fromColor, toColor) {
        suggestion.customTweenValue = 1;
        var tween = game.add.tween(suggestion).to({customTweenValue: 100}, 500, Phaser.Easing.Quadratic.InOut).yoyo(true).repeat().start();
        tween.onUpdateCallback(function () {
            var color = interpolateColor(fromColor, toColor, 100, suggestion.customTweenValue, 1);
            suggestion.addColor(color, 0);
        }, this);

        return tween;
    },
    create: function() {
        this.game.stage.backgroundColor = '#3d01a2'; //FFA500 f9bb02
//        this.game.stage.backgroundColor = '#a0a0a0';

        this.menuParts = [];
        this.activeMenuPart = 1;

        this.mainLineDeActivatedColor = '#FFA500'; //FFff00
        this.mainLineActivatedColor = '#FFFF00'; //FFff00
        this.descriptionLineDeActivatedColor = '#bbbbbb'; //FFff00
        this.descriptionLineActivatedColor = this.mainLineActivatedColor; //FFff00
        this.mainLineStyle = {font: 'bold 20pt Arial', fill: this.mainLineDeActivatedColor}; // FFD700 FFA500 FFD700 aa00aa
        this.descriptionStyle = {font: 'bold 15pt Arial', fill: this.descriptionLineDeActivatedColor, align: 'center'}; // FFD700 FFA500 FFD700 aa00aa
        this.mainLineHighlightedStyle = {from: this.mainLineDeActivatedColor, to: this.mainLineActivatedColor};

        //,

        var doubleDotX = 300;
        function alignText(text) {
            text.position.x = doubleDotX - text.width;
        }
        function centerText(text) {
            text.anchor.setTo(0.5, 0.5);
            text.position.x = doubleDotX;
        }
        //FIXME: better colors
        //FIXME: show best results and show acquired medals
        var y = 80, yShift = 60;
        var mainLineStyle1 = this.mainLineStyle;
        var descriptionStyle1 = this.descriptionStyle;

        function rowDown() {
            y += yShift;
        }
        function halfRowDown() {
            y += yShift/2 + 8;
        }
        function createMenuLine(text) {
            var newText = game.add.text(16, y, text, mainLineStyle1); //#345
            centerText(newText);
            halfRowDown();
            return newText;
        }

        function createDescription(text) {
            var newText = game.add.text(16, y, text, descriptionStyle1);
            centerText(newText);
            rowDown();
            return newText;
        }

        function createSuggestion(text) {
            var newText = game.add.text(16, y, text, mainLineStyle1);
            centerText(newText);
            rowDown();
            return newText;
        }

        this.menuParts.push({
            main: createMenuLine("Training"),
            description: createDescription("can not fail")
        });

        this.menuParts.push({
            main: createMenuLine("Normal"),
            description: createDescription("speed limit\npenalty for faults")
        });

        this.menuParts.push({
            main: createMenuLine("Hardcore"),
            description: createDescription("short speed limit\nno mistakes")
        });

        rowDown();
        var suggestion = createSuggestion("<Enter to Start>");
        this.blinkColor(suggestion, 0xFFff00, 0xFFA500);
        for (var i=0; i<this.menuParts.length ;i++) {
            this.turnOffHighlight(i);
        }
        this.turnOnHighLight(this.activeMenuPart);
        this.keyboard = this.game.input.keyboard;
    },

    turnOffHighlight: function (menuIndex) {
        this.menuParts[menuIndex].main.addColor(this.mainLineDeActivatedColor, 0);
        this.menuParts[menuIndex].description.addColor(this.mainLineStyle, 0);
        this.menuParts[menuIndex].main.scale.setTo(0.8, 0.8);
        this.menuParts[menuIndex].description.scale.setTo(0.8, 0.8);
        if (this.menuParts[menuIndex].mainTween) {
            this.menuParts[menuIndex].mainTween.stop(false);
        }
        if (this.menuParts[menuIndex].descriptionTween) {
            this.menuParts[menuIndex].descriptionTween.stop(false);
        }
    },
    turnOnHighLight: function (menuIndex) {
        this.menuParts[menuIndex].main.addColor(this.mainLineActivatedColor, 0);
        this.menuParts[menuIndex].description.addColor(this.descriptionLineActivatedColor, 0);

        //this.menuParts[menuIndex].mainTween = this.blinkColor(this.menuParts[menuIndex].main, 0xFFff00, 0xA5A500); //0xFFff00, 0xFFA500
        //this.menuParts[menuIndex].descriptionTween = this.blinkColor(this.menuParts[menuIndex].description, 0xbbbbbb, 0x666666);
        //this.menuParts[menuIndex].main.scale.setTo(1, 1);
        //this.menuParts[menuIndex].description.scale.setTo(1, 1);
        //var scaleX = 1, scaleY=0.8;
        //this.menuParts[menuIndex].mainTween = this.add.tween(this.menuParts[menuIndex].main.scale).to({ x: scaleX, y: scaleY}, 500, Phaser.Easing.Quadratic.InOut).yoyo(true).repeat().start();
        //this.menuParts[menuIndex].descriptionTween = this.add.tween(this.menuParts[menuIndex].description.scale).to({ x: scaleX, y: scaleY}, 500, Phaser.Easing.Quadratic.InOut).yoyo(true).repeat().start();
//        game.add.tween(this.menuParts[menuIndex].main).to({ customTweenValue: 100 }, 500, Phaser.Easing.Quadratic.InOut).yoyo(true).repeat().start();
//        game.add.tween(this.menuParts[menuIndex].description).to({ scale: 100 }, 500, Phaser.Easing.Quadratic.InOut).yoyo(true).repeat().start();
    },
    update: function() {
        if (/* game.input.activePointer.isDown ||*/ this.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            this.game.state.start('game', true, false);
            return ;
        }
        var movedInMenu = false, previouslyActiveMenu = this.activeMenuPart;
        if (this.keyboard.isDown(Phaser.Keyboard.DOWN) || this.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            if (!this.keyUsed) {
                movedInMenu = true;
                this.keyUsed = true;
                this.activeMenuPart++;
                if (this.activeMenuPart>=this.menuParts.length) {
                    this.activeMenuPart = 0;
                }
            }
        } else if (this.keyboard.isDown(Phaser.Keyboard.UP) || this.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            if (!this.keyUsed) {
                movedInMenu = true;
                this.keyUsed = true;
                this.activeMenuPart--;
                if (this.activeMenuPart < 0) {
                    this.activeMenuPart = this.menuParts.length - 1;
                }
            }
        } else {
            this.keyUsed = false;
        }

        if (movedInMenu) {
            this.turnOffHighlight(previouslyActiveMenu);
            this.turnOnHighLight(this.activeMenuPart);
        }
    },

    shutdown: function() {
        this.keyboard.addCallbacks(null, null, null);
    }

};