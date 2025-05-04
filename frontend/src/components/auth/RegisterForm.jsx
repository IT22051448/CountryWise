import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser, clearMessage } from '@/redux/auth/authSlice';
import { useToast } from '@/hooks/ToastContext';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { status } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        addToast({ type: 'success', message: 'Registered successfully!' });
        setTimeout(() => {
          dispatch(clearMessage());
          navigate('/login');
        }, 1500);
      })
      .catch(() => {
        addToast({
          type: 'error',
          message: 'Registration failed. Please try again.',
        });
      });
  };

  return (
    <div className="w-full sm:w-1/2 lg:w-3/5 p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-green-700">
        Join CountryWise
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm sm:text-base"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm sm:text-base"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm sm:text-base"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition text-sm sm:text-base"
        >
          {status === 'loading' ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p className="text-center mt-4 text-gray-600 text-sm sm:text-base">
        Already have an account?{' '}
        <span
          onClick={() => navigate('/login')}
          className="text-blue-500 cursor-pointer underline"
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;
