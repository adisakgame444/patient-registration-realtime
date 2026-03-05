import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data, status } = body;

    // ✅ ตรวจสอบเบื้องต้นว่ามี data ส่งมา (แม้จะเป็นออบเจกต์ที่มีค่าว่างข้างในก็ตาม)
    if (!data) {
      return NextResponse.json(
        { message: "No data provided" },
        { status: 400 },
      );
    }

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
