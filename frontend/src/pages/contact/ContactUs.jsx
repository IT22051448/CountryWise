import React from 'react';
import ContactInfoSection from '@/components/contact/ContactInfoSection';
import ContactForm from '@/components/contact/ContactForm';

const ContactUs = () => {
  return (
    <section className="min-h-screen mt-10 bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="md:flex">
          <ContactInfoSection />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
