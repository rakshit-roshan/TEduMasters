import React from 'react';

export default function Profile() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ padding: 32, background: 'white', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', minWidth: 320 }}>
        <h2 style={{ marginBottom: 16 }}>User Profile</h2>
        <p>This is a placeholder for the user profile page.</p>
      </div>
    </div>
  );
} 