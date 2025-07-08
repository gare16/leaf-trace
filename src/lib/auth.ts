"use server";

import { prisma } from "./prisma";
import { compare, hash } from "bcrypt";
import { sign } from "./jwt";
import { cookies } from "next/headers";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export async function register(
  username: string,
  password: string,
  name?: string
) {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  try {
    const hashedPassword = await hash(password, 10);
    const user = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        name,
      },
    });

    const { password: _, ...safeUser } = user;
    return safeUser;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("Username already exists");
      }
    }
    throw error; // rethrow other unexpected errors
  }
}

export async function login(username: string, password: string) {
  const user = await prisma.users.findUnique({
    where: { username },
  });

  if (!user) {
    return "No User Invalid username or password";
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    return "Invalid password";
  }

  // Create JWT token
  const token = await sign({ userId: user.id, username: user.username });

  // Set token in secure cookie
  const cookieStore = cookies();
  (await cookieStore).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  // Optional: Do not return password hash in response
  redirect("/dashboard");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/auth/login");
}
