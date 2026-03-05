// "use client";

// import { PatientInput } from "@/lib/validations";
// import { History, Trash2 } from "lucide-react";

// interface HistoryTableProps {
//   history: Partial<PatientInput>[];
//   onClear: () => void;
// }

// export default function HistoryTable({ history, onClear }: HistoryTableProps) {
//   return (
//     <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 ring-1 ring-gray-900/5 mt-8">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//             <History className="text-purple-600" /> ประวัติการลงทะเบียน
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             ข้อมูลผู้ป่วยที่กดส่งฟอร์มสำเร็จแล้ว
//           </p>
//         </div>

//         {history.length > 0 && (
//           <button
//             onClick={onClear}
//             className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1.5 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors font-medium border border-transparent hover:border-red-100"
//           >
//             <Trash2 size={16} /> ล้างข้อมูล
//           </button>
//         )}
//       </div>

//       {!history.length ? (
//         <div className="h-32 flex items-center justify-center text-gray-400 animate-pulse">
//           กำลังโหลดข้อมูล...
//         </div>
//       ) : history.length === 0 ? (
//         <div className="text-gray-400 text-center py-12 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
//           ยังไม่มีประวัติการลงทะเบียน
//         </div>
//       ) : (
//         <div className="overflow-x-auto rounded-xl border border-gray-200">
//           <table className="w-full text-left text-sm text-gray-600">
//             <thead className="text-xs text-gray-600 uppercase bg-gray-100 border-b border-gray-200">
//               <tr>
//                 <th className="px-5 py-4 font-bold">ชื่อ - นามสกุล</th>
//                 <th className="px-5 py-4 font-bold">เบอร์โทรศัพท์</th>
//                 <th className="px-5 py-4 font-bold">เพศ</th>
//                 <th className="px-5 py-4 font-bold">สัญชาติ</th>
//                 <th className="px-5 py-4 font-bold">ภาษา</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100 bg-white">
//               {history.map((patient, index) => (
//                 <tr
//                   key={index}
//                   className="hover:bg-blue-50/50 transition-colors"
//                 >
//                   <td className="px-5 py-4 font-medium text-gray-900">
//                     {patient.firstName} {patient.lastName}
//                   </td>
//                   <td className="px-5 py-4">{patient.phone || "-"}</td>
//                   <td className="px-5 py-4 capitalize">
//                     {patient.gender === "male"
//                       ? "ชาย"
//                       : patient.gender === "female"
//                         ? "หญิง"
//                         : patient.gender}
//                   </td>
//                   <td className="px-5 py-4">{patient.nationality || "-"}</td>
//                   <td className="px-5 py-4 text-blue-600 font-medium">
//                     {patient.preferredLanguage || "-"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { PatientInput } from "@/lib/validations";
import { History, Trash2, Search, X } from "lucide-react";

interface HistoryTableProps {
  history: Partial<PatientInput>[];
  onClear: () => void;
}

export default function HistoryTable({ history, onClear }: HistoryTableProps) {
  // State สำหรับเก็บข้อมูลผู้ป่วยที่ถูกคลิกเพื่อดูรายละเอียด
  const [selectedPatient, setSelectedPatient] =
    useState<Partial<PatientInput> | null>(null);

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 ring-1 ring-gray-900/5 mt-8 relative">
      <div className="flex items-center justify-between mb-[clamp(12px,4vw,16px)]">
        <div>
          {/* หัวข้อ: เริ่มที่ 14px ขยายเนียนๆ ไปจนถึง 18px */}
          <h2 className="text-[clamp(14px,4.5vw,18px)] font-bold text-gray-900 flex items-center gap-[clamp(4px,1.5vw,6px)]">
            {/* ไอคอน History: เริ่ม 16px ขยายไปถึง 18px */}
            <History className="text-purple-600 w-[clamp(16px,4vw,18px)] h-[clamp(16px,4vw,18px)]" />
            ประวัติการลงทะเบียน
          </h2>
          {/* Subtitle: เริ่ม 10px ขยายไปถึง 12px */}
          <p className="text-[clamp(10px,2.5vw,12px)] text-gray-500 mt-[clamp(2px,0.5vw,4px)]">
            ข้อมูลผู้ป่วยที่กดส่งฟอร์มสำเร็จแล้ว
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClear}
            /* ปุ่มล้างข้อมูล: 
         - ตัวหนังสือเริ่ม 10px -> 12px
         - Padding ซ้ายขวาเริ่ม 8px -> 12px, บนล่างเริ่ม 4px -> 6px
      */
            className="text-[clamp(10px,2.5vw,12px)] text-red-600 hover:text-white bg-red-50 hover:bg-red-500 shadow-sm flex items-center gap-[clamp(4px,1vw,6px)] px-[clamp(8px,2.5vw,12px)] py-[clamp(4px,1.5vw,6px)] rounded-[clamp(6px,2vw,8px)] transition-all duration-200 font-medium border border-red-100 hover:border-red-500 active:scale-95"
          >
            {/* ไอคอนถังขยะ: เริ่ม 12px ขยายไปถึง 14px */}
            <Trash2 className="w-[clamp(12px,3vw,14px)] h-[clamp(12px,3vw,14px)]" />{" "}
            ล้างข้อมูล
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-gray-400 text-center py-12 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
          <div className="text-4xl mb-2">📭</div>
          ยังไม่มีประวัติการลงทะเบียน
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-inner">
          <table className="w-full text-left text-sm text-gray-600 min-w-[600px]">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/80 border-b border-gray-200">
              <tr>
                <th className="px-5 py-4 font-bold">👤 ชื่อ - นามสกุล</th>
                <th className="px-5 py-4 font-bold">📱 เบอร์โทรศัพท์</th>
                <th className="px-5 py-4 font-bold text-center">⚧ เพศ</th>
                <th className="px-5 py-4 font-bold text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {history.map((patient, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-gray-900">
                    {patient.firstName} {patient.lastName}
                  </td>
                  <td className="px-5 py-4 font-mono text-gray-600">
                    {patient.phone || "-"}
                  </td>
                  <td className="px-5 py-4 text-center capitalize">
                    {patient.gender === "male"
                      ? "👨 ชาย"
                      : patient.gender === "female"
                        ? "👩 หญิง"
                        : "❓ ไม่ระบุ"}
                  </td>
                  <td className="px-5 py-4 text-center">
                    {/* ปุ่มดูเพิ่มเติม ออกแบบให้ดูมีมิติและทันสมัย */}
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-200 hover:border-blue-600 rounded-lg text-xs font-bold shadow-sm hover:shadow active:scale-95 transition-all duration-200"
                    >
                      <Search size={14} /> ดูเพิ่มเติม
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🌟 Modal Popup สำหรับแสดงข้อมูลฉบับเต็ม */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                📋 ข้อมูลผู้ป่วยแบบละเอียด
              </h3>
              <button
                aria-label="ปิดหน้าต่าง"
                onClick={() => setSelectedPatient(null)}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
              {/* ส่วนข้อมูลส่วนตัว */}
              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                <h4 className="font-bold text-blue-800 mb-3 border-b border-blue-100 pb-2">
                  👤 ข้อมูลส่วนตัว
                </h4>
                {/* 🌟 บังคับให้เป็น grid-cols-2 เสมอ และปรับระยะห่าง (gap) ให้พอดีกับมือถือ */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-4 text-sm">
                  <DetailRow
                    label="ชื่อจริง"
                    value={selectedPatient.firstName}
                  />
                  <DetailRow label="นามสกุล" value={selectedPatient.lastName} />
                  <DetailRow
                    label="ชื่อกลาง"
                    value={selectedPatient.middleName}
                  />
                  <DetailRow label="วันเกิด" value={selectedPatient.dob} />
                  <DetailRow
                    label="เพศ"
                    value={
                      selectedPatient.gender === "male"
                        ? "ชาย"
                        : selectedPatient.gender === "female"
                          ? "หญิง"
                          : selectedPatient.gender
                    }
                  />
                  <DetailRow
                    label="สัญชาติ"
                    value={selectedPatient.nationality}
                  />
                  <DetailRow label="ศาสนา" value={selectedPatient.religion} />
                  <DetailRow
                    label="ภาษาที่สะดวก"
                    value={selectedPatient.preferredLanguage}
                  />
                </div>
              </div>

              {/* ส่วนข้อมูลการติดต่อ */}
              <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">
                <h4 className="font-bold text-emerald-800 mb-3 border-b border-emerald-100 pb-2">
                  📱 ข้อมูลการติดต่อ
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <DetailRow
                    label="เบอร์โทรศัพท์"
                    value={selectedPatient.phone}
                  />
                  <DetailRow label="อีเมล" value={selectedPatient.email} />
                  <div className="sm:col-span-2">
                    <DetailRow
                      label="ที่อยู่"
                      value={selectedPatient.address}
                    />
                  </div>
                </div>
              </div>

              {/* ส่วนผู้ติดต่อฉุกเฉิน */}
              <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100/50">
                <h4 className="font-bold text-rose-800 mb-3 border-b border-rose-100 pb-2">
                  🚨 ผู้ติดต่อฉุกเฉิน
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <DetailRow
                    label="ชื่อผู้ติดต่อ"
                    value={selectedPatient.emergencyContactName}
                  />
                  <DetailRow
                    label="ความสัมพันธ์"
                    value={selectedPatient.emergencyRelationship}
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedPatient(null)}
                className="px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Component เล็กๆ สำหรับแสดงคู่ Key-Value ใน Modal
function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500 font-medium mb-1">{label}</span>
      <span className="text-gray-900 font-semibold">
        {value || <span className="text-gray-300">-</span>}
      </span>
    </div>
  );
}
