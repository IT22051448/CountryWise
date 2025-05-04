import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import RegisterForm from '@/components/auth/RegisterForm';
import { registerUser, clearMessage } from '@/redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

jest.mock('@/hooks/ToastContext', () => ({
  useToast: () => ({ addToast: jest.fn() }),
}));

jest.mock('@/redux/auth/authSlice', () => ({
  __esModule: true,
  registerUser: jest.fn((formData) => {
    const mockPromise = Promise.resolve({ email: formData.email });
    return {
      type: 'auth/registerUser/pending',
      payload: formData,
      unwrap: jest.fn(() => mockPromise),
    };
  }),
  clearMessage: jest.fn(() => ({ type: 'auth/clearMessage' })),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockDispatch = jest.fn((action) =>
  typeof action === 'function' ? action(mockDispatch, () => mockStore) : action
);
const mockStore = {
  auth: {
    message: '',
    status: 'idle',
  },
};

beforeEach(() => {
  useNavigate.mockReturnValue(mockNavigate);
  useDispatch.mockReturnValue(mockDispatch);
  useSelector.mockImplementation((sel) => sel(mockStore));

  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('RegisterForm', () => {
  it('renders username, email, password fields and submit button', () => {
    const store = configureStore({ reducer: () => mockStore });
    render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Register/i })
    ).toBeInTheDocument();
  });

  it('dispatches registerUser and navigates on success', async () => {
    const store = configureStore({ reducer: () => mockStore });
    render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { name: 'username', value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { name: 'email', value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { name: 'password', value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });

    jest.runAllTimers();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('shows loading text when status is loading', () => {
    useSelector.mockImplementation((sel) =>
      sel({ auth: { ...mockStore.auth, status: 'loading' } })
    );

    const store = configureStore({ reducer: (s) => s });
    render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>
    );

    expect(screen.getByRole('button')).toHaveTextContent('Registering...');
  });
});
