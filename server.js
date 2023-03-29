import express from "express";
import mongoose from "mongoose";
import Data from "./data.js";
import TiktokVideos from "./dataModel.js";
import Cors from "cors";

//app confog
const app = express();
const port = 8000;

// middlewares
app.use(express.json());
app.use(express());
app.use(Cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Headers", "*"),
    next();
});

// db config
const connection_url =
  "mongodb+srv://jitavisaha2997:FBFKAaCHyGEFeD8R@cluster0.lj8udlu.mongodb.net/tiktokDB?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", () => {
  console.log("Its not connected");
});
db.once("open", function () {
  console.log("Connected successfully to the batabase");
});

// api endpoint
app.get("/", (req, res) => res.status(200).send("hey mern"));

app.get("/v1/posts", (req, res) => res.status(200).send(Data));

app.post("/v2/posts", (req, res) => {
  const dbVideos = req.body;
  TiktokVideos.create(dbVideos)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/v2/posts", async (req, res) => {
  const videosInfo = await TiktokVideos.find({});

  try {
    res.status(200).send(videosInfo);
  } catch (error) {
    res.status(500).send(error);
  }
});

//listen
app.listen(port, () => console.log(`App is listen ${port}`));
