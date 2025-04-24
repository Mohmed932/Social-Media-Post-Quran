import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { hadithDailyPost } from "./utitly/hadith.js";
import { scheduleDailyPost } from "./utitly/quran.js";

const app = express();
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// تمكين CORS
app.use(cors());

// مجلد الصور
const imagesPath = path.resolve(__dirname, "quran_image");
app.use("/quran_image", express.static(imagesPath));

// API لإرسال صورة معينة
app.get("/quran_image/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(imagesPath, filename);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: "File not found" });
    }
  });
});

// رسالة ترحيبية
app.get("/", (req, res) => {
  return res.json({ message: "this is API for Quran images" });
});

scheduleDailyPost();
hadithDailyPost();

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
