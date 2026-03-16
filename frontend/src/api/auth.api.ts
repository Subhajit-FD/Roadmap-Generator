import api from "./axios.config"

interface SignInData {
  email: string
  password: string
}

interface SignUpData {
  username: string
  email: string
  password: string
}

export const register = async (userData: SignUpData) => {
  try {
    const response = await api.post("/auth/register", userData)
    return response.data
  } catch (error) {
    console.error("Registration error:", error)
  }
}

export const login = async (credentials: SignInData) => {
  try {
    const response = await api.post("/auth/login", credentials)
    return response.data
  } catch (error) {
    console.error("Login error:", error)
  }
}

export const logout = async () => {
  try {
    const response = await api.get("/auth/logout")
    return response.data
    } catch (error) {
    console.error("Logout error:", error)
    }
}

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me")
    return response.data
    } catch (error) {
    console.error("Get current user error:", error)
    }
}