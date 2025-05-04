import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../../layout/Layout';

jest.mock('../../layout/Header', () => () => <div>Header Component</div>);
jest.mock('../../layout/Footer', () => () => <div>Footer Component</div>);

describe('Layout', () => {
  it('renders Header and Footer components', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.getByText('Header Component')).toBeInTheDocument();

    expect(screen.getByText('Footer Component')).toBeInTheDocument();
  });

  it('renders Outlet as a placeholder for child routes', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    const outlet = screen.getByText('Footer Component');

    expect(outlet).toBeInTheDocument();
  });
});
