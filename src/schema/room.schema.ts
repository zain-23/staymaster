import { z } from "zod";

export const roomSchema = z.object({
  roomNumber: z.number(),
  status: z.string({
    required_error: "please select a status",
  }),
  price: z.number(),
});
