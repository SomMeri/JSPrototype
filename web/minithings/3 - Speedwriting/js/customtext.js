LayoutText = function (game, x, y, text, font) {
  Phaser.Text.call(this, game, x, y, text, font);
  //this.anchor.set(0.5, 0.5);
  this.layout = [];
};

LayoutText.prototype = Object.create(Phaser.Text.prototype);
LayoutText.prototype.constructor = LayoutText;

LayoutText.prototype.update = function() {

};

/**
 * Renders text. This replaces the Pixi.Text.updateText function as we need a few extra bits in here.
 *
 * @method Phaser.Text#updateText
 * @private
 */
LayoutText.prototype.updateText = function () {

  this.texture.baseTexture.resolution = this.resolution;

  this.context.font = this.style.font;

  var outputText = this.text;

  if (this.style.wordWrap)
  {
    outputText = this.runWordWrap(this.text);
  }

  //split text into lines
  var lines = outputText.split(/(?:\r\n|\r|\n)/);

  //calculate text width
  var lineWidths = [];
  var maxLineWidth = 0;
  var fontProperties = this.determineFontProperties(this.style.font);

  for (var i = 0; i < lines.length; i++)
  {
    var lineWidth = this.context.measureText(lines[i]).width;
    lineWidths[i] = lineWidth;
    maxLineWidth = Math.max(maxLineWidth, lineWidth);
  }

  var width = maxLineWidth + this.style.strokeThickness;

  this.canvas.width = width * this.resolution;

  //calculate text height
  var lineHeight = fontProperties.fontSize + this.style.strokeThickness + this._lineSpacing;

  var height = (lineHeight + this._lineSpacing) * lines.length;

  this.canvas.height = height * this.resolution;

  this.context.scale(this.resolution, this.resolution);

  if (navigator.isCocoonJS)
  {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  this.context.fillStyle = this.style.fill;
  this.context.font = this.style.font;
  this.context.strokeStyle = this.style.stroke;
  this.context.textBaseline = 'alphabetic';
  this.context.shadowOffsetX = this.style.shadowOffsetX;
  this.context.shadowOffsetY = this.style.shadowOffsetY;
  this.context.shadowColor = this.style.shadowColor;
  this.context.shadowBlur = this.style.shadowBlur;
  this.context.lineWidth = this.style.strokeThickness;
  this.context.lineCap = 'round';
  this.context.lineJoin = 'round';

  var linePositionX;
  var linePositionY;

  this._charCount = 0;

  //draw lines line by line
  for (i = 0; i < lines.length; i++)
  {
    linePositionX = this.style.strokeThickness / 2;
    linePositionY = (this.style.strokeThickness / 2 + i * lineHeight) + fontProperties.ascent;

    if (this.style.align === 'right')
    {
      linePositionX += maxLineWidth - lineWidths[i];
    }
    else if (this.style.align === 'center')
    {
      linePositionX += (maxLineWidth - lineWidths[i]) / 2;
    }

    if (true || this.colors.length > 0) //patched line to be always true
    {
      this.updateLine(lines[i], linePositionX, linePositionY);
    }
    else
    {
      if (this.style.stroke && this.style.strokeThickness)
      {
        this.context.strokeText(lines[i], linePositionX, linePositionY);
      }

      if (this.style.fill)
      {
        this.context.fillText(lines[i], linePositionX, linePositionY);
      }
    }
  }

  this.updateTexture();

};

LayoutText.prototype.updateLine = function (line, x, y) {
  for (var i = 0; i < line.length; i++)
  {
    var letter = line[i];

    if (this.colors[this._charCount])
    {
      this.context.fillStyle = this.colors[this._charCount];
      this.context.strokeStyle = this.colors[this._charCount];
    }

    if (this.style.stroke && this.style.strokeThickness)
    {
      this.context.strokeText(letter, x, y);
    }

    if (this.style.fill)
    {
      this.context.fillText(letter, x, y);
    }

    if (!this.layout)
      this.layout = [];
    this.layout.push({x:x, y:y,letter:letter});
    x += this.context.measureText(letter).width;

    this._charCount++;
  }

};

LayoutText.prototype.realWidth = function() {
  return this.context.measureText(this.text).width;
};

LayoutText.prototype.realHeight = function() {
  var fontProperties = this.determineFontProperties(this.style.font);
  return fontProperties.fontSize + this.style.strokeThickness + this._lineSpacing;
};

/* ************************************************************************************** */
ExactPositionText = function (game, x, y, text, font) {
  Phaser.Text.call(this, game, x, y, text, font);
  this.layout = [];
};

ExactPositionText.prototype = Object.create(Phaser.Text.prototype);
ExactPositionText.prototype.constructor = LayoutText;

ExactPositionText.prototype.update = function() {

};

/**
 * Renders text. This replaces the Pixi.Text.updateText function as we need a few extra bits in here.
 *
 * @method Phaser.Text#updateText
 * @private
 */
ExactPositionText.prototype.updateText = function () {

  this.texture.baseTexture.resolution = this.resolution;

  this.context.font = this.style.font;

  var outputText = this.text;

  if (this.style.wordWrap)
  {
    outputText = this.runWordWrap(this.text);
  }

  //split text into lines
  var lines = outputText.split(/(?:\r\n|\r|\n)/);

  //calculate text width
  var lineWidths = [];
  var maxLineWidth = 0;
  var fontProperties = this.determineFontProperties(this.style.font);

  for (var i = 0; i < lines.length; i++)
  {
    var lineWidth = this.context.measureText(lines[i]).width;
    lineWidths[i] = lineWidth;
    maxLineWidth = Math.max(maxLineWidth, lineWidth);
  }

  var width = maxLineWidth + this.style.strokeThickness;

  this.canvas.width = width * this.resolution;

  //calculate text height
  var lineHeight = fontProperties.fontSize + this.style.strokeThickness + this._lineSpacing;

  var height = (lineHeight + this._lineSpacing) * lines.length;

  this.canvas.height = height * this.resolution;

  this.context.scale(this.resolution, this.resolution);

  if (navigator.isCocoonJS)
  {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  this.context.fillStyle = this.style.fill;
  this.context.font = this.style.font;
  this.context.strokeStyle = this.style.stroke;
  this.context.textBaseline = 'alphabetic';
  this.context.shadowOffsetX = this.style.shadowOffsetX;
  this.context.shadowOffsetY = this.style.shadowOffsetY;
  this.context.shadowColor = this.style.shadowColor;
  this.context.shadowBlur = this.style.shadowBlur;
  this.context.lineWidth = this.style.strokeThickness;
  this.context.lineCap = 'round';
  this.context.lineJoin = 'round';

  var linePositionX;
  var linePositionY;

  this._charCount = 0;

  //draw lines line by line
  for (i = 0; i < lines.length; i++)
  {
    linePositionX = this.style.strokeThickness / 2;
    linePositionY = (this.style.strokeThickness / 2 + i * lineHeight) + fontProperties.ascent;

    if (this.style.align === 'right')
    {
      linePositionX += maxLineWidth - lineWidths[i];
    }
    else if (this.style.align === 'center')
    {
      linePositionX += (maxLineWidth - lineWidths[i]) / 2;
    }

    if (true || this.colors.length > 0) //patched line to be always true
    {
      this.updateLine(lines[i], linePositionX, linePositionY);
    }
    else
    {
      if (this.style.stroke && this.style.strokeThickness)
      {
        this.context.strokeText(lines[i], linePositionX, linePositionY);
      }

      if (this.style.fill)
      {
        this.context.fillText(lines[i], linePositionX, linePositionY);
      }
    }
  }

  this.updateTexture();

};

ExactPositionText.prototype.updateLine = function (line, x, y) {
  for (var i = 0; i < line.length; i++)
  {
    var letter = line[i];

    if (this.colors[this._charCount])
    {
      this.context.fillStyle = this.colors[this._charCount];
      this.context.strokeStyle = this.colors[this._charCount];
    }

    if (this.style.stroke && this.style.strokeThickness)
    {
      this.context.strokeText(letter, x, y);
    }

    if (this.style.fill)
    {
      this.context.fillText(letter, x, y);
    }

    x += this.context.measureText(letter).width;

    this._charCount++;
  }

};

ExactPositionText.prototype.realWidth = function() {
  return this.context.measureText(this.text).width;
};

ExactPositionText.prototype.realHeight = function() {
  var fontProperties = this.determineFontProperties(this.style.font);
  return fontProperties.fontSize + this.style.strokeThickness + this._lineSpacing;
};

/*
 var newText = new LayoutText(game, totalMaxX/2, totalMaxY/2, definition.screens[level-1].text, theme.font_1);
 //newText.fontSize = 70;
 //newText.fontWeight = 'bold';
 newText.anchor.set(0.5, 0.5);
 console.log(newText.fontWeight);
 //    game.add.existing(newText);
 newText.updateText(); */
 /*
 console.log('-------------- drawing: ' + newText.layout.length);
 for (var i=0;i<newText.layout.length; i++) {
 var letter = newText.layout[i];
 console.log('* letter: ' + letter.letter + ' x: ' + letter.x + ' y: ' + letter.y);
 //this.text[i] = game.add.text(letter.x, letter.y, letter.letter, theme.font_1);
 this.text[i] =  new ExactPositionText(game, letter.x+50, letter.y+50, letter.letter, theme.font_1);
 game.add.existing(this.text[i]);

 //this.text[i].fontSize = 70;
 //this.text[i].fontWeight = 'bold';
 this.text[i].alpha = 0;
 game.add.tween(this.text[i]).to({alpha:1}, 200).delay(i).start();
 this.group_text.add(this.text[i]);
 }*/

