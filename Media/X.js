import { TwitterApi } from "twitter-api-v2";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();

const client = new TwitterApi({
  appKey: process.env.API_KEY_X,
  appSecret: process.env.API_KEY_SECRET_X,
  accessToken: process.env.API_KEY_ACCESSTOKEN_X,
  accessSecret: process.env.API_KEY_ACCESSSECRET_X,
});

const mimeTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".bmp": "image/bmp",
  ".svg": "image/svg+xml",
};

export const postTweetWithImage = async (text, imageUrl) => {
  try {
    const extension = path.extname(imageUrl).toLowerCase();
    const mediaType = mimeTypes[extension] || "image/jpeg";
    const response = await fetch(imageUrl);
    if (!response.ok)
      throw new Error(`Failed to fetch image: ${response.statusText}`);

    const arrayBuffer = await response.arrayBuffer();
    const mediaData = Buffer.from(arrayBuffer);
    const mediaId = await client.v1.uploadMedia(mediaData, { type: mediaType });

    const tweet = await client.v2.tweet(text, {
      media: { media_ids: [mediaId] },
    });

    console.log("successed post", tweet);
  } catch (error) {
    console.error("some thing wrong", error);
  }
};
