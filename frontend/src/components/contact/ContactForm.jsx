import React, { useEffect, useState } from 'react';
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const ContactForm = () => {
  const [formData, setFormData] = useState(initialForm);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
    }
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted: ', formData);
      setSuccess(true);
      setFormData((prev) => ({
        ...initialForm,
        email: localStorage.getItem('email') || '',
      }));
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="w-full md:w-3/5 p-8 sm:p-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Send Us a Message
      </h2>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-start">
          <FaCheckCircle className="text-green-500 mt-1 mr-3" size={20} />
          <div>
            <h3 className="font-semibold">Message Sent!</h3>
            <p className="text-sm mt-1">
              Thank you for reaching out! Our team will look into this as soon
              as possible.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { id: 'name', label: 'Full Name', type: 'text', icon: '👤' },
          { id: 'phone', label: 'Phone Number', type: 'tel', icon: '📱' },
          { id: 'subject', label: 'Subject', type: 'text', icon: '📌' },
        ].map(({ id, label, type, icon }) => (
          <div key={id} className="relative">
            <label
              htmlFor={id}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {label}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">{icon}</span>
              </div>
              <input
                id={id}
                name={id}
                type={type}
                value={formData[id]}
                onChange={handleChange}
                required
                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              />
            </div>
          </div>
        ))}

        {/* Email - read-only */}
        <div className="relative">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">✉️</span>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              readOnly
              className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="block w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            placeholder="Tell us about your inquiry..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all ${
            isSubmitting
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 shadow-md hover:shadow-lg text-white'
          }`}
        >
          {isSubmitting ? (
            'Sending...'
          ) : (
            <>
              <FaPaperPlane />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
