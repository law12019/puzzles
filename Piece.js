// These rotation ars are not good enough. Maybe axis and angle? Is one enough?
// Angles: Euler angles in degrees to rotate model to first state. order is z,y,x.
// Rotate is fpr rotation around the axis of symmetry (first)
function Piece(imageSrc, model, offset, angles=null, rotate=0) {
  this.Matricies = [];
  // The rest is for animation and visualization.
  this.Texture = null;
  this.Loaded = false;  
  if (imageSrc != null) {
    this.StartLoad(imageSrc);
  }

  // I am separating matrix from offset because offset has to be applied after rotation
  // and piece rotation state can be modified in many functions.
  // Also, offset messes up the rotation of axes (symmetry and rotation).
  // However, offset is applied to Matricies in UpdateMatricies.
  this.Offset = offset;
  this.Matrix = mat4.create();
  mat4.identity(this.Matrix);

  // Legacy
  // Two ways of setting the matrix that proved not to be general enough.
  if (angles != null) {
    RotateMatrix(this.Matrix, 1,0,0, angles[0]);
    RotateMatrix(this.Matrix, 0,1,0, angles[1]);
    RotateMatrix(this.Matrix, 0,0,1, angles[2]);
  }
  if (rotate != 0) {
    var axis = model.Axis;
    RotateMatrix(this.Matrix, axis[0], axis[1], axis[2], rotate);
  }

  // Temporary extra matrix to interpolate moves.
  this.AnimationMatrix = mat4.create();
  this.Model = model;
}

Piece.prototype.UpdateMatricies = function() {
  var sym_axis = Array(3);
  mat4.multiplyVec3(this.Matrix, this.Model.Axis, sym_axis);

  // Matrix options for this piece.
  // This makes assumptions about the puzzle as a regular polyhedron.
  var matrix = mat4.create(this.Matrix);
  this.Matricies = [matrix];
  matrix[12] = this.Offset[0];
  matrix[13] = this.Offset[1];
  matrix[14] = this.Offset[2];
  var sym_angle = 360 / this.Model.SymCount;
  for (var idx = 1; idx < this.Model.SymCount; ++idx) {
    matrix = mat4.create(matrix);
    RotateMatrix2(matrix, sym_axis[0], sym_axis[1], sym_axis[2], sym_angle);   
    matrix[12] = this.Offset[0];
    matrix[13] = this.Offset[1];
    matrix[14] = this.Offset[2];
    this.Matricies.push(matrix);
  }
};


// This starts the loading of the texture image..
// Loading is asynchronous.
Piece.prototype.StartLoad = function (imageSrc) {
    if (this.Texture != null) {
	return;
    }
    this.Texture = gl.createTexture();
    this.Image = new Image();
    this.Image.onload = GetLoadTextureFunction(this); 
    // This starts the loading.
    this.Image.src = imageSrc;
    this.Loaded = false;
};


function GetLoadTextureFunction (otherThis) {
  return function () {otherThis.HandleLoadedTexture();}
}

Piece.prototype.HandleLoadedTexture = function () {
  var texture = this.Texture;
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.Image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D); 
  gl.bindTexture(gl.TEXTURE_2D, null);
  this.Loaded = true;
  eventuallyRender();
}

Piece.prototype.Rotate = function (x,y,z, d) {
  var rotate = mat4.create();
  mat4.identity(rotate);
  RotateMatrix2(rotate, x, y, z, d);   
  mat4.multiply(this.Matrix, rotate, this.Matrix);
}

Piece.prototype.Reflect = function (x,y,z) {
  var reflect = mat4.create();
  mat4.identity(reflect);
  reflect[0] = x;
  reflect[5] = y;
  reflect[10] = z;
  mat4.multiply(this.Matrix,reflect,this.Matrix);
}

// Legacy
//Piece.prototype.Translate = function (x,y,z) {
//  var trans = mat4.create();
//  mat4.identity(trans);
//  trans[12] = x;
//  trans[13] = y;
//  trans[14] = z;
//  mat4.multiply(trans,this.Matrix,this.Matrix);
//  for (idx = 0; idx < this.Matricies.length; ++idx) {
//    mat4.multiply(trans, this.Matricies[idx], this.Matricies[idx]);
//  }
//}

Piece.prototype.RotateZ = function (d) {
  // d is -1 or 1. This Rotates by 90 degrees.
  var rotate = mat4.create();
  mat4.identity(rotate);
  rotate[0] = 0;
  rotate[1] = d;
  rotate[4] = -d;
  rotate[5] = 0;
  mat4.multiply(this.Matrix,rotate,this.Matrix);
}

Piece.prototype.RotateY = function (d) {
  // d is -1 or 1. This Rotates by 90 degrees.
  var rotate = mat4.create();
  mat4.identity(rotate);
  rotate[0] = 0;
  rotate[2] = d;
  rotate[8] = -d;
  rotate[10] = 0;
  mat4.multiply(this.Matrix,rotate,this.Matrix);
}

Piece.prototype.RotateX = function (d) {
  // d is -1 or 1. This Rotates by 90 degrees.
  var rotate = mat4.create();
  mat4.identity(rotate);
  rotate[5] = 0;
  rotate[6] = d;
  rotate[9] = -d;
  rotate[10] = 0;
  mat4.multiply(this.Matrix,rotate,this.Matrix);
}

Piece.prototype.Draw = function (program, matrix) {
  if ( ! this.Loaded ) {
    return;
  }

  // These are the same for every piece.
  gl.bindBuffer(gl.ARRAY_BUFFER, this.Model.PointBuffer);
  gl.vertexAttribPointer(program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  // Texture coordinates
  gl.bindBuffer(gl.ARRAY_BUFFER, this.Model.TextureCoordBuffer);
  gl.vertexAttribPointer(program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
  // Cell Connectivity
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.Model.TriangleBuffer);
  // Texture image
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, this.Texture);
  gl.uniform1i(program.samplerUniform, 0);
  gl.uniformMatrix4fv(program.mvMatrixUniform, false, matrix);
  gl.drawElements(gl.TRIANGLES, this.Model.NumCells*3, gl.UNSIGNED_SHORT, 0);
};


function CheckPointToEdge(x0,y0,p0,p1) {
    var nx = (p0[1]-p1[1]);
    var ny = (p1[0]-p0[0]);
    var vx = x0-p0[0];
    var vy = y0-p0[1];
    return (nx*vx + ny*vy > 0.0);
}


