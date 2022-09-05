
function CrossProduct(a, b) {
  // Cross product.
  var n = [a[1]*b[2] - a[2]*b[1],
	   a[2]*b[0] - a[0]*b[2],
	   a[0]*b[1] - a[1]*b[0]];
  return n;
}


// Input 3 points
function ComputeFaceNormal (p0, p1, p2) {
  var a = [p1[0]-p0[0], p1[1]-p0[1], p1[2]-p0[2]];
  var b = [p2[0]-p0[0], p2[1]-p0[1], p2[2]-p0[2]];
  var n = CrossProduct(a, b);
  var mag = Math.sqrt(n[0]*n[0] + n[1]*n[1] + n[2]*n[2]);
  n[0] = n[0] / mag;
  n[1] = n[1] / mag;
  n[2] = n[2] / mag;
  return n;
}


function ComputeCrossMagnitude(a, b) {
  // Cross product.
  var n = CrossProduct(a, b);
  return Math.sqrt(n[0]*n[0] + n[1]*n[1] + n[2]*n[2]);
}

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


function ChooseMove(puzzle, camera, state, dx, dy, piece, faceCoords) {
  // Screen coords, y is flipped
  dy = -dy;
  // Compute the face normal.
  var faceNormal = ComputeFaceNormal(faceCoords[0], faceCoords[1], faceCoords[2]);
  
  // Figure out which edge of the picked face matches the drag vector.
  // Loop through the edges of the face.
  var bestScore = 0.0;
  var v0 = [];
  var v1 = [];  
  var bestEdgeVect, bestEdgeLoc;
  var tmp, score, p0, p1;
  // Loop over face edges.
  for (var idx = 0; idx < faceCoords.length; ++idx) {
    p0 = faceCoords[idx];
    p1 = faceCoords[(idx+1)%faceCoords.length];
    // Convert to view coordinates
    mat4.multiplyVec4(camera.Matrix, p0, v0);
    mat4.multiplyVec4(camera.Matrix, p1, v1);
    // Get rid of homogenous coordinate, and covert edge to vector.
    for (var k = 0; k < 3; ++k) {
      v0[k] /= v0[3];
      v1[k] /= v1[3];
      v1[k] -= v0[k];
    }
    // Find the edge most parallel to drag vector.
    tmp = dx*v1[0] + dy*v1[1];
    // Normalize to get rid of forshortening bias
    var mag = Math.sqrt(v1[0]**2 + v1[1]**2);
    if (mag > 0) {
      tmp = tmp / mag;
    }
    score = Math.abs(tmp);
    if (score > bestScore) {
      bestScore = score;
      tmp = Math.sign(tmp);
      // In world/puzzle/state coordinates.
      bestEdgeVect = [tmp*(p1[0]-p0[0]), tmp*(p1[1]-p0[1]), tmp*(p1[2]-p0[2])];
      bestEdgeLoc = [0.5*(p1[0]+p0[0]), 0.5*(p1[1]+p0[1]), 0.5*(p1[2]+p0[2])];
    }
  }

  var position = state[piece.Id];
  var bestMove = null;
  bestScore = 0.0;
  for (var i = 0; i < puzzle.Moves.length; ++i) {
    var move = puzzle.Moves[i];
    if (move.AffectsPosition(position)) {
      // Score the axis of rotation.
      // First rule out rotation axis that is too aligned with the picked face.
      var score = ComputeCrossMagnitude(faceNormal, move.Axis);
      // Now choose the axis most perpendular to the edge.
      // Project the cross product onto the axis of rotation
      score = score * ComputeCrossMagnitude(bestEdgeVect, move.Axis);  
      // Which rotation (end angle) is best? A bit complex....
      // torque: Edge vector X piece offest.
      // Sign of dot product or torque and move axis.
      tmp = CrossProduct(bestEdgeLoc, bestEdgeVect);
      score = score * Math.sign(tmp[0]*move.Axis[0] + tmp[1]*move.Axis[1] + tmp[2]*move.Axis[2]);
      score = score * Math.sign(move.EndAngle);
      
      // Transform the axis into view coordinates.
      //var v = [move.Axis[0], move.Axis[1], move.Axis[2], 1.0];
      //mat4.multiplyVec4(CAMERA.Matrix, v);
      //v[0] = v[0] / v[3];
      //v[1] = v[1] / v[3];
      //score = score * (v[1]*dx + v[0]*dy); // dy is flipped already  
      //if (move.EndAngle < 0) {
	//score = -score;
      //}
      if (score > bestScore) {
	bestScore = score;
	bestMove = move;
      }
    }
  }
  return bestMove;
}

