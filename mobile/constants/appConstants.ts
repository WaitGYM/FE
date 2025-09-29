import * as AuthSession from "expo-auth-session";

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
export const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

export const REDIRECT_URI = AuthSession.makeRedirectUri({
  useProxy: true,
});

export const AUTH_CONFIG = {
  clientId: GOOGLE_CLIENT_ID,
  scopes: ["openid", "profile", "email"],
  redirectUri: REDIRECT_URI,
  responseType: AuthSession.ResponseType.Token,
};

export const WEBVIEW_URL = process.env.EXPO_PUBLIC_WEBVIEW_URL;

export const SECURE_STORE_TOKEN_KEY = "googleAccessToken";

export const BACKEND_BASE_URL = process.env.EXPO_PUBLIC_BACKEND_BASE_URL;

export const config = {
  api: {
    baseUrl: BACKEND_BASE_URL,
    googleLoginUrl: `${BACKEND_BASE_URL}/api/auth/google`,
  },
};
