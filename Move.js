function Move() {
    this.Matrix = mat4.create();
    mat4.identity(this.Matrix);
    // 8 moves,  components can be 1 or -1.
    this.Axis = [1,1,1];
    // Animation angle.
    this.Angle = 0;
    //  Move is finished when it reaches this angle.
    this.EndAngle = 120.0;
    // We need a list of pieces that this move affects.
    // We need indexes because pieces change locations.
    this.PiecePairs = [];
    // Permutations will references the PieceIndex list.
    this.Permutation = [];
};

Move.prototype.ComputeMatrix = function () {   
    // Do we need to normalize the axis of rotation?
    var x = this.Axis[0];
    var y = this.Axis[1];
    var z = this.Axis[2];
    
    mat4.identity(this.Matrix);
    RotateMatrix(this.Matrix, x, y, z, this.Angle);  
}

// Initiate a move.  Add move reference to all moving pieces.
Move.prototype.Start = function () {
    var i;
    var piecePair;
    var pieceSet;
    var pieceIdx;
    for (i = 0; i < this.PiecePairs.length; ++i) {
        piecePair = this.PiecePairs[i];
        pieceSet = piecePair[0];
        pieceIdx = piecePair[1];
        pieceSet.Pieces[pieceIdx].Move = this;
    }
}

// This is called when a move is finished (animation is done).
// Change the piece matrixes, and permute the peiceSets.
// It is a bit complex, but we need a pair (set, idx) to index
// all of the pieces.  Examples of sets are corners, edges, centers ...
Move.prototype.End = function() {
    var i;
    var piecePair;
    var pieceSet;
    var pieceIdx;
    var piece;
    this.Angle = this.EndAngle;
    this.ComputeMatrix();
    for (i = 0; i < this.PiecePairs.length; ++i) {
        piecePair = this.PiecePairs[i];
        pieceSet = piecePair[0];
        pieceIdx = piecePair[1];
        piece = pieceSet.Pieces[pieceIdx];
	mat4.multiply(this.Matrix,piece.Matrix,piece.Matrix);
	piece.Move = null;
    }
    this.Angle = 0;
    this.ComputeMatrix();

    // Permute
    var piecePair2;
    var pieceSet2;
    var pieceIdx;
    var piece2;
    for (i = 0; i < this.Permutation.length; ++i) {
        piecePair = this.PiecePairs[i];
        pieceSet = piecePair[0];
        pieceIdx = piecePair[1];
        piece = pieceSet.Pieces[pieceIdx];
        piecePair2 = this.PiecePairs[this.Permutation[i]];
        pieceSet2 = piecePair2[0];
        pieceIdx2 = piecePair2[1];
        piece2 = pieceSet2.Pieces[pieceIdx2];
	if (pieceSet2 != pieceSet) {
            alert("Sanity check failed: piece set mismatch.");
	    return;
        }
        if (pieceSet.Temp == null) {
            pieceSet.Temp = [];
            for (var j = 0; j < pieceSet.Pieces.length; ++j) {
		pieceSet.Temp.push(pieceSet.Pieces[j]);
	    }
	}
        pieceSet.Pieces[pieceIdx] = pieceSet2.Temp[pieceIdx2];
    }
    // Clear out the temporary piece arrays to prepare
    // for the next move.
    for (i = 0; i < this.Permutation.length; ++i) {
        piecePair = this.PiecePairs[i];
        pieceSet = piecePair[0];
	pieceSet.Temp = null;
    }
}

function ChooseMove(dx,dy,pieceSet,piece) {
    var bestMove = null;
    var bestScore = 0.0;
    for (var i = 0; i < MOVES.length; ++i) {
	var move = MOVES[i];
        // Only consider moves that contain the piece.
        var found = false;
        for (var j = 0; j < move.PiecePairs.length && !found; ++j) {
	    var pair = move.PiecePairs[j];
            if (pair[0] == pieceSet) {
		if (pieceSet.Pieces[pair[1]] == piece) {
		found = true;
		}
	    }
	}
	if (found) {
	    // Score the axis of rotation.
            // Transform the axis into view coordinates.
            var v = [move.Axis[0], move.Axis[1], move.Axis[2], 1.0];
            mat4.multiplyVec4(CAMERA.Matrix, v);
            v[0] = v[0] / v[3];
            v[1] = v[1] / v[3];
	    var score = v[1]*dx + v[0]*dy; // dy is flipped already  
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

function StartMovePieces(move) {
    var i;
    var piecePair;
    var pieceSet;
    var pieceIdx;
    for (i = 0; i < move.PieceIndexes.length; ++i) {
        piecePair = move.PiecePairs[i];
        pieceSet = piecePair[0];
        pieceIdx = piecePair[1];
        pieceSet.Pieces[pieceIdx].Move = move;
    }
}


 
