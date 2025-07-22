import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { username, password } = await req.json();

    console.log(username, password);

    const user = await prisma.admin.findFirst({
        where: {
            username: username,
            password: password
        }
    });
    console.log(user);
    if (!user) {
        return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }
    const cookieStore = await cookies();
    cookieStore.set('admin_auth', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    }); // 1 hour
    return NextResponse.json({ message: 'Login successful' });
}