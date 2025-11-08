import type { NextRequest } from "next/server"
import createMiddleware from "next-intl/middleware"
import { routing } from "@/i18n/routing"

// import { createRbacMiddleware } from "./lib/auth/rbac"
// import { ProtectedRoutes, RoleHierarchy } from "./lib/auth/roles"

const createIntlMiddleware = createMiddleware(routing)
// const rbacMiddleware = createRbacMiddleware(ProtectedRoutes, RoleHierarchy)

export async function middleware(req: NextRequest) {
  // Intl
  const intlResponse = createIntlMiddleware(req)

  if (intlResponse.status !== 200) return intlResponse

  // RBAC
  //   const rbacResponse = await rbacMiddleware(req)
  //   if (rbacResponse) return rbacResponse

  return intlResponse
}
