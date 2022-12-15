import express from "express";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
// import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// import routes
import userRouter from "./routes/user.js";
import productRouter from "./routes/products.js";
import orderRouter from "./routes/orders.js";

import ServerlessHttp from "serverless-http";

//server started
const app = express();
app.use(express.json());

//multer use

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    console.log(file);
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
//for uploading  sending post request

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//cors to allow connect the api to react frontend

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.set("view engine", "ejs");
app.use("/images", express.static("images"));

//For using the localhost:5000/user commands
// app.use("/user", productRoutes);
app.use("/user", userRouter);

//For using the localhost:5000/imageupload commands
// app.use("/imageupload", productRoutes);

app.get("/upload", (req, res) => {
  res.render("upload");
});
app.post("/upload", upload.single("image"), (req, res) => {
  res.send("Image Uploaded");
});

//for getting products

app.use("/products", productRouter);

//for getting and posting orders

app.use("/orders", orderRouter);

const CONNECTION_URL = process.env.API_KEY;

// Port of server
const PORT = process.env.PORT || 5000;

//Connection message from mongoose
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server has been started on ${PORT}`);
    })
  )
  .catch((error) => console.log(error.message));

module.exports.handler = ServerlessHttp(app);
