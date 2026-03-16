import api from "@/api/axios.config";

export async function verifyTokenIsValid(): Promise<boolean> {
  try {
    // /auth/me will verify the token from the HttpOnly cookie
    await api.get("/auth/me");
    return true;
  } catch (error) {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  return await verifyTokenIsValid();
}
