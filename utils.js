
function ScaleVector(scalar,vector) {
  return vector.map(function(x) { return x * scalar; });
}

function SumVectors(vectors) {
  var idx, v;
  result = [...vectors[0]];
  for (idx = 1; idx < vectors.length; ++idx) {
    v = vectors[idx];
    result[0] += v[0];
    result[1] += v[1];
    result[2] += v[2];
  }
  return result;
}

// mOut is modified
function CopyMatrix(mIn, mOut) {
  for (var idx=0; idx < 16; ++idx) {
    mOut[idx] = mIn[idx];
  }
}

// mOut is modified
function CopyMatrix(mIn, mOut) {
  for (var idx=0; idx < 16; ++idx) {
    mOut[idx] = mIn[idx];
  }
}

// state is modified.
function PermuteState(permutation, state) {
  for (var pIdx = 0; pIdx < state.length; ++pIdx) {
    state[pIdx] = permutation[state[pIdx]];
  }
}


function GetRotationMatrix(x, y, z, theta) {   
  // convert to radians
  var angle = theta * 3.1415926535898 / 180.0;
  // Do we need to normalize the axis of rotation?

  // make a normalized quaternion
  var w = Math.cos(0.5*angle);
  var f = Math.sin(0.5*angle)/Math.sqrt(x*x+y*y+z*z);
  x *= f;
  y *= f;
  z *= f;
    
  // convert the quaternion to a matrix
  var ww = w*w;
  var wx = w*x;
  var wy = w*y;
  var wz = w*z;
    
  var xx = x*x;
  var yy = y*y;
  var zz = z*z;
    
  var xy = x*y;
  var xz = x*z;
  var yz = y*z;
    
  var s = ww - xx - yy - zz;

  var rotMat = mat4.create();
  mat4.identity(rotMat);
  rotMat[0] = xx*2 + s;     //0,0
  rotMat[1] = (xy + wz)*2;  //1,0
  rotMat[2] = (xz - wy)*2;  //2,0
    
  rotMat[4] = (xy - wz)*2;  //0,1
  rotMat[5] = yy*2 + s;     //1,1
  rotMat[6] = (yz + wx)*2;  //2,1
    
  rotMat[8] = (xz + wy)*2;  //0,2
  rotMat[9] = (yz - wx)*2;  //1,2
  rotMat[10] = zz*2 + s;    //2,2

  return rotMat;
}

function RotateMatrix(m, x, y, z, theta) {   
  rotMat = GetRotationMatrix(x, y, z, theta);
  mat4.multiply(m, rotMat, m);
}

// Rotation is applied after the matrix.
function RotateMatrix2(m, x, y, z, theta) {   
  rotMat = GetRotationMatrix(x, y, z, theta);
  mat4.multiply(rotMat, m, m);
}


// ==================================================================================


function ChooseMove(puzzle, state, dx, dy, piece, face_normal) {
  var position = state[piece.Id];
  var bestMove = null;
  var bestScore = 0.0;
  for (var i = 0; i < puzzle.Moves.length; ++i) {
    var move = puzzle.Moves[i];
    if (move.AffectsPosition(position)) {
      // Score the axis of rotation.
      // First rule out rotation axis that is too aligned with the picked face.
      var score = ComputeCrossMagnitude(face_normal, move.Axis);
      // Transform the axis into view coordinates.
      var v = [move.Axis[0], move.Axis[1], move.Axis[2], 1.0];
      mat4.multiplyVec4(CAMERA.Matrix, v);
      v[0] = v[0] / v[3];
      v[1] = v[1] / v[3];
      score = score * (v[1]*dx + v[0]*dy); // dy is flipped already  
      if (move.EndAngle < 0) {
	score = -score;
      }
      if (score > bestScore) {
	bestScore = score;
	bestMove = move;
      }
    }
  }
  return bestMove;
}








