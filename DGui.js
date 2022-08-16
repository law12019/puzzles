
//GUI stuff.  Where should I put it?
var CAMERA;
var PUZZLE;
var STATE;
var ANIMATION_K = 0;
var RENDERING = false;


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
var PICKED_PIECE;
var PICKED_FACE_NORMAL;


function ComputeFaceNormal (p0, p1, p2) {
  var a = [p1[0]-p0[0], p1[1]-p0[1], p1[2]-p0[2]];
  var b = [p2[0]-p0[0], p2[1]-p0[1], p2[2]-p0[2]];
  // Cross product.
  var n = [a[1]*b[2] - a[2]*b[1],
	   a[2]*b[0] - a[0]*b[2],
	   a[0]*b[1] - a[1]*b[0]];
  var mag = Math.sqrt(n[0]*n[0] + n[1]*n[1] + n[2]*n[2]);
  n[0] = n[0] / mag;
  n[1] = n[1] / mag;
  n[2] = n[2] / mag;
  return n;
}

function ComputeCrossMagnitude(a, b) {
  // Cross product.
  var n = [a[1]*b[2] - a[2]*b[1],
	   a[2]*b[0] - a[0]*b[2],
	   a[0]*b[1] - a[1]*b[0]];
  return Math.sqrt(n[0]*n[0] + n[1]*n[1] + n[2]*n[2]);
}





// This returns the picked piece, but also sets PICKED_FACE_NORMAL.
// This is to disambiguate movesin puzzles with many faces.
// I do not want moves with the same normal as the picked face.
function PickPiece (puzzle, state, x0, y0, camera) {
  var found = false;
  var pickedPiece = null;
  var pickedPieceIdx = -1;
  //global
  triangleVertices = [];
  // Convert to view coordinates.
  x0 = (2.0* x0 / camera.ViewportWidth) - 1.0;
  y0 = 1.0 - (2.0* y0 / camera.ViewportWidth);
  // Loop through the pieces
  for (var i = 0; i < puzzle.Pieces.length && ! found; ++i) {
    var piece = puzzle.Pieces[i];
    var matrix = puzzle.GetPieceMatrix(piece, state);
    var model = piece.Model;  
    // Loop through the visible triangles.
    for (var j = 0; j < model.OutTriangles.length && ! found; ++j) {
      // Get the points for this triangle.
      var pId0 = 3 * model.OutTriangles[j*3];
      var pId1 = 3 * model.OutTriangles[j*3+1];
      var pId2 = 3 * model.OutTriangles[j*3+2];
      var p0=[model.Points[pId0],model.Points[pId0+1],
              model.Points[pId0+2],1];
      var p1=[model.Points[pId1],model.Points[pId1+1],
              model.Points[pId1+2],1];
      var p2=[model.Points[pId2],model.Points[pId2+1],
              model.Points[pId2+2],1];
      // Convert from solved to state coordinates
      mat4.multiplyVec4(matrix,p0);
      mat4.multiplyVec4(matrix,p1);
      mat4.multiplyVec4(matrix,p2);
      //Convert to view coordinates
      var v0 = [];
      var v1 = [];
      var v2 = [];
      mat4.multiplyVec4(camera.Matrix,p0,v0);
      mat4.multiplyVec4(camera.Matrix,p1,v1);
      mat4.multiplyVec4(camera.Matrix,p2,v2);
      // Get rid of homogenous coordinate.
      for (var k = 0; k < 3; ++k) {
	v0[k] /= v0[3];
	v1[k] /= v1[3];
	v2[k] /= v2[3];
      }
      // See if the point is in the triangle.
      // Only worry about the front face / right handed loop.
      if (CheckPointToEdge(x0,y0,v0,v1) &&
	  CheckPointToEdge(x0,y0,v1,v2) &&
	  CheckPointToEdge(x0,y0,v2,v0)) {
	// This face intersects.
	found = true;
	pickedPiece = piece;
	pickedPieceIdx = i;
	// Choose move can do this evaluation in either state or view coordinates.
	PICKED_FACE_NORMAL = ComputeFaceNormal(p0,p1,p2);
	// For debugging
        //triangleVertices.push(p0[0]*1.001);
	//triangleVertices.push(p0[1]*1.001);
	//triangleVertices.push(p0[2]*1.001);
	//triangleVertices.push(p1[0]*1.001);
	//triangleVertices.push(p1[1]*1.001);
	//triangleVertices.push(p1[2]*1.001);
	//triangleVertices.push(p2[0]*1.001);
	//triangleVertices.push(p2[1]*1.001);
	//triangleVertices.push(p2[2]*1.001);
      }
    }
  }

  return pickedPiece;
}







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
    if (PICKED_PIECE == null) {
      PICKED_PIECE = PickPiece(PUZZLE, STATE, newX,newY,CAMERA);
    }
    if (PICKED_PIECE != null) {
      // Wait a minimum distance to avoid single pixel noise.
      var dx = newX - startMouseX;
      var dy = newY - startMouseY;
      if (Math.sqrt(dx*dx + dy*dy) > 100.0) {
        var move = ChooseMove(PUZZLE, STATE, dx, dy, PICKED_PIECE, PICKED_FACE_NORMAL);
	PICKED_PIECE = null;
	//console.log("move " + move.Id);
        MOVE_RECORD.push(move);
        startMove(move, 1000.0);
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

  eventuallyRender();
}



//------------- Keys ---------------


function handleKeyDown(event) {
  CAMERA.Animate = false;
  // These were for debugging.
  //console.log(event.keyCode);
  if (MOVE == null && event.keyCode >= 48 && event.keyCode <= 57) {
    // digits 0-9
    var idx = event.keyCode-48;
    console.log("debug " + idx);
    //var move = PUZZLE.Moves[idx];
    var move = PUZZLE.Sequences[idx];
    //STATE = move.Apply(STATE);
    startMove(move, 2000.0);
    MOVE_RECORD.push(move);

    //var seq = PUZZLE.Sequences[event.keyCode-48];
    //if (event.shiftKey) {
    //  seq = seq.Reverse;
    //}
    //startMove(seq, 2000.0);
    //MOVE_RECORD.push(seq);
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


function eventuallyRender() {
  if (RENDERING) {
    return;
  }
  RENDERING = true;
  requestAnimFrame(tick);
}


function drawScene() {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Draw Pieces ----------------------------------
  var program = imageProgram;
  gl.useProgram(program);
  gl.uniformMatrix4fv(program.pMatrixUniform, false, CAMERA.Matrix);

  var move = MOVE;
  var k = ANIMATION_K;
  var state = STATE;
  var puzzle = PUZZLE;
  var pieceIdx, peice, positionIdx;
  if (move != null) {
    move.ComputePieceAnimationMatricies(puzzle, state, k)
  }
  for (pieceIdx = 0; pieceIdx < puzzle.Pieces.length; ++pieceIdx) {
    piece = puzzle.Pieces[pieceIdx];
    positionIdx = state[pieceIdx];
    if (move != null) {
      piece.Draw(program, piece.AnimationMatrix);
    } else {
      piece.Draw(program, puzzle.Matricies[positionIdx]);
    }
  }

  RENDERING = false;
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
  //console.log('tick')
  if (CAMERA.Animate) {
    animateScreenSaver();
  }
  
  if (MOVE) {
    animateMove();
    requestAnimFrame(tick);
  }        
  drawScene();
}
 

function startMove(move, period) {
  MOVE = move;
  MOVE_START_TIME = new Date().getTime();
  MOVE_PERIOD = period;
  ANIMATION_K = 0;
  requestAnimFrame(tick);
}  

function animateMove() {
  var elapsedTime = new Date().getTime() - MOVE_START_TIME;
  if (elapsedTime > MOVE_PERIOD) {
    // The move is finished
    STATE = MOVE.Apply(STATE);
    MOVE = null;
    console.log("of = " + PUZZLE.ObjectiveFunction(STATE))
    return;
  }
  // Partial move.
  ANIMATION_K = elapsedTime / MOVE_PERIOD;
}



function StartSequence() {
  MOVE_RECORD = [];
}

function PrintSequence() {
  var seq = new Sequence(MOVE_RECORD, PUZZLE);
  seq.PrintMoves();
}



var MACRO_START = 0;
var MACRO_SEQUENCE = null;
function StartMacro() {
  MACRO_START = MOVE_RECORD.length;
}

function StopMacro() {
  var macro_moves = MOVE_RECORD.slice(MACRO_START);
  MACRO_SEQUENCE = new Sequence(macro_moves, PUZZLE)
  MACRO_SEQUENCE.InitReverse(PUZZLE)
}

function ReverseMacro() {
  seq = MACRO_SEQUENCE.Reverse;
  startMove(seq, 2000.0);
  MOVE_RECORD.push(seq);
}






function PopLowest(queue) {
  return queue.pop();
}


function SolvePuzzle() {
  var maxDepth = 3;
  var bestNode = null;
  var bestError = 100000;
  var bestCost = 0;
  // Number of moves to get to this state.
  var newCost, cost = 0
  // [leafState, depth, move, parent, error, cost]
  var node = [STATE, 0, null, null, bestError, cost];
  var queue = [node];
  var state, depth, move, idx, newMove, newState, newDepth, newError, newNode;
  
  while (queue.length > 0) {
    node = PopLowest(queue);
    state = node[0];
    depth = node[1];
    move = node[2];
    cost = node[5];
    for (idx = 0; idx < PUZZLE.Moves.length; ++idx) {
      newMove = PUZZLE.Moves[idx];
      if (move != null && newMove == move.Reverse) {
	continue;
      }
      newState = newMove.Apply(state);
      newDepth = depth + 1;
      newCost = cost + 1;
      newError = PUZZLE.ObjectiveFunction(newState);
      newNode = [newState, newDepth, newMove, node, newError, newCost];
      if (newError < bestError) {
	bestError = newError;
	bestNode = newNode;
	bestCost = newCost;
      } else if ((newError == bestError) && newCost < bestCost) {
	bestError = newError;
	bestNode = newNode;
	bestCost = newCost;
      }
      if (depth < maxDepth) {
	queue.push(newNode);
      }
    }
    for (idx = 0; idx < PUZZLE.Sequences.length; ++idx) {
      newMove = PUZZLE.Sequences[idx];
      if (move != null && newMove == move.Reverse) {
	continue;
      }
      newState = newMove.Apply(state);
      newDepth = depth + 1;
      newCost = cost + newMove.GetLength();
      newError = PUZZLE.ObjectiveFunction(newState);
      newNode = [newState, newDepth, newMove, node, newError, newCost];
      if (newError < bestError) {
	bestError = newError;
	bestNode = newNode;
	bestCost = newCost;
      } else if ((newError == bestError) && newCost < bestCost) {
	bestError = newError;
	bestNode = newNode;
	bestCost = newCost;
      }
      if (depth < maxDepth) {
	queue.push(newNode);
      }
    }
  }
  console.log("forecast of: " + bestNode[4]);
  // First the first move to make.
  var firstMove;
  while (bestNode != null) {
    move = bestNode[2];
    if (move != null) {
      console.log(move.Print() + " : " + bestNode[4] + " : " + bestNode[0]);
      firstMove = move;
    }
    bestNode = bestNode[3]; // parent
  }
  startMove(firstMove, 2000.0);
  MOVE_RECORD.push(firstMove);
}

