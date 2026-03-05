// "use client";

// import { pusherClient } from "@/lib/pusher";
// import { PatientInput } from "@/lib/validations";
// import LiveMonitorCard from "./LiveMonitorCard";
// import HistoryTable from "./HistoryTable";
// import { useEffect, useState } from "react";

// interface PusherPayload {
//   data: Partial<PatientInput>;
//   status: "typing" | "submitted" | "inactive";
//   timestamp: string;
// }

// export default function StaffDashboard() {
//   const [patientData, setPatientData] = useState<Partial<PatientInput> | null>(
//     null,
//   );
//   const [status, setStatus] = useState<"typing" | "submitted" | "inactive">(
//     "inactive",
//   );
//   const [patientHistory, setPatientHistory] = useState<Partial<PatientInput>[]>(
//     [],
//   );

//   // ✅ 2. ดึงข้อมูลจาก LocalStorage ตอนที่หน้าเว็บมาแสดงบน Browser แล้ว
//   useEffect(() => {
//     const savedData = localStorage.getItem("patientHistory");
//     if (savedData) {
//       setPatientHistory(JSON.parse(savedData));
//     }
//   }, []);

//   //   useEffect(() => {
//   //     setIsMounted(true);
//   //   }, []);

//   useEffect(() => {
//     const channel = pusherClient.subscribe("private-patient-data");

//     channel.bind("update", (incoming: PusherPayload) => {
//       setPatientData(incoming.data);
//       setStatus(incoming.status);

//       if (incoming.status === "typing") {
//         const timer = setTimeout(() => setStatus("inactive"), 5000);
//         return () => clearTimeout(timer);
//       }

//       if (incoming.status === "submitted") {
//         setPatientHistory((prev) => {
//           const updatedHistory = [incoming.data, ...prev];
//           localStorage.setItem(
//             "patientHistory",
//             JSON.stringify(updatedHistory),
//           );
//           return updatedHistory;
//         });
//       }
//     });

//     return () => {
//       pusherClient.unsubscribe("patient-data");
//     };
//   }, []);

//   const clearHistory = () => {
//     if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบประวัติทั้งหมด?")) {
//       localStorage.removeItem("patientHistory");
//       setPatientHistory([]);
//     }
//   };

//   return (
//     <>
//       <LiveMonitorCard patientData={patientData} status={status} />
//       <HistoryTable history={patientHistory} onClear={clearHistory} />
//     </>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { pusherClient } from "@/lib/pusher";
// import { PatientInput } from "@/lib/validations";
// import LiveMonitorCard from "./LiveMonitorCard";
// import HistoryTable from "./HistoryTable";

// // ✅ กำหนด Interface แทนการใช้ any เพื่อแก้ปัญหา Linter
// interface PusherPayload {
//   data: Partial<PatientInput>;
//   status: "typing" | "submitted" | "inactive";
//   timestamp: string;
// }

// export default function StaffDashboard() {
//   const [patientData, setPatientData] = useState<Partial<PatientInput> | null>(
//     null,
//   );
//   const [status, setStatus] = useState<"typing" | "submitted" | "inactive">(
//     "inactive",
//   );
//   const [patientHistory, setPatientHistory] = useState<Partial<PatientInput>[]>(
//     [],
//   );

//   // ✅ แก้ไขปัญหา Cascading Renders ด้วยการใช้ setTimeout
//   useEffect(() => {
//     const savedData = localStorage.getItem("patientHistory");
//     if (savedData) {
//       const timer = setTimeout(() => {
//         setPatientHistory(JSON.parse(savedData));
//       }, 0);
//       return () => clearTimeout(timer); // Cleanup เมื่อ component unmount
//     }
//   }, []);

//   useEffect(() => {
//     const channel = pusherClient.subscribe("private-patient-data");

//     // ✅ ใช้ Type PusherPayload แทน any
//     channel.bind("update", (incoming: PusherPayload) => {
//       setPatientData(incoming.data);
//       setStatus(incoming.status);

//       if (incoming.status === "typing") {
//         const timer = setTimeout(() => setStatus("inactive"), 5000);
//         return () => clearTimeout(timer);
//       }

//       if (incoming.status === "submitted") {
//         setPatientHistory((prev) => {
//           const updatedHistory = [incoming.data, ...prev];
//           localStorage.setItem(
//             "patientHistory",
//             JSON.stringify(updatedHistory),
//           );
//           return updatedHistory;
//         });
//       }
//     });

//     return () => {
//       pusherClient.unsubscribe("private-patient-data");
//     };
//   }, []);

//   const clearHistory = () => {
//     if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบประวัติทั้งหมด?")) {
//       localStorage.removeItem("patientHistory");
//       setPatientHistory([]);
//     }
//   };

//   return (
//     <>
//       <LiveMonitorCard patientData={patientData} status={status} />
//       <HistoryTable history={patientHistory} onClear={clearHistory} />
//     </>
//   );
// }

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
