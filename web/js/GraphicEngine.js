var GraphicEngine = function ( ) {
  this.renderer;
  this.scene;
  this.camera;
  this.ray;
  this.projector;
  this.plane;
  
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
  mesh.position.x = x * 50 + 25;
  mesh.position.y = y * 50 + 25;
  mesh.position.z = z * 50 + 25;
  mesh.overdraw = true;
  scene.addObject( mesh );
  this.render();
};

GraphicEngine.prototype.offsetObject = function (mesh, x, y, z ) {
  var offset = new THREE.Vector3( x, y, z ).multiplyScalar( 50 );
  mesh.position.addSelf( offset );
  //TODO ???
  //interact();
  this.render();
};

GraphicEngine.prototype.rotateView = function (theta, phi ) {
  camera.position.x = radious * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
  camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
  camera.position.z = radious * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
  camera.updateMatrix();
  this.render();
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