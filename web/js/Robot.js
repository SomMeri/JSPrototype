/*   Geometry for Robot          */
var RobotGeometry = function (unit) {

  THREE.Geometry.call(this);

  var scope = this,
  width_half = unit / 2,
  height_top = (3 * unit) / 2,
  height_bottom = unit / 2,
  depth_half = unit / 2;

  //vertices
  v(  width_half,  height_top, -depth_half );
  v(  width_half, -height_bottom, -depth_half );
  v( -width_half, -height_bottom, -depth_half );
  v( -width_half,  height_top, -depth_half );
  v(  width_half,  height_top,  depth_half );
  v(  width_half, -height_bottom,  depth_half );
  v( -width_half, -height_bottom,  depth_half );
  v( -width_half,  height_top,  depth_half );

  //faces
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
RobotGeometry.prototype = new THREE.Geometry();
RobotGeometry.prototype.constructor = RobotGeometry;

/*  Robot itself */
var Robot = function (unit, color) {
  this.geometry;
  this.mesh;
  
  this.geometry = new RobotGeometry(unit);
  this.mesh = new THREE.Mesh( this.geometry, new THREE.MeshColorFillMaterial( color, 1 ) );
  this.mesh.overdraw = true;

};
Robot.prototype.constructor = Robot;
Robot.prototype.getMesh = function () {
  return this.mesh;
};

