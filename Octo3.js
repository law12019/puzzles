

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

  // Edge
  model = new PieceModel([1,1,0], 2);
  model.AddPoint( 0.0, 1.0, 0.0, 0.0, 1.0); //0
  model.AddPoint( 1.0, 0.0, 0.0, 1.0, 0.0); //1
  model.AddPoint( 0.0, 0.0, 1.0, 0.0, 0.0); //2
  model.AddPoint( 0.0, 0.0,-1.0, 1.0, 1.0); //3
  model.AddPoint(-1.0, 0.0, 0.0, 0.0, 0.0); //4
  model.AddPoint( 0.0,-1.0, 0.0, 0.0, 0.0); //5
  model.AddPoint(-1.0, 0.0, 0.0, 1.0, 1.0); //6
  model.AddPoint( 0.0,-1.0, 0.0, 1.0, 1.0); //7
  model.AddOutFace([1,0,2]);
  model.AddOutFace([0,1,3]);
  model.AddInFace([2,0,4]);
  model.AddInFace([0,3,6]);
  model.AddInFace([5,2,4]);
  model.AddInFace([3,7,6]);
  model.AddInFace([1,2,5]);
  model.AddInFace([1,7,3]);
  model.InitBuffers();
  this.EdgeModel = model;
}


// Rotation order is z,y,x.  Clockwise when at the origin looking out the axis.
// Anti clockwise when looking downthe axis at the origin.
Puzzle.prototype.InitPieces = function() {
  var k = 1.0/6.0;

  this.AddPiece(new Piece("OctoImages/Corner0.jpg", this.CornerModel, [ 1.5, 0.0, 0.0], [0,0,0]));   // 0
  this.AddPiece(new Piece("OctoImages/Corner1.jpg", this.CornerModel, [-1.5, 0.0, 0.0], [0,0,180])); // 1
  this.AddPiece(new Piece("OctoImages/Corner2.jpg", this.CornerModel, [ 0.0, 1.5, 0.0], [0,0,90]));  // 2
  this.AddPiece(new Piece("OctoImages/Corner3.jpg", this.CornerModel, [ 0.0,-1.5, 0.0], [0,0,-90])); // 3
  this.AddPiece(new Piece("OctoImages/Corner4.jpg", this.CornerModel, [ 0.0, 0.0, 1.5], [0,-90,0])); // 4
  this.AddPiece(new Piece("OctoImages/Corner5.jpg", this.CornerModel, [ 0.0, 0.0,-1.5], [0,90,0]));  // 5
  // Edges
  this.AddPiece(new Piece("OctoImages/Edge0.jpg", this.EdgeModel, [ 1, 1, 0], [0,0,0]));    // 6: g/b
  this.AddPiece(new Piece("OctoImages/Edge1.jpg", this.EdgeModel, [-1, 1, 0], [0,0,90]));   // 7: y/pink
  this.AddPiece(new Piece("OctoImages/Edge2.jpg", this.EdgeModel, [-1,-1, 0], [0,0,180]));  // 8: c/purp
  this.AddPiece(new Piece("OctoImages/Edge3.jpg", this.EdgeModel, [ 1,-1, 0], [0,0,-90]));  // 9: o/r
  this.AddPiece(new Piece("OctoImages/Edge4.jpg", this.EdgeModel, [ 1, 0, 1], [90,0,0]));   //10: o/g
  this.AddPiece(new Piece("OctoImages/Edge5.jpg", this.EdgeModel, [ 1, 0,-1], [-90,0,0]));  //11: b/r
  this.AddPiece(new Piece("OctoImages/Edge6.jpg", this.EdgeModel, [ 0, 1, 1], [0,-90,0]));  //12: y/g
  this.AddPiece(new Piece("OctoImages/Edge7.jpg", this.EdgeModel, [ 0, 1,-1], [0,90,0]));   //13: b/pink
  this.AddPiece(new Piece("OctoImages/Edge8.jpg", this.EdgeModel, [ 0,-1, 1], [0,-90,-90]));//14: c/o
  this.AddPiece(new Piece("OctoImages/Edge9.jpg", this.EdgeModel, [ 0,-1,-1], [0,90,-90])); //15: r/purp
  this.AddPiece(new Piece("OctoImages/Edge10.jpg", this.EdgeModel, [-1, 0, 1], [90,0,90])); //16: c/y
  this.AddPiece(new Piece("OctoImages/Edge11.jpg", this.EdgeModel, [-1, 0,-1], [-90,0,90]));//17: pink/purp 
  // Faces
  this.AddPiece(new Piece("OctoImages/Center0.jpg", this.CenterModel, [ 1.5, 0.5, 0.5], [0,0,0]));    //18: green
  this.AddPiece(new Piece("OctoImages/Center0.jpg", this.CenterModel, [ 0.5, 1.5, 0.5], [0,0,0]));    //19: green
  this.AddPiece(new Piece("OctoImages/Center0.jpg", this.CenterModel, [ 0.5, 0.5, 1.5], [0,0,0]));    //20: green
  
  this.AddPiece(new Piece("OctoImages/Center1.jpg", this.CenterModel, [ 1.5,-0.5, 0.5], [0,0,-90]));  //21: orange
  this.AddPiece(new Piece("OctoImages/Center1.jpg", this.CenterModel, [ 0.5,-1.5, 0.5], [0,0,-90]));  //22: orange
  this.AddPiece(new Piece("OctoImages/Center1.jpg", this.CenterModel, [ 0.5,-0.5, 1.5], [0,0,-90]));  //23: orange

  this.AddPiece(new Piece("OctoImages/Center2.jpg", this.CenterModel, [ 1.5,-0.5,-0.5], [180,0,0]));  //24: red
  this.AddPiece(new Piece("OctoImages/Center2.jpg", this.CenterModel, [ 0.5,-1.5,-0.5], [180,0,0]));  //25: red
  this.AddPiece(new Piece("OctoImages/Center2.jpg", this.CenterModel, [ 0.5,-0.5,-1.5], [180,0,0]));  //26: red

  this.AddPiece(new Piece("OctoImages/Center3.jpg", this.CenterModel, [ 1.5, 0.5,-0.5], [-90,0,0]));  //27: blue
  this.AddPiece(new Piece("OctoImages/Center3.jpg", this.CenterModel, [ 0.5, 1.5,-0.5], [-90,0,0]));  //28: blue
  this.AddPiece(new Piece("OctoImages/Center3.jpg", this.CenterModel, [ 0.5, 0.5,-1.5], [-90,0,0]));  //29: blue

  this.AddPiece(new Piece("OctoImages/Center4.jpg", this.CenterModel, [-1.5, 0.5, 0.5], [0,0,90]));   //30:yellow
  this.AddPiece(new Piece("OctoImages/Center4.jpg", this.CenterModel, [-0.5, 1.5, 0.5], [0,0,90]));   //31:yellow
  this.AddPiece(new Piece("OctoImages/Center4.jpg", this.CenterModel, [-0.5, 0.5, 1.5], [0,0,90]));   //32:yellow
  
  this.AddPiece(new Piece("OctoImages/Center5.jpg", this.CenterModel, [-1.5, 0.5,-0.5], [0,180,0]));  //33:pink
  this.AddPiece(new Piece("OctoImages/Center5.jpg", this.CenterModel, [-0.5, 1.5,-0.5], [0,180,0]));  //34:pink
  this.AddPiece(new Piece("OctoImages/Center5.jpg", this.CenterModel, [-0.5, 0.5,-1.5], [0,180,0]));  //35:pink

  this.AddPiece(new Piece("OctoImages/Center6.jpg", this.CenterModel, [-1.5,-0.5, 0.5], [0,0,180]));  //36:cyan
  this.AddPiece(new Piece("OctoImages/Center6.jpg", this.CenterModel, [-0.5,-1.5, 0.5], [0,0,180]));  //37:cyan
  this.AddPiece(new Piece("OctoImages/Center6.jpg", this.CenterModel, [-0.5,-0.5, 1.5], [0,0,180]));  //38:cyan

  this.AddPiece(new Piece("OctoImages/Center7.jpg", this.CenterModel, [-1.5,-0.5,-0.5], [90,0,180])); //39:purple
  this.AddPiece(new Piece("OctoImages/Center7.jpg", this.CenterModel, [-0.5,-1.5,-0.5], [90,0,180])); //40:purple
  this.AddPiece(new Piece("OctoImages/Center7.jpg", this.CenterModel, [-0.5,-0.5,-1.5], [90,0,180])); //41:purple
}



Puzzle.prototype.InitMoves = function() {
  this.CreateMovePair([0,2,4, 6,10,12, 18,19,20, 21,23,27,28,31,32], [1,1,1], 120); // green
  this.CreateMovePair([7,9,11,13,14,16, 29,34,30,38,22,24], [-1,-1, -1], 120);
  this.CreateMovePair([1,3,5, 8,15,17, 39,40,41,25,26,33,35,36,37], [-1,-1, -1], 120); // purple

  this.CreateMovePair([0,3,4, 9,10,14, 21,22,23, 18,20,24,25,37,38], [1,-1,1], 120); // orange
  this.CreateMovePair([6,8,11,12,15,16, 19,26,27,32,36,40], [1,-1,1], 120); 
  this.CreateMovePair([1,2,5, 7,13,17, 33,34,35,28,29,30,31,39,41], [-1, 1,-1], 120); // pink

  this.CreateMovePair([0,3,5, 9,11,15, 21,22,24,25,26,27,29,40,41], [1,-1,-1], 120); // red
  this.CreateMovePair([6,8,10,13,14,17, 18,23,28,35,37,39], [-1, 1, 1], 120); 
  this.CreateMovePair([1,2,4, 7,12,16, 30,31,32,19,20,33,34,36,38], [-1, 1, 1], 120); // yellow

  this.CreateMovePair([0,2,5, 6,11,13, 27,28,29,18,19,34,35,24,26], [1, 1,-1], 120); // blue
  this.CreateMovePair([7,9,10,12,15,17, 20,21,25,31,33,41], [-1,-1, 1], 120); 
  this.CreateMovePair([1,3,4, 8,14,16, 36,37,38,22,23,30,32,39,40], [-1,-1, 1], 120); // cyan
}


Puzzle.prototype.InitSequences = function() {
  return;
  seq_info = [
  ];

  this.LoadSequences(seq_info);
}

// Generate a list of puzzle symmetries.
Puzzle.prototype.InitSymmetries = function() {
  return;
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


