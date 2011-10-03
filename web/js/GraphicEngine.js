var GraphicEngine = function ( ) {
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
    ray = new THREE.Ray( camera.position, null );
    renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    initLights();
  }

  function initCamera() {
    camera = new THREE.Camera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.x = radious * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
    camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
    camera.position.z = radious * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
    camera.target.position.y = 200;
  }

  function initLights() {
    var ambientLight = new THREE.AmbientLight( 0x404040 );
    scene.addLight( ambientLight );

    var directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.x = 1;
    directionalLight.position.y = 1;
    directionalLight.position.z = 0.75;
    directionalLight.position.normalize();
    scene.addLight( directionalLight );

    var directionalLight = new THREE.DirectionalLight( 0x808080 );
    directionalLight.position.x = - 1;
    directionalLight.position.y = 1;
    directionalLight.position.z = - 0.75;
    directionalLight.position.normalize();
    scene.addLight( directionalLight );
  }
  
  function initPlane() {
    plane = new THREE.Mesh( new Plane( 1000, 1000 ) );
    plane.rotation.x = - 90 * Math.PI / 180;
    scene.addObject( plane );
  }

};

GraphicEngine.prototype.constructor = GraphicEngine;

GraphicEngine.prototype.render = function() {
  renderer.render( scene, camera );
};

GraphicEngine.prototype.placeObject = function(mesh, x, y, z) {
  mesh.position.x = (x - this.height_shift) * 50 + 25;
  mesh.position.y = y * 50 + 25;
  mesh.position.z = (z - this.width_shift) * 50 + 25;
  mesh.overdraw = true;
  scene.addObject( mesh );
};

GraphicEngine.prototype.placeCross = function(x, y, z) {
  //TODO
  alert('unfinished method');
};

GraphicEngine.prototype.placeText = function(mesh, where) {
  //scene.addObject(mesh);
};

GraphicEngine.prototype.offsetObject = function (mesh, x, y, z ) {
  var offset = new THREE.Vector3( x, y, z ).multiplyScalar( 50 );
  mesh.position.addSelf( offset );
};

/**
 * Only one that calls also render method.
 * @param theta
 * @param phi
 */
GraphicEngine.prototype.rotateView = function (theta, phi ) {
  camera.position.x = radious * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
  camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
  camera.position.z = radious * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
  camera.updateMatrix();
  this.render();
};

GraphicEngine.prototype.clear = function() {
  var i = 0;

  while ( i < scene.objects.length ) {
    object = scene.objects[ i ];
    if ( object instanceof THREE.Mesh && object !== plane ) {
      scene.removeObject( object );
      continue;
    }

    i ++;
  }
};

GraphicEngine.prototype.setGeneralSize = function (height, width) {
  this.height_shift = Math.floor(height / 2);
  this.width_shift = Math.floor(width / 2);
};

GraphicEngine.prototype.getCamera = function () {
  return camera;
};

GraphicEngine.prototype.getRay = function () {
  return ray;
};

GraphicEngine.prototype.getProjector = function () {
  return projector;
};

GraphicEngine.prototype.getScene = function () {
  return scene;
};

GraphicEngine.prototype.getRenderer = function () {
  return renderer;
};

GraphicEngine.prototype.getPlane = function () {
  return plane;
};

