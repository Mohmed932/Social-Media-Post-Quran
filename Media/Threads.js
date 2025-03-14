import * as dotenv from "dotenv";
dotenv.config();
const AccessToken = process.env.ACCESS_TOKEN_THREADS;
const ThreadId = process.env.THREADS_ID;

const containerId = async (AccessToken, ThreadId, message, image) => {
  const url = `https://graph.threads.net/v1.0/${ThreadId}/threads?media_type=IMAGE&image_url=${image}&text=${message}&access_token=${AccessToken}`;
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

export const publishPostOnThreads = async (message, image) => {
  try {
    const id = await containerId(AccessToken, ThreadId, message, image);
    const req = await fetch(
      `https://graph.threads.net/v1.0/${ThreadId}/threads_publish?creation_id=${id}&access_token=${AccessToken}`,
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
