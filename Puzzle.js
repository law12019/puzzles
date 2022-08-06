function Puzzle() {
  this.PieceSets = [];
  this.Moves = [];
};



Puzzle.prototype.DrawPieces = function(program) {
  for (idx = 0; idx < this.PieceSets.length; ++ idx) {
    pieceSet = this.PieceSets[idx];
    pieceSet.Draw(program);
  }
}

Puzzle.prototype.PickPiece = function (newX, newY,camera) {
  for (idx = 0; idx < this.PieceSets.length; ++ idx) {
    pieceSet = this.PieceSets[idx];
    var piece = pieceSet.PickPiece(newX,newY,camera);
    if (piece != null) {
      return [CORNERS, piece];
    }
  }
  return null;
}


