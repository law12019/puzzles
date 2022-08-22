

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
  model = new PieceModel([1,0,0], 4);
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
  model.AddInTriangle(0,1,2); // 0
  model.AddInTriangle(2,1,3); 
  model.AddOutTriangle(2,3,5); // 2
  model.AddOutTriangle(5,3,6);
  model.AddOutTriangle(5,6,8); // 4
  model.AddOutTriangle(8,6,9);
  model.AddInTriangle(8,9,10); // 6
  model.AddInTriangle(10,9,11);
  model.AddInTriangle(2,5,4);  // 8
  model.AddInTriangle(4,5,8);
  model.AddInTriangle(3,7,6);  // 10
  model.AddInTriangle(6,7,9);
  model.InitBuffers();
  this.EdgeModel = model;

  // StaticPiece
  model = new PieceModel([1,1,0], 1);
  // Points and texture coordinates
  // Yellow
  model.AddPoint( 1.0,-1.0,-3.0, 0.015,0.99); //0
  // back to Cyan
  model.AddPoint( 1.0,-3.0,-3.0, 0.015,0.485); //1
  model.AddPoint( 1.0,-3.0, 3.0, 0.485,0.015); //2
  // center: Cyan->Purple
  model.AddPoint(-3.0,-3.0,-3.0, 0.258,0.728); //3
  model.AddPoint(-3.0,-3.0, 3.0, 0.728,0.258); //4
  // Purple to back.
  model.AddPoint(-3.0,-1.0,-3.0, 0.52,0.99); //5
  model.AddPoint(-3.0,-1.0, 3.0, 0.99,0.52); //6
  // Red
  model.AddPoint( 1.0,-1.0, 3.0, 0.99,0.015); //7

  // Purple back
  model.AddPoint( 1.0,-1.0,-3.0, 1.00,1.00); //8
  model.AddPoint( 1.0,-1.0, 3.0, 1.00,1.00); //9
  // Cyan back
  model.AddPoint( 1.0,-1.0,-3.0, 0.0,0.0); //10
  model.AddPoint( 1.0,-1.0, 3.0, 0.0,0.0);  //11 
  // -- Faces
  // Yellow (-z) 0,1,3,5
  model.AddOutTriangle(1,0,3);
  model.AddOutTriangle(3,0,5);
  // Cyan (-y) 1,2,3,4
  model.AddOutTriangle(1,2,3);
  model.AddOutTriangle(3,2,4);
  // Purple (-x) 3,4,5,6
  model.AddOutTriangle(4,6,3);
  model.AddOutTriangle(3,6,5);
  // Red (+z) 2,4,6,7
  model.AddOutTriangle(2,4,7);
  model.AddOutTriangle(7,4,6);
  // Purple back
  model.AddInTriangle(5,6,8);
  model.AddInTriangle(8,6,9);
  // Cyan back
  model.AddInTriangle(10,11,1);
  model.AddInTriangle(1,11,2);

  model.InitBuffers();
  this.StaticModel = model;
}


// Rotation order is z,y,x.  Clockwise when at the origin looking out the axis.
// Anti clockwise when looking downthe axis at the origin.
Puzzle.prototype.InitPieces = function() {
  // 0 this.AddPiece(new Piece("CubeImages/Corner0.jpg", this.CornerModel, [-2,-2,-2], [90,0,180]));
  this.AddPiece(new Piece("CubeImages/Corner1.jpg", this.CornerModel, [ 2,-2,-2], [180,0,0]));
  this.AddPiece(new Piece("CubeImages/Corner2.jpg", this.CornerModel, [-2, 2,-2], [0,180,0]));
  this.AddPiece(new Piece("CubeImages/Corner3.jpg", this.CornerModel, [ 2, 2,-2], [-90,0,0]));
  this.AddPiece(new Piece("CubeImages/Corner5.jpg", this.CornerModel, [ 2,-2, 2], [90,0,0]));
  this.AddPiece(new Piece("CubeImages/Corner6.jpg", this.CornerModel, [-2, 2, 2], [0,-90,0]));
  this.AddPiece(new Piece("CubeImages/Corner7.jpg", this.CornerModel, [ 2, 2, 2], [0,0,0])); 
  // 7
  this.AddPiece(new Piece("CubeImages/Center0.jpg", this.CenterModel, [ -2, 0, 0], [0,180,0])); 
  this.AddPiece(new Piece("CubeImages/Center1.jpg", this.CenterModel, [ 2, 0, 0], [0,0,0])); 
  this.AddPiece(new Piece("CubeImages/Center3.jpg", this.CenterModel, [ 0, 2, 0], [0,0,90])); 
  this.AddPiece(new Piece("CubeImages/Center4.jpg", this.CenterModel, [ 0, 0, -2], [0,90,0])); 
  this.AddPiece(new Piece("CubeImages/Center5.jpg", this.CenterModel, [ 0, 0, 2], [0,-90,0])); 
  // 12  
  this.AddPiece(new Piece("CubeImages/Edge0.jpg", this.EdgeModel, [ 2, 2, 0], [0,0,0])); 
  this.AddPiece(new Piece("CubeImages/Edge1.jpg", this.EdgeModel, [-2, 2, 0], [0,0,90])); 
  this.AddPiece(new Piece("CubeImages/Edge3.jpg", this.EdgeModel, [ 2,-2, 0], [0,0,-90])); 
  this.AddPiece(new Piece("CubeImages/Edge4.jpg", this.EdgeModel, [ 2, 0, 2], [90,0,0])); 
  this.AddPiece(new Piece("CubeImages/Edge5.jpg", this.EdgeModel, [-2, 0, 2], [90,0,90]));
  this.AddPiece(new Piece("CubeImages/Edge6.jpg", this.EdgeModel, [-2, 0,-2], [-90,0,90]));
  this.AddPiece(new Piece("CubeImages/Edge7.jpg", this.EdgeModel, [ 2, 0,-2], [-90,0,0])); 
  this.AddPiece(new Piece("CubeImages/Edge8.jpg", this.EdgeModel, [ 0, 2, 2], [0,-90,0])); 
  this.AddPiece(new Piece("CubeImages/Edge9.jpg", this.EdgeModel, [ 0, 2,-2], [0,90,0])); 
  // Static piece

  this.AddPiece(new Piece("CubeImages/static2.jpg", this.StaticModel, [0,0,0], [0,0,0]));
}



Puzzle.prototype.InitMoves = function() {
  this.CreateMovePair([0,2,3,5, 7, 11,13,14,17], [1,0,0], 90);  
  this.CreateMovePair([6,7,9,10, 14,15,16,17], [0,1,0], 90);
  this.CreateMovePair([1,2,4,5, 8, 11,12,18,19], [0,1,0], 90);

}


Puzzle.prototype.InitSequences = function() {
  seq_info = [
    [4, 0, 5, 0, 4, 1, 1, 5, 0, 0, 5, 1, 4, 1, 5, 0, 0, 4, 1, 1],
    [5, 1, 4, 1, 5, 0, 0, 4, 1],
    [1, 5, 5, 1, 4, 4, 0, 0, 5, 5, 1, 4, 4],
    [0, 5, 0, 4, 1, 1, 5, 0, 4, 4, 0, 5, 0, 4, 1, 1, 5, 0],
    [5, 1, 4, 1, 5, 0, 0, 4, 1, 5, 0, 5, 1, 1, 4, 0, 5, 0, 4, 4]
  ];

  this.LoadSequences(seq_info);
}



// Generate a list of puzzle symmetries.
Puzzle.prototype.InitSymmetries = function() {
  transforms = [];
  var flipMat = mat4.create();
  mat4.identity(flipMat);
  flipMat[10] = -1; // z
  transforms.push(flipMat);
  this.LoadSymmetries(transforms);
}


