import { z } from "zod";

// ✅ เปลี่ยนจาก + เป็น * เพื่อให้รองรับค่าว่าง (Zero or more characters)
const nameRegex = /^[a-zA-Zก-๙\s]*$/;

export const patientSchema = z.object({
  firstName: z
    .string()
    .regex(nameRegex, "ชื่อต้องเป็นตัวอักษรเท่านั้น")
    .min(1, "กรุณาระบุชื่อจริง"),

  middleName: z
    .string()
    .regex(nameRegex, "ชื่อกลางต้องเป็นตัวอักษรเท่านั้น")
    .optional(),
  lastName: z
    .string()
    .regex(nameRegex, "นามสกุลต้องเป็นตัวอักษรเท่านั้น")
    .min(1, "กรุณาระบุนามสกุล"),
  dob: z.string().min(1, "กรุณาระบุวัน/เดือน/ปี เกิด"),

  gender: z.string().min(1, "กรุณาระบุเพศ"),

  // ✅ ปรับเบอร์โทรให้รองรับค่าว่างขณะลบ (แต่ถ้ากรอกต้องครบ 10 หลัก)
  phone: z.string().regex(/^[0-9]{10}$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก"),
  email: z
    .string()
    .min(1, "กรุณากรอกอีเมล") // เช็คว่าห้ามว่าง
    .email("รูปแบบอีเมลไม่ถูกต้อง"), // เช็ค Format

  address: z.string().min(5, "กรุณาระบุที่อยู่โดยละเอียด"),

  preferredLanguage: z.string().min(1, "กรุณาระบุภาษาที่สะดวก"),
  nationality: z.string().min(1, "กรุณาระบุสัญชาติ"),

  religion: z.string().optional(),

  emergencyContactName: z.string().min(1, "กรุณาระบุชื่อผู้ติดต่อฉุกเฉิน"),
  emergencyRelationship: z.string().min(1, "กรุณาระบุความสัมพันธ์"),
});

export type PatientInput = z.infer<typeof patientSchema>;
