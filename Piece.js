function RotateMatrix(m, x, y, z, theta) {   

    // convert to radians
    var angle = theta * 3.1415926535898 / 180.0;
    // Do we need to normalize the axis of rotation?
    
    // make a normalized quaternion
    var w = Math.cos(0.5*angle);
    var f = Math.sin(0.5*angle)/Math.sqrt(x*x+y*y+z*z);
    x *= f;
    y *= f;
    z *= f;
    
    // convert the quaternion to a matrix
    var ww = w*w;
    var wx = w*x;
    var wy = w*y;
    var wz = w*z;
    
    var xx = x*x;
    var yy = y*y;
    var zz = z*z;
    
    var xy = x*y;
    var xz = x*z;
    var yz = y*z;
    
    var s = ww - xx - yy - zz;

    var rotMat = mat4.create();
    mat4.identity(rotMat);
    rotMat[0] = xx*2 + s;     //0,0
    rotMat[1] = (xy + wz)*2;  //1,0
    rotMat[2] = (xz - wy)*2;  //2,0
    
    rotMat[4] = (xy - wz)*2;  //0,1
    rotMat[5] = yy*2 + s;     //1,1
    rotMat[6] = (yz + wx)*2;  //2,1
    
    rotMat[8] = (xz + wy)*2;  //0,2
    rotMat[9] = (yz - wx)*2;  //1,2
    rotMat[10] = zz*2 + s;    //2,2

    mat4.multiply(m, rotMat, m);
}


function Piece(imageSrc, cellBuffer) {
    this.Matrix = mat4.create();
    mat4.identity(this.Matrix);
    this.Texture = null;
    this.StartLoad(imageSrc);
    // Really only need the number of cells in the buffer.
    this.CellBuffer = cellBuffer;
    this.Move = null;
};


// This starts the loading of the tile.
// Loading is asynchronous, so the tile will not 
// immediately change its state.
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
    return function () {otherThis.handleLoadedTexture();}
}

Piece.prototype.handleLoadedTexture = function () {
    var texture = this.Texture;
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.Image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D); 
    gl.bindTexture(gl.TEXTURE_2D, null);
    this.Loaded = true;
}

Piece.prototype.Rotate = function (x,y,z, d) {
    var rotate = mat4.create();
    mat4.identity(rotate);
    RotateMatrix(rotate, x, y, z, d);   
    mat4.multiply(this.Matrix,rotate,this.Matrix);
}

Piece.prototype.Reflect = function (x,y,z) {
    var reflect = mat4.create();
    mat4.identity(reflect);
    reflect[0] = x;
    reflect[5] = y;
    reflect[10] = z;
    mat4.multiply(this.Matrix,reflect,this.Matrix);
}

Piece.prototype.Translate = function (x,y,z) {
    var reflect = mat4.create();
    mat4.identity(reflect);
    reflect[12] = x;
    reflect[13] = y;
    reflect[14] = z;
    mat4.multiply(this.Matrix,reflect,this.Matrix);
}

Piece.prototype.RotateZ = function (d) {
    var rotate = mat4.create();
    mat4.identity(rotate);
    rotate[0] = 0;
    rotate[1] = d;
    rotate[4] = -d;
    rotate[5] = 0;
    mat4.multiply(this.Matrix,rotate,this.Matrix);
}

Piece.prototype.RotateY = function (d) {
    var rotate = mat4.create();
    mat4.identity(rotate);
    rotate[0] = 0;
    rotate[2] = d;
    rotate[8] = -d;
    rotate[10] = 0;
    mat4.multiply(this.Matrix,rotate,this.Matrix);
}

Piece.prototype.RotateX = function (d) {
    var rotate = mat4.create();
    mat4.identity(rotate);
    rotate[5] = 0;
    rotate[6] = d;
    rotate[9] = -d;
    rotate[10] = 0;
    mat4.multiply(this.Matrix,rotate,this.Matrix);
}

Piece.prototype.Draw = function (program, numTriangles) {
    if ( ! this.Loaded ) {
	return;
    }

    // Texture
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.Texture);
    gl.uniform1i(program.samplerUniform, 0);
    // Matrix that tranforms the vertex p
    if (this.Move) {
	var m = mat4.create();
	mat4.multiply(this.Move.Matrix,this.Matrix, m);
	gl.uniformMatrix4fv(program.mvMatrixUniform, false, m);
    } else {
	gl.uniformMatrix4fv(program.mvMatrixUniform, false, this.Matrix);
    }
    gl.drawElements(gl.TRIANGLES, numTriangles, gl.UNSIGNED_SHORT, 0);
};

function CheckPointToEdge(x0,y0,p0,p1) {
    var nx = (p0[1]-p1[1]);
    var ny = (p1[0]-p0[0]);
    var vx = x0-p0[0];
    var vy = y0-p0[1];
    return (nx*vx + ny*vy > 0.0);
}


