import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { AuthFields } from './AuthFields';
import { GoogleAuth } from './GoogleAuth';
import FromTestServer from '../FromTestServer';

type AuthMode = 'login' | 'register';

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const {
    token,
    setToken,
    isLoading,
    message,
    setMessage,
    login,
    register,
    logout,
    googleLogin,
  } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = mode === 'login' ? await login(formData) : await register(formData);

      if (mode === 'login') {
        if (!data.accessToken) throw new Error('Login failed: No token received');
        setToken(data.accessToken);
        setMessage('Login successful');
      } else {
        setMessage('Registration successful. Please login.');
        setMode('login');
      }

      setFormData({ email: '', password: '' });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unexpected error';
      setMessage(errorMessage);
    }
  };

  const handleGoogleSuccess = async (idToken: string) => {
    try {
      const data = await googleLogin(idToken);
      if (!data.accessToken) throw new Error('No token from Google');
      setToken(data.accessToken);
      setMessage('Google Login Successful');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Google login failed';
      setMessage(errorMessage);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setToken(null);
      setMessage('Logged out');
    } catch {
      setMessage('Logout failed');
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    setMessage('');
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      {token ? (
        <>
          <FromTestServer token={token} />
          <h2>Welcome!</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
          <form onSubmit={handleSubmit} noValidate>
            <AuthFields formData={formData} onChange={handleChange} />
            <br /><br />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : mode === 'login' ? 'Login' : 'Register'}
            </button>
          </form>
          <br />
          <button onClick={toggleMode}>
            Switch to {mode === 'login' ? 'Register' : 'Login'}
          </button>
          <br /><br />
          <GoogleAuth
            onSuccess={handleGoogleSuccess}
            onError={(msg) => setMessage(msg)}
          />
        </>
      )}
      {!!message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
};

export default AuthForm;
