"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { ErrorMsg } from "./ErrorMsg";
import { UseFormSetValue, FieldError } from "react-hook-form";
import { PatientInput } from "@/lib/validations";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  name: keyof PatientInput;
  options: SelectOption[];
  icon: LucideIcon;
  error?: FieldError;
  setValue: UseFormSetValue<PatientInput>;
  selectedValue?: string;
}

export function CustomSelect({
  label,
  name,
  options,
  icon: Icon,
  error,
  setValue,
  selectedValue,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ แก้ไข 1: ใช้ useMemo และ trim() ค่าเพื่อป้องกัน Type/Whitespace Mismatch
  const selectedOption = useMemo(() => {
    if (!selectedValue) return null;
    return options.find(
      (opt) => String(opt.value).trim() === String(selectedValue).trim(),
    );
  }, [selectedValue, options]);

  const handleSelect = (e: React.MouseEvent, val: string) => {
    e.preventDefault();
    e.stopPropagation(); // ✋ หยุดการคลิกไม่ให้ไปโดนตัวแม่

    setValue(name, val, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      {/* 🟢 ส่วนที่ 1: Trigger (ตัวกด) - แยกก้อนออกมาเดี่ยวๆ ไม่ซ้อนเมนูไว้ข้างในแล้ว */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-full pl-10 pr-10 p-3.5 border rounded-xl cursor-pointer flex items-center justify-between transition-all select-none ${
          isOpen
            ? "bg-white ring-4 ring-indigo-500/15 border-indigo-500 shadow-sm"
            : "bg-slate-50/50 border-slate-200"
        } ${error ? "border-red-400" : "hover:border-slate-300"}`}
      >
        <div
          className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none ${
            selectedValue ? "text-indigo-600" : "text-slate-400"
          }`}
        >
          <Icon size={18} />
        </div>

        {/* ✅ แสดง Label จาก selectedOption ที่หาเจอ */}
        <span
          className={`block truncate ${!selectedOption ? "text-slate-400" : "text-slate-800"}`}
        >
          {selectedOption ? selectedOption.label : "เลือกตัวเลือกของคุณ"}
        </span>

        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-indigo-600" : "text-slate-400"}`}
        />
      </div>

      {/* 🔵 ส่วนที่ 2: Dropdown Menu - วางเป็นพี่น้อง (Sibling) เพื่อไม่ให้ Event ตีกัน */}
      {isOpen && (
        <div
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-[100] bg-white border border-slate-100 rounded-2xl shadow-2xl p-1.5 animate-in fade-in slide-in-from-top-2 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {options.map((opt) => {
            // ✅ ตรวจสอบเงื่อนไขแบบเดียวกับที่ใช้หา selectedOption
            const isSelected =
              String(opt.value).trim() === String(selectedValue).trim();

            return (
              <div
                key={opt.value}
                onClick={(e) => handleSelect(e, opt.value)}
                className={`px-4 py-3 cursor-pointer rounded-xl transition-all flex items-center justify-between group ${
                  isSelected
                    ? "bg-indigo-50 text-indigo-700 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                }`}
              >
                {opt.label}
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.4)]" />
                )}
              </div>
            );
          })}
        </div>
      )}

      <ErrorMsg message={error?.message} />
    </div>
  );
}
