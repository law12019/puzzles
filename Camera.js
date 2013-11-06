function Camera (viewportWidth, viewportHeight) {
    this.ViewPlaneNormal = [-1,-1,2];
    this.Up = [1,1,1];
    this.Right = [1,-1,0];

    this.Elevation = 0;
    this.Rotation = 0;
    this.Matrix = mat4.create();
    this.ViewportWidth = viewportWidth;
    this.ViewportHeight = viewportHeight;
    this.Height = 4;
    this.ComputeMatrix();
}

Camera.prototype.SetRotation = function (theta) {
    this.Rotation = theta;
    this.ComputeMatrix();
}

Camera.prototype.SetElevation = function (theta) {
    this.Elevation = theta;
    this.ComputeMatrix();
}

Camera.prototype.GetHeight = function () {
    return this.Height;
}

Camera.prototype.GetWidth = function () {
    return this.Height * this.ViewportWidth / this.ViewportHeight;
}

Camera.prototype.ComputeMatrix = function () {
    // Use cross product to compute a right vector.
    var vpn = [];
    var up = [];
    var right = [];
    vec3.normalize(this.ViewPlaneNormal, vpn);
    vec3.normalize(this.Up, up);
    vec3.normalize(this.Right, right);
    var matrix = mat4.create();
    mat4.identity(matrix);
    RotateMatrix(matrix, up[0],up[1],up[2], this.Rotation);
    RotateMatrix(matrix, right[0],right[1],right[2], this.Elevation); 
    // Apply the rotation matrix to the basis.
    mat4.multiplyVec3(matrix,up);
    mat4.multiplyVec3(matrix,right);
    mat4.multiplyVec3(matrix,vpn);

    mat4.identity(this.Matrix);
    this.Matrix[0] = right[0];
    this.Matrix[4] = right[1];
    this.Matrix[8] = right[2];
    this.Matrix[1] = up[0];
    this.Matrix[5] = up[1];
    this.Matrix[9] = up[2];
    // Funny.  z depth buffer is positive into the image.
    // This is a left handed coordinate system.
    this.Matrix[2] = -vpn[0];
    this.Matrix[6] = -vpn[1];
    this.Matrix[10] = -vpn[2];
    this.Matrix[15] = this.GetHeight() * 0.8;
    // Perspective.
    var k = 0.1;
    this.Matrix[3] += k*this.Matrix[2];
    this.Matrix[7] += k*this.Matrix[6];
    this.Matrix[11] += k*this.Matrix[10];
    this.Matrix[15] += k*this.Matrix[14];
}



//GUI stuff.  Where should I put it?
    var CAMERA;
 
    function degToRad(degrees) {
        return degrees * Math.PI / 180;
    }
 
    var MOUSE_X;
    var MOUSE_Y;
    var mouseButton = 0;
    var mouseDown = false;
    var lastMouseX;
    var lastMouseY;
    var startMouseX;
    var startMouseY;
    var movePair;
 
    function handleMouseDown(event) {
        mouseDown = true;
        mouseButton = event.button;
        startMouseX = lastMouseX = event.clientX-CANVAS_OFFSET_LEFT;
        startMouseY = lastMouseY = event.clientY-CANVAS_OFFSET_TOP;
        //lastMouseT = new Date().getTime();
    } 
 
    function handleMouseUp(event) {
        mouseDown = false;
    }
 
    function handleMouseMove(event) {
        if (!mouseDown) {
            return;
        }
        var newX = event.clientX-CANVAS_OFFSET_LEFT;
        var newY = event.clientY-CANVAS_OFFSET_TOP;
        //var newT = new Date().getTime();

        // Middle mouse button initiates a move.
        if (mouseButton == 1) {
          if (MOVE != null) {
            // we are in the middle of a move.
            // do not start another.
            return;
            }
          if (movePair == null) {
            movePair = PickPiece(newX,newY,CAMERA);
          }
          if (movePair != null) {
            // Wait a minimum distance to avoid single pixel noise.
            var dx = newX - startMouseX;
            var dy = newY - startMouseY;
            if (Math.sqrt(dx*dx + dy*dy) > 100.0) {
              var move = ChooseMove(dx,dy,movePair[0],movePair[1]);
              MOVE_RECORD.push(move);
              startMove(move, 1000.0);
              movePair = null;
            }
          }
          return;
        }

        // I should make this a separate function.       
        // Mouse left button: Rotate camera. 
        var deltaX = lastMouseX - newX
        var deltaY = newY - lastMouseY;
        
        deltaX = deltaX * CAMERA.GetWidth() / gl.viewportHeight
        deltaY = deltaY * CAMERA.GetHeight() / gl.viewportHeight

        // Rotate up and down.
        CAMERA.Elevation = CAMERA.Elevation - 50*deltaY;
        if (CAMERA.Elevation > 80.0) {
          CAMERA.Elevation = 80.0;
        }
        if (CAMERA.Elevation < -80.0) {
          CAMERA.Elevation = -80.0;
        }
        
        // Rotate x around y/up axis.
        CAMERA.Rotation = CAMERA.Rotation + 50*deltaX;
        CAMERA.ComputeMatrix();

        lastMouseX = newX
        lastMouseY = newY;
        //lastMouseT = newT
    }



//------------- Keys ---------------


    function handleKeyDown(event) {
	// These were for debugging.
        if (MOVE == null && event.keyCode >= 48 && event.keyCode <= 57) {
          // digits 0-9
          var move = MOVES[event.keyCode-48];
          MOVE_RECORD.push(move);
          startMove(move, 2000.0);
        }

        // Undo moves
        if (event.keyCode == 37) {
          // Left cursor key
	  if (MOVE == null && MOVE_RECORD.length > 0) {
            var move = MOVE_RECORD.pop();
            startMove(move.Reverse, 500.0);
          }
        }
    }

    function handleKeyUp(event) {
    }


    function drawScene() {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Draw Pieces ----------------------------------
        var program = imageProgram;
        gl.useProgram(program);
        gl.uniformMatrix4fv(program.pMatrixUniform, false, CAMERA.Matrix);

	DrawPieces(program);
    }
 

    var lastScreenSaverTime;
    var screenSaverElevationDirection = 1;

    // There is a bug.  When the puzzle is elevated past 30 degrees
    // when the animation starts, the state goes haywire.
    function animateScreenSaver() {
      if (MOVE == null) {
        // Randomly select a move.
        var moveIdx = Math.floor(Math.random() * MOVES.length);
        if (moveIdx < 0) { moveIdx = 0; }
        if (moveIdx >= MOVES.length) { moveIdx = MOVES.length - 1; }
        startMove(MOVES[moveIdx],2000);
      }
      // Lets rotate the puzzle at the same time.
      if (lastScreenSaverTime == null) {
        lastScreenSaverTime = new Date().getTime();
        return;
      }
      var currentTime = new Date().getTime();
      // For debugging
      //var currentTime = lastScreenSaverTime + 30.0;
      CAMERA.Rotation += (currentTime-lastScreenSaverTime)/100.0;

      // Now for some up and down motion.
      var y = CAMERA.Elevation / 30.0;
      var x = Math.sqrt(1.0-(y*y)) * screenSaverElevationDirection;
      // Now rotation the vector.
      var dTheta = (currentTime-lastScreenSaverTime)/2000.0;
      var c = Math.cos(dTheta);
      var s = Math.sin(dTheta);
      var xNew = c*x - s*y;
      var yNew = c*y + s*x;
      if (xNew > 0) {
        screenSaverElevationDirection = 1;
      } else if (xNew < 0) {
        screenSaverElevationDirection = -1;
      } else {
        screenSaverElevationDirection = 0;
      }
      CAMERA.Elevation = 30.0 * yNew;
      CAMERA.ComputeMatrix();

      lastScreenSaverTime = currentTime;
    }


    var MOVE_RECORD = [];
    var MOVE;
    var MOVE_START_TIME;
    var MOVE_PERIOD;

    function tick() {
        if (document.getElementById("rotate").checked) {
          animateScreenSaver();
        }

        if (MOVE) {
          animateMove();    
        }        
        requestAnimFrame(tick);
        drawScene();
    }
 

    function startMove(move, period) {
        MOVE = move;
        MOVE_START_TIME = new Date().getTime();
        MOVE_PERIOD = period;
        move.Start();
    }  

    function animateMove() { 
        var elapsedTime = new Date().getTime() - MOVE_START_TIME;
        if (elapsedTime > MOVE_PERIOD) {
          // The move is finished
          MOVE.End();
          MOVE = null;
          return;
        }
	    
      // Just set the angle to render the pieces mid move.
      MOVE.Angle = MOVE.EndAngle * elapsedTime / MOVE_PERIOD;
      MOVE.ComputeMatrix();
    }
 
