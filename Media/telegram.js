import * as dotenv from "dotenv";
dotenv.config();
const token = process.env.TELEGRAM_TOKEN;
const channelId = process.env.TELEGRAM_CHANNEL;
// // الدالة لإرسال رسالة إلى القناة
export const sendMessage = async (message) => {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: channelId,
      text: message,
    }),
  });

  const data = await response.json();
  if (data.ok) {
    console.log("تم إرسال الرسالة بنجاح");
  } else {
    console.log("فشل في إرسال الرسالة:", data.description);
  }
};

// الدالة لإرسال رسالة نصية مع صورة من رابط URL
export const sendMessageWithPhoto = async (message, photoUrl) => {
  const url = `https://api.telegram.org/bot${token}/sendPhoto`;
  console.log(token, channelId);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: channelId,
        caption: message, // النص المرفق بالصورة
        photo: photoUrl, // الرابط المباشر للصورة
      }),
    });

    const data = await response.json();
    if (data.ok) {
      console.log("تم إرسال الرسالة والصورة بنجاح");
    } else {
      console.log("فشل في إرسال الرسالة والصورة:", data.description);
    }
  } catch (error) {
    console.log("حدث خطأ أثناء إرسال الطلب:", error);
  }
};
