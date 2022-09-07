import numpy as np
import cv2
import pdb



def PreprocessCorner(img):
    img[10:264, 248:502, :] = 220;
    return img;


def ApplyMask(img, mask):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV);
    tmp = hsv[:,:,2] * (mask/255.0);
    hsv[:,:,2] = tmp.astype(np.uint8);
    return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR);


""" mask is gray input logo, dim is the divisions dimensions of the face.
(ix, iy), is the grid index.
"""
def CropMask(mask, ix, iy, grid):
    dim = mask.shape[0];
    divs = [int(idx*dim/grid) for idx in range(grid+1)];
    return cv2.resize(mask[divs[iy]:divs[iy+1], divs[ix]:divs[ix+1]], mask.shape, interpolation = cv2.INTER_AREA);
    

""" Resize a mask to apply to one half of an edge texture map. 1->top, 0->bottom """
def ResizeEdge(mask, position):
    border = 8
    mat = np.zeros((2, 3), dtype = np.float64)
    mat[0,0] = (512-(2*border))/512;
    mat[1,1] = (256-border)/512;
    mat[0,2] = border;
    if position == 0:
        mat[1,2] = mask.shape[0]*0.5;
    else:
        mat[1,2] = border;
    return cv2.warpAffine(mask, mat, (512,512), flags=cv2.INTER_LINEAR, borderValue=(255));


""" Resize a mask to apply to one half of an edge texture map. 0->LowerLeft, 1->LowerRight, 2->UpperLeft """
def ResizeCorner(mask, position):
    border = 8
    mat = np.zeros((3, 3), dtype = np.float64)
    if position == 0:
        mat[0,0] = (256-border)/512;
        mat[1,1] = (256-border)/512;
        mat[0,2] = border;
        mat[1,2] = mask.shape[0]*0.5; # translate
        mat[2,2] = 1.0;
    if position == 1:
        mat[0,0] = (256-border)/512;
        mat[1,1] = (256-border)/512;
        # translate
        mat[0,2] = mask.shape[0]*0.5; # translate
        mat[1,2] = mask.shape[0]*0.5; # translate
        mat[2,2] = 1.0;
    if position == 2:
        mat[0,0] = (256-border)/512;
        mat[1,1] = (256-border)/512;
        mat[0,2] = border;
        mat[1,2] = border;
        mat[2,2] = 1.0;
    return cv2.warpPerspective(mask, mat, (512,512), flags=cv2.INTER_LINEAR, borderValue=(255));

#def ResizeCorner(mask, position):
#    mat = np.zeros((3, 3), dtype = np.float64)
#    if position == 0:
#        mat[0,0] = 0.5;
#        mat[1,1] = 0.5;
#        mat[1,2] = mask.shape[0]*0.5; # translate
#        mat[2,2] = 1.0;
#    if position == 1:
#        mat[0,0] = 0.0;
#        mat[1,1] = 1.0;
#        mat[1,0] = -1.0;
#        # Scale(x)
#        mat[2,0] = -1.0/512.0; 
#        # translate
#        mat[0,2] = mask.shape[0];
#        mat[1,2] = mask.shape[0]; 
#        mat[2,2] = 2.0;
#    if position == 2:
#        mat[0,0] = 1.0;
#        mat[1,1] = 1.0;
#        mat[2,1] = 1.0/512.0; # Scale(y)
#        mat[1,2] = 0.0;
#        mat[2,2] = 1.0;
#    return cv2.warpPerspective(mask, mat, (512,512), flags=cv2.INTER_LINEAR, borderValue=(128));



    

logo = cv2.imread("logo.jpg", 0);
#logo = cv2.imread("test.jpg", 0);

#tmp = CropMask(logo, 2,1, 3);
#tmp = ResizeEdge(logo,0);

#logo = cv2.imread("test.jpg", 0);
#tmp = ResizeCorner(logo,0);
#cv2.imwrite("tmp0.jpg", tmp);
#logo = cv2.imread("test.jpg", 0);
#tmp = ResizeCorner(logo,1);
#cv2.imwrite("tmp1.jpg", tmp);
#logo = cv2.imread("test.jpg", 0);
#tmp = ResizeCorner(logo,2);
#cv2.imwrite("tmp2.jpg", tmp);
#pdb.set_trace();


# Centers are easy
img = cv2.imread("Center0.jpg");
mask = CropMask(logo, 1,1, 3);
img = ApplyMask(img, mask);
cv2.imwrite("Center0_logo.jpg", img);

img = cv2.imread("Center1.jpg");
mask = CropMask(logo, 1,1, 3);
img = ApplyMask(img, mask);
cv2.imwrite("Center1_logo.jpg", img);

img = cv2.imread("Center2.jpg");
mask = CropMask(logo, 1,1, 3);
img = ApplyMask(img, mask);
cv2.imwrite("Center2_logo.jpg", img);

img = cv2.imread("Center3.jpg");
mask = CropMask(logo, 1,1, 3);
img = ApplyMask(img, mask);
cv2.imwrite("Center3_logo.jpg", img);

img = cv2.imread("Center4.jpg");
mask = CropMask(logo, 1,1, 3);
img = ApplyMask(img, mask);
cv2.imwrite("Center4_logo.jpg", img);

img = cv2.imread("Center5.jpg");
mask = CropMask(logo, 1,1, 3);
img = ApplyMask(img, mask);
cv2.imwrite("Center5_logo.jpg", img);



# Edge has two masks.
img = cv2.imread("Edge0.jpg");
mask = CropMask(logo, 1,2, 3);
mask = cv2.rotate(mask, cv2.ROTATE_180);
mask = ResizeEdge(mask, 0);
img = ApplyMask(img, mask);
mask = CropMask(logo, 1,0, 3);
mask = cv2.rotate(mask, cv2.ROTATE_180);
mask = ResizeEdge(mask, 1);
img = ApplyMask(img, mask);
cv2.imwrite("Edge0_logo.jpg", img);

img = cv2.imread("Edge1.jpg");
mask = CropMask(logo, 1,0, 3);
mask = ResizeEdge(mask, 0);
img = ApplyMask(img, mask);
mask = CropMask(logo, 1,0, 3);
mask = cv2.rotate(mask, cv2.ROTATE_180);
mask = ResizeEdge(mask, 1);
img = ApplyMask(img, mask);
cv2.imwrite("Edge1_logo.jpg", img);

img = cv2.imread("Edge2.jpg");
mask = CropMask(logo, 1,2, 3);
mask = cv2.rotate(mask, cv2.ROTATE_180);
mask = ResizeEdge(mask, 0);
img = ApplyMask(img, mask);
mask = CropMask(logo, 1,2, 3);
mask = ResizeEdge(mask, 1);
img = ApplyMask(img, mask);
cv2.imwrite("Edge2_logo.jpg", img);

img = cv2.imread("Edge3.jpg");
mask = CropMask(logo, 1,2, 3);
mask = cv2.rotate(mask, cv2.ROTATE_180);
mask = ResizeEdge(mask, 0);
img = ApplyMask(img, mask);
mask = CropMask(logo, 1,0, 3);
mask = cv2.rotate(mask, cv2.ROTATE_180);
mask = ResizeEdge(mask, 1);
img = ApplyMask(img, mask);
cv2.imwrite("Edge3_logo.jpg", img);

img = cv2.imread("Edge4.jpg");
mask = CropMask(logo, 2,1, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_COUNTERCLOCKWISE);
mask = ResizeEdge(mask, 0);
img = ApplyMask(img, mask);
mask = CropMask(logo, 0,1, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_COUNTERCLOCKWISE);
mask = ResizeEdge(mask, 1);
img = ApplyMask(img, mask);
cv2.imwrite("Edge4_logo.jpg", img);

img = cv2.imread("Edge5.jpg");
mask = CropMask(logo, 2,1, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_COUNTERCLOCKWISE);
mask = ResizeEdge(mask, 0);
img = ApplyMask(img, mask);
mask = CropMask(logo, 0,1, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_COUNTERCLOCKWISE);
mask = ResizeEdge(mask, 1);
img = ApplyMask(img, mask);
cv2.imwrite("Edge5_logo.jpg", img);

img = cv2.imread("Edge6.jpg");
mask = CropMask(logo, 0,1, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_CLOCKWISE);
mask = ResizeEdge(mask, 0);
img = ApplyMask(img, mask);
mask = CropMask(logo, 2,1, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_CLOCKWISE);
mask = ResizeEdge(mask, 1);
img = ApplyMask(img, mask);
cv2.imwrite("Edge6_logo.jpg", img);

img = cv2.imread("Edge7.jpg");
mask = CropMask(logo, 0,1, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_CLOCKWISE);
mask = ResizeEdge(mask, 0);
img = ApplyMask(img, mask);
mask = CropMask(logo, 2,1, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_CLOCKWISE);
mask = ResizeEdge(mask, 1);
img = ApplyMask(img, mask);
cv2.imwrite("Edge7_logo.jpg", img);

img = cv2.imread("Edge8.jpg");
mask = CropMask(logo, 0,1, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_CLOCKWISE);
mask = ResizeEdge(mask, 0);
img = ApplyMask(img, mask);
mask = CropMask(logo, 1,0, 3);
mask = cv2.rotate(mask, cv2.ROTATE_180);
mask = ResizeEdge(mask, 1);
img = ApplyMask(img, mask);
cv2.imwrite("Edge8_logo.jpg", img);

img = cv2.imread("Edge9.jpg");
mask = CropMask(logo, 2,1, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_COUNTERCLOCKWISE);
mask = ResizeEdge(mask, 0);
img = ApplyMask(img, mask);
mask = CropMask(logo, 1,0, 3);
mask = cv2.rotate(mask, cv2.ROTATE_180);
mask = ResizeEdge(mask, 1);
img = ApplyMask(img, mask);
cv2.imwrite("Edge9_logo.jpg", img);

img = cv2.imread("Edge10.jpg");
mask = CropMask(logo, 1,2, 3);
mask = cv2.rotate(mask, cv2.ROTATE_180);
mask = ResizeEdge(mask, 0);
img = ApplyMask(img, mask);
mask = CropMask(logo, 2,1, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_CLOCKWISE);
mask = ResizeEdge(mask, 1);
img = ApplyMask(img, mask);
cv2.imwrite("Edge10_logo.jpg", img);

img = cv2.imread("Edge11.jpg");
mask = CropMask(logo, 1,2, 3);
mask = cv2.rotate(mask, cv2.ROTATE_180);
mask = ResizeEdge(mask, 0);
img = ApplyMask(img, mask);
mask = CropMask(logo, 0,1, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_COUNTERCLOCKWISE);
mask = ResizeEdge(mask, 1);
img = ApplyMask(img, mask);
cv2.imwrite("Edge11_logo.jpg", img);



# Corners
img = cv2.imread("Corner0.jpg");
img = PreprocessCorner(img);
cv2.imwrite("tmp.jpg", img);
#pdb.set_trace();


mask = CropMask(logo, 2,2, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_COUNTERCLOCKWISE);
mask = ResizeCorner(mask, 0);
img = ApplyMask(img, mask);
mask = CropMask(logo, 0,2, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_CLOCKWISE);
mask = ResizeCorner(mask, 1);
img = ApplyMask(img, mask);
mask = CropMask(logo, 2,2, 3);
mask = ResizeCorner(mask, 2);
img = ApplyMask(img, mask);
cv2.imwrite("Corner0_logo.jpg", img);

img = cv2.imread("Corner1.jpg");
img = PreprocessCorner(img);
mask = CropMask(logo, 0,2, 3);
mask = cv2.rotate(mask, cv2.ROTATE_180);
mask = ResizeCorner(mask, 0);
img = ApplyMask(img, mask);
mask = CropMask(logo, 2,2, 3);
mask = cv2.rotate(mask, cv2.ROTATE_180);
mask = ResizeCorner(mask, 1);
img = ApplyMask(img, mask);
mask = CropMask(logo, 2,0, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_CLOCKWISE);
mask = ResizeCorner(mask, 2);
img = ApplyMask(img, mask);
cv2.imwrite("Corner1_logo.jpg", img);

#mask = cv2.rotate(mask, cv2.ROTATE_90_CLOCKWISE);
#mask = cv2.rotate(mask, cv2.ROTATE_90_COUNTERCLOCKWISE);
#mask = cv2.rotate(mask, cv2.ROTATE_180);

img = cv2.imread("Corner2.jpg");
img = PreprocessCorner(img);
mask = CropMask(logo, 2,0, 3);
mask = ResizeCorner(mask, 0);
img = ApplyMask(img, mask);
mask = CropMask(logo, 0,0, 3);
mask = ResizeCorner(mask, 1);
img = ApplyMask(img, mask);
mask = CropMask(logo, 2,0, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_CLOCKWISE);
mask = ResizeCorner(mask, 2);
img = ApplyMask(img, mask);
cv2.imwrite("Corner2_logo.jpg", img);

img = cv2.imread("Corner3.jpg");
img = PreprocessCorner(img);
mask = CropMask(logo, 2,2, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_COUNTERCLOCKWISE);
mask = ResizeCorner(mask, 0);
img = ApplyMask(img, mask);
mask = CropMask(logo, 2,0, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_COUNTERCLOCKWISE);
mask = ResizeCorner(mask, 1);
img = ApplyMask(img, mask);
mask = CropMask(logo, 0,0, 3);
mask = cv2.rotate(mask, cv2.ROTATE_180);
mask = ResizeCorner(mask, 2);
img = ApplyMask(img, mask);
cv2.imwrite("Corner3_logo.jpg", img);

img = cv2.imread("Corner4.jpg");
img = PreprocessCorner(img);
mask = CropMask(logo, 0,2, 3);
mask = cv2.rotate(mask, cv2.ROTATE_180);
mask = ResizeCorner(mask, 0);
img = ApplyMask(img, mask);
mask = CropMask(logo, 0,2, 3)
mask = cv2.rotate(mask, cv2.ROTATE_90_CLOCKWISE);
mask = ResizeCorner(mask, 1);
img = ApplyMask(img, mask);
mask = CropMask(logo, 2,2, 3);
mask = ResizeCorner(mask, 2);
img = ApplyMask(img, mask);
cv2.imwrite("Corner4_logo.jpg", img);

img = cv2.imread("Corner5.jpg");
img = PreprocessCorner(img);
mask = CropMask(logo, 0,0, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_CLOCKWISE);
mask = ResizeCorner(mask, 0);
img = ApplyMask(img, mask);
mask = CropMask(logo, 0,2, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_CLOCKWISE);
mask = ResizeCorner(mask, 1);
img = ApplyMask(img, mask);
mask = CropMask(logo, 2,2, 3);
mask = ResizeCorner(mask, 2);
img = ApplyMask(img, mask);
cv2.imwrite("Corner5_logo.jpg", img);

img = cv2.imread("Corner6.jpg");
img = PreprocessCorner(img);
mask = CropMask(logo, 2,0, 3);
mask = ResizeCorner(mask, 0);
img = ApplyMask(img, mask);
mask = CropMask(logo, 0,0, 3);
mask = ResizeCorner(mask, 1);
img = ApplyMask(img, mask);
mask = CropMask(logo, 0,0, 3);
mask = cv2.rotate(mask, cv2.ROTATE_180);
mask = ResizeCorner(mask, 2);
img = ApplyMask(img, mask);
cv2.imwrite("Corner6_logo.jpg", img);

img = cv2.imread("Corner7.jpg");
img = PreprocessCorner(img);
mask = CropMask(logo, 2,0, 3);
mask = ResizeCorner(mask, 0);
img = ApplyMask(img, mask);
mask = CropMask(logo, 0,0, 3);
mask = ResizeCorner(mask, 1);
img = ApplyMask(img, mask);
mask = CropMask(logo, 0,2, 3);
mask = cv2.rotate(mask, cv2.ROTATE_90_COUNTERCLOCKWISE);
mask = ResizeCorner(mask, 2);
img = ApplyMask(img, mask);
cv2.imwrite("Corner7_logo.jpg", img);











