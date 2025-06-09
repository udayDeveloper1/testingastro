import axios from "axios";

export const sendNotification = async (fcmToken) => {
  try {
    const res = await axios.post("http://localhost:5000/send-notification", {
      token: fcmToken,
      title: "Hello from App A",
      body: "This is a secure push notification",
    });
  } catch (err) {
    console.error("Send error:", err);
  }
};