"server only";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const key = new TextEncoder().encode(process.env.JWT_SECRET);

const cookieOption = {
  name: "session",
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as "lax" | "strict" | "none",
    path: "/",
  },
  duration: 24 * 60 * 60 * 1000,
};

const encrypt = async (payload: JWTPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
};

const decrypt = async (session: string) => {
  const { payload } = await jwtVerify(session, key, {
    algorithms: ["HS256"],
  });
  return payload;
};

export const createSession = async ({
  userId,
  role,
  email,
  username,
}: {
  userId: string;
  role: string;
  email: string;
  username: string;
}) => {
  const expires = new Date(Date.now() + cookieOption.duration);
  const session = await encrypt({ userId, role, email, username, expires });
  cookies().set(cookieOption.name, session, {
    ...cookieOption.options,
    expires,
  });
};

export const verifySession = async () => {
  const cookie = cookies().get(cookieOption.name)?.value;
  if (!cookie)
    return {
      userId: null,
    };
  const session = await decrypt(cookie!);
  return session;
};

export const deleteSession = () => {
  cookies().delete(cookieOption.name);
  revalidatePath("/d");
};
