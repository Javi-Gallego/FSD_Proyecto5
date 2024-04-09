import { Router } from "express";
import authRoutes from "../entities/auth/auth.routes.js";
import userRoutes from "../entities/user/user.routes.js";
import postRoutes from "../entities/post/post.routes.js";
import multer from "multer";
import { saveImage, saveImagePost } from "../utils/saveImage.js";

const upload = multer({ dest: "uploads/profile/" });
const uploadPost = multer({ dest: "uploads/posts/" });
const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.post("/upload", upload.single("photo"), (req, res) => {
  const path = saveImage(req.file, req.body.username);
  res.send({
    message: "File uploaded succesfully",
    success: true,
    data: path,
  });
});
router.post("/uploadpost", uploadPost.single("image"), (req, res) => {
  const path = saveImagePost(req.file);
  res.send({
    message: "File uploaded succesfully",
    success: true,
    data: path,
  });
});

export default router;
