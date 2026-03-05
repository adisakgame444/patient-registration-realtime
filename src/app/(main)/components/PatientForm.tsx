// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { patientSchema, PatientInput } from "@/lib/validations";
// import { useEffect, useMemo } from "react";
// import debounce from "lodash.debounce";

// export default function PatientForm() {
//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<PatientInput>({
//     resolver: zodResolver(patientSchema),
//     mode: "onChange",
//   });

//   // ฟังก์ชันสำหรับส่งข้อมูลไปยัง Staff View แบบ Real-time
//   const sendRealtimeUpdate = useMemo(
//     () =>
//       debounce(async (data: Partial<PatientInput>) => {
//         // ใช้ Partial เพราะช่วงที่พิมพ์ ข้อมูลอาจยังไม่ครบ
//         try {
//           await fetch("/api/pusher", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ data, status: "typing" }),
//           });
//         } catch (error) {
//           console.error("Failed to sync:", error);
//         }
//       }, 500),
//     [],
//   );

//   // ล้างคิวการทำงานเมื่อ Component หายไป
//   useEffect(() => {
//     return () => {
//       sendRealtimeUpdate.cancel();
//     };
//   }, [sendRealtimeUpdate]);

//   // ติดตามการเปลี่ยนแปลงของฟอร์ม (Watch)
//   useEffect(() => {
//     const subscription = watch((value) => {
//       sendRealtimeUpdate(value);
//     });
//     return () => subscription.unsubscribe();
//   }, [watch, sendRealtimeUpdate]);

//   const onSubmit = async (data: PatientInput) => {
//     // เมื่อกด Submit จะส่งสถานะ "submitted" ไปบอกเจ้าหน้าที่
//     await fetch("/api/pusher", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ data, status: "submitted" }),
//     });
//     alert("ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว!");
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       {/* Section 1: ชื่อ-นามสกุล */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">ชื่อต้น *</label>
//           <input
//             {...register("firstName")}
//             className={`w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? "border-red-500" : ""}`}
//             placeholder="First Name"
//           />
//           {errors.firstName && (
//             <p className="text-red-500 text-xs mt-1">
//               {errors.firstName.message}
//             </p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             ชื่อกลาง (ถ้ามี)
//           </label>
//           <input
//             {...register("middleName")}
//             className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Middle Name"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">นามสกุล *</label>
//           <input
//             {...register("lastName")}
//             className={`w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? "border-red-500" : ""}`}
//             placeholder="Last Name"
//           />
//           {errors.lastName && (
//             <p className="text-red-500 text-xs mt-1">
//               {errors.lastName.message}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Section 2: ข้อมูลส่วนตัว */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             วัน/เดือน/ปี เกิด *
//           </label>
//           <input
//             type="date"
//             {...register("dob")}
//             className={`w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 ${errors.dob ? "border-red-500" : ""}`}
//           />
//           {errors.dob && (
//             <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">เพศ *</label>
//           <select
//             {...register("gender")}
//             className={`w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 ${errors.gender ? "border-red-500" : ""}`}
//           >
//             <option value="">เลือกเพศ</option>
//             <option value="male">ชาย</option>
//             <option value="female">หญิง</option>
//             <option value="other">อื่น ๆ</option>
//           </select>
//           {errors.gender && (
//             <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
//           )}
//         </div>
//       </div>

//       {/* Section 3: การติดต่อ */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             เบอร์โทรศัพท์ *
//           </label>
//           <input
//             {...register("phone")}
//             className={`w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? "border-red-500" : ""}`}
//             placeholder="08xxxxxxxx"
//           />
//           {errors.phone && (
//             <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">อีเมล *</label>
//           <input
//             {...register("email")}
//             className={`w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : ""}`}
//             placeholder="example@mail.com"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
//           )}
//         </div>
//       </div>

//       {/* Section 4: ข้อมูลเพิ่มเติม (สัญชาติ & ภาษา) */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">สัญชาติ *</label>
//           <input
//             {...register("nationality")}
//             className={`w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 ${errors.nationality ? "border-red-500" : ""}`}
//             placeholder="เช่น Thai"
//           />
//           {errors.nationality && (
//             <p className="text-red-500 text-xs mt-1">
//               {errors.nationality.message}
//             </p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             ภาษาที่สะดวก *
//           </label>
//           <input
//             {...register("preferredLanguage")}
//             className={`w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 ${errors.preferredLanguage ? "border-red-500" : ""}`}
//             placeholder="เช่น ภาษาไทย"
//           />
//           {errors.preferredLanguage && (
//             <p className="text-red-500 text-xs mt-1">
//               {errors.preferredLanguage.message}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Section 5: ที่อยู่ */}
//       <div>
//         <label className="block text-sm font-medium mb-1">
//           ที่อยู่ปัจจุบัน *
//         </label>
//         <textarea
//           {...register("address")}
//           rows={3}
//           className={`w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 ${errors.address ? "border-red-500" : ""}`}
//           placeholder="บ้านเลขที่, ถนน, ตำบล..."
//         />
//         {errors.address && (
//           <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
//       >
//         ยืนยันการลงทะเบียน
//       </button>
//     </form>
//   );
// }

// "use client";

// import { useForm, UseFormRegister, FieldError } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { patientSchema, PatientInput } from "@/lib/validations";
// import { useEffect, useMemo } from "react";
// import debounce from "lodash.debounce";
// import {
//   User,
//   CalendarDays,
//   Phone,
//   Mail,
//   MapPin,
//   Globe2,
//   Languages,
//   Smile,
//   Loader2,
//   CheckCircle2,
// } from "lucide-react";

// export default function PatientForm() {
//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors, isSubmitting, isSubmitSuccessful },
//   } = useForm<PatientInput>({
//     resolver: zodResolver(patientSchema),
//     mode: "onChange",
//   });

//   // ฟังก์ชันสำหรับส่งข้อมูลแบบ Real-time
//   const sendRealtimeUpdate = useMemo(
//     () =>
//       debounce(async (data: Partial<PatientInput>) => {
//         try {
//           await fetch("/api/pusher", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ data, status: "typing" }),
//           });
//         } catch (error) {
//           console.error("Failed to sync:", error);
//         }
//       }, 500),
//     [],
//   );

//   useEffect(() => {
//     return () => {
//       sendRealtimeUpdate.cancel();
//     };
//   }, [sendRealtimeUpdate]);

//   useEffect(() => {
//     const subscription = watch((value) => {
//       sendRealtimeUpdate(value);
//     });
//     return () => subscription.unsubscribe();
//   }, [watch, sendRealtimeUpdate]);

//   const onSubmit = async (data: PatientInput) => {
//     await fetch("/api/pusher", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ data, status: "submitted" }),
//     });
//     // โชว์ Alert เสร็จแล้ว แนะนำให้ทำระบบ Redirect หรือเคลียร์ฟอร์มต่อในอนาคต
//     alert("ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว!");
//   };

//   if (isSubmitSuccessful) {
//     return (
//       <div className="flex flex-col items-center justify-center py-16 text-center animate-in zoom-in duration-500">
//         <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100/50">
//           <CheckCircle2 className="w-10 h-10 text-green-600" />
//         </div>
//         <h2 className="text-2xl font-bold text-slate-800 mb-2">
//           ลงทะเบียนสำเร็จ!
//         </h2>
//         <p className="text-slate-500">
//           ข้อมูลของคุณถูกส่งไปยังเจ้าหน้าที่เรียบร้อยแล้ว
//         </p>
//       </div>
//     );
//   }

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
//     >
//       {/* Section 1: ชื่อ-นามสกุล */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <InputField
//           icon={User}
//           label="ชื่อต้น *"
//           name="firstName"
//           register={register}
//           error={errors.firstName}
//           placeholder="ระบุชื่อจริง"
//         />
//         <InputField
//           icon={Smile}
//           label="ชื่อกลาง (ถ้ามี)"
//           name="middleName"
//           register={register}
//           placeholder="ระบุชื่อกลาง"
//         />
//         <InputField
//           icon={User}
//           label="นามสกุล *"
//           name="lastName"
//           register={register}
//           error={errors.lastName}
//           placeholder="ระบุนามสกุล"
//         />
//       </div>

//       <hr className="border-slate-100" />

//       {/* Section 2: ข้อมูลส่วนตัว */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <InputField
//           icon={CalendarDays}
//           label="วัน/เดือน/ปี เกิด *"
//           name="dob"
//           type="date"
//           register={register}
//           error={errors.dob}
//         />
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">
//             เพศ *
//           </label>
//           <div className="relative group">
//             <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300">
//               <User size={18} />
//             </div>
//             <select
//               {...register("gender")}
//               className={`w-full pl-10 p-3 bg-slate-50/50 border rounded-xl outline-none transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 cursor-pointer appearance-none ${
//                 errors.gender
//                   ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
//                   : "border-slate-200 hover:border-slate-300"
//               }`}
//             >
//               <option value="" disabled>
//                 เลือกเพศของคุณ
//               </option>
//               <option value="male">ชาย (Male)</option>
//               <option value="female">หญิง (Female)</option>
//               <option value="other">อื่น ๆ (Other)</option>
//             </select>
//             {/* Custom Dropdown Arrow */}
//             <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M19 9l-7 7-7-7"
//                 ></path>
//               </svg>
//             </div>
//           </div>
//           {errors.gender && <ErrorMsg message={errors.gender.message} />}
//         </div>
//       </div>

//       <hr className="border-slate-100" />

//       {/* Section 3: การติดต่อ */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <InputField
//           icon={Phone}
//           label="เบอร์โทรศัพท์ *"
//           name="phone"
//           register={register}
//           error={errors.phone}
//           placeholder="08XXXXXXXX"
//         />
//         <InputField
//           icon={Mail}
//           label="อีเมล *"
//           name="email"
//           type="email"
//           register={register}
//           error={errors.email}
//           placeholder="example@mail.com"
//         />
//       </div>

//       {/* Section 4: ข้อมูลเพิ่มเติม */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <InputField
//           icon={Globe2}
//           label="สัญชาติ *"
//           name="nationality"
//           register={register}
//           error={errors.nationality}
//           placeholder="เช่น Thai"
//         />
//         <InputField
//           icon={Languages}
//           label="ภาษาที่สะดวก *"
//           name="preferredLanguage"
//           register={register}
//           error={errors.preferredLanguage}
//           placeholder="เช่น ภาษาไทย"
//         />
//       </div>

//       <hr className="border-slate-100" />

//       {/* Section 5: ที่อยู่ */}
//       <div>
//         <label className="block text-sm font-semibold text-slate-700 mb-2">
//           ที่อยู่ปัจจุบัน *
//         </label>
//         <div className="relative group">
//           <div className="absolute top-3.5 left-0 pl-3.5 flex items-start pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300">
//             <MapPin size={18} />
//           </div>
//           <textarea
//             {...register("address")}
//             rows={3}
//             className={`w-full pl-10 p-3 bg-slate-50/50 border rounded-xl outline-none transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 resize-none ${
//               errors.address
//                 ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
//                 : "border-slate-200 hover:border-slate-300"
//             }`}
//             placeholder="บ้านเลขที่, ซอย, ถนน, ตำบล, อำเภอ, จังหวัด, รหัสไปรษณีย์..."
//           />
//         </div>
//         {errors.address && <ErrorMsg message={errors.address.message} />}
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="w-full relative overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg transition-all active:scale-[0.98] shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//       >
//         {/* Effect แสงวิ่งผ่านปุ่มเบาๆ */}
//         <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>

//         {isSubmitting ? (
//           <>
//             <Loader2 className="w-5 h-5 animate-spin" />
//             กำลังส่งข้อมูล...
//           </>
//         ) : (
//           "ยืนยันการลงทะเบียน"
//         )}
//       </button>
//     </form>
//   );
// }

// // --------------------------------------------------------
// // ✨ Reusable Components (พร้อมระบบ Icon อัจฉริยะ)
// // --------------------------------------------------------

// interface InputFieldProps {
//   label: string;
//   name: keyof PatientInput;
//   type?: string;
//   placeholder?: string;
//   register: UseFormRegister<PatientInput>;
//   error?: FieldError;
//   icon: React.ElementType; // รับ Icon จาก Lucide
// }

// function InputField({
//   label,
//   name,
//   type = "text",
//   placeholder,
//   register,
//   error,
//   icon: Icon,
// }: InputFieldProps) {
//   return (
//     <div>
//       <label className="block text-sm font-semibold text-slate-700 mb-2">
//         {label}
//       </label>
//       <div className="relative group">
//         {/* Icon Container */}
//         <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300">
//           <Icon size={18} />
//         </div>

//         {/* Input Field */}
//         <input
//           type={type}
//           placeholder={placeholder}
//           {...register(name)}
//           className={`w-full pl-10 p-3 bg-slate-50/50 border rounded-xl outline-none transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 text-slate-800 placeholder:text-slate-400 ${
//             error
//               ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
//               : "border-slate-200 hover:border-slate-300"
//           }`}
//         />
//       </div>
//       {error && <ErrorMsg message={error.message} />}
//     </div>
//   );
// }

// function ErrorMsg({ message }: { message?: string }) {
//   return (
//     <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200 font-medium">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 20 20"
//         fill="currentColor"
//         className="w-4 h-4 shrink-0"
//       >
//         <path
//           fillRule="evenodd"
//           d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
//           clipRule="evenodd"
//         />
//       </svg>
//       {message}
//     </p>
//   );
// }

// "use client";

// import {
//   useForm,
//   UseFormRegister,
//   FieldError,
//   UseFormSetValue,
// } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { patientSchema, PatientInput } from "@/lib/validations";
// import { useEffect, useMemo, useState, useRef } from "react";
// import debounce from "lodash.debounce";
// import {
//   User,
//   CalendarDays,
//   Phone,
//   Mail,
//   MapPin,
//   Globe2,
//   Languages,
//   Smile,
//   Loader2,
//   CheckCircle2,
//   ChevronDown,
// } from "lucide-react";

// export default function PatientForm() {
//   const {
//     register,
//     watch,
//     setValue, // ดึง setValue มาใช้สำหรับ Custom Dropdown
//     handleSubmit,
//     formState: { errors, isSubmitting, isSubmitSuccessful },
//   } = useForm<PatientInput>({
//     resolver: zodResolver(patientSchema),
//     mode: "onChange",
//   });

//   const sendRealtimeUpdate = useMemo(
//     () =>
//       debounce(async (data: Partial<PatientInput>) => {
//         try {
//           await fetch("/api/pusher", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ data, status: "typing" }),
//           });
//         } catch (error) {
//           console.error("Failed to sync:", error);
//         }
//       }, 500),
//     [],
//   );

//   useEffect(() => {
//     return () => {
//       sendRealtimeUpdate.cancel();
//     };
//   }, [sendRealtimeUpdate]);

//   useEffect(() => {
//     const subscription = watch((value) => {
//       sendRealtimeUpdate(value);
//     });
//     return () => subscription.unsubscribe();
//   }, [watch, sendRealtimeUpdate]);

//   const onSubmit = async (data: PatientInput) => {
//     await fetch("/api/pusher", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ data, status: "submitted" }),
//     });
//     alert("ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว!");
//   };

//   if (isSubmitSuccessful) {
//     return (
//       <div className="flex flex-col items-center justify-center py-16 text-center animate-in zoom-in duration-500">
//         <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100/50">
//           <CheckCircle2 className="w-10 h-10 text-green-600" />
//         </div>
//         <h2 className="text-2xl font-bold text-slate-800 mb-2">
//           ลงทะเบียนสำเร็จ!
//         </h2>
//         <p className="text-slate-500">
//           ข้อมูลของคุณถูกส่งไปยังเจ้าหน้าที่เรียบร้อยแล้ว
//         </p>
//       </div>
//     );
//   }

//   // ตัวเลือกสำหรับเพศ
//   const genderOptions = [
//     { value: "male", label: "ชาย (Male)" },
//     { value: "female", label: "หญิง (Female)" },
//     { value: "other", label: "อื่น ๆ (Other)" },
//   ];

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
//     >
//       {/* Section 1: ชื่อ-นามสกุล */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <InputField
//           icon={User}
//           label="ชื่อต้น *"
//           name="firstName"
//           register={register}
//           error={errors.firstName}
//           placeholder="ระบุชื่อจริง"
//         />
//         <InputField
//           icon={Smile}
//           label="ชื่อกลาง (ถ้ามี)"
//           name="middleName"
//           register={register}
//           placeholder="ระบุชื่อกลาง"
//         />
//         <InputField
//           icon={User}
//           label="นามสกุล *"
//           name="lastName"
//           register={register}
//           error={errors.lastName}
//           placeholder="ระบุนามสกุล"
//         />
//       </div>

//       <hr className="border-slate-100" />

//       {/* Section 2: ข้อมูลส่วนตัว */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <DateInputField
//           icon={CalendarDays}
//           label="วัน/เดือน/ปี เกิด *"
//           name="dob"
//           register={register}
//           error={errors.dob}
//         />

//         {/* Custom Dropdown สำหรับเพศ (สวยงามทุกอุปกรณ์) */}
//         <CustomSelect
//           label="เพศ *"
//           name="gender"
//           options={genderOptions}
//           icon={User}
//           error={errors.gender}
//           setValue={setValue}
//           //   watch={watch}
//           selectedValue={watch("gender")} // <--- แก้บรรทัดนี้บรรทัดเดียว!
//         />
//       </div>

//       <hr className="border-slate-100" />

//       {/* Section 3: การติดต่อ */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <InputField
//           icon={Phone}
//           label="เบอร์โทรศัพท์ *"
//           name="phone"
//           register={register}
//           error={errors.phone}
//           placeholder="08XXXXXXXX"
//         />
//         <InputField
//           icon={Mail}
//           label="อีเมล *"
//           name="email"
//           type="email"
//           register={register}
//           error={errors.email}
//           placeholder="example@mail.com"
//         />
//       </div>

//       {/* Section 4: ข้อมูลเพิ่มเติม */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <InputField
//           icon={Globe2}
//           label="สัญชาติ *"
//           name="nationality"
//           register={register}
//           error={errors.nationality}
//           placeholder="เช่น Thai"
//         />
//         <InputField
//           icon={Languages}
//           label="ภาษาที่สะดวก *"
//           name="preferredLanguage"
//           register={register}
//           error={errors.preferredLanguage}
//           placeholder="เช่น ภาษาไทย"
//         />
//       </div>

//       <hr className="border-slate-100" />

//       {/* Section 5: ที่อยู่ */}
//       <div>
//         <label className="block text-sm font-semibold text-slate-700 mb-2">
//           ที่อยู่ปัจจุบัน *
//         </label>
//         <div className="relative group">
//           <div className="absolute top-3.5 left-0 pl-3.5 flex items-start pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300">
//             <MapPin size={18} />
//           </div>
//           <textarea
//             {...register("address")}
//             rows={3}
//             className={`w-full pl-10 p-3 bg-slate-50/50 border rounded-xl outline-none transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 resize-none ${
//               errors.address
//                 ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
//                 : "border-slate-200 hover:border-slate-300"
//             }`}
//             placeholder="บ้านเลขที่, ซอย, ถนน, ตำบล, อำเภอ, จังหวัด, รหัสไปรษณีย์..."
//           />
//         </div>
//         {errors.address && <ErrorMsg message={errors.address.message} />}
//       </div>

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="w-full relative overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg transition-all active:scale-[0.98] shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//       >
//         <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
//         {isSubmitting ? (
//           <>
//             <Loader2 className="w-5 h-5 animate-spin" />
//             กำลังส่งข้อมูล...
//           </>
//         ) : (
//           "ยืนยันการลงทะเบียน"
//         )}
//       </button>
//     </form>
//   );
// }

// // --------------------------------------------------------
// // ✨ Reusable Components
// // --------------------------------------------------------

// interface InputFieldProps {
//   label: string;
//   name: keyof PatientInput;
//   type?: string;
//   placeholder?: string;
//   register: UseFormRegister<PatientInput>;
//   error?: FieldError;
//   icon: React.ElementType;
// }

// function InputField({
//   label,
//   name,
//   type = "text",
//   placeholder,
//   register,
//   error,
//   icon: Icon,
// }: InputFieldProps) {
//   return (
//     <div>
//       <label className="block text-sm font-semibold text-slate-700 mb-2">
//         {label}
//       </label>
//       <div className="relative group">
//         <div
//           className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors duration-300 ${error ? "text-red-400" : "text-slate-400 group-focus-within:text-indigo-600"}`}
//         >
//           <Icon size={18} />
//         </div>
//         <input
//           type={type}
//           placeholder={placeholder}
//           {...register(name)}
//           className={`w-full pl-10 p-3 bg-slate-50/50 border rounded-xl outline-none transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 text-slate-800 placeholder:text-slate-400 ${
//             error
//               ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
//               : "border-slate-200 hover:border-slate-300"
//           }`}
//         />
//       </div>
//       {error && <ErrorMsg message={error.message} />}
//     </div>
//   );
// }

// // --------------------------------------------------------
// // 👑 Custom Select Component (อัปเกรด ไร้บั๊กเงียบ 100%)
// // --------------------------------------------------------
// interface CustomSelectProps {
//   label: string;
//   name: keyof PatientInput;
//   options: { value: string; label: string }[];
//   icon: React.ElementType;
//   error?: FieldError;
//   setValue: UseFormSetValue<PatientInput>;
//   selectedValue?: string;
// }

// function CustomSelect({
//   label,
//   name,
//   options,
//   icon: Icon,
//   error,
//   setValue,
//   selectedValue,
// }: CustomSelectProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const selectedOption = options.find((opt) => opt.value === selectedValue);

//   // 1. ปิดเมื่อคลิกข้างนอก (ใช้ mousedown จะไวกว่า click และลดบั๊ก)
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // 2. ฟังก์ชันเลือก: ต้องหยุด Event ไม่ให้เด้งไปหาตัวแม่ และบังคับปิดทันที
//   const handleSelect = (value: string, e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation(); // หยุดการส่ง Event ต่อ (ป้องกันบั๊กไม่หุบ)

//     setValue(name, value, { shouldValidate: true });
//     setIsOpen(false); // บังคับปิดสถานะ
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <label className="block text-sm font-semibold text-slate-700 mb-2">
//         {label}
//       </label>

//       {/* ปุ่มกดหลัก */}
//       <div
//         onClick={(e) => {
//           e.stopPropagation(); // ป้องกัน Event ตีกับข้างนอก
//           setIsOpen(!isOpen);
//         }}
//         className={`relative w-full pl-10 pr-10 p-3.5 border rounded-xl outline-none transition-all duration-300 cursor-pointer flex items-center justify-between select-none ${
//           isOpen
//             ? "bg-white ring-4 ring-indigo-500/15 border-indigo-500 shadow-sm"
//             : "bg-slate-50/50 hover:border-slate-300 border-slate-200"
//         } ${error ? "border-red-400 ring-red-500/15" : ""}`}
//       >
//         <div
//           className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none ${
//             error
//               ? "text-red-400"
//               : isOpen || selectedValue
//                 ? "text-indigo-600"
//                 : "text-slate-400"
//           }`}
//         >
//           <Icon size={18} />
//         </div>

//         <span
//           className={`block truncate font-medium ${!selectedOption ? "text-slate-400" : "text-slate-800"}`}
//         >
//           {selectedOption ? selectedOption.label : "เลือกเพศของคุณ"}
//         </span>

//         <div
//           className={`absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none transition-transform duration-300 ${isOpen ? "rotate-180 text-indigo-600" : "text-slate-400"}`}
//         >
//           <ChevronDown size={18} />
//         </div>
//       </div>

//       {/* เมนูตัวเลือก */}
//       {isOpen && (
//         <div className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl shadow-2xl p-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
//           {options.map((option) => (
//             <div
//               key={option.value}
//               onClick={(e) => handleSelect(option.value, e)} // ใช้ handleSelect ที่เราแก้ใหม่
//               className={`px-4 py-3.5 cursor-pointer rounded-xl transition-all flex items-center gap-2 mb-1 last:mb-0 select-none ${
//                 selectedValue === option.value
//                   ? "bg-indigo-50 text-indigo-700 font-bold"
//                   : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600 active:bg-slate-100"
//               }`}
//             >
//               {option.label}
//               {selectedValue === option.value && (
//                 <CheckCircle2 size={18} className="ml-auto text-indigo-600" />
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {error && <ErrorMsg message={error.message} />}
//     </div>
//   );
// }
// function ErrorMsg({ message }: { message?: string }) {
//   return (
//     <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200 font-medium">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 20 20"
//         fill="currentColor"
//         className="w-4 h-4 shrink-0"
//       >
//         <path
//           fillRule="evenodd"
//           d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
//           clipRule="evenodd"
//         />
//       </svg>
//       {message}
//     </p>
//   );
// }

// // --------------------------------------------------------
// // 📅 Date Input Component (ฉบับแก้ลอจิกการกดให้สมูทที่สุด)
// // --------------------------------------------------------
// function DateInputField({
//   label,
//   name,
//   register,
//   error,
//   icon: Icon,
// }: InputFieldProps) {
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const { ref, ...rest } = register(name);

//   const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
//     // ถ้าตัวเลือกเปิดอยู่แล้ว (โฟกัสอยู่) การกดซ้ำต้องทำให้มัน "หุบ"
//     if (document.activeElement === e.currentTarget) {
//       e.currentTarget.blur();
//     }
//   };

//   return (
//     <div className="flex flex-col w-full">
//       <label className="block text-sm font-semibold text-slate-700 mb-2">
//         {label}
//       </label>

//       <div className="relative h-[54px] group flex items-center">
//         <div
//           className={`absolute left-3.5 z-10 pointer-events-none transition-colors duration-300 ${
//             error
//               ? "text-red-400"
//               : "text-slate-400 group-focus-within:text-indigo-600"
//           }`}
//         >
//           <Icon size={18} />
//         </div>

//         <input
//           type="date"
//           {...rest}
//           ref={(e) => {
//             ref(e);
//             inputRef.current = e;
//           }}
//           onClick={handleInputClick} // ใช้ฟังก์ชันเช็คเพื่อสั่ง "หุบ"
//           className={`
//             absolute inset-0 w-full h-full pl-10 pr-10 bg-slate-50/50 border rounded-xl
//             outline-none transition-all duration-300 cursor-pointer
//             focus:bg-white focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500
//             text-slate-800 font-medium
//             [&::-webkit-calendar-picker-indicator]:absolute
//             [&::-webkit-calendar-picker-indicator]:inset-0
//             [&::-webkit-calendar-picker-indicator]:w-full
//             [&::-webkit-calendar-picker-indicator]:h-full
//             [&::-webkit-calendar-picker-indicator]:opacity-0
//             [&::-webkit-calendar-picker-indicator]:cursor-pointer
//             ${error ? "border-red-400 focus:border-red-500" : "border-slate-200 hover:border-slate-300"}
//           `}
//         />

//         <div
//           className={`absolute right-3.5 pointer-events-none transition-colors duration-300 ${
//             error
//               ? "text-red-400"
//               : "text-slate-400 group-focus-within:text-indigo-600"
//           }`}
//         >
//           <CalendarDays size={18} />
//         </div>
//       </div>
//       {error && <ErrorMsg message={error.message} />}
//     </div>
//   );
// }

// "use client";

// import {
//   useForm,
//   UseFormRegister,
//   FieldError,
//   UseFormSetValue,
// } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { patientSchema, PatientInput } from "@/lib/validations";
// import { useEffect, useMemo, useState, useRef } from "react";
// import debounce from "lodash.debounce";
// import {
//   User,
//   CalendarDays,
//   Phone,
//   Mail,
//   MapPin,
//   Globe2,
//   Languages,
//   Smile,
//   Loader2,
//   CheckCircle2,
//   ChevronDown,
//   Heart,
//   Users,
// } from "lucide-react";

// export default function PatientForm() {
//   const {
//     register,
//     watch,
//     setValue,
//     handleSubmit,
//     formState: { errors, isSubmitting, isSubmitSuccessful },
//   } = useForm<PatientInput>({
//     resolver: zodResolver(patientSchema),
//     mode: "onChange",
//   });

//   const watchedFields = watch();
//   // รายการ Field ทั้งหมดที่ต้องการใช้วัดผล (รวม 9 ฟิลด์)
//   const requiredFields: (keyof PatientInput)[] = [
//     "firstName",
//     "lastName",
//     "dob",
//     "gender",
//     "phone",
//     "email",
//     "nationality",
//     "preferredLanguage",
//     "address",
//   ];

//   // นับช่องที่มีข้อมูล (ไม่เป็นค่าว่าง)
//   const filledCount = requiredFields.filter((field) => {
//     const value = watchedFields[field];
//     return value !== undefined && value !== "" && value !== null;
//   }).length;

//   // แปลงเป็นเปอร์เซ็นต์
//   const progressPercentage = (filledCount / requiredFields.length) * 100;

//   const sendRealtimeUpdate = useMemo(
//     () =>
//       debounce(async (data: Partial<PatientInput>) => {
//         try {
//           await fetch("/api/pusher", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ data, status: "typing" }),
//           });
//         } catch (error) {
//           console.error("Failed to sync:", error);
//         }
//       }, 500),
//     [],
//   );

//   useEffect(() => {
//     return () => sendRealtimeUpdate.cancel();
//   }, [sendRealtimeUpdate]);

//   useEffect(() => {
//     const subscription = watch((value) => sendRealtimeUpdate(value));
//     return () => subscription.unsubscribe();
//   }, [watch, sendRealtimeUpdate]);

//   const onSubmit = async (data: PatientInput) => {
//     await fetch("/api/pusher", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ data, status: "submitted" }),
//     });
//     alert("ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว!");
//   };

//   if (isSubmitSuccessful) {
//     return (
//       <div className="flex flex-col items-center justify-center py-16 text-center animate-in zoom-in duration-500">
//         <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100/50">
//           <CheckCircle2 className="w-10 h-10 text-green-600" />
//         </div>
//         <h2 className="text-2xl font-bold text-slate-800 mb-2">
//           ลงทะเบียนสำเร็จ!
//         </h2>
//         <p className="text-slate-500">
//           ข้อมูลของคุณถูกส่งไปยังเจ้าหน้าที่เรียบร้อยแล้ว
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-10">
//       {/* 🚀 วางแถบ Progress Stepper ตรงนี้ (ก่อนเริ่มฟอร์ม) */}
//       <div className="animate-in fade-in duration-700">
//         <div className="flex justify-between items-end mb-3">
//           <div className="space-y-1">
//             <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] block">
//               Registration Progress
//             </span>
//             <span className="text-xs text-slate-400 font-medium">
//               {filledCount < requiredFields.length
//                 ? `กรอกอีก ${requiredFields.length - filledCount} ช่องเพื่อความสมบูรณ์`
//                 : "ข้อมูลครบถ้วนแล้ว"}
//             </span>
//           </div>
//           <div className="text-right">
//             <span className="text-2xl font-black text-slate-800 leading-none">
//               {Math.round(progressPercentage)}
//             </span>
//             <span className="text-xs font-bold text-slate-400 ml-0.5">%</span>
//           </div>
//         </div>

//         <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
//           <div
//             className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(79,70,229,0.3)]"
//             style={{ width: `${progressPercentage}%` }}
//           />
//         </div>
//       </div>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <InputField
//             icon={User}
//             label="ชื่อต้น *"
//             name="firstName"
//             register={register}
//             error={errors.firstName}
//             placeholder="ระบุชื่อจริง"
//           />

//           <InputField
//             icon={Smile}
//             label="ชื่อกลาง (ถ้ามี)"
//             name="middleName"
//             register={register}
//             placeholder="ระบุชื่อกลาง"
//           />

//           <InputField
//             icon={User}
//             label="นามสกุล *"
//             name="lastName"
//             register={register}
//             error={errors.lastName}
//             placeholder="ระบุนามสกุล"
//           />
//         </div>

//         <hr className="border-slate-100" />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <CustomDatePicker
//             label="วัน/เดือน/ปี เกิด *"
//             name="dob"
//             setValue={setValue}
//             selectedValue={watch("dob")}
//             error={errors.dob}
//           />

//           <CustomSelect
//             label="เพศ *"
//             name="gender"
//             options={[
//               { value: "male", label: "ชาย (Male)" },

//               { value: "female", label: "หญิง (Female)" },

//               { value: "other", label: "อื่น ๆ (Other)" },
//             ]}
//             icon={User}
//             error={errors.gender}
//             setValue={setValue}
//             selectedValue={watch("gender")}
//           />
//         </div>

//         <hr className="border-slate-100" />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <InputField
//             icon={Phone}
//             label="เบอร์โทรศัพท์ *"
//             name="phone"
//             register={register}
//             error={errors.phone}
//             placeholder="08XXXXXXXX"
//           />

//           <InputField
//             icon={Mail}
//             label="อีเมล *"
//             name="email"
//             type="email"
//             register={register}
//             error={errors.email}
//             placeholder="example@mail.com"
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <InputField
//             icon={Globe2}
//             label="สัญชาติ *"
//             name="nationality"
//             register={register}
//             error={errors.nationality}
//             placeholder="เช่น Thai"
//           />

//           <InputField
//             icon={Languages}
//             label="ภาษาที่สะดวก *"
//             name="preferredLanguage"
//             register={register}
//             error={errors.preferredLanguage}
//             placeholder="เช่น ภาษาไทย"
//           />

//           <InputField
//             icon={Heart}
//             label="ศาสนา (ถ้ามี)"
//             name="religion"
//             register={register}
//             placeholder="เช่น พุทธ, คริสต์, อิสลาม"
//           />
//         </div>

//         <hr className="border-slate-100" />

//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">
//             ที่อยู่ปัจจุบัน *
//           </label>

//           <div className="relative group">
//             <div className="absolute top-3.5 left-0 pl-3.5 flex items-start pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300">
//               <MapPin size={18} />
//             </div>

//             <textarea
//               {...register("address")}
//               rows={3}
//               className={`w-full pl-10 p-3 bg-slate-50/50 border rounded-xl outline-none transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 resize-none ${errors.address ? "border-red-400 focus:border-red-500" : "border-slate-200 hover:border-slate-300"}`}
//               placeholder="บ้านเลขที่, ซอย, ถนน, ตำบล, อำเภอ, จังหวัด, รหัสไปรษณีย์..."
//             />
//           </div>

//           {errors.address && <ErrorMsg message={errors.address.message} />}
//         </div>

//         <hr className="border-slate-100" />
//         <div>
//           <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
//             <Users className="text-red-500" size={20} />
//             ผู้ติดต่อฉุกเฉิน <span className="text-slate-400 text-sm font-normal">(ไม่บังคับ)</span>
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <InputField
//               icon={User}
//               label="ชื่อ-นามสกุล ผู้ติดต่อ"
//               name="emergencyContactName"
//               register={register}
//               placeholder="ระบุชื่อผู้ที่สามารถติดต่อได้"
//             />
//             <InputField
//               icon={Users}
//               label="ความสัมพันธ์"
//               name="emergencyRelationship"
//               register={register}
//               placeholder="เช่น บิดา, มารดา, พี่, น้อง"
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full relative overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl disabled:opacity-70 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
//         >
//           <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>

//           {isSubmitting ? (
//             <Loader2 className="w-5 h-5 animate-spin" />
//           ) : (
//             "ยืนยันการลงทะเบียน"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// }

// // --- Interfaces (No any here) ---

// interface InputFieldProps {
//   label: string;
//   name: keyof PatientInput;
//   type?: string;
//   placeholder?: string;
//   register: UseFormRegister<PatientInput>;
//   error?: FieldError;
//   icon: React.ElementType;
// }

// interface CustomDatePickerProps {
//   label: string;
//   name: keyof PatientInput;
//   setValue: UseFormSetValue<PatientInput>;
//   selectedValue?: string;
//   error?: FieldError;
// }

// interface CustomSelectProps {
//   label: string;
//   name: keyof PatientInput;
//   options: { value: string; label: string }[];
//   icon: React.ElementType;
//   error?: FieldError;
//   setValue: UseFormSetValue<PatientInput>;
//   selectedValue?: string;
// }

// // --- Components (Strict Types) ---

// function CustomDatePicker({
//   label,
//   name,
//   setValue,
//   selectedValue,
//   error,
// }: CustomDatePickerProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const [d, setDay] = useState("");
//   const [m, setM] = useState("");
//   const [y, setY] = useState("");

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
//       setValue(name, `${y}-${monthIdx}-${d.padStart(2, "0")}`, {
//         shouldValidate: true,
//       });
//     }
//   }, [d, m, y, setValue, name]);

//   return (
//     <div className="relative" ref={containerRef}>
//       <label className="block text-sm font-semibold text-slate-700 mb-2">
//         {label}
//       </label>
//       <div
//         onMouseDown={(e) => {
//           e.preventDefault();
//           setIsOpen(!isOpen);
//         }}
//         className={`relative w-full pl-10 pr-10 p-3.5 border rounded-xl cursor-pointer flex items-center justify-between transition-all select-none ${isOpen ? "bg-white ring-4 ring-indigo-500/15 border-indigo-500 shadow-sm" : "bg-slate-50/50 border-slate-200"} ${error ? "border-red-400 focus:border-red-500 focus:ring-red-500/15" : ""}`}
//       >
//         <div
//           className={`absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 ${isOpen || selectedValue ? "text-indigo-600" : ""}`}
//         >
//           <CalendarDays size={18} />
//         </div>
//         <span
//           className={`block truncate ${!selectedValue ? "text-slate-400" : "text-slate-800"}`}
//         >
//           {selectedValue
//             ? new Date(selectedValue).toLocaleDateString("th-TH", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })
//             : "เลือกวันเกิดของคุณ"}
//         </span>
//         <ChevronDown
//           size={18}
//           className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-indigo-600" : "text-slate-400"}`}
//         />
//       </div>

//       {isOpen && (
//         <div className="absolute z-[70] w-full mt-2 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[400px] overflow-y-auto">
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
//       {error && <ErrorMsg message={error.message} />}
//     </div>
//   );
// }

// function CustomSelect({
//   label,
//   name,
//   options,
//   icon: Icon,
//   error,
//   setValue,
//   selectedValue,
// }: CustomSelectProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const selectedOption = options.find((opt) => opt.value === selectedValue);

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target as Node)
//       )
//         setIsOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <label className="block text-sm font-semibold text-slate-700 mb-2">
//         {label}
//       </label>
//       <div
//         onMouseDown={(e) => {
//           e.preventDefault();
//           setIsOpen(!isOpen);
//         }}
//         className={`relative w-full pl-10 pr-10 p-3.5 border rounded-xl cursor-pointer flex items-center justify-between transition-all select-none ${isOpen ? "bg-white ring-4 ring-indigo-500/15 border-indigo-500 shadow-sm" : "bg-slate-50/50 border-slate-200"} ${error ? "border-red-400 focus:border-red-500 focus:ring-red-500/15" : ""}`}
//       >
//         <div
//           className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none ${isOpen || selectedValue ? "text-indigo-600" : "text-slate-400"}`}
//         >
//           <Icon size={18} />
//         </div>
//         <span
//           className={`block truncate ${!selectedOption ? "text-slate-400" : "text-slate-800"}`}
//         >
//           {selectedOption ? selectedOption.label : "เลือกเพศของคุณ"}
//         </span>
//         <ChevronDown
//           size={18}
//           className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-indigo-600" : "text-slate-400"}`}
//         />
//       </div>
//       {isOpen && (
//         <div className="absolute z-[60] w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl p-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
//           {options.map((opt) => (
//             <div
//               key={opt.value}
//               onMouseDown={(e) => {
//                 e.preventDefault();
//                 setValue(name, opt.value, { shouldValidate: true });
//                 setIsOpen(false);
//               }}
//               className={`px-4 py-3.5 cursor-pointer rounded-xl transition-all flex items-center gap-2 ${selectedValue === opt.value ? "bg-indigo-50 text-indigo-700 font-bold" : "text-slate-600 hover:bg-slate-50"}`}
//             >
//               {opt.label}
//               {selectedValue === opt.value && (
//                 <CheckCircle2 size={18} className="ml-auto text-indigo-600" />
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//       {error && <ErrorMsg message={error.message} />}
//     </div>
//   );
// }

// function InputField({
//   label,
//   name,
//   type = "text",
//   placeholder,
//   register,
//   error,
//   icon: Icon,
// }: InputFieldProps) {
//   return (
//     <div>
//       <label className="block text-sm font-semibold text-slate-700 mb-2">
//         {label}
//       </label>
//       <div className="relative group">
//         <div
//           className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${error ? "text-red-400" : "text-slate-400 group-focus-within:text-indigo-600"}`}
//         >
//           <Icon size={18} />
//         </div>
//         <input
//           type={type}
//           placeholder={placeholder}
//           {...register(name)}
//           className={`w-full pl-10 p-3 bg-slate-50/50 border rounded-xl outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/15 text-slate-800 ${error ? "border-red-400 focus:border-red-500 focus:ring-red-500/15" : "border-slate-200 hover:border-slate-300"}`}
//         />
//       </div>
//       {error && <ErrorMsg message={error.message} />}
//     </div>
//   );
// }

// function ErrorMsg({ message }: { message?: string }) {
//   return (
//     <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 font-medium">
//       <CheckCircle2 size={12} className="rotate-180" /> {message}
//     </p>
//   );
// }

// "use client";

// import { usePatientForm } from "@/hooks/usePatientForm";
// import {
//   User,
//   Phone,
//   Mail,
//   MapPin,
//   Globe2,
//   Languages,
//   Smile,
//   Loader2,
//   CheckCircle2,
//   Heart,
//   Users,
// } from "lucide-react";

// // นำเข้าชิ้นส่วน UI จากโฟลเดอร์กลาง
// import { InputField } from "@/components/ui/InputField";
// import { CustomDatePicker } from "@/components/ui/CustomDatePicker";
// import { CustomSelect } from "@/components/ui/CustomSelect";
// import { ErrorMsg } from "@/components/ui/ErrorMsg";

// export default function PatientForm() {
//   const {
//     register,
//     watch,
//     setValue,
//     handleSubmit,
//     errors,
//     isSubmitting,
//     isSubmitSuccessful,
//     filledCount,
//     progressPercentage,
//     requiredFields,
//     onSubmit,
//   } = usePatientForm();

//   const genderValue = watch("gender");

//   if (isSubmitSuccessful) {
//     return (
//       <div className="flex flex-col items-center justify-center py-16 text-center animate-in zoom-in duration-500">
//         <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100/50">
//           <CheckCircle2 className="w-10 h-10 text-green-600" />
//         </div>
//         <h2 className="text-2xl font-bold text-slate-800 mb-2">
//           ลงทะเบียนสำเร็จ!
//         </h2>
//         <p className="text-slate-500">
//           ข้อมูลของคุณถูกส่งไปยังเจ้าหน้าที่เรียบร้อยแล้ว
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-10">
//       {/* Registration Progress */}
//       <div className="animate-in fade-in duration-700">
//         <div className="flex justify-between items-end mb-3">
//           <div className="space-y-1">
//             <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] block">
//               Registration Progress
//             </span>
//             <span className="text-xs text-slate-400 font-medium">
//               {filledCount < requiredFields.length
//                 ? `กรอกอีก ${requiredFields.length - filledCount} ช่องเพื่อความสมบูรณ์`
//                 : "ข้อมูลครบถ้วนแล้ว"}
//             </span>
//           </div>
//           <div className="text-right">
//             <span className="text-2xl font-black text-slate-800">
//               {Math.round(progressPercentage)}
//             </span>
//             <span className="text-xs font-bold text-slate-400 ml-0.5">%</span>
//           </div>
//         </div>
//         <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-700"
//             style={{ width: `${progressPercentage}%` }}
//           />
//         </div>
//       </div>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <InputField
//             icon={User}
//             label="ชื่อต้น *"
//             name="firstName"
//             register={register}
//             error={errors.firstName}
//             placeholder="ระบุชื่อจริง"
//           />
//           <InputField
//             icon={Smile}
//             label="ชื่อกลาง (ถ้ามี)"
//             name="middleName"
//             register={register}
//             placeholder="ระบุชื่อกลาง"
//           />
//           <InputField
//             icon={User}
//             label="นามสกุล *"
//             name="lastName"
//             register={register}
//             error={errors.lastName}
//             placeholder="ระบุนามสกุล"
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <CustomDatePicker
//             label="วัน/เดือน/ปี เกิด *"
//             name="dob"
//             setValue={setValue}
//             selectedValue={watch("dob")}
//             error={errors.dob}
//           />
//           <CustomSelect
//             label="เพศ *"
//             name="gender"
//             options={[
//               { value: "male", label: "ชาย (Male)" },
//               { value: "female", label: "หญิง (Female)" },
//               { value: "other", label: "อื่น ๆ (Other)" },
//             ]}
//             icon={User}
//             error={errors.gender}
//             setValue={setValue}
//             selectedValue={genderValue}
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <InputField
//             icon={Phone}
//             label="เบอร์โทรศัพท์ *"
//             name="phone"
//             register={register}
//             error={errors.phone}
//             placeholder="08XXXXXXXX"
//           />
//           <InputField
//             icon={Mail}
//             label="อีเมล *"
//             name="email"
//             type="email"
//             register={register}
//             error={errors.email}
//             placeholder="example@mail.com"
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <InputField
//             icon={Globe2}
//             label="สัญชาติ *"
//             name="nationality"
//             register={register}
//             error={errors.nationality}
//             placeholder="เช่น Thai"
//           />
//           <InputField
//             icon={Languages}
//             label="ภาษาที่สะดวก *"
//             name="preferredLanguage"
//             register={register}
//             error={errors.preferredLanguage}
//             placeholder="เช่น ภาษาไทย"
//           />
//           <InputField
//             icon={Heart}
//             label="ศาสนา (ถ้ามี)"
//             name="religion"
//             register={register}
//             placeholder="เช่น พุทธ, คริสต์, อิสลาม"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">
//             ที่อยู่ปัจจุบัน *
//           </label>
//           <div className="relative group">
//             <div className="absolute top-3.5 left-0 pl-3.5 flex items-start text-slate-400 group-focus-within:text-indigo-600 transition-colors">
//               <MapPin size={18} />
//             </div>
//             <textarea
//               {...register("address")}
//               rows={3}
//               className={`w-full pl-10 p-3 bg-slate-50/50 border rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/15 ${errors.address ? "border-red-400" : "border-slate-200"}`}
//               placeholder="บ้านเลขที่, ซอย, ถนน..."
//             />
//           </div>
//           <ErrorMsg message={errors.address?.message} />
//         </div>

//         <div className="pt-4 border-t border-slate-100">
//           <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
//             <Users className="text-red-500" size={20} /> ผู้ติดต่อฉุกเฉิน
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <InputField
//               icon={User}
//               label="ชื่อ-นามสกุล ผู้ติดต่อ"
//               name="emergencyContactName"
//               register={register}
//             />
//             <InputField
//               icon={Users}
//               label="ความสัมพันธ์"
//               name="emergencyRelationship"
//               register={register}
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold shadow-xl disabled:opacity-70 transition-all active:scale-[0.98]"
//         >
//           {isSubmitting ? (
//             <Loader2 className="w-5 h-5 animate-spin mx-auto" />
//           ) : (
//             "ยืนยันการลงทะเบียน"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// }

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
