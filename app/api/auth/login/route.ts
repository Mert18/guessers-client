import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

interface LoginRequest {
  username: string;
  password: string;
}

export async function GET() {
  return new Response("API route is working!");
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { username, password }: LoginRequest = await req.json();

  const keycloakBaseUrl = process.env.KEYCLOAK_ISSUER ?? "";
  const clientId = process.env.KEYCLOAK_CLIENT_ID ?? "";
  const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET ?? "";

  try {
    // Request access token from Keycloak
    const response = await axios.post(
      `${keycloakBaseUrl}/protocol/openid-connect/token`,
      new URLSearchParams({
        grant_type: "password",
        client_id: clientId,
        client_secret: clientSecret,
        username,
        password,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    console.log("Keycloak responded: ", response.data);
    const { access_token, refresh_token, id_token } = response.data;

    // Return the tokens to the client (consider secure storage in production)
    return NextResponse.json(
      {
        message: "Login successful",
        accessToken: access_token,
        refreshToken: refresh_token,
        idToken: id_token,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    return NextResponse.json(
      { message: "Invalid credentials or login failed" },
      { status: 401 }
    );
  }
}
