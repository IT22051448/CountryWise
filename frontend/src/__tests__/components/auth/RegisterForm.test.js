import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '@/components/auth/RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

jest.mock('@/redux/auth/authSlice', () => ({
  __esModule: true,
  registerUser: jest.fn((formData) => {
    const mockPromise = Promise.resolve({
      email: formData.email,
    });

    return {
      type: 'auth/registerUser/pending',
      payload: formData,
      unwrap: jest.fn(() => mockPromise),
    };
  }),
  clearMessage: jest.fn(() => ({
    type: 'auth/clearMessage',
  })),
  default: jest.fn(),
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
const mockDispatch = jest.fn((action) => {
  if (typeof action === 'function') {
    return action(mockDispatch, () => mockStore);
  }
  return action;
});

const mockStore = {
  auth: {
    message: '',
    status: 'idle',
  },
};

beforeEach(() => {
  useNavigate.mockReturnValue(mockNavigate);
  useDispatch.mockReturnValue(mockDispatch);
  useSelector.mockImplementation((selector) => selector(mockStore));

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

describe('RegisterForm', () => {
  it('should render the register form correctly', () => {
    const store = configureStore({
      reducer: (state = mockStore) => state,
    });

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

  it('should handle form submission and navigation', async () => {
    const store = configureStore({
      reducer: (state = mockStore) => state,
    });

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

  it('should show loading state during submission', async () => {
    useSelector.mockImplementation((selector) =>
      selector({
        auth: { ...mockStore.auth, status: 'loading' },
      })
    );

    render(
      <Provider store={configureStore({ reducer: (state) => state })}>
        <RegisterForm />
      </Provider>
    );

    expect(screen.getByRole('button')).toHaveTextContent('Registering...');
  });

  it('should display error message when registration fails', async () => {
    useSelector.mockImplementation((selector) =>
      selector({
        auth: {
          ...mockStore.auth,
          message: 'Registration failed',
          status: 'failed',
        },
      })
    );

    render(
      <Provider store={configureStore({ reducer: (state) => state })}>
        <RegisterForm />
      </Provider>
    );

    expect(screen.getByText('Registration failed')).toBeInTheDocument();
  });
});
