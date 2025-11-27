export type UserRole = "user" | "creator" | "seller" | "community"

const ROLE_KEY = "ecomarket:role"

export function setUserRole(role: UserRole) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(ROLE_KEY, role)
  } catch {}
}

export function getUserRole(): UserRole | null {
  if (typeof window === "undefined") return null
  try {
    const val = localStorage.getItem(ROLE_KEY)
    if (val === "user" || val === "creator" || val === "seller" || val === "community") {
      return val
    }
    return null
  } catch {
    return null
  }
}

export function getMainRouteForRole(role: UserRole): string {
  switch (role) {
    case "user":
      return "/user/home"
    case "creator":
      return "/creator/dashboard"
    case "seller":
      return "/seller/dashboard"
    case "community":
      return "/community/dashboard"
    default:
      return "/login"
  }
}

export function getMainRouteFromStorage(): string {
  const role = getUserRole()
  return role ? getMainRouteForRole(role) : "/login"
}

export function clearUserRole(): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(ROLE_KEY)
    } catch {}
  }
}
