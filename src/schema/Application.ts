import { z } from "zod";

const formSchema = z.object({
  role: z.string({ message: "Required" }).min(1, "Required"),
  company: z.string({ message: "Required" }).min(1, "Required"),
  status: z
    .enum([
      "applied",
      "scheduledInterview",
      "interviewed",
      "offered",
      "rejected",
      "accepted",
    ])
    .default("applied"),
  posting: z.string({ message: "Required" }).url("Invalid URL"),
  salary: z.coerce.number().int().min(0).optional().nullable(),
  notes: z.string().optional().nullable(),
  applicationDate: z.coerce
    .date()
    .default(() => new Date())
    .nullable(),
  interviewDate: z.coerce.date().optional().nullable(),
  offerDate: z.coerce.date().optional().nullable(),
  rejectionDate: z.coerce.date().optional().nullable(),
  acceptanceDate: z.coerce.date().optional().nullable(),
});

type JobApplicationType = z.infer<typeof formSchema>;
export { formSchema };
export type { JobApplicationType };
