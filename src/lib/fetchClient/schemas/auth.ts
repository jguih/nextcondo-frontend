import { z } from "zod";

export const problemDetailsSchema = z.object({
  title: z.string(),
  type: z.string(),
  status: z.number(),
  detail: z.string().optional(),
  traceId: z.string().optional(),
});

export type ProblemDetails = z.infer<typeof problemDetailsSchema>;
