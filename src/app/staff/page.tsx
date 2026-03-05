import { Activity } from "lucide-react";
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
