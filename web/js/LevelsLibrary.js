var LevelsLibrary = function () {
  this.names = new Array();
  this.levels = new Array();
  
  var smallestLevel = new Level('  #####  ',
      ' #    .# ',
      ' #  @$ # ',
      ' #     # ',
      '#    $. #',
      ' ####### ');


  var hugeLevel = new Level(' ############################# ',
                            ' #                           # ',
                            ' #  $ ### $  #####  $ ### $  # ',
                            ' # $ $ ### $  ###  $ ### $ $ # ',
                            ' # #  $ ### $  #  $ ### $  # # ',
                            ' # ## . . . . .$. . . . . ## # ',
                            ' # ###$ $ $ $ $.$ $ $ $ $### # ',
                            '## .. ..... ...$... ..... .. ##',
                            '##  $ $ $ $ $  @  $ $ $ $ $  ##',
                            '## .. ..... ...$... ..... .. ##',
                            ' # ###$ $ $ $ $.$ $ $ $ $### # ',
                            ' # ## . . . . .$. . . . . ## # ',
                            ' # #  $ ### $  #  $ ### $  # # ',
                            ' # $ $ ### $  ###  $ ### $ $ # ',
                            ' #  $ ### $  #####  $ ### $  # ',
                            ' #                           # ',
                            ' ############################# ');

  var realLevel = new Level(
                            '     #######     ',
                            '######     ######',
                            '#  . ..$#$.. .  #',
                            '#  $ $  .  $ $  #',
                            '###$####@####$###',
                            '#  $ $  .  $ $  #',
                            '#  . ..$#$.. .  #',
                            '######     ######',
                            '     #######     ');

  this.names.push('The Smallest');
  this.levels.push(smallestLevel);

  this.names.push('The Real One');
  this.levels.push(realLevel);

  this.names.push('The Huge');
  this.levels.push(hugeLevel);
};