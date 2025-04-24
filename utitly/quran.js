import { PostOnMedia } from "../Media/Post.js";
import schedule from "node-schedule";

let numberOfPages = 13;

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
  } else if (numberOfPages > 604) {
    numberOfPages = 0;
  }
};

export const scheduleDailyPost = () => {
  // جدولة التنفيذ يوميًا الساعة 9 صباحًا
  schedule.scheduleJob("0 9 * * *", () => {
    publishDaily();
  });

  console.log("✅ تم جدولة النشر اليومي الساعة 9 صباحًا.");
};
