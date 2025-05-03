import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser, clearMessage } from '@/redux/auth/authSlice';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, status } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          dispatch(clearMessage());
          navigate('/login');
        }, 1500);
      })
      .catch(() => {});
  };

  return (
    <div className="w-full md:w-1/2 p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        Join CountryWise
      </h2>
      {message && <p className="text-red-500 mb-4 text-center">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          {status === 'loading' ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="text-center mt-4 text-gray-600">
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
