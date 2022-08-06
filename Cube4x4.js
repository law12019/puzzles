
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
Puzzle.prototype.GetCenters = function(){
  return this.PieceSets[1];
}
Puzzle.prototype.GetEdges = function(){
  return this.PieceSets[2];
}


Puzzle.prototype.InitCamera = function(camera){
  camera.ViewPlaneNormal = [0,0,1];
  camera.Up = [0,1,0];
  camera.Right = [1,0,0];

  camera.Height = 4.8;
  camera.ComputeMatrix();
}

Puzzle.prototype.InitBuffers = function() {
  corners = this.GetCorners();
  centers = this.GetCenters();
  edges = this.GetEdges();

  corners.AddPoint(2.0, 2.0, 2.0, 0.50,0.50); //0
  corners.AddPoint(1.0, 2.0, 2.0, 0.01,0.50); //1
  corners.AddPoint(2.0, 1.0, 2.0, 0.50,0.01); //2
  corners.AddPoint(2.0, 2.0, 1.0, 0.99,0.99); //3
  corners.AddPoint(1.0, 1.0, 2.0, 0.01,0.01); //4
  corners.AddPoint(1.0, 2.0, 1.0, 0.01,0.99); //5
  corners.AddPoint(2.0, 1.0, 1.0, 0.99,0.01); //6
  corners.AddPoint(1.0, 1.0, 1.0, 0.00,0.50); //7
  corners.AddPoint(1.0, 1.0, 1.0, 0.50,0.00); //8
  corners.AddPoint(1.0, 1.0, 1.0, 1.00,1.00); //9
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

  centers.AddPoint(1.0, 0.0, 0.0, 0.00,0.00); 
  centers.AddPoint(2.0, 0.0, 0.0, 0.01,0.01); 
  centers.AddPoint(1.0, 1.0, 0.0, 1.00,0.00); 
  centers.AddPoint(2.0, 1.0, 0.0, 0.99,0.01); 
  centers.AddPoint(1.0, 0.0, 1.0, 0.00,1.00); 
  centers.AddPoint(2.0, 0.0, 1.0, 0.01,0.99); 
  centers.AddPoint(1.0, 1.0, 1.0, 1.00,1.00); 
  centers.AddPoint(2.0, 1.0, 1.0, 0.99,0.99); 
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

  edges.AddPoint(1.0, 1.0, 0.0, 0.00,0.50); 
  edges.AddPoint(2.0, 1.0, 0.0, 0.01,0.99); 
  edges.AddPoint(1.0, 2.0, 0.0, 0.01,0.01);//2 
  edges.AddPoint(2.0, 2.0, 0.0, 0.01,0.50); 
  edges.AddPoint(1.0, 1.0, 1.0, 1.00,0.50); 
  edges.AddPoint(2.0, 1.0, 1.0, 0.99,0.99); 
  edges.AddPoint(1.0, 2.0, 1.0, 0.99,0.01);//6 
  edges.AddPoint(2.0, 2.0, 1.0, 0.99,0.50); 
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
  centers.Pieces[1] = new Piece("CubeImages/Center0.jpg");
  centers.Pieces[1].RotateX(-1);
  centers.Pieces[1].RotateY(1);
  centers.Pieces[1].RotateY(1);
  centers.Pieces[2] = new Piece("CubeImages/Center0.jpg");
  centers.Pieces[2].RotateX(-1);
  centers.Pieces[2].RotateX(-1);
  centers.Pieces[2].RotateY(1);
  centers.Pieces[2].RotateY(1);
  centers.Pieces[3] = new Piece("CubeImages/Center0.jpg");
  centers.Pieces[3].RotateX(1);
  centers.Pieces[3].RotateY(1);
  centers.Pieces[3].RotateY(1);
  centers.Pieces[4] = new Piece("CubeImages/Center1.jpg");
  centers.Pieces[5] = new Piece("CubeImages/Center1.jpg");
  centers.Pieces[5].RotateX(1);
  centers.Pieces[6] = new Piece("CubeImages/Center1.jpg");
  centers.Pieces[6].RotateX(1);
  centers.Pieces[6].RotateX(1);
  centers.Pieces[7] = new Piece("CubeImages/Center1.jpg");
  centers.Pieces[7].RotateX(-1);
  centers.Pieces[8] = new Piece("CubeImages/Center2_10.jpg");
  centers.Pieces[8].RotateZ(-1);
  centers.Pieces[9] = new Piece("CubeImages/Center2_00.jpg");
  centers.Pieces[9].RotateY(1);
  centers.Pieces[9].RotateZ(-1);
  centers.Pieces[10] = new Piece("CubeImages/Center2_01.jpg");
  centers.Pieces[10].RotateY(1);
  centers.Pieces[10].RotateY(1);
  centers.Pieces[10].RotateZ(-1);
  centers.Pieces[11] = new Piece("CubeImages/Center2_11.jpg");
  centers.Pieces[11].RotateY(-1);
  centers.Pieces[11].RotateZ(-1);
  centers.Pieces[12] = new Piece("CubeImages/Center3.jpg");
  centers.Pieces[12].RotateZ(1);
  centers.Pieces[13] = new Piece("CubeImages/Center3.jpg");
  centers.Pieces[13].RotateY(-1);
  centers.Pieces[13].RotateZ(1);
  centers.Pieces[14] = new Piece("CubeImages/Center3.jpg");
  centers.Pieces[14].RotateY(-1);
  centers.Pieces[14].RotateY(-1);
  centers.Pieces[14].RotateZ(1);
  centers.Pieces[15] = new Piece("CubeImages/Center3.jpg");
  centers.Pieces[15].RotateY(1);
  centers.Pieces[15].RotateZ(1);
  centers.Pieces[16] = new Piece("CubeImages/Center4.jpg");
  centers.Pieces[16].RotateY(-1);
  centers.Pieces[17] = new Piece("CubeImages/Center4.jpg");
  centers.Pieces[17].RotateZ(-1);
  centers.Pieces[17].RotateY(-1);
  centers.Pieces[18] = new Piece("CubeImages/Center4.jpg");
  centers.Pieces[18].RotateZ(-1);
  centers.Pieces[18].RotateZ(-1);
  centers.Pieces[18].RotateY(-1);
  centers.Pieces[19] = new Piece("CubeImages/Center4.jpg");
  centers.Pieces[19].RotateZ(1);
  centers.Pieces[19].RotateY(-1);
  centers.Pieces[20] = new Piece("CubeImages/Center5.jpg");
  centers.Pieces[20].RotateY(1);
  centers.Pieces[21] = new Piece("CubeImages/Center5.jpg");
  centers.Pieces[21].RotateZ(1);
  centers.Pieces[21].RotateY(1);
  centers.Pieces[22] = new Piece("CubeImages/Center5.jpg");
  centers.Pieces[22].RotateZ(1);
  centers.Pieces[22].RotateZ(1);
  centers.Pieces[22].RotateY(1);
  centers.Pieces[23] = new Piece("CubeImages/Center5.jpg");
  centers.Pieces[23].RotateZ(-1);
  centers.Pieces[23].RotateY(1);

  edges.Pieces[0] = new Piece("CubeImages/Edge0.jpg");
  edges.Pieces[1] = new Piece("CubeImages/Edge0.jpg");
  //edges.Pieces[1].Reflect(1,1,-1);
  edges.Pieces[1].Translate(0,0,-1);

  edges.Pieces[2] = new Piece("CubeImages/Edge1.jpg");
  edges.Pieces[2].RotateZ(1);
  edges.Pieces[3] = new Piece("CubeImages/Edge1.jpg");
  //edges.Pieces[3].Reflect(1,1,-1);
  edges.Pieces[3].Translate(0,0,-1);
  edges.Pieces[3].RotateZ(1);

  edges.Pieces[4] = new Piece("CubeImages/Edge2.jpg");
  edges.Pieces[4].RotateZ(1);
  edges.Pieces[4].RotateZ(1);
  edges.Pieces[5] = new Piece("CubeImages/Edge2.jpg");
  //edges.Pieces[5].Reflect(1,1,-1);
  edges.Pieces[5].Translate(0,0,-1);
  edges.Pieces[5].RotateZ(1);
  edges.Pieces[5].RotateZ(1);

  edges.Pieces[6] = new Piece("CubeImages/Edge3.jpg");
  edges.Pieces[6].RotateZ(-1);
  edges.Pieces[7] = new Piece("CubeImages/Edge3.jpg");
  //edges.Pieces[7].Reflect(1,1,-1);
  edges.Pieces[7].Translate(0,0,-1);
  edges.Pieces[7].RotateZ(-1);

  edges.Pieces[8] = new Piece("CubeImages/Edge4.jpg");
  //edges.Pieces[8].Reflect(1,-1,1);
  edges.Pieces[8].Translate(0,1,0);
  edges.Pieces[8].RotateX(1);
  edges.Pieces[9] = new Piece("CubeImages/Edge4.jpg");
  edges.Pieces[9].RotateX(1);

  edges.Pieces[10] = new Piece("CubeImages/Edge5.jpg");
  //edges.Pieces[10].Reflect(1,-1,1);
  edges.Pieces[10].Translate(0,1,0);
  edges.Pieces[10].RotateY(1);
  edges.Pieces[10].RotateX(1);
  edges.Pieces[11] = new Piece("CubeImages/Edge5.jpg");    
  edges.Pieces[11].RotateY(1);
  edges.Pieces[11].RotateX(1);

  edges.Pieces[12] = new Piece("CubeImages/Edge6.jpg");
  edges.Pieces[12].RotateZ(1);
  edges.Pieces[12].RotateY(-1);
  edges.Pieces[13] = new Piece("CubeImages/Edge6.jpg");
  //edges.Pieces[13].Reflect(1,-1,1);
  edges.Pieces[13].Translate(0,-1,0);
  edges.Pieces[13].RotateZ(1);
  edges.Pieces[13].RotateY(-1);

  edges.Pieces[14] = new Piece("CubeImages/Edge7.jpg");
  edges.Pieces[14].RotateX(-1);
  edges.Pieces[15] = new Piece("CubeImages/Edge7.jpg");
  //edges.Pieces[15].Reflect(1,-1,1);
  edges.Pieces[15].Translate(0,-1,0);
  edges.Pieces[15].RotateX(-1);

  edges.Pieces[16] = new Piece("CubeImages/Edge8.jpg");
  //edges.Pieces[16].Reflect(-1,1,1);
  edges.Pieces[16].Translate(1,0,0);
  edges.Pieces[16].RotateY(1);
  edges.Pieces[17] = new Piece("CubeImages/Edge8.jpg");
  edges.Pieces[17].RotateY(1);

  edges.Pieces[18] = new Piece("CubeImages/Edge9.jpg");
  edges.Pieces[18].RotateY(-1);
  edges.Pieces[19] = new Piece("CubeImages/Edge9.jpg");
  //edges.Pieces[19].Reflect(-1,1,1);
  edges.Pieces[19].Translate(-1,0,0);
  edges.Pieces[19].RotateY(-1);

  edges.Pieces[20] = new Piece("CubeImages/Edge10.jpg");
  edges.Pieces[20].RotateX(-1);
  edges.Pieces[20].RotateY(-1);
  edges.Pieces[21] = new Piece("CubeImages/Edge10.jpg");
  //edges.Pieces[21].Reflect(-1,1,1);
  edges.Pieces[21].Translate(-1,0,0);
  edges.Pieces[21].RotateX(-1);
  edges.Pieces[21].RotateY(-1);

  edges.Pieces[22] = new Piece("CubeImages/Edge11.jpg");
  //edges.Pieces[22].Reflect(-1,1,1);
  edges.Pieces[22].Translate(1,0,0);
  edges.Pieces[22].RotateX(1);
  edges.Pieces[22].RotateY(1);
  edges.Pieces[23] = new Piece("CubeImages/Edge11.jpg");
  edges.Pieces[23].RotateX(1);
  edges.Pieces[23].RotateY(1);
}


Puzzle.prototype.InitMoves = function() {
  corners = this.GetCorners();
  centers = this.GetCenters();
  edges = this.GetEdges();

  // Face Moves
  this.Moves[0] = new Move();
  this.Moves[0].Axis = [-1,0,0];
  this.Moves[0].EndAngle = 90.0;
  this.Moves[0].PiecePairs.push([corners,0]);
  this.Moves[0].PiecePairs.push([corners,4]);
  this.Moves[0].PiecePairs.push([corners,6]);
  this.Moves[0].PiecePairs.push([corners,2]);
  this.Moves[0].PiecePairs.push([centers,0]);
  this.Moves[0].PiecePairs.push([centers,1]);
  this.Moves[0].PiecePairs.push([centers,2]);
  this.Moves[0].PiecePairs.push([centers,3]);
  this.Moves[0].PiecePairs.push([edges,2]);
  this.Moves[0].PiecePairs.push([edges,12]);
  this.Moves[0].PiecePairs.push([edges,5]);
  this.Moves[0].PiecePairs.push([edges,11]);
  this.Moves[0].PiecePairs.push([edges,3]);
  this.Moves[0].PiecePairs.push([edges,13]);
  this.Moves[0].PiecePairs.push([edges,4]);
  this.Moves[0].PiecePairs.push([edges,10]);
  this.Moves[0].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10, 15,12,13,14];

  this.Moves[1] = new Move();
  this.Moves[1].Axis = [-1,0,0];
  this.Moves[1].EndAngle = -90.0;
  this.Moves[1].PiecePairs.push([corners,0]);
  this.Moves[1].PiecePairs.push([corners,4]);
  this.Moves[1].PiecePairs.push([corners,6]);
  this.Moves[1].PiecePairs.push([corners,2]);
  this.Moves[1].PiecePairs.push([centers,0]);
  this.Moves[1].PiecePairs.push([centers,1]);
  this.Moves[1].PiecePairs.push([centers,2]);
  this.Moves[1].PiecePairs.push([centers,3]);
  this.Moves[1].PiecePairs.push([edges,2]);
  this.Moves[1].PiecePairs.push([edges,12]);
  this.Moves[1].PiecePairs.push([edges,5]);
  this.Moves[1].PiecePairs.push([edges,11]);
  this.Moves[1].PiecePairs.push([edges,3]);
  this.Moves[1].PiecePairs.push([edges,13]);
  this.Moves[1].PiecePairs.push([edges,4]);
  this.Moves[1].PiecePairs.push([edges,10]);
  this.Moves[1].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8, 13,14,15,12];

  this.Moves[0].Reverse = this.Moves[1];
  this.Moves[1].Reverse = this.Moves[0];

  this.Moves[2] = new Move();
  this.Moves[2].Axis = [1,0,0];
  this.Moves[2].EndAngle = 90.0;
  this.Moves[2].PiecePairs.push([corners,1]);
  this.Moves[2].PiecePairs.push([corners,3]);
  this.Moves[2].PiecePairs.push([corners,7]);
  this.Moves[2].PiecePairs.push([corners,5]);
  this.Moves[2].PiecePairs.push([centers,4]);
  this.Moves[2].PiecePairs.push([centers,5]);
  this.Moves[2].PiecePairs.push([centers,6]);
  this.Moves[2].PiecePairs.push([centers,7]);
  this.Moves[2].PiecePairs.push([edges,1]);
  this.Moves[2].PiecePairs.push([edges,8]);
  this.Moves[2].PiecePairs.push([edges,6]);
  this.Moves[2].PiecePairs.push([edges,15]);
  this.Moves[2].PiecePairs.push([edges,0]);
  this.Moves[2].PiecePairs.push([edges,9]);
  this.Moves[2].PiecePairs.push([edges,7]);
  this.Moves[2].PiecePairs.push([edges,14]);
  this.Moves[2].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10, 15,12,13,14];

  this.Moves[3] = new Move();
  this.Moves[3].Axis = [1,0,0];
  this.Moves[3].EndAngle = -90.0;
  this.Moves[3].PiecePairs.push([corners,1]);
  this.Moves[3].PiecePairs.push([corners,3]);
  this.Moves[3].PiecePairs.push([corners,7]);
  this.Moves[3].PiecePairs.push([corners,5]);
  this.Moves[3].PiecePairs.push([centers,4]);
  this.Moves[3].PiecePairs.push([centers,5]);
  this.Moves[3].PiecePairs.push([centers,6]);
  this.Moves[3].PiecePairs.push([centers,7]);
  this.Moves[3].PiecePairs.push([edges,1]);
  this.Moves[3].PiecePairs.push([edges,8]);
  this.Moves[3].PiecePairs.push([edges,6]);
  this.Moves[3].PiecePairs.push([edges,15]);
  this.Moves[3].PiecePairs.push([edges,0]);
  this.Moves[3].PiecePairs.push([edges,9]);
  this.Moves[3].PiecePairs.push([edges,7]);
  this.Moves[3].PiecePairs.push([edges,14]);
  this.Moves[3].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8, 13,14,15,12];

  this.Moves[2].Reverse = this.Moves[3];
  this.Moves[3].Reverse = this.Moves[2];

  this.Moves[4] = new Move();
  this.Moves[4].Axis = [0,-1,0];
  this.Moves[4].EndAngle = 90.0;
  this.Moves[4].PiecePairs.push([corners,0]);
  this.Moves[4].PiecePairs.push([corners,1]);
  this.Moves[4].PiecePairs.push([corners,5]);
  this.Moves[4].PiecePairs.push([corners,4]);
  this.Moves[4].PiecePairs.push([centers,8]);
  this.Moves[4].PiecePairs.push([centers,9]);
  this.Moves[4].PiecePairs.push([centers,10]);
  this.Moves[4].PiecePairs.push([centers,11]);
  this.Moves[4].PiecePairs.push([edges,4]);
  this.Moves[4].PiecePairs.push([edges,21]);
  this.Moves[4].PiecePairs.push([edges,7]);
  this.Moves[4].PiecePairs.push([edges,22]);
  this.Moves[4].PiecePairs.push([edges,5]);
  this.Moves[4].PiecePairs.push([edges,20]);
  this.Moves[4].PiecePairs.push([edges,6]);
  this.Moves[4].PiecePairs.push([edges,23]);
  this.Moves[4].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10, 15,12,13,14];

  this.Moves[5] = new Move();
  this.Moves[5].Axis = [0,-1,0];
  this.Moves[5].EndAngle = -90.0;
  this.Moves[5].PiecePairs.push([corners,0]);
  this.Moves[5].PiecePairs.push([corners,1]);
  this.Moves[5].PiecePairs.push([corners,5]);
  this.Moves[5].PiecePairs.push([corners,4]);
  this.Moves[5].PiecePairs.push([centers,8]);
  this.Moves[5].PiecePairs.push([centers,9]);
  this.Moves[5].PiecePairs.push([centers,10]);
  this.Moves[5].PiecePairs.push([centers,11]);
  this.Moves[5].PiecePairs.push([edges,4]);
  this.Moves[5].PiecePairs.push([edges,21]);
  this.Moves[5].PiecePairs.push([edges,7]);
  this.Moves[5].PiecePairs.push([edges,22]);
  this.Moves[5].PiecePairs.push([edges,5]);
  this.Moves[5].PiecePairs.push([edges,20]);
  this.Moves[5].PiecePairs.push([edges,6]);
  this.Moves[5].PiecePairs.push([edges,23]);
  this.Moves[5].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8, 13,14,15,12];

  this.Moves[4].Reverse = this.Moves[5];
  this.Moves[5].Reverse = this.Moves[4];

  this.Moves[6] = new Move();
  this.Moves[6].Axis = [0,1,0];
  this.Moves[6].EndAngle = 90.0;
  this.Moves[6].PiecePairs.push([corners,2]);
  this.Moves[6].PiecePairs.push([corners,6]);
  this.Moves[6].PiecePairs.push([corners,7]);
  this.Moves[6].PiecePairs.push([corners,3]);
  this.Moves[6].PiecePairs.push([centers,12]);
  this.Moves[6].PiecePairs.push([centers,13]);
  this.Moves[6].PiecePairs.push([centers,14]);
  this.Moves[6].PiecePairs.push([centers,15]);
  this.Moves[6].PiecePairs.push([edges,0]);
  this.Moves[6].PiecePairs.push([edges,18]);
  this.Moves[6].PiecePairs.push([edges,3]);
  this.Moves[6].PiecePairs.push([edges,17]);
  this.Moves[6].PiecePairs.push([edges,1]);
  this.Moves[6].PiecePairs.push([edges,19]);
  this.Moves[6].PiecePairs.push([edges,2]);
  this.Moves[6].PiecePairs.push([edges,16]);
  this.Moves[6].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10, 15,12,13,14];

  this.Moves[7] = new Move();
  this.Moves[7].Axis = [0,1,0];
  this.Moves[7].EndAngle = -90.0;
  this.Moves[7].PiecePairs.push([corners,2]);
  this.Moves[7].PiecePairs.push([corners,6]);
  this.Moves[7].PiecePairs.push([corners,7]);
  this.Moves[7].PiecePairs.push([corners,3]);
  this.Moves[7].PiecePairs.push([centers,12]);
  this.Moves[7].PiecePairs.push([centers,13]);
  this.Moves[7].PiecePairs.push([centers,14]);
  this.Moves[7].PiecePairs.push([centers,15]);
  this.Moves[7].PiecePairs.push([edges,0]);
  this.Moves[7].PiecePairs.push([edges,18]);
  this.Moves[7].PiecePairs.push([edges,3]);
  this.Moves[7].PiecePairs.push([edges,17]);
  this.Moves[7].PiecePairs.push([edges,1]);
  this.Moves[7].PiecePairs.push([edges,19]);
  this.Moves[7].PiecePairs.push([edges,2]);
  this.Moves[7].PiecePairs.push([edges,16]);
  this.Moves[7].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8, 13,14,15,12];

  this.Moves[6].Reverse = this.Moves[7];
  this.Moves[7].Reverse = this.Moves[6];

  this.Moves[8] = new Move();
  this.Moves[8].Axis = [0,0,-1];
  this.Moves[8].EndAngle = 90.0;
  this.Moves[8].PiecePairs.push([corners,0]);
  this.Moves[8].PiecePairs.push([corners,2]);
  this.Moves[8].PiecePairs.push([corners,3]);
  this.Moves[8].PiecePairs.push([corners,1]);
  this.Moves[8].PiecePairs.push([centers,16]);
  this.Moves[8].PiecePairs.push([centers,17]);
  this.Moves[8].PiecePairs.push([centers,18]);
  this.Moves[8].PiecePairs.push([centers,19]);
  this.Moves[8].PiecePairs.push([edges,13]);
  this.Moves[8].PiecePairs.push([edges,19]);
  this.Moves[8].PiecePairs.push([edges,14]);
  this.Moves[8].PiecePairs.push([edges,20]);
  this.Moves[8].PiecePairs.push([edges,12]);
  this.Moves[8].PiecePairs.push([edges,18]);
  this.Moves[8].PiecePairs.push([edges,15]);
  this.Moves[8].PiecePairs.push([edges,21]);
  this.Moves[8].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10, 15,12,13,14];

  this.Moves[9] = new Move();
  this.Moves[9].Axis = [0,0,-1];
  this.Moves[9].EndAngle = -90.0;
  this.Moves[9].PiecePairs.push([corners,0]);
  this.Moves[9].PiecePairs.push([corners,2]);
  this.Moves[9].PiecePairs.push([corners,3]);
  this.Moves[9].PiecePairs.push([corners,1]);
  this.Moves[9].PiecePairs.push([centers,16]);
  this.Moves[9].PiecePairs.push([centers,17]);
  this.Moves[9].PiecePairs.push([centers,18]);
  this.Moves[9].PiecePairs.push([centers,19]);
  this.Moves[9].PiecePairs.push([edges,13]);
  this.Moves[9].PiecePairs.push([edges,19]);
  this.Moves[9].PiecePairs.push([edges,14]);
  this.Moves[9].PiecePairs.push([edges,20]);
  this.Moves[9].PiecePairs.push([edges,12]);
  this.Moves[9].PiecePairs.push([edges,18]);
  this.Moves[9].PiecePairs.push([edges,15]);
  this.Moves[9].PiecePairs.push([edges,21]);
  this.Moves[9].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8, 13,14,15,12];

  this.Moves[8].Reverse = this.Moves[9];
  this.Moves[9].Reverse = this.Moves[8];

  this.Moves[10] = new Move();
  this.Moves[10].Axis = [0,0,1];
  this.Moves[10].EndAngle = 90.0;
  this.Moves[10].PiecePairs.push([corners,4]);
  this.Moves[10].PiecePairs.push([corners,5]);
  this.Moves[10].PiecePairs.push([corners,7]);
  this.Moves[10].PiecePairs.push([corners,6]);
  this.Moves[10].PiecePairs.push([centers,20]);
  this.Moves[10].PiecePairs.push([centers,21]);
  this.Moves[10].PiecePairs.push([centers,22]);
  this.Moves[10].PiecePairs.push([centers,23]);
  this.Moves[10].PiecePairs.push([edges,9]);
  this.Moves[10].PiecePairs.push([edges,16]);
  this.Moves[10].PiecePairs.push([edges,10]);
  this.Moves[10].PiecePairs.push([edges,23]);
  this.Moves[10].PiecePairs.push([edges,8]);
  this.Moves[10].PiecePairs.push([edges,17]);
  this.Moves[10].PiecePairs.push([edges,11]);
  this.Moves[10].PiecePairs.push([edges,22]);
  this.Moves[10].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10, 15,12,13,14];

  this.Moves[11] = new Move();
  this.Moves[11].Axis = [0,0,1];
  this.Moves[11].EndAngle = -90.0;
  this.Moves[11].PiecePairs.push([corners,4]);
  this.Moves[11].PiecePairs.push([corners,5]);
  this.Moves[11].PiecePairs.push([corners,7]);
  this.Moves[11].PiecePairs.push([corners,6]);
  this.Moves[11].PiecePairs.push([centers,20]);
  this.Moves[11].PiecePairs.push([centers,21]);
  this.Moves[11].PiecePairs.push([centers,22]);
  this.Moves[11].PiecePairs.push([centers,23]);
  this.Moves[11].PiecePairs.push([edges,9]);
  this.Moves[11].PiecePairs.push([edges,16]);
  this.Moves[11].PiecePairs.push([edges,10]);
  this.Moves[11].PiecePairs.push([edges,23]);
  this.Moves[11].PiecePairs.push([edges,8]);
  this.Moves[11].PiecePairs.push([edges,17]);
  this.Moves[11].PiecePairs.push([edges,11]);
  this.Moves[11].PiecePairs.push([edges,22]);
  this.Moves[11].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8, 13,14,15,12];

  this.Moves[10].Reverse = this.Moves[11];
  this.Moves[11].Reverse = this.Moves[10];

  // Inside Moves
  this.Moves[12] = new Move(); // x2
  this.Moves[12].Axis = [1,0,0];
  this.Moves[12].EndAngle = 90.0;
  this.Moves[12].PiecePairs.push([centers,8]);
  this.Moves[12].PiecePairs.push([centers,17]);
  this.Moves[12].PiecePairs.push([centers,14]);
  this.Moves[12].PiecePairs.push([centers,23]);
  this.Moves[12].PiecePairs.push([centers,11]);
  this.Moves[12].PiecePairs.push([centers,16]);
  this.Moves[12].PiecePairs.push([centers,13]);
  this.Moves[12].PiecePairs.push([centers,22]);
  this.Moves[12].PiecePairs.push([edges,16]);
  this.Moves[12].PiecePairs.push([edges,22]);
  this.Moves[12].PiecePairs.push([edges,20]);
  this.Moves[12].PiecePairs.push([edges,18]);
  this.Moves[12].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10];

  this.Moves[13] = new Move();
  this.Moves[13].Axis = [1,0,0];
  this.Moves[13].EndAngle = -90.0;
  this.Moves[13].PiecePairs.push([centers,8]);
  this.Moves[13].PiecePairs.push([centers,17]);
  this.Moves[13].PiecePairs.push([centers,14]);
  this.Moves[13].PiecePairs.push([centers,23]);
  this.Moves[13].PiecePairs.push([centers,11]);
  this.Moves[13].PiecePairs.push([centers,16]);
  this.Moves[13].PiecePairs.push([centers,13]);
  this.Moves[13].PiecePairs.push([centers,22]);
  this.Moves[13].PiecePairs.push([edges,16]);
  this.Moves[13].PiecePairs.push([edges,22]);
  this.Moves[13].PiecePairs.push([edges,20]);
  this.Moves[13].PiecePairs.push([edges,18]);
  this.Moves[13].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8];

  this.Moves[12].Reverse = this.Moves[13];
  this.Moves[13].Reverse = this.Moves[12];

  //-
  this.Moves[12] = new Move(); // x2
  this.Moves[12].Axis = [1,0,0];
  this.Moves[12].EndAngle = 90.0;
  this.Moves[12].PiecePairs.push([centers,8]);
  this.Moves[12].PiecePairs.push([centers,17]);
  this.Moves[12].PiecePairs.push([centers,14]);
  this.Moves[12].PiecePairs.push([centers,23]);
  this.Moves[12].PiecePairs.push([centers,11]);
  this.Moves[12].PiecePairs.push([centers,16]);
  this.Moves[12].PiecePairs.push([centers,13]);
  this.Moves[12].PiecePairs.push([centers,22]);
  this.Moves[12].PiecePairs.push([edges,16]);
  this.Moves[12].PiecePairs.push([edges,22]);
  this.Moves[12].PiecePairs.push([edges,20]);
  this.Moves[12].PiecePairs.push([edges,18]);
  this.Moves[12].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10];

  this.Moves[13] = new Move();
  this.Moves[13].Axis = [1,0,0];
  this.Moves[13].EndAngle = -90.0;
  this.Moves[13].PiecePairs.push([centers,8]);
  this.Moves[13].PiecePairs.push([centers,17]);
  this.Moves[13].PiecePairs.push([centers,14]);
  this.Moves[13].PiecePairs.push([centers,23]);
  this.Moves[13].PiecePairs.push([centers,11]);
  this.Moves[13].PiecePairs.push([centers,16]);
  this.Moves[13].PiecePairs.push([centers,13]);
  this.Moves[13].PiecePairs.push([centers,22]);
  this.Moves[13].PiecePairs.push([edges,16]);
  this.Moves[13].PiecePairs.push([edges,22]);
  this.Moves[13].PiecePairs.push([edges,20]);
  this.Moves[13].PiecePairs.push([edges,18]);
  this.Moves[13].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8];

  this.Moves[12].Reverse = this.Moves[13];
  this.Moves[13].Reverse = this.Moves[12];


  //-
  this.Moves[14] = new Move(); // x3
  this.Moves[14].Axis = [1,0,0];
  this.Moves[14].EndAngle = 90.0;
  this.Moves[14].PiecePairs.push([centers,9]);
  this.Moves[14].PiecePairs.push([centers,18]);
  this.Moves[14].PiecePairs.push([centers,15]);
  this.Moves[14].PiecePairs.push([centers,20]);
  this.Moves[14].PiecePairs.push([centers,10]);
  this.Moves[14].PiecePairs.push([centers,19]);
  this.Moves[14].PiecePairs.push([centers,12]);
  this.Moves[14].PiecePairs.push([centers,21]);
  this.Moves[14].PiecePairs.push([edges,17]);
  this.Moves[14].PiecePairs.push([edges,23]);
  this.Moves[14].PiecePairs.push([edges,21]);
  this.Moves[14].PiecePairs.push([edges,19]);
  this.Moves[14].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10];
  
  this.Moves[15] = new Move();
  this.Moves[15].Axis = [1,0,0];
  this.Moves[15].EndAngle = -90.0;
  this.Moves[15].PiecePairs.push([centers,9]);
  this.Moves[15].PiecePairs.push([centers,18]);
  this.Moves[15].PiecePairs.push([centers,15]);
  this.Moves[15].PiecePairs.push([centers,20]);
  this.Moves[15].PiecePairs.push([centers,10]);
  this.Moves[15].PiecePairs.push([centers,19]);
  this.Moves[15].PiecePairs.push([centers,12]);
  this.Moves[15].PiecePairs.push([centers,21]);
  this.Moves[15].PiecePairs.push([edges,17]);
  this.Moves[15].PiecePairs.push([edges,23]);
  this.Moves[15].PiecePairs.push([edges,21]);
  this.Moves[15].PiecePairs.push([edges,19]);
  this.Moves[15].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8];
  
  this.Moves[14].Reverse = this.Moves[15];
  this.Moves[15].Reverse = this.Moves[14];
  
  this.Moves[16] = new Move();
  this.Moves[16].Axis = [0,1,0];
  this.Moves[16].EndAngle = 90.0;
  this.Moves[16].PiecePairs.push([centers,0]);
  this.Moves[16].PiecePairs.push([centers,20]);
  this.Moves[16].PiecePairs.push([centers,4]);
  this.Moves[16].PiecePairs.push([centers,16]);
  this.Moves[16].PiecePairs.push([centers,3]);
  this.Moves[16].PiecePairs.push([centers,23]);
  this.Moves[16].PiecePairs.push([centers,7]);
  this.Moves[16].PiecePairs.push([centers,19]);
  this.Moves[16].PiecePairs.push([edges,14]);
  this.Moves[16].PiecePairs.push([edges,12]);
  this.Moves[16].PiecePairs.push([edges,10]);
  this.Moves[16].PiecePairs.push([edges,8]);
  this.Moves[16].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10];
  
  this.Moves[17] = new Move();
  this.Moves[17].Axis = [0,1,0];
  this.Moves[17].EndAngle = -90.0;
  this.Moves[17].PiecePairs.push([centers,0]);
  this.Moves[17].PiecePairs.push([centers,20]);
  this.Moves[17].PiecePairs.push([centers,4]);
  this.Moves[17].PiecePairs.push([centers,16]);
  this.Moves[17].PiecePairs.push([centers,3]);
  this.Moves[17].PiecePairs.push([centers,23]);
  this.Moves[17].PiecePairs.push([centers,7]);
  this.Moves[17].PiecePairs.push([centers,19]);
  this.Moves[17].PiecePairs.push([edges,14]);
  this.Moves[17].PiecePairs.push([edges,12]);
  this.Moves[17].PiecePairs.push([edges,10]);
  this.Moves[17].PiecePairs.push([edges,8]);
  this.Moves[17].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8];
  
  this.Moves[16].Reverse = this.Moves[17];
  this.Moves[17].Reverse = this.Moves[16];
  
  //    -----
  this.Moves[18] = new Move();
  this.Moves[18].Axis = [0,1,0];
  this.Moves[18].EndAngle = 90.0;
  this.Moves[18].PiecePairs.push([centers,1]);
  this.Moves[18].PiecePairs.push([centers,21]);
  this.Moves[18].PiecePairs.push([centers,5]);
  this.Moves[18].PiecePairs.push([centers,17]);
  this.Moves[18].PiecePairs.push([centers,2]);
  this.Moves[18].PiecePairs.push([centers,22]);
  this.Moves[18].PiecePairs.push([centers,6]);
  this.Moves[18].PiecePairs.push([centers,18]);
  this.Moves[18].PiecePairs.push([edges,15]);
  this.Moves[18].PiecePairs.push([edges,13]);
  this.Moves[18].PiecePairs.push([edges,11]);
  this.Moves[18].PiecePairs.push([edges,9]);
  this.Moves[18].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10];
  
  this.Moves[19] = new Move();
  this.Moves[19].Axis = [0,1,0];
  this.Moves[19].EndAngle = -90.0;
  this.Moves[19].PiecePairs.push([centers,1]);
  this.Moves[19].PiecePairs.push([centers,21]);
  this.Moves[19].PiecePairs.push([centers,5]);
  this.Moves[19].PiecePairs.push([centers,17]);
  this.Moves[19].PiecePairs.push([centers,2]);
  this.Moves[19].PiecePairs.push([centers,22]);
  this.Moves[19].PiecePairs.push([centers,6]);
  this.Moves[19].PiecePairs.push([centers,18]);
  this.Moves[19].PiecePairs.push([edges,15]);
  this.Moves[19].PiecePairs.push([edges,13]);
  this.Moves[19].PiecePairs.push([edges,11]);
  this.Moves[19].PiecePairs.push([edges,9]);
  this.Moves[19].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8];
  
  this.Moves[18].Reverse = this.Moves[19];
  this.Moves[19].Reverse = this.Moves[18];
  
  
  this.Moves[20] = new Move(); // z2
  this.Moves[20].Axis = [0,0,1];
  this.Moves[20].EndAngle = 90.0;
  this.Moves[20].PiecePairs.push([centers,3]);
  this.Moves[20].PiecePairs.push([centers,9]);
  this.Moves[20].PiecePairs.push([centers,5]);
  this.Moves[20].PiecePairs.push([centers,13]);
  this.Moves[20].PiecePairs.push([centers,2]);
  this.Moves[20].PiecePairs.push([centers,8]);
  this.Moves[20].PiecePairs.push([centers,4]);
  this.Moves[20].PiecePairs.push([centers,12]);
  this.Moves[20].PiecePairs.push([edges,0]);
  this.Moves[20].PiecePairs.push([edges,2]);
  this.Moves[20].PiecePairs.push([edges,4]);
  this.Moves[20].PiecePairs.push([edges,6]);
  this.Moves[20].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10];
  
  this.Moves[21] = new Move(); // z2
  this.Moves[21].Axis = [0,0,1];
  this.Moves[21].EndAngle = -90.0;
  this.Moves[21].PiecePairs.push([centers,3]);
  this.Moves[21].PiecePairs.push([centers,9]);
  this.Moves[21].PiecePairs.push([centers,5]);
  this.Moves[21].PiecePairs.push([centers,13]);
  this.Moves[21].PiecePairs.push([centers,2]);
  this.Moves[21].PiecePairs.push([centers,8]);
  this.Moves[21].PiecePairs.push([centers,4]);
  this.Moves[21].PiecePairs.push([centers,12]);
  this.Moves[21].PiecePairs.push([edges,0]);
  this.Moves[21].PiecePairs.push([edges,2]);
  this.Moves[21].PiecePairs.push([edges,4]);
  this.Moves[21].PiecePairs.push([edges,6]);
  this.Moves[21].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8];
  
  this.Moves[20].Reverse = this.Moves[21];
  this.Moves[21].Reverse = this.Moves[20];
  
  
  this.Moves[22] = new Move(); // z1
  this.Moves[22].Axis = [0,0,1];
  this.Moves[22].EndAngle = 90.0;
  this.Moves[22].PiecePairs.push([centers,0]);
  this.Moves[22].PiecePairs.push([centers,10]);
  this.Moves[22].PiecePairs.push([centers,6]);
  this.Moves[22].PiecePairs.push([centers,14]);
  this.Moves[22].PiecePairs.push([centers,1]);
  this.Moves[22].PiecePairs.push([centers,11]);
  this.Moves[22].PiecePairs.push([centers,7]);
  this.Moves[22].PiecePairs.push([centers,15]);
  this.Moves[22].PiecePairs.push([edges,1]);
  this.Moves[22].PiecePairs.push([edges,3]);
  this.Moves[22].PiecePairs.push([edges,5]);
  this.Moves[22].PiecePairs.push([edges,7]);
  this.Moves[22].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10];
  
  this.Moves[23] = new Move(); // z1
  this.Moves[23].Axis = [0,0,1];
  this.Moves[23].EndAngle = -90.0;
  this.Moves[23].PiecePairs.push([centers,0]);
  this.Moves[23].PiecePairs.push([centers,10]);
  this.Moves[23].PiecePairs.push([centers,6]);
  this.Moves[23].PiecePairs.push([centers,14]);
  this.Moves[23].PiecePairs.push([centers,1]);
  this.Moves[23].PiecePairs.push([centers,11]);
  this.Moves[23].PiecePairs.push([centers,7]);
  this.Moves[23].PiecePairs.push([centers,15]);
  this.Moves[23].PiecePairs.push([edges,1]);
  this.Moves[23].PiecePairs.push([edges,3]);
  this.Moves[23].PiecePairs.push([edges,5]);
  this.Moves[23].PiecePairs.push([edges,7]);
  this.Moves[23].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8];
  
  this.Moves[22].Reverse = this.Moves[23];
  this.Moves[23].Reverse = this.Moves[22];
}

