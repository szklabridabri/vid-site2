const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const upload = multer({ dest: "uploads/" });
const dataFile = "data.json";

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.post("/upload", upload.single("video"), (req, res) => {
  const title = req.body.title;
  const file = req.file;

  const ext = path.extname(file.originalname);
  const newPath = path.join("uploads", file.filename + ext);
  fs.renameSync(file.path, newPath);

  const videos = fs.existsSync(dataFile)
    ? JSON.parse(fs.readFileSync(dataFile))
    : [];

  videos.push({ title, path: "/" + newPath });
  fs.writeFileSync(dataFile, JSON.stringify(videos, null, 2));

  res.sendStatus(200);
});

app.get("/videos", (req, res) => {
  const videos = fs.existsSync(dataFile)
    ? JSON.parse(fs.readFileSync(dataFile))
    : [];
  res.json(videos);
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
