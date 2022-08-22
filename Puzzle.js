//TODO:
// Move common methods crom Cube2x2.js to Puzzle.js
// Save temp matrixes (other objects?) for animation to avoid potential memory leaks.

function Puzzle() {
  var pieceIdx;
  var matrixIndex = 0;
  this.Pieces = [];
  this.Matricies = [];
  this.Moves = [];
  this.Sequences = [];
  this.Symmetries = [];
  // Mapping from matrix state id to piece location id (without rotation).
  this.LocationEquivalenceSet = [];
  
  this.InitModels();
  this.InitPieces();
  this.UpdateMatricies();
  this.InitMoves();
  this.InitSequences();
  this.InitSymmetries();
  this.ExpandSequences();
  
  this.SolutionState = [];
  for (pieceIdx = 0; pieceIdx < this.Pieces.length; ++pieceIdx) {
    this.SolutionState.push(matrixIndex);
    matrixIndex += this.Pieces[pieceIdx].Matricies.length;
  }
  STATE = [...this.SolutionState];
}


Puzzle.prototype.GetSolutionState = function () {
  state = [];
  return state;
}


Puzzle.prototype.AddPiece = function (piece) {
  piece.Id = this.Pieces.length;
  this.Pieces.push(piece);
}


Puzzle.prototype.UpdateMatricies = function() {
  var idx, piece;
  this.Matricies = [];
  this.LocationEquivalenceSet = [];
  for (idx = 0; idx < this.Pieces.length; ++idx) {
    piece = this.Pieces[idx];
    piece.UpdateMatricies();
    this.Matricies = this.Matricies.concat(piece.Matricies);
    var tmp = Array(piece.Matricies.length).fill(piece.Id);
    this.LocationEquivalenceSet = this.LocationEquivalenceSet.concat(tmp);
  }
}
  

Puzzle.prototype.GetPieceMatrix = function(piece, state) {
  return this.Matricies[state[piece.Id]];
}


// solution state -> 0.
Puzzle.prototype.MatrixToId = function (matrix) {
  var idx, mIdx, eIdx, found;
  for (mIdx = 0; mIdx < this.Matricies.length; ++mIdx) {
    m2 = this.Matricies[mIdx];
    found = true;
    for (var eIdx = 0; eIdx < 16; ++eIdx) {
      if (Math.abs(matrix[eIdx] - m2[eIdx]) > 0.05) {
	found = false;
	break;
      }
    }
    if (found) {
      return mIdx;
    }
  }
  console.log("Error: Cound not identify matrix");
  return -1;
}

// Adds forward and backward moves.
Puzzle.prototype.CreateMovePair = function(pieceIds, axis, angle) {
  var idIdx, piece, matIdx, matrix, matrix0, matrix1;
  var move0 = new Move(axis, angle, pieceIds);
  var move1 = new Move(axis, -angle, pieceIds);
  // Identity permutation
  move0.Permutation = [...Array(this.Matricies.length).keys()];
  move1.Permutation = [...Array(this.Matricies.length).keys()];
  for (idIdx = 0; idIdx < pieceIds.length; ++idIdx) {
    piece = this.Pieces[pieceIds[idIdx]];
    for (matIdx = 0; matIdx < piece.Matricies.length; ++matIdx) {
      matrix = piece.Matricies[matIdx];
      matId = this.MatrixToId(matrix);
      // Forward
      matrix0 = mat4.create(matrix);
      RotateMatrix2(matrix0, axis[0], axis[1], axis[2], angle);
      matId0 = this.MatrixToId(matrix0);
      move0.Permutation[matId] = matId0;
      // Reverse
      matrix1 = mat4.create(matrix);
      RotateMatrix2(matrix1, axis[0], axis[1], axis[2], -angle);
      matId1 = this.MatrixToId(matrix1);
      move1.Permutation[matId] = matId1;
    }
  }
  move0.Reverse = move1;
  move1.Reverse = move0;
  this.AddMove(move0);
  this.AddMove(move1);
}

Puzzle.prototype.AddMove = function(move) {
  move.Id = this.Moves.length;
  this.Moves.push(move);
}
  
Puzzle.prototype.LoadSequences = function (seq_info) {
  var seq_idx, move_ids, moves, move_idx, seq;
  for (seq_idx = 0; seq_idx < seq_info.length; ++seq_idx) {
    move_ids = seq_info[seq_idx];
    moves = [];
    for (move_idx = 0; move_idx < move_ids.length; ++move_idx) {
      moves.push(this.Moves[move_ids[move_idx]]);
    }
    seq = new Sequence(moves, this);
    seq.InitReverse(this);
    seq.Id = this.Sequences.length;
    this.Sequences.push(seq);
  }
}


// Compute pieceId permutation from a transformation matrix.
Puzzle.prototype.ComputePiecePermutation = function (transform) {
  var piecePermutation, pieceIdx, pieceMatrix, location, newPieceIdx;

  // Find piece permutation (not matrix permutation).
  // This ignores rotation.
  piecePermutation = [];
  for (pieceIdx = 0; pieceIdx < this.Pieces.length; ++pieceIdx) {
    pieceMatrix = this.Pieces[pieceIdx].Matricies[0];
    location = [pieceMatrix[12], pieceMatrix[13], pieceMatrix[14]]
    mat4.multiplyVec3(transform, location, location);
    newPieceIdx = this.LocationToPieceIndex(location);
    piecePermutation.push(newPieceIdx);
  }
  return piecePermutation;
}


// Compute moveId permutation from a symetry transformation matrix.
Puzzle.prototype.ComputeMovePermutation = function (transform) {
  var piecePermutation, movePermutation, moveIdx, move, newAxis = [0,0,0];
  var newRotation, newPieceIds, transformedMoveIdx;
  
  // piecePermutation is necessary to match moves by pieces affected. 
  piecePermutation = this.ComputePiecePermutation(transform);
  // Transform each move to assemble a move permutation.
  movePermutation = [];
  for (moveIdx = 0; moveIdx < this.Moves.length; ++moveIdx) {
    move = this.Moves[moveIdx];
    // Transform move axis, rotation and pieces.
    mat4.multiplyVec3(transform, move.Axis, newAxis);
    // Transform rotation
    newRotation = move.EndAngle;
    if (mat4.determinant(transform) < 0) {
      newRotation = newRotation * -1;
    }
    // Transform the pieceIds affected by move.
    newPieceIds = [];
    // Here piece index is for move pieces, not puzzle pieces.
    for (pieceIdx = 0; pieceIdx < move.PieceIds.length; ++pieceIdx) {
      newPieceId = piecePermutation[move.PieceIds[pieceIdx]];
      newPieceIds.push(newPieceId);
    }
    newPieceIds.sort();
    // Find the index of the transformed move.
    transformedMoveIdx = this.FindMoveIndex(newAxis, newRotation, newPieceIds);
    movePermutation.push(transformedMoveIdx);
  }
  return movePermutation;
}


// Convert transforms into move permutations.
// Move permutations are repeated to find all symmetries
// that are combinations of other symetries.
// A symmetry is stored as a list indexed by moves.
Puzzle.prototype.LoadSymmetries = function (transforms) {
  var baseMovePermutations, transform, movePermutation;
  var modified, symIdx, symmetry, permIdx, permutation, newSymmetry;

  // Find symmetry move permutations from the transformation arguments.
  baseMovePermutations = [];
  for (var transIdx = 0; transIdx < transforms.length; ++transIdx) {
    transform = transforms[transIdx];
    movePermutation = this.ComputeMovePermutation(transform);
    baseMovePermutations.push(movePermutation);
  }

  // Find all symmetries by applying base symmetries in combinations.
  // Start with identity which will be removed when we are finished.
  this.Symmetries = [[...Array(this.Moves.length).keys()]];
  modified = true;
  while (modified) {
    modified = false;
    for (symIdx = 0; symIdx < this.Symmetries.length; ++symIdx) {
      symmetry = this.Symmetries[symIdx];
      for (permIdx = 0; permIdx < baseMovePermutations.length; ++permIdx) {
	permutation = baseMovePermutations[permIdx];
	newSymmetry = this.PermuteMoves(symmetry, permutation);
	if (! this.TestForRepeat(newSymmetry)) {
	  this.Symmetries.push(newSymmetry);
	  modified = true;
	}
      }
    }
  }
  // Remove the identity permutation used to prime the process.
  this.Symmetries = this.Symmetries.slice(1);
}


// This method expects pieceIds to be sorted.
Puzzle.prototype.FindMoveIndex = function (axis, rotation, pieceIds) {
  var moveIdx, move, found, idx;
  for (moveIdx = 0; moveIdx < this.Moves.length; ++moveIdx) {
    move = this.Moves[moveIdx];
    if (pieceIds.length != move.PieceIds.length) {
      continue;
    }
    found = true;
    for (idx = 0; idx < pieceIds.length; ++idx) {
      if (pieceIds[idx] != move.PieceIds[idx]) {
	found = false;
      }
    }
    if (found) {
      if (Math.abs(move.Axis[0] - axis[0]) < 0.01 &&
	  Math.abs(move.Axis[1] - axis[1]) < 0.01 &&
	  Math.abs(move.Axis[2] - axis[2]) < 0.01 &&
	  Math.abs(move.EndAngle - rotation) < 0.01) {
	return moveIdx;
      }
      // A negative rotation cancels a negative rotation axis.
      if (Math.abs(move.Axis[0] + axis[0]) < 0.01 &&
	  Math.abs(move.Axis[1] + axis[1]) < 0.01 &&
	  Math.abs(move.Axis[2] + axis[2]) < 0.01 &&
	  Math.abs(move.EndAngle + rotation) < 0.01) {
	return moveIdx;
      }
    }
  }
  
  console.log("Could not find move index");
  return -1;
}


Puzzle.prototype.LocationToPieceIndex = function (vect) {
  var pieceIdx, pieceMatrix;
  // Since pieces are centered at the origin, the translation portion
  // of the matrix indicates its position. 
  for (pieceIdx = 0; pieceIdx < this.Pieces.length; ++pieceIdx) {
    pieceMatrix = this.Pieces[pieceIdx].Matricies[0];
    if (Math.abs(vect[0] - pieceMatrix[12]) < 0.01 &&
	Math.abs(vect[1] - pieceMatrix[13]) < 0.01 &&
	Math.abs(vect[2] - pieceMatrix[14]) < 0.01) {
      return pieceIdx;
    }
  }
  console.log("Could not find piece index");
  return -1;
}


Puzzle.prototype.PermuteMoves = function(moves, permutation) {
  newMoves = [];
  for (idx = 0; idx < moves.length; ++idx) {
    move = moves[idx];
    newMoves.push(permutation[move]);
  }
  return newMoves;
}

function array_equal(array1, array2) {
  return array1.length === array2.length && array1.every(function(value, index) { return value === array2[index]})
}

Puzzle.prototype.TestForRepeat = function(symmetry1) {
  for (idx = 0; idx < this.Symmetries.length; ++idx) {
    symmetry2 = this.Symmetries[idx];
    if (array_equal(symmetry1, symmetry2)) {
      return true;
    }
  }
  return false;
}

Puzzle.prototype.ObjectiveFunction = function(state) {
  var count = 0;
  for (var idx = 0; idx < state.length; ++idx) {
    if (state[idx] == this.SolutionState[idx]) {
      // Piece is in the correct position and orientation
      count += 0;
    } else if (this.LocationEquivalenceSet[state[idx]] == this.LocationEquivalenceSet[this.SolutionState[idx]]) {
      // Piece in the correct position but wrong orientation.
      //count += 1;
      count += 2;
    } else {
      count += 2;
    }
  }
  return count;
}


// Apply symmetries to expand the base list of move sequences / algorithms.
// NOTE: This does not check to see if sequences are duplicated.
Puzzle.prototype.ExpandSequences = function() {
  if (this.Sequences.length == 0) {
    return;
  }
  seq = this.Sequences[0];
  // Identity symmetry is not included
  for (sym_idx = 0; sym_idx < this.Symmetries.length; ++sym_idx) {
    symmetry = this.Symmetries[sym_idx];
    moves = []
    for (m_idx = 0; m_idx < seq.Moves.length; ++m_idx) {
      move_id = seq.Moves[m_idx].Id;
      move_id = symmetry[move_id]
      move = this.Moves[move_id]
      moves.push(move)
    }
    newSeq = new Sequence(moves, this)
    newSeq.InitReverse(this);
    newSeq.Id = this.Sequences.length;
    this.Sequences.push(newSeq);
  }
}
