const ACCESS = "accessToken";
const REFRESH = "refreshToken";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8000/api/v1";

export function setTokens(access: string, refresh?: string) {
    localStorage.setItem(ACCESS, access);
    if (refresh) localStorage.setItem(REFRESH, refresh);
}

export function getAccessToken() {
    return localStorage.getItem(ACCESS);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH);
}

export function clearTokens() {
    localStorage.removeItem(ACCESS);
    localStorage.removeItem(REFRESH);
}

export async function login(email: string, password: string) {
    const res = await fetch(`${BACKEND_URL}/auth/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.access) setTokens(data.access, data.refresh);

    return data;
}

export async function refreshAccessToken() {
    const refresh = getRefreshToken();
    if (!refresh) return null;

    const res = await fetch(`${BACKEND_URL}/auth/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
    });

    const data = await res.json();

    if (data.access) localStorage.setItem(ACCESS, data.access);

    return data.access || null;
}

export function logout() {
    clearTokens();
}
