// I need to:
// Rename piece sets.
// New texture maps for PYRAMIDS, and CENTERS.
// New Moves.


var MOVES = [];
var CORNERS = new PieceSet();
var EDGES = new PieceSet();
// Now I realize the pyramids are actually octohedrons :)
// I will need a new piece set because these 
// have different out faces than corners.
var PYRAMIDS = new PieceSet();
var CENTERS = new PieceSet();

function InitCamera() {
    CAMERA.ViewPlaneNormal = [1,0,0];
    CAMERA.Up = [0,0,1];
    CAMERA.Right = [0,1,0];

    CAMERA.Height = 18.0;
    CAMERA.ComputeMatrix();
}

    var s2 = Math.sqrt(2.0);
    var s3 = Math.sqrt(3.0);
    var t0 = [0,0,3*s2];
    var t1 = [4,0,-s2];
    var t2 = [-2,2*s3,-s2];
    var t3 = [-2,-2*s3,-s2];
   

function InitBuffers() {
    EDGES.AddPoint(t0[0],t0[1],t0[2], 0.95,0.05);
    EDGES.AddPoint(t1[0],t1[1],t1[2], 0.05,0.95);
    EDGES.AddPoint(t2[0],t2[1],t2[2], 0.05,0.05);
    EDGES.AddPoint(t3[0],t3[1],t3[2], 0.95,0.95);
    EDGES.AddOutTriangle(0,1,2); 
    EDGES.AddOutTriangle(0,3,1);
    EDGES.AddInTriangle(1,3,2);
    EDGES.AddInTriangle(0,2,3);
    EDGES.InitBuffers();

    CENTERS.AddPoint(-t0[0],-t0[1],-t0[2], 0.95,0.05);
    CENTERS.AddPoint(-t1[0],-t1[1],-t1[2], 0.05,0.95);
    CENTERS.AddPoint(-t2[0],-t2[1],-t2[2], 0.05,0.05);
    CENTERS.AddPoint(-t3[0],-t3[1],-t3[2], 0.95,0.95);
    CENTERS.AddOutTriangle(0,2,1); 
    CENTERS.AddOutTriangle(0,1,3);
    CENTERS.AddInTriangle(1,2,3);
    CENTERS.AddInTriangle(0,3,2);
    CENTERS.InitBuffers();

    PYRAMIDS.AddPoint(t0[0]+t1[0],t0[1]+t1[1],t0[2]+t1[2], 0.50,0.50);//0
    PYRAMIDS.AddPoint(t2[0]+t0[0],t2[1]+t0[1],t2[2]+t0[2], 0.05,0.05);//1
    PYRAMIDS.AddPoint(t2[0]+t1[0],t2[1]+t1[1],t2[2]+t1[2], 0.05,0.95);//2
    PYRAMIDS.AddPoint(t3[0]+t0[0],t3[1]+t0[1],t3[2]+t0[2], 0.95,0.05);//3
    PYRAMIDS.AddPoint(t3[0]+t1[0],t3[1]+t1[1],t3[2]+t1[2], 0.95,0.95);//4
    PYRAMIDS.AddPoint(t2[0]+t3[0],t2[1]+t3[1],t2[2]+t3[2], 0.95,0.95);//5
    PYRAMIDS.AddOutTriangle(0,1,2); 
    PYRAMIDS.AddOutTriangle(0,4,3);
    PYRAMIDS.AddInTriangle(0,3,1);
    PYRAMIDS.AddInTriangle(0,2,4);

    PYRAMIDS.AddInTriangle(1,5,2);
    PYRAMIDS.AddInTriangle(2,5,4);
    PYRAMIDS.AddInTriangle(4,5,3);
    PYRAMIDS.AddInTriangle(3,5,1);
    PYRAMIDS.InitBuffers();

    var v0 = [-3*t0[0],-3*t0[1],-3*t0[2]];
    var v1 = [-3*t1[0],-3*t1[1],-3*t1[2]];
    var v2 = [-3*t2[0],-3*t2[1],-3*t2[2]];
    var v3 = [-3*t3[0],-3*t3[1],-3*t3[2]];

    var w0 = [v0[0]*2/3+v1[0]/3,v0[1]*2/3+v1[1]/3,v0[2]*2/3+v1[2]/3];
    var w1 = [v0[0]*2/3+v2[0]/3,v0[1]*2/3+v2[1]/3,v0[2]*2/3+v2[2]/3];
    var w2 = [v0[0]*2/3+v3[0]/3,v0[1]*2/3+v3[1]/3,v0[2]*2/3+v3[2]/3];

    //
    CORNERS.AddPoint(w0[0],w0[1],w0[2], 0.50,0.25); // 0
    CORNERS.AddPoint(w1[0],w1[1],w1[2], 0.75,0.625); // 1
    CORNERS.AddPoint(w2[0],w2[1],w2[2], 0.25,0.625); // 2
    CORNERS.AddPoint(t1[0],t1[1],t1[2], 0.50,1.00); // 3
    CORNERS.AddPoint(t2[0],t2[1],t2[2], 0.00,0.25); // 4
    CORNERS.AddPoint(t3[0],t3[1],t3[2], 1.00,0.25); // 5

    CORNERS.AddOutTriangle(0,2,1);
    CORNERS.AddOutTriangle(0,4,2);
    CORNERS.AddOutTriangle(2,3,1);
    CORNERS.AddOutTriangle(1,5,0);
    CORNERS.AddInTriangle(3,5,4); 
    CORNERS.AddInTriangle(3,4,2);
    CORNERS.AddInTriangle(5,3,1);
    CORNERS.AddInTriangle(4,5,0);

    CORNERS.InitBuffers();
}

function mid(p0,p1,p2) {
    var m = [];
    for (var i = 0; i < 3; ++i) {
	m.push((p0[i]+p1[i]+p2[i])/3);
    }
    return m;
}

// Axes: 1,-1,1
function InitPieces() {
    var m; 
    CORNERS.Pieces[0] = new Piece("TetraImages/TetraCorner0.jpg");
    CORNERS.Pieces[0].Translate(-t0[0],-t0[1],-t0[2]);
    m = mid(t0,t2,t3);
    CORNERS.Pieces[1] = new Piece("TetraImages/TetraCorner1.jpg");
    CORNERS.Pieces[1].Translate(t1[0],t1[1],t1[2]);
    CORNERS.Pieces[1].Rotate(t1[0]-m[0], t1[1]-m[1], t1[2]-m[2], 120);
    CORNERS.Pieces[1].Translate(-t1[0]-t0[0],-t1[1]-t0[1],-t1[2]-t0[2]);
    CORNERS.Pieces[2] = new Piece("TetraImages/TetraCorner2.jpg");
    CORNERS.Pieces[2].Translate(t1[0],t1[1],t1[2]);
    CORNERS.Pieces[2].Rotate(t1[0]-m[0], t1[1]-m[1], t1[2]-m[2], 240);
    CORNERS.Pieces[2].Translate(-t1[0]-t0[0],-t1[1]-t0[1],-t1[2]-t0[2]);
    m = mid(t0,t1,t3);
    CORNERS.Pieces[3] = new Piece("TetraImages/TetraCorner3.jpg");
    CORNERS.Pieces[3].Translate(t2[0],t2[1],t2[2]);
    CORNERS.Pieces[3].Rotate(t2[0]-m[0], t2[1]-m[1], t2[2]-m[2], 120);
    CORNERS.Pieces[3].Translate(-t2[0]-t0[0],-t2[1]-t0[1],-t2[2]-t0[2]);


    CENTERS.Pieces[0] = new Piece("TetraImages/TetraEdge0.jpg");
    CENTERS.Pieces[0].Translate(t0[0],t0[1],t0[2]);

    CENTERS.Pieces[1] = new Piece("TetraImages/TetraEdge0.jpg");
    CENTERS.Pieces[1].Rotate(t1[0],t1[1],t1[2], 120);
    CENTERS.Pieces[1].Translate(t0[0],t0[1],t0[2]);

    CENTERS.Pieces[2] = new Piece("TetraImages/TetraEdge0.jpg");
    CENTERS.Pieces[2].Rotate(t1[0],t1[1],t1[2], -120);
    CENTERS.Pieces[2].Translate(t0[0],t0[1],t0[2]);

    CENTERS.Pieces[3] = new Piece("TetraImages/TetraEdge0.jpg");
    CENTERS.Pieces[3].Rotate(t2[0],t2[1],t2[2], 120);
    CENTERS.Pieces[3].Translate(t0[0],t0[1],t0[2]);



    // 01
    var v0 = (t0[0]+t1[0]); 
    var v1 = (t0[1]+t1[1]); 
    var v2 = (t0[2]+t1[2]); 
    EDGES.Pieces[0] = new Piece("TetraImages/TetraEdge0.jpg");
    EDGES.Pieces[0].Translate(v0,v1,v2);
    EDGES.Pieces[0].Rotate(v0, v1, v2, 90);
    EDGES.Pieces[0].Translate(t0[0],t0[1],t0[2]);
    // 02
    var v0 = (t0[0]+t2[0]); 
    var v1 = (t0[1]+t2[1]); 
    var v2 = (t0[2]+t2[2]); 
    EDGES.Pieces[1] = new Piece("TetraImages/TetraEdge1.jpg");
    EDGES.Pieces[1].Translate(v0,v1,v2);
    EDGES.Pieces[1].Rotate(v0,v1,v2,90);
    EDGES.Pieces[1].Rotate(t0[0],t0[1],t0[2],120);
    EDGES.Pieces[1].Translate(t0[0],t0[1],t0[2]);
    // 03
    var v0 = (t1[0]+t2[0]); 
    var v1 = (t1[1]+t2[1]); 
    var v2 = (t1[2]+t2[2]); 
    EDGES.Pieces[2] = new Piece("TetraImages/TetraEdge2.jpg");
    EDGES.Pieces[2].Translate(-v0,-v1,-v2);
    EDGES.Pieces[2].Rotate(v0,v1,v2,90);
    EDGES.Pieces[2].Rotate(t0[0],t0[1],t0[2],-120);
    EDGES.Pieces[2].Translate(t0[0],t0[1],t0[2]);
    // 12
    var v0 = (t1[0]+t2[0]); 
    var v1 = (t1[1]+t2[1]); 
    var v2 = (t1[2]+t2[2]); 
    EDGES.Pieces[3] = new Piece("TetraImages/TetraEdge3.jpg");
    EDGES.Pieces[3].Translate(v0,v1,v2);
    EDGES.Pieces[3].Rotate(v0,v1,v2,90);
    EDGES.Pieces[3].Rotate(t1[0],t1[1],t1[2],-120);
    EDGES.Pieces[3].Translate(t0[0],t0[1],t0[2]);
    // 13
    var v0 = (t0[0]+t2[0]); 
    var v1 = (t0[1]+t2[1]); 
    var v2 = (t0[2]+t2[2]); 
    EDGES.Pieces[4] = new Piece("TetraImages/TetraEdge4.jpg");
    EDGES.Pieces[4].Translate(-v0,-v1,-v2);
    EDGES.Pieces[4].Rotate(v0,v1,v2,90);
    EDGES.Pieces[4].Rotate(t1[0],t1[1],t1[2],120);
    EDGES.Pieces[4].Translate(t0[0],t0[1],t0[2]);
    // 23
    EDGES.Pieces[5] = new Piece("TetraImages/TetraEdge5.jpg");
    EDGES.Pieces[5].Translate(t2[0],t2[1],t2[2]);
    EDGES.Pieces[5].Rotate(t3[0]-t2[0], t3[1]-t2[1], t3[2]-t2[2], 180);
    EDGES.Pieces[5].Translate(-t2[0],-t2[1],-t2[2]);
    EDGES.Pieces[5].Translate(t0[0],t0[1],t0[2]);



    // 01
    var v0 = (t0[0]+t1[0]); 
    var v1 = (t0[1]+t1[1]); 
    var v2 = (t0[2]+t1[2]); 
    EDGES.Pieces[6] = new Piece("TetraImages/TetraEdge0.jpg");
    EDGES.Pieces[6].Translate(v0,v1,v2);
    EDGES.Pieces[6].Rotate(v0, v1, v2, 90);
    EDGES.Pieces[6].Translate(t1[0],t1[1],t1[2]);
    // 02
    var v0 = (t0[0]+t2[0]); 
    var v1 = (t0[1]+t2[1]); 
    var v2 = (t0[2]+t2[2]); 
    EDGES.Pieces[7] = new Piece("TetraImages/TetraEdge1.jpg");
    EDGES.Pieces[7].Translate(v0,v1,v2);
    EDGES.Pieces[7].Rotate(v0,v1,v2,90);
    EDGES.Pieces[7].Rotate(t0[0],t0[1],t0[2],120);
    EDGES.Pieces[7].Translate(t1[0],t1[1],t1[2]);
    // 03
    var v0 = (t1[0]+t2[0]); 
    var v1 = (t1[1]+t2[1]); 
    var v2 = (t1[2]+t2[2]); 
    EDGES.Pieces[8] = new Piece("TetraImages/TetraEdge2.jpg");
    EDGES.Pieces[8].Translate(-v0,-v1,-v2);
    EDGES.Pieces[8].Rotate(v0,v1,v2,90);
    EDGES.Pieces[8].Rotate(t0[0],t0[1],t0[2],-120);
    EDGES.Pieces[8].Translate(t1[0],t1[1],t1[2]);
    // 12
    var v0 = (t1[0]+t2[0]); 
    var v1 = (t1[1]+t2[1]); 
    var v2 = (t1[2]+t2[2]); 
    EDGES.Pieces[9] = new Piece("TetraImages/TetraEdge3.jpg");
    EDGES.Pieces[9].Translate(v0,v1,v2);
    EDGES.Pieces[9].Rotate(v0,v1,v2,90);
    EDGES.Pieces[9].Rotate(t1[0],t1[1],t1[2],-120);
    EDGES.Pieces[9].Translate(t1[0],t1[1],t1[2]);
    // 13
    var v0 = (t0[0]+t2[0]); 
    var v1 = (t0[1]+t2[1]); 
    var v2 = (t0[2]+t2[2]); 
    EDGES.Pieces[10] = new Piece("TetraImages/TetraEdge4.jpg");
    EDGES.Pieces[10].Translate(-v0,-v1,-v2);
    EDGES.Pieces[10].Rotate(v0,v1,v2,90);
    EDGES.Pieces[10].Rotate(t1[0],t1[1],t1[2],120);
    EDGES.Pieces[10].Translate(t1[0],t1[1],t1[2]);
    // 23
    EDGES.Pieces[11] = new Piece("TetraImages/TetraEdge5.jpg");
    EDGES.Pieces[11].Translate(t2[0],t2[1],t2[2]);
    EDGES.Pieces[11].Rotate(t3[0]-t2[0], t3[1]-t2[1], t3[2]-t2[2], 180);
    EDGES.Pieces[11].Translate(-t2[0],-t2[1],-t2[2]);
    EDGES.Pieces[11].Translate(t1[0],t1[1],t1[2]);

    // PYRAMIDS are sort of edge pieces too.
    // They are shaped like corner pieces (Octhedron).
    // I was mastaken that they were pyramids.
    // These edges will need there own texture maps. 
    PYRAMIDS.Pieces[0] = new Piece("TetraImages/TetraEdge0.jpg");
    PYRAMIDS.Pieces[0].Translate(t0[0]+t1[0],t0[1]+t1[1],t0[2]+t1[2]);

    m = mid(t0,t2,t3);
    PYRAMIDS.Pieces[1] = new Piece("TetraImages/TetraEdge1.jpg");
    PYRAMIDS.Pieces[1].Rotate(m[0],m[1],m[2], 120);
    PYRAMIDS.Pieces[1].Translate(t0[0]+t1[0],t0[1]+t1[1],t0[2]+t1[2]);

    PYRAMIDS.Pieces[2] = new Piece("TetraImages/TetraEdge2.jpg");
    PYRAMIDS.Pieces[2].Rotate(m[0],m[1],m[2], -120);
    PYRAMIDS.Pieces[2].Translate(t0[0]+t1[0],t0[1]+t1[1],t0[2]+t1[2]);

    m = mid(t1,t2,t3);
    PYRAMIDS.Pieces[3] = new Piece("TetraImages/TetraEdge3.jpg");
    PYRAMIDS.Pieces[3].Rotate(m[0],m[1],m[2], 120);
    PYRAMIDS.Pieces[3].Translate(t0[0]+t1[0],t0[1]+t1[1],t0[2]+t1[2]);

    PYRAMIDS.Pieces[4] = new Piece("TetraImages/TetraEdge4.jpg");
    PYRAMIDS.Pieces[4].Rotate(m[0],m[1],m[2], -120);
    PYRAMIDS.Pieces[4].Translate(t0[0]+t1[0],t0[1]+t1[1],t0[2]+t1[2]);

    PYRAMIDS.Pieces[5] = new Piece("TetraImages/TetraEdge5.jpg");
    PYRAMIDS.Pieces[5].Rotate(t1[0]-t0[0],t1[1]-t0[1],t1[2]-t0[2], 180);
    PYRAMIDS.Pieces[5].Translate(t0[0]+t1[0],t0[1]+t1[1],t0[2]+t1[2]);
}


function InitMoves() {
    MOVES[0] = new Move();
    MOVES[0].Axis = [t0[0],t0[1],t0[2]];
    MOVES[0].EndAngle = 120.0;
    MOVES[0].PiecePairs.push([CORNERS,0]);
    MOVES[0].PiecePairs.push([EDGES,3]);
    MOVES[0].PiecePairs.push([EDGES,5]);
    MOVES[0].PiecePairs.push([EDGES,4]);
    MOVES[0].Permutation = [0, 3,1,2];

    MOVES[1] = new Move();
    MOVES[1].Axis = [t0[0],t0[1],t0[2]];
    MOVES[1].EndAngle = -120.0;
    MOVES[1].PiecePairs.push([CORNERS,0]);
    MOVES[1].PiecePairs.push([EDGES,3]);
    MOVES[1].PiecePairs.push([EDGES,5]);
    MOVES[1].PiecePairs.push([EDGES,4]);
    MOVES[1].Permutation = [0, 2,3,1];

    MOVES[0].Reverse = MOVES[1];
    MOVES[1].Reverse = MOVES[0];

    MOVES[2] = new Move();
    MOVES[2].Axis = [t0[0],t0[1],t0[2]];
    MOVES[2].EndAngle = 120.0;
    MOVES[2].PiecePairs.push([CORNERS,3]);
    MOVES[2].PiecePairs.push([CORNERS,2]);
    MOVES[2].PiecePairs.push([CORNERS,1]);
    MOVES[2].PiecePairs.push([EDGES,0]);
    MOVES[2].PiecePairs.push([EDGES,1]);
    MOVES[2].PiecePairs.push([EDGES,2]);
    MOVES[2].Permutation = [2,0,1, 5,3,4];

    MOVES[3] = new Move();
    MOVES[3].Axis = [t0[0],t0[1],t0[2]];
    MOVES[3].EndAngle = -120.0;
    MOVES[3].PiecePairs.push([CORNERS,3]);
    MOVES[3].PiecePairs.push([CORNERS,2]);
    MOVES[3].PiecePairs.push([CORNERS,1]);
    MOVES[3].PiecePairs.push([EDGES,0]);
    MOVES[3].PiecePairs.push([EDGES,1]);
    MOVES[3].PiecePairs.push([EDGES,2]);
    MOVES[3].Permutation = [1,2,0, 4,5,3];

    MOVES[2].Reverse = MOVES[3];
    MOVES[3].Reverse = MOVES[2];





    MOVES[4] = new Move();
    MOVES[4].Axis = [t1[0],t1[1],t1[2]];
    MOVES[4].EndAngle = 120.0;
    MOVES[4].PiecePairs.push([CORNERS,3]);
    MOVES[4].PiecePairs.push([EDGES,1]);
    MOVES[4].PiecePairs.push([EDGES,2]);
    MOVES[4].PiecePairs.push([EDGES,5]);
    MOVES[4].Permutation = [0, 3,1,2];

    MOVES[5] = new Move();
    MOVES[5].Axis = [t1[0],t1[1],t1[2]];
    MOVES[5].EndAngle = -120.0;
    MOVES[5].PiecePairs.push([CORNERS,3]);
    MOVES[5].PiecePairs.push([EDGES,1]);
    MOVES[5].PiecePairs.push([EDGES,2]);
    MOVES[5].PiecePairs.push([EDGES,5]);
    MOVES[5].Permutation = [0, 2,3,1];

    MOVES[4].Reverse = MOVES[5];
    MOVES[5].Reverse = MOVES[4];

    MOVES[6] = new Move();
    MOVES[6].Axis = [t1[0],t1[1],t1[2]];
    MOVES[6].EndAngle = 120.0;
    MOVES[6].PiecePairs.push([CORNERS,0]);
    MOVES[6].PiecePairs.push([CORNERS,1]);
    MOVES[6].PiecePairs.push([CORNERS,2]);
    MOVES[6].PiecePairs.push([EDGES,0]);
    MOVES[6].PiecePairs.push([EDGES,4]);
    MOVES[6].PiecePairs.push([EDGES,3]);
    MOVES[6].Permutation = [2,0,1, 5,3,4];

    MOVES[7] = new Move();
    MOVES[7].Axis = [t1[0],t1[1],t1[2]];
    MOVES[7].EndAngle = -120.0;
    MOVES[7].PiecePairs.push([CORNERS,0]);
    MOVES[7].PiecePairs.push([CORNERS,1]);
    MOVES[7].PiecePairs.push([CORNERS,2]);
    MOVES[7].PiecePairs.push([EDGES,0]);
    MOVES[7].PiecePairs.push([EDGES,4]);
    MOVES[7].PiecePairs.push([EDGES,3]);
    MOVES[7].Permutation = [1,2,0, 4,5,3];

    MOVES[6].Reverse = MOVES[7];
    MOVES[7].Reverse = MOVES[6];


    MOVES[8] = new Move();
    MOVES[8].Axis = [t2[0],t2[1],t2[2]];
    MOVES[8].EndAngle = 120.0;
    MOVES[8].PiecePairs.push([CORNERS,2]);
    MOVES[8].PiecePairs.push([EDGES,0]);
    MOVES[8].PiecePairs.push([EDGES,4]);
    MOVES[8].PiecePairs.push([EDGES,2]);
    MOVES[8].Permutation = [0, 3,1,2];

    MOVES[9] = new Move();
    MOVES[9].Axis = [t2[0],t2[1],t2[2]];
    MOVES[9].EndAngle = -120.0;
    MOVES[9].PiecePairs.push([CORNERS,2]);
    MOVES[9].PiecePairs.push([EDGES,0]);
    MOVES[9].PiecePairs.push([EDGES,4]);
    MOVES[9].PiecePairs.push([EDGES,2]);
    MOVES[9].Permutation = [0, 2,3,1];

    MOVES[8].Reverse = MOVES[9];
    MOVES[9].Reverse = MOVES[8];

    MOVES[10] = new Move();
    MOVES[10].Axis = [t2[0],t2[1],t2[2]];
    MOVES[10].EndAngle = 120.0;
    MOVES[10].PiecePairs.push([CORNERS,0]);
    MOVES[10].PiecePairs.push([CORNERS,3]);
    MOVES[10].PiecePairs.push([CORNERS,1]);
    MOVES[10].PiecePairs.push([EDGES,1]);
    MOVES[10].PiecePairs.push([EDGES,3]);
    MOVES[10].PiecePairs.push([EDGES,5]);
    MOVES[10].Permutation = [2,0,1, 5,3,4];

    MOVES[11] = new Move();
    MOVES[11].Axis = [t2[0],t2[1],t2[2]];
    MOVES[11].EndAngle = -120.0;
    MOVES[11].PiecePairs.push([CORNERS,0]);
    MOVES[11].PiecePairs.push([CORNERS,3]);
    MOVES[11].PiecePairs.push([CORNERS,1]);
    MOVES[11].PiecePairs.push([EDGES,1]);
    MOVES[11].PiecePairs.push([EDGES,3]);
    MOVES[11].PiecePairs.push([EDGES,5]);
    MOVES[11].Permutation = [1,2,0, 4,5,3];

    MOVES[10].Reverse = MOVES[11];
    MOVES[11].Reverse = MOVES[10];







    MOVES[12] = new Move();
    MOVES[12].Axis = [t3[0],t3[1],t3[2]];
    MOVES[12].EndAngle = 120.0;
    MOVES[12].PiecePairs.push([CORNERS,1]);
    MOVES[12].PiecePairs.push([EDGES,0]);
    MOVES[12].PiecePairs.push([EDGES,1]);
    MOVES[12].PiecePairs.push([EDGES,3]);
    MOVES[12].Permutation = [0, 3,1,2];

    MOVES[13] = new Move();
    MOVES[13].Axis = [t3[0],t3[1],t3[2]];
    MOVES[13].EndAngle = -120.0;
    MOVES[13].PiecePairs.push([CORNERS,1]);
    MOVES[13].PiecePairs.push([EDGES,0]);
    MOVES[13].PiecePairs.push([EDGES,1]);
    MOVES[13].PiecePairs.push([EDGES,3]);
    MOVES[13].Permutation = [0, 2,3,1];

    MOVES[12].Reverse = MOVES[13];
    MOVES[13].Reverse = MOVES[12];

//--

    MOVES[14] = new Move();
    MOVES[14].Axis = [t3[0],t3[1],t3[2]];
    MOVES[14].EndAngle = 120.0;
    MOVES[14].PiecePairs.push([CORNERS,0]);
    MOVES[14].PiecePairs.push([CORNERS,2]);
    MOVES[14].PiecePairs.push([CORNERS,3]);
    MOVES[14].PiecePairs.push([EDGES,2]);
    MOVES[14].PiecePairs.push([EDGES,5]);
    MOVES[14].PiecePairs.push([EDGES,4]);
    MOVES[14].Permutation = [2,0,1, 5,3,4];

    MOVES[15] = new Move();
    MOVES[15].Axis = [t3[0],t3[1],t3[2]];
    MOVES[15].EndAngle = -120.0;
    MOVES[15].PiecePairs.push([CORNERS,0]);
    MOVES[15].PiecePairs.push([CORNERS,2]);
    MOVES[15].PiecePairs.push([CORNERS,3]);
    MOVES[15].PiecePairs.push([EDGES,2]);
    MOVES[15].PiecePairs.push([EDGES,5]);
    MOVES[15].PiecePairs.push([EDGES,4]);
    MOVES[15].Permutation = [1,2,0, 4,5,3];

    MOVES[14].Reverse = MOVES[15];
    MOVES[15].Reverse = MOVES[14];
}

function DrawPieces(program) {
    EDGES.Draw(program);
    CORNERS.Draw(program);
    PYRAMIDS.Draw(program);
    CENTERS.Draw(program);
}

function PickPiece (newX, newY,camera) {
    var piece = EDGES.PickPiece(newX,newY,camera);
    if (piece != null) {
	return [EDGES, piece];
    }
    var piece = CORNERS.PickPiece(newX,newY,camera);
    if (piece != null) {
	return [CORNERS, piece];
    }
    var piece = PYRAMIDS.PickPiece(newX,newY,camera);
    if (piece != null) {
	return [PYRAMIDS, piece];
    }
    var piece = CENTERS.PickPiece(newX,newY,camera);
    if (piece != null) {
	return [CENTERS, piece];
    }
    return null;
}
