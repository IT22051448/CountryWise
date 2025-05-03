jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('@/redux/auth/authSlice', () => ({
  logout: jest.fn(() => ({ type: 'auth/logout' })),
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '@/layout/Header';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/auth/authSlice';

describe('Header', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders Login link when not authenticated', () => {
    useSelector.mockImplementation((selector) =>
      selector({ auth: { token: null, expiry: null } })
    );

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /logout/i })
    ).not.toBeInTheDocument();
  });

  it('renders Logout button when authenticated and dispatches logout', () => {
    const futureExpiry = (Date.now() + 10000).toString();
    useSelector.mockImplementation((selector) =>
      selector({ auth: { token: 'tok', expiry: futureExpiry } })
    );

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutBtn);

    expect(logout).toHaveBeenCalledTimes(1);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('renders all navigation links', () => {
    useSelector.mockImplementation((selector) =>
      selector({ auth: { token: null, expiry: null } })
    );

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    ['Countries', 'Globe View', 'About Us', 'Contact Us'].forEach((text) => {
      expect(
        screen.getByRole('link', { name: new RegExp(text, 'i') })
      ).toBeInTheDocument();
    });
  });
});
