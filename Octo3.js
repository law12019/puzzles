var MOVES = [];
var CORNERS = new PieceSet();
var CENTERS = new PieceSet();
var EDGES = new PieceSet();


function InitCamera() {
    CAMERA.Height = 3.5;
    CAMERA.ComputeMatrix();
}

function InitBuffers() {
    CORNERS.AddPoint(2.3,-0.7, 0.0, 0.25,0.25);
    CORNERS.AddPoint(2.3, 0.7, 0.0, 0.75,0.75);
    CORNERS.AddPoint(2.3, 0.0,-0.7, 0.75,0.25);
    CORNERS.AddPoint(2.3, 0.0, 0.7, 0.25,0.75);
    CORNERS.AddPoint(2.0,-1.0, 0.0, 0.0, 0.0);
    CORNERS.AddPoint(2.0, 1.0, 0.0, 1.0, 1.0);
    CORNERS.AddPoint(2.0, 0.0,-1.0, 1.0, 0.0);
    CORNERS.AddPoint(2.0, 0.0, 1.0, 0.0, 1.0);
    CORNERS.AddPoint(1.0, 0.0, 0.0, 1.0, 0.0);
    CORNERS.AddPoint(1.0, 0.0, 0.0, 0.0, 1.0);
    CORNERS.AddOutTriangle(2,1,0);
    CORNERS.AddOutTriangle(3,0,1);
    CORNERS.AddOutTriangle(4,6,0);
    CORNERS.AddOutTriangle(2,0,6);
    CORNERS.AddOutTriangle(6,5,2);
    CORNERS.AddOutTriangle(1,2,5);
    CORNERS.AddOutTriangle(5,7,1);
    CORNERS.AddOutTriangle(3,1,7);
    CORNERS.AddOutTriangle(7,4,3);
    CORNERS.AddOutTriangle(0,3,4);
    CORNERS.AddInTriangle(4,6,8);
    CORNERS.AddInTriangle(8,6,5);
    CORNERS.AddInTriangle(5,7,9);
    CORNERS.AddInTriangle(9,7,4);
    CORNERS.InitBuffers();
    
    EDGES.AddPoint(1.0, 2.0, 0.0, 0.0, 1.0);
    EDGES.AddPoint(2.0, 1.0, 0.0, 1.0, 0.0);
    EDGES.AddPoint(1.0, 1.0, 1.0, 0.0, 0.0);
    EDGES.AddPoint(1.0, 1.0,-1.0, 1.0, 1.0);
    EDGES.AddPoint(0.0, 1.0, 0.0, 0.0, 1.0);
    EDGES.AddPoint(1.0, 0.0, 0.0, 1.0, 0.0);
    EDGES.AddOutTriangle(1,0,2);
    EDGES.AddOutTriangle(0,1,3);
    EDGES.AddInTriangle(2,0,4);
    EDGES.AddInTriangle(0,3,4);
    EDGES.AddInTriangle(3,5,4);
    EDGES.AddInTriangle(5,2,4);
    EDGES.AddInTriangle(1,2,5);
    EDGES.AddInTriangle(1,5,3);
    EDGES.InitBuffers();
    
    CENTERS.AddPoint(2.0, 1.0, 0.0, 0.0, 0.0);
    CENTERS.AddPoint(2.0, 0.0, 1.0, 0.0, 1.0);
    CENTERS.AddPoint(1.0, 1.0, 1.0, 1.0, 0.0);
    CENTERS.AddPoint(1.0, 0.0, 0.0, 0.0, 0.0);
    CENTERS.AddPoint(1.0, 0.0, 0.0, 0.0, 1.0);
    CENTERS.AddPoint(1.0, 0.0, 0.0, 1.0, 0.0);
    CENTERS.AddOutTriangle(0,1,3);
    CENTERS.AddInTriangle(1,2,4);
    CENTERS.AddInTriangle(2,0,5);
    CENTERS.AddInTriangle(0,2,1);
    CENTERS.InitBuffers();
}


function InitPieces() {
    CORNERS.Pieces[0] = new Piece("TetraImages/Corner0.jpg");
    CORNERS.Pieces[1] = new Piece("TetraImages/Corner1.jpg");
    CORNERS.Pieces[1].RotateZ(1);
    CORNERS.Pieces[1].RotateZ(1);
    CORNERS.Pieces[2] = new Piece("TetraImages/Corner2.jpg");
    CORNERS.Pieces[2].RotateZ(1);
    CORNERS.Pieces[3] = new Piece("TetraImages/Corner3.jpg");
    CORNERS.Pieces[3].RotateZ(-1);
    CORNERS.Pieces[4] = new Piece("TetraImages/Corner4.jpg");
    CORNERS.Pieces[4].RotateY(1);
    CORNERS.Pieces[5] = new Piece("TetraImages/Corner5.jpg");
    CORNERS.Pieces[5].RotateY(-1);
    
    EDGES.Pieces[0] = new Piece("TetraImages/Edge0.jpg");
    EDGES.Pieces[1] = new Piece("TetraImages/Edge1.jpg");
    EDGES.Pieces[1].RotateZ(1);
    EDGES.Pieces[2] = new Piece("TetraImages/Edge2.jpg");
    EDGES.Pieces[2].RotateZ(1);
    EDGES.Pieces[2].RotateZ(1);
    EDGES.Pieces[3] = new Piece("TetraImages/Edge3.jpg");
    EDGES.Pieces[3].RotateZ(-1);
    EDGES.Pieces[4] = new Piece("TetraImages/Edge4.jpg");
    EDGES.Pieces[4].RotateX(1);
    EDGES.Pieces[5] = new Piece("TetraImages/Edge5.jpg");
    EDGES.Pieces[5].RotateX(-1);
    EDGES.Pieces[6] = new Piece("TetraImages/Edge6.jpg");
    EDGES.Pieces[6].RotateY(1);
    EDGES.Pieces[7] = new Piece("TetraImages/Edge7.jpg");
    EDGES.Pieces[7].RotateY(-1);
    EDGES.Pieces[8] = new Piece("TetraImages/Edge8.jpg");
    EDGES.Pieces[8].RotateZ(-1);
    EDGES.Pieces[8].RotateX(1);
    EDGES.Pieces[9] = new Piece("TetraImages/Edge9.jpg");
    EDGES.Pieces[9].RotateZ(-1);
    EDGES.Pieces[9].RotateX(-1);
    EDGES.Pieces[10] = new Piece("TetraImages/Edge10.jpg");
    EDGES.Pieces[10].RotateZ(1);
    EDGES.Pieces[10].RotateY(1);
    EDGES.Pieces[11] = new Piece("TetraImages/Edge11.jpg");
    EDGES.Pieces[11].RotateZ(1);
    EDGES.Pieces[11].RotateY(-1);


    CENTERS.Pieces[0] = new Piece("TetraImages/Center0.jpg");
    CENTERS.Pieces[1] = new Piece("TetraImages/Center0.jpg");
    CENTERS.Pieces[1].Rotate(1,1,1, 120);
    CENTERS.Pieces[2] = new Piece("TetraImages/Center0.jpg");
    CENTERS.Pieces[2].Rotate(1,1,1, 240);
    CENTERS.Pieces[3] = new Piece("TetraImages/Center1.jpg");
    CENTERS.Pieces[3].RotateX(1);
    CENTERS.Pieces[4] = new Piece("TetraImages/Center1.jpg");
    CENTERS.Pieces[4].Rotate(1,-1,1, 120);
    CENTERS.Pieces[4].RotateX(1);
    CENTERS.Pieces[5] = new Piece("TetraImages/Center1.jpg");
    CENTERS.Pieces[5].Rotate(1,-1,1, 240);
    CENTERS.Pieces[5].RotateX(1);
    CENTERS.Pieces[6] = new Piece("TetraImages/Center2.jpg");
    CENTERS.Pieces[6].RotateX(1);
    CENTERS.Pieces[6].RotateX(1);
    CENTERS.Pieces[7] = new Piece("TetraImages/Center2.jpg");
    CENTERS.Pieces[7].Rotate(1,-1,-1, 120);
    CENTERS.Pieces[7].RotateX(1);
    CENTERS.Pieces[7].RotateX(1);
    CENTERS.Pieces[8] = new Piece("TetraImages/Center2.jpg");
    CENTERS.Pieces[8].Rotate(1,-1,-1, 240);
    CENTERS.Pieces[8].RotateX(1);
    CENTERS.Pieces[8].RotateX(1);
    CENTERS.Pieces[9] = new Piece("TetraImages/Center3.jpg");
    CENTERS.Pieces[9].RotateX(-1);
    CENTERS.Pieces[10] = new Piece("TetraImages/Center3.jpg");
    CENTERS.Pieces[10].Rotate(1,1,-1, 120);
    CENTERS.Pieces[10].RotateX(-1);
    CENTERS.Pieces[11] = new Piece("TetraImages/Center3.jpg");
    CENTERS.Pieces[11].Rotate(1,1,-1, 240);
    CENTERS.Pieces[11].RotateX(-1);
    CENTERS.Pieces[12] = new Piece("TetraImages/Center4.jpg");
    CENTERS.Pieces[12].RotateY(1);
    CENTERS.Pieces[13] = new Piece("TetraImages/Center4.jpg");
    CENTERS.Pieces[13].Rotate(-1,1,1, 120);
    CENTERS.Pieces[13].RotateY(1);
    CENTERS.Pieces[14] = new Piece("TetraImages/Center4.jpg");
    CENTERS.Pieces[14].Rotate(-1,1,1, 240);
    CENTERS.Pieces[14].RotateY(1);
    CENTERS.Pieces[15] = new Piece("TetraImages/Center5.jpg");
    CENTERS.Pieces[15].RotateY(1);
    CENTERS.Pieces[15].RotateY(1);
    CENTERS.Pieces[16] = new Piece("TetraImages/Center5.jpg");
    CENTERS.Pieces[16].Rotate(-1,1,-1, 120);
    CENTERS.Pieces[16].RotateY(1);
    CENTERS.Pieces[16].RotateY(1);
    CENTERS.Pieces[17] = new Piece("TetraImages/Center5.jpg");
    CENTERS.Pieces[17].Rotate(-1,1,-1, 240);
    CENTERS.Pieces[17].RotateY(1);
    CENTERS.Pieces[17].RotateY(1);
    CENTERS.Pieces[18] = new Piece("TetraImages/Center6.jpg");
    CENTERS.Pieces[18].RotateX(1);
    CENTERS.Pieces[18].RotateY(1);
    CENTERS.Pieces[19] = new Piece("TetraImages/Center6.jpg");
    CENTERS.Pieces[19].Rotate(-1,-1,1, 120);
    CENTERS.Pieces[19].RotateX(1);
    CENTERS.Pieces[19].RotateY(1);
    CENTERS.Pieces[20] = new Piece("TetraImages/Center6.jpg");
    CENTERS.Pieces[20].Rotate(-1,-1,1, 240);
    CENTERS.Pieces[20].RotateX(1);
    CENTERS.Pieces[20].RotateY(1);
    CENTERS.Pieces[21] = new Piece("TetraImages/Center7.jpg");
    CENTERS.Pieces[21].RotateY(1);
    CENTERS.Pieces[21].RotateY(1);
    CENTERS.Pieces[21].RotateX(1);
    CENTERS.Pieces[22] = new Piece("TetraImages/Center7.jpg");
    CENTERS.Pieces[22].Rotate(-1,-1,-1, 120);
    CENTERS.Pieces[22].RotateY(1);
    CENTERS.Pieces[22].RotateY(1);
    CENTERS.Pieces[22].RotateX(1);
    CENTERS.Pieces[23] = new Piece("TetraImages/Center7.jpg");
    CENTERS.Pieces[23].Rotate(-1,-1,-1, 240);
    CENTERS.Pieces[23].RotateY(1);
    CENTERS.Pieces[23].RotateY(1);
    CENTERS.Pieces[23].RotateX(1);
}


function InitMoves() {
    MOVES[0] = new Move();
    MOVES[0].Axis = [1,1,1];
    MOVES[0].EndAngle = 120;
    MOVES[0].PiecePairs.push([CORNERS,0]);
    MOVES[0].PiecePairs.push([CORNERS,2]);
    MOVES[0].PiecePairs.push([CORNERS,4]);
    MOVES[0].PiecePairs.push([CENTERS,0]);
    MOVES[0].PiecePairs.push([CENTERS,1]);
    MOVES[0].PiecePairs.push([CENTERS,2]);
    MOVES[0].PiecePairs.push([CENTERS,3]);
    MOVES[0].PiecePairs.push([CENTERS,11]);
    MOVES[0].PiecePairs.push([CENTERS,12]);
    MOVES[0].PiecePairs.push([CENTERS,4]);
    MOVES[0].PiecePairs.push([CENTERS,9]);
    MOVES[0].PiecePairs.push([CENTERS,13]);
    MOVES[0].PiecePairs.push([EDGES,0]);
    MOVES[0].PiecePairs.push([EDGES,6]);
    MOVES[0].PiecePairs.push([EDGES,4]);
    MOVES[0].Permutation = [2,0,1, 5,3,4, 8,6,7, 11,9,10, 14,12,13];

    MOVES[1] = new Move();
    MOVES[1].Axis = [1,1,1];
    MOVES[1].EndAngle = -120;
    MOVES[1].PiecePairs.push([CORNERS,0]);
    MOVES[1].PiecePairs.push([CORNERS,2]);
    MOVES[1].PiecePairs.push([CORNERS,4]);
    MOVES[1].PiecePairs.push([CENTERS,0]);
    MOVES[1].PiecePairs.push([CENTERS,1]);
    MOVES[1].PiecePairs.push([CENTERS,2]);
    MOVES[1].PiecePairs.push([CENTERS,3]);
    MOVES[1].PiecePairs.push([CENTERS,11]);
    MOVES[1].PiecePairs.push([CENTERS,12]);
    MOVES[1].PiecePairs.push([CENTERS,4]);
    MOVES[1].PiecePairs.push([CENTERS,9]);
    MOVES[1].PiecePairs.push([CENTERS,13]);
    MOVES[1].PiecePairs.push([EDGES,0]);
    MOVES[1].PiecePairs.push([EDGES,6]);
    MOVES[1].PiecePairs.push([EDGES,4]);
    MOVES[1].Permutation = [1,2,0, 4,5,3, 7,8,6, 10,11,9, 13,14,12];

    MOVES[0].Reverse = MOVES[1];
    MOVES[1].Reverse = MOVES[0];

    MOVES[2] = new Move();
    MOVES[2].Axis = [-1,1,1];
    MOVES[2].EndAngle = 120;
    MOVES[2].PiecePairs.push([CORNERS,1]);
    MOVES[2].PiecePairs.push([CORNERS,4]);
    MOVES[2].PiecePairs.push([CORNERS,2]);
    MOVES[2].PiecePairs.push([CENTERS,12]);
    MOVES[2].PiecePairs.push([CENTERS,13]);
    MOVES[2].PiecePairs.push([CENTERS,14]);
    MOVES[2].PiecePairs.push([CENTERS,1]);
    MOVES[2].PiecePairs.push([CENTERS,15]);
    MOVES[2].PiecePairs.push([CENTERS,19]);
    MOVES[2].PiecePairs.push([CENTERS,2]);
    MOVES[2].PiecePairs.push([CENTERS,16]);
    MOVES[2].PiecePairs.push([CENTERS,20]);
    MOVES[2].PiecePairs.push([EDGES,1]);
    MOVES[2].PiecePairs.push([EDGES,10]);
    MOVES[2].PiecePairs.push([EDGES,6]);
    MOVES[2].Permutation = [2,0,1, 5,3,4, 8,6,7, 11,9,10, 14,12,13];

    MOVES[3] = new Move();
    MOVES[3].Axis = [-1,1,1];
    MOVES[3].EndAngle = -120;
    MOVES[3].PiecePairs.push([CORNERS,1]);
    MOVES[3].PiecePairs.push([CORNERS,4]);
    MOVES[3].PiecePairs.push([CORNERS,2]);
    MOVES[3].PiecePairs.push([CENTERS,12]);
    MOVES[3].PiecePairs.push([CENTERS,13]);
    MOVES[3].PiecePairs.push([CENTERS,14]);
    MOVES[3].PiecePairs.push([CENTERS,1]);
    MOVES[3].PiecePairs.push([CENTERS,15]);
    MOVES[3].PiecePairs.push([CENTERS,19]);
    MOVES[3].PiecePairs.push([CENTERS,2]);
    MOVES[3].PiecePairs.push([CENTERS,16]);
    MOVES[3].PiecePairs.push([CENTERS,20]);
    MOVES[3].PiecePairs.push([EDGES,1]);
    MOVES[3].PiecePairs.push([EDGES,10]);
    MOVES[3].PiecePairs.push([EDGES,6]);
    MOVES[3].Permutation = [1,2,0, 4,5,3, 7,8,6, 10,11,9, 13,14,12];
    MOVES[2].Reverse = MOVES[3];
    MOVES[3].Reverse = MOVES[2];

    // -----

    MOVES[4] = new Move();
    MOVES[4].Axis = [1,-1,1];
    MOVES[4].EndAngle = 120;
    MOVES[4].PiecePairs.push([CORNERS,0]);
    MOVES[4].PiecePairs.push([CORNERS,4]);
    MOVES[4].PiecePairs.push([CORNERS,3]);
    MOVES[4].PiecePairs.push([CENTERS,3]);
    MOVES[4].PiecePairs.push([CENTERS,4]);
    MOVES[4].PiecePairs.push([CENTERS,5]);
    MOVES[4].PiecePairs.push([CENTERS,2]);
    MOVES[4].PiecePairs.push([CENTERS,18]);
    MOVES[4].PiecePairs.push([CENTERS,6]);
    MOVES[4].PiecePairs.push([CENTERS,0]);
    MOVES[4].PiecePairs.push([CENTERS,19]);
    MOVES[4].PiecePairs.push([CENTERS,7]);
    MOVES[4].PiecePairs.push([EDGES,3]);
    MOVES[4].PiecePairs.push([EDGES,4]);
    MOVES[4].PiecePairs.push([EDGES,8]);
    MOVES[4].Permutation = [2,0,1, 5,3,4, 8,6,7, 11,9,10, 14,12,13];

    MOVES[5] = new Move();
    MOVES[5].Axis = [1,-1,1];
    MOVES[5].EndAngle = -120;
    MOVES[5].PiecePairs.push([CORNERS,0]);
    MOVES[5].PiecePairs.push([CORNERS,4]);
    MOVES[5].PiecePairs.push([CORNERS,3]);
    MOVES[5].PiecePairs.push([CENTERS,3]);
    MOVES[5].PiecePairs.push([CENTERS,4]);
    MOVES[5].PiecePairs.push([CENTERS,5]);
    MOVES[5].PiecePairs.push([CENTERS,2]);
    MOVES[5].PiecePairs.push([CENTERS,18]);
    MOVES[5].PiecePairs.push([CENTERS,6]);
    MOVES[5].PiecePairs.push([CENTERS,0]);
    MOVES[5].PiecePairs.push([CENTERS,19]);
    MOVES[5].PiecePairs.push([CENTERS,7]);
    MOVES[5].PiecePairs.push([EDGES,3]);
    MOVES[5].PiecePairs.push([EDGES,4]);
    MOVES[5].PiecePairs.push([EDGES,8]);
    MOVES[5].Permutation = [1,2,0, 4,5,3, 7,8,6, 10,11,9, 13,14,12];

    MOVES[4].Reverse = MOVES[5];
    MOVES[5].Reverse = MOVES[4];

    MOVES[6] = new Move();
    MOVES[6].Axis = [1,1,-1];
    MOVES[6].EndAngle = 120;
    MOVES[6].PiecePairs.push([CORNERS,1]);
    MOVES[6].PiecePairs.push([CORNERS,4]);
    MOVES[6].PiecePairs.push([CORNERS,3]);
    MOVES[6].PiecePairs.push([CENTERS,18]);
    MOVES[6].PiecePairs.push([CENTERS,20]);
    MOVES[6].PiecePairs.push([CENTERS,19]);
    MOVES[6].PiecePairs.push([CENTERS,5]);
    MOVES[6].PiecePairs.push([CENTERS,21]);
    MOVES[6].PiecePairs.push([CENTERS,12]);
    MOVES[6].PiecePairs.push([CENTERS,4]);
    MOVES[6].PiecePairs.push([CENTERS,23]);
    MOVES[6].PiecePairs.push([CENTERS,14]);
    MOVES[6].PiecePairs.push([EDGES,2]);
    MOVES[6].PiecePairs.push([EDGES,10]);
    MOVES[6].PiecePairs.push([EDGES,8]);
    MOVES[6].Permutation = [2,0,1, 5,3,4, 8,6,7, 11,9,10, 14,12,13];

    MOVES[7] = new Move();
    MOVES[7].Axis = [1,1,-1];
    MOVES[7].EndAngle = -120;
    MOVES[7].PiecePairs.push([CORNERS,1]);
    MOVES[7].PiecePairs.push([CORNERS,4]);
    MOVES[7].PiecePairs.push([CORNERS,3]);
    MOVES[7].PiecePairs.push([CENTERS,18]);
    MOVES[7].PiecePairs.push([CENTERS,20]);
    MOVES[7].PiecePairs.push([CENTERS,19]);
    MOVES[7].PiecePairs.push([CENTERS,5]);
    MOVES[7].PiecePairs.push([CENTERS,21]);
    MOVES[7].PiecePairs.push([CENTERS,12]);
    MOVES[7].PiecePairs.push([CENTERS,4]);
    MOVES[7].PiecePairs.push([CENTERS,23]);
    MOVES[7].PiecePairs.push([CENTERS,14]);
    MOVES[7].PiecePairs.push([EDGES,2]);
    MOVES[7].PiecePairs.push([EDGES,10]);
    MOVES[7].PiecePairs.push([EDGES,8]);
    MOVES[7].Permutation = [1,2,0, 4,5,3, 7,8,6, 10,11,9, 13,14,12];

    MOVES[6].Reverse = MOVES[7];
    MOVES[7].Reverse = MOVES[6];

    MOVES[8] = new Move();
    MOVES[8].Axis = [-1,-1,-1];
    MOVES[8].EndAngle = 120;
    MOVES[8].PiecePairs.push([CORNERS,1]);
    MOVES[8].PiecePairs.push([CORNERS,5]);
    MOVES[8].PiecePairs.push([CORNERS,3]);
    MOVES[8].PiecePairs.push([CENTERS,21]);
    MOVES[8].PiecePairs.push([CENTERS,22]);
    MOVES[8].PiecePairs.push([CENTERS,23]);
    MOVES[8].PiecePairs.push([CENTERS,8]);
    MOVES[8].PiecePairs.push([CENTERS,18]);
    MOVES[8].PiecePairs.push([CENTERS,15]);
    MOVES[8].PiecePairs.push([CENTERS,7]);
    MOVES[8].PiecePairs.push([CENTERS,20]);
    MOVES[8].PiecePairs.push([CENTERS,17]);
    MOVES[8].PiecePairs.push([EDGES,2]);
    MOVES[8].PiecePairs.push([EDGES,11]);
    MOVES[8].PiecePairs.push([EDGES,9]);
    MOVES[8].Permutation = [2,0,1, 5,3,4, 8,6,7, 11,9,10, 14,12,13];

    MOVES[9] = new Move();
    MOVES[9].Axis = [-1,-1,-1];
    MOVES[9].EndAngle = -120;
    MOVES[9].PiecePairs.push([CORNERS,1]);
    MOVES[9].PiecePairs.push([CORNERS,5]);
    MOVES[9].PiecePairs.push([CORNERS,3]);
    MOVES[9].PiecePairs.push([CENTERS,21]);
    MOVES[9].PiecePairs.push([CENTERS,22]);
    MOVES[9].PiecePairs.push([CENTERS,23]);
    MOVES[9].PiecePairs.push([CENTERS,8]);
    MOVES[9].PiecePairs.push([CENTERS,18]);
    MOVES[9].PiecePairs.push([CENTERS,15]);
    MOVES[9].PiecePairs.push([CENTERS,7]);
    MOVES[9].PiecePairs.push([CENTERS,20]);
    MOVES[9].PiecePairs.push([CENTERS,17]);
    MOVES[9].PiecePairs.push([EDGES,2]);
    MOVES[9].PiecePairs.push([EDGES,11]);
    MOVES[9].PiecePairs.push([EDGES,9]);
    MOVES[9].Permutation = [1,2,0, 4,5,3, 7,8,6, 10,11,9, 13,14,12];

    MOVES[8].Reverse = MOVES[9];
    MOVES[9].Reverse = MOVES[8];

    MOVES[10] = new Move();
    MOVES[10].Axis = [1,-1,-1];
    MOVES[10].EndAngle = 120;
    MOVES[10].PiecePairs.push([CORNERS,0]);
    MOVES[10].PiecePairs.push([CORNERS,3]);
    MOVES[10].PiecePairs.push([CORNERS,5]);
    MOVES[10].PiecePairs.push([CENTERS,6]);
    MOVES[10].PiecePairs.push([CENTERS,7]);
    MOVES[10].PiecePairs.push([CENTERS,8]);
    MOVES[10].PiecePairs.push([CENTERS,5]);
    MOVES[10].PiecePairs.push([CENTERS,22]);
    MOVES[10].PiecePairs.push([CENTERS,9]);
    MOVES[10].PiecePairs.push([CENTERS,3]);
    MOVES[10].PiecePairs.push([CENTERS,23]);
    MOVES[10].PiecePairs.push([CENTERS,10]);
    MOVES[10].PiecePairs.push([EDGES,3]);
    MOVES[10].PiecePairs.push([EDGES,9]);
    MOVES[10].PiecePairs.push([EDGES,5]);
    MOVES[10].Permutation = [2,0,1, 5,3,4, 8,6,7, 11,9,10, 14,12,13];

    MOVES[11] = new Move();
    MOVES[11].Axis = [1,-1,-1];
    MOVES[11].EndAngle = -120;
    MOVES[11].PiecePairs.push([CORNERS,0]);
    MOVES[11].PiecePairs.push([CORNERS,3]);
    MOVES[11].PiecePairs.push([CORNERS,5]);
    MOVES[11].PiecePairs.push([CENTERS,6]);
    MOVES[11].PiecePairs.push([CENTERS,7]);
    MOVES[11].PiecePairs.push([CENTERS,8]);
    MOVES[11].PiecePairs.push([CENTERS,5]);
    MOVES[11].PiecePairs.push([CENTERS,22]);
    MOVES[11].PiecePairs.push([CENTERS,9]);
    MOVES[11].PiecePairs.push([CENTERS,3]);
    MOVES[11].PiecePairs.push([CENTERS,23]);
    MOVES[11].PiecePairs.push([CENTERS,10]);
    MOVES[11].PiecePairs.push([EDGES,3]);
    MOVES[11].PiecePairs.push([EDGES,9]);
    MOVES[11].PiecePairs.push([EDGES,5]);
    MOVES[11].Permutation = [1,2,0, 4,5,3, 7,8,6, 10,11,9, 13,14,12];

    MOVES[10].Reverse = MOVES[11];
    MOVES[11].Reverse = MOVES[10];

    MOVES[12] = new Move();
    MOVES[12].Axis = [-1,1,-1];
    MOVES[12].EndAngle = 120;
    MOVES[12].PiecePairs.push([CORNERS,1]);
    MOVES[12].PiecePairs.push([CORNERS,2]);
    MOVES[12].PiecePairs.push([CORNERS,5]);
    MOVES[12].PiecePairs.push([CENTERS,15]);
    MOVES[12].PiecePairs.push([CENTERS,16]);
    MOVES[12].PiecePairs.push([CENTERS,17]);
    MOVES[12].PiecePairs.push([CENTERS,10]);
    MOVES[12].PiecePairs.push([CENTERS,21]);
    MOVES[12].PiecePairs.push([CENTERS,13]);
    MOVES[12].PiecePairs.push([CENTERS,11]);
    MOVES[12].PiecePairs.push([CENTERS,22]);
    MOVES[12].PiecePairs.push([CENTERS,14]);
    MOVES[12].PiecePairs.push([EDGES,1]);
    MOVES[12].PiecePairs.push([EDGES,7]);
    MOVES[12].PiecePairs.push([EDGES,11]);
    MOVES[12].Permutation = [2,0,1, 5,3,4, 8,6,7, 11,9,10, 14,12,13];

    MOVES[13] = new Move();
    MOVES[13].Axis = [-1,1,-1];
    MOVES[13].EndAngle = -120;
    MOVES[13].PiecePairs.push([CORNERS,1]);
    MOVES[13].PiecePairs.push([CORNERS,2]);
    MOVES[13].PiecePairs.push([CORNERS,5]);
    MOVES[13].PiecePairs.push([CENTERS,15]);
    MOVES[13].PiecePairs.push([CENTERS,16]);
    MOVES[13].PiecePairs.push([CENTERS,17]);
    MOVES[13].PiecePairs.push([CENTERS,10]);
    MOVES[13].PiecePairs.push([CENTERS,21]);
    MOVES[13].PiecePairs.push([CENTERS,13]);
    MOVES[13].PiecePairs.push([CENTERS,11]);
    MOVES[13].PiecePairs.push([CENTERS,22]);
    MOVES[13].PiecePairs.push([CENTERS,14]);
    MOVES[13].PiecePairs.push([EDGES,1]);
    MOVES[13].PiecePairs.push([EDGES,7]);
    MOVES[13].PiecePairs.push([EDGES,11]);
    MOVES[13].Permutation = [1,2,0, 4,5,3, 7,8,6, 10,11,9, 13,14,12];

    MOVES[12].Reverse = MOVES[13];
    MOVES[13].Reverse = MOVES[12];

    MOVES[14] = new Move();
    MOVES[14].Axis = [-1,-1,1];
    MOVES[14].EndAngle = 120;
    MOVES[14].PiecePairs.push([CORNERS,0]);
    MOVES[14].PiecePairs.push([CORNERS,2]);
    MOVES[14].PiecePairs.push([CORNERS,5]);
    MOVES[14].PiecePairs.push([CENTERS,9]);
    MOVES[14].PiecePairs.push([CENTERS,11]);
    MOVES[14].PiecePairs.push([CENTERS,10]);
    MOVES[14].PiecePairs.push([CENTERS,0]);
    MOVES[14].PiecePairs.push([CENTERS,16]);
    MOVES[14].PiecePairs.push([CENTERS,8]);
    MOVES[14].PiecePairs.push([CENTERS,1]);
    MOVES[14].PiecePairs.push([CENTERS,17]);
    MOVES[14].PiecePairs.push([CENTERS,6]);
    MOVES[14].PiecePairs.push([EDGES,0]);
    MOVES[14].PiecePairs.push([EDGES,7]);
    MOVES[14].PiecePairs.push([EDGES,5]);
    MOVES[14].Permutation = [2,0,1, 5,3,4, 8,6,7, 11,9,10, 14,12,13];

    MOVES[15] = new Move();
    MOVES[15].Axis = [-1,-1,1];
    MOVES[15].EndAngle = -120;
    MOVES[15].PiecePairs.push([CORNERS,0]);
    MOVES[15].PiecePairs.push([CORNERS,2]);
    MOVES[15].PiecePairs.push([CORNERS,5]);
    MOVES[15].PiecePairs.push([CENTERS,9]);
    MOVES[15].PiecePairs.push([CENTERS,11]);
    MOVES[15].PiecePairs.push([CENTERS,10]);
    MOVES[15].PiecePairs.push([CENTERS,0]);
    MOVES[15].PiecePairs.push([CENTERS,16]);
    MOVES[15].PiecePairs.push([CENTERS,8]);
    MOVES[15].PiecePairs.push([CENTERS,1]);
    MOVES[15].PiecePairs.push([CENTERS,17]);
    MOVES[15].PiecePairs.push([CENTERS,6]);
    MOVES[15].PiecePairs.push([EDGES,0]);
    MOVES[15].PiecePairs.push([EDGES,7]);
    MOVES[15].PiecePairs.push([EDGES,5]);
    MOVES[15].Permutation = [1,2,0, 4,5,3, 7,8,6, 10,11,9, 13,14,12];

    MOVES[14].Reverse = MOVES[15];
    MOVES[15].Reverse = MOVES[14];

    // (1,1,1) Middle
    MOVES[16] = new Move();
    MOVES[16].Axis = [1,1,1];
    MOVES[16].EndAngle = 120;
    MOVES[16].PiecePairs.push([CENTERS,5]);
    MOVES[16].PiecePairs.push([CENTERS,10]);
    MOVES[16].PiecePairs.push([CENTERS,14]);
    MOVES[16].PiecePairs.push([CENTERS,6]);
    MOVES[16].PiecePairs.push([CENTERS,16]);
    MOVES[16].PiecePairs.push([CENTERS,19]);
    MOVES[16].PiecePairs.push([EDGES,1]);
    MOVES[16].PiecePairs.push([EDGES,8]);
    MOVES[16].PiecePairs.push([EDGES,5]);
    MOVES[16].PiecePairs.push([EDGES,3]);
    MOVES[16].PiecePairs.push([EDGES,7]);
    MOVES[16].PiecePairs.push([EDGES,10]);
    MOVES[16].Permutation = [2,0,1, 5,3,4, 8,6,7, 11,9,10];

    MOVES[17] = new Move();
    MOVES[17].Axis = [1,1,1];
    MOVES[17].EndAngle = -120;
    MOVES[17].PiecePairs.push([CENTERS,5]);
    MOVES[17].PiecePairs.push([CENTERS,10]);
    MOVES[17].PiecePairs.push([CENTERS,14]);
    MOVES[17].PiecePairs.push([CENTERS,6]);
    MOVES[17].PiecePairs.push([CENTERS,16]);
    MOVES[17].PiecePairs.push([CENTERS,19]);
    MOVES[17].PiecePairs.push([EDGES,1]);
    MOVES[17].PiecePairs.push([EDGES,8]);
    MOVES[17].PiecePairs.push([EDGES,5]);
    MOVES[17].PiecePairs.push([EDGES,3]);
    MOVES[17].PiecePairs.push([EDGES,7]);
    MOVES[17].PiecePairs.push([EDGES,10]);
    MOVES[17].Permutation = [1,2,0, 4,5,3, 7,8,6, 10,11,9];

    MOVES[16].Reverse = MOVES[17];
    MOVES[17].Reverse = MOVES[16];


    // (-1,1,1) Center
    MOVES[18] = new Move();
    MOVES[18].Axis = [-1,1,1];
    MOVES[18].EndAngle = 120;
    MOVES[18].PiecePairs.push([CENTERS,0]);
    MOVES[18].PiecePairs.push([CENTERS,17]);
    MOVES[18].PiecePairs.push([CENTERS,18]);
    MOVES[18].PiecePairs.push([CENTERS,11]);
    MOVES[18].PiecePairs.push([CENTERS,21]);
    MOVES[18].PiecePairs.push([CENTERS,4]);
    MOVES[18].PiecePairs.push([EDGES,0]);
    MOVES[18].PiecePairs.push([EDGES,11]);
    MOVES[18].PiecePairs.push([EDGES,8]);
    MOVES[18].PiecePairs.push([EDGES,2]);
    MOVES[18].PiecePairs.push([EDGES,4]);
    MOVES[18].PiecePairs.push([EDGES,7]);
    MOVES[18].Permutation = [2,0,1, 5,3,4, 8,6,7, 11,9,10];

    MOVES[19] = new Move();
    MOVES[19].Axis = [-1,1,1];
    MOVES[19].EndAngle = -120;
    MOVES[19].PiecePairs.push([CENTERS,0]);
    MOVES[19].PiecePairs.push([CENTERS,17]);
    MOVES[19].PiecePairs.push([CENTERS,18]);
    MOVES[19].PiecePairs.push([CENTERS,11]);
    MOVES[19].PiecePairs.push([CENTERS,21]);
    MOVES[19].PiecePairs.push([CENTERS,4]);
    MOVES[19].PiecePairs.push([EDGES,0]);
    MOVES[19].PiecePairs.push([EDGES,11]);
    MOVES[19].PiecePairs.push([EDGES,8]);
    MOVES[19].PiecePairs.push([EDGES,2]);
    MOVES[19].PiecePairs.push([EDGES,4]);
    MOVES[19].PiecePairs.push([EDGES,7]);
    MOVES[19].Permutation = [1,2,0, 4,5,3, 7,8,6, 10,11,9];

    MOVES[18].Reverse = MOVES[19];
    MOVES[19].Reverse = MOVES[18];

    MOVES[20] = new Move();
    MOVES[20].Axis = [1,-1,1];
    MOVES[20].EndAngle = 120;
    MOVES[20].PiecePairs.push([CENTERS,1]);
    MOVES[20].PiecePairs.push([CENTERS,20]);
    MOVES[20].PiecePairs.push([CENTERS,8]);
    MOVES[20].PiecePairs.push([CENTERS,9]);
    MOVES[20].PiecePairs.push([CENTERS,12]);
    MOVES[20].PiecePairs.push([CENTERS,23]);
    MOVES[20].PiecePairs.push([EDGES,0]);
    MOVES[20].PiecePairs.push([EDGES,10]);
    MOVES[20].PiecePairs.push([EDGES,9]);
    MOVES[20].PiecePairs.push([EDGES,2]);
    MOVES[20].PiecePairs.push([EDGES,5]);
    MOVES[20].PiecePairs.push([EDGES,6]);
    MOVES[20].Permutation = [2,0,1, 5,3,4, 8,6,7, 11,9,10];

    MOVES[21] = new Move();
    MOVES[21].Axis = [1,-1,1];
    MOVES[21].EndAngle = -120;
    MOVES[21].PiecePairs.push([CENTERS,1]);
    MOVES[21].PiecePairs.push([CENTERS,20]);
    MOVES[21].PiecePairs.push([CENTERS,8]);
    MOVES[21].PiecePairs.push([CENTERS,9]);
    MOVES[21].PiecePairs.push([CENTERS,12]);
    MOVES[21].PiecePairs.push([CENTERS,23]);
    MOVES[21].PiecePairs.push([EDGES,0]);
    MOVES[21].PiecePairs.push([EDGES,10]);
    MOVES[21].PiecePairs.push([EDGES,9]);
    MOVES[21].PiecePairs.push([EDGES,2]);
    MOVES[21].PiecePairs.push([EDGES,5]);
    MOVES[21].PiecePairs.push([EDGES,6]);
    MOVES[21].Permutation = [1,2,0, 4,5,3, 7,8,6, 10,11,9];

    MOVES[20].Reverse = MOVES[21];
    MOVES[21].Reverse = MOVES[20];

    MOVES[22] = new Move();
    MOVES[22].Axis = [1,1,-1];
    MOVES[22].EndAngle = 120;
    MOVES[22].PiecePairs.push([CENTERS,2]);
    MOVES[22].PiecePairs.push([CENTERS,7]);
    MOVES[22].PiecePairs.push([CENTERS,15]);
    MOVES[22].PiecePairs.push([CENTERS,3]);
    MOVES[22].PiecePairs.push([CENTERS,22]);
    MOVES[22].PiecePairs.push([CENTERS,13]);
    MOVES[22].PiecePairs.push([EDGES,3]);
    MOVES[22].PiecePairs.push([EDGES,11]);
    MOVES[22].PiecePairs.push([EDGES,6]);
    MOVES[22].PiecePairs.push([EDGES,1]);
    MOVES[22].PiecePairs.push([EDGES,4]);
    MOVES[22].PiecePairs.push([EDGES,9]);
    MOVES[22].Permutation = [2,0,1, 5,3,4, 8,6,7, 11,9,10];

    MOVES[23] = new Move();
    MOVES[23].Axis = [1,1,-1];
    MOVES[23].EndAngle = -120;
    MOVES[23].PiecePairs.push([CENTERS,2]);
    MOVES[23].PiecePairs.push([CENTERS,7]);
    MOVES[23].PiecePairs.push([CENTERS,15]);
    MOVES[23].PiecePairs.push([CENTERS,3]);
    MOVES[23].PiecePairs.push([CENTERS,22]);
    MOVES[23].PiecePairs.push([CENTERS,13]);
    MOVES[23].PiecePairs.push([EDGES,3]);
    MOVES[23].PiecePairs.push([EDGES,11]);
    MOVES[23].PiecePairs.push([EDGES,6]);
    MOVES[23].PiecePairs.push([EDGES,1]);
    MOVES[23].PiecePairs.push([EDGES,4]);
    MOVES[23].PiecePairs.push([EDGES,9]);
    MOVES[23].Permutation = [1,2,0, 4,5,3, 7,8,6, 10,11,9];

    MOVES[22].Reverse = MOVES[23];
    MOVES[23].Reverse = MOVES[22];
}

function DrawPieces(program) {
    CORNERS.Draw(program);
    CENTERS.Draw(program);
    EDGES.Draw(program);
}

function PickPiece (newX, newY,camera) {
    var piece = CORNERS.PickPiece(newX,newY,camera);
    if (piece != null) {
	return [CORNERS, piece];
    }
    var piece = CENTERS.PickPiece(newX,newY,camera);
    if (piece != null) {
	return [CENTERS, piece];
    }
    var piece = EDGES.PickPiece(newX,newY,camera);
    if (piece != null) {
	return [EDGES, piece];
    }
    return null;
}
