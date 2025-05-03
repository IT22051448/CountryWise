import React from 'react';
import bgImage from '@/assets/explore-bg-image2.jpg';
import RegisterWelcome from '@/components/auth/RegisterWelcome';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
  return (
    <div
      data-testid="register-container"
      className="min-h-screen flex items-center justify-center relative"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <img
        src={bgImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 bg-white/95 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-4xl w-full">
        <RegisterWelcome />
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
