import React, { useState } from 'react';
import Loader from './Loader';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      // TODO: Replace with real API call
      // Example:
      // const response = await fetch('/api/login', { ... });
      // const data = await response.json();
      // Simulate network delay (remove this in real code)
      // await new Promise(res => setTimeout(res, 1500));
      setLoading(false);
      alert(`Login submitted!\nEmail: ${email}\nPassword: ${password}`);
    } catch (err) {
      setLoading(false);
      setError('Login failed!');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {loading && <Loader message="Logging in..." />}
      <form onSubmit={handleSubmit} style={{ padding: 32, background: 'white', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', minWidth: 320 }}>
        <h2 style={{ marginBottom: 16 }}>Login</h2>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 4 }}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: 4 }}>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            required
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: 10, background: '#6366f1', color: 'white', border: 'none', borderRadius: 4, fontWeight: 'bold' }}>
          Login
        </button>
      </form>
    </div>
  );
} 