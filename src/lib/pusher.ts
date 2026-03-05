import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

// export const pusherClient = new PusherClient(
//   process.env.NEXT_PUBLIC_PUSHER_KEY!,
//   { cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER! },
// );

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY!,
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    // ✅ เพิ่มบรรทัดนี้เข้าไป เพื่อใช้ยืนยันตัวตน (Authentication)
    authEndpoint: "/api/pusher/auth",
  },
);
