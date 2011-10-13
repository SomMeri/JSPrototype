/*   Geometry for Robot          */
var RobotGeometry = function (unit) {

  THREE.Geometry.call(this);

  var scope = this, unit_half = unit / 2;
  var head_down = 12;
  
  var body_border = 5;

  var legs_skew = unit / 3;
  var legs_thickness = 7;

  //******************** head ******************************
  var width_min = - unit_half + head_down,
  width_max = unit_half - head_down,
  height_min = -unit_half + head_down + unit,
  height_max = unit_half - head_down + unit,
  depth_min = -unit_half + head_down + body_border,
  depth_max = unit_half - head_down + body_border;

  //vertices
  v( width_max, height_max, depth_min);
  v( width_max, height_min, depth_min);
  v( width_min, height_min, depth_min);
  v( width_min, height_max, depth_min);
  v( width_max, height_max, depth_max);
  v( width_max, height_min, depth_max);
  v( width_min, height_min, depth_max);
  v( width_min, height_max, depth_max);

  var faceImage = new Image();
  faceImage.src = '../textures/disturb.jpg';
  var faceTexture = new THREE.Texture( faceImage, new THREE.UVMapping());;
  var faceMaterial = new THREE.MeshBasicMaterial( { map: faceTexture, opacity: 1 } );
  var headMaterial = new THREE.MeshLambertMaterial( { color: 0x1FDFDF, opacity: 1, shading: THREE.FlatShading } );

  //faces
  f4( 0, 1, 2, 3, headMaterial );
  f4( 4, 7, 6, 5, headMaterial );
  f4( 0, 4, 5, 1, headMaterial );
  f4( 1, 5, 6, 2, headMaterial );
  f4( 2, 6, 7, 3, headMaterial );
  f4( 4, 0, 3, 7, headMaterial );
  
  //******************** body ******************************
  
  var width_min = - unit_half + 5,
  width_max = unit_half - 5,
  body_height_min = -unit_half + 5 + 15,
  body_height_max = unit_half - 5 + 15,
  depth_min = -unit_half + legs_skew + - body_border,
  depth_max = unit_half;

  //vertices
  v( width_max, body_height_max, depth_min);
  v( width_max, body_height_min, depth_min);
  v( width_min, body_height_min, depth_min);
  v( width_min, body_height_max, depth_min);
  v( width_max, body_height_max, depth_max);
  v( width_max, body_height_min, depth_max);
  v( width_min, body_height_min, depth_max);
  v( width_min, body_height_max, depth_max);

  var vo = 8, headMaterial = new THREE.MeshLambertMaterial( { color: 0x1FDFDF, opacity: 1, shading: THREE.FlatShading } );

  //faces
  f4( vo + 0, vo + 1, vo + 2, vo + 3, headMaterial );
  f4( vo + 4, vo + 7, vo + 6, vo + 5, headMaterial );
  f4( vo + 0, vo + 4, vo + 5, vo + 1, headMaterial );
  f4( vo + 1, vo + 5, vo + 6, vo + 2, headMaterial );
  f4( vo + 2, vo + 6, vo + 7, vo + 3, headMaterial );
  f4( vo + 4, vo + 0, vo + 3, vo + 7, headMaterial );
  
  //******************** legs ******************************
  var width_min = - unit_half + legs_thickness,
  width_max = unit_half - legs_thickness,
  height_min = -unit_half,
  height_max = body_height_min,
  depth_min = -unit_half,
  depth_max = unit_half;

  //vertices
  v( width_max, height_max, depth_min + legs_skew);
  v( width_max, height_min, depth_min);
  v( width_min, height_min, depth_min);
  v( width_min, height_max, depth_min + legs_skew);
  v( width_max, height_max, depth_max);
  v( width_max, height_min, depth_max);
  v( width_min, height_min, depth_max);
  v( width_min, height_max, depth_max);

  var vo = 16, headMaterial = new THREE.MeshLambertMaterial( { color: 0x80DF1F, opacity: 1, shading: THREE.FlatShading } );

  //faces
  f4( vo + 0, vo + 1, vo + 2, vo + 3, headMaterial );
  f4( vo + 4, vo + 7, vo + 6, vo + 5, headMaterial );
  f4( vo + 0, vo + 4, vo + 5, vo + 1, headMaterial );
  f4( vo + 1, vo + 5, vo + 6, vo + 2, headMaterial );
  f4( vo + 2, vo + 6, vo + 7, vo + 3, headMaterial );
  f4( vo + 4, vo + 0, vo + 3, vo + 7, headMaterial );
  
  
  //the rest
  var width_min = - unit_half,
  width_max = unit_half,
  height_min = -unit_half,
  height_max = unit_half,
  depth_min = -unit_half,
  depth_max = unit_half;

  //vertices
  v(  width_max,  height_max, depth_min );
  v(  width_max, height_min, depth_min );
  v( width_min, height_min, depth_min );
  v( width_min,  height_max, depth_min );
  v(  width_max,  height_max,  depth_max );
  v(  width_max, height_min,  depth_max );
  v( width_min, height_min,  depth_max );
  v( width_min,  height_max,  depth_max );

  var material = new THREE.MeshLambertMaterial( { color: 0x1FDFDF, opacity: 0.2, shading: THREE.FlatShading } );

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

  function f4(a, b, c, d, faceMaterial) {
    if (faceMaterial===undefined)
      faceMaterial = material;

    //scope.faces.push( new THREE.Face4( a, b, c, d, null, null, ));
    scope.faces.push( new THREE.Face4( a, b, c, d, null, null, faceMaterial));
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
  this.mesh.rotation.y += Math.PI / 2;
  
};
Robot.prototype.constructor = Robot;
Robot.prototype.getMesh = function () {
  return this.mesh;
};

