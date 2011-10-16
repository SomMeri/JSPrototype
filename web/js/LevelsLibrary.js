var LevelsLibrary = function () {
  this.names = new Array();
  this.levels = new Array();
  
  var microbanS2L1  = new Level(
  '1332  ',
  '1  2  ',
  '1  2  ',
  '1  554',
  '1.$$@4',
  '1  . 4',
  '1  333',
  '1222  ');

  var microbanS2L3 = new Level(
 '   1111',
 '2222  3',
 '3  1  3',
 '3 . . 3',
 '3 @$$ 3',
 '3 1 111',
 '3   3  ',
 '22222  ');

  var microbanS1L9  = new Level(
 '11111 ',
 '2.  22',
 '2@$$ 3',
 '11   3',
 ' 22  3',
 '  11.3',
 '   223');

  var microbanS1L1  = new Level(
  '1111  ',
  '2 .2  ',
  '2  334',
  '2x@  4',
  '2  $ 4',
  '2  555',
  '2333  ');
  
  
  var microbanS1L2  = new Level(
  '111111',
  '2    2',
  '2 3@ 2',
  '2 $x 2',
  '2 .x 2',
  '2    2',
  '111111');
  
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

  this.names.push('Microban S2 L1');
  this.levels.push(microbanS2L1);

  this.names.push('Microban S2 L2');
  this.levels.push(microbanS2L3);

  this.names.push('Microban S1 L9');
  this.levels.push(microbanS1L9);
  
  this.names.push('Invisible Walls');
  this.levels.push(wallLessLevel);

  this.names.push('Microban S1 L1');
  this.levels.push(microbanS1L1);

  this.names.push('Microban S1 L2');
  this.levels.push(microbanS1L2);
  
  this.names.push('The Real One');
  this.levels.push(realLevel);

  this.names.push('Performance Benchmark');
  this.levels.push(hugeLevel);
};