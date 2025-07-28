import React from 'react';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  // TODO: Add authentication check later
  return <>{children}</>;
} 