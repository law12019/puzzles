
// Axis is the axis of rotation to compute possible state matricies.
// sym_count is the possible number of states. This assume states
// are distributed evenly around 360 axis rotation.
function PieceModel(axis, sym_count) {
  // Static ivars
  this.Axis = axis;
  this.SymCount = sym_count;
  this.Points = [];
  this.OutTriangles = [];
  this.InTriangles = [];
  this.TextureCoords = [];
  this.PointBuffer;
  this.TriangleBuffer;
  this.TextureCoordBuffer;
}


PieceModel.prototype.AddPoint = function (p0, p1, p2, t0, t1) {
    this.Points.push(p0);
    this.Points.push(p1);
    this.Points.push(p2);
    this.TextureCoords.push(t0);
    this.TextureCoords.push(t1);
    return (this.TextureCoords.length / 2)-1;
}


PieceModel.prototype.AddInTriangle = function (id0, id1, id2) {
    this.InTriangles.push(id0);
    this.InTriangles.push(id1);
    this.InTriangles.push(id2);
}

PieceModel.prototype.AddOutTriangle = function (id0, id1, id2) {
    this.OutTriangles.push(id0);
    this.OutTriangles.push(id1);
    this.OutTriangles.push(id2);
}

PieceModel.prototype.InitBuffers = function () {
    this.TextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.TextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.TextureCoords), gl.STATIC_DRAW);
    this.NumPoints = this.TextureCoords.length / 2;

    this.PointBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.PointBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.Points), gl.STATIC_DRAW);
 
    var cells = [];
    // until we find a concatenate method.
    for (var i = 0; i < this.OutTriangles.length; ++i) {
      cells.push(this.OutTriangles[i]);
    }
    for (var i = 0; i < this.InTriangles.length; ++i) {
      cells.push(this.InTriangles[i]);
    }
    this.TriangleBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.TriangleBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cells), gl.STATIC_DRAW);
    this.NumCells = cells.length / 3;
}

PieceModel.prototype.Draw = function (program) {
    // These are the same for every piece.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.PointBuffer);
    gl.vertexAttribPointer(program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    // Texture coordinates
    gl.bindBuffer(gl.ARRAY_BUFFER, this.TextureCoordBuffer);
    gl.vertexAttribPointer(program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    // Cell Connectivity
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.TriangleBuffer);
    for (var i = 0; i < this.Pieces.length; ++i) {
        this.Pieces[i].Draw(program, this.NumCells * 3);
    }
}

