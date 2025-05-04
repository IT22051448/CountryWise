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

import LoginForm from '@/components/auth/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

jest.mock('@/hooks/ToastContext', () => ({
  useToast: () => ({ addToast: jest.fn() }),
}));

jest.mock('@/redux/auth/authSlice', () => ({
  __esModule: true,
  loginUser: jest.fn((formData) => {
    const mockPromise = Promise.resolve({
      token: 'mock-token',
      email: formData.email,
      expiry: Date.now() + 3600000,
    });
    return {
      type: 'auth/loginUser/pending',
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
  auth: { message: '', status: 'idle' },
};

beforeEach(() => {
  useNavigate.mockReturnValue(mockNavigate);
  useDispatch.mockReturnValue(mockDispatch);
  useSelector.mockImplementation((sel) => sel(mockStore));

  Storage.prototype.setItem = jest.fn();
  Storage.prototype.getItem = jest.fn();
  Storage.prototype.removeItem = jest.fn();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('LoginForm', () => {
  it('renders email, password and submit button', () => {
    const store = configureStore({ reducer: () => mockStore });
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('dispatches loginUser and navigates on success', async () => {
    const store = configureStore({ reducer: () => mockStore });
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { name: 'email', value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { name: 'password', value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => expect(mockDispatch).toHaveBeenCalled());

    jest.runAllTimers();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('shows loading text when status is loading', () => {
    useSelector.mockImplementation((sel) =>
      sel({ auth: { ...mockStore.auth, status: 'loading' } })
    );
    const store = configureStore({ reducer: (s) => s });
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    expect(screen.getByRole('button')).toHaveTextContent('Logging in...');
  });
});
