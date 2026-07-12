import { NextResponse } from "next/server";

export const ADMIN_SESSION_COOKIE = "admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 6;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

type AdminSessionInput = {
  adminId: string;
  username: string;
};

type AdminSessionPayload = {
  sub: string;
  username: string;
  role: "admin";
  iat: number;
  exp: number;
};

function getAdminAuthSecret() {
  const secret = process.env.ADMIN_AUTH_SECRET;

  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_AUTH_SECRET is required in production");
  }

  return secret ?? "development-admin-auth-secret-change-me";
}

function getSecretKey() {
  return encoder.encode(getAdminAuthSecret());
}

async function getSigningKey() {
  return crypto.subtle.importKey(
    "raw",
    getSecretKey(),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function base64UrlEncode(input: string | ArrayBuffer) {
  const bytes = typeof input === "string" ? encoder.encode(input) : new Uint8Array(input);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function base64UrlDecode(input: string) {
  const base64 = input.replaceAll("-", "+").replaceAll("_", "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function getCookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) {
    return undefined;
  }

  const cookie = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  if (!cookie) {
    return undefined;
  }

  return decodeURIComponent(cookie.slice(name.length + 1));
}

export async function createAdminSessionToken({
  adminId,
  username,
}: AdminSessionInput) {
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = {
    sub: adminId,
    username,
    role: "admin",
    iat: now,
    exp: now + ADMIN_SESSION_MAX_AGE,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = await crypto.subtle.sign(
    "HMAC",
    await getSigningKey(),
    encoder.encode(encodedPayload)
  );

  return `${encodedPayload}.${base64UrlEncode(signature)}`;
}

export async function verifyAdminSessionToken(token?: string) {
  if (!token) {
    return null;
  }

  try {
    const [encodedPayload, encodedSignature] = token.split(".");

    if (!encodedPayload || !encodedSignature) {
      return null;
    }

    const isValidSignature = await crypto.subtle.verify(
      "HMAC",
      await getSigningKey(),
      base64UrlDecode(encodedSignature),
      encoder.encode(encodedPayload)
    );

    if (!isValidSignature) {
      return null;
    }

    const payload = JSON.parse(
      decoder.decode(base64UrlDecode(encodedPayload))
    ) as AdminSessionPayload;

    if (
      payload.role !== "admin" ||
      !payload.sub ||
      !payload.username ||
      payload.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function requireAdminAuth(req: Request) {
  const token = getCookieValue(req.headers.get("cookie"), ADMIN_SESSION_COOKIE);
  const session = await verifyAdminSessionToken(token);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return null;
}
