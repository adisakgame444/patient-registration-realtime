// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { patientSchema, PatientInput } from "@/lib/validations";
// import { useEffect, useMemo } from "react";
// import debounce from "lodash.debounce";

// export function usePatientForm() {
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

//   // ฟิลด์บังคับสำหรับการคำนวณ Progress
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
//     "emergencyContactName", // ช่องที่ 11
//     "emergencyRelationship", // ช่องที่ 12
//   ];

//   // คำนวณความคืบหน้า
//   const filledCount = requiredFields.filter((field) => {
//     const value = watchedFields[field];
//     return value !== undefined && value !== "" && value !== null;
//   }).length;

//   const progressPercentage = (filledCount / requiredFields.length) * 100;

//   // ระบบ Real-time Sync (Debounced)
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
//     const subscription = watch((value) => sendRealtimeUpdate(value));
//     return () => {
//       subscription.unsubscribe();
//       sendRealtimeUpdate.cancel();
//     };
//   }, [watch, sendRealtimeUpdate]);

//   const onSubmit = async (data: PatientInput) => {
//     await fetch("/api/pusher", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ data, status: "submitted" }),
//     });
//     alert("ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว!");
//   };

//   return {
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
//   };
// }

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientSchema, PatientInput } from "@/lib/validations";
import { useEffect, useMemo } from "react";
import debounce from "lodash.debounce";

export function usePatientForm() {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<PatientInput>({
    resolver: zodResolver(patientSchema),
    mode: "onChange",
    // ✅ จุดที่ต้องแก้: ต้องกำหนดค่าเริ่มต้นให้ทุกฟิลด์เพื่อให้ watch ทำงาน
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      gender: "",
      phone: "",
      email: "",
      nationality: "",
      preferredLanguage: "",
      address: "",
      emergencyContactName: "",
      emergencyRelationship: "",
    },
  });

  const watchedFields = watch();

  // ฟิลด์บังคับสำหรับการคำนวณ Progress (ครบ 12 ช่อง)
  const requiredFields: (keyof PatientInput)[] = [
    "firstName",
    "lastName",
    "dob",
    "gender",
    "phone",
    "email",
    "nationality",
    "preferredLanguage",
    "address",
    "emergencyContactName", // ช่องที่ 11
    "emergencyRelationship", // ช่องที่ 12
  ];

  // คำนวณความคืบหน้า
  const filledCount = requiredFields.filter((field) => {
    const value = watchedFields[field];
    return value !== undefined && value !== "" && value !== null;
  }).length;

  const progressPercentage = (filledCount / requiredFields.length) * 100;

  // ระบบ Real-time Sync (Debounced)
  const sendRealtimeUpdate = useMemo(
    () =>
      debounce(async (data: Partial<PatientInput>) => {
        try {
          await fetch("/api/pusher", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data, status: "typing" }),
          });
        } catch (error) {
          console.error("Failed to sync:", error);
        }
      }, 500),
    [],
  );

  useEffect(() => {
    const subscription = watch((value) =>
      sendRealtimeUpdate(value as Partial<PatientInput>),
    );
    return () => {
      subscription.unsubscribe();
      sendRealtimeUpdate.cancel();
    };
  }, [watch, sendRealtimeUpdate]);

  const onSubmit = async (data: PatientInput) => {
    await fetch("/api/pusher", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, status: "submitted" }),
    });
    alert("ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว!");
  };

  return {
    register,
    watch,
    watchedFields,
    setValue,
    handleSubmit,
    errors,
    isSubmitting,
    isSubmitSuccessful,
    filledCount,
    progressPercentage,
    requiredFields,
    onSubmit,
  };
}
