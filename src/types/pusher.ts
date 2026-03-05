// src/types/pusher.ts
import { PatientInput } from "@/lib/validations";

export type MonitorStatus = "typing" | "submitted" | "inactive";

export interface PusherPayload {
  data: Partial<PatientInput>;
  status: MonitorStatus;
  timestamp: string;
}
