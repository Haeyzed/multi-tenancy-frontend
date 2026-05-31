"use client"

import { usePathname } from "next/navigation"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { getPageTitle } from "@/lib/navigation"
import { useAuth } from "@/providers/auth-provider"
import { ModeToggle } from "@/components/layout/mode-toggle"

export function DashboardHeader() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const segments = pathname.split("/").filter(Boolean)
  const title = getPageTitle(pathname)

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mx-1 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {segments.length > 0 ? (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ) : null}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ms-auto flex items-center gap-2">
        <ModeToggle />
        <Button variant="outline" size="sm" onClick={() => void logout()}>
          Sign out
        </Button>
      </div>
    </header>
  )
}
