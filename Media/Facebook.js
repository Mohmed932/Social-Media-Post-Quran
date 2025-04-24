import * as dotenv from "dotenv";
dotenv.config();
const AccessToken = process.env.ACCESS_TOKEN;
const FacebookId = process.env.FACEBOOK_ID;
export const PostToFacebookPage = async (message, image) => {
  try {
    const url = `https://graph.facebook.com/${FacebookId}/photos?url=${image}&access_token=${AccessToken}&message=${message}`;
    const req = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const res = await req.json();
    console.log("Data:", res);
  } catch (error) {
    console.error("Error posting on Facebook Page:", error);
  }
};

export const PosthadithsToFacebookPage = async (message) => {
  try {
    const url = `https://graph.facebook.com/${FacebookId}/feed`;
    const params = new URLSearchParams({
      access_token: AccessToken,
      message: message,
    });

    const req = await fetch(`${url}?${params.toString()}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const res = await req.json();
    console.log("Data:", res);
  } catch (error) {
    console.error("Error posting on Facebook Page:", error);
  }
};
