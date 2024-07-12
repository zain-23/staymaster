import { jwtVerify } from "jose";

const key = new TextEncoder().encode(process.env.JWT_SECRET);

export const getSession = async (session: string) => {
  if (!session) return null;
  const { payload } = await jwtVerify(session, key, {
    algorithms: ["HS256"],
  });
  return payload;
};
