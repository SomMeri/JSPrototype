//TODO kamera musi startovat z krajsieho uhla
//TODO NICER ENDGAME
//TODO UP DOWN LEFT TOP ON SIDES
//TODO textury
//TODO pekny robot
//TODO pocitadlo krokov
//TODO undo redo
//TODO vypinacie textury
//TODO shading

/**
 * The constructor has variable number of parameters. Each one is a string. They
 * all have to have the same size. The number of arguments must be non-zero and 
 * their length must be non-zero too.
 * 
 * # - WALL
 * $ - BRICK
 * . - DESTINATION
 * x - BRICK ON DESTINATION
 * @ - ROBOT
 * r - ROBOT ON DESTINATION
 * space - nothing
 * 
 */
var Level = function () {
  this.height;
  this.width;
  this.board = new Array();
  this.storage = new Array();
  
  this.height = arguments.length;
  this.width = arguments[0].length;
  
  for(var line = 0; line < this.height; line++) {
    this.board[line] = new Array();
    this.storage[line] = new Array();
    for(var row = 0; row < this.width; row++) {
      var thing = arguments[line].charAt(row);
      if (thing != '#' && thing != '$' && thing != '.' && thing != 'x' && thing != '@' && thing != 'r') {
        thing = ' ';
      }
      this.board[line][row] = thing; 
      this.storage[line][row] = null; 
    }
  }
};
Level.prototype.constructor = Level;
Level.prototype.get = function (line, row) {
  return this.board[line][row];
};
Level.prototype.set = function (value, line, row) {
  this.board[line][row] = value;
};
Level.prototype.store = function (value, line, row) {
  this.storage[line][row] = value;
};
Level.prototype.obtain = function (line, row) {
  return this.storage[line][row];
};
Level.prototype.getHeight = function () {
  return this.height;
};
Level.prototype.getWidth = function () {
  return this.width;
};
/**
 * Returns true if [line, row] contains a brick. Both destination \
 * brick and normal one counts.
 */
Level.prototype.isBrick = function (line, row) {
  return '$' == this.get(line, row) || 'x' == this.get(line, row);
};
/**
 * Returns true if [line, row] contains a wall. 
 */
Level.prototype.isWall = function (line, row) {
  return '#' == this.get(line, row);
};
/**
 * Returns true if [line, row] is either a free place or a destination.
 */
Level.prototype.isEmpty = function (line, row) {
  return ' ' == this.get(line, row) || '.' == this.get(line, row);
};
/**
 * Moves brick to an empty space. Undefined if the place is not empty or from 
 * does not contain a brick.
 */
Level.prototype.moveBrick = function (fromLine, fromRow, toLine, toRow) {
  if (' ' == this.get(toLine, toRow)) {
    this.set('$', toLine, toRow);
  } else {
    this.set('x', toLine, toRow);
  }

  if ('$' == this.get(fromLine, fromRow)) {
    this.set(' ', fromLine, fromRow);
  } else {
    this.set('.', fromLine, fromRow);
  }
  var fromObj = this.obtain(fromLine, fromRow);
  var toObj = this.obtain(toLine, toRow);
  this.store(toObj, fromLine, fromRow);
  this.store(fromObj, toLine, toRow);
};
/**
 * Moves robot to an empty space. Undefined if the place is not empty.
 */
Level.prototype.moveRobot = function (fromLine, fromRow, toLine, toRow) {
  if (' ' == this.get(toLine, toRow)) {
    this.set('@', toLine, toRow);
  } else {
    this.set('r', toLine, toRow);
  }

  if ('@' == this.get(fromLine, fromRow)) {
    this.set(' ', fromLine, fromRow);
  } else {
    this.set('.', fromLine, fromRow);
  }
  var fromObj = this.obtain(fromLine, fromRow);
  var toObj = this.obtain(toLine, toRow);
  this.store(toObj, fromLine, fromRow);
  this.store(fromObj, toLine, toRow);
};
/**
 * @returns {Number} of brickless destinations
 */
Level.prototype.bricklessDestinations = function () {
  var result = 0;
  for(var line = 0; line < this.height; line++) {
    for(var row = 0; row < this.width; row++) {
      var thing = this.get(line, row);
      if (thing=='.' || thing=='r') {
        result = result + 1;
      }
    }
  }
  return result;
};

var GameEngine = function ( _graphicEngine, _level ) {
  //configuration
  this.robotColor = 0x80DF1F;
  this.wallColor = 0xDF1F1F;
  this.boxColor=0x7F1FDF;
  //var colors = [ 0xDF1F1F, 0xDFAF1F, 0x80DF1F, 0x1FDF50, 0x1FDFDF, 0x1F4FDF, 0x7F1FDF, 0xDF1FAF, 0xEFEFEF, 0x303030 ];
  
  //initialization
  this.graphicEngine = _graphicEngine;
  this.originalLevel = _level;
  this.level = this.originalLevel.clone();
  this.robot;
  this.robotLine;
  this.robotRow;

  this.resetLevel();
};

GameEngine.prototype.constructor = GameEngine;

GameEngine.prototype.canMove = function (lineOffset, rowOffset) {
  var nextLine = this.robotLine + lineOffset, nextRow = this.robotRow + rowOffset;
  if (this.level.isEmpty(nextLine, nextRow)) {
    return true;
  }

  if (this.level.isBrick(nextLine, nextRow)) {
    var afterBrickLine = this.robotLine + 2 * lineOffset;
    var afterBrickRow = this.robotRow + 2 * rowOffset;
    if (this.level.isEmpty(afterBrickLine, afterBrickRow)) {
      return true;
    }
  }

  return false;
};

GameEngine.prototype.moveIfYouCan = function (lineOffset, rowOffset) {
  var nextLine = this.robotLine + lineOffset, nextRow = this.robotRow + rowOffset;
  if (this.canMove(lineOffset, rowOffset)) {
    if (this.level.isBrick(nextLine, nextRow)) {
      //move brick
      var brick = this.level.obtain(nextLine, nextRow);
      this.level.moveBrick(nextLine, nextRow, nextLine + lineOffset, nextRow + rowOffset);
      this.graphicEngine.offsetObject(brick.getMesh(), lineOffset, 0, rowOffset);
    }
    //move robot
    this.level.moveRobot(this.robotLine, this.robotRow, nextLine, nextRow);
    this.graphicEngine.offsetObject(this.robot.getMesh(), lineOffset, 0, rowOffset);
    this.robotLine = nextLine;
    this.robotRow = nextRow;
    this.graphicEngine.render();
  }
 
};

GameEngine.prototype.moveUp = function () {
  var lineOffset = 0;
  var rowOffset = -1;
  this.moveIfYouCan(lineOffset, rowOffset);
  this.handlePossibleEndgame();
};

GameEngine.prototype.moveDown = function () {
  var lineOffset = 0;
  var rowOffset = 1;
  this.moveIfYouCan(lineOffset, rowOffset);
  this.handlePossibleEndgame();
};

GameEngine.prototype.moveLeft = function () {
  var lineOffset = -1;
  var rowOffset = 0;
  this.moveIfYouCan(lineOffset, rowOffset);
  this.handlePossibleEndgame();
};

GameEngine.prototype.moveRight = function () {
  var lineOffset = 1;
  var rowOffset = 0;
  this.moveIfYouCan(lineOffset, rowOffset);
  this.handlePossibleEndgame();
};

GameEngine.prototype.handlePossibleEndgame = function () {
  if (0 == this.level.bricklessDestinations()) {
    //TODO do something for real
    alert('Game Done');
  }
};

GameEngine.prototype.resetLevel = function () {
  this.level = this.originalLevel.clone();
  var initializer = new Initializer(this.graphicEngine, this.level);
  initializer.initialize();
  this.robotLine = initializer.robotLine;
  this.robotRow = initializer.robotRow;
  this.robot = initializer.robot;
};
