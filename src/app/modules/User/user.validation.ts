import { z } from "zod";
import { Roles } from "./user.model";

export const userValidatorZod = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
  role: z.enum([...Roles] as [string, ...string[]]),
  address: z.string(),
});
