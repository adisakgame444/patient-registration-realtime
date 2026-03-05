// import Link from "next/link";
// import PatientForm from "@/components/PatientForm";
// export default function PatientPage() {
//   return (
//     <main className="min-h-screen bg-slate-50 py-10 px-4">
//       <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
//         <div className="flex justify-end mb-4">
//           <Link
//             href="/staff"
//             className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200"
//           >
//             เปิดหน้า Staff View →
//           </Link>
//         </div>
//         <header className="mb-8">
//           <h1 className="text-2xl font-bold text-slate-800">
//             แบบฟอร์มข้อมูลผู้ป่วย
//           </h1>
//           <p className="text-slate-500">
//             กรุณากรอกข้อมูลให้ครบถ้วนเพื่อความสะดวกในการรับบริการ
//           </p>
//         </header>

//         {/* ส่วนที่ต้องมีการโต้ตอบ (Interactive) จะถูกเรียกใช้ตรงนี้ */}
//         <PatientForm />
//       </div>
//     </main>
//   );
// }

import { Metadata } from "next";
import Link from "next/link";
import PatientForm from "@/app/(main)/components/PatientForm";
import { ArrowRight, ShieldCheck, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "ลงทะเบียนผู้ป่วย | MEDIC-PORTAL",
  description: "ระบบลงทะเบียนผู้ป่วยอัจฉริยะ ปลอดภัย และรวดเร็ว",
};

export default function PatientPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-slate-900 selection:bg-indigo-100">
      {/* Background Decor - เพิ่มความเทพด้วยวงกลมฟุ้ง ๆ */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-50/50 blur-[120px]" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto py-6 px-4 sm:py-16">
        {/* Top Navigation */}
        <nav className="flex justify-between items-center mb-12 sm:mb-20">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Activity className="text-white w-6 h-6" />
            </div>
            <span className="text-lg font-black tracking-tighter">
              MEDIC<span className="text-indigo-600">.</span>
            </span>
          </div>

          <Link
            href="/staff"
            className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-2"
          >
            Staff Access
            <ArrowRight size={14} />
          </Link>
        </nav>

        {/* Hero Section - สั้น กระชับ ดูแพง */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-6">
            <header>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
                ลงทะเบียน <br />
                <span className="text-indigo-600">ผู้ป่วยใหม่</span>
              </h1>
              <p className="mt-4 text-slate-500 font-medium leading-relaxed">
                กรุณากรอกข้อมูลเพื่อเข้ารับบริการ{" "}
                <br className="hidden sm:block" />
                ระบบจะซิงค์ข้อมูลแบบ Real-time
              </p>
            </header>

            {/* Trust Badges - ย้ายมาไว้ข้างๆ เพื่อลดความยาวของหน้าหลัก */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <ShieldCheck size={18} />
                </div>
                Data Encryption Active
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Security Standard
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  ข้อมูลของคุณถูกจัดเก็บตามมาตรฐาน HIPAA
                  เพื่อความปลอดภัยสูงสุดของประวัติทางการแพทย์
                </p>
              </div>
            </div>
          </div>

          {/* Form Card - คลีนที่สุด */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
              {/* Stepper Indicator - ทำให้คนใช้ไม่เหนื่อย */}
              {/* <div className="bg-slate-50/50 px-8 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex gap-2">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 w-8 rounded-full ${s === 1 ? "bg-indigo-600" : "bg-slate-200"}`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-black text-indigo-600 uppercase">
                  Registration Flow
                </span>
              </div> */}

              <div className="p-6 sm:p-12">
                <PatientForm />
              </div>
            </div>

            {/* Simple Footer */}
            <footer className="mt-8 text-center sm:text-left">
              <p className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                &copy; 2026 MEDIC SYSTEMS &bull; ALL RIGHTS RESERVED
              </p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
