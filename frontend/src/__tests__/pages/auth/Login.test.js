import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@/assets/explore-bg-image.jpg', () => 'mock-bg.jpg');

jest.mock('@/components/auth/LoginWelcome', () => () => (
  <div data-testid="auth-welcome" />
));
jest.mock('@/components/auth/LoginForm', () => () => (
  <div data-testid="login-form" />
));

import Login from '@/pages/auth/Login';

describe('<Login/>', () => {
  beforeEach(() => {
    render(<Login />);
  });

  it('renders the welcome panel', () => {
    expect(screen.getByTestId('auth-welcome')).toBeInTheDocument();
  });

  it('renders the login form', () => {
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });

  it('renders the background image', () => {
    const bg = screen.getByAltText('Background');
    expect(bg).toBeInTheDocument();
    expect(bg).toHaveAttribute('src', 'mock-bg.jpg');
  });
});
