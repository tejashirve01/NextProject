"use server";

import prisma from "@/app/db";

export async function signup(username: string, password: string) {
  const user = await prisma.user.create({
    data: { username, password }, // hash later
  });
  return `Signed up with id: ${user.id}`;
}
