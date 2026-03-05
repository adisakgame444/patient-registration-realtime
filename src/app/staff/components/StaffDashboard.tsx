"use client";

// 1. นำเข้า Hook ที่เราแยกออกมา
import { useStaffMonitor } from "@/hooks/useStaffMonitor";
import LiveMonitorCard from "./LiveMonitorCard";
import HistoryTable from "./HistoryTable";

export default function StaffDashboard() {
  // 2. เรียกใช้ Hook เพื่อดึง State และ Logic ทั้งหมดมาใช้งาน
  // ไม่ต้องมี useState หรือ useEffect ในไฟล์นี้อีกต่อไป
  const { patientData, status, patientHistory, clearHistory } =
    useStaffMonitor();

  return (
    <>
      {/* 3. ส่ง Props ไปยัง Component ลูกตามปกติ */}
      <LiveMonitorCard patientData={patientData} status={status} />
      <HistoryTable history={patientHistory} onClear={clearHistory} />
    </>
  );
}
