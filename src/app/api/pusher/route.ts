import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data, status } = body;

    // ยิงข้อมูลเข้า Channel 'patient-data' ด้วย Event 'update'
    // ข้อมูลนี้จะถูกส่งไปให้หน้า Staff ที่กำลัง "รอฟัง" อยู่ทันที
    await pusherServer.trigger("private-patient-data", "update", {
      data,
      status,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Data sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Pusher error:", error);
    return NextResponse.json(
      { message: "Failed to send data" },
      { status: 500 },
    );
  }
}
