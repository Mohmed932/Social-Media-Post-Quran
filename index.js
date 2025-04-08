import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { PostOnMedia } from "./Media/Post.js";

const app = express();
const PORT = 5000;
let numberOfPages = 1;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// تمكين CORS
app.use(cors());

const imagesPath = path.resolve(__dirname, "quran_image");
app.use("/quran_image", express.static(imagesPath));

// API لإرسال صورة معينة عند الطلب
app.get("/quran_image/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(imagesPath, filename);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: "File not found" });
    }
  });
});

app.get("/", (req, res) => {
  return res.json({mesage:"this is api for image quran"})
});

const puplishOnMedia = async () => {
  setInterval(async () => {
    if (numberOfPages <= 604) {
      const img = `https://useful-fedora-asfourah-ce0b49ba.koyeb.app/quran_image/${numberOfPages}.png`;
      const message = `🌸 الورد اليومي - اليوم رقم ${numberOfPages}`;
      await PostOnMedia(message, img);
      numberOfPages++;
    }
  }, 1000 * 60 * 60 * 24);
};
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  puplishOnMedia();
});
