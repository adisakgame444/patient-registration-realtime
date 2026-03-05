import { z } from "zod";

// ✅ เปลี่ยนจาก + เป็น * เพื่อให้รองรับค่าว่าง (Zero or more characters)
const nameRegex = /^[a-zA-Zก-๙\s]*$/;

export const patientSchema = z.object({
  firstName: z
    .string()
    .regex(nameRegex, "ชื่อต้องเป็นตัวอักษรเท่านั้น")
    .min(1, "กรุณาระบุชื่อจริง")
    .or(z.literal("")), // ✅ ยอมรับค่าว่างเพื่อให้ซิงค์การลบได้

  middleName: z
    .string()
    .regex(nameRegex, "ชื่อกลางต้องเป็นตัวอักษรเท่านั้น")
    .optional()
    .or(z.literal("")),

  lastName: z
    .string()
    .regex(nameRegex, "นามสกุลต้องเป็นตัวอักษรเท่านั้น")
    .min(1, "กรุณาระบุนามสกุล")
    .or(z.literal("")),

  dob: z.string().min(1, "กรุณาระบุวัน/เดือน/ปี เกิด").or(z.literal("")),

  gender: z.string().min(1, "กรุณาระบุเพศ").or(z.literal("")),

  // ✅ ปรับเบอร์โทรให้รองรับค่าว่างขณะลบ (แต่ถ้ากรอกต้องครบ 10 หลัก)
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก")
    .or(z.literal("")),

  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง").or(z.literal("")),

  address: z.string().min(5, "กรุณาระบุที่อยู่โดยละเอียด").or(z.literal("")),

  preferredLanguage: z
    .string()
    .min(1, "กรุณาระบุภาษาที่สะดวก")
    .or(z.literal("")),

  nationality: z.string().min(1, "กรุณาระบุสัญชาติ").or(z.literal("")),

  religion: z.string().optional().or(z.literal("")),

  emergencyContactName: z
    .string()
    .min(1, "กรุณาระบุชื่อผู้ติดต่อฉุกเฉิน")
    .or(z.literal("")),

  emergencyRelationship: z
    .string()
    .min(1, "กรุณาระบุความสัมพันธ์")
    .or(z.literal("")),
});

export type PatientInput = z.infer<typeof patientSchema>;
