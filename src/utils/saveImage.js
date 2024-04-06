import fs from "fs";
import path from "path";

export const saveImage = (file, name) => {
  const extension = path.extname(file.originalname);
  const newPath = `uploads/profile/${name}profilephoto${extension}`;
  fs.renameSync(file.path, newPath);
  return newPath;
};
