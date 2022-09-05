

Puzzle.prototype.InitCamera = function(camera){
  camera.ViewPlaneNormal = [0,-1,0];
  camera.Up = [0,0,1];
  camera.Right = [1,0,0];

  camera.Height = 12.0;
  camera.ComputeMatrix();
}


var s2 = Math.sqrt(2.0);
var s3 = Math.sqrt(3.0);
var t0 = [-s3,-1, -s2/2];
var t1 = [s3, -1, -s2/2];
var t2 = [0,   2, -s2/2];
var t3 = [0,   0, s2*3/2];
var v01 = [t0[0]+t1[0], t0[1]+t1[1], t0[2]+t1[2]];
var v02 = [t0[0]+t2[0], t0[1]+t2[1], t0[2]+t2[2]];
var v03 = [t0[0]+t3[0], t0[1]+t3[1], t0[2]+t3[2]];
var v12 = [t1[0]+t2[0], t1[1]+t2[1], t1[2]+t2[2]];
var v13 = [t1[0]+t3[0], t1[1]+t3[1], t1[2]+t3[2]];
var v23 = [t2[0]+t3[0], t2[1]+t3[1], t2[2]+t3[2]];

// Trianges rotate anti-clockwise from the outside.
Puzzle.prototype.InitModels = function() {
  // All points should be same distance from origin.
  //console.log(Math.sqrt(t0[0]*t0[0] + t0[1]*t0[1] + t0[2]*t0[2]));
  //console.log(Math.sqrt(t1[0]*t1[0] + t1[1]*t1[1] + t1[2]*t1[2]));
  //console.log(Math.sqrt(t2[0]*t2[0] + t2[1]*t2[1] + t2[2]*t2[2]));
  //console.log(Math.sqrt(t3[0]*t3[0] + t3[1]*t3[1] + t3[2]*t3[2]));
  
  // Edge
  var model = new PieceModel(v01, 2);
  model.AddPoint(t0[0],t0[1],t0[2], 0.05,0.05); // 0: base
  model.AddPoint(t1[0],t1[1],t1[2], 0.95,0.95);  // 1: x edge tip
  model.AddPoint(t2[0],t2[1],t2[2], 0.95,0.05);    // 2: y tri tip
  model.AddPoint(t3[0],t3[1],t3[2], 0.05,0.95);     // 3: z tetra tip
  // Duplicates for inside texturemap.
  model.AddPoint(t2[0],t2[1],t2[2], 0.0,0.5);    // 4: dup of 2
  model.AddPoint(t3[0],t3[1],t3[2], 1.0,0.5);     // 5: dup of 3
  // Faces
  model.AddOutFace([1,0,2]); // bottom out
  model.AddOutFace([0,1,3]); // top out
  model.AddInFace([0,3,4]);
  model.AddInFace([1,2,5]);
  model.InitBuffers();
  this.EdgeModel = model;

  var model = new PieceModel([0,0,1], 3);
  model.AddPoint(t0[0], t0[1], s2, 0.25,0.625);   // 0: top
  model.AddPoint(t1[0], t1[1], s2, 0.75,0.625);  // 1: 
  model.AddPoint(t2[0], t2[1], s2, 0.50,0.25);  // 2:
  model.AddPoint(t0[0],-t0[1],-s2, 0.0,0.25);   // 3: bottom
  model.AddPoint(t1[0],-t1[1],-s2, 1.0,0.25); // 4:
  model.AddPoint(t2[0],-t2[1],-s2, 0.5,1.0); // 5:
  // Faces
  model.AddOutFace([0,1,2]); // Top
  model.AddOutFace([0,5,1]); //
  model.AddOutFace([1,4,2]); //
  model.AddOutFace([2,3,0]); //
  model.AddInFace([3,4,5]); // Bottom
  model.AddInFace([0,3,5]); // 
  model.AddInFace([1,5,4]); // 
  model.AddInFace([2,4,3]); // 
  model.InitBuffers();
  this.CornerModel = model;
}


// Rotation order is z,y,x.  Clockwise when at the origin looking out the axis.
// Anti clockwise when looking downthe axis at the origin.
Puzzle.prototype.InitPieces = function() {
  this.AddPiece(new Piece("TetraImages/TetraCorner0.jpg", this.CornerModel, t3)); // 0
  this.Pieces[0].Rotate(t3[0],t3[1],t3[2], -120);
  this.AddPiece(new Piece("TetraImages/TetraCorner1.jpg", this.CornerModel, t1)); // 1
  this.Pieces[1].Rotate(t0[0],t0[1],t0[2], -120);
  this.AddPiece(new Piece("TetraImages/TetraCorner2.jpg", this.CornerModel, t0)); // 2
  this.Pieces[2].Rotate(t1[0],t1[1],t1[2], 120);
  this.AddPiece(new Piece("TetraImages/TetraCorner3.jpg", this.CornerModel, t2)); // 3
  this.Pieces[3].Rotate(t0[0],t0[1],t0[2], -120);
  this.Pieces[3].Rotate(t2[0],t2[1],t2[2], 120);

  
  this.AddPiece(new Piece("TetraImages/TetraEdge0.jpg", this.EdgeModel, v01)); // 4: r,y
  this.AddPiece(new Piece("TetraImages/TetraEdge1.jpg", this.EdgeModel, v13)); // 5: g,y
  this.Pieces[5].Rotate(t2[0],t2[1],t2[2], -120);
  this.AddPiece(new Piece("TetraImages/TetraEdge2.jpg", this.EdgeModel, v03)); // 6: p,y
  this.Pieces[6].Rotate(t2[0],t2[1],t2[2], 120);
  this.AddPiece(new Piece("TetraImages/TetraEdge3.jpg", this.EdgeModel, v12)); // 7: r,g
  this.Pieces[7].Rotate(t3[0],t3[1],t3[2], 120);
  this.AddPiece(new Piece("TetraImages/TetraEdge4.jpg", this.EdgeModel, v02)); // 8: r,p
  this.Pieces[8].Rotate(t3[0],t3[1],t3[2], -120);
  this.Pieces[8].Rotate(v01[0],v01[1],v01[2], 180);
  this.AddPiece(new Piece("TetraImages/TetraEdge5.jpg", this.EdgeModel, v23)); // 9: g,p
  this.Pieces[9].Rotate(t1[0],t1[1],t1[2], 120);
  this.Pieces[9].Rotate(t0[0],t0[1],t0[2], -120);
}



Puzzle.prototype.InitMoves = function() {
  this.CreateMovePair([3, 7,8,9], t2, 120); // Yellow
  this.CreateMovePair([2, 4,6,8], t0, 120); // Green
  this.CreateMovePair([1, 4,5,7], t1, 120); // Purple
  this.CreateMovePair([0, 5,6,9], t3, 120); // Red

  this.CreateMovePair([0,1,2, 4,5,6], t2, 120); // Yellow
  this.CreateMovePair([0,1,3, 5,7,9], t0, 120); // Green
  this.CreateMovePair([0,2,3, 6,8,9], t1, 120); // Purple
  this.CreateMovePair([1,2,3, 4,7,8], t3, 120); // Red
}


Puzzle.prototype.InitSequences = function() {
  seq_info = [
    [3, 0, 2, 1],
    [3, 0, 2, 1, 14, 0, 3, 1, 2, 15]
  ];

  this.LoadSequences(seq_info);
}

// Generate a list of puzzle symmetries.
Puzzle.prototype.InitSymmetries = function() {
  transforms = [];
  transforms.push(GetRotationMatrix(t0[0],t0[1],t0[2], 120));
  transforms.push(GetRotationMatrix(t1[0],t1[1],t1[2], 120));
  transforms.push(GetRotationMatrix(t2[0],t2[1],t2[2], 120));
  transforms.push(GetRotationMatrix(t3[0],t3[1],t3[2], 120));
  var flipMat = mat4.create();
  mat4.identity(flipMat);
  flipMat[0] = -1;
  transforms.push(flipMat);
  this.LoadSymmetries(transforms);
}


