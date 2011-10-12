LevelObjectText = TestCase("LevelObjectText");

LevelObjectText.prototype.assertIsRobot = function(level, line, row) {
  jstestdriver.console.log('JsTestDriver', line + ': ' + row + ': |' + level.get(line, row) + '|');
  var thing=level.get(line, row);
  if (thing!='@' && thing!='r') {
    fail('Should be a robot on ' + line +', ' + row + '. It is ' + thing);
  }
};

LevelObjectText.prototype.assertIsWall = function(level, line, row) {
  jstestdriver.console.log('JsTestDriver', line + ': ' + row + ': |' + level.get(line, row) + '|');
  assertTrue('Should be a wall.', level.isWall(line, row));
  assertFalse('Should be a wall.', level.isBrick(line, row));
  assertFalse('Should be a wall.', level.isEmpty(line, row));
};

LevelObjectText.prototype.assertIsBrick = function(level, line, row) {
  jstestdriver.console.log('JsTestDriver', line + ': ' + row + ': |' + level.get(line, row) + '|');
  if (level.get(line, row)!='$' && level.get(line, row)!='x')
    fails('Brick should be $ or x.');
  assertFalse('Should be a brick.', level.isWall(line, row));
  assertTrue('Should be a brick.', level.isBrick(line, row));
  assertFalse('Should be a brick.', level.isEmpty(line, row));
};

LevelObjectText.prototype.assertIsEmpty = function(level, line, row) {
  jstestdriver.console.log('JsTestDriver', line + ': ' + row + ': |' + level.get(line, row) + '|');
  if (level.get(line, row)!=' ' && level.get(line, row)!='.')
    fails('Empty should be \' \' or \'.\'.');
  assertFalse('Should be empty.', level.isWall(line, row));
  assertFalse('Should be empty.', level.isBrick(line, row));
  assertTrue('Should be empty.', level.isEmpty(line, row));
};

LevelObjectText.prototype.assertIsDestination = function(level, line, row) {
  jstestdriver.console.log('JsTestDriver', line + ': ' + row + ': |' + level.get(line, row) + '|');
  var thing=level.get(line, row);
  if (thing!='.' && thing!='r' && thing!='x') {
    fail('Empty should be a destination.');
  }
};

LevelObjectText.prototype.testEmptyDestinations = function() {
  jstestdriver.console.log('JsTestDriver', 'testEmptyDestinations');
  var ed = new Level('  #####  ',
                     ' #    .# ',
                     ' #  @$ # ',
                     ' #     # ',
                     '#    $. #',
                     ' ####### ');
  
  //test initialization
  jstestdriver.console.log('* initialization');
  assertEquals(6, ed.height);
  assertEquals(9, ed.width);
  assertEquals(2, ed.bricklessDestinations());

  this.assertIsWall(ed, 1, 1);
  this.assertIsBrick(ed, 2, 5);
  this.assertIsEmpty(ed, 2, 6);
  
  //move bricks on an empty place
  jstestdriver.console.log('JsTestDriver', '* move bricks on an empty place');
  ed.store('brick', 2, 5);
  ed.store('empty', 1, 3);
  ed.moveBrick(2, 5, 1, 3);
  this.assertIsEmpty(ed, 2, 5);
  this.assertIsBrick(ed, 1, 3);
  
  assertEquals('empty', ed.obtain(2, 5));
  assertEquals('brick', ed.obtain(1, 3));
};

LevelObjectText.prototype.testMoveBrickOnEmptyPlace = function() {
  var ed = new Level('  #####  ',
                     ' #    .# ',
                     ' #  @$ # ',
                     ' #     # ',
                     '#    $. #',
                     ' ####### ');
  
  //test move bricks on empty place
  jstestdriver.console.log('JsTestDriver', 'test move bricks on empty place');
  ed.store('brick', 2, 5);
  ed.store('empty', 1, 3);
  ed.moveBrick(2, 5, 1, 3);
  this.assertIsEmpty(ed, 2, 5);
  this.assertIsBrick(ed, 1, 3);
  
  assertEquals('empty', ed.obtain(2, 5));
  assertEquals('brick', ed.obtain(1, 3));
  
  assertEquals(2, ed.bricklessDestinations());
  //get //set //isBrick //isWall //isEmpty //moveBrick //moveRobot //bricklessDestinations
};

LevelObjectText.prototype.testMoveBrickOnAndOffDestination = function() {
  jstestdriver.console.log('JsTestDriver', 'testMoveBrickOnAndOffDestination begin');
  var ed = new Level('  #####  ',
                     ' #    .# ',
                     ' #  @$ # ',
                     ' #     # ',
                     '#    $. #',
                     ' ####### ');
  
  //test move bricks on a destination 
  jstestdriver.console.log('JsTestDriver', 'test move bricks on a destination');
  this.assertIsDestination(ed, 1, 6);
  
  ed.store('brick', 2, 5);
  ed.store('empty', 1, 6);
  ed.moveBrick(2, 5, 1, 6);
  this.assertIsEmpty(ed, 2, 5);
  this.assertIsBrick(ed, 1, 6);
  this.assertIsDestination(ed, 1, 6);
  
  assertEquals('empty', ed.obtain(2, 5));
  assertEquals('brick', ed.obtain(1, 6));
  
  assertEquals(1, ed.bricklessDestinations());

  //move it to another destination
  jstestdriver.console.log('JsTestDriver', 'move it to another destination');
  ed.store('empty', 4, 6);
  ed.moveBrick(1, 6, 4, 6);
  this.assertIsEmpty(ed, 1, 6);
  this.assertIsBrick(ed, 4, 6);
  
  assertEquals('empty', ed.obtain(1, 6));
  assertEquals('brick', ed.obtain(4, 6));
  this.assertIsDestination(ed, 1, 6);
  this.assertIsDestination(ed, 4, 6);
  
  assertEquals(1, ed.bricklessDestinations());

  //move it back again
  jstestdriver.console.log('JsTestDriver', 'move it back again');
  ed.moveBrick(4, 6, 2, 5);
  this.assertIsEmpty(ed, 4, 6);
  this.assertIsBrick(ed, 2, 5);
  
  assertEquals('empty', ed.obtain(4, 6));
  assertEquals('brick', ed.obtain(2, 5));
  
  assertEquals(2, ed.bricklessDestinations());
  this.assertIsDestination(ed, 4, 6);

  jstestdriver.console.log('JsTestDriver', 'testMoveBrickOnAndOffDestination end');
  //get //set //isBrick //isWall //isEmpty //moveBrick //moveRobot //bricklessDestinations
};

LevelObjectText.prototype.testMoveRobotOnEmptyPlace = function() {
  var ed = new Level('  #####  ',
                     ' #    .# ',
                     ' #  $@ # ',
                     ' #     # ',
                     '#    $. #',
                     ' ####### ');
  
  //test move bricks on empty place
  jstestdriver.console.log('JsTestDriver', 'test move bricks on empty place');
  ed.store('robot', 2, 5);
  ed.store('empty', 1, 3);
  ed.moveRobot(2, 5, 1, 3);
  this.assertIsEmpty(ed, 2, 5);
  this.assertIsRobot(ed, 1, 3);
  
  assertEquals('empty', ed.obtain(2, 5));
  assertEquals('robot', ed.obtain(1, 3));
  
  assertEquals(2, ed.bricklessDestinations());
  //get //set //isBrick //isWall //isEmpty //moveBrick //moveRobot //bricklessDestinations
};

LevelObjectText.prototype.testMoveRobotOnAndOffDestination = function() {
  jstestdriver.console.log('JsTestDriver', 'testMoveRobotOnAndOffDestination begin');
  var ed = new Level('  #####  ',
                     ' #    .# ',
                     ' #  $@ # ',
                     ' #     # ',
                     '#    $. #',
                     ' ####### ');
  
  //test move bricks on a destination 
  jstestdriver.console.log('JsTestDriver', 'test move robot on a destination');
  assertEquals('brickless destinations 1', 2, ed.bricklessDestinations());
  this.assertIsDestination(ed, 1, 6);
  
  ed.store('robot', 2, 5);
  ed.store('empty', 1, 6);
  ed.moveRobot(2, 5, 1, 6);
  this.assertIsEmpty(ed, 2, 5);
  this.assertIsRobot(ed, 1, 6);
  this.assertIsDestination(ed, 1, 6);
  
  assertEquals('empty', ed.obtain(2, 5));
  assertEquals('robot', ed.obtain(1, 6));
  
  assertEquals('brickless destinations 2', 2, ed.bricklessDestinations());

  //move it to another destination
  jstestdriver.console.log('JsTestDriver', 'move it to another destination');
  ed.store('empty', 4, 6);
  ed.moveRobot(1, 6, 4, 6);
  this.assertIsEmpty(ed, 1, 6);
  this.assertIsRobot(ed, 4, 6);
  
  assertEquals('empty', ed.obtain(1, 6));
  assertEquals('robot', ed.obtain(4, 6));
  this.assertIsDestination(ed, 1, 6);
  this.assertIsDestination(ed, 4, 6);
  
  assertEquals('brickless destinations 3', 2, ed.bricklessDestinations());

  //move it back again
  jstestdriver.console.log('JsTestDriver', 'move it back again');
  ed.moveRobot(4, 6, 2, 5);
  this.assertIsEmpty(ed, 4, 6);
  this.assertIsRobot(ed, 2, 5);
  
  assertEquals('empty', ed.obtain(4, 6));
  assertEquals('robot', ed.obtain(2, 5));
  
  assertEquals(2, ed.bricklessDestinations());
  this.assertIsDestination(ed, 4, 6);

  jstestdriver.console.log('JsTestDriver', 'testMoveBrickOnAndOffDestination end');
};

