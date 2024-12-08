import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";
import KeycloakProvider, { KeycloakProfile } from "next-auth/providers/keycloak";
import { OAuthConfig } from "next-auth/providers/oauth";

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: `${process.env.KEYCLOAK_CLIENT_ID}`,
      clientSecret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
      issuer: `${process.env.KEYCLOAK_ISSUER}`,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      const nowTimestamp = Math.floor(Date.now() / 1000);
      if(account) {
        token.decoded = jwtDecode(account.access_token);
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        token.access_token = account.access_token;
      } else if(nowTimestamp < token.expires_at) {
        return token;
      } else {
        try {
          const refreshedToken = await refreshAccessToken(token);
          return refreshedToken;
        } catch (error) {
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.username = token.decoded.preferred_username;
      session.email = token.decoded.email;
      session.email_verified = token.decoded.email_verified;
      session.access_token = token.access_token;
      session.id_token = token.id_token;
      session.expires_at = token.expires_at;
      session.error = token.error;
      return session;
    },
    async redirect({ url, baseUrl }: any) {
      // TODO fix any
      return url.startsWith(baseUrl) ? url : baseUrl + "/";
    },
  },
  events: {
    async signOut({ token }: { token: JWT }) {
      if (token.provider === "keycloak") {
        const issuerUrl = (authOptions.providers.find(p => p.id === "keycloak") as OAuthConfig<KeycloakProfile>).options!.issuer!
        const logOutUrl = new URL(`${issuerUrl}/protocol/openid-connect/logout`)
        // @ts-ignore
        logOutUrl.searchParams.set("id_token_hint", token.id_token!)
        await fetch(logOutUrl);
      }
    },
  }
};

// this will refresh an expired access token, when needed
async function refreshAccessToken(token: any) {
  // TODO fix any
  if (
    process.env.KEYCLOAK_CLIENT_ID === undefined ||
    process.env.KEYCLOAK_CLIENT_SECRET === undefined ||
    process.env.REFRESH_TOKEN_URL === undefined
  ) {
    throw new Error("Environment variables are not set.");
  }
  const resp = await fetch(`${process.env.REFRESH_TOKEN_URL}`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: token.refresh_token,
    }),
    method: "POST",
  });
  const refreshToken = await resp.json();
  if (!resp.ok) throw refreshToken;

  return {
    ...token,
    access_token: refreshToken.access_token,
    decoded: jwtDecode(refreshToken.access_token),
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
  };
}
