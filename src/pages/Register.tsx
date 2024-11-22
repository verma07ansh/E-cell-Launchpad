import React from 'react';
import RegistrationForm from '../components/RegistrationForm';

export default function Register() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-black min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 glow-text">
          Join Our Community
        </h2>
        <RegistrationForm />
      </div>
    </section>
  );
}