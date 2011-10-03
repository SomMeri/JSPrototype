/**
 * The constructor has variable number of parameters. Each one is a string. They
 * all have to have the same size. The number of arguments must be non-zero and 
 * their length must be non-zero too.
 * 
 * # - WALL
 * $ - BRICK
 * . - DESTINATION
 * @ - ROBOT
 * anything else - nothing
 * 
 */
var Level = function () {
  this.height;
  this.width;
  this.board = new Array();
  
  this.height = arguments.length;
  this.width = arguments[0].length;
  
  for(var line = 0; line < this.height; line++) {
    this.board[line] = new Array();
    for(var row = 0; row < this.width; row++) {
      this.board[line][row] = arguments[line].charAt(row); 
    }
  }
};
Level.prototype.constructor = Wall;
Level.prototype.get = function (line, row) {
  return this.board[line][row];
};
Level.prototype.set = function (value, line, row) {
  this.board[line][row] = value;
};
Level.prototype.getHeight = function () {
  return this.height;
};
Level.prototype.getWidth = function () {
  return this.width;
};
Level.prototype.setHeight = function (value) {
  this.height = value;
};
Level.prototype.setWidth = function (value) {
  this.width = value;
};

/*  Wall itself */
var GameEngine = function ( _graphicEngine ) {
  //configuration
  var robotColor = 0x80DF1F, wallColor = 0xDF1F1F, boxColor=0x7F1FDF;
  var robot_init_x = 0, robot_init_y = 0, robot_init_z = 0;
  //var colors = [ 0xDF1F1F, 0xDFAF1F, 0x80DF1F, 0x1FDF50, 0x1FDFDF, 0x1F4FDF, 0x7F1FDF, 0xDF1FAF, 0xEFEFEF, 0x303030 ];
  
  //initialization
  this.graphicEngine = _graphicEngine;

  this.robot;
  this.wall;
  this.wall2;
  this.box;
  
  this.robot = new Robot( 50, robotColor);
  this.wall = new Wall( 50, wallColor);
  this.wall2 = new Wall( 50, wallColor);
  this.box = new Box( 50, boxColor);

  graphicEngine.placeObject(this.robot.getMesh(), robot_init_x, robot_init_y, robot_init_z);
  graphicEngine.placeObject(this.wall.getMesh(), 1, 0, 1);
  graphicEngine.placeObject(this.wall2.getMesh(), 5, 0, 5);
  graphicEngine.placeObject(this.box.getMesh(), 2, 0, 2);
};

GameEngine.prototype.constructor = GameEngine;

GameEngine.prototype.moveUp = function () {
  this.graphicEngine.offsetObject(this.robot.getMesh(), 0, 0, - 1);
};

GameEngine.prototype.moveDown = function () {
  this.graphicEngine.offsetObject(this.robot.getMesh(), 0, 0, 1);
};

GameEngine.prototype.moveLeft = function () {
  this.graphicEngine.offsetObject(this.robot.getMesh(), - 1, 0, 0);
};

GameEngine.prototype.moveRight = function () {
  this.graphicEngine.offsetObject(this.robot.getMesh(), 1, 0, 0);
};
