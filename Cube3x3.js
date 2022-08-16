

Puzzle.prototype.InitCamera = function(camera){
  camera.ViewPlaneNormal = [0,0,1];
  camera.Up = [0,1,0];
  camera.Right = [1,0,0];

  camera.Height = 7.2;
  camera.ComputeMatrix();
}

// Trianges rotate anti-clockwise from the outside.
Puzzle.prototype.InitModels = function() {
  // Corner
  var model = new PieceModel();
  model.AddPoint( 1.0,  1.0,  1.0, 0.50,0.50); //0 (out side point)
  model.AddPoint(-1.0,  1.0,  1.0, 0.01,0.50); //1
  model.AddPoint( 1.0, -1.0,  1.0, 0.50,0.01); //2
  model.AddPoint( 1.0,  1.0, -1.0, 0.99,0.99); //3
  model.AddPoint(-1.0, -1.0,  1.0, 0.01,0.01); //4
  model.AddPoint(-1.0,  1.0, -1.0, 0.01,0.99); //5
  model.AddPoint( 1.0, -1.0, -1.0, 0.99,0.01); //6
  model.AddPoint(-1.0, -1.0, -1.0, 0.00,0.50); //7
  model.AddPoint(-1.0, -1.0, -1.0, 0.50,0.00); //8
  model.AddPoint(-1.0, -1.0, -1.0, 1.00,1.00); //9
  model.AddOutTriangle(0,1,4);
  model.AddOutTriangle(0,4,2);
  model.AddOutTriangle(0,2,6);
  model.AddOutTriangle(0,6,3);
  model.AddOutTriangle(0,3,5);
  model.AddOutTriangle(0,5,1);
  model.AddInTriangle(7,4,1);
  model.AddInTriangle(7,1,5);
  model.AddInTriangle(8,6,2);
  model.AddInTriangle(8,2,4);
  model.AddInTriangle(9,5,3);
  model.AddInTriangle(9,3,6);
  model.InitBuffers();
  this.CornerModel = model;

  // Center
  model = new PieceModel();
  model.AddPoint(-1.0,-1.0,-1.0, 0.00,0.00); 
  model.AddPoint( 1.0,-1.0,-1.0, 0.01,0.01); 
  model.AddPoint(-1.0, 1.0,-1.0, 1.00,0.00); 
  model.AddPoint( 1.0, 1.0,-1.0, 0.99,0.01); 
  model.AddPoint(-1.0,-1.0, 1.0, 0.00,1.00); 
  model.AddPoint( 1.0,-1.0, 1.0, 0.01,0.99); 
  model.AddPoint(-1.0, 1.0, 1.0, 1.00,1.00); 
  model.AddPoint( 1.0, 1.0, 1.0, 0.99,0.99); 
  model.AddOutTriangle(1,3,7);
  model.AddOutTriangle(1,7,5);
  model.AddInTriangle(0,4,6);
  model.AddInTriangle(0,6,2);
  model.AddInTriangle(2,6,7);
  model.AddInTriangle(2,7,3);
  model.AddInTriangle(0,1,5);
  model.AddInTriangle(0,5,4);
  model.AddInTriangle(0,2,3);
  model.AddInTriangle(0,3,1);
  model.AddInTriangle(4,5,7);
  model.AddInTriangle(4,7,6);
  model.InitBuffers();
  this.CenterModel = model;

  // Edge
  model = new PieceModel();
  /*
  model.AddPoint(-1.0,-1.0,-1.0, 0.00,0.50); 
  model.AddPoint( 1.0,-1.0,-1.0, 0.01,0.99); 
  model.AddPoint(-1.0, 1.0,-1.0, 0.01,0.01);
  model.AddPoint( 1.0, 1.0,-1.0, 0.01,0.50); 
  model.AddPoint(-1.0,-1.0, 1.0, 1.00,0.50); 0
  model.AddPoint( 1.0,-1.0, 1.0, 0.99,0.99); 1
  model.AddPoint(-1.0, 1.0, 1.0, 0.99,0.01); 
  model.AddPoint( 1.0, 1.0, 1.0, 0.99,0.50); 2
  model.AddOutTriangle(1,3,7);
  model.AddOutTriangle(1,7,5);
  model.AddOutTriangle(2,6,7);
  model.AddOutTriangle(2,7,3);
  model.AddInTriangle(0,4,6);
  model.AddInTriangle(0,6,2);
  model.AddInTriangle(0,1,5);
  model.AddInTriangle(0,5,4);
  model.AddInTriangle(0,2,3);
  model.AddInTriangle(0,3,1);
  model.AddInTriangle(4,5,7);
  model.AddInTriangle(4,7,6);
  */
  model.AddPoint(-1.0,-1.0,-1.0, 0.00,0.00); 
  model.AddPoint(-1.0,-1.0, 1.0, 1.00,0.00); 

  model.AddPoint(-1.0, 1.0,-1.0, 0.01,0.01); 
  model.AddPoint(-1.0, 1.0, 1.0, 0.99,0.01); 

  model.AddPoint(-1.0,-1.0,-1.0, 0.00,0.50); 
  model.AddPoint( 1.0, 1.0,-1.0, 0.01,0.50); 
  model.AddPoint( 1.0, 1.0, 1.0, 0.99,0.50); 
  model.AddPoint(-1.0,-1.0, 1.0, 1.00,0.50); 

  model.AddPoint( 1.0,-1.0,-1.0, 0.01,0.99); 
  model.AddPoint( 1.0,-1.0, 1.0, 0.99,0.99); 

  model.AddPoint(-1.0,-1.0,-1.0, 0.00,1.00); 
  model.AddPoint(-1.0,-1.0, 1.0, 1.00,1.00); 

  model.AddOutTriangle(0,2,1);
  model.AddOutTriangle(1,2,3);
  model.AddOutTriangle(2,5,3);
  model.AddOutTriangle(3,5,6);
  model.AddOutTriangle(5,8,6);
  model.AddOutTriangle(6,8,9);
  model.AddOutTriangle(8,10,9);
  model.AddOutTriangle(9,10,11);
  model.AddOutTriangle(2,4,5);
  model.AddOutTriangle(5,4,8);
  model.AddOutTriangle(3,6,7);
  model.AddOutTriangle(7,6,9);


  model.InitBuffers();
  this.EdgeModel = model;
}


// Rotation order is z,y,x.  Clockwise when at the origin looking out the axis.
// Anti clockwise when looking downthe axis at the origin.
Puzzle.prototype.InitPieces = function() {
  this.AddPiece(new Piece("CubeImages/Corner0.jpg", this.CornerModel, [-2,-2,-2], [90,0,180], 3));
  this.AddPiece(new Piece("CubeImages/Corner1.jpg", this.CornerModel, [ 2,-2,-2], [180,0,0], 3));
  this.AddPiece(new Piece("CubeImages/Corner2.jpg", this.CornerModel, [-2, 2,-2], [0,180,0], 3));
  this.AddPiece(new Piece("CubeImages/Corner3.jpg", this.CornerModel, [ 2, 2,-2], [-90,0,0], 3));
  this.AddPiece(new Piece("CubeImages/Corner4.jpg", this.CornerModel, [-2,-2, 2], [90,0,90], 3));
  this.AddPiece(new Piece("CubeImages/Corner5.jpg", this.CornerModel, [ 2,-2, 2], [90,0,0], 3));
  this.AddPiece(new Piece("CubeImages/Corner6.jpg", this.CornerModel, [-2, 2, 2], [0,-90,0], 3));
  this.AddPiece(new Piece("CubeImages/Corner7.jpg", this.CornerModel, [ 2, 2, 2], [0,0,0], 3)); 
  // 8
  this.AddPiece(new Piece("CubeImages/Center0.jpg", this.CenterModel, [ -2, 0, 0], [0,180,0], 4)); 
  this.AddPiece(new Piece("CubeImages/Center1.jpg", this.CenterModel, [ 2, 0, 0], [0,0,0], 4)); 
  this.AddPiece(new Piece("CubeImages/Center2.jpg", this.CenterModel, [ 0, -2, 0], [0,0,-90], 4)); 
  this.AddPiece(new Piece("CubeImages/Center3.jpg", this.CenterModel, [ 0, 2, 0], [0,0,90], 4)); 
  this.AddPiece(new Piece("CubeImages/Center4.jpg", this.CenterModel, [ 0, 0, -2], [0,90,0], 4)); 
  this.AddPiece(new Piece("CubeImages/Center5.jpg", this.CenterModel, [ 0, 0, 2], [0,-90,0], 4)); 
  // 14  5,6, 10,11
  this.AddPiece(new Piece("CubeImages/Edge0.jpg", this.EdgeModel, [ 2, 2, 0], [0,0,0], 2)); 
  this.AddPiece(new Piece("CubeImages/Edge1.jpg", this.EdgeModel, [-2, 2, 0], [0,0,90], 2)); 
  this.AddPiece(new Piece("CubeImages/Edge2.jpg", this.EdgeModel, [-2,-2, 0], [0,0,180], 2));
  this.AddPiece(new Piece("CubeImages/Edge3.jpg", this.EdgeModel, [ 2,-2, 0], [0,0,-90], 2)); 
  this.AddPiece(new Piece("CubeImages/Edge4.jpg", this.EdgeModel, [ 2, 0, 2], [90,0,0], 2)); 
  this.AddPiece(new Piece("CubeImages/Edge5.jpg", this.EdgeModel, [-2, 0, 2], [90,0,90], 2));
  this.AddPiece(new Piece("CubeImages/Edge6.jpg", this.EdgeModel, [-2, 0,-2], [-90,0,90], 2));
  this.AddPiece(new Piece("CubeImages/Edge7.jpg", this.EdgeModel, [ 2, 0,-2], [-90,0,0], 2)); 
  this.AddPiece(new Piece("CubeImages/Edge8.jpg", this.EdgeModel, [ 0, 2, 2], [0,-90,0], 2)); 
  this.AddPiece(new Piece("CubeImages/Edge9.jpg", this.EdgeModel, [ 0, 2,-2], [0,90,0], 2)); 
  this.AddPiece(new Piece("CubeImages/Edge10.jpg", this.EdgeModel, [ 0,-2,-2], [0,90,-90], 2));
  this.AddPiece(new Piece("CubeImages/Edge11.jpg", this.EdgeModel, [ 0,-2, 2], [0,-90,-90], 2));
}



Puzzle.prototype.InitMoves = function() {
  this.CreateMovePair([0,2,4,6, 8, 15,16,19,20], [1,0,0], 90);
  this.CreateMovePair([10,11,12,13, 22,23,24,25], [1,0,0], 90);
  this.CreateMovePair([1,3,5,7, 9, 14,17,18,21], [1,0,0], 90);
  
  this.CreateMovePair([0,1,4,5, 10, 16,17,24,25], [0,1,0], 90);
  this.CreateMovePair([8,9,12,13, 18,19,20,21], [0,1,0], 90);
  this.CreateMovePair([2,3,6,7, 11, 14,15,22,23], [0,1,0], 90);

  this.CreateMovePair([0,1,2,3, 12, 20,21,23,24], [0,0,1], 90);
  this.CreateMovePair([8,9,10,11, 14,15,16,17], [0,0,1], 90);
  this.CreateMovePair([4,5,6,7, 13, 18,19,22,25], [0,0,1], 90);
}


Puzzle.prototype.InitSequences = function() {
  seq_info = [
    // Swap 3 corners
    [0, 4, 6, 5, 7, 1, 11, 0, 6, 4, 7, 5, 1, 10], // 2 are rotated too.
    // Rotate 2 edges
    [0, 7, 1, 6, 0, 7, 1, 11, 0, 6, 1, 7, 0, 6, 1, 10], // 90
    [0, 6, 1, 7, 0, 6, 1, 11, 11, 0, 7, 1, 6, 0, 7, 1, 10, 10], // 180
    // Swap 3 edges
    [14, 2, 6, 3, 7, 7, 15, 10, 14, 6, 6, 2, 7, 3, 15, 11],
    // Rotate 2 edges
    [2, 6, 3, 7, 2, 7, 7, 3, 10, 2, 6, 6, 3, 6, 2, 7, 3, 11], //90
    [2, 6, 3, 7, 2, 6, 6, 3, 10, 10, 2, 7, 7, 3, 6, 2, 7, 3, 10, 10], //180
  ];

  this.LoadSequences(seq_info);
}



























Puzzle.prototype.InitBuffersOld = function() {
  corners = this.GetCorners();
  centers = this.GetCenters();
  edges = this.GetEdges();

  corners.AddPoint(1.5, 1.5, 1.5, 0.50,0.50); //0
  corners.AddPoint(0.5, 1.5, 1.5, 0.01,0.50); //1
  corners.AddPoint(1.5, 0.5, 1.5, 0.50,0.01); //2
  corners.AddPoint(1.5, 1.5, 0.5, 0.99,0.99); //3
  corners.AddPoint(0.5, 0.5, 1.5, 0.01,0.01); //4
  corners.AddPoint(0.5, 1.5, 0.5, 0.01,0.99); //5
  corners.AddPoint(1.5, 0.5, 0.5, 0.99,0.01); //6
  corners.AddPoint(0.5, 0.5, 0.5, 0.00,0.50); //7
  corners.AddPoint(0.5, 0.5, 0.5, 0.50,0.00); //8
  corners.AddPoint(0.5, 0.5, 0.5, 1.00,1.00); //9
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

  centers.AddPoint(0.5,-0.5,-0.5, 0.00,0.00); 
  centers.AddPoint(1.5,-0.5,-0.5, 0.01,0.01); 
  centers.AddPoint(0.5, 0.5,-0.5, 1.00,0.00); 
  centers.AddPoint(1.5, 0.5,-0.5, 0.99,0.01); 
  centers.AddPoint(0.5,-0.5, 0.5, 0.00,1.00); 
  centers.AddPoint(1.5,-0.5, 0.5, 0.01,0.99); 
  centers.AddPoint(0.5, 0.5, 0.5, 1.00,1.00); 
  centers.AddPoint(1.5, 0.5, 0.5, 0.99,0.99); 
  centers.AddOutTriangle(1,3,7);
  centers.AddOutTriangle(1,7,5);
  centers.AddInTriangle(0,4,6);
  centers.AddInTriangle(0,6,2);
  centers.AddInTriangle(2,6,7);
  centers.AddInTriangle(2,7,3);
  centers.AddInTriangle(0,1,5);
  centers.AddInTriangle(0,5,4);
  centers.AddInTriangle(0,2,3);
  centers.AddInTriangle(0,3,1);
  centers.AddInTriangle(4,5,7);
  centers.AddInTriangle(4,7,6);
  centers.InitBuffers();

  edges.AddPoint(0.5, 0.5,-0.5, 0.00,0.50); 
  edges.AddPoint(1.5, 0.5,-0.5, 0.01,0.99); 
  edges.AddPoint(0.5, 1.5,-0.5, 0.01,0.01);//2 
  edges.AddPoint(1.5, 1.5,-0.5, 0.01,0.50); 
  edges.AddPoint(0.5, 0.5, 0.5, 1.00,0.50); 
  edges.AddPoint(1.5, 0.5, 0.5, 0.99,0.99); 
  edges.AddPoint(0.5, 1.5, 0.5, 0.99,0.01);//6 
  edges.AddPoint(1.5, 1.5, 0.5, 0.99,0.50); 
  edges.AddOutTriangle(1,3,7);
  edges.AddOutTriangle(1,7,5);
  edges.AddOutTriangle(2,6,7);
  edges.AddOutTriangle(2,7,3);
  edges.AddInTriangle(0,4,6);
  edges.AddInTriangle(0,6,2);
  edges.AddInTriangle(0,1,5);
  edges.AddInTriangle(0,5,4);
  edges.AddInTriangle(0,2,3);
  edges.AddInTriangle(0,3,1);
  edges.AddInTriangle(4,5,7);
  edges.AddInTriangle(4,7,6);
  edges.InitBuffers();
}


Puzzle.prototype.InitPiecesOld = function() {
  corners = this.GetCorners();
  centers = this.GetCenters();
  edges = this.GetEdges();

  corners.Pieces[0] = new Piece("CubeImages/Corner0.jpg", [1,1,1], 3);
  corners.Pieces[0].RotateY(1);
  corners.Pieces[0].RotateX(1);
  corners.Pieces[0].RotateZ(1);
  corners.Pieces[1] = new Piece("CubeImages/Corner1.jpg", [1,1,1], 3);
  corners.Pieces[1].RotateX(1);
  corners.Pieces[1].RotateX(1);
  corners.Pieces[2] = new Piece("CubeImages/Corner2.jpg", [1,1,1], 3);
  corners.Pieces[2].RotateY(1);
  corners.Pieces[2].RotateY(1);
  corners.Pieces[3] = new Piece("CubeImages/Corner3.jpg", [1,1,1], 3);
  corners.Pieces[3].RotateX(-1);
  corners.Pieces[4] = new Piece("CubeImages/Corner4.jpg", [1,1,1], 3);
  corners.Pieces[4].RotateY(1);
  corners.Pieces[4].RotateX(1);
  corners.Pieces[5] = new Piece("CubeImages/Corner5.jpg", [1,1,1], 3);
  corners.Pieces[5].RotateX(1);
  corners.Pieces[6] = new Piece("CubeImages/Corner6.jpg", [1,1,1], 3);
  corners.Pieces[6].RotateY(1);
  corners.Pieces[7] = new Piece("CubeImages/Corner7.jpg", [1,1,1], 3);

  centers.Pieces[0] = new Piece("CubeImages/Center0.jpg", [1,0,0], 4);
  centers.Pieces[0].RotateY(1);
  centers.Pieces[0].RotateY(1);
  centers.Pieces[1] = new Piece("CubeImages/Center1.jpg", [1,0,0], 4);
  centers.Pieces[2] = new Piece("CubeImages/Center2.jpg", [1,0,0], 4);
  centers.Pieces[2].RotateZ(-1);
  centers.Pieces[3] = new Piece("CubeImages/Center3.jpg", [1,0,0], 4);
  centers.Pieces[3].RotateZ(1);
  centers.Pieces[4] = new Piece("CubeImages/Center4.jpg", [1,0,0], 4);
  centers.Pieces[4].RotateY(-1);
  centers.Pieces[5] = new Piece("CubeImages/Center5.jpg", [1,0,0], 4);
  centers.Pieces[5].RotateY(1);

  edges.Pieces[0] = new Piece("CubeImages/Edge0.jpg", [1,1,0], 2);
  edges.Pieces[1] = new Piece("CubeImages/Edge1.jpg", [1,1,0], 2);
  edges.Pieces[1].RotateZ(1);
  edges.Pieces[2] = new Piece("CubeImages/Edge2.jpg", [1,1,0], 2);
  edges.Pieces[2].RotateZ(1);
  edges.Pieces[2].RotateZ(1);
  edges.Pieces[3] = new Piece("CubeImages/Edge3.jpg", [1,1,0], 2);
  edges.Pieces[3].RotateZ(-1);
  edges.Pieces[4] = new Piece("CubeImages/Edge4.jpg", [1,1,0], 2);
  edges.Pieces[4].RotateX(1);
  edges.Pieces[5] = new Piece("CubeImages/Edge5.jpg", [1,1,0], 2);
  edges.Pieces[5].RotateY(1);
  edges.Pieces[5].RotateX(1);
  edges.Pieces[6] = new Piece("CubeImages/Edge6.jpg", [1,1,0], 2);
  edges.Pieces[6].RotateZ(1);
  edges.Pieces[6].RotateY(-1);
  edges.Pieces[7] = new Piece("CubeImages/Edge7.jpg", [1,1,0], 2);
  edges.Pieces[7].RotateX(-1);
  edges.Pieces[8] = new Piece("CubeImages/Edge8.jpg", [1,1,0], 2);
  edges.Pieces[8].RotateY(1);
  edges.Pieces[9] = new Piece("CubeImages/Edge9.jpg", [1,1,0], 2);
  edges.Pieces[9].RotateY(-1);
  edges.Pieces[10] = new Piece("CubeImages/Edge10.jpg", [1,1,0], 2);
  edges.Pieces[10].RotateX(-1);
  edges.Pieces[10].RotateY(-1);
  edges.Pieces[11] = new Piece("CubeImages/Edge11.jpg", [1,1,0], 2);
  edges.Pieces[11].RotateX(1);
  edges.Pieces[11].RotateY(1);
}




Puzzle.prototype.InitMovesOld = function() {
  var move0, move1, pieceSetMove, pieceMove;
  corners = this.GetCorners();
  centers = this.GetCenters();
  edges = this.GetEdges();

  move0 = new Move();
  move0.Axis = [-1,0,0];
  move0.EndAngle = 90.0;
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Corners'] = pieceSetMove;
  pieceSetMove.AddPieces([0,4,6,2], [3,0,1,2], [0,0,0,0]);
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Centers'] = pieceSetMove;
  pieceSetMove.AddPieces([0], [0], [1]);
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Edges'] = pieceSetMove;
  pieceSetMove.AddPieces([1,6,2,5], [3,0,1,2], [0,0,0,0]);
  this.AddMove(move0);
  //this.Moves[0].PiecePairs.push([corners,0]);
  //this.Moves[0].PiecePairs.push([corners,4]);
  //this.Moves[0].PiecePairs.push([corners,6]);
  //this.Moves[0].PiecePairs.push([corners,2]);
  //this.Moves[0].PiecePairs.push([centers,0]);
  //this.Moves[0].PiecePairs.push([edges,1]);
  //this.Moves[0].PiecePairs.push([edges,6]);
  //this.Moves[0].PiecePairs.push([edges,2]);
  //this.Moves[0].PiecePairs.push([edges,5]);
  //this.Moves[0].Permutation = [3,0,1,2, 4, 8,5,6,7];

  move1 = new Move();
  move1.Axis = [-1,0,0];
  move1.EndAngle = -90.0;
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Corners'] = pieceSetMove;
  pieceSetMove.AddPieces([0,4,6,2], [1,2,3,0], [0,0,0,0]);
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Centers'] = pieceSetMove;
  pieceSetMove.AddPieces([0], [0], [3]);
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Edges'] = pieceSetMove;
  pieceSetMove.AddPieces([1,6,2,5], [1,2,3,0], [0,0,0,0]);
  this.AddMove(move1);
  //this.Moves[1].PiecePairs.push([corners,0]);
  //this.Moves[1].PiecePairs.push([corners,4]);
  //this.Moves[1].PiecePairs.push([corners,6]);
  //this.Moves[1].PiecePairs.push([corners,2]);
  //this.Moves[1].PiecePairs.push([centers,0]);
  //this.Moves[1].PiecePairs.push([edges,1]);
  //this.Moves[1].PiecePairs.push([edges,6]);
  //this.Moves[1].PiecePairs.push([edges,2]);
  //this.Moves[1].PiecePairs.push([edges,5]);
  //this.Moves[1].Permutation = [1,2,3,0, 4, 6,7,8,5];

  move0.Reverse = move1;
  move1.Reverse = move0;

  move0 = new Move();
  move0.Axis = [1,0,0];
  move0.EndAngle = 90.0;
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Corners'] = pieceSetMove;
  pieceSetMove.AddPieces([1,3,7,5], [3,0,1,2], [0,0,0,0]);
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Centers'] = pieceSetMove;
  pieceSetMove.AddPieces([1], [0], [1]);
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Edges'] = pieceSetMove;
  pieceSetMove.AddPieces([0,4,3,7], [3,0,1,2], [0,0,0,0]);
  this.AddMove(move0);
  //this.Moves[2].PiecePairs.push([corners,1]);
  //this.Moves[2].PiecePairs.push([corners,3]);
  //this.Moves[2].PiecePairs.push([corners,7]);
  //this.Moves[2].PiecePairs.push([corners,5]);
  //this.Moves[2].PiecePairs.push([centers,1]);
  //this.Moves[2].PiecePairs.push([edges,0]);
  //this.Moves[2].PiecePairs.push([edges,4]);
  //this.Moves[2].PiecePairs.push([edges,3]);
  //this.Moves[2].PiecePairs.push([edges,7]);
  //this.Moves[2].Permutation = [3,0,1,2, 4, 8,5,6,7];

  move1 = new Move();
  move1.Axis = [1,0,0];
  move1.EndAngle = -90.0;
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Corners'] = pieceSetMove;
  pieceSetMove.AddPieces([1,3,7,5], [1,2,3,0], [0,0,0,0]);
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Centers'] = pieceSetMove;
  pieceSetMove.AddPieces([1], [0], [3]);
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Edges'] = pieceSetMove;
  pieceSetMove.AddPieces([0,4,3,7], [1,2,3,0], [0,0,0,0]);
  this.AddMove(move1);
  //this.Moves[3].PiecePairs.push([corners,1]);
  //this.Moves[3].PiecePairs.push([corners,3]);
  //this.Moves[3].PiecePairs.push([corners,7]);
  //this.Moves[3].PiecePairs.push([corners,5]);
  //this.Moves[3].PiecePairs.push([centers,1]);
  //this.Moves[3].PiecePairs.push([edges,0]);
  //this.Moves[3].PiecePairs.push([edges,4]);
  //this.Moves[3].PiecePairs.push([edges,3]);
  //this.Moves[3].PiecePairs.push([edges,7]);
  //this.Moves[3].Permutation = [1,2,3,0, 4, 6,7,8,5];

  move0.Reverse = move1;
  move1.Reverse = move0;

  move0 = new Move();
  move0.Axis = [0,-1,0];
  move0.EndAngle = 90.0;
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Corners'] = pieceSetMove;
  pieceSetMove.AddPieces([0,1,5,4], [3,0,1,2], [0,0,0,0]);
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Centers'] = pieceSetMove;
  pieceSetMove.AddPieces([2], [0], [1]);
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Edges'] = pieceSetMove;
  pieceSetMove.AddPieces([2,10,3,11], [3,0,1,2], [0,0,0,0]);
  this.AddMove(move0);
  //this.Moves[4].PiecePairs.push([corners,0]);
  //this.Moves[4].PiecePairs.push([corners,1]);
  //this.Moves[4].PiecePairs.push([corners,5]);
  //this.Moves[4].PiecePairs.push([corners,4]);
  //this.Moves[4].PiecePairs.push([centers,2]);
  //this.Moves[4].PiecePairs.push([edges,2]);
  //this.Moves[4].PiecePairs.push([edges,10]);
  //this.Moves[4].PiecePairs.push([edges,3]);
  //this.Moves[4].PiecePairs.push([edges,11]);
  //this.Moves[4].Permutation = [3,0,1,2, 4, 8,5,6,7];

  move1 = new Move();
  move1.Axis = [0,-1,0];
  move1.EndAngle = -90.0;
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Corners'] = pieceSetMove;
  pieceSetMove.AddPieces([0,1,5,4], [1,2,3,0], [0,0,0,0]);
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Centers'] = pieceSetMove;
  pieceSetMove.AddPieces([2], [0], [3]);
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Edges'] = pieceSetMove;
  pieceSetMove.AddPieces([2,3,10,11], [1,2,3,0], [0,0,0,0]);
  this.AddMove(move1);
  //this.Moves[5].PiecePairs.push([corners,0]);
  //this.Moves[5].PiecePairs.push([corners,1]);
  //this.Moves[5].PiecePairs.push([corners,5]);
  //this.Moves[5].PiecePairs.push([corners,4]);
  //this.Moves[5].PiecePairs.push([centers,2]);
  //this.Moves[5].PiecePairs.push([edges,2]);
  //this.Moves[5].PiecePairs.push([edges,10]);
  //this.Moves[5].PiecePairs.push([edges,3]);
  //this.Moves[5].PiecePairs.push([edges,11]);
  //this.Moves[5].Permutation = [1,2,3,0, 4, 6,7,8,5];

  move0.Reverse = move1;
  move1.Reverse = move0;

  move0 = new Move();
  move0.Axis = [0,1,0];
  move0.EndAngle = 90.0;
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Corners'] = pieceSetMove;
  pieceSetMove.AddPieces([2,6,7,3], [3,0,1,2], [0,0,0,0]);
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Centers'] = pieceSetMove;
  pieceSetMove.AddPieces([3], [0], [1]);
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Edges'] = pieceSetMove;
  pieceSetMove.AddPieces([0,9,1,8], [3,0,1,2], [0,0,0,0]);
  this.AddMove(move0);
  //this.Moves[6].PiecePairs.push([corners,2]);
  //this.Moves[6].PiecePairs.push([corners,6]);
  //this.Moves[6].PiecePairs.push([corners,7]);
  //this.Moves[6].PiecePairs.push([corners,3]);
  //this.Moves[6].PiecePairs.push([centers,3]);
  //this.Moves[6].PiecePairs.push([edges,0]);
  //this.Moves[6].PiecePairs.push([edges,9]);
  //this.Moves[6].PiecePairs.push([edges,1]);
  //this.Moves[6].PiecePairs.push([edges,8]);
  //this.Moves[6].Permutation = [3,0,1,2, 4, 8,5,6,7];

  move1 = new Move();
  move1.Axis = [0,1,0];
  move1.EndAngle = -90.0;
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Corners'] = pieceSetMove;
  pieceSetMove.AddPieces([2,6,7,3], [1,2,3,0], [0,0,0,0]);
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Centers'] = pieceSetMove;
  pieceSetMove.AddPieces([3], [0], [3]);
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Edges'] = pieceSetMove;
  pieceSetMove.AddPieces([0,9,1,8], [1,2,3,0], [0,0,0,0]);
  this.AddMove(move1);
  //this.Moves[7].PiecePairs.push([corners,2]);
  //this.Moves[7].PiecePairs.push([corners,6]);
  //this.Moves[7].PiecePairs.push([corners,7]);
  //this.Moves[7].PiecePairs.push([corners,3]);
  //this.Moves[7].PiecePairs.push([centers,3]);
  //this.Moves[7].PiecePairs.push([edges,0]);
  //this.Moves[7].PiecePairs.push([edges,9]);
  //this.Moves[7].PiecePairs.push([edges,1]);
  //this.Moves[7].PiecePairs.push([edges,8]);
  //this.Moves[7].Permutation = [1,2,3,0, 4, 6,7,8,5];

  move0.Reverse = move1;
  move1.Reverse = move0;

  move0 = new Move();
  move0.Axis = [0,0,-1];
  move0.EndAngle = 90.0;
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Corners'] = pieceSetMove;
  pieceSetMove.AddPieces([0,2,3,1], [3,0,1,2], [0,0,0,0]);
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Centers'] = pieceSetMove;
  pieceSetMove.AddPieces([4], [0], [1]);
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Edges'] = pieceSetMove;
  pieceSetMove.AddPieces([6,9,7,10], [3,0,1,2], [0,0,0,0]);
  this.AddMove(move0);
  //this.Moves[8].PiecePairs.push([corners,0]);
  //this.Moves[8].PiecePairs.push([corners,2]);
  //this.Moves[8].PiecePairs.push([corners,3]);
  //this.Moves[8].PiecePairs.push([corners,1]);
  //this.Moves[8].PiecePairs.push([centers,4]);
  //this.Moves[8].PiecePairs.push([edges,6]);
  //this.Moves[8].PiecePairs.push([edges,9]);
  //this.Moves[8].PiecePairs.push([edges,7]);
  //this.Moves[8].PiecePairs.push([edges,10]);
  //this.Moves[8].Permutation = [3,0,1,2, 4, 8,5,6,7];

  move1 = new Move();
  move1.Axis = [0,0,-1];
  move1.EndAngle = -90.0;
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Corners'] = pieceSetMove;
  pieceSetMove.AddPieces([0,2,3,1], [1,2,3,0], [0,0,0,0]);
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Centers'] = pieceSetMove;
  pieceSetMove.AddPieces([4], [0], [3]);
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Edges'] = pieceSetMove;
  pieceSetMove.AddPieces([6,9,7,10], [1,2,3,0], [0,0,0,0]);
  this.AddMove(move1);
  //this.Moves[9].PiecePairs.push([corners,0]);
  //this.Moves[9].PiecePairs.push([corners,2]);
  //this.Moves[9].PiecePairs.push([corners,3]);
  //this.Moves[9].PiecePairs.push([corners,1]);
  //this.Moves[9].PiecePairs.push([centers,4]);
  //this.Moves[9].PiecePairs.push([edges,6]);
  //this.Moves[9].PiecePairs.push([edges,9]);
  //this.Moves[9].PiecePairs.push([edges,7]);
  //this.Moves[9].PiecePairs.push([edges,10]);
  //this.Moves[9].Permutation = [1,2,3,0, 4, 6,7,8,5];

  move0.Reverse = move1;
  move1.Reverse = move0;

  move0 = new Move();
  move0.Axis = [0,0,1];
  move0.EndAngle = 90.0;
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Corners'] = pieceSetMove;
  pieceSetMove.AddPieces([4,5,7,6], [3,0,1,2], [0,0,0,0]);
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Centers'] = pieceSetMove;
  pieceSetMove.AddPieces([5], [0], [1]);
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Edges'] = pieceSetMove;
  pieceSetMove.AddPieces([4,8,5,11], [3,0,1,2], [0,0,0,0]);
  this.AddMove(move0);
  //this.Moves[10].PiecePairs.push([corners,4]);
  //this.Moves[10].PiecePairs.push([corners,5]);
  //this.Moves[10].PiecePairs.push([corners,7]);
  //this.Moves[10].PiecePairs.push([corners,6]);
  //this.Moves[10].PiecePairs.push([centers,5]);
  //this.Moves[10].PiecePairs.push([edges,4]);
  //this.Moves[10].PiecePairs.push([edges,8]);
  //this.Moves[10].PiecePairs.push([edges,5]);
  //this.Moves[10].PiecePairs.push([edges,11]);
  //this.Moves[10].Permutation = [3,0,1,2, 4, 8,5,6,7];

  move1 = new Move();
  move1.Axis = [0,0,1];
  move1.EndAngle = -90.0;
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Corners'] = pieceSetMove;
  pieceSetMove.AddPieces([4,5,7,6], [1,2,3,0], [0,0,0,0]);
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Centers'] = pieceSetMove;
  pieceSetMove.AddPieces([5], [0], [3]);
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Edges'] = pieceSetMove;
  pieceSetMove.AddPieces([4,8,5,11], [1,2,3,0], [0,0,0,0]);
  this.AddMove(move1);
  //this.Moves[11].PiecePairs.push([corners,4]);
  //this.Moves[11].PiecePairs.push([corners,5]);
  //this.Moves[11].PiecePairs.push([corners,7]);
  //this.Moves[11].PiecePairs.push([corners,6]);
  //this.Moves[11].PiecePairs.push([centers,5]);
  //this.Moves[11].PiecePairs.push([edges,4]);
  //this.Moves[11].PiecePairs.push([edges,8]);
  //this.Moves[11].PiecePairs.push([edges,5]);
  //this.Moves[11].PiecePairs.push([edges,11]);
  //this.Moves[11].Permutation = [1,2,3,0, 4, 6,7,8,5];

  move0.Reverse = move1;
  move1.Reverse = move0;

  move0 = new Move();
  move0.Axis = [1,0,0];
  move0.EndAngle = 90.0;
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Centers'] = pieceSetMove;
  pieceSetMove.AddPieces([2,4,3,5], [3,0,1,2], [0,0,0,0]);
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Edges'] = pieceSetMove;
  pieceSetMove.AddPieces([8,11,10,9], [3,0,1,2], [0,0,0,0]);
  this.AddMove(move0);
  //this.Moves[12].PiecePairs.push([centers,2]);
  //this.Moves[12].PiecePairs.push([centers,4]);
  //this.Moves[12].PiecePairs.push([centers,3]);
  //this.Moves[12].PiecePairs.push([centers,5]);
  //this.Moves[12].PiecePairs.push([edges,8]);
  //this.Moves[12].PiecePairs.push([edges,11]);
  //this.Moves[12].PiecePairs.push([edges,10]);
  //this.Moves[12].PiecePairs.push([edges,9]);
  //this.Moves[12].Permutation = [3,0,1,2, 7,4,5,6];

  move1 = new Move();
  move1.Axis = [1,0,0];
  move1.EndAngle = -90.0;
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Centers'] = pieceSetMove;
  pieceSetMove.AddPieces([2,4,3,5], [1,2,3,0], [0,0,0,0]);
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Edges'] = pieceSetMove;
  pieceSetMove.AddPieces([8,11,10,9], [1,2,3,0], [0,0,0,0]);
  this.AddMove(move1);
  //this.Moves[13].PiecePairs.push([centers,2]);
  //this.Moves[13].PiecePairs.push([centers,4]);
  //this.Moves[13].PiecePairs.push([centers,3]);
  //this.Moves[13].PiecePairs.push([centers,5]);
  //this.Moves[13].PiecePairs.push([edges,8]);
  //this.Moves[13].PiecePairs.push([edges,11]);
  //this.Moves[13].PiecePairs.push([edges,10]);
  //this.Moves[13].PiecePairs.push([edges,9]);
  //this.Moves[13].Permutation = [1,2,3,0, 5,6,7,4];

  move0.Reverse = move1;
  move1.Reverse = move0;

  move0 = new Move();
  move0.Axis = [0,1,0];
  move0.EndAngle = 90.0;
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Centers'] = pieceSetMove;
  pieceSetMove.AddPieces([0,5,1,4], [3,0,1,2], [0,0,0,0]);
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Edges'] = pieceSetMove;
  pieceSetMove.AddPieces([7,6,5,4], [3,0,1,2], [0,0,0,0]);
  this.AddMove(move0);
  //this.Moves[14].PiecePairs.push([centers,0]);
  //this.Moves[14].PiecePairs.push([centers,5]);
  //this.Moves[14].PiecePairs.push([centers,1]);
  //this.Moves[14].PiecePairs.push([centers,4]);
  //this.Moves[14].PiecePairs.push([edges,7]);
  //this.Moves[14].PiecePairs.push([edges,6]);
  //this.Moves[14].PiecePairs.push([edges,5]);
  //this.Moves[14].PiecePairs.push([edges,4]);
  //this.Moves[14].Permutation = [3,0,1,2, 7,4,5,6];

  move1 = new Move();
  move1.Axis = [0,1,0];
  move1.EndAngle = -90.0;
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Centers'] = pieceSetMove;
  pieceSetMove.AddPieces([0,5,1,4], [1,2,3,0], [0,0,0,0]);
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Edges'] = pieceSetMove;
  pieceSetMove.AddPieces([7,6,5,4], [1,2,3,0], [0,0,0,0]);
  this.AddMove(move1);
  //this.Moves[15].PiecePairs.push([centers,0]);
  //this.Moves[15].PiecePairs.push([centers,5]);
  //this.Moves[15].PiecePairs.push([centers,1]);
  //this.Moves[15].PiecePairs.push([centers,4]);
  //this.Moves[15].PiecePairs.push([edges,7]);
  //this.Moves[15].PiecePairs.push([edges,6]);
  //this.Moves[15].PiecePairs.push([edges,5]);
  //this.Moves[15].PiecePairs.push([edges,4]);
  //this.Moves[15].Permutation = [1,2,3,0, 5,6,7,4];

  move0.Reverse = move1;
  move1.Reverse = move0;

  move0 = new Move();
  move0.Axis = [0,0,1];
  move0.EndAngle = 90.0;
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Centers'] = pieceSetMove;
  pieceSetMove.AddPieces([0,2,1,3], [3,0,1,2], [0,0,0,0]);
  pieceSetMove = new PieceSetMove();
  move0.PermucationData['Edges'] = pieceSetMove;
  pieceSetMove.AddPieces([0,1,2,3], [3,0,1,2], [0,0,0,0]);
  this.AddMove(move0);
  //this.Moves[16].PiecePairs.push([centers,0]);
  //this.Moves[16].PiecePairs.push([centers,2]);
  //this.Moves[16].PiecePairs.push([centers,1]);
  //this.Moves[16].PiecePairs.push([centers,3]);
  //this.Moves[16].PiecePairs.push([edges,0]);
  //this.Moves[16].PiecePairs.push([edges,1]);
  //this.Moves[16].PiecePairs.push([edges,2]);
  //this.Moves[16].PiecePairs.push([edges,3]);
  //this.Moves[16].Permutation = [3,0,1,2, 7,4,5,6];

  move1 = new Move();
  move1.Axis = [0,0,1];
  move1.EndAngle = -90.0;
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Centers'] = pieceSetMove;
  pieceSetMove.AddPieces([0,2,1,3], [1,2,3,0], [0,0,0,0]);
  pieceSetMove = new PieceSetMove();
  move1.PermucationData['Edges'] = pieceSetMove;
  pieceSetMove.AddPieces([0,1,2,3], [1,2,3,0], [0,0,0,0]);
  this.AddMove(move1);
  //this.Moves[17].PiecePairs.push([centers,0]);
  //this.Moves[17].PiecePairs.push([centers,2]);
  //this.Moves[17].PiecePairs.push([centers,1]);
  //this.Moves[17].PiecePairs.push([centers,3]);
  //this.Moves[17].PiecePairs.push([edges,0]);
  //this.Moves[17].PiecePairs.push([edges,1]);
  //this.Moves[17].PiecePairs.push([edges,2]);
  //this.Moves[17].PiecePairs.push([edges,3]);
  //this.Moves[17].Permutation = [1,2,3,0, 5,6,7,4];

  move0.Reverse = move1;
  move1.Reverse = move0;
}


