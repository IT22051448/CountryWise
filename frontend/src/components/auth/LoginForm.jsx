import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, clearMessage } from '@/redux/auth/authSlice';
import { useToast } from '@/hooks/ToastContext';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { status } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: '', password: '' });
  let timeoutId;

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        addToast({ type: 'success', message: 'Logged in successfully!' });
        timeoutId = setTimeout(() => {
          dispatch(clearMessage());
          navigate('/');
        }, 1500);
      })
      .catch(() => {
        addToast({ type: 'error', message: 'Login failed. Please try again.' });
      });
  };

  return (
    <div className="w-full sm:w-1/2 lg:w-3/5 p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-700">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300 text-sm sm:text-base"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300 text-sm sm:text-base"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full py-3 sm:py-4 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition text-sm sm:text-base"
        >
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="text-center mt-4 text-gray-600 text-sm sm:text-base">
        Don't have an account?{' '}
        <span
          onClick={() => navigate('/register')}
          className="text-blue-500 cursor-pointer underline"
        >
          Signup
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
