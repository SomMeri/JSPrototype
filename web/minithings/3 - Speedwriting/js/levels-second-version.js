var j, i, functions = {

  everyOtherOneJumpingUpAndDown: function(text) {
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

};

var colorCombinations = {
  darkYellowOnBlue: { text: '#fabc02', background: '#3d01a2' },
  darkOrangeOnViolet: { text: '#fb5308', background: '#a7194b' },
  lightGreenOnBlue: { text: '#cfe92b', background: '#3d01a2' },
  darkOrangeOnDarkGreen: { text: '#fb5308', background: '#009e68' },
  violetOnBlue: { text: '#a7194b', background: '#3d01a2' },
  darkYellowOnDarkOrange: { text: '#fabc02', background: '#fb5308' },
  GreyOnBlack: {text: '#000000', background:'#090909'},
  do_not_use: {}
};
var definition= {}, screensOrder, realScreensOrder, testOrder;
var levels_colors_pack, levels_international_tongue_twisters, levels_turning_twisting,
  levels_intro_and_static_turn, levels_blinking, levels_escaping;

levels_colors_pack = [{
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
        //letter.addColor('#339900', 0);
        letter.addColor('#00FF00', 0);
      }, this);
    }
  },
  {
    text: "blue",
    visualModifier: function(text) {
      text.forEach(function(letter) {
        letter.addColor('#0000FF', 0);
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
        letter.addColor('#0000FF', 0);
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
  }
];

levels_international_tongue_twisters = [{
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

levels_intro_and_static_turn = [
  {
    text: "Type\nLike\nMad"
  },
  {
    text: "type\nthis\ntoo"
  },
  {
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
      text[8].anchor.set(0.5, 0.5);
      text[8].scale.y *= -1;
      text[8].y+=4;
    }
  },
  {
    text: "all fall\nDOWN",
    visualModifier: function(text) {
      for (var i=0; i< 3;i++) {
        text[i].scale.y *= -1;
      }
      for (var i=8; i< 12;i++) {
        text[i].scale.y *= -1;
      }
    }
  },
  {
    text: "FALLING\nGROUND",
    visualModifier: function(text) {
      for (var i=0; i< text.length;i++) {
        text[i].scale.y *= -1;
      }
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
  {
    text: "escaping\nescapist",
    visualModifier: functions.everyOtherOneJumpingUpAndDown
  },
  {
    text: "escape\nartists",
    visualModifier: functions.everyOtherOneJumpingUpAndDown
  },
  {
    text: "do not go\nstay with\nme",
    visualModifier: functions.everyOtherOneJumpingUpAndDown
  },
  {
    text: "another\nboss\nbattle",
    visualModifier: functions.everyOtherOneJumpingUpAndDown
  }
];

realScreensOrder = [
  { pack: levels_intro_and_static_turn, colors: colorCombinations.darkOrangeOnViolet},
  { pack: levels_blinking, colors: colorCombinations.darkYellowOnBlue},
  { pack: levels_colors_pack, colors: colorCombinations.GreyOnBlack},
  { pack: levels_escaping, colors: colorCombinations.lightGreenOnBlue},
  { pack: levels_international_tongue_twisters, colors: colorCombinations.violetOnBlue}, // need bigger contrast
  { pack: levels_turning_twisting, colors: colorCombinations.darkYellowOnDarkOrange}
];

testOrder = [
  { pack: experiments, colors: colorCombinations.darkYellowOnDarkOrange},
  { pack: levels_turning_twisting, colors: colorCombinations.darkYellowOnDarkOrange},
  { pack: levels_blinking, colors: colorCombinations.darkYellowOnBlue},
  { pack: levels_colors_pack, colors: colorCombinations.GreyOnBlack},
  { pack: levels_intro_and_static_turn, colors: colorCombinations.darkOrangeOnViolet},
  { pack: levels_escaping, colors: colorCombinations.lightGreenOnBlue},
  { pack: levels_international_tongue_twisters, colors: colorCombinations.violetOnBlue}, // need bigger contrast
];

screensOrder = testOrder;

//build that definitions thing
definition.screens = [];
definition.defaultColors = [];
for(j=0;j<screensOrder.length;j++) {
  definition.screens = definition.screens.concat(screensOrder[j].pack);
  for(i=0;i<screensOrder[j].pack.length;i++) {
    definition.defaultColors.push(screensOrder[j].colors);
  }
}

