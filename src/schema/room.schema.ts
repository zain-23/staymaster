import { z } from "zod";

export const roomSchema = z.object({
  roomNumber: z.number({
    required_error: "room number is required",
  }),
  roomType: z.string({
    required_error: "room type is required",
  }),
  status: z.string({
    required_error: "please select a status",
  }),
  price: z.number({
    required_error: "please add price",
  }),
});
