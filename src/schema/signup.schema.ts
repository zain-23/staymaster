import { z } from "zod";

export const SignupSchema = z.object({
  username: z
    .string({
      message: "username must be string",
    })
    .nonempty({
      message: "username is required",
    }),
  email: z.string().email().nonempty({
    message: "email is required",
  }),
  password: z.string().nonempty({
    message: "password is required",
  }),
});
