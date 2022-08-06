
function Camera (viewportWidth, viewportHeight) {
    this.ViewPlaneNormal = [-1,-1,2];
    this.Up = [1,1,1];
    this.Right = [1,-1,0];

    this.Elevation = 0;
    this.Rotation = 0;
    this.Matrix = mat4.create();
    this.ViewportWidth = viewportWidth;
    this.ViewportHeight = viewportHeight;
    this.Height = 4;
    this.ComputeMatrix();

    this.AnimateElevationAmplitude = 50.0;
    this.Animate = true;
}


Camera.prototype.SetRotation = function (theta) {
    this.Rotation = theta;
    this.ComputeMatrix();
}

Camera.prototype.SetElevation = function (theta) {
    this.Elevation = theta;
    this.ComputeMatrix();
}

Camera.prototype.GetHeight = function () {
    return this.Height;
}

Camera.prototype.GetWidth = function () {
    return this.Height * this.ViewportWidth / this.ViewportHeight;
}

Camera.prototype.ComputeMatrix = function () {
    // Use cross product to compute a right vector.
    var vpn = [];
    var up = [];
    var right = [];
    vec3.normalize(this.ViewPlaneNormal, vpn);
    vec3.normalize(this.Up, up);
    vec3.normalize(this.Right, right);
    var matrix = mat4.create();
    mat4.identity(matrix);
    RotateMatrix(matrix, up[0],up[1],up[2], this.Rotation);
    RotateMatrix(matrix, right[0],right[1],right[2], this.Elevation); 
    // Apply the rotation matrix to the basis.
    mat4.multiplyVec3(matrix,up);
    mat4.multiplyVec3(matrix,right);
    mat4.multiplyVec3(matrix,vpn);

    mat4.identity(this.Matrix);
    this.Matrix[0] = right[0];
    this.Matrix[4] = right[1];
    this.Matrix[8] = right[2];
    this.Matrix[1] = up[0];
    this.Matrix[5] = up[1];
    this.Matrix[9] = up[2];
    // Funny.  z depth buffer is positive into the image.
    // This is a left handed coordinate system.
    this.Matrix[2] = -vpn[0];
    this.Matrix[6] = -vpn[1];
    this.Matrix[10] = -vpn[2];
    this.Matrix[15] = this.GetHeight() * 0.8;
    // Perspective.
    var k = 0.1;
    this.Matrix[3] += k*this.Matrix[2];
    this.Matrix[7] += k*this.Matrix[6];
    this.Matrix[11] += k*this.Matrix[10];
    this.Matrix[15] += k*this.Matrix[14];
}


