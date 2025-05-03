import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, clearMessage } from '@/redux/auth/authSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, status } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: '', password: '' });
  let timeoutId; // Moved timeoutId to component scope

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        timeoutId = setTimeout(() => {
          dispatch(clearMessage());
          navigate('/');
        }, 1500);
      })
      .catch(() => {});
  };

  return (
    <div className="w-full md:w-1/2 p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Welcome Back
      </h2>
      {message && <p className="text-red-500 mb-4 text-center">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-300"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-green-300"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
        >
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="text-center mt-4 text-gray-600">
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
