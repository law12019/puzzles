
function Puzzle() {
  this.Moves = [];

  this.PieceSets = [];
  //Corners
  this.PieceSets.push(new PieceSet());
  //Centers
  this.PieceSets.push(new PieceSet());
  //Edges
  this.PieceSets.push(new PieceSet());

  this.InitBuffers();
  this.InitPieces();
  this.InitMoves();
}

// Internal naming of array elements
Puzzle.prototype.GetCorners = function(){
  return this.PieceSets[0];
}

// Coding for State rotation.
// 0 has to be the starting stat for each piece.
// I can think of no better way to trace rotation than with the matrix.
// I will arbitrarily index the possible matrix states.
// I could compute the move state transitions, for each peice, but
// I will save that for later.  For now use nearest matrix.

Puzzle.prototype.InitCamera = function(camera){
  camera.ViewPlaneNormal = [0,0,1];
  camera.Up = [0,1,0];
  camera.Right = [1,0,0];

  camera.Height = 2.5;
  camera.ComputeMatrix();
}

Puzzle.prototype.InitBuffers = function() {
  corners = this.GetCorners();

  corners.AddPoint(1.0, 1.0, 1.0, 0.50,0.50); //0
  corners.AddPoint(0.0, 1.0, 1.0, 0.01,0.50); //1
  corners.AddPoint(1.0, 0.0, 1.0, 0.50,0.01); //2
  corners.AddPoint(1.0, 1.0, 0.0, 0.99,0.99); //3
  corners.AddPoint(0.0, 0.0, 1.0, 0.01,0.01); //4
  corners.AddPoint(0.0, 1.0, 0.0, 0.01,0.99); //5
  corners.AddPoint(1.0, 0.0, 0.0, 0.99,0.01); //6
  corners.AddPoint(0.0, 0.0, 0.0, 0.00,0.50); //7
  corners.AddPoint(0.0, 0.0, 0.0, 0.50,0.00); //8
  corners.AddPoint(0.0, 0.0, 0.0, 1.00,1.00); //9

  // 0 1 4 2
  // 0 2 6 3
  // 0 3 5 1

  // 7 4 1 5
  // 8 6 2 4
  // 9 5 3 6

  corners.AddOutTriangle(0,1,4);
  corners.AddOutTriangle(0,4,2);
  corners.AddOutTriangle(0,2,6);
  corners.AddOutTriangle(0,6,3);
  corners.AddOutTriangle(0,3,5);
  corners.AddOutTriangle(0,5,1);
  corners.AddInTriangle(7,4,1);
  corners.AddInTriangle(7,1,5);
  corners.AddInTriangle(8,6,2);
  corners.AddInTriangle(8,2,4);
  corners.AddInTriangle(9,5,3);
  corners.AddInTriangle(9,3,6);
  corners.InitBuffers();
}


Puzzle.prototype.InitPieces = function() {
  corners = this.GetCorners();

  var piece = new Piece("CubeImages/Corner0.jpg");
  piece.RotateY(1);
  piece.RotateX(1);
  piece.RotateZ(1);
  corners.AddPiece(piece);
  piece = new Piece("CubeImages/Corner1.jpg");
  piece.RotateX(1);
  piece.RotateX(1);
 
  corners.AddPiece(piece);
  piece = new Piece("CubeImages/Corner2.jpg");
  piece.RotateY(1);
  piece.RotateY(1);
  corners.AddPiece(piece);
  piece = new Piece("CubeImages/Corner3.jpg");
  piece.RotateX(-1);
  corners.AddPiece(piece);
  piece = new Piece("CubeImages/Corner4.jpg");
  piece.RotateY(1);
  piece.RotateX(1);
  corners.AddPiece(piece);
  piece = new Piece("CubeImages/Corner5.jpg");
  piece.RotateX(1);
  corners.AddPiece(piece);
  piece = new Piece("CubeImages/Corner6.jpg");
  piece.RotateY(1);
  corners.AddPiece(piece);
  piece = new Piece("CubeImages/Corner7.jpg");
  corners.AddPiece(piece);
}


Puzzle.prototype.InitMoves = function() {
  corners = this.GetCorners();

  this.Moves[0] = new Move();
  this.Moves[0].Axis = [-1,0,0];
  this.Moves[0].EndAngle = 90.0;
  this.Moves[0].PiecePairs.push([corners,0]);
  this.Moves[0].PiecePairs.push([corners,4]);
  this.Moves[0].PiecePairs.push([corners,6]);
  this.Moves[0].PiecePairs.push([corners,2]);
  this.Moves[0].Permutation = [3,0,1,2];

  this.Moves[1] = new Move();
  this.Moves[1].Axis = [-1,0,0];
  this.Moves[1].EndAngle = -90.0;
  this.Moves[1].PiecePairs.push([corners,0]);
  this.Moves[1].PiecePairs.push([corners,4]);
  this.Moves[1].PiecePairs.push([corners,6]);
  this.Moves[1].PiecePairs.push([corners,2]);
  this.Moves[1].Permutation = [1,2,3,0];

  this.Moves[0].Reverse = this.Moves[1];
  this.Moves[1].Reverse = this.Moves[0];

  this.Moves[2] = new Move();
  this.Moves[2].Axis = [1,0,0];
  this.Moves[2].EndAngle = 90.0;
  this.Moves[2].PiecePairs.push([corners,1]);
  this.Moves[2].PiecePairs.push([corners,3]);
  this.Moves[2].PiecePairs.push([corners,7]);
  this.Moves[2].PiecePairs.push([corners,5]);
  this.Moves[2].Permutation = [3,0,1,2];

  this.Moves[3] = new Move();
  this.Moves[3].Axis = [1,0,0];
  this.Moves[3].EndAngle = -90.0;
  this.Moves[3].PiecePairs.push([corners,1]);
  this.Moves[3].PiecePairs.push([corners,3]);
  this.Moves[3].PiecePairs.push([corners,7]);
  this.Moves[3].PiecePairs.push([corners,5]);
  this.Moves[3].Permutation = [1,2,3,0];

  this.Moves[2].Reverse = this.Moves[3];
  this.Moves[3].Reverse = this.Moves[2];

  this.Moves[4] = new Move();
  this.Moves[4].Axis = [0,-1,0];
  this.Moves[4].EndAngle = 90.0;
  this.Moves[4].PiecePairs.push([corners,0]);
  this.Moves[4].PiecePairs.push([corners,1]);
  this.Moves[4].PiecePairs.push([corners,5]);
  this.Moves[4].PiecePairs.push([corners,4]);
  this.Moves[4].Permutation = [3,0,1,2];

  this.Moves[5] = new Move();
  this.Moves[5].Axis = [0,-1,0];
  this.Moves[5].EndAngle = -90.0;
  this.Moves[5].PiecePairs.push([corners,0]);
  this.Moves[5].PiecePairs.push([corners,1]);
  this.Moves[5].PiecePairs.push([corners,5]);
  this.Moves[5].PiecePairs.push([corners,4]);
  this.Moves[5].Permutation = [1,2,3,0];

  this.Moves[4].Reverse = this.Moves[5];
  this.Moves[5].Reverse = this.Moves[4];

  this.Moves[6] = new Move();
  this.Moves[6].Axis = [0,1,0];
  this.Moves[6].EndAngle = 90.0;
  this.Moves[6].PiecePairs.push([corners,2]);
  this.Moves[6].PiecePairs.push([corners,6]);
  this.Moves[6].PiecePairs.push([corners,7]);
  this.Moves[6].PiecePairs.push([corners,3]);
  this.Moves[6].Permutation = [3,0,1,2];

  this.Moves[7] = new Move();
  this.Moves[7].Axis = [0,1,0];
  this.Moves[7].EndAngle = -90.0;
  this.Moves[7].PiecePairs.push([corners,2]);
  this.Moves[7].PiecePairs.push([corners,6]);
  this.Moves[7].PiecePairs.push([corners,7]);
  this.Moves[7].PiecePairs.push([corners,3]);
  this.Moves[7].Permutation = [1,2,3,0];

  this.Moves[6].Reverse = this.Moves[7];
  this.Moves[7].Reverse = this.Moves[6];

  this.Moves[8] = new Move();
  this.Moves[8].Axis = [0,0,-1];
  this.Moves[8].EndAngle = 90.0;
  this.Moves[8].PiecePairs.push([corners,0]);
  this.Moves[8].PiecePairs.push([corners,2]);
  this.Moves[8].PiecePairs.push([corners,3]);
  this.Moves[8].PiecePairs.push([corners,1]);
  this.Moves[8].Permutation = [3,0,1,2];

  this.Moves[9] = new Move();
  this.Moves[9].Axis = [0,0,-1];
  this.Moves[9].EndAngle = -90.0;
  this.Moves[9].PiecePairs.push([corners,0]);
  this.Moves[9].PiecePairs.push([corners,2]);
  this.Moves[9].PiecePairs.push([corners,3]);
  this.Moves[9].PiecePairs.push([corners,1]);
  this.Moves[9].Permutation = [1,2,3,0];

  this.Moves[8].Reverse = this.Moves[9];
  this.Moves[9].Reverse = this.Moves[8];

  this.Moves[10] = new Move();
  this.Moves[10].Axis = [0,0,1];
  this.Moves[10].EndAngle = 90.0;
  this.Moves[10].PiecePairs.push([corners,4]);
  this.Moves[10].PiecePairs.push([corners,5]);
  this.Moves[10].PiecePairs.push([corners,7]);
  this.Moves[10].PiecePairs.push([corners,6]);
  this.Moves[10].Permutation = [3,0,1,2];

  this.Moves[11] = new Move();
  this.Moves[11].Axis = [0,0,1];
  this.Moves[11].EndAngle = -90.0;
  this.Moves[11].PiecePairs.push([corners,4]);
  this.Moves[11].PiecePairs.push([corners,5]);
  this.Moves[11].PiecePairs.push([corners,7]);
  this.Moves[11].PiecePairs.push([corners,6]);
  this.Moves[11].Permutation = [1,2,3,0];

  this.Moves[10].Reverse = this.Moves[11];
  this.Moves[11].Reverse = this.Moves[10];
}

