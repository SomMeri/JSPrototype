var j, i, functions = {
  /*
    those long should be split and each should go between segments
   */
  everyOtherOneJumpingUpAndDown: function(text) {
    for (var i=0; i< text.length;i++) {
    }
    for (var i=0; i< text.length;i++) {
      var length = 1000, delay = 0;
      var toY = text[i].y;
      toY = (i%2) ? toY-50 : toY+50;
      game.add.tween(text[i]).to( { y: toY }, 1000, Phaser.Easing.Linear.None, true, delay, -1, true);
    }
  },

  wholeWordDiagonalAndBack: function(text) {
    for (var i=0; i< text.length;i++) {
    }
    for (var i=0; i< text.length;i++) {
      var length = 1000, delay = 0;
      var toY = text[i].y, toX = text[i].x;

      toY = toY-100;//(i%2) ? toY-50 : toY+50;
      toX = toX+100;//(i%2) ? toY-50 : toY+50;
      game.add.tween(text[i]).to( { y: toY, x: toX }, length, Phaser.Easing.Linear.None, true, delay, -1, true);
    }
  },

  wholeWordDiagonalAndBack_2: function(text) {
    for (var i=0; i< text.length;i++) {
    }
    for (var i=0; i< text.length;i++) {
      var length = 1000, delay = 0;
      var toY = text[i].y, toX = text[i].x;

      toY = toY+100;//(i%2) ? toY-50 : toY+50;
      toX = toX-100;//(i%2) ? toY-50 : toY+50;
      game.add.tween(text[i]).to( { y: toY, x: toX }, length, Phaser.Easing.Linear.None, true, delay, -1, true);
    }
  },

  diagonalSplit: function(text) {
    for (var i=0; i< text.length;i++) {
    }
    for (var i=0; i< text.length;i++) {
      var length = 1000, delay = 0;
      var toY = text[i].y, toX = text[i].x;

      if (i<text.length/2) {
        toY = toY-100;
        toX = toX-100;
      } else {
        toY = toY-100;
        toX = toX+100;
      }
      game.add.tween(text[i]).to( { y: toY, x: toX }, length, Phaser.Easing.Linear.None, true, delay, -1, true);
    }
  },

  yFlipLetters: function(text, indexes) {
    indexes.forEach(function(index) {
      text[index].anchor.set(0.5, 0.5);
      text[index].scale.y *= -1;
      text[index].y+=4;
    }, this);
  },

  colorAll: function(text, color) {
    text.forEach(function(letter) {
      letter.addColor(color, 0);
    }, this);
  }

};

var colorCombinations = {
  darkYellowOnBlue: { text: '#fabc02', background: '#3d01a2' },
  darkOrangeOnViolet: { text: '#fb5308', background: '#a7194b' },
  lightGreenOnBlue: { text: '#cfe92b', background: '#3d01a2' },
  darkOrangeOnDarkGreen: { text: '#fb5308', background: '#009e68' },
  violetOnBlue: { text: '#a7194b', background: '#3d01a2' },
  redOnGreen: { text: '#ca0e08', background: '#0a8b36' },
  darkYellowOnDarkOrange: { text: '#fabc02', background: '#fb5308' },
  GreyOnBlack: {text: '#808080', background:'#090909'},
  blackOnGrey: {text: '#090909', background:'#808080'},
  experiment: { text: '#000000', background: '#3d01a2' },
  do_not_use: {}
};
var definition= {}, screensOrder, realScreensOrder, testOrder;
var levels_colors_pack, levels_international_tongue_twisters, levels_turning_twisting,
  levels_static_turn_not_suitable_for_intro, levels_blinking, levels_escaping, levels_numbers;

levels_colors_pack = [{
    text: "red",
    visualModifier: function(text) {
      functions.colorAll(text, '#FF0000');
    }
  },
  {
    text: "green",
    visualModifier: function(text) {
      functions.colorAll(text, '#00FF00');
    }
  },
  {
    text: "blue",
    visualModifier: function(text) {
      functions.colorAll(text, '#0000FF');
    }
  },
  {
    text: "red",
    visualModifier: function(text) {
      functions.colorAll(text, '#FF0000');
    }
  },
  {
    text: "blue",
    visualModifier: function(text) {
      functions.colorAll(text, '#0000FF');
    }
  },
  {
    text: "red",
    visualModifier: function(text) {
      functions.colorAll(text, '#FF0000');
    }
  },
  {
    text: "green",
    visualModifier: function(text) {
      functions.colorAll(text, '#00FF00');
    }
  },
  {
    text: "blue",
    visualModifier: function(text) {
      functions.colorAll(text, '#FF0000');
    }
  }
];

levels_colors_pack = [{
  text: "red",
  visualModifier: function(text) {
    functions.colorAll(text, '#FF0000');
  }
},
  {
    text: "green",
    visualModifier: function(text) {
      functions.colorAll(text, '#00FF00');
    }
  },
  {
    text: "blue",
    visualModifier: function(text) {
      functions.colorAll(text, '#0000FF');
    }
  },
  {
    text: "red",
    visualModifier: function(text) {
      functions.colorAll(text, '#FF0000');
    }
  },
  {
    text: "blue",
    visualModifier: function(text) {
      functions.colorAll(text, '#0000FF');
    }
  },
  {
    text: "red",
    visualModifier: function(text) {
      functions.colorAll(text, '#FF0000');
    }
  },
  {
    text: "green",
    visualModifier: function(text) {
      functions.colorAll(text, '#00FF00');
    }
  },
  {
    text: "blue",
    visualModifier: function(text) {
      functions.colorAll(text, '#FF0000');
    }
  }
];

levels_international_tongue_twisters = [
  {
    text: "big black\nbug bit\na\nbig black dog",
    letterWidth: 40
  },
  {
    text: "Bierbrauer\nBauer braut\nbraunes\nBier",//zu Zipf zapft zehn Fässer Zipfer.
    letterWidth: 40
  },
  {
    text: "sound method\nof sounding\nsounds",//Busy buzzing bumble bees.
    letterWidth: 40
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
  }
];

levels_numbers = [
  { text: "one"},
  { text: "two"},
  { text: "three"},
  { text: "four"},
  { text: "five"},
  { text: "seven"},
  { text: "nine"},
  { text: "ten"}

];

levels_turning_twisting = [
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
  },
  {
    /*
     All the big and the small
     Well, the taller they stand
     Well, the harder they fall
     */
    text: "All the\nbig and\nthe small",
    letterWidth: 60,
    visualModifier: function(text) {
      var minScale = 0.5, maxScale=2;
      for (var i=0; i< text.length;i++) {
        var initialScale = (i%2) ? minScale : maxScale;
        text[i].scale.x = initialScale;
        text[i].scale.y = initialScale;
      }
      for (var i=0; i< text.length;i++) {
        var length = 1000, delay = 0;
        var goalScale = (i%2) ? maxScale : minScale;
        game.add.tween(text[i].scale).to( { x: goalScale, y: goalScale}, 1000, Phaser.Easing.Linear.None, true, delay, -1, true);
      }
    }
  },
  {
    text: "turn\nit\nround",
    update: function(text) {
      for (var i=0; i< text.length;i++) {
        text[i].angle+=4;
      }
    }
  },
  {
    text: "hate\nme\nnow",
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
    text: "what\nabout\nnow",
    visualModifier: function(text) {
      for (var i=0; i< text.length;i++) {
        text[i].angle=200;
      }
      text[4].angle=140;
      text[5].angle=140;
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
  }
];

levels_static_turn_not_suitable_for_intro = [
/*  {
    text: ["DOWNSIDE\nTEXT"], //["FLIPPED\nLETTERS", "FLIPPED\nWORDS","FLIPPED\nTEXT","UPSIDE\nLETTERS", "UPSIDE\nWORDS","UPSIDE\nTEXT"],
    visualModifier: function(text) {
      var parameter = [];
      for (var i=0; i< text.length;i++) {
        parameter.push(i)
      }
      functions.yFlipLetters(text, parameter)
    }
  },*/
  {
    text: ["Type\nLike\nMad","Write\nLike\nMad","Type\nLike\nCrazy","Write\nLike\nCrazy","Type\nReal\nFast","Write\nReal\nFast","Type\nReal\nQuick","Write\nReal\nQuick"]
  },
  {
    text: ["type\nthis\ntoo","write\nthis\ntoo","quickly\nthis\none","quickly\nthat\none","fast\nthis\none"]
  },
  {
    text: ["upside\ndown","downside\nup","upside\nthere","where\nis up","this\nis\ndown"],
    visualModifier: function(text) {
      functions.yFlipLetters(text, [3, 5, 8])
    }
  },
  {
    text: "all fall\nDOWN", //"right\nto\nleft","left\nto\nright"
    visualModifier: function(text) {
      functions.yFlipLetters(text, [0, 1, 2, 8, 9, 10, 11])
    }
  },
  {
    text: ["easier","slowing","clear","light","facile"]
  },
  {//THIS IS TOO HARD = MUST BE LAST ONE IN SERIES
    text: ["FALLING\nGROUND", "STAYING\nGROUND", "MOVING\nGROUND", "FLYING\nFLOOR", "FALLING\nFLOOR", "STAYING\nFLOOR", "MOVING\nFLOOR"],
    visualModifier: function(text) {
      var parameter = [];
      for (var i=0; i< text.length;i++) {
        parameter.push(i)
      }
      functions.yFlipLetters(text, parameter)
    }
  },
  {
    text: ["first\nboss","before\nboss","easy\nboss","just\nfun"]
  },
  {
    text: ["FLIPPED\nLETTERS", "FLIPPED\nWORDS","FLIPPED\nTEXT","UPSIDE\nLETTERS", "UPSIDE\nWORDS","UPSIDE\nTEXT"],
    visualModifier: function(text) {
      var parameter = [];
      for (var i=0; i< text.length;i++) {
        parameter.push(i)
      }
      functions.yFlipLetters(text, parameter)
    }
  }
];

//TODO turn it round su zmixovane zo statickymi, precistit
//chaotic behavior
experiments = [
  {
//I gazed awhile
//On her cold smile;
    text: "I gazed\nawhile",//"We will\nstand tall",
    letterWidth: 70,
    update: function(text) {
      for (var i=0; i< text.length;i++) {
        text[i].angle+=text[i].rotation_speed;
      }
    },
    visualModifier: function(text) {
      //NOTE: difficulty is set through min scale and speed differences
      var minScale = 0.2, maxScale= 2, length = 1000, delay=0, speed, startingScale, tween, tweenSecond, goalScale, oppositeScale, duration;

      for (var i=0; i< text.length;i++) {
        startingScale = getRandomDouble(minScale, maxScale);
        text[i].rotation_speed = getRandomInt(2, 7);
        text[i].scale.x = startingScale;
        text[i].scale.y = startingScale;

        //vsetky sa zvacsuju na zaciatku
        //var goalScale = (i%2) ? maxScale : minScale;
        speed = getRandomInt(400, 900);
        goalScale = maxScale;
        oppositeScale = minScale;
        duration= speed*(goalScale - startingScale)/(maxScale - minScale);
        tween = game.add.tween(text[i].scale);
        //properties, duration, ease, autoStart, delay, repeat, yoyo
        tween.to( { x: goalScale, y: goalScale}, duration, Phaser.Easing.Linear.None, true, 0, 0, false);

        tweenSecond = game.add.tween(text[i].scale);
        tweenSecond.to( { x: oppositeScale, y: oppositeScale}, speed, Phaser.Easing.Linear.None, false, 0, -1, true);
        tween.chain(tweenSecond);
      }
    }
  },
  {
//    Well, the taller they stand
  //  Well, the harder they fall

//    text: "Well\nthe taller\nthey stand",
    text: "darkness\nthere\nno more",//"Well\nthe harder\nthey fall",
    letterWidth: 60,
    update: function(text) {
      for (var i=0; i< text.length;i++) {
          text[i].angle+=4;
      }
    },
    visualModifier: function(text) {
      //NOTE: difficulty is set through min scale and speed differences
      var minScale = 0.2, maxScale= 2, length = 1000, delay=0, speed, startingScale, tween, tweenSecond, goalScale, oppositeScale, duration;

      for (var i=0; i< text.length;i++) {
        startingScale = getRandomDouble(minScale, maxScale);
        text[i].scale.x = startingScale;
        text[i].scale.y = startingScale;

        //vsetky sa zvacsuju na zaciatku
        //var goalScale = (i%2) ? maxScale : minScale;
        speed = getRandomInt(300, 800);
        goalScale = maxScale;
        oppositeScale = minScale;
        duration= speed*(goalScale - startingScale)/(maxScale - minScale);
        tween = game.add.tween(text[i].scale);
        //properties, duration, ease, autoStart, delay, repeat, yoyo
        tween.to( { x: goalScale, y: goalScale}, duration, Phaser.Easing.Linear.None, true, 0, 0, false);

        tweenSecond = game.add.tween(text[i].scale);
        tweenSecond.to( { x: oppositeScale, y: oppositeScale}, speed, Phaser.Easing.Linear.None, false, 0, -1, true);
        tween.chain(tweenSecond);
      }
    }
  },
  {

    text: "fantastic\nterrors\nnever\nfelt",//"Well\nthe taller\nthey stand",
    letterWidth: 60,
    visualModifier: function(text) {
      //NOTE: difficulty is set through min scale and speed differences
      var minScale = 0.2, maxScale= 2, length = 1000, delay=0, speed, startingScale, tween, tweenSecond, goalScale, oppositeScale, duration;

      for (var i=0; i< text.length;i++) {
        startingScale = getRandomDouble(minScale, maxScale);
        text[i].scale.x = startingScale;
        text[i].scale.y = startingScale;

        //vsetky sa zvacsuju na zaciatku
        //var goalScale = (i%2) ? maxScale : minScale;
        speed = getRandomInt(300, 800);
        goalScale = maxScale;
        oppositeScale = minScale;
        duration= speed*(goalScale - startingScale)/(maxScale - minScale);
        tween = game.add.tween(text[i].scale);
        //properties, duration, ease, autoStart, delay, repeat, yoyo
        tween.to( { x: goalScale, y: goalScale}, duration, Phaser.Easing.Linear.None, true, 0, 0, false);

        tweenSecond = game.add.tween(text[i].scale);
        tweenSecond.to( { x: oppositeScale, y: oppositeScale}, speed, Phaser.Easing.Linear.None, false, 0, -1, true);
        tween.chain(tweenSecond);
      }
    }
  },
  {
    text: "which way\ndo they\ngo",
    letterWidth: 60,
    visualModifier: function(text) {
      var angle;
      for (var i=0; i< text.length;i++) {
        angle = getRandomInt(0, 360);
        text[i].angle=angle;
      }
    }
  },
  {
    text: "random\nrandomized\nchallenge",
    letterWidth: 50,
    update: function(text) {
      for (var i=0; i< text.length;i++) {
        if (text[i].trick_sense === -1 ) {
          text[i].angle+=text[i].trick_speed;
        } else {
          text[i].angle-=text[i].trick_speed;
        }
        if (text[i].angle > text[i].trick_max || text[i].angle<text[i].trick_min) {
          text[i].trick_sense *= -1;
        }
      }
    },
    visualModifier: function(text) {
      var sense, speed, length;
      for (var i=0; i< text.length;i++) {
        sense = getRandomInt(0, 1) ? -1 : 1;
        speed = getRandomInt(2, 6);
        length = getRandomInt(40, 60);
        text[i].trick_speed = speed;
        text[i].trick_sense = sense;
        text[i].trick_max = 0 + length;
        text[i].trick_min = 0 - length;
        if (sense===-1)
          text[i].angle=text[i].trick_min;
        else
          text[i].angle=text[i].trick_max;
      }
    }
  },
  {
    text: "twisting\ntwist",
    update: function(text) {
      for (var i=0; i< text.length;i++) {
        if (text[i].trick_sense === -1 ) {
          text[i].angle+=4;
        } else {
          text[i].angle-=4;
        }
        if (text[i].angle > 50 || text[i].angle<-50) {
          text[i].trick_sense *= -1;
        }
      }
    },
    visualModifier: function(text) {
      for (var i=0; i< text.length;i++) {
        var sense = (i%2) ? -1 : 1;
        text[i].trick_sense = sense;
        if (sense===-1)
          text[i].angle=-50;
        else
          text[i].angle=50;
      }
    }
  },
  {
    text: "fidgeting\nfidget",
    update: function(text) {
      for (var i=0; i< text.length;i++) {
        if (text[i].trick_sense === -1 ) {
          text[i].angle+=4;
        } else {
          text[i].angle-=4;
        }
        if (text[i].angle > 250 || text[i].angle<90) {
          text[i].trick_sense *= -1;
        }
      }
    },
    visualModifier: function(text) {
      for (var i=0; i< text.length;i++) {
        var sense = (i%2) ? -1 : 1;
        text[i].trick_sense = sense;
        if (sense===-1)
          text[i].angle=140;
        else
          text[i].angle=250;
      }
    }

  },

];

levels_blinking_experiments = [
//  {
//    text: "all\ntogether",//omg my\neyes
//    visualModifier: function(text) {
//      for (var i=0; i< text.length;i++) {
//        text[i].alpha = 0;
//      }
//      for (var i=0; i< text.length;i++) {
//        game.add.tween(text[i]).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);
//      }
//    }
//  },
  {
    text: "something\nelse",
    visualModifier: function(text) {
      for (var i=0; i< text.length;i++) {
        var initialAlpha = (i%2) ? 0 : 1;
        text[i].alpha = initialAlpha;
        text[i].alpha = 0;
      }
      for (var i=0; i< text.length;i++) {
        var toAlpha = 1;//(i%2) ? 1 : 0;
        //var length = 500 + 200*(i%3), delay = 200*(i%3);
        var length = 500, delay = 200*(i%3);
        game.add.tween(text[i]).to( { alpha: toAlpha }, length, Phaser.Easing.Linear.None, true, delay, -1, true);
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
  }
];

levels_blinking = [
  {
    text: "all\ntogether",//omg my\neyes
    visualModifier: function(text) {
      for (var i=0; i< text.length;i++) {
        text[i].alpha = 0;
      }
      for (var i=0; i< text.length;i++) {
        game.add.tween(text[i]).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);
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
  }
];

levels_escaping = [
/*  {
    text: ["quick\nrunaway"],
    visualModifier: functions.everyOtherOneJumpingUpAndDown
  },*/
  {
    text: ["run", "go", "fly", "race", "rush", "spurt", "pace", "sprint"],
    visualModifier: functions.everyOtherOneJumpingUpAndDown
  },
  {
    text: ["away", "leave", "flee", "quit", "exit", "move"],
    visualModifier: functions.wholeWordDiagonalAndBack
  },
  {
    text: ["game", "play", "work", "toy", "fun", "jest", "blast", "grind"],
    visualModifier: functions.everyOtherOneJumpingUpAndDown
  },
  {
    text: ["stay", "halt", "stop", "pause", "hold", "stall"],
    visualModifier: functions.wholeWordDiagonalAndBack_2
  },
  { //7 letters is too much already
    text: ["divide", "break", "split", "chop", "detach", "divide", "disjoin", "halve", "cut up"],
    letterWidth: 60,
    visualModifier: functions.diagonalSplit
  },
  {
    text: ["escaping\nescapist", "escape\nartists", "fleeing\nsafety", "fastest\nrunning", "quick\nrunaway"],
    visualModifier: functions.everyOtherOneJumpingUpAndDown
  },
  { //7 letters is too much already
    text: ["tiring", "taxing", "rough", "trying", "vexing", "sticky", "stress", "viscid", "cluing"],
    letterWidth: 60,
    visualModifier: functions.diagonalSplit
  },
  {
    text: ["dont go\nstay\nwith me", "another\nboss\nbattle"],
    visualModifier: functions.everyOtherOneJumpingUpAndDown
  }
];

//TODO: I need to make colors levels pack longer
//TODO: add sound effects
//TODO: add ending
//TODO: add infinite mode
//TODO: add scoring system - http://typefastnow.com/average-typing-speed
//TODO: add pressure
//TODO: review on killing objects
var packnum =0;
realScreensOrder = [
  { pack: levels_static_turn_not_suitable_for_intro, colors: colorCombinations.darkOrangeOnViolet},
  { pack: [levels_international_tongue_twisters[packnum++]], colors: colorCombinations.GreyOnBlack, specialProperties: {packEnding: true}},

  { pack: levels_blinking, colors: colorCombinations.darkYellowOnBlue},
  { pack: [levels_international_tongue_twisters[packnum++]], colors: colorCombinations.GreyOnBlack, specialProperties: {packEnding: true}},

  { pack: levels_colors_pack, colors: colorCombinations.GreyOnBlack},
  { pack: [levels_international_tongue_twisters[packnum++]], colors: colorCombinations.GreyOnBlack, specialProperties: {packEnding: true}},

  { pack: levels_escaping, colors: colorCombinations.lightGreenOnBlue},
  { pack: [levels_international_tongue_twisters[packnum++]], colors: colorCombinations.GreyOnBlack, specialProperties: {packEnding: true}},

  { pack: levels_turning_twisting, colors: colorCombinations.darkYellowOnDarkOrange},
  { pack: [levels_international_tongue_twisters[packnum++]], colors: colorCombinations.GreyOnBlack, specialProperties: {packEnding: true}},

  { pack: levels_numbers, colors: colorCombinations.blackOnGrey},
  { pack: [levels_international_tongue_twisters[packnum++]], colors: colorCombinations.GreyOnBlack, specialProperties: {packEnding: true}},
  //{ pack: [levels_international_tongue_twisters[packnum++]], colors: colorCombinations.GreyOnBlack, specialProperties: {packEnding: true}},
  //{ pack: [levels_international_tongue_twisters[packnum++]], colors: colorCombinations.GreyOnBlack, specialProperties: {packEnding: true}},
  //{ pack: [levels_international_tongue_twisters[packnum++]], colors: colorCombinations.GreyOnBlack, specialProperties: {packEnding: true}},
  //{ pack: [levels_international_tongue_twisters[packnum++]], colors: colorCombinations.GreyOnBlack, specialProperties: {packEnding: true}},
  //{ pack: [levels_international_tongue_twisters[packnum++]], colors: colorCombinations.GreyOnBlack, specialProperties: {packEnding: true}},
];

//  { pack: levels_international_tongue_twisters, colors: colorCombinations.GreyOnBlack},


//few normal
//then static
//then twist
//then something hard (static again)
//then blinking
testOrder = [
  { pack: experiments, colors: colorCombinations.darkYellowOnDarkOrange},
  { pack: levels_static_turn_not_suitable_for_intro, colors: colorCombinations.darkOrangeOnViolet},
  { pack: levels_escaping, colors: colorCombinations.lightGreenOnBlue},
  { pack: levels_international_tongue_twisters, colors: colorCombinations.GreyOnBlack},
  { pack: experiments, colors: colorCombinations.darkYellowOnDarkOrange},
  { pack: levels_turning_twisting, colors: colorCombinations.darkYellowOnDarkOrange},
  { pack: levels_blinking, colors: colorCombinations.darkYellowOnBlue},
  { pack: levels_colors_pack, colors: colorCombinations.GreyOnBlack},
  { pack: levels_numbers, colors: colorCombinations.blackOnGrey},
];

screensOrder = realScreensOrder;

//build that definitions thing

function buildDefinition(isRandom) {
    definition = {};
    definition.screens = [];
    definition.defaultColors = [];
    definition.specialProperties = [];

    for(j=0;j<screensOrder.length;j++) {
        definition.screens = definition.screens.concat(screensOrder[j].pack);
        console.log('* pack length: ' + screensOrder[j].pack.length);
        for(i=0;i<screensOrder[j].pack.length;i++) {
            definition.defaultColors.push(screensOrder[j].colors);
            definition.specialProperties.push(screensOrder[j].specialProperties || {});
        }
    }
    if (isRandom) {
        shuffle(definition.screens, definition.defaultColors, definition.specialProperties);
    }

}

function shuffle(array1, array2, array3) {
    var currentIndex = array1.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        swap(array1, currentIndex, randomIndex);
        swap(array2, currentIndex, randomIndex);
        swap(array3, currentIndex, randomIndex);
    }
}

function swap(array, currentIndex, randomIndex) {
    var temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
}

