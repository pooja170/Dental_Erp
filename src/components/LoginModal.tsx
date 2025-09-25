import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import AuthForm from './AuthForm';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  const handleAuthSuccess = () => {
    alert("Successfully logged in!");
    router.push("/dashboard");
    onClose();
  };

  const handleAuthError = (message: string) => {
    alert(`Login failed: ${message}`);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center bg-white text-gray-800 py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-6 text-lg font-semibold transform hover:-translate-y-1"
        >
          <img src="/icons8-google.svg" alt="Google" className="w-6 h-6 mr-3" />
          Login with Google
        </button>

        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative bg-white px-4 text-sm text-gray-500">
            OR
          </div>
        </div>

        {/* Email & Password Form */}
        <AuthForm
          isLogin={true}
          toggleForm={() => { /* No-op for now, AuthForm will handle its own state */ }}
          onAuthSuccess={handleAuthSuccess}
          onAuthError={handleAuthError}
        />

        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
          <p className="mt-4 text-sm text-gray-600">
            Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
