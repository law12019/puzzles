import numpy as np
import cv2

fileroot = "Center5"
grow = 512;
border = 5;
white = 128;
thin = 4;

img = cv2.imread(fileroot+".jpg");
img = cv2.resize(img, (grow,grow), interpolation = cv2.INTER_AREA);
img00 = img[thin:256+thin, thin:256+thin, :];
img00[-border:256, :, :] = white;
img00[:, -border:256, :] = white;
cv2.imwrite(fileroot+"_00.jpg", img00);

img = cv2.imread(fileroot+".jpg");
img = cv2.resize(img, (grow,grow), interpolation = cv2.INTER_AREA);
img10 = img[thin:256+thin, grow-256-thin:grow-thin, :];
img10[-border:256, :, :] = white;
img10[:, 0:border, :] = white;
cv2.imwrite(fileroot+"_10.jpg", img10);

img = cv2.imread(fileroot+".jpg");
img = cv2.resize(img, (grow,grow), interpolation = cv2.INTER_AREA);
img11 = img[grow-256-thin:grow-thin, grow-256-thin:grow-thin, :];
img11[0:border, :, :] = white;
img11[:, 0:border, :] = white;
cv2.imwrite(fileroot+"_11.jpg", img11);

img = cv2.imread(fileroot+".jpg");
img = cv2.resize(img, (grow,grow), interpolation = cv2.INTER_AREA);
img01 = img[grow-256-thin:grow-thin, thin:256+thin, :];
img01[0:border, :, :] = white;
img01[:, -border:256, :] = white;
cv2.imwrite(fileroot+"_01.jpg", img01);

