

function PieceSet() {
    this.Points = [];
    this.OutTriangles = [];
    this.InTriangles = [];
    this.TextureCoords = [];
    this.PointBuffer;
    this.TriangleBuffer;
    this.TextureCoordBuffer;
    this.Pieces = [];
};

PieceSet.prototype.AddPoint = function (p0, p1, p2, t0, t1) {
    this.Points.push(p0);
    this.Points.push(p1);
    this.Points.push(p2);
    this.TextureCoords.push(t0);
    this.TextureCoords.push(t1);
    return (this.TextureCoords.length / 2)-1;
}


PieceSet.prototype.AddInTriangle = function (id0, id1, id2) {
    this.InTriangles.push(id0);
    this.InTriangles.push(id1);
    this.InTriangles.push(id2);
}

PieceSet.prototype.AddOutTriangle = function (id0, id1, id2) {
    this.OutTriangles.push(id0);
    this.OutTriangles.push(id1);
    this.OutTriangles.push(id2);
}

PieceSet.prototype.InitBuffers = function () {
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

PieceSet.prototype.Draw = function (program) {
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

// There should be only one face that intersects.
// We only match front faces.
PieceSet.prototype.PickPiece = function (x0, y0, camera) {
    var found = false;
    var pickedPiece = null;
    var pickedPieceIdx = -1;
    //global
    triangleVertices = [];
    // Convert to view coordinates.
    x0 = (2.0* x0 / camera.ViewportWidth) - 1.0;
    y0 = 1.0 - (2.0* y0 / camera.ViewportWidth);
    // Loop through the pieces
    for (var i = 0; i < this.Pieces.length && ! found; ++i) {
	var piece = this.Pieces[i];
	// Loop through the visible triangles.
        for (var j = 0; j < this.OutTriangles.length && ! found; ++j) {
            // Get the points for this triangle.
	    var pId0 = 3*this.OutTriangles[j*3];
	    var pId1 = 3*this.OutTriangles[j*3+1];
	    var pId2 = 3*this.OutTriangles[j*3+2];
	    var p0=[this.Points[pId0],this.Points[pId0+1],
                    this.Points[pId0+2],1];
	    var p1=[this.Points[pId1],this.Points[pId1+1],
                    this.Points[pId1+2],1];
	    var p2=[this.Points[pId2],this.Points[pId2+1],
                    this.Points[pId2+2],1];
            // Convert to piece coordinates
	    mat4.multiplyVec4(piece.Matrix,p0);
            mat4.multiplyVec4(piece.Matrix,p1);
            mat4.multiplyVec4(piece.Matrix,p2);
	    //Convert to view coordinates
            var v0 = [];
            var v1 = [];
            var v2 = [];
	    mat4.multiplyVec4(camera.Matrix,p0,v0);
	    mat4.multiplyVec4(camera.Matrix,p1,v1);
	    mat4.multiplyVec4(camera.Matrix,p2,v2);
	    // Get rid of homogenous coordinate.
	    for (var k = 0; k < 3; ++k) {
		v0[k] /= v0[3];
		v1[k] /= v1[3];
		v2[k] /= v2[3];
	    }
	    // See if the point is in the triangle.
	    // Only worry about the front face / right handed loop.
            if (CheckPointToEdge(x0,y0,v0,v1) &&
		CheckPointToEdge(x0,y0,v1,v2) &&
		CheckPointToEdge(x0,y0,v2,v0)) {
		// This face intersects.
		found = true;
		pickedPiece = piece;
		pickedPieceIdx = i;
	        // For debugging
                triangleVertices.push(p0[0]*1.001);
	        triangleVertices.push(p0[1]*1.001);
	        triangleVertices.push(p0[2]*1.001);
	        triangleVertices.push(p1[0]*1.001);
	        triangleVertices.push(p1[1]*1.001);
	        triangleVertices.push(p1[2]*1.001);
	        triangleVertices.push(p2[0]*1.001);
	        triangleVertices.push(p2[1]*1.001);
	        triangleVertices.push(p2[2]*1.001);
	    }
	}
    }

    return pickedPiece;
}


