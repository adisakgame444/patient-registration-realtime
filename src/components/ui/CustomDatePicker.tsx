// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { CalendarDays, ChevronDown } from "lucide-react";
// import { ErrorMsg } from "./ErrorMsg";
// import { UseFormSetValue, FieldError } from "react-hook-form";
// import { PatientInput } from "@/lib/validations";

// interface CustomDatePickerProps {
//   label: string;
//   name: keyof PatientInput;
//   setValue: UseFormSetValue<PatientInput>;
//   selectedValue?: string;
//   error?: FieldError;
// }

// export function CustomDatePicker({
//   label,
//   name,
//   setValue,
//   selectedValue,
//   error,
// }: CustomDatePickerProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);

//   // ดึงค่าเดิมจาก Form มาใส่ใน State เริ่มต้นเพื่อให้แสดงผลต่อเนื่อง
//   const initialDate = selectedValue ? new Date(selectedValue) : null;
//   const [d, setDay] = useState(
//     initialDate ? initialDate.getDate().toString() : "",
//   );
//   const [m, setM] = useState(""); // เก็บเป็นชื่อเดือนภาษาไทยเหมือนเดิม
//   const [y, setY] = useState(
//     initialDate ? initialDate.getFullYear().toString() : "",
//   );

//   const months = [
//     "ม.ค.",
//     "ก.พ.",
//     "มี.ค.",
//     "เม.ย.",
//     "พ.ค.",
//     "มิ.ย.",
//     "ก.ค.",
//     "ส.ค.",
//     "ก.ย.",
//     "ต.ค.",
//     "พ.ย.",
//     "ธ.ค.",
//   ];
//   const currentYear = new Date().getFullYear();

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(e.target as Node)
//       )
//         setIsOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // ✅ แก้บั๊ก: ส่งค่าเข้า Form ทันทีที่เลือกครบ และบังคับ Re-render
//   useEffect(() => {
//     if (d && m && y) {
//       const monthIdx = (months.indexOf(m) + 1).toString().padStart(2, "0");
//       const formattedDate = `${y}-${monthIdx}-${d.padStart(2, "0")}`;
//       setValue(name, formattedDate, {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//     }
//   }, [d, m, y]);

//   // ✅ แก้บั๊ก: ส่วนแสดงผลในช่อง Input (แสดงสิ่งที่เลือกอยู่แม้ยังไม่ครบ 3 อย่าง)
//   const getDisplayText = () => {
//     if (selectedValue) {
//       return new Date(selectedValue).toLocaleDateString("th-TH", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });
//     }
//     if (d || m || y)
//       return `${d || "วัน"} ${m || "เดือน"} ${y ? parseInt(y) + 543 : "ปี"}`;
//     return "เลือกวันเกิดของคุณ";
//   };

//   return (
//     <div className="relative" ref={containerRef}>
//       <label className="block text-sm font-semibold text-slate-700 mb-2">
//         {label}
//       </label>
//       <div
//         onClick={() => setIsOpen(!isOpen)}
//         className={`relative w-full pl-10 pr-10 p-3.5 border rounded-xl cursor-pointer flex items-center justify-between transition-all select-none ${
//           isOpen
//             ? "bg-white ring-4 ring-indigo-500/15 border-indigo-500 shadow-sm"
//             : "bg-slate-50/50 border-slate-200"
//         } ${error ? "border-red-400" : ""}`}
//       >
//         <div
//           className={`absolute inset-y-0 left-0 pl-3.5 flex items-center ${selectedValue || d || m || y ? "text-indigo-600" : "text-slate-400"}`}
//         >
//           <CalendarDays size={18} />
//         </div>
//         <span
//           className={`block truncate ${!selectedValue && !d && !m && !y ? "text-slate-400" : "text-slate-800"}`}
//         >
//           {getDisplayText()}
//         </span>
//         <ChevronDown
//           size={18}
//           className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-indigo-600" : "text-slate-400"}`}
//         />
//       </div>

//       {isOpen && (
//         <div className="absolute z-[70] w-full mt-2 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
//           <div className="space-y-4">
//             <div className="grid grid-cols-4 gap-1 h-24 overflow-y-auto border-b pb-2 custom-scrollbar">
//               {Array.from({ length: 100 }, (_, i) => currentYear - i).map(
//                 (year) => (
//                   <button
//                     key={year}
//                     type="button"
//                     onClick={() => setY(year.toString())}
//                     className={`text-xs p-1 rounded-lg transition-colors ${y === year.toString() ? "bg-indigo-600 text-white" : "hover:bg-slate-100 text-slate-700"}`}
//                   >
//                     {year + 543}
//                   </button>
//                 ),
//               )}
//             </div>
//             <div className="grid grid-cols-4 gap-1 border-b pb-2">
//               {months.map((month) => (
//                 <button
//                   key={month}
//                   type="button"
//                   onClick={() => setM(month)}
//                   className={`text-xs p-1 rounded-lg transition-colors ${m === month ? "bg-indigo-600 text-white" : "hover:bg-slate-100 text-slate-700"}`}
//                 >
//                   {month}
//                 </button>
//               ))}
//             </div>
//             <div className="grid grid-cols-7 gap-1">
//               {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
//                 <button
//                   key={day}
//                   type="button"
//                   onClick={() => {
//                     setDay(day.toString());
//                     if (y && m) setIsOpen(false);
//                   }}
//                   className={`text-xs p-1 rounded-lg transition-colors ${d === day.toString() ? "bg-indigo-600 text-white" : "hover:bg-slate-100 text-slate-700"}`}
//                 >
//                   {day}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//       <ErrorMsg message={error?.message} />
//     </div>
//   );
// }

// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { CalendarDays, ChevronDown } from "lucide-react";
// import { ErrorMsg } from "./ErrorMsg";
// import { UseFormSetValue, FieldError } from "react-hook-form";
// import { PatientInput } from "@/lib/validations";

// interface CustomDatePickerProps {
//   label: string;
//   name: keyof PatientInput;
//   setValue: UseFormSetValue<PatientInput>;
//   selectedValue?: string;
//   error?: FieldError;
// }

// export function CustomDatePicker({
//   label,
//   name,
//   setValue,
//   selectedValue,
//   error,
// }: CustomDatePickerProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const initialDate = selectedValue ? new Date(selectedValue) : null;
//   const [d, setDay] = useState(
//     initialDate ? initialDate.getDate().toString() : "",
//   );
//   const [m, setM] = useState("");
//   const [y, setY] = useState(
//     initialDate ? initialDate.getFullYear().toString() : "",
//   );

//   const months = [
//     "ม.ค.",
//     "ก.พ.",
//     "มี.ค.",
//     "เม.ย.",
//     "พ.ค.",
//     "มิ.ย.",
//     "ก.ค.",
//     "ส.ค.",
//     "ก.ย.",
//     "ต.ค.",
//     "พ.ย.",
//     "ธ.ค.",
//   ];
//   const currentYear = new Date().getFullYear();

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(e.target as Node)
//       )
//         setIsOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (d && m && y) {
//       const monthIdx = (months.indexOf(m) + 1).toString().padStart(2, "0");
//       const formattedDate = `${y}-${monthIdx}-${d.padStart(2, "0")}`;
//       setValue(name, formattedDate, {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//     }
//   }, [d, m, y]);

//   const getDisplayText = () => {
//     if (selectedValue) {
//       return new Date(selectedValue).toLocaleDateString("th-TH", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });
//     }
//     if (d || m || y)
//       return `${d || "วัน"} ${m || "เดือน"} ${y ? parseInt(y) + 543 : "ปี"}`;
//     return "เลือกวันเกิดของคุณ";
//   };

//   // ✅ เพิ่มฟังก์ชันจัดการสีแบบเดียวกับ CustomSelect
//   const getTriggerClass = () => {
//     const base =
//       "relative w-full pl-10 pr-10 p-3.5 border rounded-xl cursor-pointer flex items-center justify-between transition-all duration-300 select-none text-slate-800";

//     if (error) {
//       if (isOpen) {
//         return `${base} bg-white border-red-500 ring-4 ring-red-500/15`;
//       }
//       return `${base} bg-slate-50/50 border-red-400`;
//     } else {
//       if (isOpen) {
//         return `${base} bg-white border-indigo-500 ring-4 ring-indigo-500/15`;
//       }
//       return `${base} bg-slate-50/50 border-slate-200 hover:border-slate-300`;
//     }
//   };

//   return (
//     <div className="relative" ref={containerRef}>
//       <label className="block text-sm font-semibold text-slate-700 mb-2">
//         {label}
//       </label>

//       {/* 🟢 เรียกใช้ Class ที่แยกสถานะเด็ดขาด */}
//       <div onClick={() => setIsOpen(!isOpen)} className={getTriggerClass()}>
//         {/* สีของไอคอนปฏิทิน */}
//         <div
//           className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${
//             error
//               ? "text-red-400"
//               : isOpen || selectedValue || d || m || y
//                 ? "text-indigo-600"
//                 : "text-slate-400"
//           }`}
//         >
//           <CalendarDays size={18} />
//         </div>

//         {/* ข้อความแสดงผล */}
//         <span
//           className={`block truncate ${!selectedValue && !d && !m && !y ? "text-slate-400" : "text-slate-800"}`}
//         >
//           {getDisplayText()}
//         </span>

//         {/* สีของลูกศร */}
//         <ChevronDown
//           size={18}
//           className={`transition-all duration-300 ${
//             error
//               ? "text-red-400"
//               : isOpen
//                 ? "text-indigo-600"
//                 : "text-slate-400"
//           } ${isOpen ? "rotate-180" : ""}`}
//         />
//       </div>

//       {isOpen && (
//         <div className="absolute z-[70] w-full mt-2 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
//           <div className="space-y-4">
//             <div className="grid grid-cols-4 gap-1 h-24 overflow-y-auto border-b pb-2 custom-scrollbar">
//               {Array.from({ length: 100 }, (_, i) => currentYear - i).map(
//                 (year) => (
//                   <button
//                     key={year}
//                     type="button"
//                     onClick={() => setY(year.toString())}
//                     className={`text-xs p-1 rounded-lg transition-colors ${y === year.toString() ? "bg-indigo-600 text-white" : "hover:bg-slate-100 text-slate-700"}`}
//                   >
//                     {year + 543}
//                   </button>
//                 ),
//               )}
//             </div>
//             <div className="grid grid-cols-4 gap-1 border-b pb-2">
//               {months.map((month) => (
//                 <button
//                   key={month}
//                   type="button"
//                   onClick={() => setM(month)}
//                   className={`text-xs p-1 rounded-lg transition-colors ${m === month ? "bg-indigo-600 text-white" : "hover:bg-slate-100 text-slate-700"}`}
//                 >
//                   {month}
//                 </button>
//               ))}
//             </div>
//             <div className="grid grid-cols-7 gap-1">
//               {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
//                 <button
//                   key={day}
//                   type="button"
//                   onClick={() => {
//                     setDay(day.toString());
//                     if (y && m) setIsOpen(false);
//                   }}
//                   className={`text-xs p-1 rounded-lg transition-colors ${d === day.toString() ? "bg-indigo-600 text-white" : "hover:bg-slate-100 text-slate-700"}`}
//                 >
//                   {day}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//       <ErrorMsg message={error?.message} />
//     </div>
//   );
// }

"use client";

import React, { useState, useRef, useEffect } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import { ErrorMsg } from "./ErrorMsg";
import { UseFormSetValue, FieldError } from "react-hook-form";
import { PatientInput } from "@/lib/validations";

interface CustomDatePickerProps {
  label: string;
  name: keyof PatientInput;
  setValue: UseFormSetValue<PatientInput>;
  selectedValue?: string;
  error?: FieldError;
}

export function CustomDatePicker({
  label,
  name,
  setValue,
  selectedValue,
  error,
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const initialDate = selectedValue ? new Date(selectedValue) : null;
  const [d, setDay] = useState(
    initialDate ? initialDate.getDate().toString() : "",
  );
  const [m, setM] = useState("");
  const [y, setY] = useState(
    initialDate ? initialDate.getFullYear().toString() : "",
  );

  const months = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];
  const currentYear = new Date().getFullYear();

  // ✅ ฟังก์ชันคำนวณจำนวนวันตามเดือนและปี
  const getDaysInMonth = (selectedYear: string, selectedMonth: string) => {
    if (!selectedYear || !selectedMonth) return 31;
    const yearNum = parseInt(selectedYear);
    const monthIdx = months.indexOf(selectedMonth) + 1;
    return new Date(yearNum, monthIdx, 0).getDate();
  };

  const daysInCurrentMonth = getDaysInMonth(y, m);

  // ✅ ฟังก์ชันจัดการเมื่อผู้ใช้เปลี่ยน "ปี"
  const handleYearChange = (selectedYear: string) => {
    setY(selectedYear);
    const maxDays = getDaysInMonth(selectedYear, m);
    if (d && parseInt(d) > maxDays) {
      setDay(""); // ล้างวันทิ้งถ้าเดือนนั้นในทศวรรษ/ปีนั้นมีวันไม่ถึง
      setValue(name, "", { shouldValidate: true });
    }
  };

  // ✅ ฟังก์ชันจัดการเมื่อผู้ใช้เปลี่ยน "เดือน"
  const handleMonthChange = (selectedMonth: string) => {
    setM(selectedMonth);
    const maxDays = getDaysInMonth(y, selectedMonth);
    if (d && parseInt(d) > maxDays) {
      setDay(""); // ล้างวันทิ้งถ้าเดือนใหม่มีวันไม่ถึง
      setValue(name, "", { shouldValidate: true });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (d && m && y) {
      const monthIdx = (months.indexOf(m) + 1).toString().padStart(2, "0");
      const formattedDate = `${y}-${monthIdx}-${d.padStart(2, "0")}`;
      setValue(name, formattedDate, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [d, m, y, name, setValue]);

  const getDisplayText = () => {
    if (selectedValue) {
      return new Date(selectedValue).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    if (d || m || y)
      return `${d || "วัน"} ${m || "เดือน"} ${y ? parseInt(y) + 543 : "ปี"}`;
    return "เลือกวันเกิดของคุณ";
  };

  const getTriggerClass = () => {
    const base =
      "relative w-full pl-10 pr-10 p-3.5 border rounded-xl cursor-pointer flex items-center justify-between transition-all duration-300 select-none outline-none";

    if (error) {
      if (isOpen)
        return `${base} bg-white border-red-400 ring-4 ring-red-500/15 text-slate-800`;
      return `${base} bg-slate-50/50 border-red-400 text-slate-800`;
    } else {
      if (isOpen)
        return `${base} bg-white border-indigo-500 ring-4 ring-indigo-500/15 text-slate-800`;

      // ✅ ถ้าเลือกครบแล้ว: พื้นหลังสีฟ้าแบบ Autofill + ซ่อนขอบให้กลืนไปกับพื้นหลัง
      if (selectedValue || (d && m && y)) {
        return `${base} bg-[#e8f0fe] border-[#e8f0fe] text-slate-800`;
      }

      return `${base} bg-slate-50/50 border-slate-200 hover:border-slate-300 text-slate-800`;
    }
  };
  
  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <div onClick={() => setIsOpen(!isOpen)} className={getTriggerClass()}>
        <div
          className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${
            error
              ? "text-red-400"
              : isOpen || selectedValue || d || m || y
                ? "text-indigo-600"
                : "text-slate-400"
          }`}
        >
          <CalendarDays size={18} />
        </div>

        <span
          className={`block truncate ${!selectedValue && !d && !m && !y ? "text-slate-400" : "text-slate-800"}`}
        >
          {getDisplayText()}
        </span>

        <ChevronDown
          size={18}
          className={`transition-all duration-300 ${
            error
              ? "text-red-400"
              : isOpen
                ? "text-indigo-600"
                : "text-slate-400"
          } ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-[70] w-full mt-2 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-4">
            {/* กล่องเลือกปี */}
            <div className="grid grid-cols-4 gap-1 h-24 overflow-y-auto border-b pb-2 custom-scrollbar">
              {Array.from({ length: 100 }, (_, i) => currentYear - i).map(
                (year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => handleYearChange(year.toString())} // ✅ เรียกฟังก์ชันแก้บั๊ก
                    className={`text-xs p-1 rounded-lg transition-colors ${y === year.toString() ? "bg-indigo-600 text-white" : "hover:bg-slate-100 text-slate-700"}`}
                  >
                    {year + 543}
                  </button>
                ),
              )}
            </div>

            {/* กล่องเลือกเดือน */}
            <div className="grid grid-cols-4 gap-1 border-b pb-2">
              {months.map((month) => (
                <button
                  key={month}
                  type="button"
                  onClick={() => handleMonthChange(month)} // ✅ เรียกฟังก์ชันแก้บั๊ก
                  className={`text-xs p-1 rounded-lg transition-colors ${m === month ? "bg-indigo-600 text-white" : "hover:bg-slate-100 text-slate-700"}`}
                >
                  {month}
                </button>
              ))}
            </div>

            {/* กล่องเลือกวัน */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1).map(
                (day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => {
                      setDay(day.toString());
                      if (y && m) setIsOpen(false);
                    }}
                    className={`text-xs p-1 rounded-lg transition-colors ${d === day.toString() ? "bg-indigo-600 text-white" : "hover:bg-slate-100 text-slate-700"}`}
                  >
                    {day}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      )}
      <ErrorMsg message={error?.message} />
    </div>
  );
}
