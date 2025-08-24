import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/app/db";

const signupSchema = z.object({
  username: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.issues }, { status: 400 });
  }

  const { username, password } = parsed.data;

  const user = await prisma.user.create({
    data: { username, password }, // hash later
  });

  return NextResponse.json({ message: "Signed up", id: user.id });
}
