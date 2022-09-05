

Puzzle.prototype.InitCamera = function(camera){
  camera.ViewPlaneNormal = [0,0,1];
  camera.Up = [0,1,0];
  camera.Right = [1,0,0];

  camera.Height = 5.2;
  camera.ComputeMatrix();
}

// Trianges rotate anti-clockwise from the outside.
Puzzle.prototype.InitModels = function() {
  // Corner
  var model = new PieceModel([1,0,0], 4);
  model.AddPoint( 0.8,-0.7, 0.0, 0.25,0.25);
  model.AddPoint( 0.8, 0.7, 0.0, 0.75,0.75);
  model.AddPoint( 0.8, 0.0,-0.7, 0.75,0.25);
  model.AddPoint( 0.8, 0.0, 0.7, 0.25,0.75);
  model.AddPoint( 0.5,-1.0, 0.0, 0.0, 0.0);
  model.AddPoint( 0.5, 1.0, 0.0, 1.0, 1.0);
  model.AddPoint( 0.5, 0.0,-1.0, 1.0, 0.0);
  model.AddPoint( 0.5, 0.0, 1.0, 0.0, 1.0);
  model.AddPoint(-0.5, 0.0, 0.0, 1.0, 0.0);
  model.AddPoint(-0.5, 0.0, 0.0, 0.0, 1.0);
  model.AddOutFace([2,1,0]);
  model.AddOutFace([3,0,1]);
  model.AddOutFace([4,6,0]);
  model.AddOutFace([2,0,6]);
  model.AddOutFace([6,5,2]);
  model.AddOutFace([1,2,5]);
  model.AddOutFace([5,7,1]);
  model.AddOutFace([3,1,7]);
  model.AddOutFace([7,4,3]);
  model.AddOutFace([0,3,4]);
  model.AddInFace([4,6,8]);
  model.AddInFace([8,6,5]);
  model.AddInFace([5,7,9]);
  model.AddInFace([9,7,4]);
  model.InitBuffers();
  this.CornerModel = model;
    
  // Center
  model = new PieceModel([1,1,1], 3);
  model.AddPoint( 0.5, 0.5,-0.5, 0.0, 0.0); //
  model.AddPoint( 0.5,-0.5, 0.5, 0.0, 1.0); //
  model.AddPoint(-0.5, 0.5, 0.5, 1.0, 0.0); //
  model.AddPoint(-0.5,-0.5,-0.5, 0.0, 0.0);
  model.AddPoint(-0.5,-0.5,-0.5, 0.0, 1.0);
  model.AddPoint(-0.5,-0.5,-0.5, 1.0, 0.0);
  model.AddOutFace([0,2,1]);
  model.AddInFace([0,1,3]);
  model.AddInFace([1,2,4]);
  model.AddInFace([2,0,5]);
  model.InitBuffers();
  this.CenterModel = model;
}


// Rotation order is z,y,x.  Clockwise when at the origin looking out the axis.
// Anti clockwise when looking downthe axis at the origin.
Puzzle.prototype.InitPieces = function() {
  this.AddPiece(new Piece("OctoImages/Corner0.jpg", this.CornerModel, [ 0.5, 0.0, 0.0], [0,0,0]));
  this.AddPiece(new Piece("OctoImages/Corner1.jpg", this.CornerModel, [-0.5, 0.0, 0.0], [0,0,180]));
  this.AddPiece(new Piece("OctoImages/Corner2.jpg", this.CornerModel, [ 0.0, 0.5, 0.0], [0,0,90]));
  this.AddPiece(new Piece("OctoImages/Corner3.jpg", this.CornerModel, [ 0.0,-0.5, 0.0], [0,0,-90]));
  this.AddPiece(new Piece("OctoImages/Corner4.jpg", this.CornerModel, [ 0.0, 0.0, 0.5], [0,-90,0]));
  this.AddPiece(new Piece("OctoImages/Corner5.jpg", this.CornerModel, [ 0.0, 0.0,-0.5], [0,90,0]));

  this.AddPiece(new Piece("OctoImages/Center0.jpg", this.CenterModel, [ 0.5, 0.5, 0.5], [0,0,0]));    // 6: green
  this.AddPiece(new Piece("OctoImages/Center1.jpg", this.CenterModel, [ 0.5,-0.5, 0.5], [0,0,-90]));  // 7: orange
  this.AddPiece(new Piece("OctoImages/Center2.jpg", this.CenterModel, [ 0.5,-0.5,-0.5], [180,0,0]));  // 8: red
  this.AddPiece(new Piece("OctoImages/Center3.jpg", this.CenterModel, [ 0.5, 0.5,-0.5], [-90,0,0]));  // 9: blue
  this.AddPiece(new Piece("OctoImages/Center4.jpg", this.CenterModel, [-0.5, 0.5, 0.5], [0,0,90]));   // 10:yellow
  this.AddPiece(new Piece("OctoImages/Center5.jpg", this.CenterModel, [-0.5, 0.5,-0.5], [0,180,0]));  // 11:pink
  this.AddPiece(new Piece("OctoImages/Center6.jpg", this.CenterModel, [-0.5,-0.5, 0.5], [0,0,180]));  // 12:cyan
  this.AddPiece(new Piece("OctoImages/Center7.jpg", this.CenterModel, [-0.5,-0.5,-0.5], [90,0,180])); // 13:purple
}



Puzzle.prototype.InitMoves = function() {
  this.CreateMovePair([0,2,4, 6,7,9,10], [1,1,1], 120); // green
  this.CreateMovePair([0,3,4, 6,7,8,12], [1,-1,1], 120); // orange
  this.CreateMovePair([0,3,5, 7,8,9,13], [1,-1,-1], 120); // red
  this.CreateMovePair([0,2,5, 6,8,9,11], [1, 1,-1], 120); // blue
  this.CreateMovePair([1,2,4, 6,10,11,12], [-1, 1, 1], 120); // yellow
  this.CreateMovePair([1,2,5, 9,10,11,13], [-1, 1,-1], 120); // pink
  this.CreateMovePair([1,3,4, 7,10,12,13], [-1,-1, 1], 120); // cyan
  this.CreateMovePair([1,3,5, 8,11,12,13], [-1,-1, -1], 120); // purple
}


Puzzle.prototype.InitSequences = function() {
  seq_info = [
    [2, 1, 2, 1, 9, 12, 9, 12, 10, 14, 14, 14, 8, 6, 10, 0, 6, 15]
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


