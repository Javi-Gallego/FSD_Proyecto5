import fs from "fs";
import path from "path";

export const saveImage = (file, name) => {
  const extension = path.extname(file.originalname);
  const newPath = `uploads/profile/${name}${file.originalname}`;
  fs.renameSync(file.path, newPath);
  return newPath;
};

export const saveImagePost = (file) => {
  const extension = path.extname(file.originalname);
  const randomNum = Math.floor(Math.random() * 100000);
  const newPath = `uploads/posts/${randomNum}${file.originalname}`;
  fs.renameSync(file.path, newPath);
  return newPath;
};
