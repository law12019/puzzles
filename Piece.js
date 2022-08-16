
function Piece(imageSrc, model, offset, angles, sym_count) {
  this.Matricies = [];
  // The rest is for animation and visualization.
  this.Texture = null;
  this.Loaded = false;  
  if (imageSrc != null) {
    this.StartLoad(imageSrc);
  }

  this.Matrix = mat4.create();
  mat4.identity(this.Matrix);
  RotateMatrix(this.Matrix, 1,0,0, angles[0]);
  RotateMatrix(this.Matrix, 0,1,0, angles[1]);
  RotateMatrix(this.Matrix, 0,0,1, angles[2]);
  this.Translate(offset[0], offset[1], offset[2]);

  // Temporary extra matrix to interpolate moves.
  this.AnimationMatrix = mat4.create();

  this.Model = model;
  
  // Matrix options for this piece.
  // This makes assumptions about the puzzle as a regular polyhedron.
  var matrix = mat4.create(this.Matrix);
  this.Matricies.push(matrix);
  sym_angle = 360 / sym_count;
  for (var idx = 1; idx < sym_count; ++idx) {
    matrix = mat4.create(matrix);
    RotateMatrix2(matrix, offset[0], offset[1], offset[2], sym_angle);   
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
  RotateMatrix(rotate, x, y, z, d);   
  mat4.multiply(this.Matrix, rotate, this.Matrix);
  for (idx = 0; idx < this.Matricies.length; ++idx) {
    mat4.multiply(this.Matricies[idx], rotate, this.Matricies[idx]);
  }
}

Piece.prototype.Reflect = function (x,y,z) {
  var reflect = mat4.create();
  mat4.identity(reflect);
  reflect[0] = x;
  reflect[5] = y;
  reflect[10] = z;
  mat4.multiply(this.Matrix,reflect,this.Matrix);
  for (idx = 0; idx < this.Matricies.length; ++idx) {
    mat4.multiply(this.Matricies[idx], rotate, this.Matricies[idx]);
  }
}

Piece.prototype.Translate = function (x,y,z) {
  var trans = mat4.create();
  mat4.identity(trans);
  trans[12] = x;
  trans[13] = y;
  trans[14] = z;
  mat4.multiply(trans,this.Matrix,this.Matrix);
  for (idx = 0; idx < this.Matricies.length; ++idx) {
    mat4.multiply(this.Matricies[idx], rotate, this.Matricies[idx]);
  }
}

Piece.prototype.RotateZ = function (d) {
  // d is -1 or 1. This Rotates by 90 degrees.
  var rotate = mat4.create();
  mat4.identity(rotate);
  rotate[0] = 0;
  rotate[1] = d;
  rotate[4] = -d;
  rotate[5] = 0;
  mat4.multiply(this.Matrix,rotate,this.Matrix);
  for (idx = 0; idx < this.Matricies.length; ++idx) {
    mat4.multiply(this.Matricies[idx], rotate, this.Matricies[idx]);
  }
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
  for (idx = 0; idx < this.Matricies.length; ++idx) {
    mat4.multiply(this.Matricies[idx], rotate, this.Matricies[idx]);
  }
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
  for (idx = 0; idx < this.Matricies.length; ++idx) {
    mat4.multiply(this.Matricies[idx], rotate, this.Matricies[idx]);
  }
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


