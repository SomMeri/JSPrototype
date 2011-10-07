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

  var material = new THREE.MeshLambertMaterial( { color: 0x1FDFDF, opacity: 1, shading: THREE.FlatShading } );
  
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

    //scope.faces.push( new THREE.Face4( a, b, c, d, null, null, ));
    scope.faces.push( new THREE.Face4( a, b, c, d, null, null, material));
    scope.faceVertexUvs[ 0 ].push( [
                                    new THREE.UV( 0, 0 ),
                                    new THREE.UV( 0, 1 ),
                                    new THREE.UV( 1, 1 ),
                                    new THREE.UV( 1, 0 )
                                   ] );

  }

  this.computeCentroids();
  this.computeFaceNormals();
  this.computeVertexNormals();

};
RobotGeometry.prototype = new THREE.Geometry();
RobotGeometry.prototype.constructor = RobotGeometry;

/*  Robot itself */
var Robot = function (unit, color) {
  this.geometry;
  this.mesh;
  this.meshes = new Array();
  
  this.geometry = new RobotGeometry(unit);
  this.mesh = new THREE.Mesh( this.geometry, new THREE.MeshFaceMaterial());
  this.mesh.overdraw = true;
  
};
Robot.prototype.constructor = Robot;
Robot.prototype.getMesh = function () {
  return this.mesh;
};

