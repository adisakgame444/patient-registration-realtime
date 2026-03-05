"use client";

import { PatientInput } from "@/lib/validations";
import {
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

interface LiveMonitorCardProps {
  patientData: Partial<PatientInput> | null;
  status: "typing" | "submitted" | "inactive";
}

export default function LiveMonitorCard({
  patientData,
  status,
}: LiveMonitorCardProps) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 ring-1 ring-gray-900/5">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Live Monitor</h2>
          <p className="text-sm text-gray-500 mt-1">
            ติดตามการกรอกข้อมูลของผู้ป่วยแบบเรียลไทม์
          </p>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 bg-gray-50/80 rounded-full border border-gray-200 shadow-inner">
          <span className="relative flex h-3 w-3">
            {status === "typing" && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            )}
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                status === "typing"
                  ? "bg-green-500"
                  : status === "submitted"
                    ? "bg-blue-600"
                    : "bg-gray-300"
              }`}
            ></span>
          </span>
          <span className="font-semibold text-xs text-gray-600 uppercase tracking-wider">
            {status === "typing"
              ? "กำลังพิมพ์..."
              : status === "submitted"
                ? "ส่งข้อมูลแล้ว"
                : "ไม่มีการเคลื่อนไหว"}
          </span>
        </div>
      </header>

      {!patientData ? (
        <div className="flex flex-col items-center justify-center h-56 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 transition-all">
          <Clock className="w-12 h-12 mb-3 text-gray-300" />
          <p className="font-medium text-gray-500">รอรับข้อมูลจากผู้ป่วย...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-300">
          {/* 1. ข้อมูลส่วนตัว (เพิ่มศาสนาแล้ว) */}
          <section className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100 shadow-sm">
            <h3 className="text-blue-700 font-bold flex items-center gap-2 mb-4">
              <User size={18} /> ข้อมูลส่วนตัว
            </h3>
            <div className="space-y-4">
              <DataRow
                label="ชื่อ-นามสกุล"
                value={`${patientData.firstName || ""} ${patientData.middleName ? patientData.middleName + " " : ""}${patientData.lastName || ""}`}
              />
              <div className="grid grid-cols-2 gap-4">
                <DataRow
                  label="เพศ"
                  value={
                    patientData.gender === "male"
                      ? "ชาย"
                      : patientData.gender === "female"
                        ? "หญิง"
                        : patientData.gender
                  }
                />
                <DataRow label="วันเกิด" value={patientData.dob} />
              </div>
              <div className="grid grid-cols-3 gap-4 pt-3 border-t border-blue-100">
                <DataRow label="สัญชาติ" value={patientData.nationality} />
                <DataRow label="ภาษา" value={patientData.preferredLanguage} />
                <DataRow label="ศาสนา" value={patientData.religion} />{" "}
                {/* ✅ ดึงฟิลด์ศาสนามาแสดงตรงนี้ */}
              </div>
            </div>
          </section>

          {/* 2. ข้อมูลการติดต่อ */}
          <section className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100 shadow-sm">
            <h3 className="text-indigo-700 font-bold flex items-center gap-2 mb-4">
              <Phone size={18} /> ข้อมูลการติดต่อ
            </h3>
            <div className="space-y-4">
              <DataRow
                icon={<Phone size={14} />}
                label="เบอร์โทรศัพท์"
                value={patientData.phone}
              />
              <DataRow
                icon={<Mail size={14} />}
                label="อีเมล"
                value={patientData.email}
              />
              <DataRow
                icon={<MapPin size={14} />}
                label="ที่อยู่"
                value={patientData.address}
              />
            </div>
          </section>

          {/* 3. ผู้ติดต่อฉุกเฉิน (✅ เพิ่ม Section ใหม่ให้เด่นชัด) */}
          <section className="md:col-span-2 bg-gradient-to-br from-red-50 to-white p-6 rounded-2xl border border-red-100 shadow-sm">
            <h3 className="text-red-700 font-bold flex items-center gap-2 mb-4">
              <AlertCircle size={18} /> ผู้ติดต่อฉุกเฉิน (Emergency Contact)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DataRow
                label="ชื่อผู้ติดต่อฉุกเฉิน"
                value={patientData.emergencyContactName}
              />
              <DataRow
                label="ความสัมพันธ์"
                value={patientData.emergencyRelationship}
              />
            </div>
          </section>

          {status === "submitted" && (
            <div className="md:col-span-2 bg-green-50 border border-green-200 p-4 rounded-xl flex items-center justify-center gap-2 text-green-700 font-semibold shadow-sm animate-in slide-in-from-bottom-2">
              <CheckCircle2 className="w-5 h-5" />{" "}
              ผู้ป่วยยืนยันการส่งข้อมูลเรียบร้อยแล้ว
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Sub-component เล็กๆ สำหรับแสดง Data
function DataRow({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <span className="text-[11px] uppercase font-bold text-gray-500 mb-1 flex items-center gap-1.5 tracking-wider">
        {icon} {label}
      </span>
      <span className="text-gray-900 font-medium block min-h-[1.5rem]">
        {value ? value : <span className="text-gray-300">-</span>}{" "}
        {/* ถ้าไม่มีข้อมูลให้โชว์ขีด - */}
      </span>
    </div>
  );
}
