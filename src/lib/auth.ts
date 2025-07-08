"use server";

import { prisma } from "./prisma";
import { compare, hash } from "bcrypt";
import { sign } from "./jwt";
import { cookies } from "next/headers";

export async function register(username: string, password: string, name?: string) {
  const hashed = await hash(password, 10);
  const user = await prisma.users.create({
    data: { username, password: hashed, name },
  });
  return user;
}

export async function login(username: string, password: string) {
  const user = await prisma.users.findUnique({ where: { username } });
  if (!user) throw new Error("User not found");
  const match = await compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = await sign({ userId: user.id, username: user.username });
  (await cookies()).set("token", token, { httpOnly: true });
  return user;
}
