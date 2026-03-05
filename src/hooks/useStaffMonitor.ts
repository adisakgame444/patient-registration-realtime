// src/hooks/useStaffMonitor.ts
import { useState, useEffect } from "react";
import { pusherClient } from "@/lib/pusher";
import { PatientInput } from "@/lib/validations";
import { PusherPayload, MonitorStatus } from "@/types/pusher";

export function useStaffMonitor() {
  const [patientData, setPatientData] = useState<Partial<PatientInput> | null>(
    null,
  );
  const [status, setStatus] = useState<MonitorStatus>("inactive");
  const [patientHistory, setPatientHistory] = useState<Partial<PatientInput>[]>(
    [],
  );

  // 1. โหลดประวัติจาก LocalStorage เมื่อเปิดหน้าเว็บ
  useEffect(() => {
    const savedData = localStorage.getItem("patientHistory");
    if (savedData) {
      setTimeout(() => {
        setPatientHistory(JSON.parse(savedData));
      }, 0);
    }
  }, []);

  // 2. จัดการการเชื่อมต่อ Pusher
  useEffect(() => {
    const channel = pusherClient.subscribe("private-patient-data");

    // channel.bind("update", (incoming: PusherPayload) => {
    //   setPatientData(incoming.data);
    //   setStatus(incoming.status);

    //   // ถ้ากำลังพิมพ์ ให้เปลี่ยนเป็นสถานะนิ่งหลังจากผ่านไป 5 วินาที
    //   if (incoming.status === "typing") {
    //     const timer = setTimeout(() => setStatus("inactive"), 5000);
    //     return () => clearTimeout(timer);
    //   }

    //   // ถ้าส่งข้อมูลสำเร็จ ให้บันทึกลงประวัติ
    //   if (incoming.status === "submitted") {
    //     setPatientHistory((prev) => {
    //       const updatedHistory = [incoming.data, ...prev];
    //       localStorage.setItem(
    //         "patientHistory",
    //         JSON.stringify(updatedHistory),
    //       );
    //       return updatedHistory;
    //     });
    //   }
    // });
    channel.bind("update", (incoming: PusherPayload) => {
      // 1. อัปเดตข้อมูลแบบ "กระจาย" (Spread Operator)
      // เพื่อให้ค่าใหม่ (แม้จะเป็นค่าว่าง "") เข้าไปแทนที่ค่าเดิมเฉพาะฟิลด์นั้นๆ
      setPatientData((prev) => ({
        ...(prev || {}), // เก็บข้อมูลเก่าไว้
        ...incoming.data, // เอาข้อมูลใหม่ (รวมถึงค่าว่างที่คนไข้ลบ) มาทับ
      }));

      setStatus(incoming.status);

      // 2. จัดการสถานะการพิมพ์
      if (incoming.status === "typing") {
        // แนะนำ: หากมีการพิมพ์ต่อเนื่อง ควรเคลียร์ Timer เดิมก่อน (ถ้ามี)
        // แต่สำหรับ Logic พื้นฐาน 5 วินาทีคืนค่า Inactive ก็โอเคครับ
        setTimeout(() => setStatus("inactive"), 5000);
      }

      // 3. จัดการการบันทึกประวัติ (เหมือนเดิม)
      if (incoming.status === "submitted") {
        setPatientHistory((prev) => {
          const updatedHistory = [incoming.data, ...prev];
          localStorage.setItem(
            "patientHistory",
            JSON.stringify(updatedHistory),
          );
          return updatedHistory;
        });
      }
    });

    return () => {
      pusherClient.unsubscribe("private-patient-data");
    };
  }, []);
  
  const clearHistory = () => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบประวัติทั้งหมด?")) {
      localStorage.removeItem("patientHistory");
      setPatientHistory([]);
    }
  };

  return { patientData, status, patientHistory, clearHistory };
}
