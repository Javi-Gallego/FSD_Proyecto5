import Express from "express";
import router from "./routes/router.js";
import cors from "cors";
import multer from "multer";

export const app = Express();

const upload = multer({ dest: "uploads/profile/" });

app.use(cors());
//parsea el body
app.use(Express.json());

app.use("/uploads", Express.static("uploads"));
//API ROUTES

app.get("/API/healthy", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

app.use("/API", router);
