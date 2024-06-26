import { z } from "zod";

export const FacilityValidator = z.object({
  name: z.string().min(5, "Name is required"),
  description: z.string().min(1, "Description is required"),
  pricePerHour: z.number().min(0, "Price per hour must be a positive number"),
  location: z.string().min(1, "Location is required"),
  isDeleted: z.boolean().optional().default(false),
});
