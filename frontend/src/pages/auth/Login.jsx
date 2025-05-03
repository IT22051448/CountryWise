import React from 'react';
import bgImage from '@/assets/explore-bg-image.jpg';
import AuthWelcome from '@/components/auth/LoginWelcome';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <img
        src={bgImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 bg-white/95 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-4xl w-full">
        <AuthWelcome />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
