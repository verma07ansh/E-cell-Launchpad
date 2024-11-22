import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Mail, MapPin, Phone, Instagram, Github } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const socialLinks = [
    { icon: Mail, href: 'mailto:example@email.com', label: 'Email' },// Enter your Email
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },// Enter your Twitter Link
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },// Enter your Linkedin Link
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },// Enter your Instagram Link
    { icon: FaWhatsapp, href: 'https://wa.me/1234567890', label: 'WhatsApp' }// Enter your WhatsApp Link
  ];

  const quickLinks = [
    { path: '/about', label: 'About Us' },
    { path: '/profiles', label: 'Profiles' },
    { path: '/register', label: 'Register' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile and Desktop View */}
        <div className="flex flex-wrap justify-between mb-8">
          {/* Brand Section */}
          <div className="w-1/2 md:w-auto mb-4 md:mb-0">
            <Link to="/" className="text-2xl font-bold glow-text inline-block mb-2">
              Entrepreneur Hub
            </Link>
            <div className="flex items-center text-gray-300 hover:text-white transition-colors text-lg mb-1">
              <MapPin className="w-6 h-6 mr-2" />
              <span>Silicon Valley, CA</span>
            </div>
            <div className="flex items-center text-gray-300 hover:text-white transition-colors text-lg">
              <Phone className="w-6 h-6 mr-2" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-1/2 md:w-auto mb-4 md:mb-0 text-right">
            <h4 className="text-2xl font-bold glow-text mb-2 md:text-center">Quick Links</h4>
            <ul className="space-y-1 text-right md:text-center">
              {quickLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-gray-300 hover:text-white transition-colors inline-block relative text-lg
                    after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full 
                    after:bg-white after:transition-all after:duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links - Desktop */}
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <h4 className="text-2xl font-bold glow-text mb-2 text-center">Connect With Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transform hover:scale-110 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-8 h-8" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} Entrepreneur Hub
          </p>
        </div>
      </div>
    </footer>
  );
}