import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  phone: z.string().optional().nullable(),
  email: z.string(),
  role: z.object({
    name: z.string(),
  }),
});

export type User = z.infer<typeof userSchema>;
