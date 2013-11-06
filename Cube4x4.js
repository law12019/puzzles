var MOVES = [];
var CORNERS = new PieceSet();
var CENTERS = new PieceSet();
var EDGES = new PieceSet();

function InitCamera() {
    CAMERA.ViewPlaneNormal = [0,0,1];
    CAMERA.Up = [0,1,0];
    CAMERA.Right = [1,0,0];

    CAMERA.Height = 4.8;
    CAMERA.ComputeMatrix();
}

function InitBuffers() {
    CORNERS.AddPoint(2.0, 2.0, 2.0, 0.50,0.50); //0
    CORNERS.AddPoint(1.0, 2.0, 2.0, 0.01,0.50); //1
    CORNERS.AddPoint(2.0, 1.0, 2.0, 0.50,0.01); //2
    CORNERS.AddPoint(2.0, 2.0, 1.0, 0.99,0.99); //3
    CORNERS.AddPoint(1.0, 1.0, 2.0, 0.01,0.01); //4
    CORNERS.AddPoint(1.0, 2.0, 1.0, 0.01,0.99); //5
    CORNERS.AddPoint(2.0, 1.0, 1.0, 0.99,0.01); //6
    CORNERS.AddPoint(1.0, 1.0, 1.0, 0.00,0.50); //7
    CORNERS.AddPoint(1.0, 1.0, 1.0, 0.50,0.00); //8
    CORNERS.AddPoint(1.0, 1.0, 1.0, 1.00,1.00); //9
    CORNERS.AddOutTriangle(0,1,4);
    CORNERS.AddOutTriangle(0,4,2);
    CORNERS.AddOutTriangle(0,2,6);
    CORNERS.AddOutTriangle(0,6,3);
    CORNERS.AddOutTriangle(0,3,5);
    CORNERS.AddOutTriangle(0,5,1);
    CORNERS.AddInTriangle(7,4,1);
    CORNERS.AddInTriangle(7,1,5);
    CORNERS.AddInTriangle(8,6,2);
    CORNERS.AddInTriangle(8,2,4);
    CORNERS.AddInTriangle(9,5,3);
    CORNERS.AddInTriangle(9,3,6);
    CORNERS.InitBuffers();

    CENTERS.AddPoint(1.0, 0.0, 0.0, 0.00,0.00); 
    CENTERS.AddPoint(2.0, 0.0, 0.0, 0.01,0.01); 
    CENTERS.AddPoint(1.0, 1.0, 0.0, 1.00,0.00); 
    CENTERS.AddPoint(2.0, 1.0, 0.0, 0.99,0.01); 
    CENTERS.AddPoint(1.0, 0.0, 1.0, 0.00,1.00); 
    CENTERS.AddPoint(2.0, 0.0, 1.0, 0.01,0.99); 
    CENTERS.AddPoint(1.0, 1.0, 1.0, 1.00,1.00); 
    CENTERS.AddPoint(2.0, 1.0, 1.0, 0.99,0.99); 
    CENTERS.AddOutTriangle(1,3,7);
    CENTERS.AddOutTriangle(1,7,5);
    CENTERS.AddInTriangle(0,4,6);
    CENTERS.AddInTriangle(0,6,2);
    CENTERS.AddInTriangle(2,6,7);
    CENTERS.AddInTriangle(2,7,3);
    CENTERS.AddInTriangle(0,1,5);
    CENTERS.AddInTriangle(0,5,4);
    CENTERS.AddInTriangle(0,2,3);
    CENTERS.AddInTriangle(0,3,1);
    CENTERS.AddInTriangle(4,5,7);
    CENTERS.AddInTriangle(4,7,6);
    CENTERS.InitBuffers();

    EDGES.AddPoint(1.0, 1.0, 0.0, 0.00,0.50); 
    EDGES.AddPoint(2.0, 1.0, 0.0, 0.01,0.99); 
    EDGES.AddPoint(1.0, 2.0, 0.0, 0.01,0.01);//2 
    EDGES.AddPoint(2.0, 2.0, 0.0, 0.01,0.50); 
    EDGES.AddPoint(1.0, 1.0, 1.0, 1.00,0.50); 
    EDGES.AddPoint(2.0, 1.0, 1.0, 0.99,0.99); 
    EDGES.AddPoint(1.0, 2.0, 1.0, 0.99,0.01);//6 
    EDGES.AddPoint(2.0, 2.0, 1.0, 0.99,0.50); 
    EDGES.AddOutTriangle(1,3,7);
    EDGES.AddOutTriangle(1,7,5);
    EDGES.AddOutTriangle(2,6,7);
    EDGES.AddOutTriangle(2,7,3);
    EDGES.AddInTriangle(0,4,6);
    EDGES.AddInTriangle(0,6,2);
    EDGES.AddInTriangle(0,1,5);
    EDGES.AddInTriangle(0,5,4);
    EDGES.AddInTriangle(0,2,3);
    EDGES.AddInTriangle(0,3,1);
    EDGES.AddInTriangle(4,5,7);
    EDGES.AddInTriangle(4,7,6);
    EDGES.InitBuffers();
}


function InitPieces() {
    CORNERS.Pieces[0] = new Piece("CubeImages/Corner0.jpg");
    CORNERS.Pieces[0].RotateY(1);
    CORNERS.Pieces[0].RotateX(1);
    CORNERS.Pieces[0].RotateZ(1);
    CORNERS.Pieces[1] = new Piece("CubeImages/Corner1.jpg");
    CORNERS.Pieces[1].RotateX(1);
    CORNERS.Pieces[1].RotateX(1);
    CORNERS.Pieces[2] = new Piece("CubeImages/Corner2.jpg");
    CORNERS.Pieces[2].RotateY(1);
    CORNERS.Pieces[2].RotateY(1);
    CORNERS.Pieces[3] = new Piece("CubeImages/Corner3.jpg");
    CORNERS.Pieces[3].RotateX(-1);
    CORNERS.Pieces[4] = new Piece("CubeImages/Corner4.jpg");
    CORNERS.Pieces[4].RotateY(1);
    CORNERS.Pieces[4].RotateX(1);
    CORNERS.Pieces[5] = new Piece("CubeImages/Corner5.jpg");
    CORNERS.Pieces[5].RotateX(1);
    CORNERS.Pieces[6] = new Piece("CubeImages/Corner6.jpg");
    CORNERS.Pieces[6].RotateY(1);
    CORNERS.Pieces[7] = new Piece("CubeImages/Corner7.jpg");

    CENTERS.Pieces[0] = new Piece("CubeImages/Center0.jpg");
    CENTERS.Pieces[0].RotateY(1);
    CENTERS.Pieces[0].RotateY(1);
    CENTERS.Pieces[1] = new Piece("CubeImages/Center0.jpg");
    CENTERS.Pieces[1].RotateX(-1);
    CENTERS.Pieces[1].RotateY(1);
    CENTERS.Pieces[1].RotateY(1);
    CENTERS.Pieces[2] = new Piece("CubeImages/Center0.jpg");
    CENTERS.Pieces[2].RotateX(-1);
    CENTERS.Pieces[2].RotateX(-1);
    CENTERS.Pieces[2].RotateY(1);
    CENTERS.Pieces[2].RotateY(1);
    CENTERS.Pieces[3] = new Piece("CubeImages/Center0.jpg");
    CENTERS.Pieces[3].RotateX(1);
    CENTERS.Pieces[3].RotateY(1);
    CENTERS.Pieces[3].RotateY(1);
    CENTERS.Pieces[4] = new Piece("CubeImages/Center1.jpg");
    CENTERS.Pieces[5] = new Piece("CubeImages/Center1.jpg");
    CENTERS.Pieces[5].RotateX(1);
    CENTERS.Pieces[6] = new Piece("CubeImages/Center1.jpg");
    CENTERS.Pieces[6].RotateX(1);
    CENTERS.Pieces[6].RotateX(1);
    CENTERS.Pieces[7] = new Piece("CubeImages/Center1.jpg");
    CENTERS.Pieces[7].RotateX(-1);
    CENTERS.Pieces[8] = new Piece("CubeImages/Center2.jpg");
    CENTERS.Pieces[8].RotateZ(-1);
    CENTERS.Pieces[9] = new Piece("CubeImages/Center2.jpg");
    CENTERS.Pieces[9].RotateY(1);
    CENTERS.Pieces[9].RotateZ(-1);
    CENTERS.Pieces[10] = new Piece("CubeImages/Center2.jpg");
    CENTERS.Pieces[10].RotateY(1);
    CENTERS.Pieces[10].RotateY(1);
    CENTERS.Pieces[10].RotateZ(-1);
    CENTERS.Pieces[11] = new Piece("CubeImages/Center2.jpg");
    CENTERS.Pieces[11].RotateY(-1);
    CENTERS.Pieces[11].RotateZ(-1);
    CENTERS.Pieces[12] = new Piece("CubeImages/Center3.jpg");
    CENTERS.Pieces[12].RotateZ(1);
    CENTERS.Pieces[13] = new Piece("CubeImages/Center3.jpg");
    CENTERS.Pieces[13].RotateY(-1);
    CENTERS.Pieces[13].RotateZ(1);
    CENTERS.Pieces[14] = new Piece("CubeImages/Center3.jpg");
    CENTERS.Pieces[14].RotateY(-1);
    CENTERS.Pieces[14].RotateY(-1);
    CENTERS.Pieces[14].RotateZ(1);
    CENTERS.Pieces[15] = new Piece("CubeImages/Center3.jpg");
    CENTERS.Pieces[15].RotateY(1);
    CENTERS.Pieces[15].RotateZ(1);
    CENTERS.Pieces[16] = new Piece("CubeImages/Center4.jpg");
    CENTERS.Pieces[16].RotateY(-1);
    CENTERS.Pieces[17] = new Piece("CubeImages/Center4.jpg");
    CENTERS.Pieces[17].RotateZ(-1);
    CENTERS.Pieces[17].RotateY(-1);
    CENTERS.Pieces[18] = new Piece("CubeImages/Center4.jpg");
    CENTERS.Pieces[18].RotateZ(-1);
    CENTERS.Pieces[18].RotateZ(-1);
    CENTERS.Pieces[18].RotateY(-1);
    CENTERS.Pieces[19] = new Piece("CubeImages/Center4.jpg");
    CENTERS.Pieces[19].RotateZ(1);
    CENTERS.Pieces[19].RotateY(-1);
    CENTERS.Pieces[20] = new Piece("CubeImages/Center5.jpg");
    CENTERS.Pieces[20].RotateY(1);
    CENTERS.Pieces[21] = new Piece("CubeImages/Center5.jpg");
    CENTERS.Pieces[21].RotateZ(1);
    CENTERS.Pieces[21].RotateY(1);
    CENTERS.Pieces[22] = new Piece("CubeImages/Center5.jpg");
    CENTERS.Pieces[22].RotateZ(1);
    CENTERS.Pieces[22].RotateZ(1);
    CENTERS.Pieces[22].RotateY(1);
    CENTERS.Pieces[23] = new Piece("CubeImages/Center5.jpg");
    CENTERS.Pieces[23].RotateZ(-1);
    CENTERS.Pieces[23].RotateY(1);

    EDGES.Pieces[0] = new Piece("CubeImages/Edge0.jpg");
    EDGES.Pieces[1] = new Piece("CubeImages/Edge0.jpg");
    //EDGES.Pieces[1].Reflect(1,1,-1);
    EDGES.Pieces[1].Translate(0,0,-1);

    EDGES.Pieces[2] = new Piece("CubeImages/Edge1.jpg");
    EDGES.Pieces[2].RotateZ(1);
    EDGES.Pieces[3] = new Piece("CubeImages/Edge1.jpg");
    //EDGES.Pieces[3].Reflect(1,1,-1);
    EDGES.Pieces[3].Translate(0,0,-1);
    EDGES.Pieces[3].RotateZ(1);

    EDGES.Pieces[4] = new Piece("CubeImages/Edge2.jpg");
    EDGES.Pieces[4].RotateZ(1);
    EDGES.Pieces[4].RotateZ(1);
    EDGES.Pieces[5] = new Piece("CubeImages/Edge2.jpg");
    //EDGES.Pieces[5].Reflect(1,1,-1);
    EDGES.Pieces[5].Translate(0,0,-1);
    EDGES.Pieces[5].RotateZ(1);
    EDGES.Pieces[5].RotateZ(1);

    EDGES.Pieces[6] = new Piece("CubeImages/Edge3.jpg");
    EDGES.Pieces[6].RotateZ(-1);
    EDGES.Pieces[7] = new Piece("CubeImages/Edge3.jpg");
    //EDGES.Pieces[7].Reflect(1,1,-1);
    EDGES.Pieces[7].Translate(0,0,-1);
    EDGES.Pieces[7].RotateZ(-1);

    EDGES.Pieces[8] = new Piece("CubeImages/Edge4.jpg");
    //EDGES.Pieces[8].Reflect(1,-1,1);
    EDGES.Pieces[8].Translate(0,1,0);
    EDGES.Pieces[8].RotateX(1);
    EDGES.Pieces[9] = new Piece("CubeImages/Edge4.jpg");
    EDGES.Pieces[9].RotateX(1);

    EDGES.Pieces[10] = new Piece("CubeImages/Edge5.jpg");
    //EDGES.Pieces[10].Reflect(1,-1,1);
    EDGES.Pieces[10].Translate(0,1,0);
    EDGES.Pieces[10].RotateY(1);
    EDGES.Pieces[10].RotateX(1);
    EDGES.Pieces[11] = new Piece("CubeImages/Edge5.jpg");    
    EDGES.Pieces[11].RotateY(1);
    EDGES.Pieces[11].RotateX(1);

    EDGES.Pieces[12] = new Piece("CubeImages/Edge6.jpg");
    EDGES.Pieces[12].RotateZ(1);
    EDGES.Pieces[12].RotateY(-1);
    EDGES.Pieces[13] = new Piece("CubeImages/Edge6.jpg");
    //EDGES.Pieces[13].Reflect(1,-1,1);
    EDGES.Pieces[13].Translate(0,-1,0);
    EDGES.Pieces[13].RotateZ(1);
    EDGES.Pieces[13].RotateY(-1);

    EDGES.Pieces[14] = new Piece("CubeImages/Edge7.jpg");
    EDGES.Pieces[14].RotateX(-1);
    EDGES.Pieces[15] = new Piece("CubeImages/Edge7.jpg");
    //EDGES.Pieces[15].Reflect(1,-1,1);
    EDGES.Pieces[15].Translate(0,-1,0);
    EDGES.Pieces[15].RotateX(-1);

    EDGES.Pieces[16] = new Piece("CubeImages/Edge8.jpg");
    //EDGES.Pieces[16].Reflect(-1,1,1);
    EDGES.Pieces[16].Translate(1,0,0);
    EDGES.Pieces[16].RotateY(1);
    EDGES.Pieces[17] = new Piece("CubeImages/Edge8.jpg");
    EDGES.Pieces[17].RotateY(1);

    EDGES.Pieces[18] = new Piece("CubeImages/Edge9.jpg");
    EDGES.Pieces[18].RotateY(-1);
    EDGES.Pieces[19] = new Piece("CubeImages/Edge9.jpg");
    //EDGES.Pieces[19].Reflect(-1,1,1);
    EDGES.Pieces[19].Translate(-1,0,0);
    EDGES.Pieces[19].RotateY(-1);

    EDGES.Pieces[20] = new Piece("CubeImages/Edge10.jpg");
    EDGES.Pieces[20].RotateX(-1);
    EDGES.Pieces[20].RotateY(-1);
    EDGES.Pieces[21] = new Piece("CubeImages/Edge10.jpg");
    //EDGES.Pieces[21].Reflect(-1,1,1);
    EDGES.Pieces[21].Translate(-1,0,0);
    EDGES.Pieces[21].RotateX(-1);
    EDGES.Pieces[21].RotateY(-1);

    EDGES.Pieces[22] = new Piece("CubeImages/Edge11.jpg");
    //EDGES.Pieces[22].Reflect(-1,1,1);
    EDGES.Pieces[22].Translate(1,0,0);
    EDGES.Pieces[22].RotateX(1);
    EDGES.Pieces[22].RotateY(1);
    EDGES.Pieces[23] = new Piece("CubeImages/Edge11.jpg");
    EDGES.Pieces[23].RotateX(1);
    EDGES.Pieces[23].RotateY(1);
}


function InitMoves() {
    // Face Moves
    MOVES[0] = new Move();
    MOVES[0].Axis = [-1,0,0];
    MOVES[0].EndAngle = 90.0;
    MOVES[0].PiecePairs.push([CORNERS,0]);
    MOVES[0].PiecePairs.push([CORNERS,4]);
    MOVES[0].PiecePairs.push([CORNERS,6]);
    MOVES[0].PiecePairs.push([CORNERS,2]);
    MOVES[0].PiecePairs.push([CENTERS,0]);
    MOVES[0].PiecePairs.push([CENTERS,1]);
    MOVES[0].PiecePairs.push([CENTERS,2]);
    MOVES[0].PiecePairs.push([CENTERS,3]);
    MOVES[0].PiecePairs.push([EDGES,2]);
    MOVES[0].PiecePairs.push([EDGES,12]);
    MOVES[0].PiecePairs.push([EDGES,5]);
    MOVES[0].PiecePairs.push([EDGES,11]);
    MOVES[0].PiecePairs.push([EDGES,3]);
    MOVES[0].PiecePairs.push([EDGES,13]);
    MOVES[0].PiecePairs.push([EDGES,4]);
    MOVES[0].PiecePairs.push([EDGES,10]);
    MOVES[0].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10, 15,12,13,14];

    MOVES[1] = new Move();
    MOVES[1].Axis = [-1,0,0];
    MOVES[1].EndAngle = -90.0;
    MOVES[1].PiecePairs.push([CORNERS,0]);
    MOVES[1].PiecePairs.push([CORNERS,4]);
    MOVES[1].PiecePairs.push([CORNERS,6]);
    MOVES[1].PiecePairs.push([CORNERS,2]);
    MOVES[1].PiecePairs.push([CENTERS,0]);
    MOVES[1].PiecePairs.push([CENTERS,1]);
    MOVES[1].PiecePairs.push([CENTERS,2]);
    MOVES[1].PiecePairs.push([CENTERS,3]);
    MOVES[1].PiecePairs.push([EDGES,2]);
    MOVES[1].PiecePairs.push([EDGES,12]);
    MOVES[1].PiecePairs.push([EDGES,5]);
    MOVES[1].PiecePairs.push([EDGES,11]);
    MOVES[1].PiecePairs.push([EDGES,3]);
    MOVES[1].PiecePairs.push([EDGES,13]);
    MOVES[1].PiecePairs.push([EDGES,4]);
    MOVES[1].PiecePairs.push([EDGES,10]);
    MOVES[1].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8, 13,14,15,12];

    MOVES[0].Reverse = MOVES[1];
    MOVES[1].Reverse = MOVES[0];

    MOVES[2] = new Move();
    MOVES[2].Axis = [1,0,0];
    MOVES[2].EndAngle = 90.0;
    MOVES[2].PiecePairs.push([CORNERS,1]);
    MOVES[2].PiecePairs.push([CORNERS,3]);
    MOVES[2].PiecePairs.push([CORNERS,7]);
    MOVES[2].PiecePairs.push([CORNERS,5]);
    MOVES[2].PiecePairs.push([CENTERS,4]);
    MOVES[2].PiecePairs.push([CENTERS,5]);
    MOVES[2].PiecePairs.push([CENTERS,6]);
    MOVES[2].PiecePairs.push([CENTERS,7]);
    MOVES[2].PiecePairs.push([EDGES,1]);
    MOVES[2].PiecePairs.push([EDGES,8]);
    MOVES[2].PiecePairs.push([EDGES,6]);
    MOVES[2].PiecePairs.push([EDGES,15]);
    MOVES[2].PiecePairs.push([EDGES,0]);
    MOVES[2].PiecePairs.push([EDGES,9]);
    MOVES[2].PiecePairs.push([EDGES,7]);
    MOVES[2].PiecePairs.push([EDGES,14]);
    MOVES[2].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10, 15,12,13,14];

    MOVES[3] = new Move();
    MOVES[3].Axis = [1,0,0];
    MOVES[3].EndAngle = -90.0;
    MOVES[3].PiecePairs.push([CORNERS,1]);
    MOVES[3].PiecePairs.push([CORNERS,3]);
    MOVES[3].PiecePairs.push([CORNERS,7]);
    MOVES[3].PiecePairs.push([CORNERS,5]);
    MOVES[3].PiecePairs.push([CENTERS,4]);
    MOVES[3].PiecePairs.push([CENTERS,5]);
    MOVES[3].PiecePairs.push([CENTERS,6]);
    MOVES[3].PiecePairs.push([CENTERS,7]);
    MOVES[3].PiecePairs.push([EDGES,1]);
    MOVES[3].PiecePairs.push([EDGES,8]);
    MOVES[3].PiecePairs.push([EDGES,6]);
    MOVES[3].PiecePairs.push([EDGES,15]);
    MOVES[3].PiecePairs.push([EDGES,0]);
    MOVES[3].PiecePairs.push([EDGES,9]);
    MOVES[3].PiecePairs.push([EDGES,7]);
    MOVES[3].PiecePairs.push([EDGES,14]);
    MOVES[3].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8, 13,14,15,12];

    MOVES[2].Reverse = MOVES[3];
    MOVES[3].Reverse = MOVES[2];

    MOVES[4] = new Move();
    MOVES[4].Axis = [0,-1,0];
    MOVES[4].EndAngle = 90.0;
    MOVES[4].PiecePairs.push([CORNERS,0]);
    MOVES[4].PiecePairs.push([CORNERS,1]);
    MOVES[4].PiecePairs.push([CORNERS,5]);
    MOVES[4].PiecePairs.push([CORNERS,4]);
    MOVES[4].PiecePairs.push([CENTERS,8]);
    MOVES[4].PiecePairs.push([CENTERS,9]);
    MOVES[4].PiecePairs.push([CENTERS,10]);
    MOVES[4].PiecePairs.push([CENTERS,11]);
    MOVES[4].PiecePairs.push([EDGES,4]);
    MOVES[4].PiecePairs.push([EDGES,21]);
    MOVES[4].PiecePairs.push([EDGES,7]);
    MOVES[4].PiecePairs.push([EDGES,22]);
    MOVES[4].PiecePairs.push([EDGES,5]);
    MOVES[4].PiecePairs.push([EDGES,20]);
    MOVES[4].PiecePairs.push([EDGES,6]);
    MOVES[4].PiecePairs.push([EDGES,23]);
    MOVES[4].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10, 15,12,13,14];

    MOVES[5] = new Move();
    MOVES[5].Axis = [0,-1,0];
    MOVES[5].EndAngle = -90.0;
    MOVES[5].PiecePairs.push([CORNERS,0]);
    MOVES[5].PiecePairs.push([CORNERS,1]);
    MOVES[5].PiecePairs.push([CORNERS,5]);
    MOVES[5].PiecePairs.push([CORNERS,4]);
    MOVES[5].PiecePairs.push([CENTERS,8]);
    MOVES[5].PiecePairs.push([CENTERS,9]);
    MOVES[5].PiecePairs.push([CENTERS,10]);
    MOVES[5].PiecePairs.push([CENTERS,11]);
    MOVES[5].PiecePairs.push([EDGES,4]);
    MOVES[5].PiecePairs.push([EDGES,21]);
    MOVES[5].PiecePairs.push([EDGES,7]);
    MOVES[5].PiecePairs.push([EDGES,22]);
    MOVES[5].PiecePairs.push([EDGES,5]);
    MOVES[5].PiecePairs.push([EDGES,20]);
    MOVES[5].PiecePairs.push([EDGES,6]);
    MOVES[5].PiecePairs.push([EDGES,23]);
    MOVES[5].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8, 13,14,15,12];

    MOVES[4].Reverse = MOVES[5];
    MOVES[5].Reverse = MOVES[4];

    MOVES[6] = new Move();
    MOVES[6].Axis = [0,1,0];
    MOVES[6].EndAngle = 90.0;
    MOVES[6].PiecePairs.push([CORNERS,2]);
    MOVES[6].PiecePairs.push([CORNERS,6]);
    MOVES[6].PiecePairs.push([CORNERS,7]);
    MOVES[6].PiecePairs.push([CORNERS,3]);
    MOVES[6].PiecePairs.push([CENTERS,12]);
    MOVES[6].PiecePairs.push([CENTERS,13]);
    MOVES[6].PiecePairs.push([CENTERS,14]);
    MOVES[6].PiecePairs.push([CENTERS,15]);
    MOVES[6].PiecePairs.push([EDGES,0]);
    MOVES[6].PiecePairs.push([EDGES,18]);
    MOVES[6].PiecePairs.push([EDGES,3]);
    MOVES[6].PiecePairs.push([EDGES,17]);
    MOVES[6].PiecePairs.push([EDGES,1]);
    MOVES[6].PiecePairs.push([EDGES,19]);
    MOVES[6].PiecePairs.push([EDGES,2]);
    MOVES[6].PiecePairs.push([EDGES,16]);
    MOVES[6].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10, 15,12,13,14];

    MOVES[7] = new Move();
    MOVES[7].Axis = [0,1,0];
    MOVES[7].EndAngle = -90.0;
    MOVES[7].PiecePairs.push([CORNERS,2]);
    MOVES[7].PiecePairs.push([CORNERS,6]);
    MOVES[7].PiecePairs.push([CORNERS,7]);
    MOVES[7].PiecePairs.push([CORNERS,3]);
    MOVES[7].PiecePairs.push([CENTERS,12]);
    MOVES[7].PiecePairs.push([CENTERS,13]);
    MOVES[7].PiecePairs.push([CENTERS,14]);
    MOVES[7].PiecePairs.push([CENTERS,15]);
    MOVES[7].PiecePairs.push([EDGES,0]);
    MOVES[7].PiecePairs.push([EDGES,18]);
    MOVES[7].PiecePairs.push([EDGES,3]);
    MOVES[7].PiecePairs.push([EDGES,17]);
    MOVES[7].PiecePairs.push([EDGES,1]);
    MOVES[7].PiecePairs.push([EDGES,19]);
    MOVES[7].PiecePairs.push([EDGES,2]);
    MOVES[7].PiecePairs.push([EDGES,16]);
    MOVES[7].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8, 13,14,15,12];

    MOVES[6].Reverse = MOVES[7];
    MOVES[7].Reverse = MOVES[6];

    MOVES[8] = new Move();
    MOVES[8].Axis = [0,0,-1];
    MOVES[8].EndAngle = 90.0;
    MOVES[8].PiecePairs.push([CORNERS,0]);
    MOVES[8].PiecePairs.push([CORNERS,2]);
    MOVES[8].PiecePairs.push([CORNERS,3]);
    MOVES[8].PiecePairs.push([CORNERS,1]);
    MOVES[8].PiecePairs.push([CENTERS,16]);
    MOVES[8].PiecePairs.push([CENTERS,17]);
    MOVES[8].PiecePairs.push([CENTERS,18]);
    MOVES[8].PiecePairs.push([CENTERS,19]);
    MOVES[8].PiecePairs.push([EDGES,13]);
    MOVES[8].PiecePairs.push([EDGES,19]);
    MOVES[8].PiecePairs.push([EDGES,14]);
    MOVES[8].PiecePairs.push([EDGES,20]);
    MOVES[8].PiecePairs.push([EDGES,12]);
    MOVES[8].PiecePairs.push([EDGES,18]);
    MOVES[8].PiecePairs.push([EDGES,15]);
    MOVES[8].PiecePairs.push([EDGES,21]);
    MOVES[8].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10, 15,12,13,14];

    MOVES[9] = new Move();
    MOVES[9].Axis = [0,0,-1];
    MOVES[9].EndAngle = -90.0;
    MOVES[9].PiecePairs.push([CORNERS,0]);
    MOVES[9].PiecePairs.push([CORNERS,2]);
    MOVES[9].PiecePairs.push([CORNERS,3]);
    MOVES[9].PiecePairs.push([CORNERS,1]);
    MOVES[9].PiecePairs.push([CENTERS,16]);
    MOVES[9].PiecePairs.push([CENTERS,17]);
    MOVES[9].PiecePairs.push([CENTERS,18]);
    MOVES[9].PiecePairs.push([CENTERS,19]);
    MOVES[9].PiecePairs.push([EDGES,13]);
    MOVES[9].PiecePairs.push([EDGES,19]);
    MOVES[9].PiecePairs.push([EDGES,14]);
    MOVES[9].PiecePairs.push([EDGES,20]);
    MOVES[9].PiecePairs.push([EDGES,12]);
    MOVES[9].PiecePairs.push([EDGES,18]);
    MOVES[9].PiecePairs.push([EDGES,15]);
    MOVES[9].PiecePairs.push([EDGES,21]);
    MOVES[9].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8, 13,14,15,12];

    MOVES[8].Reverse = MOVES[9];
    MOVES[9].Reverse = MOVES[8];

    MOVES[10] = new Move();
    MOVES[10].Axis = [0,0,1];
    MOVES[10].EndAngle = 90.0;
    MOVES[10].PiecePairs.push([CORNERS,4]);
    MOVES[10].PiecePairs.push([CORNERS,5]);
    MOVES[10].PiecePairs.push([CORNERS,7]);
    MOVES[10].PiecePairs.push([CORNERS,6]);
    MOVES[10].PiecePairs.push([CENTERS,20]);
    MOVES[10].PiecePairs.push([CENTERS,21]);
    MOVES[10].PiecePairs.push([CENTERS,22]);
    MOVES[10].PiecePairs.push([CENTERS,23]);
    MOVES[10].PiecePairs.push([EDGES,9]);
    MOVES[10].PiecePairs.push([EDGES,16]);
    MOVES[10].PiecePairs.push([EDGES,10]);
    MOVES[10].PiecePairs.push([EDGES,23]);
    MOVES[10].PiecePairs.push([EDGES,8]);
    MOVES[10].PiecePairs.push([EDGES,17]);
    MOVES[10].PiecePairs.push([EDGES,11]);
    MOVES[10].PiecePairs.push([EDGES,22]);
    MOVES[10].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10, 15,12,13,14];

    MOVES[11] = new Move();
    MOVES[11].Axis = [0,0,1];
    MOVES[11].EndAngle = -90.0;
    MOVES[11].PiecePairs.push([CORNERS,4]);
    MOVES[11].PiecePairs.push([CORNERS,5]);
    MOVES[11].PiecePairs.push([CORNERS,7]);
    MOVES[11].PiecePairs.push([CORNERS,6]);
    MOVES[11].PiecePairs.push([CENTERS,20]);
    MOVES[11].PiecePairs.push([CENTERS,21]);
    MOVES[11].PiecePairs.push([CENTERS,22]);
    MOVES[11].PiecePairs.push([CENTERS,23]);
    MOVES[11].PiecePairs.push([EDGES,9]);
    MOVES[11].PiecePairs.push([EDGES,16]);
    MOVES[11].PiecePairs.push([EDGES,10]);
    MOVES[11].PiecePairs.push([EDGES,23]);
    MOVES[11].PiecePairs.push([EDGES,8]);
    MOVES[11].PiecePairs.push([EDGES,17]);
    MOVES[11].PiecePairs.push([EDGES,11]);
    MOVES[11].PiecePairs.push([EDGES,22]);
    MOVES[11].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8, 13,14,15,12];

    MOVES[10].Reverse = MOVES[11];
    MOVES[11].Reverse = MOVES[10];

    // Inside Moves
    MOVES[12] = new Move(); // x2
    MOVES[12].Axis = [1,0,0];
    MOVES[12].EndAngle = 90.0;
    MOVES[12].PiecePairs.push([CENTERS,8]);
    MOVES[12].PiecePairs.push([CENTERS,17]);
    MOVES[12].PiecePairs.push([CENTERS,14]);
    MOVES[12].PiecePairs.push([CENTERS,23]);
    MOVES[12].PiecePairs.push([CENTERS,11]);
    MOVES[12].PiecePairs.push([CENTERS,16]);
    MOVES[12].PiecePairs.push([CENTERS,13]);
    MOVES[12].PiecePairs.push([CENTERS,22]);
    MOVES[12].PiecePairs.push([EDGES,16]);
    MOVES[12].PiecePairs.push([EDGES,22]);
    MOVES[12].PiecePairs.push([EDGES,20]);
    MOVES[12].PiecePairs.push([EDGES,18]);
    MOVES[12].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10];

    MOVES[13] = new Move();
    MOVES[13].Axis = [1,0,0];
    MOVES[13].EndAngle = -90.0;
    MOVES[13].PiecePairs.push([CENTERS,8]);
    MOVES[13].PiecePairs.push([CENTERS,17]);
    MOVES[13].PiecePairs.push([CENTERS,14]);
    MOVES[13].PiecePairs.push([CENTERS,23]);
    MOVES[13].PiecePairs.push([CENTERS,11]);
    MOVES[13].PiecePairs.push([CENTERS,16]);
    MOVES[13].PiecePairs.push([CENTERS,13]);
    MOVES[13].PiecePairs.push([CENTERS,22]);
    MOVES[13].PiecePairs.push([EDGES,16]);
    MOVES[13].PiecePairs.push([EDGES,22]);
    MOVES[13].PiecePairs.push([EDGES,20]);
    MOVES[13].PiecePairs.push([EDGES,18]);
    MOVES[13].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8];

    MOVES[12].Reverse = MOVES[13];
    MOVES[13].Reverse = MOVES[12];

    //-
    MOVES[12] = new Move(); // x2
    MOVES[12].Axis = [1,0,0];
    MOVES[12].EndAngle = 90.0;
    MOVES[12].PiecePairs.push([CENTERS,8]);
    MOVES[12].PiecePairs.push([CENTERS,17]);
    MOVES[12].PiecePairs.push([CENTERS,14]);
    MOVES[12].PiecePairs.push([CENTERS,23]);
    MOVES[12].PiecePairs.push([CENTERS,11]);
    MOVES[12].PiecePairs.push([CENTERS,16]);
    MOVES[12].PiecePairs.push([CENTERS,13]);
    MOVES[12].PiecePairs.push([CENTERS,22]);
    MOVES[12].PiecePairs.push([EDGES,16]);
    MOVES[12].PiecePairs.push([EDGES,22]);
    MOVES[12].PiecePairs.push([EDGES,20]);
    MOVES[12].PiecePairs.push([EDGES,18]);
    MOVES[12].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10];

    MOVES[13] = new Move();
    MOVES[13].Axis = [1,0,0];
    MOVES[13].EndAngle = -90.0;
    MOVES[13].PiecePairs.push([CENTERS,8]);
    MOVES[13].PiecePairs.push([CENTERS,17]);
    MOVES[13].PiecePairs.push([CENTERS,14]);
    MOVES[13].PiecePairs.push([CENTERS,23]);
    MOVES[13].PiecePairs.push([CENTERS,11]);
    MOVES[13].PiecePairs.push([CENTERS,16]);
    MOVES[13].PiecePairs.push([CENTERS,13]);
    MOVES[13].PiecePairs.push([CENTERS,22]);
    MOVES[13].PiecePairs.push([EDGES,16]);
    MOVES[13].PiecePairs.push([EDGES,22]);
    MOVES[13].PiecePairs.push([EDGES,20]);
    MOVES[13].PiecePairs.push([EDGES,18]);
    MOVES[13].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8];

    MOVES[12].Reverse = MOVES[13];
    MOVES[13].Reverse = MOVES[12];


    //-
    MOVES[14] = new Move(); // x3
    MOVES[14].Axis = [1,0,0];
    MOVES[14].EndAngle = 90.0;
    MOVES[14].PiecePairs.push([CENTERS,9]);
    MOVES[14].PiecePairs.push([CENTERS,18]);
    MOVES[14].PiecePairs.push([CENTERS,15]);
    MOVES[14].PiecePairs.push([CENTERS,20]);
    MOVES[14].PiecePairs.push([CENTERS,10]);
    MOVES[14].PiecePairs.push([CENTERS,19]);
    MOVES[14].PiecePairs.push([CENTERS,12]);
    MOVES[14].PiecePairs.push([CENTERS,21]);
    MOVES[14].PiecePairs.push([EDGES,17]);
    MOVES[14].PiecePairs.push([EDGES,23]);
    MOVES[14].PiecePairs.push([EDGES,21]);
    MOVES[14].PiecePairs.push([EDGES,19]);
    MOVES[14].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10];

    MOVES[15] = new Move();
    MOVES[15].Axis = [1,0,0];
    MOVES[15].EndAngle = -90.0;
    MOVES[15].PiecePairs.push([CENTERS,9]);
    MOVES[15].PiecePairs.push([CENTERS,18]);
    MOVES[15].PiecePairs.push([CENTERS,15]);
    MOVES[15].PiecePairs.push([CENTERS,20]);
    MOVES[15].PiecePairs.push([CENTERS,10]);
    MOVES[15].PiecePairs.push([CENTERS,19]);
    MOVES[15].PiecePairs.push([CENTERS,12]);
    MOVES[15].PiecePairs.push([CENTERS,21]);
    MOVES[15].PiecePairs.push([EDGES,17]);
    MOVES[15].PiecePairs.push([EDGES,23]);
    MOVES[15].PiecePairs.push([EDGES,21]);
    MOVES[15].PiecePairs.push([EDGES,19]);
    MOVES[15].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8];

    MOVES[14].Reverse = MOVES[15];
    MOVES[15].Reverse = MOVES[14];

    MOVES[16] = new Move();
    MOVES[16].Axis = [0,1,0];
    MOVES[16].EndAngle = 90.0;
    MOVES[16].PiecePairs.push([CENTERS,0]);
    MOVES[16].PiecePairs.push([CENTERS,20]);
    MOVES[16].PiecePairs.push([CENTERS,4]);
    MOVES[16].PiecePairs.push([CENTERS,16]);
    MOVES[16].PiecePairs.push([CENTERS,3]);
    MOVES[16].PiecePairs.push([CENTERS,23]);
    MOVES[16].PiecePairs.push([CENTERS,7]);
    MOVES[16].PiecePairs.push([CENTERS,19]);
    MOVES[16].PiecePairs.push([EDGES,14]);
    MOVES[16].PiecePairs.push([EDGES,12]);
    MOVES[16].PiecePairs.push([EDGES,10]);
    MOVES[16].PiecePairs.push([EDGES,8]);
    MOVES[16].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10];

    MOVES[17] = new Move();
    MOVES[17].Axis = [0,1,0];
    MOVES[17].EndAngle = -90.0;
    MOVES[17].PiecePairs.push([CENTERS,0]);
    MOVES[17].PiecePairs.push([CENTERS,20]);
    MOVES[17].PiecePairs.push([CENTERS,4]);
    MOVES[17].PiecePairs.push([CENTERS,16]);
    MOVES[17].PiecePairs.push([CENTERS,3]);
    MOVES[17].PiecePairs.push([CENTERS,23]);
    MOVES[17].PiecePairs.push([CENTERS,7]);
    MOVES[17].PiecePairs.push([CENTERS,19]);
    MOVES[17].PiecePairs.push([EDGES,14]);
    MOVES[17].PiecePairs.push([EDGES,12]);
    MOVES[17].PiecePairs.push([EDGES,10]);
    MOVES[17].PiecePairs.push([EDGES,8]);
    MOVES[17].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8];

    MOVES[16].Reverse = MOVES[17];
    MOVES[17].Reverse = MOVES[16];

//    -----
    MOVES[18] = new Move();
    MOVES[18].Axis = [0,1,0];
    MOVES[18].EndAngle = 90.0;
    MOVES[18].PiecePairs.push([CENTERS,1]);
    MOVES[18].PiecePairs.push([CENTERS,21]);
    MOVES[18].PiecePairs.push([CENTERS,5]);
    MOVES[18].PiecePairs.push([CENTERS,17]);
    MOVES[18].PiecePairs.push([CENTERS,2]);
    MOVES[18].PiecePairs.push([CENTERS,22]);
    MOVES[18].PiecePairs.push([CENTERS,6]);
    MOVES[18].PiecePairs.push([CENTERS,18]);
    MOVES[18].PiecePairs.push([EDGES,15]);
    MOVES[18].PiecePairs.push([EDGES,13]);
    MOVES[18].PiecePairs.push([EDGES,11]);
    MOVES[18].PiecePairs.push([EDGES,9]);
    MOVES[18].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10];

    MOVES[19] = new Move();
    MOVES[19].Axis = [0,1,0];
    MOVES[19].EndAngle = -90.0;
    MOVES[19].PiecePairs.push([CENTERS,1]);
    MOVES[19].PiecePairs.push([CENTERS,21]);
    MOVES[19].PiecePairs.push([CENTERS,5]);
    MOVES[19].PiecePairs.push([CENTERS,17]);
    MOVES[19].PiecePairs.push([CENTERS,2]);
    MOVES[19].PiecePairs.push([CENTERS,22]);
    MOVES[19].PiecePairs.push([CENTERS,6]);
    MOVES[19].PiecePairs.push([CENTERS,18]);
    MOVES[19].PiecePairs.push([EDGES,15]);
    MOVES[19].PiecePairs.push([EDGES,13]);
    MOVES[19].PiecePairs.push([EDGES,11]);
    MOVES[19].PiecePairs.push([EDGES,9]);
    MOVES[19].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8];

    MOVES[18].Reverse = MOVES[19];
    MOVES[19].Reverse = MOVES[18];


    MOVES[20] = new Move(); // z2
    MOVES[20].Axis = [0,0,1];
    MOVES[20].EndAngle = 90.0;
    MOVES[20].PiecePairs.push([CENTERS,3]);
    MOVES[20].PiecePairs.push([CENTERS,9]);
    MOVES[20].PiecePairs.push([CENTERS,5]);
    MOVES[20].PiecePairs.push([CENTERS,13]);
    MOVES[20].PiecePairs.push([CENTERS,2]);
    MOVES[20].PiecePairs.push([CENTERS,8]);
    MOVES[20].PiecePairs.push([CENTERS,4]);
    MOVES[20].PiecePairs.push([CENTERS,12]);
    MOVES[20].PiecePairs.push([EDGES,0]);
    MOVES[20].PiecePairs.push([EDGES,2]);
    MOVES[20].PiecePairs.push([EDGES,4]);
    MOVES[20].PiecePairs.push([EDGES,6]);
    MOVES[20].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10];

    MOVES[21] = new Move(); // z2
    MOVES[21].Axis = [0,0,1];
    MOVES[21].EndAngle = -90.0;
    MOVES[21].PiecePairs.push([CENTERS,3]);
    MOVES[21].PiecePairs.push([CENTERS,9]);
    MOVES[21].PiecePairs.push([CENTERS,5]);
    MOVES[21].PiecePairs.push([CENTERS,13]);
    MOVES[21].PiecePairs.push([CENTERS,2]);
    MOVES[21].PiecePairs.push([CENTERS,8]);
    MOVES[21].PiecePairs.push([CENTERS,4]);
    MOVES[21].PiecePairs.push([CENTERS,12]);
    MOVES[21].PiecePairs.push([EDGES,0]);
    MOVES[21].PiecePairs.push([EDGES,2]);
    MOVES[21].PiecePairs.push([EDGES,4]);
    MOVES[21].PiecePairs.push([EDGES,6]);
    MOVES[21].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8];

    MOVES[20].Reverse = MOVES[21];
    MOVES[21].Reverse = MOVES[20];


    MOVES[22] = new Move(); // z1
    MOVES[22].Axis = [0,0,1];
    MOVES[22].EndAngle = 90.0;
    MOVES[22].PiecePairs.push([CENTERS,0]);
    MOVES[22].PiecePairs.push([CENTERS,10]);
    MOVES[22].PiecePairs.push([CENTERS,6]);
    MOVES[22].PiecePairs.push([CENTERS,14]);
    MOVES[22].PiecePairs.push([CENTERS,1]);
    MOVES[22].PiecePairs.push([CENTERS,11]);
    MOVES[22].PiecePairs.push([CENTERS,7]);
    MOVES[22].PiecePairs.push([CENTERS,15]);
    MOVES[22].PiecePairs.push([EDGES,1]);
    MOVES[22].PiecePairs.push([EDGES,3]);
    MOVES[22].PiecePairs.push([EDGES,5]);
    MOVES[22].PiecePairs.push([EDGES,7]);
    MOVES[22].Permutation = [3,0,1,2, 7,4,5,6, 11,8,9,10];

    MOVES[23] = new Move(); // z1
    MOVES[23].Axis = [0,0,1];
    MOVES[23].EndAngle = -90.0;
    MOVES[23].PiecePairs.push([CENTERS,0]);
    MOVES[23].PiecePairs.push([CENTERS,10]);
    MOVES[23].PiecePairs.push([CENTERS,6]);
    MOVES[23].PiecePairs.push([CENTERS,14]);
    MOVES[23].PiecePairs.push([CENTERS,1]);
    MOVES[23].PiecePairs.push([CENTERS,11]);
    MOVES[23].PiecePairs.push([CENTERS,7]);
    MOVES[23].PiecePairs.push([CENTERS,15]);
    MOVES[23].PiecePairs.push([EDGES,1]);
    MOVES[23].PiecePairs.push([EDGES,3]);
    MOVES[23].PiecePairs.push([EDGES,5]);
    MOVES[23].PiecePairs.push([EDGES,7]);
    MOVES[23].Permutation = [1,2,3,0, 5,6,7,4, 9,10,11,8];

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
