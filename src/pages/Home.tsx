import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, BookOpen, UserPlus, ArrowRight } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach((el) => {
          const speed = el.getAttribute('data-speed') || '0.5';
          const yPos = scrollY * parseFloat(speed);
          (el as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen">
      {/* Hero Section - Reduced height */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5"
            style={{ willChange: 'transform' }}
            data-speed="0.2"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-black" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              Transform Your Vision Into
            </span>
            <span className="block mt-2 text-white">
              a Thriving Business
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white mb-8 leading-relaxed">
            Join our community of innovators, access world-class resources, and get the support you need to build the next big thing.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="btn group"
            >
              <span className="relative z-10">Start Your Journey</span>
              <ArrowRight className="relative z-10 ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/about')}
              className="btn group"
            >
              <span className="relative z-10">About Us</span>
              <Users className="relative z-10 ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/profiles')}
              className="btn group"
            >
              <span className="relative z-10">View Success Stories</span>
              <BookOpen className="relative z-10 ml-2 w-4 h-4 group-hover:scale-110 group-hover:text-white transition-all duration-300" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-gray-900/90" />
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-bold text-center mb-16 glow-text">
            Why Choose EntrepreneurHub?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="feature-card group"
              >
                <feature.icon className="w-8 h-8 mb-4 text-white group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: Users,
    title: 'Expert Mentorship',
    description: 'Connect with industry veterans who provide personalized guidance to help you navigate challenges and accelerate growth.'
  },
  {
    icon: BookOpen,
    title: 'Resource Library',
    description: 'Access our comprehensive collection of tools, templates, and educational content designed for entrepreneurs.'
  },
  {
    icon: UserPlus,
    title: 'Community Network',
    description: 'Join a vibrant community of fellow entrepreneurs, share experiences, and build valuable connections.'
  }
];