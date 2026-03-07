// "use client";

// import React from "react";
// import { LucideIcon } from "lucide-react";
// import { UseFormRegister, FieldError } from "react-hook-form";
// import { PatientInput } from "@/lib/validations";
// import { ErrorMsg } from "./ErrorMsg";

// // ✅ กำหนด Interface สำหรับ Props เพื่อความปลอดภัยของข้อมูล (Type Safety)
// interface InputFieldProps {
//   label: string;
//   name: keyof PatientInput; // ชื่อฟิลด์ต้องตรงตามที่กำหนดไว้ใน Schema เท่านั้น
//   type?: string;
//   placeholder?: string;
//   register: UseFormRegister<PatientInput>; // ใช้ Type จาก react-hook-form
//   error?: FieldError; // ใช้ Type Error จาก react-hook-form
//   icon: LucideIcon; // ระบุว่าเป็น Component ไอคอนจาก Lucide
// }

// export function InputField({
//   label,
//   name,
//   type = "text",
//   placeholder,
//   register,
//   error,
//   icon: Icon,
// }: InputFieldProps) {
//   return (
//     <div className="space-y-2">
//       <label className="block text-sm font-semibold text-slate-700">
//         {label}
//       </label>

//       <div className="relative group">
//         {/* ส่วนของการแสดงไอคอนพร้อมสถานะสีตาม Error */}
//         <div
//           className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors duration-300 ${
//             error
//               ? "text-red-400"
//               : "text-slate-400 group-focus-within:text-indigo-600"
//           }`}
//         >
//           <Icon size={18} />
//         </div>

//         {/* ช่องกรอกข้อมูล (Input) พร้อมสไตล์ที่ปรับตามสถานะ Error */}
//         <input
//           type={type}
//           placeholder={placeholder}
//           {...register(name)}
//           className={`w-full pl-10 p-3 bg-slate-50/50 border rounded-xl outline-none transition-all duration-300 focus:bg-white focus:ring-4 text-slate-800 ${
//             error
//               ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
//               : "border-slate-200 hover:border-slate-300 focus:ring-indigo-500/15 focus:border-indigo-500"
//           }`}
//         />
//       </div>

//       {/* แสดงข้อความแจ้งเตือนเมื่อกรอกผิดเงื่อนไข */}
//       <ErrorMsg message={error?.message} />
//     </div>
//   );
// }

"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { UseFormRegister, FieldError } from "react-hook-form";
import { PatientInput } from "@/lib/validations";
import { ErrorMsg } from "./ErrorMsg";

interface InputFieldProps {
  label: string;
  name: keyof PatientInput;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<PatientInput>;
  error?: FieldError;
  icon: LucideIcon;
}

export function InputField({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  icon: Icon,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        {/* 🟢 1. ย้าย <input> มาไว้ข้างบน และเติม class "peer" เข้าไป */}
        <input
          type={type}
          placeholder={
            placeholder || " "
          } /* ต้องมี placeholder เสมอเพื่อให้เช็คค่าว่างได้ */
          {...register(name)}
          className={`peer w-full pl-10 p-3 bg-slate-50/50 border rounded-xl outline-none transition-all duration-300 focus:bg-white focus:ring-4 text-slate-800 ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
              : "border-slate-200 hover:border-slate-300 focus:ring-indigo-500/15 focus:border-indigo-500"
          }`}
        />

        {/* 🟢 2. ย้ายกล่องไอคอนมาไว้ข้างล่าง เพื่อรอรับสัญญาณจาก "peer" (input) */}
        <div
          className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors duration-300 ${
            error
              ? "text-red-400" // 🔴 มี Error: ไอคอนแดง
              : "text-indigo-600 peer-placeholder-shown:text-slate-400 peer-focus:text-indigo-600"
            // 🟣 พิมพ์แล้ว = ม่วง | ⚪ ว่างเปล่า = เทา | 🟣 กำลังกด = ม่วง
          }`}
        >
          <Icon size={18} />
        </div>
      </div>

      <ErrorMsg message={error?.message} />
    </div>
  );
}
