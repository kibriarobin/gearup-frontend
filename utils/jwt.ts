import jwt, { JwtPayload } from "jsonwebtoken";

type TVerifyResult =
  | { success: true; data: JwtPayload }
  | { success: false; error: string };

const verifyToken = (token: string, secret: string): TVerifyResult => {
  try {
    const data = jwt.verify(token, secret) as JwtPayload;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export const jwtUtils = {
  verifyToken,
};