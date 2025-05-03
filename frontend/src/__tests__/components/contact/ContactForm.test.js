import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import ContactForm from '@/components/contact/ContactForm';
import React from 'react';

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe('ContactForm', () => {
  it('should render the ContactForm component correctly', () => {
    render(<ContactForm />);

    expect(screen.getByText('Send Us a Message')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Tell us about your inquiry...')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Send Message/i })
    ).toBeInTheDocument();
  });

  it('should disable the button when submitting', async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Phone Number'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByLabelText('Subject'), {
      target: { value: 'Inquiry' },
    });
    fireEvent.change(
      screen.getByPlaceholderText('Tell us about your inquiry...'),
      {
        target: { value: 'I have a question.' },
      }
    );

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Sending...');
  });

  it('should handle email auto-population from localStorage', () => {
    localStorage.setItem('email', 'test@example.com');

    render(<ContactForm />);

    const emailInput = screen.getByLabelText('Email Address');
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should display the correct icon in the submit button', () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    expect(submitButton.querySelector('svg')).toBeInTheDocument();
  });
});
