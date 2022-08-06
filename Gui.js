// TODO: get rid of this global. Scoping?
var GUI;


// Already in Math?
function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

function InitGui(puzzle) {
  GUI = new Gui(puzzle);
  return GUI
}


function Gui(puzzle) {
  this.Puzzle = puzzle;
  this.Camera = new Camera(gl.viewportWidth, gl.viewportHeight);
  // Subclass puzzle
  InitCamera(this.Camera);
  
  this.MouseX = null;
  this.MouseY = 0;
  this.MouseButton = 0;
  this.MouseDown = false;
  this.LastMouseX = null;
  this.LastMouseY = null;
  this.StartMouseX = null;
  this.StartMouseY = null;
  this.MovePair = null;
  // Animation variables
  this.Move = null;
  this.MoveStartTime = null;
  this.MovePeriod = null;
  
  this.ScreenSaverElevationDirection = 1;
  this.MoveRecord = [];
}


Gui.prototype.HandleMouseDown = function(event) {
  this.MouseButton = event.button;
  if (this.MouseButton == 1) {
    this.Camera.Animate = false;
    // Hack to stop the move quickly.
    this.MovePeriod = 500.0
  }
  this.MouseDown = true;
  this.StartMouseX = lastMouseX = event.clientX-CANVAS_OFFSET_LEFT;
  this.StartMouseY = lastMouseY = event.clientY-CANVAS_OFFSET_TOP;
  //this.LastMouseT = new Date().getTime();
} 
 
Gui.prototype.HandleMouseUp = function(event) {
  this.MouseDown = false;
}
 
Gui.prototype.HandleMouseMove = function(event) {
  if (! this.MouseDown) {
    return;
  }
  var newX = event.clientX-CANVAS_OFFSET_LEFT;
  var newY = event.clientY-CANVAS_OFFSET_TOP;
  //var newT = new Date().getTime();

  // Middle mouse button initiates a move.
  if (this.MouseButton == 1) {
    if (this.Move != null) {
      // we are in the middle of a move.
      // do not start another.
      return;
    }
    if (this.MovePair == null) {
      // Looks like [PieceSet, Piece]
      this.MovePair = this.PickPiece(newX,newY);
    }
    if (this.MovePair != null) {
      // Wait a minimum distance to avoid single pixel noise.
      var dx = newX - this.StartMouseX;
      var dy = newY - this.StartMouseY;
      if (Math.sqrt(dx*dx + dy*dy) > 100.0) {
        var move = this.ChooseMove(dx,dy,movePair[0],movePair[1]);
	console.log(move.Permutation)
        this.MoveRecord.push(move);
        this.StartMove(move, 1000.0);
        this.MovePair = null;
      }
    }
    return;
  }

  // I should make this a separate function.       
  // Mouse left button: Rotate camera. 
  var deltaX = this.LastMouseX - newX
  var deltaY = newY - this.LastMouseY;
        
  deltaX = deltaX * this.Camera.GetWidth() / gl.viewportHeight
  deltaY = deltaY * this.Camera.GetHeight() / gl.viewportHeight

  // Rotate up and down.
  this.Camera.Elevation = this.Camera.Elevation - 50*deltaY;
  if (this.Camera.Elevation > 80.0) {
    this.Camera.Elevation = 80.0;
  }
  if (this.Camera.Elevation < -80.0) {
    this.Camera.Elevation = -80.0;
  }
        
  // Rotate x around y/up axis.
  this.Camera.Rotation = this.Camera.Rotation + 50*deltaX;
  this.Camera.ComputeMatrix();

  this.LastMouseX = newX
  this.LastMouseY = newY;
  //this.LastMouseT = newT
}



//------------- Keys ---------------


Gui.prototype.HandleKeyDown = function(event) {
  this.Camera.Animate = false;
  // These were for debugging.
  if (this.Move == null && event.keyCode >= 48 && event.keyCode <= 57) {
    // digits 0-9
    var move = this.Puzzle.Moves[event.keyCode-48];
    this.MoveRecord.push(move);
    this.StartMove(move, 2000.0);
  }

  // Undo moves
  if (event.keyCode == 37 || event.keyCode == 8) {
    // Left cursor key or backspace
    if (this.Move == null && this.MoveRecord.length > 0) {
      var move = this.MoveRecord.pop();
      this.StartMove(move.Reverse, 500.0);
    }
  }
}


Gui.prototype.HandleKeyUp = function(event) {
}


Gui.prototype.DrawScene = function() {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Draw Pieces ----------------------------------
  var program = imageProgram;
  gl.useProgram(program);
  gl.uniformMatrix4fv(program.pMatrixUniform, false, this.Camera.Matrix);

  this.Puzzle.DrawPieces(program);
}
 

Gui.prototype.AnimateScreenSaver = function() {
  if (this.Move == null) {
    // Randomly select a move.
    var moveIdx = Math.floor(Math.random() * this.Puzzle.Moves.length);
    if (moveIdx < 0) { moveIdx = 0; }
    if (moveIdx >= this.Puzzle.Moves.length) { moveIdx = this.Puzzle.Moves.length - 1; }
    //moveIdx = 17;
    //moveIdx = debug.pop();
    //if (debug.length == 0) {
    //  this.Camera.Animate = false;	  
    //}
    move = this.Puzzle.Moves[moveIdx];
    // for debugging
    //console.log(moveIdx)
    //console.log(move.Permutation)
    this.MoveRecord.push(move);
    this.StartMove(move,2000);
  }
  // Lets rotate the puzzle at the same time.
  if (this.LastScreenSaverTime == null) {
    this.LastScreenSaverTime = new Date().getTime();
    return;
  }
  var currentTime = new Date().getTime();
  // For debugging
  //var currentTime = lastScreenSaverTime + 30.0;
  this.Camera.Rotation += (currentTime-this.LastScreenSaverTime)/100.0;

  // Now for some up and down motion.
  if (Math.abs(this.Camera.Elevation) > this.Camera.AnimateElevationAmplitude) {
    this.Camera.Elevation *= 0.99
  } else {      
    // Rotate a unit vector and use y value as elevation.
    // x value is hacked with screenSaverElevationDirection.
    var y = this.Camera.Elevation / this.Camera.AnimateElevationAmplitude;
    var x = Math.sqrt(1.0-(y*y)) * this.ScreenSaverElevationDirection;
    // Now rotation the vector.
    var dTheta = (this.CurrentTime-this.LastScreenSaverTime)/3000.0;
    var c = Math.cos(dTheta);
    var s = Math.sin(dTheta);
    var xNew = c*x - s*y;
    var yNew = c*y + s*x;
    if (xNew > 0) {
      this.ScreenSaverElevationDirection = 1;
    } else if (xNew < 0) {
      this.ScreenSaverElevationDirection = -1;
    } else {
      this.ScreenSaverElevationDirection = 0;
    }
    this.Camera.Elevation = this.Camera.AnimateElevationAmplitude * yNew;
  }
  this.Camera.ComputeMatrix();

  this.LastScreenSaverTime = currentTime;
}



Gui.prototype.StartMove = function(move, period) {
  this.Move = move;
  this.MoveStartTime = new Date().getTime();
  this.MovePeriod = period;
  move.Start();
}  

Gui.prototype.AnimateMove = function() {
  var elapsedTime = new Date().getTime() - this.MoveStartTime;
  if (elapsedTime > this.MovePeriod) {
    // The move is finished
    this.Move.End();
    this.Move = null;
    return;
  }
  
  // Just set the angle to render the pieces mid move.
  this.Move.Angle = this.Move.EndAngle * elapsedTime / this.MovePeriod;
  this.Move.ComputeMatrix();
}
 


// Can i make this a method and eliminate the global GUI?
function tick() {
  if (GUI.Camera.Animate) {
    GUI.AnimateScreenSaver();
  }

  if (GUI.Move) {
    GUI.AnimateMove();    
  }        
  requestAnimFrame(tick);
  GUI.DrawScene();
}
 

