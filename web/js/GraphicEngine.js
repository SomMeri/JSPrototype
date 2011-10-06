var GraphicEngine = function() {
  this.renderer;
  this.scene;
  this.camera;
  this.ray;
  this.projector;
  this.plane;

  this.height_shift;
  this.width_shift;

  init();

  function init() {
    initCamera();
    scene = new THREE.Scene();
    projector = new THREE.Projector();
    ray = new THREE.Ray(camera.position, null);
    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

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

  function initPlane() {
    plane = new THREE.Mesh(new Plane(1000, 1000));
    plane.rotation.x = -90 * Math.PI / 180;
    scene.addObject(plane);
  }

};

GraphicEngine.prototype.constructor = GraphicEngine;

GraphicEngine.prototype.render = function() {
  renderer.render(scene, camera);
};

GraphicEngine.prototype.placeObject = function(mesh, x, y, z) {
  mesh.position.x = (x - this.height_shift) * 50 + 25;
  mesh.position.y = y * 50 + 25;
  mesh.position.z = (z - this.width_shift) * 50 + 25;
  mesh.overdraw = true;
  scene.addObject(mesh);
};

GraphicEngine.prototype.placeBoardPlane = function(mesh, x, y, z) {
  mesh.position.x = (x - this.height_shift) * 50 + 25;
  mesh.position.y = y * 50;
  mesh.position.z = (z - this.width_shift) * 50 + 25;
  mesh.overdraw = true;
  scene.addObject(mesh);
};

GraphicEngine.prototype.placeLine = function(x1, z1, x2, z2) {
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vertex(new THREE.Vector3((x1 - this.height_shift) * 50, 0, (z1 - this.width_shift) * 50)));
  geometry.vertices.push(new THREE.Vertex(new THREE.Vector3((x2 - this.height_shift) * 50, 0, (z2 - this.width_shift) * 50)));

  var linesMaterial = new THREE.LineBasicMaterial({
    color : 0x000000,
    opacity : 0.2
  });
  var line = new THREE.Line(geometry, linesMaterial);
  // line.position.z = ( i * 50 ) - 500;
  scene.addObject(line);
};

GraphicEngine.prototype.placeDestination = function(x, y, z) {
  var lineMaterial = new THREE.LineBasicMaterial({
    color : 0x000000,
    opacity : 1
  });

  var y1 = y * 50;

  var x1 = (x - this.height_shift) * 50;
  var z1 = (z - this.width_shift) * 50;

  var x2 = (x - this.height_shift) * 50 + 50;
  var z2 = (z - this.width_shift) * 50 + 50;

  this.placeDestinationSquare(x1, z1, x2, z2, y1, lineMaterial);
  //this.placeDestinationSquare(x1, z1, x2, z2, y1 + 50, lineMaterial);

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
  geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(x1, y, z1 + 50)));
  geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(x2, y, z2 - 50)));
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
  var text = new OrientationText(side, 0x7F1FDF);
  var text3D = text.get3DText();
  var add_shift = 4;

  // this.height_shift;
  // this.width_shift;
  if (side == 'Up') {
    text3D.position.x = text.getCenterOffset();
    text3D.position.y = 0;
    text3D.position.z = 50 * (-this.width_shift - add_shift);

    text3D.rotation.z = Math.PI * 2;
    text3D.rotation.x = Math.PI * 1.5;
    text3D.rotation.y = Math.PI * 2;
  }
  if (side == 'Left') {
    text3D.position.x = 50 * (-this.height_shift - add_shift);
    text3D.position.y = 0;
    text3D.position.z = -text.getCenterOffset();

    text3D.rotation.z = Math.PI * (-1.5);
    text3D.rotation.x = Math.PI * 1.5;
    text3D.rotation.y = Math.PI * 2;
  }
  if (side == 'Down') {
    text3D.position.x = -text.getCenterOffset();
    text3D.position.y = 0;
    text3D.position.z = 50 * (+this.width_shift + add_shift);

    text3D.rotation.z = Math.PI;
    text3D.rotation.x = Math.PI * 1.5;
    text3D.rotation.y = Math.PI * 2;
  }
  if (side == 'Right') {
    text3D.position.x = 50 * (+this.height_shift + add_shift);
    text3D.position.y = 0;
    text3D.position.z = +text.getCenterOffset();

    text3D.rotation.z = Math.PI * (1.5);
    text3D.rotation.x = Math.PI * 1.5;
    text3D.rotation.y = Math.PI * 2;
  }

  scene.addObject(text.mesh);
};

GraphicEngine.prototype.offsetObject = function(mesh, x, y, z) {
  var offset = new THREE.Vector3(x, y, z).multiplyScalar(50);
  mesh.position.addSelf(offset);
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
    if (object instanceof THREE.Mesh && object !== plane) {
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
