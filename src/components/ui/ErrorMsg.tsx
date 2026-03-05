import { CheckCircle2 } from "lucide-react";

export function ErrorMsg({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 font-medium">
      <CheckCircle2 size={12} className="rotate-180" /> {message}
    </p>
  );
}