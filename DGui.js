//GUI stuff.  Where should I put it?
var CAMERA;
var PUZZLE;


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
  mouseButton = event.button;
  if (mouseButton == 1) {
    CAMERA.Animate = false;
    // Hack to stop the move quickly.
    MOVE_PERIOD = 500.0
  }
  mouseDown = true;
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
      movePair = PickPiece(PUZZLE, newX,newY,CAMERA);
    }
    if (movePair != null) {
      // Wait a minimum distance to avoid single pixel noise.
      var dx = newX - startMouseX;
      var dy = newY - startMouseY;
      if (Math.sqrt(dx*dx + dy*dy) > 100.0) {
        var move = ChooseMove(PUZZLE,dx,dy,movePair[0],movePair[1]);
	console.log("move " + move.Id);
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
  CAMERA.Animate = false;
  // These were for debugging.
  //console.log(event.keyCode);
  if (MOVE == null && event.keyCode >= 48 && event.keyCode <= 57) {
    // digits 0-9
    //var move = PUZZLE.Moves[event.keyCode-48];
    //MOVE_RECORD.push(move);
    //startMove(move, 2000.0);
    var seq = PUZZLE.Sequences[event.keyCode-48];
    if (event.shiftKey) {
      seq = seq.Reverse;
    }
    startMove(seq, 2000.0);
    MOVE_RECORD.push(seq);
  }

  // Undo moves
  if (event.keyCode == 37 || event.keyCode == 8) {
    // Left cursor key or backspace
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

  DrawPieces(PUZZLE, program);
}
 

var lastScreenSaverTime;
var screenSaverElevationDirection = 1;

function animateScreenSaver() {
  if (MOVE == null) {
    // Randomly select a move.
    var moveIdx = Math.floor(Math.random() * PUZZLE.Moves.length);
    if (moveIdx < 0) { moveIdx = 0; }
    if (moveIdx >= PUZZLE.Moves.length) { moveIdx = PUZZLE.Moves.length - 1; }
    move = PUZZLE.Moves[moveIdx]
    MOVE_RECORD.push(move);
    startMove(move,2000);
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
  if (Math.abs(CAMERA.Elevation) > CAMERA.AnimateElevationAmplitude) {
    CAMERA.Elevation *= 0.99
  } else {      
    // Rotate a unit vector and use y value as elevation.
    // x value is hacked with screenSaverElevationDirection.
    var y = CAMERA.Elevation / CAMERA.AnimateElevationAmplitude;
    var x = Math.sqrt(1.0-(y*y)) * screenSaverElevationDirection;
    // Now rotation the vector.
    var dTheta = (currentTime-lastScreenSaverTime)/3000.0;
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
    CAMERA.Elevation = CAMERA.AnimateElevationAmplitude * yNew;
  }
  CAMERA.ComputeMatrix();

  lastScreenSaverTime = currentTime;
}


var MOVE_RECORD = [];
var MOVE;
var MOVE_START_TIME;
var MOVE_PERIOD;

function tick() {
  if (CAMERA.Animate) {
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
    console.log("of = " + PUZZLE.ObjectiveFunction())
    return;
  }
  // Partial move.
  var k = elapsedTime / MOVE_PERIOD;
  MOVE.Middle(k)
}


function DrawPieces(puzzle, program) {
  for (idx = 0; idx < puzzle.PieceSets.length; ++idx) {
    pieceSet = puzzle.PieceSets [idx];
    pieceSet.Draw(program);
  }
}

function PickPiece (puzzle, newX, newY,camera) {
  for (idx = 0; idx < puzzle.PieceSets.length; ++idx) {
    pieceSet = puzzle.PieceSets [idx];
    var piece = pieceSet.PickPiece(newX,newY,camera);
    if (piece != null) {
      return [pieceSet, piece];
    }
  }
  return null;
}

function SaveMove() {
  forward = new Sequence(MOVE_RECORD, PUZZLE);
  forward.InitReverse();
  PUZZLE.Sequences.push(forward);
}

function PrintMove() {
  idx = PUZZLE.Sequences.length - 1;
  seq = PUZZLE.Sequences[idx];
  seq.Print();
}

var RECORD_START_INDEX = 0
var RECORD_SEQUENCE = null;
function StartRecord() {
  RECORD_START_INDEX = MOVE_RECORD.length;
}

function StopRecord() {
  moves = MOVE_RECORD.slice(RECORD_START_INDEX)
  RECORD_SEQUENCE = new Sequence(moves, null)
  RECORD_SEQUENCE.InitReverse()
}

function ReverseRecord() {
  seq = RECORD_SEQUENCE.Reverse;
  startMove(seq, 2000.0);
  MOVE_RECORD.push(seq);
}

