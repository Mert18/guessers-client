"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/utils/authOptions";

export async function getAccessToken() {
  const session = await getServerSession(authOptions); // Automatically handles cookies

  if (session?.access_token) {
    return session.access_token;
  }

  return null;
}

export async function getIdToken() {
  const session = await getServerSession(authOptions);
  if (session) {
    return session?.id_token;
  }
  return null;
}
