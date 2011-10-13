//TODO kamera musi startovat z krajsieho uhla
//TODO NICER ENDGAME
//TODO UP DOWN LEFT TOP ON SIDES
//TODO textury
//TODO pekny robot
//TODO pocitadlo krokov
//TODO undo redo
//TODO vypinacie textury
//TODO shading

function set ()
  {
    var result = {};

    for (var i = 0; i < arguments.length; i++)
      result[arguments[i]] = true;

    return result;
};
  
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
//      if (thing != '#' && thing != '$' && thing != '.' && thing != 'x' && thing != '@' && thing != 'r') {
//        thing = ' ';
//      }
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
/**
 * Returns true if [line, row] contains a brick. Both destination \
 * brick and normal one counts.
 */
Level.prototype.isBrick = function (line, row) {
  var item = this.get(line, row);
  return '$' == item || 'x' == item;
};
/**
 * Returns true if [line, row] contains a wall. 
 */
Level.prototype.isWall = function (line, row) {
  var item = this.get(line, row);
  if (item === undefined)
    return false;
  
  return item in set('#', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0');  
};
/**
 * Returns true if [line, row] contains a robot. 
 */
Level.prototype.isRobot = function (line, row) {
  var item = this.get(line, row);
  return item == '@' || item == 'r';
};
/**
 * Returns true if [line, row] contains a destination. 
 */
Level.prototype.isDestination = function (line, row) {
  var item = this.get(line, row);
  return item == '.' || item == 'x' || item == 'r';
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

Level.prototype.allStoredObjects = function () {
  var result = new Array();
  for(var line = 0; line < this.height; line++) {
    for(var row = 0; row < this.width; row++) {
      var thing = this.obtain(line, row);
      if (!(thing === undefined) && !(thing===null)) {
        result.push(thing);
      }
    }
  }
  return result;
};

var Move = function (_lineOffset, _rowOffset, _movedBrick) {
  this.lineOffset = _lineOffset;
  this.rowOffset = _rowOffset;
  this.movedBrick = _movedBrick;
};
Move.prototype.constructor = Move;

Move.prototype.invert = function () {
  return new Move(-this.lineOffset, -this.rowOffset, this.movedBrick);
};

var MovesHistory = function (  ) {
  this.moves = new Array();
};
MovesHistory.prototype.constructor = MovesHistory;

MovesHistory.prototype.push = function (lineOffset, rowOffset, movedBrick) {
  var move = new Move(lineOffset, rowOffset, movedBrick);
  this.moves.push(move);
};

MovesHistory.prototype.stepsNumber = function () {
  return this.moves.length;
};

MovesHistory.prototype.pop = function () {
  if (this.moves.length > 0)
    return this.moves.pop();
  
  return new Move(0, 0);
};

MovesHistory.prototype.hasHistory = function () {
  return this.moves.length > 0;
};

var GameEngine = function ( _graphicEngine, _level, _updateStatsCallback ) {
  //configuration
  this.robotColor = 0x80DF1F;
  this.wallColor = 0xDF1F1F;
  this.boxColor=0x7F1FDF;
  
  //initialization
  this.graphicEngine = _graphicEngine;
  this.originalLevel = _level;
  this.endLevelGraphics = new EndLevelGraphics(graphicEngine.getRenderer());
  this.endLevelModifier = 1;
  this.level = this.originalLevel.clone();
  this.updateStatsCallback = _updateStatsCallback;
  this.robot;
  this.robotLine;
  this.robotRow;
  
  this.movesHistory;
  this.levelOver;

  this.resetLevel();
};

GameEngine.prototype.constructor = GameEngine;

GameEngine.prototype.canMove = function (lineOffset, rowOffset) {
  if (this.levelOver)
    return false;
  
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

GameEngine.prototype.stepsSoFar = function () {
  return this.movesHistory.stepsNumber();
};

GameEngine.prototype.moveBrick = function (line, row, lineOffset, rowOffset) {
  //move brick
  var brick = this.level.obtain(line, row);
  this.level.moveBrick(line, row, line + lineOffset, row + rowOffset);
  this.graphicEngine.offsetObject(brick.getMesh(), lineOffset, 0, rowOffset);
};

GameEngine.prototype.moveRobot = function (lineOffset, rowOffset) {
  var nextLine = this.robotLine + lineOffset, nextRow = this.robotRow + rowOffset;
  
  this.level.moveRobot(this.robotLine, this.robotRow, nextLine, nextRow);
  this.graphicEngine.offsetObject(this.robot.getMesh(), lineOffset, 0, rowOffset);
  this.robotLine = nextLine;
  this.robotRow = nextRow;
};

GameEngine.prototype.moveIfYouCan = function (lineOffset, rowOffset) {
  var nextLine = this.robotLine + lineOffset, nextRow = this.robotRow + rowOffset;
  if (this.canMove(lineOffset, rowOffset)) {
    var movedBrick = false;
    if (this.level.isBrick(nextLine, nextRow)) {
      this.moveBrick(nextLine, nextRow, lineOffset, rowOffset);
      movedBrick = true;
    }
    //move robot
    this.moveRobot(lineOffset, rowOffset);
    
    this.graphicEngine.render();
    this.movesHistory.push(lineOffset, rowOffset, movedBrick);
  }
  this.updateStatsCallback();
};

GameEngine.prototype.undoMove= function () {
  if (this.movesHistory.hasHistory()) {
    var move = this.movesHistory.pop().invert();
    var brickLine = this.robotLine - move.lineOffset, brickRow = this.robotRow - move.rowOffset;
    this.moveRobot(move.lineOffset, move.rowOffset);
    
    if (move.movedBrick) {
      this.moveBrick(brickLine, brickRow, move.lineOffset, move.rowOffset);
    }
    
    this.updateStatsCallback();
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
    this.levelOver = true;
    this.endLevelGraphics.initialize(this.level.allStoredObjects(), this.endLevelModifier);
    this.endLevelGraphics.perform();
    this.endLevelModifier = this.endLevelModifier * -1;
  }
};

GameEngine.prototype.resetLevel = function (_level) {
  if (!(typeof _level === 'undefined')) {
    this.originalLevel = _level;
  }
  if (this.originalLevel === 'undefined') {
    return ;
  }
  
  this.levelOver = false;
  this.level = this.originalLevel.clone();
  var initializer = new Initializer(this.graphicEngine, this.level);
  initializer.initialize();
  this.robotLine = initializer.robotLine;
  this.robotRow = initializer.robotRow;
  this.robot = initializer.robot;
  
  this.movesHistory = new MovesHistory();
  this.updateStatsCallback();
};
