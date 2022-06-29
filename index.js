import express from "express";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// import routes
import userRouter from "./routes/user.js";
import productRouter from "./routes/products.js";
import orderRouter from "./routes/orders.js";

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

const whiteList = [
  "http://localhost:3000",
  "http://tech-ecommerce-site.netlify.app",
];
app.use(cors());
app.options("*", cors());

// {
//   //web addresses allowed
//   origin: ["http://localhost:3000", "tech-ecommerce-site.netlify.app"],
//   //for allowing this commands
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   //for allowing cookies
//   credentials: true,
// }
app.set("view engine", "ejs");
app.use("/images", express.static("images"));

//For using the localhost:5000/user commands
// app.use("/user", productRoutes);
app.use("/user", userRouter);

app.post("/createdUser", async (req, res) => {
  const user = req.body;
  console.log(user);
});

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
