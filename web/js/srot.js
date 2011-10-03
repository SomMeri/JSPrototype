      function offsetScene( x, z ) {

        var offset = new THREE.Vector3( x, 0, z ).multiplyScalar( 50 );

        for ( var i in scene.objects ) {

          object = scene.objects[ i ];

          if ( object instanceof THREE.Mesh && object !== plane && object !== brush ) {

            object.position.addSelf( offset );

          }

        }

        interact();
        render();

      }

      function onDocumentMouseWheel( event ) {
        radious -= event.wheelDeltaY;

        camera.position.x = radious * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
        camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
        camera.position.z = radious * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
        camera.updateMatrix();

        interact();
        render();

      }

