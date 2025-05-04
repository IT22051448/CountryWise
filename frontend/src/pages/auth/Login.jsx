import React from 'react';
import bgImage from '@/assets/explore-bg-image.jpg';
import AuthWelcome from '@/components/auth/LoginWelcome';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gray-50">
      {/* full‐screen backdrop image */}
      <img
        src={bgImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* card */}
      <div className="relative z-10 w-full max-w-4xl bg-white bg-opacity-95 rounded-lg shadow-2xl overflow-hidden flex flex-col sm:flex-row">
        <AuthWelcome />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
