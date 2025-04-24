import * as dotenv from "dotenv";
dotenv.config();

import { refreshThreadToken } from "./AccessToken.js";
import { PosthadithsToFacebookPage, PostToFacebookPage } from "./Facebook.js";
import { publishPostOnInstagram } from "./Instagram.js";
// import { publishPostOnThreads } from "./Threads.js";
import { postTextTweet, postTweetWithImage } from "./X.js";
import { sendMessage, sendMessageWithPhoto } from "./telegram.js";

export const PostOnMedia = async (message, image) => {
  await refreshThreadToken();
  await PostToFacebookPage(message, image);
  await publishPostOnInstagram(message, image);
  // await publishPostOnThreads(message, image);
  await postTweetWithImage(message, image);
  await sendMessageWithPhoto(message, image);
};

export const PostHadithsOnMedia = async (message) => {
  await PosthadithsToFacebookPage(message);
  await postTextTweet(message);
  await sendMessage(message);
};
