

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
  var model = new PieceModel([1,1,1], 3);
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
  model.AddOutFace([0,1,4,2]);
  model.AddOutFace([0,2,6,3]);
  model.AddOutFace([0,3,5,1]);
  model.AddInFace([7,4,1,5]);
  model.AddInFace([8,6,2,4]);
  model.AddInFace([9,5,3,6]);
  model.InitBuffers();
  this.CornerModel = model;

  // Center
  model = new PieceModel([1,0,0], 4);
  model.AddPoint(-1.0,-1.0, 1.0, 0.00,0.00); // 0 
  model.AddPoint( 1.0,-1.0, 1.0, 0.01,0.01); //   1
  model.AddPoint(-1.0,-1.0,-1.0, 1.00,0.00); // 2
  model.AddPoint( 1.0,-1.0,-1.0, 0.99,0.01); //   3
  model.AddPoint(-1.0, 1.0, 1.0, 0.00,1.00); // 4
  model.AddPoint( 1.0, 1.0, 1.0, 0.01,0.99); //   5
  model.AddPoint(-1.0, 1.0,-1.0, 1.00,1.00); // 6
  model.AddPoint( 1.0, 1.0,-1.0, 0.99,0.99); //   7

  //model.AddPoint(-1.0,-1.0,-1.0, 0.00,0.00); 
  //model.AddPoint( 1.0,-1.0,-1.0, 0.01,0.01); 
  //model.AddPoint(-1.0, 1.0,-1.0, 1.00,0.00); 
  //model.AddPoint( 1.0, 1.0,-1.0, 0.99,0.01); 
  //model.AddPoint(-1.0,-1.0, 1.0, 0.00,1.00); 
  //model.AddPoint( 1.0,-1.0, 1.0, 0.01,0.99); 
  //model.AddPoint(-1.0, 1.0, 1.0, 1.00,1.00); 
  //model.AddPoint( 1.0, 1.0, 1.0, 0.99,0.99); 

  model.AddOutFace([1,3,7,5]);
  model.AddInFace([0,4,6,2]);
  model.AddInFace([2,6,7,3]);
  model.AddInFace([0,1,5,4]);
  model.AddInFace([0,2,3,1]);
  model.AddInFace([4,5,7,6]);
  model.InitBuffers();
  this.CenterModel = model;

  // Edge
  model = new PieceModel([1,1,0], 2);
  model.AddPoint(-1.0,-1.0,-1.0, 0.00,0.00); // 0
  model.AddPoint(-1.0,-1.0, 1.0, 1.00,0.00); // 1
  model.AddPoint(-1.0, 1.0,-1.0, 0.01,0.01); // 2
  model.AddPoint(-1.0, 1.0, 1.0, 0.99,0.01); // 3
  model.AddPoint(-1.0,-1.0,-1.0, 0.00,0.50); // 4
  model.AddPoint( 1.0, 1.0,-1.0, 0.01,0.50); // 5
  model.AddPoint( 1.0, 1.0, 1.0, 0.99,0.50); // 6
  model.AddPoint(-1.0,-1.0, 1.0, 1.00,0.50); // 7
  model.AddPoint( 1.0,-1.0,-1.0, 0.01,0.99); // 8
  model.AddPoint( 1.0,-1.0, 1.0, 0.99,0.99); // 9
  model.AddPoint(-1.0,-1.0,-1.0, 0.00,1.00); // 10
  model.AddPoint(-1.0,-1.0, 1.0, 1.00,1.00); // 11
  model.AddInFace([0,1,3,2]);
  model.AddOutFace([2,3,6,5]);
  model.AddOutFace([5,6,9,8]);
  model.AddInFace([8,9,11,10]);
  model.AddInFace([2,5,8,4]);
  model.AddInFace([3,7,9,6]);
  model.InitBuffers();
  this.EdgeModel = model;
}


// Rotation order is z,y,x.  Clockwise when at the origin looking out the axis.
// Anti clockwise when looking downthe axis at the origin.
Puzzle.prototype.InitPieces = function() {
  this.AddPiece(new Piece("CubeImages/Corner0.jpg", this.CornerModel, [-2,-2,-2], [90,0,180]));
  this.AddPiece(new Piece("CubeImages/Corner1.jpg", this.CornerModel, [ 2,-2,-2], [180,0,0]));
  this.AddPiece(new Piece("CubeImages/Corner2.jpg", this.CornerModel, [-2, 2,-2], [0,180,0]));
  this.AddPiece(new Piece("CubeImages/Corner3.jpg", this.CornerModel, [ 2, 2,-2], [-90,0,0]));
  this.AddPiece(new Piece("CubeImages/Corner4.jpg", this.CornerModel, [-2,-2, 2], [90,0,90]));
  this.AddPiece(new Piece("CubeImages/Corner5.jpg", this.CornerModel, [ 2,-2, 2], [90,0,0]));
  this.AddPiece(new Piece("CubeImages/Corner6.jpg", this.CornerModel, [-2, 2, 2], [0,-90,0]));
  this.AddPiece(new Piece("CubeImages/Corner7.jpg", this.CornerModel, [ 2, 2, 2], [0,0,0])); 
  // 8
  this.AddPiece(new Piece("CubeImages/Center0.jpg", this.CenterModel, [ -2, 0, 0], [0,180,0])); 
  this.AddPiece(new Piece("CubeImages/Center1.jpg", this.CenterModel, [ 2, 0, 0], [0,0,0])); 
  this.AddPiece(new Piece("CubeImages/Center2.jpg", this.CenterModel, [ 0, -2, 0], [0,0,-90])); 
  this.AddPiece(new Piece("CubeImages/Center3.jpg", this.CenterModel, [ 0, 2, 0], [0,0,90])); 
  this.AddPiece(new Piece("CubeImages/Center4.jpg", this.CenterModel, [ 0, 0, -2], [0,90,0])); 
  this.AddPiece(new Piece("CubeImages/Center5.jpg", this.CenterModel, [ 0, 0, 2], [0,-90,0])); 
  // 14  5,6, 10,11
  this.AddPiece(new Piece("CubeImages/Edge0.jpg", this.EdgeModel, [ 2, 2, 0], [0,0,0])); 
  this.AddPiece(new Piece("CubeImages/Edge1.jpg", this.EdgeModel, [-2, 2, 0], [0,0,90])); 
  this.AddPiece(new Piece("CubeImages/Edge2.jpg", this.EdgeModel, [-2,-2, 0], [0,0,180]));
  this.AddPiece(new Piece("CubeImages/Edge3.jpg", this.EdgeModel, [ 2,-2, 0], [0,0,-90])); 
  this.AddPiece(new Piece("CubeImages/Edge4.jpg", this.EdgeModel, [ 2, 0, 2], [90,0,0])); 
  this.AddPiece(new Piece("CubeImages/Edge5.jpg", this.EdgeModel, [-2, 0, 2], [90,0,90]));
  this.AddPiece(new Piece("CubeImages/Edge6.jpg", this.EdgeModel, [-2, 0,-2], [-90,0,90]));
  this.AddPiece(new Piece("CubeImages/Edge7.jpg", this.EdgeModel, [ 2, 0,-2], [-90,0,0])); 
  this.AddPiece(new Piece("CubeImages/Edge8.jpg", this.EdgeModel, [ 0, 2, 2], [0,-90,0])); 
  this.AddPiece(new Piece("CubeImages/Edge9.jpg", this.EdgeModel, [ 0, 2,-2], [0,90,0])); 
  this.AddPiece(new Piece("CubeImages/Edge10.jpg", this.EdgeModel, [ 0,-2,-2], [0,90,-90]));
  this.AddPiece(new Piece("CubeImages/Edge11.jpg", this.EdgeModel, [ 0,-2, 2], [0,-90,-90]));
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

// Generate a list of puzzle symmetries.
Puzzle.prototype.InitSymmetries = function() {
  transforms = [];
  transforms.push(GetRotationMatrix(1,0,0, 90));
  transforms.push(GetRotationMatrix(0,1,0, 90));
  transforms.push(GetRotationMatrix(0,0,1, 90));
  var flipMat = mat4.create();
  mat4.identity(flipMat);
  flipMat[0] = -1;
  transforms.push(flipMat);
  this.LoadSymmetries(transforms);
}


