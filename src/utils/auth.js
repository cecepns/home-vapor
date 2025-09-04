// Simple frontend-only auth utility
// In production, replace with real backend authentication

const AUTH_STORAGE_KEY = 'hv_admin_auth';

export function isAuthenticated() {
  try {
    const value = localStorage.getItem(AUTH_STORAGE_KEY);
    return value === 'true';
  } catch (_e) {
    return false;
  }
}

export function login({ username, password }) {
  // Demo credentials; replace with API call
  const isValid = username === 'admin' && password === 'admin123';
  if (isValid) {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    return { success: true };
  }
  return { success: false, message: 'Username atau password salah' };
}

export function logout() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (_e) {
    // noop
  }
}


