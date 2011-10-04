var OrientationText = function(text, color) {

  this.geometry;
  this.mesh;
  this.centerOffset;
  this.text3D;

  this.geometry = new THREE.TextGeometry(text, {
    size : 80,
    height : 20,
    curveSegments : 2,
    font : "helvetiker"
  });

  this.geometry.computeBoundingBox();
  this.centerOffset = -0.5 * (this.geometry.boundingBox.x[1] - this.geometry.boundingBox.x[0]);
  // TODO choose some nice color
  var textMaterial = new THREE.MeshBasicMaterial({
    color : color,
    wireframe : false
  });
  this.text3D = new THREE.Mesh(this.geometry, textMaterial);
  this.text3D.doubleSided = false;
  
  this.text3D.position.x = this.centerOffset;
  this.text3D.position.y = 0;
  this.text3D.position.z = 50 * (- 7);

  this.text3D.rotation.z = Math.PI * 2;
  this.text3D.rotation.x = Math.PI * 1.5;
  this.text3D.rotation.y = Math.PI * 2;
  this.text3D.overdraw = true;

  this.mesh = new THREE.Object3D();
  this.mesh.addChild( this.text3D );

};
OrientationText.prototype.constructor = OrientationText;
OrientationText.prototype.getMesh = function() {
  return this.mesh;
};
OrientationText.prototype.get3DText = function() {
  return this.text3D;
};
OrientationText.prototype.getCenterOffset = function() {
  return this.centerOffset;
};
