import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs/promises";
import dayjs from "dayjs";
import schedule from "node-schedule";
import { PostHadithsOnMedia } from "../Media/Post.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const parentDir = path.dirname(__dirname);

const hadithDir = path.join(parentDir, "hadith");
const progressPath = path.join(parentDir, "progress.json");

const hadithFiles = [
  { name: "abudawud", postAt: 10 },
  { name: "ahmed", postAt: 11 },
  { name: "aladab_almufrad", postAt: 12 },
  { name: "bukhari", postAt: 1 },
  { name: "bulugh_almaram", postAt: 2 },
  { name: "darimi", postAt: 3 },
  { name: "ibnmajah", postAt: 4 },
  { name: "malik", postAt: 5 },
  { name: "mishkat_almasabih", postAt: 6 },
  { name: "muslim", postAt: 7 },
  { name: "nasai", postAt: 8 },
  { name: "nawawi40", postAt: 9 },
  { name: "qudsi40", postAt: 10 },
  { name: "riyad_assalihin", postAt: 11 },
  { name: "shahwaliullah40", postAt: 12 },
  { name: "shamail_muhammadiyah", postAt: 1 },
  { name: "tirmidhi", postAt: 2 },
];

const readFiles = async (name) => {
  const filePath = path.join(hadithDir, `${name}.json`);
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const loadProgress = async () => {
  try {
    const data = await fs.readFile(progressPath, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
};

const saveProgress = async (progress) => {
  await fs.writeFile(progressPath, JSON.stringify(progress, null, 2));
};

export const hadithDailyPost = () => {
  schedule.scheduleJob("0 * * * *", async () => {
    console.log(`⏰ بدء التشغيل في ${dayjs().format("HH:mm")}`);

    const nowHour = dayjs().hour();
    const progress = await loadProgress();

    for (const item of hadithFiles) {
      if (item.postAt !== nowHour) continue;

      const name = item.name;
      const data = await readFiles(name);
      const hadithNumber = progress[name] ?? 0;

      if (hadithNumber >= data.hadiths.length) {
        console.log(`✅ تم الانتهاء من جميع الأحاديث في ${name}`);
        progress[name] = 0;
        continue;
      }

      const hadithText = data.hadiths[hadithNumber].arabic;
      PostHadithsOnMedia(hadithText); // فعّل إذا جاهزة

      progress[name] = hadithNumber + 1;
    }

    await saveProgress(progress);
  });
};
