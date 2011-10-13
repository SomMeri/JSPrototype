var LevelsLibrary = function () {
  this.names = new Array();
  this.levels = new Array();
  
  var smallestLevel = new Level('  11111  ',
      ' 4    .4 ',
      ' 4  @$ 4 ',
      ' 4     4 ',
      '3    $. 3',
      ' 2222222 ');


  var hugeLevel = new Level(' 11111111111111111111111111111 ',
                            ' 2                           2 ',
                            ' 2  $ 433 $  43334  $ 334 $  2 ',
                            ' 2 $ $ 334 $  333  $ 433 $ $ 2 ',
                            ' 2 4  $ 222 $  4  $ 222 $  4 2 ',
                            ' 2 33 . . . . .$. . . . . 33 2 ',
                            ' 2 334$ $ $ $ $.$ $ $ $ $433 2 ',
                            '11 .. ..... ...$... ..... .. 11',
                            '11  $ $ $ $ $  @  $ $ $ $ $  11',
                            '11 .. ..... ...$... ..... .. 11',
                            ' 2 334$ $ $ $ $.$ $ $ $ $433 2 ',
                            ' 2 33 . . . . .$. . . . . 33 2 ',
                            ' 2 4  $ 222 $  4  $ 433 $  4 2 ',
                            ' 2 $ $ 334 $  333  $ 334 $ $ 2 ',
                            ' 2  $ 433 $  43334  $ 222 $  2 ',
                            ' 2                           2 ',
                            ' 11111111111111111111111111111 ');

  var realLevel = new Level(
                            '     3333333     ',
                            '111111     222222',
                            '5  . ..$4$.. .  5',
                            '5  $ $  .  $ $  5',
                            '511$2222@3333$115',
                            '5  $ $  .  $ $  5',
                            '5  . ..$4$.. .  5',
                            '511111     333335',
                            '     2222222     ');

  var wallLessLevel = new Level(
      '           ########',
      '           #      #',
      '############      #',
      '#    #         # .#',
      '#    #$    #   # .#',
      '#          #      #',
      '#    #$    ########',
      '# @  #     #       ',
      '############       ');

  this.names.push('The Smallest');
  this.levels.push(smallestLevel);

  this.names.push('The Real One');
  this.levels.push(realLevel);

  this.names.push('Wall-Less Challenge');
  this.levels.push(wallLessLevel);

  this.names.push('The Huge');
  this.levels.push(hugeLevel);
};