import { z } from "zod";
import { Roles } from "./user.model";

export const userValidatorZod = z.object({
  name: z.string().min(3),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be string and 6 cahrecter." }),
  phone: z.string(),
  role: z.enum([...Roles] as [string, ...string[]]),
  address: z.string(),
});
