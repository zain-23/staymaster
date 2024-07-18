import { z } from "zod";

export const roomBookingSchema = z.object({
  checkedInDate: z
    .string({
      required_error: "checked in date is required",
    })
    .refine((val) => !isNaN(Date.parse(val))),
  checkedOutDate: z
    .string({
      required_error: "checked out date is required",
    })
    .refine((val) => !isNaN(Date.parse(val))),
  days: z.number({ required_error: "days is required" }),
  roomId: z.string({
    required_error: "room id is required",
  }),
});
