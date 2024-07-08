import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email().nonempty({
    message: "email is required",
  }),
  password: z.string().nonempty({
    message: "password is required",
  }),
});
