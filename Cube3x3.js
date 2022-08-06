//TODO
// - Partial score for correct position but not orientation
//  - push and pop puzzle state
//  - greedy search to solve a puzzle.
//  - remove duplicate sequences.



function Puzzle() {
  this.Moves = [];
  this.Sequences = [];
  this.Symmetries = [];
  
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
  this.InitSequences();
  this.InitSymmetries();
  this.ExpandSequences();
  this.RecordSolution();
}

// Internal naming of array elements
Puzzle.prototype.GetCorners = function(){
  return this.PieceSets[0];
}
Puzzle.prototype.GetCenters = function(){
  return this.PieceSets[1];
}
Puzzle.prototype.GetEdges = function(){
  return this.PieceSets[2];
}


Puzzle.prototype.InitCamera = function(camera){
  // Each puzzle has a differnt starting view
  camera.ViewPlaneNormal = [0,0,1];
  camera.Up = [0,1,0];
  camera.Right = [1,0,0];

  camera.Height = 3.6;
  camera.ComputeMatrix();
}

Puzzle.prototype.InitBuffers = function() {
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


Puzzle.prototype.InitPieces = function() {
  corners = this.GetCorners();
  centers = this.GetCenters();
  edges = this.GetEdges();

  corners.Pieces[0] = new Piece("CubeImages/Corner0.jpg");
  corners.Pieces[0].RotateY(1);
  corners.Pieces[0].RotateX(1);
  corners.Pieces[0].RotateZ(1);
  corners.Pieces[1] = new Piece("CubeImages/Corner1.jpg");
  corners.Pieces[1].RotateX(1);
  corners.Pieces[1].RotateX(1);
  corners.Pieces[2] = new Piece("CubeImages/Corner2.jpg");
  corners.Pieces[2].RotateY(1);
  corners.Pieces[2].RotateY(1);
  corners.Pieces[3] = new Piece("CubeImages/Corner3.jpg");
  corners.Pieces[3].RotateX(-1);
  corners.Pieces[4] = new Piece("CubeImages/Corner4.jpg");
  corners.Pieces[4].RotateY(1);
  corners.Pieces[4].RotateX(1);
  corners.Pieces[5] = new Piece("CubeImages/Corner5.jpg");
  corners.Pieces[5].RotateX(1);
  corners.Pieces[6] = new Piece("CubeImages/Corner6.jpg");
  corners.Pieces[6].RotateY(1);
  corners.Pieces[7] = new Piece("CubeImages/Corner7.jpg");

  centers.Pieces[0] = new Piece("CubeImages/Center0.jpg");
  centers.Pieces[0].RotateY(1);
  centers.Pieces[0].RotateY(1);
  centers.Pieces[1] = new Piece("CubeImages/Center1.jpg");
  centers.Pieces[2] = new Piece("CubeImages/Center2.jpg");
  centers.Pieces[2].RotateZ(-1);
  centers.Pieces[3] = new Piece("CubeImages/Center3.jpg");
  centers.Pieces[3].RotateZ(1);
  centers.Pieces[4] = new Piece("CubeImages/Center4.jpg");
  centers.Pieces[4].RotateY(-1);
  centers.Pieces[5] = new Piece("CubeImages/Center5.jpg");
  centers.Pieces[5].RotateY(1);

  edges.Pieces[0] = new Piece("CubeImages/Edge0.jpg");
  edges.Pieces[1] = new Piece("CubeImages/Edge1.jpg");
  edges.Pieces[1].RotateZ(1);
  edges.Pieces[2] = new Piece("CubeImages/Edge2.jpg");
  edges.Pieces[2].RotateZ(1);
  edges.Pieces[2].RotateZ(1);
  edges.Pieces[3] = new Piece("CubeImages/Edge3.jpg");
  edges.Pieces[3].RotateZ(-1);
  edges.Pieces[4] = new Piece("CubeImages/Edge4.jpg");
  edges.Pieces[4].RotateX(1);
  edges.Pieces[5] = new Piece("CubeImages/Edge5.jpg");
  edges.Pieces[5].RotateY(1);
  edges.Pieces[5].RotateX(1);
  edges.Pieces[6] = new Piece("CubeImages/Edge6.jpg");
  edges.Pieces[6].RotateZ(1);
  edges.Pieces[6].RotateY(-1);
  edges.Pieces[7] = new Piece("CubeImages/Edge7.jpg");
  edges.Pieces[7].RotateX(-1);
  edges.Pieces[8] = new Piece("CubeImages/Edge8.jpg");
  edges.Pieces[8].RotateY(1);
  edges.Pieces[9] = new Piece("CubeImages/Edge9.jpg");
  edges.Pieces[9].RotateY(-1);
  edges.Pieces[10] = new Piece("CubeImages/Edge10.jpg");
  edges.Pieces[10].RotateX(-1);
  edges.Pieces[10].RotateY(-1);
  edges.Pieces[11] = new Piece("CubeImages/Edge11.jpg");
  edges.Pieces[11].RotateX(1);
  edges.Pieces[11].RotateY(1);
}


Puzzle.prototype.InitMoves = function() {
  corners = this.GetCorners();
  centers = this.GetCenters();
  edges = this.GetEdges();

  this.Moves[0] = new Move();
  this.Moves[0].Axis = [-1,0,0];
  this.Moves[0].EndAngle = 90.0;
  this.Moves[0].PiecePairs.push([corners,0]);
  this.Moves[0].PiecePairs.push([corners,4]);
  this.Moves[0].PiecePairs.push([corners,6]);
  this.Moves[0].PiecePairs.push([corners,2]);
  this.Moves[0].PiecePairs.push([centers,0]);
  this.Moves[0].PiecePairs.push([edges,1]);
  this.Moves[0].PiecePairs.push([edges,6]);
  this.Moves[0].PiecePairs.push([edges,2]);
  this.Moves[0].PiecePairs.push([edges,5]);
  this.Moves[0].Permutation = [3,0,1,2, 4, 8,5,6,7];

  this.Moves[1] = new Move();
  this.Moves[1].Axis = [-1,0,0];
  this.Moves[1].EndAngle = -90.0;
  this.Moves[1].PiecePairs.push([corners,0]);
  this.Moves[1].PiecePairs.push([corners,4]);
  this.Moves[1].PiecePairs.push([corners,6]);
  this.Moves[1].PiecePairs.push([corners,2]);
  this.Moves[1].PiecePairs.push([centers,0]);
  this.Moves[1].PiecePairs.push([edges,1]);
  this.Moves[1].PiecePairs.push([edges,6]);
  this.Moves[1].PiecePairs.push([edges,2]);
  this.Moves[1].PiecePairs.push([edges,5]);
  this.Moves[1].Permutation = [1,2,3,0, 4, 6,7,8,5];

  this.Moves[0].Reverse = this.Moves[1];
  this.Moves[1].Reverse = this.Moves[0];

  this.Moves[2] = new Move();
  this.Moves[2].Axis = [1,0,0];
  this.Moves[2].EndAngle = 90.0;
  this.Moves[2].PiecePairs.push([corners,1]);
  this.Moves[2].PiecePairs.push([corners,3]);
  this.Moves[2].PiecePairs.push([corners,7]);
  this.Moves[2].PiecePairs.push([corners,5]);
  this.Moves[2].PiecePairs.push([centers,1]);
  this.Moves[2].PiecePairs.push([edges,0]);
  this.Moves[2].PiecePairs.push([edges,4]);
  this.Moves[2].PiecePairs.push([edges,3]);
  this.Moves[2].PiecePairs.push([edges,7]);
  this.Moves[2].Permutation = [3,0,1,2, 4, 8,5,6,7];

  this.Moves[3] = new Move();
  this.Moves[3].Axis = [1,0,0];
  this.Moves[3].EndAngle = -90.0;
  this.Moves[3].PiecePairs.push([corners,1]);
  this.Moves[3].PiecePairs.push([corners,3]);
  this.Moves[3].PiecePairs.push([corners,7]);
  this.Moves[3].PiecePairs.push([corners,5]);
  this.Moves[3].PiecePairs.push([centers,1]);
  this.Moves[3].PiecePairs.push([edges,0]);
  this.Moves[3].PiecePairs.push([edges,4]);
  this.Moves[3].PiecePairs.push([edges,3]);
  this.Moves[3].PiecePairs.push([edges,7]);
  this.Moves[3].Permutation = [1,2,3,0, 4, 6,7,8,5];

  this.Moves[2].Reverse = this.Moves[3];
  this.Moves[3].Reverse = this.Moves[2];

  this.Moves[4] = new Move();
  this.Moves[4].Axis = [0,-1,0];
  this.Moves[4].EndAngle = 90.0;
  this.Moves[4].PiecePairs.push([corners,0]);
  this.Moves[4].PiecePairs.push([corners,1]);
  this.Moves[4].PiecePairs.push([corners,5]);
  this.Moves[4].PiecePairs.push([corners,4]);
  this.Moves[4].PiecePairs.push([centers,2]);
  this.Moves[4].PiecePairs.push([edges,2]);
  this.Moves[4].PiecePairs.push([edges,10]);
  this.Moves[4].PiecePairs.push([edges,3]);
  this.Moves[4].PiecePairs.push([edges,11]);
  this.Moves[4].Permutation = [3,0,1,2, 4, 8,5,6,7];

  this.Moves[5] = new Move();
  this.Moves[5].Axis = [0,-1,0];
  this.Moves[5].EndAngle = -90.0;
  this.Moves[5].PiecePairs.push([corners,0]);
  this.Moves[5].PiecePairs.push([corners,1]);
  this.Moves[5].PiecePairs.push([corners,5]);
  this.Moves[5].PiecePairs.push([corners,4]);
  this.Moves[5].PiecePairs.push([centers,2]);
  this.Moves[5].PiecePairs.push([edges,2]);
  this.Moves[5].PiecePairs.push([edges,10]);
  this.Moves[5].PiecePairs.push([edges,3]);
  this.Moves[5].PiecePairs.push([edges,11]);
  this.Moves[5].Permutation = [1,2,3,0, 4, 6,7,8,5];

  this.Moves[4].Reverse = this.Moves[5];
  this.Moves[5].Reverse = this.Moves[4];

  this.Moves[6] = new Move();
  this.Moves[6].Axis = [0,1,0];
  this.Moves[6].EndAngle = 90.0;
  this.Moves[6].PiecePairs.push([corners,2]);
  this.Moves[6].PiecePairs.push([corners,6]);
  this.Moves[6].PiecePairs.push([corners,7]);
  this.Moves[6].PiecePairs.push([corners,3]);
  this.Moves[6].PiecePairs.push([centers,3]);
  this.Moves[6].PiecePairs.push([edges,0]);
  this.Moves[6].PiecePairs.push([edges,9]);
  this.Moves[6].PiecePairs.push([edges,1]);
  this.Moves[6].PiecePairs.push([edges,8]);
  this.Moves[6].Permutation = [3,0,1,2, 4, 8,5,6,7];

  this.Moves[7] = new Move();
  this.Moves[7].Axis = [0,1,0];
  this.Moves[7].EndAngle = -90.0;
  this.Moves[7].PiecePairs.push([corners,2]);
  this.Moves[7].PiecePairs.push([corners,6]);
  this.Moves[7].PiecePairs.push([corners,7]);
  this.Moves[7].PiecePairs.push([corners,3]);
  this.Moves[7].PiecePairs.push([centers,3]);
  this.Moves[7].PiecePairs.push([edges,0]);
  this.Moves[7].PiecePairs.push([edges,9]);
  this.Moves[7].PiecePairs.push([edges,1]);
  this.Moves[7].PiecePairs.push([edges,8]);
  this.Moves[7].Permutation = [1,2,3,0, 4, 6,7,8,5];

  this.Moves[6].Reverse = this.Moves[7];
  this.Moves[7].Reverse = this.Moves[6];

  this.Moves[8] = new Move();
  this.Moves[8].Axis = [0,0,-1];
  this.Moves[8].EndAngle = 90.0;
  this.Moves[8].PiecePairs.push([corners,0]);
  this.Moves[8].PiecePairs.push([corners,2]);
  this.Moves[8].PiecePairs.push([corners,3]);
  this.Moves[8].PiecePairs.push([corners,1]);
  this.Moves[8].PiecePairs.push([centers,4]);
  this.Moves[8].PiecePairs.push([edges,6]);
  this.Moves[8].PiecePairs.push([edges,9]);
  this.Moves[8].PiecePairs.push([edges,7]);
  this.Moves[8].PiecePairs.push([edges,10]);
  this.Moves[8].Permutation = [3,0,1,2, 4, 8,5,6,7];

  this.Moves[9] = new Move();
  this.Moves[9].Axis = [0,0,-1];
  this.Moves[9].EndAngle = -90.0;
  this.Moves[9].PiecePairs.push([corners,0]);
  this.Moves[9].PiecePairs.push([corners,2]);
  this.Moves[9].PiecePairs.push([corners,3]);
  this.Moves[9].PiecePairs.push([corners,1]);
  this.Moves[9].PiecePairs.push([centers,4]);
  this.Moves[9].PiecePairs.push([edges,6]);
  this.Moves[9].PiecePairs.push([edges,9]);
  this.Moves[9].PiecePairs.push([edges,7]);
  this.Moves[9].PiecePairs.push([edges,10]);
  this.Moves[9].Permutation = [1,2,3,0, 4, 6,7,8,5];

  this.Moves[8].Reverse = this.Moves[9];
  this.Moves[9].Reverse = this.Moves[8];

  this.Moves[10] = new Move();
  this.Moves[10].Axis = [0,0,1];
  this.Moves[10].EndAngle = 90.0;
  this.Moves[10].PiecePairs.push([corners,4]);
  this.Moves[10].PiecePairs.push([corners,5]);
  this.Moves[10].PiecePairs.push([corners,7]);
  this.Moves[10].PiecePairs.push([corners,6]);
  this.Moves[10].PiecePairs.push([centers,5]);
  this.Moves[10].PiecePairs.push([edges,4]);
  this.Moves[10].PiecePairs.push([edges,8]);
  this.Moves[10].PiecePairs.push([edges,5]);
  this.Moves[10].PiecePairs.push([edges,11]);
  this.Moves[10].Permutation = [3,0,1,2, 4, 8,5,6,7];

  this.Moves[11] = new Move();
  this.Moves[11].Axis = [0,0,1];
  this.Moves[11].EndAngle = -90.0;
  this.Moves[11].PiecePairs.push([corners,4]);
  this.Moves[11].PiecePairs.push([corners,5]);
  this.Moves[11].PiecePairs.push([corners,7]);
  this.Moves[11].PiecePairs.push([corners,6]);
  this.Moves[11].PiecePairs.push([centers,5]);
  this.Moves[11].PiecePairs.push([edges,4]);
  this.Moves[11].PiecePairs.push([edges,8]);
  this.Moves[11].PiecePairs.push([edges,5]);
  this.Moves[11].PiecePairs.push([edges,11]);
  this.Moves[11].Permutation = [1,2,3,0, 4, 6,7,8,5];

  this.Moves[10].Reverse = this.Moves[11];
  this.Moves[11].Reverse = this.Moves[10];

  this.Moves[12] = new Move();
  this.Moves[12].Axis = [1,0,0];
  this.Moves[12].EndAngle = 90.0;
  this.Moves[12].PiecePairs.push([centers,2]);
  this.Moves[12].PiecePairs.push([centers,4]);
  this.Moves[12].PiecePairs.push([centers,3]);
  this.Moves[12].PiecePairs.push([centers,5]);
  this.Moves[12].PiecePairs.push([edges,8]);
  this.Moves[12].PiecePairs.push([edges,11]);
  this.Moves[12].PiecePairs.push([edges,10]);
  this.Moves[12].PiecePairs.push([edges,9]);
  this.Moves[12].Permutation = [3,0,1,2, 7,4,5,6];

  this.Moves[13] = new Move();
  this.Moves[13].Axis = [1,0,0];
  this.Moves[13].EndAngle = -90.0;
  this.Moves[13].PiecePairs.push([centers,2]);
  this.Moves[13].PiecePairs.push([centers,4]);
  this.Moves[13].PiecePairs.push([centers,3]);
  this.Moves[13].PiecePairs.push([centers,5]);
  this.Moves[13].PiecePairs.push([edges,8]);
  this.Moves[13].PiecePairs.push([edges,11]);
  this.Moves[13].PiecePairs.push([edges,10]);
  this.Moves[13].PiecePairs.push([edges,9]);
  this.Moves[13].Permutation = [1,2,3,0, 5,6,7,4];

  this.Moves[12].Reverse = this.Moves[13];
  this.Moves[13].Reverse = this.Moves[12];

  this.Moves[14] = new Move();
  this.Moves[14].Axis = [0,1,0];
  this.Moves[14].EndAngle = 90.0;
  this.Moves[14].PiecePairs.push([centers,0]);
  this.Moves[14].PiecePairs.push([centers,5]);
  this.Moves[14].PiecePairs.push([centers,1]);
  this.Moves[14].PiecePairs.push([centers,4]);
  this.Moves[14].PiecePairs.push([edges,7]);
  this.Moves[14].PiecePairs.push([edges,6]);
  this.Moves[14].PiecePairs.push([edges,5]);
  this.Moves[14].PiecePairs.push([edges,4]);
  this.Moves[14].Permutation = [3,0,1,2, 7,4,5,6];

  this.Moves[15] = new Move();
  this.Moves[15].Axis = [0,1,0];
  this.Moves[15].EndAngle = -90.0;
  this.Moves[15].PiecePairs.push([centers,0]);
  this.Moves[15].PiecePairs.push([centers,5]);
  this.Moves[15].PiecePairs.push([centers,1]);
  this.Moves[15].PiecePairs.push([centers,4]);
  this.Moves[15].PiecePairs.push([edges,7]);
  this.Moves[15].PiecePairs.push([edges,6]);
  this.Moves[15].PiecePairs.push([edges,5]);
  this.Moves[15].PiecePairs.push([edges,4]);
  this.Moves[15].Permutation = [1,2,3,0, 5,6,7,4];

  this.Moves[14].Reverse = this.Moves[15];
  this.Moves[15].Reverse = this.Moves[14];

  this.Moves[16] = new Move();
  this.Moves[16].Axis = [0,0,1];
  this.Moves[16].EndAngle = 90.0;
  this.Moves[16].PiecePairs.push([centers,0]);
  this.Moves[16].PiecePairs.push([centers,2]);
  this.Moves[16].PiecePairs.push([centers,1]);
  this.Moves[16].PiecePairs.push([centers,3]);
  this.Moves[16].PiecePairs.push([edges,0]);
  this.Moves[16].PiecePairs.push([edges,1]);
  this.Moves[16].PiecePairs.push([edges,2]);
  this.Moves[16].PiecePairs.push([edges,3]);
  this.Moves[16].Permutation = [3,0,1,2, 7,4,5,6];

  this.Moves[17] = new Move();
  this.Moves[17].Axis = [0,0,1];
  this.Moves[17].EndAngle = -90.0;
  this.Moves[17].PiecePairs.push([centers,0]);
  this.Moves[17].PiecePairs.push([centers,2]);
  this.Moves[17].PiecePairs.push([centers,1]);
  this.Moves[17].PiecePairs.push([centers,3]);
  this.Moves[17].PiecePairs.push([edges,0]);
  this.Moves[17].PiecePairs.push([edges,1]);
  this.Moves[17].PiecePairs.push([edges,2]);
  this.Moves[17].PiecePairs.push([edges,3]);
  this.Moves[17].Permutation = [1,2,3,0, 5,6,7,4];

  this.Moves[16].Reverse = this.Moves[17];
  this.Moves[17].Reverse = this.Moves[16];

  for (idx = 0; idx < this.Moves.length; ++idx) {
    this.Moves[idx].Id = idx;
  }
}


Puzzle.prototype.InitSequences = function() {
  seq_info = [[11, 4, 10, 4, 2, 5, 3],
	      // Rotate two corners
	      [2, 5, 3, 4, 2, 5, 3, 7, 2, 4, 3, 5, 2, 4, 3, 6],
	      [2, 5, 3, 4, 2, 5, 3, 7, 7, 2, 4, 3, 5, 2, 4, 3, 6, 6],
	      // Permute 3 corners
	      [1, 2, 5, 3, 4, 0, 7, 1, 5, 2, 4, 3, 0, 6],
	      // Rotate two edges
	      [12, 5, 13, 4, 12, 4, 4, 13, 7, 12, 5, 5, 13, 5, 12, 4, 13, 6],
	      [12, 5, 13, 4, 12, 4, 4, 13, 7, 7, 12, 5, 5, 13, 5, 12, 4, 13, 6, 6],
	      // Permute three edges
	      [12, 17, 5, 16, 4, 4, 13, 7, 12, 5, 5, 17, 4, 16, 13, 6],
	      // Rotate centers
	      [16, 2, 17, 12, 16, 3, 17, 13],
	      [16, 2, 2, 17, 12, 16, 3, 3, 17, 13],
	      [16, 2, 17, 12, 12, 16, 3, 17, 13, 13],
	      [16, 2, 2, 17, 13, 13, 16, 3, 3, 17, 13, 13]
	     ];

  for (seq_idx = 0; seq_idx < seq_info.length; ++seq_idx) {
    move_ids = seq_info[seq_idx];
    moves = [];
    for (move_idx = 0; move_idx < move_ids.length; ++move_idx) {
      moves.push(this.Moves[move_ids[move_idx]]);
    }
    seq = new Sequence(moves, null);
    seq.InitReverse();
    this.Sequences.push(seq);
  }
}

// Generate a list of puzzle symmetries.
// A symmetry is stored as a list of all moves.
Puzzle.prototype.InitSymmetries = function() {
  axesPermutations = [
    // Rotate Green
    [10,11, 8, 9, 4, 5, 6, 7, 0, 1, 2, 3,17,16,14,15,12,13],
    // Rotate Purple
    [ 0, 1, 2, 3,10,11, 8, 9, 4, 5, 6, 7,12,13,17,16,14,15],
    // Rotate Red
    [ 4, 5, 6, 7, 2, 3, 0, 1, 8, 9,10,11,14,15,13,12,16,17],
    // Flip Purple with Blue
    [ 3, 2, 1, 0, 5, 4, 7, 6, 9, 8,11,10,12,13,15,14,17,16]
  ];
  
  // Find all symmetries by applying simple axis rotations in combinations.
  this.Symmetries = [[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17]];
  modified = true;
  while (modified) {
    modified = false;
    for (s_idx = 0; s_idx < this.Symmetries.length; ++s_idx) {
      symmetry = this.Symmetries[s_idx];
      for (p_idx = 0; p_idx < axesPermutations.length; ++p_idx) {
	permutation = axesPermutations[p_idx];
	newSymmetry = this.PermuteMoves(symmetry, permutation);
	if (! this.TestForRepeat(newSymmetry)) {
	  this.Symmetries.push(newSymmetry);
	  modified = true;
	}
      }
    }
  }
}




//===============================================================================================================


// Temporary unit test while developing the code.
Puzzle.prototype.ExpandSequences = function() {
  seq = this.Sequences[0];
  for (sym_idx = 1; sym_idx < this.Symmetries.length; ++sym_idx) {
    symmetry = this.Symmetries[sym_idx];
    moves = []
    for (m_idx = 0; m_idx < seq.Moves.length; ++m_idx) {
      move_id = seq.Moves[m_idx].Id;
      move_id = symmetry[move_id]
      move = this.Moves[move_id]
      moves.push(move)
    }
    newSeq = new Sequence(moves, null)
    newSeq.InitReverse();
    this.Sequences.push(newSeq);
  }
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


Puzzle.prototype.RecordSolution = function() {
  for (var idx = 0; idx < this.PieceSets.length; ++idx) {
    this.PieceSets[idx].RecordSolution();
  }
}


Puzzle.prototype.ObjectiveFunction = function() {
  var count = 0;
  for (var idx = 0; idx < this.PieceSets.length; ++idx) {
    count += this.PieceSets[idx].ObjectiveFunction();
  }
  return count;
}


