import { z } from "zod";

export const loginValidatorZod = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be string and 6 cahrecter." }),
});
