import { PostToFacebookPage } from "./Facebook.js";
import { publishPostOnInstagram } from "./Instagram.js";
import { publishPostOnThreads } from "./Threads.js";
import { postTweetWithImage } from "./X.js";

export const PostOnMedia = async (message, image) => {
  await PostToFacebookPage(message, image);
  await publishPostOnInstagram(message, image);
  await publishPostOnThreads(message, image);
  await postTweetWithImage(message, image);
};
