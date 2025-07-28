import React from 'react';

interface LoaderProps {
  message?: string;
}

export default function Loader({ message = 'Loading, please wait...' }: LoaderProps) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        background: 'white',
        padding: 32,
        borderRadius: 12,
        boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          width: 48,
          height: 48,
          border: '6px solid #e0e0e0',
          borderTop: '6px solid #6366f1',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: 16
        }} />
        <div style={{ fontSize: 18, color: '#333', textAlign: 'center' }}>{message}</div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
} 