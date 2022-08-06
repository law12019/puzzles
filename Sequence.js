

function Sequence(moves, puzzle) {
  this.Moves = [];

  // Copy the end state when this sequence is applied.
  // Note: This assume puzzle started from solved before "moves" were applied.
  this.PieceSets = [];
  if (puzzle != null) {
    for (var idx = 0; idx < puzzle.PieceSets.length; ++idx) {
      this.PieceSets.push(puzzle.PieceSets[idx].Duplicate());
    }
  }

  this.AddMoves(moves);
}



Sequence.prototype.Print = function () {
  var str = "[" + this.Moves[0].Id;
  for (var idx = 1; idx < this.Moves.length; ++idx) {
    str = str + ", " + this.Moves[idx].Id;
  }
  str = str + "]";
  console.log(str);
}



Sequence.prototype.AddMoves = function (moves) {
  for (var idx = 0; idx < moves.length; ++idx) {
    var move = moves[idx]
    if (move instanceof Sequence) {
      this.AddMoves(move.Moves);
    } else {
      this.Moves.push(move);
    }
  }
}


Sequence.prototype.InitReverse = function () {
  var move;
  // Create the undo sequece. Stored only locally.
  var reverse_moves = [...this.Moves];
  reverse_moves.reverse();
  this.Reverse = new Sequence([], null);
  for (var idx = this.Moves.length-1; idx >= 0; --idx) {
    move = this.Moves[idx];
    this.Reverse.Moves.push(move.Reverse);
  }
  this.Reverse.Reverse = this;
};


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
