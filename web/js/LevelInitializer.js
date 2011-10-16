var Initializer = function ( _graphicEngine, _level ) {
  this.graphicEngine = _graphicEngine;
  this.level = _level;

  this.height = this.level.height;
  this.width = this.level.width;
  
  this.robotLine;
  this.robotRow;
  this.robot;
  this.missedWalls = 0;
  this.totalWalls = 0;
  
};
Initializer.prototype.constructor = Initializer;
Initializer.prototype.initialize = function () {
  
  this.graphicEngine.clear();
  this.graphicEngine.setGeneralSize(this.height, this.width);
  //TODO toto cele upratat, nech tie graf veci robi graphic engine
  
  this.createGridLines();
  this.graphicEngine.render();
  this.createDestinationsAndRobot();
  this.graphicEngine.render();
  this.createBricks();
  this.graphicEngine.render();
  this.createWalls();
  this.graphicEngine.render();

};

Initializer.prototype.createWalls = function () {
  var wallImage = new Image();
  wallImage.src = '../textures/SokobanWallTexture.PNG';
  
  //paint objects
  for(var line = 0; line < this.height; line++) {
    for(var row = 0; row < this.width; row++) {
      if (this.level.isWall(line, row)) {
        this.createWallAdvanced(line, row, wallImage);
      } 
    }
  }
};

Initializer.prototype.createBricks = function () {
  var boxTexture1 = THREE.ImageUtils.loadTexture("../textures/boxtest.PNG");
  var boxMaterial1 = new THREE.MeshBasicMaterial( { map: boxTexture1, opacity: 1, shading: THREE.FlatShading } );
  var boxTexture2 = THREE.ImageUtils.loadTexture("../textures/boxtest2.JPG");
  var boxMaterial2 = new THREE.MeshBasicMaterial( { map: boxTexture2, opacity: 1, shading: THREE.FlatShading } );
  var boxTexture3 = THREE.ImageUtils.loadTexture("../textures/boxtest3.JPG");
  var boxMaterial3 = new THREE.MeshBasicMaterial( { map: boxTexture3, opacity: 1, shading: THREE.FlatShading } );

  var materials = new Array();
  materials[0] = boxMaterial1;
  materials[1] = boxMaterial2;
  materials[2] = boxMaterial3;
  materials[3] = boxMaterial1;
  materials[4] = boxMaterial2;
  materials[5] = boxMaterial3;
  
  //paint objects
  for(var line = 0; line < this.height; line++) {
    for(var row = 0; row < this.width; row++) {
      if (this.level.isBrick(line, row)) {
        var box = new Box( graphicEngine.UNIT_SIZE, this.boxColor, materials);
        this.level.store(box, line, row);
        graphicEngine.placeObject(box.getMesh(), line, 0, row);
      } 
    }
  }
};

Initializer.prototype.createDestinationsAndRobot = function () {
  for(var line = 0; line < this.height; line++) {
    for(var row = 0; row < this.width; row++) {
      if (this.level.isDestination(line, row)) {
        graphicEngine.placeDestination(line, 0, row);
      } 
      if (this.level.isRobot(line, row)) { 
        this.robot = new Robot( graphicEngine.UNIT_SIZE, this.robotColor);
        this.level.store(this.robot, line, row);
        graphicEngine.placeObject(this.robot.getMesh(), line, 0, row);
        this.robotLine = line;
        this.robotRow = row;
      }
    }
  }
};

Initializer.prototype.createWallAdvanced = function (line, row, wallImage) {
  var item = this.level.get(line, row);
  if (item==='#')
    return ;
  
  var top = findTop(this.level, item, line, row);
  var left = findLeft(this.level, item, line, row);
  var bottom =  findBottom(this.level, item, line, row);
  var right = findRight(this.level, item, line, row);

  //create object
  markWallAsUsed(this.level, top, left, bottom, right);
  var wall = this.createPhysicalWallAdvanced(top, left, bottom, right, wallImage);
  this.level.store(wall, line, row);
  graphicEngine.placeObject(wall.getMesh(), line, 0, row);
  this.totalWalls = this.totalWalls +1;
  
  function markWallAsUsed(level, top, left, bottom, right) {
    for(var line = top; line < bottom; line++) {
      for(var row = left; row < right; row++) {
        level.set('#', line, row);
      }
    }
  }

  function findTop(level, item, line, row) {
    while (line>=0 && level.get(line, row) === item) {
      line--;
    }
    
    return line + 1;
  }

  function findBottom(level, item, line, row) {
    while (line<level.height && level.get(line, row) === item) {
      line++;
    }
    
    return line;
  }

  function findLeft(level, item, line, row) {
    while (row>=0 && level.get(line, row) === item) {
      row--;
    }
    
    return row + 1;
  }

  function findRight(level, item, line, row) {
    while (row<level.width && level.get(line, row) === item) {
      row++;
    }
    
    return row;
  }

};

Initializer.prototype.createGridLines = function () {
  var vertical_lines_start = new Array();
  var vertical_lines_end = new Array();
  var horizontal_lines_start = new Array();
  var horizontal_lines_end = new Array();
  
  for(var line = 0; line < this.height; line++) {
    for(var row = 0; row < this.width; row++) {
      if (this.level.isWall(line, row)) {
        this.minArray(line, row, vertical_lines_start);
        this.maxArray(line, row, vertical_lines_end);
        this.minArray(row, line, horizontal_lines_start);
        this.maxArray(row, line, horizontal_lines_end);
      } 
    }
  }
  
  for(var line = 0; line < this.height; line++) {
    var start = vertical_lines_start[line];
    var end = vertical_lines_end[line];
    if (!(typeof start === 'undefined') && !(typeof end === 'undefined')) {
      graphicEngine.placeLine(line, start, line, end);
    }
  }
  
  for(var row = 0; row < this.width; row++) {
    var start = horizontal_lines_start[row];
    var end = horizontal_lines_end[row];
    if (!(typeof start === 'undefined') && !(typeof end === 'undefined')) {
      graphicEngine.placeLine(start, row, end, row);
    }
  }

};

Initializer.prototype.createPhysicalWallAdvanced = function (top, left, bottom, right, wallImage) {
  return new LongWall( graphicEngine.UNIT_SIZE, bottom - top, right - left, wallImage);
};

Initializer.prototype.minArray = function (key, value, arr) {
  if (arr[key]>value || (typeof arr[key] === 'undefined'))
    arr[key]=value;
};

Initializer.prototype.maxArray = function (key, value, arr) {
  if (arr[key]<value || (typeof arr[key] === 'undefined'))
    arr[key]=value;
};

