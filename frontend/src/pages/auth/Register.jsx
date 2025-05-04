import React from 'react';
import bgImage from '@/assets/explore-bg-image2.jpg';
import RegisterWelcome from '@/components/auth/RegisterWelcome';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
  return (
    <div
      data-testid="register-container"
      className="min-h-screen flex items-center justify-center relative bg-gray-50"
    >
      {/* full-screen backdrop */}
      <img
        src={bgImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* card */}
      <div className="relative z-10 w-full max-w-4xl bg-white bg-opacity-95 rounded-lg shadow-2xl overflow-hidden flex flex-col sm:flex-row">
        <RegisterWelcome />
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
