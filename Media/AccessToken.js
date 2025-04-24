import * as dotenv from "dotenv";
dotenv.config();

export const refreshThreadToken = async () => {
  try {
    const longLivedAccessToken = process.env.ACCESS_TOKEN_THREADS;
    const url = `https://graph.threads.net/refresh_access_token?grant_type=th_refresh_token&access_token=${longLivedAccessToken}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Refreshed Token:", data);
    return data;
  } catch (error) {
    console.error("Error refreshing access token:", error.message);
  }
};
