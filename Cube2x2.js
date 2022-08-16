

Puzzle.prototype.InitCamera = function(camera){
  camera.ViewPlaneNormal = [0,0,1];
  camera.Up = [0,1,0];
  camera.Right = [1,0,0];

  camera.Height = 5.0;
  camera.ComputeMatrix();
}

Puzzle.prototype.InitModels = function() {
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
}


Puzzle.prototype.InitPieces = function() {
  this.AddPiece(new Piece("CubeImages/Corner0.jpg", this.CornerModel, [-1,-1,-1], [90,0,180], 3));
  this.AddPiece(new Piece("CubeImages/Corner1.jpg", this.CornerModel, [ 1,-1,-1], [180,0,0], 3));
  this.AddPiece(new Piece("CubeImages/Corner2.jpg", this.CornerModel, [-1, 1,-1], [0,180,0], 3));
  this.AddPiece(new Piece("CubeImages/Corner3.jpg", this.CornerModel, [ 1, 1,-1], [-90,0,0], 3));
  this.AddPiece(new Piece("CubeImages/Corner4.jpg", this.CornerModel, [-1,-1, 1], [90,0,90], 3));
  this.AddPiece(new Piece("CubeImages/Corner5.jpg", this.CornerModel, [ 1,-1, 1], [90,0,0], 3));
  this.AddPiece(new Piece("CubeImages/Corner6.jpg", this.CornerModel, [-1, 1, 1], [0,-90,0], 3));
  this.AddPiece(new Piece("CubeImages/Corner7.jpg", this.CornerModel, [ 1, 1, 1], [0,0,0], 3)); 
}



Puzzle.prototype.InitMoves = function() {
  this.CreateMovePair([0,2,4,6], [1,0,0], 90);
  this.CreateMovePair([1,3,5,7], [1,0,0], 90);
  this.CreateMovePair([0,1,4,5], [0,1,0], 90);
  this.CreateMovePair([2,3,6,7], [0,1,0], 90);
  this.CreateMovePair([0,1,2,3], [0,0,1], 90);
  this.CreateMovePair([4,5,6,7], [0,0,1], 90);
}


Puzzle.prototype.InitSequences = function() {
  seq_info = [
    [1, 5, 5, 0],
    // Rotate two opposite corners
    [1, 7, 0, 6, 1, 7, 0, 5, 5, 1, 6, 0, 7, 1, 6, 0, 4, 4],
    [9, 3, 8, 2, 9, 3, 8, 1, 1, 9, 2, 8, 3, 9, 2, 8, 0, 0],    
    [3, 11, 11, 2, 5, 11, 11, 4, 8, 8, 5, 10, 10, 4, 3, 10, 10, 2, 8, 8],
    // Swap two corners (no rotation) (Odd I have three of these).
    [6, 8, 7, 9, 6, 8, 7, 10, 6, 9, 7, 8, 6, 9, 7, 11],    
    [1, 5, 2, 4, 7, 3, 6, 3, 8, 2, 9, 0, 8, 3, 9, 2, 7, 2, 6, 5, 3, 4, 1],    
    [4, 3, 7, 2, 1, 6, 0, 6, 10, 7, 11, 5, 10, 6, 11, 7, 1, 7, 0, 3, 6, 2, 4],
    // Rotate two corners.
    [0, 5, 4, 1, 0, 5, 1, 4, 0, 5, 1, 7, 0, 4, 1, 5, 0, 4, 1, 6],
    // Swap corners
    [11, 0, 5, 1, 7, 0, 4, 1, 10, 6]];

  this.LoadSequences(seq_info);

}

