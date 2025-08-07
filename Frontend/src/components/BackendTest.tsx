import React, { useState, useEffect } from 'react';
import { authService } from '../services/api';
import { CheckCircle, XCircle, Loader, Wifi, WifiOff } from 'lucide-react';

export default function BackendTest() {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'error'>('testing');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    testBackendConnection();
  }, []);

  const testBackendConnection = async () => {
    try {
      setConnectionStatus('testing');
      const response = await authService.testConnection();
      
      if (response.error) {
        setConnectionStatus('error');
        setErrorMessage(response.error);
      } else {
        setConnectionStatus('connected');
      }
    } catch (error) {
      setConnectionStatus('error');
      setErrorMessage('Failed to connect to backend server');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Backend Connection Test</h2>
      
      <div className="flex items-center space-x-3 mb-4">
        {connectionStatus === 'testing' && (
          <>
            <Loader className="w-5 h-5 animate-spin text-blue-500" />
            <span className="text-blue-600">Testing connection...</span>
          </>
        )}
        
        {connectionStatus === 'connected' && (
          <>
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-600">Connected to backend</span>
          </>
        )}
        
        {connectionStatus === 'error' && (
          <>
            <XCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-600">Connection failed</span>
          </>
        )}
      </div>

      {connectionStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-red-700 text-sm">{errorMessage}</p>
          <p className="text-red-600 text-xs mt-2">
            Make sure your Spring Boot backend is running on http://localhost:8080
          </p>
        </div>
      )}

      <button
        onClick={testBackendConnection}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Test Connection Again
      </button>

      <div className="mt-4 text-xs text-gray-500">
        <p>Backend URL: http://localhost:8080</p>
        <p>API Base: http://localhost:8080/api</p>
      </div>
    </div>
  );
} 