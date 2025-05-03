import React from 'react';
import {
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const ContactInfoSection = () => {
  return (
    <div className="w-full md:w-2/5 bg-gradient-to-br from-blue-600 to-green-600 p-8 sm:p-10 text-white">
      <div className="max-w-xs mx-auto">
        <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
        <p className="mb-8 text-blue-100">
          Have questions about countries or need travel advice? Our team is here
          to help you with any inquiries.
        </p>

        <div className="space-y-6">
          <div className="flex items-start">
            <div className="bg-white/20 p-2 rounded-full mr-4">
              <FaMapMarkerAlt className="text-white" size={18} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Our Location</h3>
              <p className="mt-1 text-blue-100">
                123 Explorer Lane, Colombo 05, Sri Lanka
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-white/20 p-2 rounded-full mr-4">
              <FaPhone className="text-white" size={18} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Call Us</h3>
              <p className="mt-1 text-blue-100">+94 77 123 1234</p>
              <p className="mt-1 text-blue-100">+94 11 456 1211</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-white/20 p-2 rounded-full mr-4">
              <FaEnvelope className="text-white" size={18} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Email Us</h3>
              <p className="mt-1 text-blue-100">info@countrywise.com</p>
              <p className="mt-1 text-blue-100">support@countrywise.com</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-white/20 p-2 rounded-full mr-4">
              <FaFacebook className="text-white" size={18} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Social Media</h3>
              <p className="mt-1 text-blue-100">facebook.com/CountryWise</p>
              <p className="mt-1 text-blue-100">
                instagram.com/CountryWiseExplorer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoSection;
