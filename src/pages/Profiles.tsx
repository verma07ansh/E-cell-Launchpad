import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import ProfileModal from '../components/ProfileModal';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

const profiles = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Tech Entrepreneur',
    image: image1,
    story: 'After graduating from Stanford, Sarah founded TechBridge, an AI-powered education platform that has revolutionized remote learning in underserved communities. Her passion for combining technology with social impact has earned her numerous accolades.',
    email: 'example@email.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com'
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'Sustainable Energy Pioneer',
    image: image2,
    story: 'Marcus turned his college project into GreenPower, a startup that develops innovative solar storage solutions. His company has helped hundreds of homes achieve energy independence while reducing their carbon footprint.',
    email: 'example@email.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com'
  },
  {
    id: 3,
    name: 'Aisha Patel',
    role: 'FinTech Innovator',
    image: image3,
    story: 'With a background in finance and computer science, Aisha created MoneyWise, a financial literacy platform that makes investing accessible to young adults. Her platform now serves over 100,000 users globally.',
    email: 'example@email.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com'
  }
];

export default function Profiles() {
  const [selectedProfile, setSelectedProfile] = useState<typeof profiles[0] | null>(null);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-black min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 glow-text">
          Featured Entrepreneurs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onClick={setSelectedProfile}
            />
          ))}
        </div>
      </div>

      {selectedProfile && (
        <ProfileModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </section>
  );
}