import { z } from "zod";

export const loginCredencialsSchema = z
  .object({
    email: z.string().email().min(1),
    password: z.string().min(1),
  })
  .required();

export type LoginCredentials = z.infer<typeof loginCredencialsSchema>;

export const problemDetailsSchema = z.object({
  title: z.string().min(1),
  detail: z.string().min(1),
  type: z.string().min(1),
  statusCode: z.number(),
});

export type ProblemDetails = z.infer<typeof problemDetailsSchema>;
