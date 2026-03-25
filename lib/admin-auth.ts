import { NextRequest } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin3vb2025";

function generateToken(password: string): string {
  const payload = `${password}:${Buffer.from(password).toString("base64")}`;
  return Buffer.from(payload).toString("base64");
}

export function verifyPassword(password: string): string | null {
  if (password === ADMIN_PASSWORD) {
    return generateToken(password);
  }
  return null;
}

export function verifyToken(token: string): boolean {
  const expected = generateToken(ADMIN_PASSWORD);
  return token === expected;
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  const cookie = request.cookies.get("admin-token");
  return cookie?.value ?? null;
}

export function isAuthorizedRequest(request: NextRequest): boolean {
  const token = getTokenFromRequest(request);
  if (!token) return false;
  return verifyToken(token);
}
