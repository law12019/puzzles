
Puzzle.prototype.InitCamera = function(camera){
  camera.ViewPlaneNormal = [0,0,1];
  camera.Up = [0,1,0];
  camera.Right = [1,0,0];

  camera.Height = 10.0;
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
  model.AddPoint(-1.0,-1.0, 1.0, 0.00,0.00); 
  model.AddPoint( 1.0,-1.0, 1.0, 0.01,0.01);  // 
  model.AddPoint(-1.0,-1.0,-1.0, 1.00,0.00); 
  model.AddPoint( 1.0,-1.0,-1.0, 0.99,0.01);  //
  model.AddPoint(-1.0, 1.0, 1.0, 0.00,1.00); 
  model.AddPoint( 1.0, 1.0, 1.0, 0.01,0.99);  //
  model.AddPoint(-1.0, 1.0,-1.0, 1.00,1.00); 
  model.AddPoint( 1.0, 1.0,-1.0, 0.99,0.99);  //
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
  this.AddPiece(new Piece("CubeImages/Corner0.jpg", this.CornerModel, [-3,-3,-3], [90,0,180]));
  this.AddPiece(new Piece("CubeImages/Corner1.jpg", this.CornerModel, [ 3,-3,-3], [180,0,0]));
  this.AddPiece(new Piece("CubeImages/Corner2.jpg", this.CornerModel, [-3, 3,-3], [0,180,0]));
  this.AddPiece(new Piece("CubeImages/Corner3.jpg", this.CornerModel, [ 3, 3,-3], [-90,0,0]));
  this.AddPiece(new Piece("CubeImages/Corner4.jpg", this.CornerModel, [-3,-3, 3], [90,0,90]));
  this.AddPiece(new Piece("CubeImages/Corner5.jpg", this.CornerModel, [ 3,-3, 3], [90,0,0]));
  this.AddPiece(new Piece("CubeImages/Corner6.jpg", this.CornerModel, [-3, 3, 3], [0,-90,0]));
  this.AddPiece(new Piece("CubeImages/Corner7.jpg", this.CornerModel, [ 3, 3, 3], [0,0,0]));
  // 8
  this.AddPiece(new Piece("CubeImages/Center0_01.jpg", this.CenterModel, [ -3,-1,-1], [0,180,0])); //8
  this.AddPiece(new Piece("CubeImages/Center0_00.jpg", this.CenterModel, [ -3, 1,-1], [0,180,0]));
  this.AddPiece(new Piece("CubeImages/Center0_11.jpg", this.CenterModel, [ -3,-1, 1], [0,180,0]));
  this.AddPiece(new Piece("CubeImages/Center0_10.jpg", this.CenterModel, [ -3, 1, 1], [0,180,0]));

  this.AddPiece(new Piece("CubeImages/Center1_11.jpg", this.CenterModel, [ 3,-1,-1], [0,0,0]));    //12
  this.AddPiece(new Piece("CubeImages/Center1_10.jpg", this.CenterModel, [ 3, 1,-1], [0,0,0]));
  this.AddPiece(new Piece("CubeImages/Center1_01.jpg", this.CenterModel, [ 3,-1, 1], [0,0,0]));
  this.AddPiece(new Piece("CubeImages/Center1_00.jpg", this.CenterModel, [ 3, 1, 1], [0,0,0]));

  this.AddPiece(new Piece("CubeImages/Center2_11.jpg", this.CenterModel, [-1,-3,-1], [0,0,-90])); //16
  this.AddPiece(new Piece("CubeImages/Center2_10.jpg", this.CenterModel, [ 1,-3,-1], [0,0,-90]));
  this.AddPiece(new Piece("CubeImages/Center2_01.jpg", this.CenterModel, [-1,-3, 1], [0,0,-90]));
  this.AddPiece(new Piece("CubeImages/Center2_00.jpg", this.CenterModel, [ 1,-3, 1], [0,0,-90]));
  this.AddPiece(new Piece("CubeImages/Center3_10.jpg", this.CenterModel, [-1, 3,-1], [0,0,90]));   // 20
  this.AddPiece(new Piece("CubeImages/Center3_11.jpg", this.CenterModel, [ 1, 3,-1], [0,0,90]));
  this.AddPiece(new Piece("CubeImages/Center3_00.jpg", this.CenterModel, [-1, 3, 1], [0,0,90]));
  this.AddPiece(new Piece("CubeImages/Center3_01.jpg", this.CenterModel, [ 1, 3, 1], [0,0,90]));
  this.AddPiece(new Piece("CubeImages/Center4_11.jpg", this.CenterModel, [-1,-1, -3], [0,90,0]));  // 24
  this.AddPiece(new Piece("CubeImages/Center4_01.jpg", this.CenterModel, [ 1,-1, -3], [0,90,0]));
  this.AddPiece(new Piece("CubeImages/Center4_10.jpg", this.CenterModel, [-1, 1, -3], [0,90,0]));
  this.AddPiece(new Piece("CubeImages/Center4_00.jpg", this.CenterModel, [ 1, 1, -3], [0,90,0]));
  this.AddPiece(new Piece("CubeImages/Center5_01.jpg", this.CenterModel, [-1,-1, 3], [0,-90,0]));  //28
  this.AddPiece(new Piece("CubeImages/Center5_11.jpg", this.CenterModel, [ 1,-1, 3], [0,-90,0]));
  this.AddPiece(new Piece("CubeImages/Center5_00.jpg", this.CenterModel, [-1, 1, 3], [0,-90,0]));
  this.AddPiece(new Piece("CubeImages/Center5_10.jpg", this.CenterModel, [ 1, 1, 3], [0,-90,0]));
  // 32 (14)
  this.AddPiece(new Piece("CubeImages/Edge0.jpg", this.EdgeModel, [ 3, 3,-1], [0,0,0])); //32 
  this.AddPiece(new Piece("CubeImages/Edge0.jpg", this.EdgeModel, [ 3, 3, 1], [0,0,0])); 
  this.AddPiece(new Piece("CubeImages/Edge1.jpg", this.EdgeModel, [-3, 3,-1], [0,0,90])); //34
  this.AddPiece(new Piece("CubeImages/Edge1.jpg", this.EdgeModel, [-3, 3, 1], [0,0,90])); 
  this.AddPiece(new Piece("CubeImages/Edge2.jpg", this.EdgeModel, [-3,-3,-1], [0,0,180])); //36
  this.AddPiece(new Piece("CubeImages/Edge2.jpg", this.EdgeModel, [-3,-3, 1], [0,0,180]));
  this.AddPiece(new Piece("CubeImages/Edge3.jpg", this.EdgeModel, [ 3,-3,-1], [0,0,-90])); //38
  this.AddPiece(new Piece("CubeImages/Edge3.jpg", this.EdgeModel, [ 3,-3, 1], [0,0,-90])); 
  this.AddPiece(new Piece("CubeImages/Edge4.jpg", this.EdgeModel, [ 3,-1, 3], [90,0,0]));  //40
  this.AddPiece(new Piece("CubeImages/Edge4.jpg", this.EdgeModel, [ 3, 1, 3], [90,0,0])); 
  this.AddPiece(new Piece("CubeImages/Edge5.jpg", this.EdgeModel, [-3,-1, 3], [90,0,90])); //42
  this.AddPiece(new Piece("CubeImages/Edge5.jpg", this.EdgeModel, [-3, 1, 3], [90,0,90]));
  this.AddPiece(new Piece("CubeImages/Edge6.jpg", this.EdgeModel, [-3,-1,-3], [-90,0,90]));//44
  this.AddPiece(new Piece("CubeImages/Edge6.jpg", this.EdgeModel, [-3, 1,-3], [-90,0,90]));
  this.AddPiece(new Piece("CubeImages/Edge7.jpg", this.EdgeModel, [ 3,-1,-3], [-90,0,0])); //46
  this.AddPiece(new Piece("CubeImages/Edge7.jpg", this.EdgeModel, [ 3, 1,-3], [-90,0,0])); 
  this.AddPiece(new Piece("CubeImages/Edge8.jpg", this.EdgeModel, [-1, 3, 3], [0,-90,0])); //48
  this.AddPiece(new Piece("CubeImages/Edge8.jpg", this.EdgeModel, [ 1, 3, 3], [0,-90,0])); 
  this.AddPiece(new Piece("CubeImages/Edge9.jpg", this.EdgeModel, [-1, 3,-3], [0,90,0]));  //50
  this.AddPiece(new Piece("CubeImages/Edge9.jpg", this.EdgeModel, [ 1, 3,-3], [0,90,0])); 
  this.AddPiece(new Piece("CubeImages/Edge10.jpg", this.EdgeModel, [-1,-3,-3], [0,90,-90]));//52
  this.AddPiece(new Piece("CubeImages/Edge10.jpg", this.EdgeModel, [ 1,-3,-3], [0,90,-90]));
  this.AddPiece(new Piece("CubeImages/Edge11.jpg", this.EdgeModel, [-1,-3, 3], [0,-90,-90]));//54
  this.AddPiece(new Piece("CubeImages/Edge11.jpg", this.EdgeModel, [ 1,-3, 3], [0,-90,-90]));
}


Puzzle.prototype.InitMoves = function() {
  // X
  this.CreateMovePair([0,2,4,6, 8,9,10,11, 34,35,36,37,42,43,44,45], [1,0,0], 90);
  this.CreateMovePair([16,18,20,22,24,26,28,30, 48,50,52,54], [1,0,0], 90);
  this.CreateMovePair([17,19,21,23,25,27,29,31, 49,51,53,55], [1,0,0], 90);
  this.CreateMovePair([1,3,5,7, 12,13,14,15, 32,33,38,39,40,41,46,47], [1,0,0], 90);
  // Y
  this.CreateMovePair([0,1,4,5, 16,17,18,19, 36,37,38,39,52,53,54,55], [0,1,0], 90);
  this.CreateMovePair([8,10,12,14,24,25,28,29, 40,42,44,46], [0,1,0], 90);
  this.CreateMovePair([9,11,13,15,26,27,30,31, 41,43,45,47], [0,1,0], 90);
  this.CreateMovePair([2,3,6,7, 20,21,22,23, 32,33,34,35,48,49,50,51], [0,1,0], 90);
  // Z
  this.CreateMovePair([0,1,2,3, 24,25,26,27, 44,45,46,47,50,51,52,53], [0,0,1], 90);
  this.CreateMovePair([8,9,12,13,16,17,20,21, 32,34,36,38], [0,0,1], 90);
  this.CreateMovePair([10,11,14,15,18,19,22,23, 33,35,37,39], [0,0,1], 90);
  this.CreateMovePair([4,5,6,7, 28,29,30,31, 40,41,42,43,48,49,54,55], [0,0,1], 90);
}


Puzzle.prototype.InitSequences = function() {
  seq_info = [
    [18, 10, 19, 10, 18, 11, 11, 19]
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


