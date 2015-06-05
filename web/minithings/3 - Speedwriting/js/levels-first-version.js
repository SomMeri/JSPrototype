var definition = {
  screens: [
    /*{
     text: "another\nboss\nbattle", //stredne: escape\nartists lahke: "escaping\nescapist", super tazke: do not go\nstay with\nme
     visualModifier: function(text) {
     for (var i=0; i< text.length;i++) {
     }
     for (var i=0; i< text.length;i++) {
     var length = 1000, delay = 0;
     var goalScale = (i%2) ? 2 : 0.5;
     var toY = text[i].y;
     toY = (i%2) ? toY-50 : toY+50;
     game.add.tween(text[i]).to( { y: toY }, 1000, Phaser.Easing.Linear.None, true, delay, -1, true);
     }
     }
     },
     {
     text: "distract\ndisturb",
     visualModifier: function(text) {
     for (var i=0; i< text.length;i++) {
     var initialScale = (i%2) ? 0.5 : 2;
     text[i].scale.x = initialScale;
     text[i].scale.y = initialScale;
     }
     for (var i=0; i< text.length;i++) {
     var length = 1000, delay = 0;
     var goalScale = (i%2) ? 2 : 0.5;
     game.add.tween(text[i].scale).to( { x: goalScale, y: goalScale}, 1000, Phaser.Easing.Linear.None, true, delay, -1, true);
     }
     }
     },
     {
     text: "bouncing\nwords",
     visualModifier: function(text) {
     for (var i=0; i< text.length;i++) {
     var initialScale = (i%2) ? 0.5 : 2;
     text[i].scale.x = initialScale;
     text[i].scale.y = initialScale;
     }
     for (var i=0; i< text.length;i++) {
     var length = 1000, delay = 0;
     var goalScale = (i%2) ? 2 : 0.5;
     game.add.tween(text[i].scale).to( { x: goalScale, y: goalScale}, 1000, Phaser.Easing.Linear.None, true, delay, -1, true);
     }
     }
     },*/
    {
      text: "all\ntogether",//omg my\neyes
      visualModifier: function(text) {
        for (var i=0; i< text.length;i++) {
          text[i].alpha = 0;
        }
        for (var i=0; i< text.length;i++) {
          game.add.tween(text[i]).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        }
      }
    },
    {
      text: "missing\nletters",
      visualModifier: function(text) {
        for (var i=0; i< text.length;i++) {
          var initialAlpha = (i%2) ? 0 : 1;
          text[i].alpha = initialAlpha;
          text[i].alpha = initialAlpha;
        }
        for (var i=0; i< text.length;i++) {
          var toAlpha = (i%2) ? 1 : 0;
          var length = 1000, delay = length * (i%2);
          game.add.tween(text[i]).to( { alpha: toAlpha }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);
        }
      }
    },
    /*{
     text: "Type\nLike\nMad"
     }, */
    /* {
     text: "red",
     visualModifier: function(text) {
     text.forEach(function(letter) {
     letter.addColor('#FF0000', 0);
     }, this);
     }
     },
     {
     text: "green",
     visualModifier: function(text) {
     text.forEach(function(letter) {
     letter.addColor('#00FF00', 0);
     }, this);
     }
     },
     {
     text: "blue",
     visualModifier: function(text) {
     text.forEach(function(letter) {
     letter.addColor('#add8e6', 0);
     }, this);
     }
     },
     {
     text: "red",
     visualModifier: function(text) {
     text.forEach(function(letter) {
     letter.addColor('#FF0000', 0);
     }, this);
     }
     },
     {
     text: "blue",
     visualModifier: function(text) {
     text.forEach(function(letter) {
     letter.addColor('#add8e6', 0);
     }, this);
     }
     },
     {
     text: "red",
     visualModifier: function(text) {
     text.forEach(function(letter) {
     letter.addColor('#FF0000', 0);
     }, this);
     }
     },
     {
     text: "green",
     visualModifier: function(text) {
     text.forEach(function(letter) {
     letter.addColor('#00FF00', 0);
     }, this);
     }
     },
     {
     text: "green",
     visualModifier: function(text) {
     text.forEach(function(letter) {
     letter.addColor('#FF0000', 0);
     }, this);
     }
     },*/
    /*  {
     text: "type\nthis\ntoo"
     },
     {
     text: "this\nis\nbooring"
     }, */
    /*  {
     text: "upside\ndown",
     visualModifier: function(text) {
     //text[3].angle=180;
     //text[5].angle=180;

     text[3].anchor.set(0.5, 0.5);
     text[3].scale.y *= -1;
     text[3].y+=4;
     text[5].anchor.set(0.5, 0.5);
     text[5].scale.y *= -1;
     text[5].y+=4;
     }
     },*/
    /*{
     text: "ALL FALL\nDOWN",
     visualModifier: function(text) {
     for (var i=0; i< 3;i++) {
     text[i].scale.y *= -1;
     }
     for (var i=8; i< 12;i++) {
     text[i].scale.y *= -1;
     }
     }
     },*/
    /*{
     text: "turn\nit\nround",
     update: function(text) {
     for (var i=0; i< text.length;i++) {
     text[i].angle+=4;
     }
     }
     },
     {
     text: "hate\nme\nnow",
     visualModifier: function(text) {
     for (var i=0; i< text.length;i++) {
     text[i].angle=200;
     }
     text[4].angle=140;
     text[5].angle=140;
     }
     },
     {
     text: "what\nabout\nnow",
     update: function(text) {
     for (var i=0; i< text.length;i++) {
     if (i %2 ==0 )
     text[i].angle+=4;
     else
     text[i].angle-=4;
     }
     }
     },
     {
     text: "this\nis\nhard\nBOSS\nBATTLE",
     visualModifier: function(text) {
     for (var i=0; i< text.length;i++) {
     if (i %2 ==0 )
     text[i].angle=200;
     else
     text[i].angle=140;
     }
     }
     },
     {
     text: "Egy tucat\nkupac csupasz\nkopasz kukac\nmeg",
     letterWidth: 40
     },
     {
     text: "Juan junta\njuncos junto\na la zanja",
     letterWidth: 40
     },
     {
     text: "six cent six\nscies scient\nsix cent\nsix cypres", // full preceded by "Si six\nscies scient\nsix cypres",
     letterWidth: 40
     },*/


  ]
};

