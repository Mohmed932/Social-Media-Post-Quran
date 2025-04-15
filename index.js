import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { PostOnMedia } from "./Media/Post.js";

const app = express();
const PORT = 5000;
let numberOfPages = 4;

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

// دالة النشر
const publishDaily = async () => {
  if (numberOfPages <= 604) {
    const img = `https://social-media-post-quran-production.up.railway.app/quran_image/${numberOfPages}.png`;
    const message = `🌸 الورد اليومي - اليوم رقم ${numberOfPages}`;
    try {
      await PostOnMedia(message, img);
      console.log(`✅ Posted page number ${numberOfPages}`);
      numberOfPages++;
    } catch (error) {
      console.error("❌ Error posting to media:", error);
    }
  }
};

// حساب الوقت حتى الساعة 9 صباحًا
const scheduleDailyPost = () => {
  const now = new Date();
  const next9AM = new Date();

  next9AM.setHours(9, 0, 0, 0); // 9:00:00 صباحًا

  if (now >= next9AM) {
    // لو الوقت الحالي بعد 9 الصبح، نروح لبكرة
    next9AM.setDate(next9AM.getDate() + 1);
  }

  const timeUntil9AM = next9AM - now;
  console.log(`⏳ First post will be in ${Math.round(timeUntil9AM / 1000 / 60)} minutes`);

  // أول انتظار حتى 9 صباحًا
  setTimeout(() => {
    publishDaily(); // أول نشر
    setInterval(publishDaily, 1000 * 60 * 60 * 24); // ثم كل 24 ساعة
  }, timeUntil9AM);
};

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  scheduleDailyPost();
});
