
function Sequence(moves, puzzle) {
  this.Moves = [];
  // Identity permutation [0,1,2,3,...]
  this.Permutation = [...Array(puzzle.Matricies.length).keys()];
  this.AddMoves(moves);
}


Sequence.prototype.Print = function () {
  return "s"+this.Id;
}


Sequence.prototype.GetLength = function () {
  return this.Moves.length;
}


Sequence.prototype.PrintMoves = function () {
  var str = "[" + this.Moves[0].Id;
  for (var idx = 1; idx < this.Moves.length; ++idx) {
    str = str + ", " + this.Moves[idx].Id;
  }
  str = str + "]";
  console.log(str);
}



Sequence.prototype.AddMoves = function (moves) {
  var mIdx, pIdx;
  for (mIdx = 0; mIdx < moves.length; ++mIdx) {
    var move = moves[mIdx]
    if (move instanceof Sequence) {
      this.AddMoves(move.Moves);
    } else {
      this.Moves.push(move);
      for (pIdx = 0; pIdx < this.Permutation.length; ++pIdx) {
	this.Permutation[pIdx] = move.Permutation[this.Permutation[pIdx]];
      }
    }
  }
}


Sequence.prototype.InitReverse = function (puzzle) {
  var move, idx;
  // Create the undo sequece. Stored only locally.
  var reverseMoves = [];
  for (idx = this.Moves.length-1; idx >= 0; --idx) {
    reverseMoves.push(this.Moves[idx].Reverse);
  }
  this.Reverse = new Sequence(reverseMoves, puzzle);
  this.Reverse.Reverse = this;
};




// Apply a move to a lightweight state.
// This returns a nes state array.
Sequence.prototype.Apply = function (state) {
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
Sequence.prototype.ComputePieceAnimationMatricies = function (puzzle, state, k) {
  var moveIdx, move, idx, animationState, piece;

  // k is a float in [0 to 1)
  if (k == 1) {
    return;
  }
  k = k * this.Moves.length;
  moveIdx = Math.floor(k);
  // Compute the interpolated state.
  animationState = [...state];
  for (idx = 0; idx < moveIdx; ++idx) {
    move = this.Moves[idx];
    PermuteState(move.Permutation, animationState)
  }

  // Interpolate the sub move.
  move = this.Moves[moveIdx];
  if (move == undefined || puzzle == undefined || animationState == undefined || k == undefined) {
    console.log("break here");
  }
  move.ComputePieceAnimationMatricies(puzzle, animationState, k - moveIdx);
}


// This may not be used anymore.
// For Animation: position is the matrix index for a piece.
Sequence.prototype.AffectsPosition = function(position) {
  return (this.Permutation[position] != position);
}



//========================================================================
// Legacy




// Initiate animation of our move sequence.
Sequence.prototype.Start = function () {
  this.AnimationIndex = 0;
  this.Started = false;
  this.Moves[0].Start();
}

Sequence.prototype.Middle = function (k) {
  if (k > 1) {
    // Just in case user passes in k > 1
    k = 1
  }
  // Divide the interpolation factor into the move sequence
  k = k * this.Moves.length;
  var low = Math.floor(k)
  var high = Math.ceil(k)
  k = k - low
  
  // Take care of skipped moves.
  while (this.AnimationIndex < low) {
    this.Moves[this.AnimationIndex].End();
    this.AnimationIndex += 1;
    this.Started = false;
  }
  if (this.AnimationIndex < this.Moves.length && k > 0) {
    var move = this.Moves[this.AnimationIndex];
    if (! this.Started) {
      move.Start();
      this.Started = true;
    }
    move.Middle(k);
  }
}

 
Sequence.prototype.End = function () {
  this.Middle(1.0);
}
