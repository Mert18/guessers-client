import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const keycloakUrl = 'https://keycloak.guessers.io/realms/guessers/protocol/openid-connect/userinfo';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { token } = await req.json();

  try {
    const response = await axios.get(keycloakUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // If the token is valid, Keycloak returns user info
    return NextResponse.json({ valid: true, userInfo: response.data });
  } catch (error) {
    console.error('Token validation failed:', error.response?.data || error.message);
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
