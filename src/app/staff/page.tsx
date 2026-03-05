// "use client";

// import { useEffect, useState } from "react";
// import { pusherClient } from "@/lib/pusher";
// import { PatientInput } from "@/lib/validations";
// import {
//   User,
//   Phone,
//   Mail,
//   MapPin,
//   Activity,
//   CheckCircle2,
//   Clock,
// } from "lucide-react";

// // กำหนด Type ของข้อมูลที่วิ่งมาจาก Pusher ให้ชัดเจน
// interface PusherPayload {
//   data: Partial<PatientInput>;
//   status: "typing" | "submitted" | "inactive";
//   timestamp: string;
// }

// export default function StaffPage() {
//   const [patientData, setPatientData] = useState<Partial<PatientInput> | null>(
//     null,
//   );
//   const [status, setStatus] = useState<"typing" | "submitted" | "inactive">(
//     "inactive",
//   );

//   useEffect(() => {
//     // Subscribe ไปยัง channel ที่เรากำหนดไว้ใน API
//     const channel = pusherClient.subscribe("patient-data");

//     // ดักฟัง event 'update'
//     channel.bind("update", (incoming: PusherPayload) => {
//       setPatientData(incoming.data);
//       setStatus(incoming.status);

//       // ถ้าเป็นสถานะ typing ให้ตั้ง Timer 5 วินาที ถ้าไม่มีข้อมูลใหม่มาให้ถือว่า Inactive
//       if (incoming.status === "typing") {
//         const timer = setTimeout(() => setStatus("inactive"), 5000);
//         return () => clearTimeout(timer);
//       }
//     });

//     return () => {
//       pusherClient.unsubscribe("patient-data");
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-5xl mx-auto">
//         {/* Header & Status Indicator */}
//         <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//               <Activity className="text-blue-600" /> Patient Live Monitor
//             </h1>
//             <p className="text-gray-500">
//               ติดตามการกรอกข้อมูลของผู้ป่วยแบบเรียลไทม์
//             </p>
//           </div>

//           <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
//             <span className={`relative flex h-3 w-3`}>
//               {status === "typing" && (
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               )}
//               <span
//                 className={`relative inline-flex rounded-full h-3 w-3 ${
//                   status === "typing"
//                     ? "bg-green-500"
//                     : status === "submitted"
//                       ? "bg-blue-600"
//                       : "bg-gray-300"
//                 }`}
//               ></span>
//             </span>
//             <span className="font-bold text-sm text-gray-700 uppercase tracking-wider">
//               {status === "typing"
//                 ? "Typing..."
//                 : status === "submitted"
//                   ? "Submitted"
//                   : "Inactive"}
//             </span>
//           </div>
//         </header>

//         {/* ข้อมูลที่แสดงผล */}
//         {!patientData ? (
//           <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
//             <Clock className="w-12 h-12 mb-2 opacity-20" />
//             <p>ยังไม่มีข้อมูลส่งเข้ามาในขณะนี้</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
//             {/* Card: Personal Information */}
//             <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//               <h2 className="text-blue-600 font-bold flex items-center gap-2 mb-4 border-b pb-2">
//                 <User size={18} /> ข้อมูลส่วนตัว
//               </h2>
//               <div className="space-y-4">
//                 <DataRow
//                   label="ชื่อ-นามสกุล"
//                   value={`${patientData.firstName || ""} ${patientData.lastName || ""}`}
//                 />
//                 <div className="grid grid-cols-2 gap-4">
//                   <DataRow label="เพศ" value={patientData.gender} />
//                   <DataRow label="วันเกิด" value={patientData.dob} />
//                 </div>
//               </div>
//             </section>

//             {/* Card: Contact Details */}
//             <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//               <h2 className="text-blue-600 font-bold flex items-center gap-2 mb-4 border-b pb-2">
//                 <Phone size={18} /> ข้อมูลการติดต่อ
//               </h2>
//               <div className="space-y-3">
//                 <p className="flex items-center gap-2 text-gray-700">
//                   <Phone size={14} className="text-gray-400" />{" "}
//                   {patientData.phone || "---"}
//                 </p>
//                 <p className="flex items-center gap-2 text-gray-700">
//                   <Mail size={14} className="text-gray-400" />{" "}
//                   {patientData.email || "---"}
//                 </p>
//                 <div className="flex items-start gap-2 text-gray-700 leading-tight pt-1">
//                   <MapPin
//                     size={14}
//                     className="text-gray-400 mt-1 flex-shrink-0"
//                   />
//                   <span className="text-sm">
//                     {patientData.address || "ยังไม่ได้ระบุที่อยู่"}
//                   </span>
//                 </div>
//               </div>
//             </section>

//             {/* แสดงสถานะเมื่อส่งสำเร็จ */}
//             {status === "submitted" && (
//               <div className="md:col-span-2 bg-green-50 border border-green-200 p-4 rounded-xl flex items-center gap-3 text-green-700 font-medium">
//                 <CheckCircle2 className="text-green-500" />{" "}
//                 ผู้ป่วยยืนยันการส่งข้อมูลเรียบร้อยแล้ว
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Component ย่อยช่วยให้โค้ดสะอาดขึ้น
// function DataRow({ label, value }: { label: string; value?: string }) {
//   return (
//     <div>
//       <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
//         {label}
//       </span>
//       <span className="text-gray-900 font-medium">{value || "---"}</span>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { pusherClient } from "@/lib/pusher";
// import { PatientInput } from "@/lib/validations";
// import {
//   User,
//   Phone,
//   Mail,
//   MapPin,
//   Activity,
//   CheckCircle2,
//   Clock,
//   History,
//   Trash2,
//   Globe, // เพิ่มไอคอนสำหรับสัญชาติ/ภาษา
// } from "lucide-react";

// // กำหนด Type ของข้อมูลที่วิ่งมาจาก Pusher ให้ชัดเจน
// interface PusherPayload {
//   data: Partial<PatientInput>;
//   status: "typing" | "submitted" | "inactive";
//   timestamp: string;
// }

// export default function StaffPage() {
//   // State สำหรับ Live Monitor
//   const [patientData, setPatientData] = useState<Partial<PatientInput> | null>(
//     null,
//   );
//   const [status, setStatus] = useState<"typing" | "submitted" | "inactive">(
//     "inactive",
//   );

//   // State สำหรับเช็คว่า Component ถูกเรนเดอร์บน Client หรือยัง (แก้ปัญหา Hydration)
//   const [isMounted, setIsMounted] = useState(false);

//   // State สำหรับเก็บประวัติผู้ป่วย (ดึงข้อมูลจาก localStorage ตั้งแต่เริ่มต้น)
//   const [patientHistory, setPatientHistory] = useState<Partial<PatientInput>[]>(
//     () => {
//       if (typeof window !== "undefined") {
//         const savedData = window.localStorage.getItem("patientHistory");
//         if (savedData) {
//           return JSON.parse(savedData);
//         }
//       }
//       return [];
//     },
//   );

//   // บอก React ว่าตอนนี้เรนเดอร์บน Browser แล้ว (ใช้ setTimeout เพื่อเลี่ยง Error Linter)
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsMounted(true);
//     }, 0);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     // Subscribe ไปยัง channel ที่เรากำหนดไว้ใน API
//     const channel = pusherClient.subscribe("patient-data");

//     // ดักฟัง event 'update'
//     channel.bind("update", (incoming: PusherPayload) => {
//       setPatientData(incoming.data);
//       setStatus(incoming.status);

//       // ถ้าเป็นสถานะ typing ให้ตั้ง Timer 5 วินาที ถ้าไม่มีข้อมูลใหม่มาให้ถือว่า Inactive
//       if (incoming.status === "typing") {
//         const timer = setTimeout(() => setStatus("inactive"), 5000);
//         return () => clearTimeout(timer);
//       }

//       // ถ้าสถานะเป็น submitted ให้บันทึกข้อมูลลง History และ localStorage
//       if (incoming.status === "submitted") {
//         setPatientHistory((prev) => {
//           const updatedHistory = [incoming.data, ...prev]; // เอาข้อมูลใหม่ไว้บนสุด
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

//   // ฟังก์ชันล้างประวัติ
//   const clearHistory = () => {
//     if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบประวัติทั้งหมด?")) {
//       localStorage.removeItem("patientHistory");
//       setPatientHistory([]);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* --- ส่วนที่ 1: Live Monitor --- */}
//         <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
//           <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//                 <Activity className="text-blue-600" /> Patient Live Monitor
//               </h1>
//               <p className="text-gray-500">
//                 ติดตามการกรอกข้อมูลของผู้ป่วยแบบเรียลไทม์
//               </p>
//             </div>

//             <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-200">
//               <span className={`relative flex h-3 w-3`}>
//                 {status === "typing" && (
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                 )}
//                 <span
//                   className={`relative inline-flex rounded-full h-3 w-3 ${
//                     status === "typing"
//                       ? "bg-green-500"
//                       : status === "submitted"
//                         ? "bg-blue-600"
//                         : "bg-gray-300"
//                   }`}
//                 ></span>
//               </span>
//               <span className="font-bold text-sm text-gray-700 uppercase tracking-wider">
//                 {status === "typing"
//                   ? "Typing..."
//                   : status === "submitted"
//                     ? "Submitted"
//                     : "Inactive"}
//               </span>
//             </div>
//           </header>

//           {!patientData ? (
//             <div className="flex flex-col items-center justify-center h-48 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
//               <Clock className="w-12 h-12 mb-2 opacity-20" />
//               <p>ยังไม่มีข้อมูลส่งเข้ามาในขณะนี้</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
//               {/* Card 1: ข้อมูลส่วนตัว (อัปเดตเพิ่ม สัญชาติ & ภาษา) */}
//               <section className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
//                 <h2 className="text-blue-600 font-bold flex items-center gap-2 mb-4 border-b pb-2">
//                   <User size={18} /> ข้อมูลส่วนตัวพื้นฐาน
//                 </h2>
//                 <div className="space-y-4">
//                   <DataRow
//                     label="ชื่อ-นามสกุล"
//                     value={`${patientData.firstName || ""} ${patientData.middleName ? patientData.middleName + " " : ""}${patientData.lastName || ""}`}
//                   />
//                   <div className="grid grid-cols-2 gap-4">
//                     <DataRow
//                       label="เพศ"
//                       value={
//                         patientData.gender === "male"
//                           ? "ชาย"
//                           : patientData.gender === "female"
//                             ? "หญิง"
//                             : patientData.gender
//                       }
//                     />
//                     <DataRow label="วันเกิด" value={patientData.dob} />
//                   </div>
//                   {/* เพิ่มบรรทัดแสดงผล สัญชาติ และ ภาษา */}
//                   <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200 border-dashed mt-2">
//                     <DataRow label="สัญชาติ" value={patientData.nationality} />
//                     <DataRow
//                       label="ภาษาที่สะดวก"
//                       value={patientData.preferredLanguage}
//                     />
//                   </div>
//                 </div>
//               </section>

//               {/* Card 2: ข้อมูลการติดต่อ */}
//               <section className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
//                 <h2 className="text-blue-600 font-bold flex items-center gap-2 mb-4 border-b pb-2">
//                   <Phone size={18} /> ข้อมูลการติดต่อ
//                 </h2>
//                 <div className="space-y-3">
//                   <p className="flex items-center gap-2 text-gray-700">
//                     <Phone size={14} className="text-gray-400" />{" "}
//                     {patientData.phone || "---"}
//                   </p>
//                   <p className="flex items-center gap-2 text-gray-700">
//                     <Mail size={14} className="text-gray-400" />{" "}
//                     {patientData.email || "---"}
//                   </p>
//                   <div className="flex items-start gap-2 text-gray-700 leading-tight pt-1">
//                     <MapPin
//                       size={14}
//                       className="text-gray-400 mt-1 flex-shrink-0"
//                     />
//                     <span className="text-sm">
//                       {patientData.address || "ยังไม่ได้ระบุที่อยู่"}
//                     </span>
//                   </div>
//                 </div>
//               </section>

//               {status === "submitted" && (
//                 <div className="md:col-span-2 bg-green-50 border border-green-200 p-4 rounded-xl flex items-center gap-3 text-green-700 font-medium">
//                   <CheckCircle2 className="text-green-500" />{" "}
//                   ผู้ป่วยยืนยันการส่งข้อมูลเรียบร้อยแล้ว
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* --- ส่วนที่ 2: ประวัติผู้ป่วย (เพิ่มคอลัมน์) --- */}
//         <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//               <History className="text-purple-600" />{" "}
//               ประวัติผู้ป่วยที่ลงทะเบียนแล้ว
//             </h2>
//             {isMounted && patientHistory.length > 0 && (
//               <button
//                 onClick={clearHistory}
//                 className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
//               >
//                 <Trash2 size={16} /> ล้างข้อมูล
//               </button>
//             )}
//           </div>

//           {!isMounted ? (
//             <p className="text-gray-400 text-center py-8 animate-pulse">
//               กำลังโหลดข้อมูล...
//             </p>
//           ) : patientHistory.length === 0 ? (
//             <p className="text-gray-400 text-center py-8">
//               ยังไม่มีประวัติการลงทะเบียน
//             </p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-left text-sm text-gray-600">
//                 <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-y border-gray-100">
//                   <tr>
//                     <th className="px-4 py-3 font-semibold">ชื่อ - นามสกุล</th>
//                     <th className="px-4 py-3 font-semibold">เบอร์โทรศัพท์</th>
//                     <th className="px-4 py-3 font-semibold">เพศ</th>
//                     <th className="px-4 py-3 font-semibold">สัญชาติ</th>
//                     <th className="px-4 py-3 font-semibold">ภาษา</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {patientHistory.map((patient, index) => (
//                     <tr
//                       key={index}
//                       className="hover:bg-gray-50/50 transition-colors"
//                     >
//                       <td className="px-4 py-3 font-medium text-gray-900">
//                         {patient.firstName} {patient.lastName}
//                       </td>
//                       <td className="px-4 py-3">{patient.phone}</td>
//                       <td className="px-4 py-3 capitalize">
//                         {patient.gender === "male"
//                           ? "ชาย"
//                           : patient.gender === "female"
//                             ? "หญิง"
//                             : patient.gender}
//                       </td>
//                       <td className="px-4 py-3">
//                         {patient.nationality || "-"}
//                       </td>
//                       <td className="px-4 py-3">
//                         {patient.preferredLanguage || "-"}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Component ย่อยสำหรับจัด Layout ข้อมูลให้อ่านง่าย
// function DataRow({ label, value }: { label: string; value?: string }) {
//   return (
//     <div>
//       <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
//         {label}
//       </span>
//       <span className="text-gray-900 font-medium">{value || "---"}</span>
//     </div>
//   );
// }

// import { Activity } from "lucide-react";
// import StaffDashboard from "./components/StaffDashboard";

// export default function StaffPage() {
//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
//       <div className="max-w-6xl mx-auto">
//         <header className="mb-8 flex items-center gap-3">
//           <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
//             <Activity className="text-white w-6 h-6" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
//               Staff Dashboard
//             </h1>
//             <p className="text-gray-500 text-sm">
//               ระบบจัดการข้อมูลผู้ป่วยคลินิก
//             </p>
//           </div>
//         </header>

//         {/* เรียกใช้งาน Client Component ที่ครอบ Logic ไว้ทั้งหมด */}
//         <StaffDashboard />
//       </div>
//     </div>
//   );
// }

import { Activity } from "lucide-react";
// ❌ ไม่ต้องใช้ dynamic import แบบ ssr: false ที่นี่
import StaffDashboard from "./components/StaffDashboard";

export default function StaffPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
            <Activity className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Staff Dashboard
            </h1>
            <p className="text-gray-500 text-sm">
              ระบบจัดการข้อมูลผู้ป่วยคลินิก
            </p>
          </div>
        </header>

        {/* เรียกใช้ Component ปกติ */}
        <StaffDashboard />
      </div>
    </div>
  );
}
