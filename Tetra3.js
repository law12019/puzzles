

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


  // Corner Octo (out checked)
  var model = new PieceModel([0,0,1], 3);
  model.AddPoint(t0[0], t0[1], s2, 0.25,0.625);   // 0: top
  model.AddPoint(t1[0], t1[1], s2, 0.75,0.625);   // 1: 
  model.AddPoint(t2[0], t2[1], s2, 0.50,0.25);    // 2:
  model.AddPoint(t0[0],-t0[1],-s2, 0.0,0.25);   // 3: bottom
  model.AddPoint(t1[0],-t1[1],-s2, 1.0,0.25);   // 4:
  model.AddPoint(t2[0],-t2[1],-s2, 0.5,1.0);    // 5:
  model.AddOutFace([0,1,2]); // out top
  model.AddOutFace([0,5,1]); // out side
  model.AddOutFace([1,4,2]);  // out side
  model.AddOutFace([2,3,0]); // out side
  model.AddInFace([0,3,5]); // in side 
  model.AddInFace([1,5,4]); // in side
  model.AddInFace([2,4,3]); // in side
  model.AddInFace([3,4,5]); // in bottom
  model.InitBuffers();
  this.CornerModel = model;

  // Edge Octo (out checks) Swapped x, y texture coordinates. Too late to fix now.
  var model = new PieceModel([-s3,-1,s2], 2);
  model.AddPoint(t0[0], t0[1], s2, 0.5,0.5);    // 0: out vert 
  model.AddPoint(t2[0], t2[1], s2, 0.05,0.05);  // 1:
  model.AddPoint(t1[0], t1[1], s2, 0.05,0.95);  // 2: 
  model.AddPoint(t0[0],-t0[1],-s2, 0.95,0.05);  // 3:
  model.AddPoint(t2[0],-t2[1],-s2, 0.95,0.95);  // 4:
  model.AddPoint(t1[0],-t1[1],-s2, 0.0,0.5);   // 5: inside 
  model.AddPoint(t1[0],-t1[1],-s2, 0.5,0.0);   // 6: inside 
  model.AddPoint(t1[0],-t1[1],-s2, 1.0,0.5);   // 7: inside 
  model.AddPoint(t1[0],-t1[1],-s2, 0.5,1.0);   // 8: inside 
  model.AddOutFace([0,4,2]); // out face top 
  model.AddOutFace([0,1,3]); // out face bottom
  model.AddInFace([0,2,1]); // 
  model.AddInFace([0,3,4]); //
  model.AddInFace([1,2,5]);  //
  model.AddInFace([3,1,6]);  // 
  model.AddInFace([4,3,7]);  // 
  model.AddInFace([2,4,8]);  // 
  model.InitBuffers();
  this.OctoEdgeModel = model;
  
  // Edge Tetra (outs verified)
  var model = new PieceModel([0,-2,-s2], 2);
  model.AddPoint(t0[0],t0[1],t0[2], 0.05,0.05);  // 0->1 : outside edge
  model.AddPoint(t1[0],t1[1],t1[2], 0.95,0.95);  // 1:
  model.AddPoint(t2[0],t2[1],t2[2], 0.95,0.05);  // 2:
  model.AddPoint(t3[0],t3[1],t3[2], 0.05,0.95);  // 3:
  // Duplicates for inside texturemap.
  model.AddPoint(t2[0],t2[1],t2[2], 0.0,0.5);    // 4: dup of 2
  model.AddPoint(t3[0],t3[1],t3[2], 1.0,0.5);     // 5: dup of 3
  // Faces
  model.AddOutFace([1,0,2]); // bottom out
  model.AddOutFace([0,1,3]); // top out
  model.AddInFace([0,3,4]);
  model.AddInFace([1,2,5]);
  model.InitBuffers();
  this.TetraEdgeModel = model;

  // Center Tetra
  var model = new PieceModel([0,0,-1], 3);
  model.AddPoint(t0[0],t0[1],t0[2], 0.05,0.95);   // 0:
  model.AddPoint(t1[0],t1[1],t1[2], 0.95,0.95);   // 1:
  model.AddPoint(t2[0],t2[1],t2[2], 0.05,0.05);   // 2:
  model.AddPoint(t3[0],t3[1],t3[2], 0.5,1.0); // 3: inside vert
  model.AddPoint(t3[0],t3[1],t3[2], 0.5,0.5); // 4: inside vert
  model.AddPoint(t3[0],t3[1],t3[2], 0.0,0.5); // 5: inside vert
  model.AddOutFace([1,0,2]); // out
  model.AddInFace([0,1,3]); 
  model.AddInFace([1,2,4]);
  model.AddInFace([2,0,5]);
  model.InitBuffers();
  this.TetraCenterModel = model;
}


// Rotation order is z,y,x.  Clockwise when at the origin looking out the axis.
// Anti clockwise when looking downthe axis at the origin.
Puzzle.prototype.InitPieces = function() {
  // Check to see all corners are the same distance from origin.
  //var tmp = [0, 4, -s2];
  //var d0 = tmp[0]*tmp[0] + tmp[1]*tmp[1] + tmp[2]*tmp[2];
  //var tmp = [0, 0, 3*s2];
  //var d1 = tmp[0]*tmp[0] + tmp[1]*tmp[1] + tmp[2]*tmp[2];
  //var tmp = [-2*s3, -2, -1*s2];
  //var d2 = tmp[0]*tmp[0] + tmp[1]*tmp[1] + tmp[2]*tmp[2];
  //var tmp = [2*s3, -2, -1*s2];
  //var d3 = tmp[0]*tmp[0] + tmp[1]*tmp[1] + tmp[2]*tmp[2];

  // Corners
  this.AddPiece(new Piece("TetraImages/TetraCorner0.jpg", this.CornerModel, [0, 4, -s2]));      // 0:g,y,p
  this.Pieces[0].Rotate(t3[0],t3[1],t3[2], -120);
  this.Pieces[0].Rotate(t1[0],t1[1],t1[2], 120);
  this.AddPiece(new Piece("TetraImages/TetraCorner1.jpg", this.CornerModel, [0, 0, 3*s2]));     // 1:y,g,r
  this.AddPiece(new Piece("TetraImages/TetraCorner2.jpg", this.CornerModel, [-2*s3, -2, -s2])); // 2:p,y,r
  this.Pieces[2].Rotate(t2[0],t2[1],t2[2], -120);
  this.AddPiece(new Piece("TetraImages/TetraCorner3.jpg", this.CornerModel, [2*s3, -2, -s2]));  // 3:g,p,r
  this.Pieces[3].Rotate(t2[0],t2[1],t2[2], 120);

  // Centers
  this.AddPiece(new Piece("TetraImages/TetraCenter0.jpg", this.TetraCenterModel, [-s3,1,0.5*s2]));// 4:y
  this.Pieces[4].Rotate(t0[0],t0[1],t0[2], -120);
  this.AddPiece(new Piece("TetraImages/TetraCenter1.jpg", this.TetraCenterModel, [0,0,-1.5*s2])); // 5:p
  this.AddPiece(new Piece("TetraImages/TetraCenter2.jpg", this.TetraCenterModel, [s3,1,0.5*s2])); // 6:g
  this.Pieces[6].Rotate(t1[0],t1[1],t1[2], 120);
  this.AddPiece(new Piece("TetraImages/TetraCenter3.jpg", this.TetraCenterModel, [0,-2,0.5*s2])); // 7:r
  this.Pieces[7].Rotate(t0[0],t0[1],t0[2], 120);

  // OctoEdges
  this.AddPiece(new Piece("TetraImages/TetraPyramid0.jpg", this.OctoEdgeModel, [-s3, -1, s2])); // 8:r,y
  this.AddPiece(new Piece("TetraImages/TetraPyramid1.jpg", this.OctoEdgeModel, [s3, -1, s2]));  // 9:r,g
  this.Pieces[9].Rotate(t2[0],t2[1],t2[2], 120);
  this.AddPiece(new Piece("TetraImages/TetraPyramid2.jpg", this.OctoEdgeModel, [0, -2, -s2]));  // 10:r,p
  this.Pieces[10].Rotate(t2[0],t2[1],t2[2], -120);
  this.AddPiece(new Piece("TetraImages/TetraPyramid3.jpg", this.OctoEdgeModel, [-s3, 1, -s2])); // 11:p,y
  this.Pieces[11].Rotate(t1[0],t1[1],t1[2], 120);
  this.AddPiece(new Piece("TetraImages/TetraPyramid4.jpg", this.OctoEdgeModel, [0, 2, s2]));    // 12:g,y
  this.Pieces[12].Rotate(t1[0],t1[1],t1[2], -120);
  this.AddPiece(new Piece("TetraImages/TetraPyramid5.jpg", this.OctoEdgeModel, [s3, 1, -s2]));  // 13:p,g
  this.Pieces[13].Rotate(t2[0],t2[1],t2[2], 120);
  this.Pieces[13].Rotate(t1[0],t1[1],t1[2], -120);

  // TetraEdges
  this.AddPiece(new Piece("TetraImages/TetraEdge0.jpg", this.TetraEdgeModel, [-2*s3,-2,0.5*s2]));  // 14: r,y
  this.Pieces[14].Rotate(t0[0],t0[1],t0[2], 120);
  this.AddPiece(new Piece("TetraImages/TetraEdge0.jpg", this.TetraEdgeModel, [-s3,-1,2.5*s2]));    // 15: r,y
  this.Pieces[15].Rotate(t0[0],t0[1],t0[2], 120);
  this.AddPiece(new Piece("TetraImages/TetraEdge1.jpg", this.TetraEdgeModel, [0,4,0.5*s2]));       // 16: g,y
  this.Pieces[16].Rotate(t0[0],t0[1],t0[2], 120);
  this.Pieces[16].Rotate(t2[0],t2[1],t2[2], -120);
  this.AddPiece(new Piece("TetraImages/TetraEdge1.jpg", this.TetraEdgeModel, [0,2,2.5*s2]));       // 17: g,y
  this.Pieces[17].Rotate(t0[0],t0[1],t0[2], 120);
  this.Pieces[17].Rotate(t2[0],t2[1],t2[2], -120);
  this.AddPiece(new Piece("TetraImages/TetraEdge2.jpg", this.TetraEdgeModel, [-2*s3,0,-1.5*s2]));      // 18: p,y
  this.Pieces[18].Rotate(t3[0],t3[1],t3[2], -120);
  this.AddPiece(new Piece("TetraImages/TetraEdge2.jpg", this.TetraEdgeModel, [-s3,3,-1.5*s2]));        // 19: p,y
  this.Pieces[19].Rotate(t3[0],t3[1],t3[2], -120);
  this.AddPiece(new Piece("TetraImages/TetraEdge3.jpg", this.TetraEdgeModel, [2*s3,-2,0.5*s2]));   // 20: r,g
  this.Pieces[20].Rotate(t1[0],t1[1],t1[2], -120);
  this.AddPiece(new Piece("TetraImages/TetraEdge3.jpg", this.TetraEdgeModel, [s3,-1,2.5*s2]));     // 21: r,g
  this.Pieces[21].Rotate(t1[0],t1[1],t1[2], -120);
  this.AddPiece(new Piece("TetraImages/TetraEdge4.jpg", this.TetraEdgeModel, [-s3,-3,-1.5*s2]));       // 22: r,p
  this.AddPiece(new Piece("TetraImages/TetraEdge4.jpg", this.TetraEdgeModel, [s3,-3,-1.5*s2]));        // 23: r,p
  this.AddPiece(new Piece("TetraImages/TetraEdge5.jpg", this.TetraEdgeModel, [2*s3,0,-1.5*s2]));       // 24: g,p
  this.Pieces[24].Rotate(t3[0],t3[1],t3[2], 120);
  this.AddPiece(new Piece("TetraImages/TetraEdge5.jpg", this.TetraEdgeModel, [s3,3,-1.5*s2]));         // 25: g,p
  this.Pieces[25].Rotate(t3[0],t3[1],t3[2], 120);
}


Puzzle.prototype.InitMoves = function() {
  this.CreateMovePair([1, 15,17,21], t3, 120); // Purple
  this.CreateMovePair([4,6,7, 8,9,12, 14,16,20], t3, 120); // Purple
  this.CreateMovePair([0,2,3, 5, 10,11,13, 18,19,22,23,24,25], t3, 120); // Purple
  
  this.CreateMovePair([0, 16,19,25], t2, 120); // Red
  this.CreateMovePair([4,5,6, 11,12,13, 17,18,24], t2, 120); // Red
  this.CreateMovePair([1,2,3, 7, 8,9,10, 14,15,20,21,22,23], t2, 120); // Red

  this.CreateMovePair([2, 14,18,22], t0, 120); // Green
  this.CreateMovePair([4,5,7, 8,10,11,  15,19,23], t0, 120); // Green
  this.CreateMovePair([0,1,3, 6, 9,12,13, 16,17,20,21,24,25], t0, 120); // Green

  this.CreateMovePair([3, 20, 23, 24], t1, 120); // Yellow
  this.CreateMovePair([5,6,7, 9,10,13, 21, 22, 25], t1, 120); // Yellow
  this.CreateMovePair([0,1,2, 4, 8,11,12, 14,15,16,17,18,19], t1, 120); // Yellow
}


Puzzle.prototype.InitSequences = function() {
  seq_info = [
    // Not a great sequence Same( [3, 11, 3, 9, 2, 10, 2, 8])
    // Rotates two octo edges, but swaps two pairs of centers too
    [15, 5, 15, 2, 14, 4, 14, 3], 
    [8, 0, 0, 9, 23, 1, 22, 5, 23, 0, 22, 8, 1, 1, 9, 4], // Rotate 2 corners
    // Swaps two pairs of centers.
    [9, 17, 9, 14, 8, 16, 8, 15, 23, 15, 5, 15, 2, 14, 4, 14, 3, 22]
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


