var MOVES = [];
var CORNERS = new PieceSet();
var CENTERS = new PieceSet();

function InitCamera() {
    CAMERA.Height = 2.5;
    CAMERA.ComputeMatrix();
}

function InitBuffers() {
    CORNERS.AddPoint(1.3,-0.7, 0.0, 0.25,0.25);
    CORNERS.AddPoint(1.3, 0.7, 0.0, 0.75,0.75);
    CORNERS.AddPoint(1.3, 0.0,-0.7, 0.75,0.25);
    CORNERS.AddPoint(1.3, 0.0, 0.7, 0.25,0.75);
    CORNERS.AddPoint(1.0,-1.0, 0.0, 0.0, 0.0);
    CORNERS.AddPoint(1.0, 1.0, 0.0, 1.0, 1.0);
    CORNERS.AddPoint(1.0, 0.0,-1.0, 1.0, 0.0);
    CORNERS.AddPoint(1.0, 0.0, 1.0, 0.0, 1.0);
    CORNERS.AddPoint(0.0, 0.0, 0.0, 1.0, 0.0);
    CORNERS.AddPoint(0.0, 0.0, 0.0, 0.0, 1.0);
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
    
    CENTERS.AddPoint(1.0, 1.0, 0.0, 0.0, 0.0);
    CENTERS.AddPoint(1.0, 0.0, 1.0, 0.0, 1.0);
    CENTERS.AddPoint(0.0, 1.0, 1.0, 1.0, 0.0);
    CENTERS.AddPoint(0.0, 0.0, 0.0, 0.0, 0.0);
    CENTERS.AddPoint(0.0, 0.0, 0.0, 0.0, 1.0);
    CENTERS.AddPoint(0.0, 0.0, 0.0, 1.0, 0.0);
    CENTERS.AddOutTriangle(0,2,1);
    CENTERS.AddInTriangle(0,1,3);
    CENTERS.AddInTriangle(1,2,4);
    CENTERS.AddInTriangle(2,0,5);
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
    
    CENTERS.Pieces[0] = new Piece("TetraImages/Center0.jpg");
    CENTERS.Pieces[1] = new Piece("TetraImages/Center1.jpg");
    CENTERS.Pieces[1].RotateX(1);
    CENTERS.Pieces[2] = new Piece("TetraImages/Center2.jpg");
    CENTERS.Pieces[2].RotateX(1);
    CENTERS.Pieces[2].RotateX(1);
    CENTERS.Pieces[3] = new Piece("TetraImages/Center3.jpg");
    CENTERS.Pieces[3].RotateX(-1);
    CENTERS.Pieces[4] = new Piece("TetraImages/Center4.jpg");
    CENTERS.Pieces[4].RotateY(1);
    CENTERS.Pieces[5] = new Piece("TetraImages/Center5.jpg");
    CENTERS.Pieces[5].RotateY(1);
    CENTERS.Pieces[5].RotateY(1);
    CENTERS.Pieces[6] = new Piece("TetraImages/Center6.jpg");
    CENTERS.Pieces[6].RotateX(1);
    CENTERS.Pieces[6].RotateY(1);
    CENTERS.Pieces[7] = new Piece("TetraImages/Center7.jpg");
    CENTERS.Pieces[7].RotateY(1);
    CENTERS.Pieces[7].RotateY(1);
    CENTERS.Pieces[7].RotateX(1);
}


function InitMoves() {
    MOVES[0] = new Move();
    MOVES[0].Axis = [1,1,1];
    MOVES[0].EndAngle = 120;
    MOVES[0].PiecePairs.push([CORNERS,0]);//0
    MOVES[0].PiecePairs.push([CORNERS,2]);//1
    MOVES[0].PiecePairs.push([CORNERS,4]);//2
    MOVES[0].PiecePairs.push([CENTERS,0]);//3
    MOVES[0].PiecePairs.push([CENTERS,1]);//4
    MOVES[0].PiecePairs.push([CENTERS,3]);//5
    MOVES[0].PiecePairs.push([CENTERS,4]);//6
    MOVES[0].Permutation = [2,0,1,3,6,4,5];

    MOVES[1] = new Move();
    MOVES[1].Axis = [1,1,1];
    MOVES[1].EndAngle = -120;
    MOVES[1].PiecePairs.push([CORNERS,0]);
    MOVES[1].PiecePairs.push([CORNERS,2]);
    MOVES[1].PiecePairs.push([CORNERS,4]);
    MOVES[1].PiecePairs.push([CENTERS,0]);
    MOVES[1].PiecePairs.push([CENTERS,1]);
    MOVES[1].PiecePairs.push([CENTERS,3]);
    MOVES[1].PiecePairs.push([CENTERS,4]);
    MOVES[1].Permutation = [1,2,0,3,5,6,4];

    MOVES[0].Reverse = MOVES[1];
    MOVES[1].Reverse = MOVES[0];

    MOVES[2] = new Move();
    MOVES[2].Axis = [-1,1,1];
    MOVES[2].EndAngle = 120;
    MOVES[2].PiecePairs.push([CORNERS,1]);
    MOVES[2].PiecePairs.push([CORNERS,4]);
    MOVES[2].PiecePairs.push([CORNERS,2]);
    MOVES[2].PiecePairs.push([CENTERS,4]);
    MOVES[2].PiecePairs.push([CENTERS,0]);
    MOVES[2].PiecePairs.push([CENTERS,5]);
    MOVES[2].PiecePairs.push([CENTERS,6]);
    MOVES[2].Permutation = [2,0,1,3,6,4,5];

    MOVES[3] = new Move();
    MOVES[3].Axis = [-1,1,1];
    MOVES[3].EndAngle = -120;
    MOVES[3].PiecePairs.push([CORNERS,1]);
    MOVES[3].PiecePairs.push([CORNERS,4]);
    MOVES[3].PiecePairs.push([CORNERS,2]);
    MOVES[3].PiecePairs.push([CENTERS,4]);
    MOVES[3].PiecePairs.push([CENTERS,0]);
    MOVES[3].PiecePairs.push([CENTERS,5]);
    MOVES[3].PiecePairs.push([CENTERS,6]);
    MOVES[3].Permutation = [1,2,0,3,5,6,4];

    MOVES[2].Reverse = MOVES[3];
    MOVES[3].Reverse = MOVES[2];

    MOVES[4] = new Move();
    MOVES[4].Axis = [1,-1,1];
    MOVES[4].EndAngle = 120;
    MOVES[4].PiecePairs.push([CORNERS,0]);
    MOVES[4].PiecePairs.push([CORNERS,4]);
    MOVES[4].PiecePairs.push([CORNERS,3]);
    MOVES[4].PiecePairs.push([CENTERS,1]);
    MOVES[4].PiecePairs.push([CENTERS,0]);
    MOVES[4].PiecePairs.push([CENTERS,6]);
    MOVES[4].PiecePairs.push([CENTERS,2]);
    MOVES[4].Permutation = [2,0,1,3,6,4,5];

    MOVES[5] = new Move();
    MOVES[5].Axis = [1,-1,1];
    MOVES[5].EndAngle = -120;
    MOVES[5].PiecePairs.push([CORNERS,0]);
    MOVES[5].PiecePairs.push([CORNERS,4]);
    MOVES[5].PiecePairs.push([CORNERS,3]);
    MOVES[5].PiecePairs.push([CENTERS,1]);
    MOVES[5].PiecePairs.push([CENTERS,0]);
    MOVES[5].PiecePairs.push([CENTERS,6]);
    MOVES[5].PiecePairs.push([CENTERS,2]);
    MOVES[5].Permutation = [1,2,0,3,5,6,4];

    MOVES[4].Reverse = MOVES[5];
    MOVES[5].Reverse = MOVES[4];

    MOVES[6] = new Move();
    MOVES[6].Axis = [1,1,-1];
    MOVES[6].EndAngle = 120;
    MOVES[6].PiecePairs.push([CORNERS,1]);
    MOVES[6].PiecePairs.push([CORNERS,4]);
    MOVES[6].PiecePairs.push([CORNERS,3]);
    MOVES[6].PiecePairs.push([CENTERS,6]);
    MOVES[6].PiecePairs.push([CENTERS,1]);
    MOVES[6].PiecePairs.push([CENTERS,7]);
    MOVES[6].PiecePairs.push([CENTERS,4]);
    MOVES[6].Permutation = [2,0,1,3,6,4,5];

    MOVES[7] = new Move();
    MOVES[7].Axis = [1,1,-1];
    MOVES[7].EndAngle = -120;
    MOVES[7].PiecePairs.push([CORNERS,1]);
    MOVES[7].PiecePairs.push([CORNERS,4]);
    MOVES[7].PiecePairs.push([CORNERS,3]);
    MOVES[7].PiecePairs.push([CENTERS,6]);
    MOVES[7].PiecePairs.push([CENTERS,1]);
    MOVES[7].PiecePairs.push([CENTERS,7]);
    MOVES[7].PiecePairs.push([CENTERS,4]);
    MOVES[7].Permutation = [1,2,0,3,5,6,4];

    MOVES[6].Reverse = MOVES[7];
    MOVES[7].Reverse = MOVES[6];

    MOVES[8] = new Move();
    MOVES[8].Axis = [-1,-1,-1];
    MOVES[8].EndAngle = 120;
    MOVES[8].PiecePairs.push([CORNERS,1]);
    MOVES[8].PiecePairs.push([CORNERS,5]);
    MOVES[8].PiecePairs.push([CORNERS,3]);
    MOVES[8].PiecePairs.push([CENTERS,7]);
    MOVES[8].PiecePairs.push([CENTERS,2]);
    MOVES[8].PiecePairs.push([CENTERS,6]);
    MOVES[8].PiecePairs.push([CENTERS,5]);
    MOVES[8].Permutation = [2,0,1,3,6,4,5];

    MOVES[9] = new Move();
    MOVES[9].Axis = [-1,-1,-1];
    MOVES[9].EndAngle = -120;
    MOVES[9].PiecePairs.push([CORNERS,1]);
    MOVES[9].PiecePairs.push([CORNERS,5]);
    MOVES[9].PiecePairs.push([CORNERS,3]);
    MOVES[9].PiecePairs.push([CENTERS,7]);
    MOVES[9].PiecePairs.push([CENTERS,2]);
    MOVES[9].PiecePairs.push([CENTERS,6]);
    MOVES[9].PiecePairs.push([CENTERS,5]);
    MOVES[9].Permutation = [1,2,0,3,5,6,4];

    MOVES[8].Reverse = MOVES[9];
    MOVES[9].Reverse = MOVES[8];

    MOVES[10] = new Move();
    MOVES[10].Axis = [1,-1,-1];
    MOVES[10].EndAngle = 120;
    MOVES[10].PiecePairs.push([CORNERS,0]);
    MOVES[10].PiecePairs.push([CORNERS,3]);
    MOVES[10].PiecePairs.push([CORNERS,5]);
    MOVES[10].PiecePairs.push([CENTERS,2]);
    MOVES[10].PiecePairs.push([CENTERS,1]);
    MOVES[10].PiecePairs.push([CENTERS,7]);
    MOVES[10].PiecePairs.push([CENTERS,3]);
    MOVES[10].Permutation = [2,0,1,3,6,4,5];

    MOVES[11] = new Move();
    MOVES[11].Axis = [1,-1,-1];
    MOVES[11].EndAngle = -120;
    MOVES[11].PiecePairs.push([CORNERS,0]);
    MOVES[11].PiecePairs.push([CORNERS,3]);
    MOVES[11].PiecePairs.push([CORNERS,5]);
    MOVES[11].PiecePairs.push([CENTERS,2]);
    MOVES[11].PiecePairs.push([CENTERS,1]);
    MOVES[11].PiecePairs.push([CENTERS,7]);
    MOVES[11].PiecePairs.push([CENTERS,3]);
    MOVES[11].Permutation = [1,2,0,3,5,6,4];

    MOVES[10].Reverse = MOVES[11];
    MOVES[11].Reverse = MOVES[10];

    MOVES[12] = new Move();
    MOVES[12].Axis = [-1,1,-1];
    MOVES[12].EndAngle = 120;
    MOVES[12].PiecePairs.push([CORNERS,1]);
    MOVES[12].PiecePairs.push([CORNERS,2]);
    MOVES[12].PiecePairs.push([CORNERS,5]);
    MOVES[12].PiecePairs.push([CENTERS,5]);
    MOVES[12].PiecePairs.push([CENTERS,3]);
    MOVES[12].PiecePairs.push([CENTERS,7]);
    MOVES[12].PiecePairs.push([CENTERS,4]);
    MOVES[12].Permutation = [2,0,1,3,6,4,5];

    MOVES[13] = new Move();
    MOVES[13].Axis = [-1,1,-1];
    MOVES[13].EndAngle = -120;
    MOVES[13].PiecePairs.push([CORNERS,1]);
    MOVES[13].PiecePairs.push([CORNERS,2]);
    MOVES[13].PiecePairs.push([CORNERS,5]);
    MOVES[13].PiecePairs.push([CENTERS,5]);
    MOVES[13].PiecePairs.push([CENTERS,3]);
    MOVES[13].PiecePairs.push([CENTERS,7]);
    MOVES[13].PiecePairs.push([CENTERS,4]);
    MOVES[13].Permutation = [1,2,0,3,5,6,4];

    MOVES[12].Reverse = MOVES[13];
    MOVES[13].Reverse = MOVES[12];

    MOVES[14] = new Move();
    MOVES[14].Axis = [-1,-1,1];
    MOVES[14].EndAngle = 120;
    MOVES[14].PiecePairs.push([CORNERS,0]);
    MOVES[14].PiecePairs.push([CORNERS,2]);
    MOVES[14].PiecePairs.push([CORNERS,5]);
    MOVES[14].PiecePairs.push([CENTERS,3]);
    MOVES[14].PiecePairs.push([CENTERS,0]);
    MOVES[14].PiecePairs.push([CENTERS,5]);
    MOVES[14].PiecePairs.push([CENTERS,2]);
    MOVES[14].Permutation = [2,0,1,3,6,4,5];

    MOVES[15] = new Move();
    MOVES[15].Axis = [-1,-1,1];
    MOVES[15].EndAngle = -120;
    MOVES[15].PiecePairs.push([CORNERS,0]);
    MOVES[15].PiecePairs.push([CORNERS,2]);
    MOVES[15].PiecePairs.push([CORNERS,5]);
    MOVES[15].PiecePairs.push([CENTERS,3]);
    MOVES[15].PiecePairs.push([CENTERS,0]);
    MOVES[15].PiecePairs.push([CENTERS,5]);
    MOVES[15].PiecePairs.push([CENTERS,2]);
    MOVES[15].Permutation = [1,2,0,3,5,6,4];

    MOVES[14].Reverse = MOVES[15];
    MOVES[15].Reverse = MOVES[14];
}

function DrawPieces(program) {
    CORNERS.Draw(program);
    CENTERS.Draw(program);
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
    return null;
}
