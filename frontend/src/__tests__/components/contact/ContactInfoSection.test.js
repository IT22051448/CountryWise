import { render, screen, cleanup } from '@testing-library/react';
import ContactInfoSection from '@/components/contact/ContactInfoSection';
import React from 'react';

afterEach(() => {
  cleanup();
});

describe('ContactInfoSection', () => {
  it('should render the ContactInfoSection component correctly', () => {
    render(<ContactInfoSection />);

    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Have questions about countries or need travel advice? Our team is here to help you with any inquiries.'
      )
    ).toBeInTheDocument();

    expect(screen.getByText('Our Location')).toBeInTheDocument();
    expect(screen.getByText('Call Us')).toBeInTheDocument();
    expect(screen.getByText('Email Us')).toBeInTheDocument();
    expect(screen.getByText('Social Media')).toBeInTheDocument();

    expect(
      screen.getByText('123 Explorer Lane, Colombo 05, Sri Lanka')
    ).toBeInTheDocument();
    expect(screen.getByText('+94 77 123 1234')).toBeInTheDocument();
    expect(screen.getByText('info@countrywise.com')).toBeInTheDocument();
    expect(screen.getByText('facebook.com/CountryWise')).toBeInTheDocument();
    expect(
      screen.getByText('instagram.com/CountryWiseExplorer')
    ).toBeInTheDocument();
  });

  it('should have correct text and class for location, phone, email, and social media', () => {
    render(<ContactInfoSection />);

    const locationText = screen.getByText(
      '123 Explorer Lane, Colombo 05, Sri Lanka'
    );
    expect(locationText).toBeInTheDocument();
    expect(locationText).toHaveClass('text-blue-100');

    const phoneNumbers = screen.getByText('+94 77 123 1234');
    expect(phoneNumbers).toBeInTheDocument();
    expect(phoneNumbers).toHaveClass('text-blue-100');

    const emailAddresses = screen.getByText('info@countrywise.com');
    expect(emailAddresses).toBeInTheDocument();
    expect(emailAddresses).toHaveClass('text-blue-100');

    const socialMediaLinks = screen.getByText('facebook.com/CountryWise');
    expect(socialMediaLinks).toBeInTheDocument();
    expect(socialMediaLinks).toHaveClass('text-blue-100');
  });
});
