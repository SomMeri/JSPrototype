var Text = function (theText, _color) {
  this.geometry;
  this.mesh;
  
  this.geometry = new THREE.TextGeometry( theText, {
    size: 80,
    height: 20,
    curveSegments: 2,
    font: "helvetiker"
  });
  
  geometry.computeBoundingBox();
  this.centerOffset = -0.5 * ( geometry.boundingBox.x[ 1 ] - geometry.boundingBox.x[ 0 ] );
  //TODO choose some nice color 
  var textMaterial = new THREE.MeshBasicMaterial( { color: _color, wireframe: false } );
  var text = new THREE.Mesh( text3d, textMaterial );
  
  text.doubleSided = false;

//  text.position.x = centerOffset;
//  text.position.y = 100;
//  text.position.z = 0;
//
//  text.rotation.x = 0;
//  text.rotation.y = Math.PI * 2;
//  text.overdraw = true;
  
  mesh = new THREE.Object3D();
  mesh.addChild( text );
  
};
Text.prototype.constructor = Text;
Text.prototype.getMesh = function () {
  return this.mesh;
};
