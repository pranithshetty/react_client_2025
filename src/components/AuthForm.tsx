import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import FromTestServer from './FromTestServer';

type AuthMode = 'login' | 'register';
const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL ?? 'http://localhost:8000';

interface FormData {
  email: string;
  password: string;
}

function isValidJWT(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // decode payload
    const now = Math.floor(Date.now() / 1000); // current time in seconds
    return payload.exp && payload.exp > now; // check if token is still valid
  } catch {
    return false; // invalid token format or decode error
  }
}

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const res = await fetch(`${BASE_URL}/refresh-token`, {
          method: 'POST',
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok && data.accessToken && isValidJWT(data.accessToken)) {
          setToken(data.accessToken);
          setMessage('Session restored.');
        }
      } catch (err) {
        console.error('Refresh token failed');
      } finally {
        setIsLoading(false);
      }
    };
  
    tryRefresh();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url =
      mode === 'login'
        ? `${BASE_URL}/user/login`
        : `${BASE_URL}/user/signup`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (mode === 'login') {
        if (!data.accessToken) throw new Error('No token received');
        setToken(data.accessToken);
        setMessage('Login successful');
      } else {
        setMessage('Registration successful! You can now log in.');
        setMode('login');
      }

      setFormData({ email: '', password: '' });
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('An unknown error occurred.');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/user/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout failed:', err);
    }
    setToken(null);
    setMessage('Logged out.');
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      {token ? (
        <>
        <FromTestServer token ={token}/>
          <h2>Welcome user!</h2>
          {/* <p>JWT: {token}</p> */}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <button type="submit">
              {mode === 'login' ? 'Login' : 'Register'}
            </button>
          </form>
          <br />
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          >
            Switch to {mode === 'login' ? 'Register' : 'Login'}
          </button>
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const idToken = credentialResponse.credential;
              if (!idToken) return;

              try {
                const res = await fetch(
                  `${BASE_URL}/user/google-login`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ idToken }),
                  }
                );

                const data = await res.json();
                if (!res.ok)
                  throw new Error(data.error || 'Google login failed');

                //localStorage.setItem('token', JSON.stringify(data));
                setToken(data.accessToken);
                setMessage('Google Login Successful');
              } catch (err) {
                console.error(err);
                setMessage('Google login failed');
              }
            }}
            onError={() => {
              setMessage('Google Login Error');
            }}
          />
        </>
      )}
      <p style={{ color: 'red' }}>{message}</p>
    </div>
  );
};

export default AuthForm;
