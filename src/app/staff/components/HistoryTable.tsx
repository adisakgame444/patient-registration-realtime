"use client";

import { PatientInput } from "@/lib/validations";
import { History, Trash2 } from "lucide-react";

interface HistoryTableProps {
  history: Partial<PatientInput>[];
  onClear: () => void;
}

export default function HistoryTable({ history, onClear }: HistoryTableProps) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 ring-1 ring-gray-900/5 mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <History className="text-purple-600" /> ประวัติการลงทะเบียน
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            ข้อมูลผู้ป่วยที่กดส่งฟอร์มสำเร็จแล้ว
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClear}
            className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1.5 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors font-medium border border-transparent hover:border-red-100"
          >
            <Trash2 size={16} /> ล้างข้อมูล
          </button>
        )}
      </div>

      {!history.length ? (
        <div className="h-32 flex items-center justify-center text-gray-400 animate-pulse">
          กำลังโหลดข้อมูล...
        </div>
      ) : history.length === 0 ? (
        <div className="text-gray-400 text-center py-12 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
          ยังไม่มีประวัติการลงทะเบียน
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="text-xs text-gray-600 uppercase bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-5 py-4 font-bold">ชื่อ - นามสกุล</th>
                <th className="px-5 py-4 font-bold">เบอร์โทรศัพท์</th>
                <th className="px-5 py-4 font-bold">เพศ</th>
                <th className="px-5 py-4 font-bold">สัญชาติ</th>
                <th className="px-5 py-4 font-bold">ภาษา</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {history.map((patient, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-50/50 transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-gray-900">
                    {patient.firstName} {patient.lastName}
                  </td>
                  <td className="px-5 py-4">{patient.phone || "-"}</td>
                  <td className="px-5 py-4 capitalize">
                    {patient.gender === "male"
                      ? "ชาย"
                      : patient.gender === "female"
                        ? "หญิง"
                        : patient.gender}
                  </td>
                  <td className="px-5 py-4">{patient.nationality || "-"}</td>
                  <td className="px-5 py-4 text-blue-600 font-medium">
                    {patient.preferredLanguage || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
