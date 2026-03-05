import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher"; // นำเข้า pusher ฝั่ง server ของคุณ

export async function POST(req: Request) {
  try {
    // 1. รับค่าที่ Pusher ส่งมาให้ตอนพยายาม Subscribe
    const data = await req.text();
    const params = new URLSearchParams(data);
    const socketId = params.get("socket_id");
    const channel = params.get("channel_name");

    if (!socketId || !channel) {
      return new NextResponse("Missing parameters", { status: 400 });
    }

    // 🔒 [จุดสำคัญ] ตรงนี้คือที่ที่คุณควรเช็คว่า User ล็อกอินเป็น Staff หรือยัง?
    // ตัวอย่างเช่น: 
    // const session = await getServerSession();
    // if (!session || session.role !== "STAFF") throw new Error("Unauthorized");

    // 2. ถ้าอนุญาต ให้สร้าง Token ยืนยันตัวตนส่งกลับไป
    const authResponse = pusherServer.authorizeChannel(socketId, channel);
    
    return NextResponse.json(authResponse);
  } catch (error) {
    console.error("Pusher Auth Error:", error);
    return new NextResponse("Forbidden", { status: 403 });
  }
}