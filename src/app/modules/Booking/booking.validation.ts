import { z } from "zod";

export const bookingValidator = z.object({
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  facility: z.string(),
});
