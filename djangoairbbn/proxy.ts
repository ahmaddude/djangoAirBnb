import { NextRequest, NextResponse } from 'next/server'
import { API_HOST } from '@/app/lib/config'

const ACCESS_COOKIE = 'session_access_token'
const REFRESH_COOKIE = 'session_refresh_token'
const USERID_COOKIE = 'session_userid'

const secureCookie = process.env.NODE_ENV === 'production'

function cookieOptions(maxAge: number) {
    return {
        httpOnly: true,
        secure: secureCookie,
        sameSite: 'lax' as const,
        path: '/',
        maxAge,
    }
}

function decodePayload(token: string): { exp?: number } | null {
    try {
        const payload = token.split('.')[1]
        if (!payload) return null
        const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
        const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=')
        return JSON.parse(atob(padded))
    } catch {
        return null
    }
}

function isExpired(token: string): boolean {
    const payload = decodePayload(token)
    if (!payload || !payload.exp) return true
    return Date.now() >= payload.exp * 1000 - 30 * 1000
}

async function refreshAccessToken(refresh: string): Promise<string | null> {
    try {
        const response = await fetch(`${API_HOST}/api/auth/token/refresh/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh }),
        })
        if (!response.ok) return null
        const json = await response.json()
        return json.access ?? null
    } catch {
        return null
    }
}

export async function proxy(request: NextRequest) {
    const access = request.cookies.get(ACCESS_COOKIE)?.value
    const refresh = request.cookies.get(REFRESH_COOKIE)?.value

    if ((!access || isExpired(access)) && refresh) {
        const response = NextResponse.next({ request })
        const newAccess = await refreshAccessToken(refresh)

        if (newAccess) {
            request.cookies.set(ACCESS_COOKIE, newAccess)
            response.cookies.set(ACCESS_COOKIE, newAccess, cookieOptions(60 * 60))
        } else {
            for (const name of [ACCESS_COOKIE, REFRESH_COOKIE, USERID_COOKIE]) {
                request.cookies.set(name, '')
                response.cookies.set(name, '', cookieOptions(0))
            }
        }

        return response
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map)$).*)',
    ],
}
