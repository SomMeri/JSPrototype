var EndLevelGraphics = function (_renderer) {
  this.renderer = _renderer;
  this.objects;
  this.xd;
  this.yd;
  this.zd;

  this.xrd;
  this.yrd;
  this.zrd;
};
EndLevelGraphics.prototype.constructor = EndLevelGraphics;

EndLevelGraphics.prototype.initialize = function (storedObjects) {
  //orignally 20
  var MAX_SPEED = 5;
  var MAX_ROT = .1;
  
  this.objects = storedObjects;
  this.xd = new Array();
  this.yd = new Array();
  this.zd = new Array();
  this.xrd = new Array();
  this.yrd = new Array();
  this.zrd = new Array();

  for (var i=0; i< this.objects.length; i++) {
    this.xd[i] = Math.random()*MAX_SPEED*2 - MAX_SPEED ;
    this.yd[i] = Math.random()*MAX_SPEED*2 - MAX_SPEED ;
    this.zd[i] = Math.random()*MAX_SPEED*2 - MAX_SPEED ;

    this.xrd[i] = Math.random()*MAX_ROT*2 - MAX_ROT;
    this.zrd[i] = Math.random()*MAX_ROT*2 - MAX_ROT;
  }
};

EndLevelGraphics.prototype.perform = function (modifier, graphicsEndCallback) {
  var objects = this.objects, xd = this.xd, yd = this.yd, zd = this.zd, xrd = this.xrd, zrd = this.zrd;
  var callback = graphicsEndCallback;
  if (modifier===undefined)
    modifier = 1;

  var explosionTimer = window.setInterval(loop, 1000/60);
  var cleanUpTimer = window.setInterval(cleanUp, 4000);
   
  function loop(){
    for (var i=0; i< objects.length; i++) {
      objects[i].getMesh().position.x += xd[i]*modifier;
      objects[i].getMesh().position.y += yd[i]*modifier;
      objects[i].getMesh().position.z += zd[i]*modifier;

      objects[i].getMesh().rotation.x += xrd[i]*modifier;
      objects[i].getMesh().rotation.z += zrd[i]*modifier;
    }
    renderer.render(scene, camera);
  };

  function cleanUp(){
    window.clearInterval(explosionTimer);
    window.clearInterval(cleanUpTimer);
    
    if (!(callback===undefined))
      callback();
  };
};



