"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { useAuthMe, useLogin, useLogout } from "@/lib/api/central/hooks"
import type { LoginRequest, UserResource } from "@/lib/api/central/types"
import { clearToken, getToken, setToken } from "@/lib/auth/token"

interface AuthContextValue {
  user: UserResource | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (payload: LoginRequest) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [hasToken, setHasToken] = useState(false)
  const [bootstrapped, setBootstrapped] = useState(false)

  useEffect(() => {
    setHasToken(Boolean(getToken()))
    setBootstrapped(true)
  }, [])

  const { data, isLoading, isError } = useAuthMe(hasToken && bootstrapped)
  const loginMutation = useLogin()
  const logoutMutation = useLogout()

  useEffect(() => {
    if (isError && hasToken) {
      clearToken()
      setHasToken(false)
    }
  }, [isError, hasToken])

  const login = useCallback(
    async (payload: LoginRequest) => {
      const response = await loginMutation.mutateAsync(payload)
      setToken(response.data.token)
      setHasToken(true)
      toast.success(response.message ?? "Welcome back!")
      router.push("/")
    },
    [loginMutation, router],
  )

  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync()
    } catch {
      /* token may already be invalid */
    } finally {
      clearToken()
      setHasToken(false)
      router.push("/login")
    }
  }, [logoutMutation, router])

  const value = useMemo<AuthContextValue>(
    () => ({
      user: data?.data ?? null,
      isLoading: !bootstrapped || (hasToken && isLoading),
      isAuthenticated: hasToken && Boolean(data?.data),
      login,
      logout,
    }),
    [bootstrapped, data?.data, hasToken, isLoading, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
