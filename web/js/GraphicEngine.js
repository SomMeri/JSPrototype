var GraphicEngine = function(_canvasWidth, _canvasheight) {
  this.UNIT_SIZE = 50;
  this.HALF = 25;
  
  this.renderer;
  this.scene;
  this.camera;
  this.ray;
  this.projector;

  this.height_shift;
  this.width_shift;

  init(_canvasWidth, _canvasheight);

  function init(_canvasWidth, _canvasheight) {
    initCamera();
    scene = new THREE.Scene();
    projector = new THREE.Projector();
    ray = new THREE.Ray(camera.position, null);
    renderer = new THREE.CanvasRenderer();
    
    if (_canvasWidth === undefined) {
      _canvasWidth = window.innerWidth;
    }

    if (_canvasheight === undefined) {
      _canvasheight = window.innerHeight;
    }

    renderer.setSize(_canvasWidth, _canvasheight);

    initLights();
  }

  function initCamera() {
    camera = new THREE.Camera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.x = radious * Math.sin(theta * Math.PI / 360) * Math.cos(phi * Math.PI / 360);
    camera.position.y = radious * Math.sin(phi * Math.PI / 360);
    camera.position.z = radious * Math.cos(theta * Math.PI / 360) * Math.cos(phi * Math.PI / 360);
    camera.target.position.y = 200;
  }

  function initLights() {
    var ambientLight = new THREE.AmbientLight(0x404040);
    scene.addLight(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.x = 1;
    directionalLight.position.y = 1;
    directionalLight.position.z = 0.75;
    directionalLight.position.normalize();
    scene.addLight(directionalLight);

    var directionalLight = new THREE.DirectionalLight(0x808080);
    directionalLight.position.x = -1;
    directionalLight.position.y = 1;
    directionalLight.position.z = -0.75;
    directionalLight.position.normalize();
    scene.addLight(directionalLight);
  }

};

GraphicEngine.prototype.constructor = GraphicEngine;

GraphicEngine.prototype.render = function() {
  renderer.render(scene, camera);
};

GraphicEngine.prototype.placeObject = function(mesh, x, y, z, shift) {
  if (shift===undefined)
    shift = 0;
  
  mesh.position.x = (x - this.height_shift) * this.UNIT_SIZE + this.HALF + shift;
  mesh.position.y = y * this.UNIT_SIZE + this.HALF;
  mesh.position.z = (z - this.width_shift) * this.UNIT_SIZE + this.HALF + shift;
  mesh.overdraw = true;
  scene.addObject(mesh);
};

GraphicEngine.prototype.placeBoardPlane = function(mesh, x, y, z) {
  mesh.position.x = (x - this.height_shift) * this.UNIT_SIZE + this.HALF;
  mesh.position.y = y * this.UNIT_SIZE;
  mesh.position.z = (z - this.width_shift) * this.UNIT_SIZE + this.HALF;
  mesh.overdraw = true;
  scene.addObject(mesh);
};

GraphicEngine.prototype.placeLine = function(x1, z1, x2, z2) {
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vertex(new THREE.Vector3((x1 - this.height_shift) * this.UNIT_SIZE, 0, (z1 - this.width_shift) * this.UNIT_SIZE)));
  geometry.vertices.push(new THREE.Vertex(new THREE.Vector3((x2 - this.height_shift) * this.UNIT_SIZE, 0, (z2 - this.width_shift) * this.UNIT_SIZE)));

  var linesMaterial = new THREE.LineBasicMaterial({
    color : 0x000000,
    opacity : 0.2
  });
  var line = new THREE.Line(geometry, linesMaterial);
  scene.addObject(line);
};

GraphicEngine.prototype.placeDestination = function(x, y, z) {
  var lineMaterial = new THREE.LineBasicMaterial({
    color : 0x000000,
    opacity : 1
  });

  var y1 = y * this.UNIT_SIZE;

  var x1 = (x - this.height_shift) * this.UNIT_SIZE;
  var z1 = (z - this.width_shift) * this.UNIT_SIZE;

  var x2 = (x - this.height_shift + 1) * this.UNIT_SIZE;
  var z2 = (z - this.width_shift + 1) * this.UNIT_SIZE;

  this.placeDestinationSquare(x1, z1, x2, z2, y1, lineMaterial);
  this.placeDestinationCross(x1, z1, x2, z2, y1, lineMaterial);
};

GraphicEngine.prototype.placeDestinationCross = function(x1, z1, x2, z2, y, linesMaterial) {
  // cross
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(x1, y, z1)));
  geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(x2, y, z2)));
  var line = new THREE.Line(geometry, linesMaterial);
  scene.addObject(line);

  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(x1, y, z1 + this.UNIT_SIZE)));
  geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(x2, y, z2 - this.UNIT_SIZE)));
  var line = new THREE.Line(geometry, linesMaterial);
  scene.addObject(line);
};

GraphicEngine.prototype.placeDestinationSquare = function(x1, z1, x2, z2, y, linesMaterial) {
  // square
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(x1, y, z1)));
  geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(x1, y, z2)));
  var line = new THREE.Line(geometry, linesMaterial);
  scene.addObject(line);

  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(x1, y, z2)));
  geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(x2, y, z2)));
  var line = new THREE.Line(geometry, linesMaterial);
  scene.addObject(line);

  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(x2, y, z2)));
  geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(x2, y, z1)));
  var line = new THREE.Line(geometry, linesMaterial);
  scene.addObject(line);

  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(x2, y, z1)));
  geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(x1, y, z1)));
  var line = new THREE.Line(geometry, linesMaterial);
  scene.addObject(line);

};

GraphicEngine.prototype.placeOrientationText = function(side) {
  var text = new OrientationText(side, 0x7F1FDF, this.UNIT_SIZE);
  var text3D = text.get3DText();
  var add_shift = 4;

  // this.height_shift;
  // this.width_shift;
  if (side == 'Up') {
    text3D.position.x = text.getCenterOffset();
    text3D.position.y = 0;
    text3D.position.z = this.UNIT_SIZE * (-this.width_shift - add_shift);

    text3D.rotation.z = Math.PI * 2;
    text3D.rotation.x = Math.PI * 1.5;
    text3D.rotation.y = Math.PI * 2;
  }
  if (side == 'Left') {
    text3D.position.x = this.UNIT_SIZE * (-this.height_shift - add_shift);
    text3D.position.y = 0;
    text3D.position.z = -text.getCenterOffset();

    text3D.rotation.z = Math.PI * (-1.5);
    text3D.rotation.x = Math.PI * 1.5;
    text3D.rotation.y = Math.PI * 2;
  }
  if (side == 'Down') {
    text3D.position.x = -text.getCenterOffset();
    text3D.position.y = 0;
    text3D.position.z = this.UNIT_SIZE * (+this.width_shift + add_shift);

    text3D.rotation.z = Math.PI;
    text3D.rotation.x = Math.PI * 1.5;
    text3D.rotation.y = Math.PI * 2;
  }
  if (side == 'Right') {
    text3D.position.x = this.UNIT_SIZE * (+this.height_shift + add_shift);
    text3D.position.y = 0;
    text3D.position.z = +text.getCenterOffset();

    text3D.rotation.z = Math.PI * (1.5);
    text3D.rotation.x = Math.PI * 1.5;
    text3D.rotation.y = Math.PI * 2;
  }

  scene.addObject(text.mesh);
};

GraphicEngine.prototype.offsetObject = function(mesh, x, y, z) {
  var offset = new THREE.Vector3(x, y, z).multiplyScalar(this.UNIT_SIZE);
  mesh.position.addSelf(offset);
};

GraphicEngine.prototype.continuousOffsetObjects = function(meshes, x, y, z, doneCallback) {
  var offset = new THREE.Vector3(x, y, z).multiplyScalar(this.UNIT_SIZE);
  var refreshRate = 1000/240;
  var step = this.UNIT_SIZE / refreshRate;
  var modifier = new THREE.Vector3(x, y, z).multiplyScalar(step);
  
  var finalPositions = new Array();
  for (var i=0; i< meshes.length; i++) {
    var fp = meshes[i].position.clone();
    fp.addSelf(offset);
    finalPositions.push(fp);
  }
  
  //meshes[i].position.addSelf(offset);
  var movingTimer = window.setInterval(loop, refreshRate);
  var looped = 0;

  function loop(){
    looped++;
    if (movementDone()) {
      finishMovement();
      return ;
    }

    for (var i=0; i< meshes.length; i++) {
      meshes[i].position.addSelf(modifier);
    }
    renderer.render(scene, camera);
  };

  function finishMovement() {
    window.clearInterval(movingTimer);
    for (var i=0; i< meshes.length; i++) {
      meshes[i].position = finalPositions[i];
    }
    renderer.render(scene, camera);
    doneCallback();
  }
  
  function movementDone() {
    return looped >= refreshRate;
  }
};

GraphicEngine.prototype.rotateObject = function(mesh, y_rotation) {
  mesh.rotation.y = y_rotation;
};

GraphicEngine.prototype.continuosRotate = function(mesh, y_rotation, doneCallback) {
  //normalize rotations
  var round = 2*Math.PI;
  y_rotation = normalizeArc(y_rotation);
  mesh.rotation.y = normalizeArc(mesh.rotation.y);

  var difference = shortestDifference(mesh.rotation.y, y_rotation);
  var refreshRate = 1000/180;
  var modifier =  difference / refreshRate;
  
  //normalize rotations again
  if (modifier > 0 && y_rotation < mesh.rotation.y)
    y_rotation += round;

  if (modifier < 0 && y_rotation > mesh.rotation.y)
    y_rotation -= round;

  var turningTimer = window.setInterval(loop, refreshRate);

  function loop(){
    var nextRotationY = mesh.rotation.y + modifier;
    if (rotationDone(nextRotationY)) {
      window.clearInterval(turningTimer);
      mesh.rotation.y = y_rotation;
      doneCallback();
    } else {
      mesh.rotation.y = nextRotationY;
    }
    renderer.render(scene, camera);
  };

  function rotationDone(nextRotationY){
    return (modifier >=0 && y_rotation < nextRotationY) || (modifier <0 && y_rotation >= nextRotationY);
  };
  
  function normalizeArc(arc){
    while (arc >= round) {
      arc -= round;
    }

    while (arc < 0){
      arc += round;
    }
    
    return arc;
  };

  function shortestDifference(arcFrom, arcTo){
    var clock = clockwiseDifference(arcFrom, arcTo);
    var anticlock = anticlockwiseDifference(arcFrom, arcTo);
    
    if (clock < anticlock) {
      return -clock;
    }
    
    return anticlock;
  };

  function clockwiseDifference(arcFrom, arcTo){
    if (arcFrom < arcTo)
      return arcFrom + round - arcTo;

    return arcFrom - arcTo;
  };

  function anticlockwiseDifference(arcFrom, arcTo){
    if (arcFrom < arcTo)
      return arcTo - arcFrom;

    return round - arcFrom + arcTo;
  };
};

/**
 * Only one that calls also render method.
 * 
 * @param theta
 * @param phi
 */
GraphicEngine.prototype.rotateView = function(theta, phi) {
  var x = radious * Math.sin(theta * Math.PI / 360) * Math.cos(phi * Math.PI / 360);
  var y = radious * Math.sin(phi * Math.PI / 360);
  var z = radious * Math.cos(theta * Math.PI / 360) * Math.cos(phi * Math.PI / 360);
  if (y <= 0) {
    y = 1;
  }
  camera.position.x = x;
  camera.position.y = y;
  camera.position.z = z;
  camera.updateMatrix();
  this.render();
};

GraphicEngine.prototype.clear = function() {
  var i = 0;

  while (i < scene.objects.length) {
    object = scene.objects[i];
    if ((object instanceof THREE.Mesh && object !== plane) || object instanceof THREE.Line) {
      scene.removeObject(object);
      continue;
    }

    i++;
  }
};

GraphicEngine.prototype.setGeneralSize = function(height, width) {
  this.height_shift = Math.floor(height / 2);
  this.width_shift = Math.floor(width / 2);
};

GraphicEngine.prototype.getCamera = function() {
  return camera;
};

GraphicEngine.prototype.getRay = function() {
  return ray;
};

GraphicEngine.prototype.getProjector = function() {
  return projector;
};

GraphicEngine.prototype.getScene = function() {
  return scene;
};

GraphicEngine.prototype.getRenderer = function() {
  return renderer;
};

GraphicEngine.prototype.getPlane = function() {
  return plane;
};
