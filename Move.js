
// Note: Permutation is not initialized in this constructor.
function Move(axis, angle, pieceIds) {
  this.Id = -1;
  // Axis of rotation
  this.Axis = axis;
  //  Move is finished when it reaches this angle.
  // This is for animation and comparing move equivalence.
  this.EndAngle = angle;
  // These are the piece indexes modified by this move.
  // This is only used during puzzle initialization.
  // Array is sorted for easier equivalence comparison.
  this.PieceIds = pieceIds.sort();
  
  // This "Permutation" operates on puzzle matrix indexes.
  // These indexes encode state of the puzzle pieces.
  this.Permutation = [];

  // Trying to make a faster move with lighter weight states.
  // This will be completely permutation based.
  //this.PermutationData = null;
  //this.Matrix = mat4.create();
  //mat4.identity(this.Matrix);
};


Move.prototype.Print = function () {
  return "m"+this.Id;
}


// Apply a move to a lightweight state.
// This returns a nes state array.
Move.prototype.Apply = function (state) {
  var idx;
  var newState = [];
  for (idx = 0; idx < state.length; ++idx) {
    newState.push(this.Permutation[state[idx]]);
  }
  return newState;
}



// Sets the value of the piece animation matricies for rendering.
// K indicates how far into the move we want to render.
// Hacky. God method that uses internals of puzzle, and sequence.
// Forced into this by not saving state matricies.
Move.prototype.ComputePieceAnimationMatricies = function (puzzle, state, k) {
  var idx, piece, position, pieceMatrix;
  var moveMatrix = GetRotationMatrix(this.Axis[0], this.Axis[1], this.Axis[2], this.EndAngle*k);
  for (idx = 0; idx < state.length; ++idx) {
    piece = puzzle.Pieces[idx]
    position = state[idx];
    pieceMatrix = puzzle.Matricies[position];
    if (this.AffectsPosition(position)) {
      mat4.multiply(moveMatrix, pieceMatrix, piece.AnimationMatrix);
    } else {
      CopyMatrix(pieceMatrix, piece.AnimationMatrix);
    }
  }
}


// For Animation: position is the matrix index for a piece.
// Should becalled "AffectsPosition"
Move.prototype.AffectsPosition = function(position) {
  return (this.Permutation[position] != position);
}




