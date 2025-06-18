const BASE_URL =
  import.meta.env.VITE_SERVER_BASE_URL ?? 'http://localhost:8000';

export async function refreshToken() {
  const res = await fetch(`${BASE_URL}/refresh-token`, {
    method: 'POST',
    credentials: 'include',
  });
  return res.json();
}

export async function login(data: object) {
  const res = await fetch(`${BASE_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': navigator.userAgent,
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function register(data: object) {
  const res = await fetch(`${BASE_URL}/user/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function logout() {
  return fetch(`${BASE_URL}/user/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

export async function googleLogin(idToken: string) {
  const res = await fetch(`${BASE_URL}/user/google-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': navigator.userAgent,
    },
    credentials: 'include',
    body: JSON.stringify({ idToken }),
  });
  return res.json();
}
