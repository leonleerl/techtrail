import prisma from "@/lib/prisma";
import { createAdminSessionToken, ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE } from "@/lib/admin-auth";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { username, password } = await req.json();

    const user = await prisma.admin.findFirst({
        where: {
            username: username,
        }
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    const token = await createAdminSessionToken({
      adminId: user.id,
      username: user.username,
    });
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      path: '/',
      maxAge: ADMIN_SESSION_MAX_AGE,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    return NextResponse.json({ message: 'Login successful' });
}