import axios, { type AxiosError, type AxiosRequestConfig } from "axios"

import { getToken, clearToken } from "@/lib/auth/token"

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly errors?: Record<string, string[]>,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://multi-tenancy-api.test/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      clearToken()
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login"
      }
    }

    const status = error.response?.status ?? 500
    const data = error.response?.data
    const message =
      data?.message ??
      (status === 422 ? "Validation failed." : "Something went wrong.")

    throw new ApiError(message, status, data?.errors)
  },
)

export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const { data } = await api.request<T>(config)
  return data
}

export { api }
