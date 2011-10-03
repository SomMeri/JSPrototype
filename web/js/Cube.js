var CubeGeometry = function (unit) {

  THREE.Geometry.call(this);

  var scope = this,
  width_half = unit / 2,
  height_half = unit / 2,
  depth_half = unit / 2;

  v(  width_half,  height_half, -depth_half );
  v(  width_half, -height_half, -depth_half );
  v( -width_half, -height_half, -depth_half );
  v( -width_half,  height_half, -depth_half );
  v(  width_half,  height_half,  depth_half );
  v(  width_half, -height_half,  depth_half );
  v( -width_half, -height_half,  depth_half );
  v( -width_half,  height_half,  depth_half );

  f4( 0, 1, 2, 3 );
  f4( 4, 7, 6, 5 );
  f4( 0, 4, 5, 1 );
  f4( 1, 5, 6, 2 );
  f4( 2, 6, 7, 3 );
  f4( 4, 0, 3, 7 );

  function v(x, y, z) {

    scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );
  }

  function f4(a, b, c, d) {

    scope.faces.push( new THREE.Face4( a, b, c, d ) );
  }

  this.computeCentroids();
  this.computeNormals();

};

CubeGeometry.prototype = new THREE.Geometry();
CubeGeometry.prototype.constructor = CubeGeometry;

/*  Wall itself */
var Wall = function (unit, color) {
  this.geometry;
  this.mesh;
  
  this.geometry = new CubeGeometry(unit);
  this.mesh = new THREE.Mesh( this.geometry, new THREE.MeshColorFillMaterial( color, 1 ) );
};
Wall.prototype = new Object;
Wall.prototype.constructor = Wall;
Wall.prototype.getMesh = function () {
  return this.mesh;
};

/*  Box itself */
var Box = function (unit, color) {
  this.geometry;
  this.mesh;
  
  this.geometry = new CubeGeometry(unit);
  this.mesh = new THREE.Mesh( this.geometry, new THREE.MeshColorFillMaterial( color, 1 ) );
};
Box.prototype.constructor = Box;
Box.prototype.getMesh = function () {
  return this.mesh;
};
