import { useState, useEffect } from 'react';
import { refreshToken, login, register, logout, googleLogin } from '../auth/apis';
import { isValidJWT } from '../auth/utils';

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await refreshToken();
        if (data.accessToken && isValidJWT(data.accessToken)) {
          setToken(data.accessToken);
          setMessage('Session restored');
        }
      } catch {
        setMessage('Session expired');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    token,
    setToken,
    message,
    setMessage,
    isLoading,
    login,
    register,
    logout,
    googleLogin,
  };
}
