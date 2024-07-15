import { z } from "zod";

export const roomBookingSchema = z.object({
  checkedInDate: z
    .string({
      required_error: "checked in date is required",
    })
    .datetime({
      message: "Checked-in date must be a valid date-time string",
    }),
  checkedOutDate: z
    .string({
      required_error: "checked out date is required",
    })
    .datetime({
      message: "Checked-out date must be a valid date-time string",
    }),
  roomId: z.string({
    required_error: "room id is required",
  }),
});
