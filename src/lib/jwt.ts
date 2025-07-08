import { SignJWT, jwtVerify, JWTPayload } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

/**
 * Sign a JWT
 * @param payload - Must be key-value pairs (string keys)
 * @param exp - Expiration time (default '1h')
 */
export async function sign(payload: JWTPayload, exp: string = "1h"): Promise<string> {
  return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime(exp).sign(secret);
}

/**
 * Verify a JWT
 * @param token - JWT token as string
 * @returns payload if valid, null if invalid
 */
export async function verify(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}
