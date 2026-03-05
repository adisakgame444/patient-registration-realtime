// import { z } from "zod";

// export const patientSchema = z.object({
//   firstName: z.string().min(1, "First name is required"),
//   middleName: z.string().optional(),
//   lastName: z.string().min(1, "Last name is required"),
//   dob: z.string().min(1, "Date of birth is required"),
//   gender: z.string().min(1, "Gender is required"),
//   phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
//   email: z.string().email("Invalid email address"),
//   address: z.string().min(5, "Address is required"),
//   preferredLanguage: z.string().min(1, "Preferred language is required"),
//   nationality: z.string().min(1, "Nationality is required"),
//   // Emergency Contact (Optional: Name + Relationship)
//   emergencyContactName: z.string().optional(),
//   emergencyRelationship: z.string().optional(),
//   religion: z.string().optional(),
// });

// export type PatientInput = z.infer<typeof patientSchema>;

// import { z } from "zod";

// export const patientSchema = z.object({
//   firstName: z.string().min(1, "กรุณาระบุชื่อจริง"),
//   middleName: z.string().optional(), // ตัวเลือกเสริม (Optional)
//   lastName: z.string().min(1, "กรุณาระบุนามสกุล"),
//   dob: z.string().min(1, "กรุณาระบุวัน/เดือน/ปี เกิด"),
//   gender: z.string().min(1, "กรุณาระบุเพศ"),
//   phone: z.string().regex(/^[0-9]{10}$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก"),
//   email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
//   address: z.string().min(5, "กรุณาระบุที่อยู่โดยละเอียด"),
//   preferredLanguage: z.string().min(1, "กรุณาระบุภาษาที่สะดวก"),
//   nationality: z.string().min(1, "กรุณาระบุสัญชาติ"),

//   // ✅ ปรับให้เป็นฟิลด์บังคับตามกฎ 12 ข้อ
//   religion: z.string().optional(),
//   emergencyContactName: z.string().min(1, "กรุณาระบุชื่อผู้ติดต่อฉุกเฉิน"),
//   emergencyRelationship: z.string().min(1, "กรุณาระบุความสัมพันธ์"),
// });

// export type PatientInput = z.infer<typeof patientSchema>;

import { z } from "zod";

// กำหนด Regex สำหรับตรวจสอบตัวอักษร (ไทย/อังกฤษ) และเว้นวรรคเท่านั้น
const nameRegex = /^[a-zA-Zก-๙\s]+$/;

export const patientSchema = z.object({
  firstName: z
    .string()
    .min(1, "กรุณาระบุชื่อจริง")
    .regex(nameRegex, "ชื่อต้องเป็นตัวอักษรเท่านั้น"),

  middleName: z
    .string()
    .regex(nameRegex, "ชื่อกลางต้องเป็นตัวอักษรเท่านั้น")
    .optional()
    .or(z.literal("")), // รองรับค่าว่างจากฟอร์ม

  lastName: z
    .string()
    .min(1, "กรุณาระบุนามสกุล")
    .regex(nameRegex, "นามสกุลต้องเป็นตัวอักษรเท่านั้น"),

  dob: z.string().min(1, "กรุณาระบุวัน/เดือน/ปี เกิด"),

  gender: z.string().min(1, "กรุณาระบุเพศ"),

  phone: z.string().regex(/^[0-9]{10}$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก"),

  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),

  address: z.string().min(5, "กรุณาระบุที่อยู่โดยละเอียด"),

  preferredLanguage: z.string().min(1, "กรุณาระบุภาษาที่สะดวก"),

  nationality: z.string().min(1, "กรุณาระบุสัญชาติ"),

  // ✅ ฟิลด์ที่เป็นตัวเลือก (Optional) ตามโจทย์ Assignment
  religion: z.string().optional().or(z.literal("")),

  emergencyContactName: z.string().min(1, "กรุณาระบุชื่อผู้ติดต่อฉุกเฉิน"),
  emergencyRelationship: z.string().min(1, "กรุณาระบุความสัมพันธ์"),
});

export type PatientInput = z.infer<typeof patientSchema>;
