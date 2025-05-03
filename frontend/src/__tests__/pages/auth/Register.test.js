import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@/assets/explore-bg-image2.jpg', () => 'mock-bg2.jpg');
jest.mock('@/components/auth/RegisterWelcome', () => () => (
  <div data-testid="register-welcome" />
));
jest.mock('@/components/auth/RegisterForm', () => () => (
  <div data-testid="register-form" />
));

import Register from '@/pages/auth/Register';

describe('<Register />', () => {
  beforeEach(() => {
    render(<Register />);
  });

  it('renders the register welcome section', () => {
    expect(screen.getByTestId('register-welcome')).toBeInTheDocument();
  });

  it('renders the register form', () => {
    expect(screen.getByTestId('register-form')).toBeInTheDocument();
  });

  it('has the correct background container classes', () => {
    const container = screen.getByTestId('register-container');
    expect(container).toHaveClass('min-h-screen');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('justify-center');
    expect(container).toHaveClass('relative');
  });

  it('renders the background image', () => {
    const bgImage = screen.getByAltText('Background');
    expect(bgImage).toBeInTheDocument();
    expect(bgImage).toHaveClass('absolute');
    expect(bgImage).toHaveClass('inset-0');
    expect(bgImage).toHaveClass('w-full');
    expect(bgImage).toHaveClass('h-full');
    expect(bgImage).toHaveClass('object-cover');
  });
});
