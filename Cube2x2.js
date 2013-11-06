var MOVES = [];
var CORNERS = new PieceSet();

function InitCamera() {
    CAMERA.ViewPlaneNormal = [0,0,1];
    CAMERA.Up = [0,1,0];
    CAMERA.Right = [1,0,0];

    CAMERA.Height = 2.5;
    CAMERA.ComputeMatrix();
}

function InitBuffers() {
    CORNERS.AddPoint(1.0, 1.0, 1.0, 0.50,0.50); //0
    CORNERS.AddPoint(0.0, 1.0, 1.0, 0.01,0.50); //1
    CORNERS.AddPoint(1.0, 0.0, 1.0, 0.50,0.01); //2
    CORNERS.AddPoint(1.0, 1.0, 0.0, 0.99,0.99); //3
    CORNERS.AddPoint(0.0, 0.0, 1.0, 0.01,0.01); //4
    CORNERS.AddPoint(0.0, 1.0, 0.0, 0.01,0.99); //5
    CORNERS.AddPoint(1.0, 0.0, 0.0, 0.99,0.01); //6
    CORNERS.AddPoint(0.0, 0.0, 0.0, 0.00,0.50); //7
    CORNERS.AddPoint(0.0, 0.0, 0.0, 0.50,0.00); //8
    CORNERS.AddPoint(0.0, 0.0, 0.0, 1.00,1.00); //9

    // 0 1 4 2
    // 0 2 6 3
    // 0 3 5 1

    // 7 4 1 5
    // 8 6 2 4
    // 9 5 3 6


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


}


function InitMoves() {
    MOVES[0] = new Move();
    MOVES[0].Axis = [-1,0,0];
    MOVES[0].EndAngle = 90.0;
    MOVES[0].PiecePairs.push([CORNERS,0]);
    MOVES[0].PiecePairs.push([CORNERS,4]);
    MOVES[0].PiecePairs.push([CORNERS,6]);
    MOVES[0].PiecePairs.push([CORNERS,2]);
    MOVES[0].Permutation = [3,0,1,2];

    MOVES[1] = new Move();
    MOVES[1].Axis = [-1,0,0];
    MOVES[1].EndAngle = -90.0;
    MOVES[1].PiecePairs.push([CORNERS,0]);
    MOVES[1].PiecePairs.push([CORNERS,4]);
    MOVES[1].PiecePairs.push([CORNERS,6]);
    MOVES[1].PiecePairs.push([CORNERS,2]);
    MOVES[1].Permutation = [1,2,3,0];

    MOVES[0].Reverse = MOVES[1];
    MOVES[1].Reverse = MOVES[0];

    MOVES[2] = new Move();
    MOVES[2].Axis = [1,0,0];
    MOVES[2].EndAngle = 90.0;
    MOVES[2].PiecePairs.push([CORNERS,1]);
    MOVES[2].PiecePairs.push([CORNERS,3]);
    MOVES[2].PiecePairs.push([CORNERS,7]);
    MOVES[2].PiecePairs.push([CORNERS,5]);
    MOVES[2].Permutation = [3,0,1,2];

    MOVES[3] = new Move();
    MOVES[3].Axis = [1,0,0];
    MOVES[3].EndAngle = -90.0;
    MOVES[3].PiecePairs.push([CORNERS,1]);
    MOVES[3].PiecePairs.push([CORNERS,3]);
    MOVES[3].PiecePairs.push([CORNERS,7]);
    MOVES[3].PiecePairs.push([CORNERS,5]);
    MOVES[3].Permutation = [1,2,3,0];

    MOVES[2].Reverse = MOVES[3];
    MOVES[3].Reverse = MOVES[2];

    MOVES[4] = new Move();
    MOVES[4].Axis = [0,-1,0];
    MOVES[4].EndAngle = 90.0;
    MOVES[4].PiecePairs.push([CORNERS,0]);
    MOVES[4].PiecePairs.push([CORNERS,1]);
    MOVES[4].PiecePairs.push([CORNERS,5]);
    MOVES[4].PiecePairs.push([CORNERS,4]);
    MOVES[4].Permutation = [3,0,1,2];

    MOVES[5] = new Move();
    MOVES[5].Axis = [0,-1,0];
    MOVES[5].EndAngle = -90.0;
    MOVES[5].PiecePairs.push([CORNERS,0]);
    MOVES[5].PiecePairs.push([CORNERS,1]);
    MOVES[5].PiecePairs.push([CORNERS,5]);
    MOVES[5].PiecePairs.push([CORNERS,4]);
    MOVES[5].Permutation = [1,2,3,0];

    MOVES[4].Reverse = MOVES[5];
    MOVES[5].Reverse = MOVES[4];

    MOVES[6] = new Move();
    MOVES[6].Axis = [0,1,0];
    MOVES[6].EndAngle = 90.0;
    MOVES[6].PiecePairs.push([CORNERS,2]);
    MOVES[6].PiecePairs.push([CORNERS,6]);
    MOVES[6].PiecePairs.push([CORNERS,7]);
    MOVES[6].PiecePairs.push([CORNERS,3]);
    MOVES[6].Permutation = [3,0,1,2];

    MOVES[7] = new Move();
    MOVES[7].Axis = [0,1,0];
    MOVES[7].EndAngle = -90.0;
    MOVES[7].PiecePairs.push([CORNERS,2]);
    MOVES[7].PiecePairs.push([CORNERS,6]);
    MOVES[7].PiecePairs.push([CORNERS,7]);
    MOVES[7].PiecePairs.push([CORNERS,3]);
    MOVES[7].Permutation = [1,2,3,0];

    MOVES[6].Reverse = MOVES[7];
    MOVES[7].Reverse = MOVES[6];

    MOVES[8] = new Move();
    MOVES[8].Axis = [0,0,-1];
    MOVES[8].EndAngle = 90.0;
    MOVES[8].PiecePairs.push([CORNERS,0]);
    MOVES[8].PiecePairs.push([CORNERS,2]);
    MOVES[8].PiecePairs.push([CORNERS,3]);
    MOVES[8].PiecePairs.push([CORNERS,1]);
    MOVES[8].Permutation = [3,0,1,2];

    MOVES[9] = new Move();
    MOVES[9].Axis = [0,0,-1];
    MOVES[9].EndAngle = -90.0;
    MOVES[9].PiecePairs.push([CORNERS,0]);
    MOVES[9].PiecePairs.push([CORNERS,2]);
    MOVES[9].PiecePairs.push([CORNERS,3]);
    MOVES[9].PiecePairs.push([CORNERS,1]);
    MOVES[9].Permutation = [1,2,3,0];

    MOVES[8].Reverse = MOVES[9];
    MOVES[9].Reverse = MOVES[8];

    MOVES[10] = new Move();
    MOVES[10].Axis = [0,0,1];
    MOVES[10].EndAngle = 90.0;
    MOVES[10].PiecePairs.push([CORNERS,4]);
    MOVES[10].PiecePairs.push([CORNERS,5]);
    MOVES[10].PiecePairs.push([CORNERS,7]);
    MOVES[10].PiecePairs.push([CORNERS,6]);
    MOVES[10].Permutation = [3,0,1,2];

    MOVES[11] = new Move();
    MOVES[11].Axis = [0,0,1];
    MOVES[11].EndAngle = -90.0;
    MOVES[11].PiecePairs.push([CORNERS,4]);
    MOVES[11].PiecePairs.push([CORNERS,5]);
    MOVES[11].PiecePairs.push([CORNERS,7]);
    MOVES[11].PiecePairs.push([CORNERS,6]);
    MOVES[11].Permutation = [1,2,3,0];

    MOVES[10].Reverse = MOVES[11];
    MOVES[11].Reverse = MOVES[10];
}

function DrawPieces(program) {
    CORNERS.Draw(program);
}

function PickPiece (newX, newY,camera) {
    var piece = CORNERS.PickPiece(newX,newY,camera);
    if (piece != null) {
	return [CORNERS, piece];
    }
    return null;
}
