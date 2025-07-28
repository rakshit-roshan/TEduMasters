import React from 'react';

export default function Logout() {
  const handleLogout = () => {
    // TODO: Add logout logic later
    alert('Logged out! (placeholder)');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={handleLogout} style={{ padding: 16, background: '#6366f1', color: 'white', border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: 18 }}>
        Logout
      </button>
    </div>
  );
} 