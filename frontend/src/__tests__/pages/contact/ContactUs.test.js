import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@/components/contact/ContactInfoSection', () => () => (
  <div data-testid="contact-info-section" />
));
jest.mock('@/components/contact/ContactForm', () => () => (
  <div data-testid="contact-form" />
));

import ContactUs from '@/pages/contact/ContactUs';

describe('<ContactUs />', () => {
  beforeEach(() => {
    render(<ContactUs />);
  });

  it('renders the ContactInfoSection component', () => {
    expect(screen.getByTestId('contact-info-section')).toBeInTheDocument();
  });

  it('renders the ContactForm component', () => {
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
  });
});
