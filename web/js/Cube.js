var CubeGeometry = function (unit, materials, hasUp, hasDown, hasLeft, hasRight) {
  THREE.Geometry.call(this);

  var scope = this, 
  width_half = unit / 2,
  height_half = unit / 2,
  depth_half = unit / 2;

  hasUp = hasUp || true;
  hasDown = hasDown || true;
  hasLeft = hasLeft || true;
  hasRight = hasRight || true;

  if (typeof materials === "undefined") {
    materials = new Array();
    materials[0] = _material;
    materials[1] = _material;
    materials[2] = _material;
    materials[3] = _material;
    materials[4] = _material;
    materials[5] = _material;
  } else {
    
  }

  v(  width_half,  height_half, -depth_half );
  v(  width_half, -height_half, -depth_half );
  v( -width_half, -height_half, -depth_half );
  v( -width_half,  height_half, -depth_half );
  v(  width_half,  height_half,  depth_half );
  v(  width_half, -height_half,  depth_half );
  v( -width_half, -height_half,  depth_half );
  v( -width_half,  height_half,  depth_half );

  //up face
  if (hasUp)
    f4( 0, 1, 2, 3, materials[Math.floor(Math.random()*5)] );
  
  //down face
  if (hasDown)
    f4( 4, 7, 6, 5, materials[Math.floor(Math.random()*5)] );
  
  //right face
  if (hasRight)
    f4( 0, 4, 5, 1, materials[Math.floor(Math.random()*5)] );

  //  //bottom face
//  f4( 1, 5, 6, 2, dummyMaterial );
  
  //left face
  if (hasLeft)
    f4( 2, 6, 7, 3, materials[Math.floor(Math.random()*5)] );

  //top face
  f4( 4, 0, 3, 7, materials[Math.floor(Math.random()*5)] );

  function v(x, y, z) {

    scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );
  }

  function f4(a, b, c, d, material) {

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

CubeGeometry.prototype = new THREE.Geometry();
CubeGeometry.prototype.constructor = CubeGeometry;

/*  Wall itself */
var Wall = function (unit, color, material, hasUp, hasDown, hasLeft, hasRight) {
  this.geometry;
  this.mesh;
  
  hasUp = hasUp || true;
  hasDown = hasDown || true;
  hasLeft = hasLeft || true;
  hasRight = hasRight || true;

  materials = new Array();
  materials[0] = material;
  materials[1] = material;
  materials[2] = material;
  materials[3] = material;
  materials[4] = material;
  materials[5] = material;

  this.geometry = new CubeGeometry(unit, materials, hasUp, hasDown, hasLeft, hasRight);
  this.mesh = new THREE.Mesh( this.geometry, new THREE.MeshFaceMaterial());
};
Wall.prototype = new Object;
Wall.prototype.constructor = Wall;
Wall.prototype.getMesh = function () {
  return this.mesh;
};

/*  Box itself */
var Box = function (unit, color, materials) {
  this.geometry;
  this.mesh;
  
  this.geometry = new CubeGeometry(unit, materials);
  this.mesh = new THREE.Mesh( this.geometry, new THREE.MeshFaceMaterial());
};
Box.prototype.constructor = Box;
Box.prototype.getMesh = function () {
  return this.mesh;
};

var BlockGeometry = function (unit, height, width, materials) {
  THREE.Geometry.call(this);

  var scope = this, half_unit = unit / 2,
  width_max = half_unit + (height - 1)* unit,
  width_min = - half_unit,
  height_max = half_unit,
  height_min = - half_unit,
  depth_max = half_unit + (width - 1)* unit,
  depth_min = - half_unit;

  if (typeof materials === "undefined") {
    materials = new Array();
    materials[0] = _material;
    materials[1] = _material;
    materials[2] = _material;
    materials[3] = _material;
    materials[4] = _material;
    materials[5] = _material;
  } else {
    
  }

  v(  width_max,  height_max,  depth_min );
  v(  width_max,  height_min,  depth_min );
  v(  width_min,  height_min,  depth_min );
  v(  width_min,  height_max,  depth_min );
  v(  width_max,  height_max,  depth_max );
  v(  width_max,  height_min,  depth_max );
  v(  width_min,  height_min,  depth_max );
  v(  width_min,  height_max,  depth_max );

  //up face
  f4( 0, 1, 2, 3, materials[Math.floor(Math.random()*5)] );
  
  //down face
  f4( 4, 7, 6, 5, materials[Math.floor(Math.random()*5)] );
  
  //right face
  f4( 0, 4, 5, 1, materials[Math.floor(Math.random()*5)] );

  //  //bottom face
//  f4( 1, 5, 6, 2, dummyMaterial );
  
  //left face
  f4( 2, 6, 7, 3, materials[Math.floor(Math.random()*5)] );

  //top face
  f4( 4, 0, 3, 7, materials[Math.floor(Math.random()*5)] );

  function v(x, y, z) {

    scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );
  }

  function f4(a, b, c, d, material) {

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

BlockGeometry.prototype = new THREE.Geometry();
BlockGeometry.prototype.constructor = BlockGeometry;

var LongWall = function (unit, height, width, material) {
  this.geometry;
  this.mesh;
  
  materials = new Array();
  materials[0] = material;
  materials[1] = material;
  materials[2] = material;
  materials[3] = material;
  materials[4] = material;
  materials[5] = material;

  this.geometry = new BlockGeometry(unit, height, width, materials);
  this.mesh = new THREE.Mesh( this.geometry, new THREE.MeshFaceMaterial());
};
LongWall.prototype = new Object;
LongWall.prototype.constructor = LongWall;
LongWall.prototype.getMesh = function () {
  return this.mesh;
};
