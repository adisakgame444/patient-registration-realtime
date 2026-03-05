"use client";

import { usePatientForm } from "@/hooks/usePatientForm";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Globe2,
  Languages,
  Smile,
  Loader2,
  CheckCircle2,
  Heart,
  Users,
} from "lucide-react";

import { InputField } from "@/components/ui/InputField";
import { CustomDatePicker } from "@/components/ui/CustomDatePicker";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { ErrorMsg } from "@/components/ui/ErrorMsg";

export default function PatientForm() {
  const {
    register,
    watchedFields, // ✅ ดึงค่าที่ watch มาจาก Hook
    setValue,
    handleSubmit,
    errors,
    isSubmitting,
    isSubmitSuccessful,
    filledCount,
    progressPercentage,
    requiredFields,
    onSubmit,
  } = usePatientForm();

  // ✅ ดึงค่าออกมาพักไว้เพื่อให้ UI วาดใหม่ทันทีที่เลือก
  const genderValue = watchedFields.gender;
  const dobValue = watchedFields.dob;

  if (isSubmitSuccessful) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100/50">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          ลงทะเบียนสำเร็จ!
        </h2>
        <p className="text-slate-500">
          ข้อมูลของคุณถูกส่งไปยังเจ้าหน้าที่เรียบร้อยแล้ว
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Registration Progress */}
      <div className="animate-in fade-in duration-700">
        <div className="flex justify-between items-end mb-3">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] block">
              Registration Progress
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {filledCount < requiredFields.length
                ? `กรอกอีก ${requiredFields.length - filledCount} ช่องเพื่อความสมบูรณ์`
                : "ข้อมูลครบถ้วนแล้ว"}
            </span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-slate-800">
              {Math.round(progressPercentage)}
            </span>
            <span className="text-xs font-bold text-slate-400 ml-0.5">%</span>
          </div>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-700"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField
            icon={User}
            label="ชื่อต้น *"
            name="firstName"
            register={register}
            error={errors.firstName}
            placeholder="ระบุชื่อจริง"
          />
          <InputField
            icon={Smile}
            label="ชื่อกลาง (ถ้ามี)"
            name="middleName"
            register={register}
            placeholder="ระบุชื่อกลาง"
          />
          <InputField
            icon={User}
            label="นามสกุล *"
            name="lastName"
            register={register}
            error={errors.lastName}
            placeholder="ระบุนามสกุล"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomDatePicker
            label="วัน/เดือน/ปี เกิด *"
            name="dob"
            setValue={setValue}
            selectedValue={dobValue} // ✅ ใช้ตัวแปรที่ดักไว้
            error={errors.dob}
          />
          <CustomSelect
            label="เพศ *"
            name="gender"
            options={[
              { value: "male", label: "ชาย (Male)" },
              { value: "female", label: "หญิง (Female)" },
              { value: "other", label: "อื่น ๆ (Other)" },
            ]}
            icon={User}
            error={errors.gender}
            setValue={setValue}
            selectedValue={genderValue} // ✅ ใช้ตัวแปรที่ดักไว้
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            icon={Phone}
            label="เบอร์โทรศัพท์ *"
            name="phone"
            register={register}
            error={errors.phone}
            placeholder="08XXXXXXXX"
          />
          <InputField
            icon={Mail}
            label="อีเมล *"
            name="email"
            type="email"
            register={register}
            error={errors.email}
            placeholder="example@mail.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            icon={Globe2}
            label="สัญชาติ *"
            name="nationality"
            register={register}
            error={errors.nationality}
            placeholder="เช่น Thai"
          />
          <InputField
            icon={Languages}
            label="ภาษาที่สะดวก *"
            name="preferredLanguage"
            register={register}
            error={errors.preferredLanguage}
            placeholder="เช่น ภาษาไทย"
          />

          {/* ✅ เปลี่ยนเป็นช่องบังคับตามที่คุณสั่ง */}
          <InputField
            icon={Heart}
            label="ศาสนา (ถ้ามี)"
            name="religion"
            register={register}
            error={errors.religion}
            placeholder="ระบุศาสนาของคุณ"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            ที่อยู่ปัจจุบัน *
          </label>
          <div className="relative group">
            <div className="absolute top-3.5 left-0 pl-3.5 flex items-start text-slate-400 group-focus-within:text-indigo-600 transition-colors">
              <MapPin size={18} />
            </div>
            <textarea
              {...register("address")}
              rows={3}
              className={`w-full pl-10 p-3 bg-slate-50/50 border rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/15 ${errors.address ? "border-red-400" : "border-slate-200"}`}
              placeholder="บ้านเลขที่, ซอย, ถนน..."
            />
          </div>
          <ErrorMsg message={errors.address?.message} />
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Users className="text-red-500" size={20} /> ผู้ติดต่อฉุกเฉิน *
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ✅ เติม * เพื่อให้ตรงกับกฎ 12 ข้อ */}
            <InputField
              icon={User}
              label="ชื่อ-นามสกุล ผู้ติดต่อ *"
              name="emergencyContactName"
              register={register}
              error={errors.emergencyContactName}
              placeholder="ระบุชื่อผู้ติดต่อฉุกเฉิน"
            />
            <InputField
              icon={Users}
              label="ความสัมพันธ์ *"
              name="emergencyRelationship"
              register={register}
              error={errors.emergencyRelationship}
              placeholder="ระบุความสัมพันธ์"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold shadow-xl disabled:opacity-70 transition-all active:scale-[0.98]"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            "ยืนยันการลงทะเบียน"
          )}
        </button>
      </form>
    </div>
  );
}
