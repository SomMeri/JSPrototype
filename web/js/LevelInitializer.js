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
  
  //var wallTexture = THREE.ImageUtils.loadTexture("../textures/test.PNG");
  var wallTexture = THREE.ImageUtils.loadTexture("../textures/wallPower2.PNG");
  var wallMaterial = new THREE.MeshBasicMaterial( { map: wallTexture, opacity: 1, shading: THREE.FlatShading } );
  //var wallMaterial = new THREE.MeshLambertMaterial( { color: 0x1FDFDF, opacity: 1, shading: THREE.FlatShading } );
  //var wallMaterial = new THREE.MeshNormalMaterial();
  
  var boxTexture1 = THREE.ImageUtils.loadTexture("../textures/boxtest.PNG");
  var boxMaterial1 = new THREE.MeshBasicMaterial( { map: boxTexture1, opacity: 1, shading: THREE.FlatShading } );
  var boxTexture2 = THREE.ImageUtils.loadTexture("../textures/boxtest2.JPG");
  var boxMaterial2 = new THREE.MeshBasicMaterial( { map: boxTexture2, opacity: 1, shading: THREE.FlatShading } );
  var boxTexture3 = THREE.ImageUtils.loadTexture("../textures/boxtest3.JPG");
  var boxMaterial3 = new THREE.MeshBasicMaterial( { map: boxTexture3, opacity: 1, shading: THREE.FlatShading } );
  //var boxMaterial = new THREE.MeshBasicMaterial( { color: 0x1FDFDF, opacity: 1, shading: THREE.FlatShading } );
  var materials = new Array();
  materials[0] = boxMaterial1;
  materials[1] = boxMaterial2;
  materials[2] = boxMaterial3;
  materials[3] = boxMaterial1;
  materials[4] = boxMaterial2;
  materials[5] = boxMaterial3;
//  materials[0] = boxMaterial;
//  materials[1] = boxMaterial;
//  materials[2] = boxMaterial;
//  materials[3] = boxMaterial;
//  materials[4] = boxMaterial;
//  materials[5] = boxMaterial;
  //paint objects
  for(var line = 0; line < this.height; line++) {
    for(var row = 0; row < this.width; row++) {
      if (this.level.isWall(line, row)) {
        this.createWallAdvanced(line, row, wallMaterial);
      } 
      if (this.level.isBrick(line, row)) {
        var box = new Box( graphicEngine.UNIT_SIZE, this.boxColor, materials);
        this.level.store(box, line, row);
        graphicEngine.placeObject(box.getMesh(), line, 0, row);
      } 
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

  this.createGridLines();
//  graphicEngine.placeOrientationText('Up');
//  graphicEngine.placeOrientationText('Left');
//  graphicEngine.placeOrientationText('Down');
//  graphicEngine.placeOrientationText('Right');

};

Initializer.prototype.createWallSimple = function (line, row, wallMaterial) {
  var wall = this.createPhysicalWallSimple(line, row, wallMaterial);
  this.level.store(wall, line, row);
  graphicEngine.placeObject(wall.getMesh(), line, 0, row);
  this.totalWalls = this.totalWalls +1;
};

Initializer.prototype.createWallAdvanced = function (line, row, wallMaterial) {
  var item = this.level.get(line, row);
  if (item==='#')
    return ;
  
  var top = findTop(this.level, item, line, row);
  var left = findLeft(this.level, item, line, row);
  var bottom =  findBottom(this.level, item, line, row);
  var right = findRight(this.level, item, line, row);

  //create object
  markWallAsUsed(this.level, top, left, bottom, right);
  var wall = this.createPhysicalWallAdvanced(top, left, bottom, right, wallMaterial);
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

Initializer.prototype.createPhysicalWallAdvanced = function (top, left, bottom, right, wallMaterial) {
  return new LongWall( graphicEngine.UNIT_SIZE, bottom - top, right - left, wallMaterial);
};

Initializer.prototype.createPhysicalWallSimple = function (line, row, wallMaterial) {
  var hasUp = false;
  var hasDown = false;
  var hasLeft = false;
  var hasRight = false;
  this.missedWalls = this.missedWalls +4;
  
  if (line == 0 || !this.level.isWall(line-1, row)) {
    hasUp = true;
    this.missedWalls = this.missedWalls -1;
  }

  if (row == 0 || !this.level.isWall(line, row -1)) {
    hasLeft = true;
    this.missedWalls = this.missedWalls -1;
  }

  if (line == this.height - 1 || !this.level.isWall(this.height - 1 , row)) {
    hasDown = true;
    this.missedWalls = this.missedWalls -1;
  }

  if (row == this.width - 1 || !this.level.isWall(line, this.width - 1)) {
    hasRight = true;
    this.missedWalls = this.missedWalls -1;
  }

  return new Wall( graphicEngine.UNIT_SIZE, this.wallColor, wallMaterial, hasUp, hasDown, hasLeft, hasRight);
};

Initializer.prototype.minArray = function (key, value, arr) {
  if (arr[key]>value || (typeof arr[key] === 'undefined'))
    arr[key]=value;
};

Initializer.prototype.maxArray = function (key, value, arr) {
  if (arr[key]<value || (typeof arr[key] === 'undefined'))
    arr[key]=value;
};

