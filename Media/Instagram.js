import * as dotenv from "dotenv";
dotenv.config();
const AccessToken = process.env.ACCESS_TOKEN;
const InstagramId = process.env.INSTAGRAM_ID;

const containerId = async (message, image) => {
  const url = `https://graph.facebook.com/v22.0/${InstagramId}/media?image_url=${image}&access_token=${AccessToken}&caption=${`${message} #Asfourah`}&alt_text=${message}`;
  try {
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await req.json();
    return res.id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const publishPostOnInstagram = async (message, image) => {
  try {
    const id = await containerId(message, image);
    const req = await fetch(
      `https://graph.facebook.com/v22.0/${InstagramId}/media_publish?creation_id=${id}&access_token=${AccessToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await req.json();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
