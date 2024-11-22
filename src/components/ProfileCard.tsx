import React from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';

interface Profile {
  id: number;
  name: string;
  role: string;
  image: string;
  story: string;
  email: string;
  linkedin: string;
  instagram?: string;
}

interface ProfileCardProps {
  profile: Profile;
  onClick: (profile: Profile) => void;
}

export default function ProfileCard({ profile, onClick }: ProfileCardProps) {
  return (
    <div 
      onClick={() => onClick(profile)}
      className="profile-card-glow bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden 
      transform transition-all duration-500 hover:scale-105 cursor-pointer border border-gray-800
      hover:border-gray-700"
    >
      <div className="aspect-w-16 aspect-h-9 relative h-48">
        <img
          src={profile.image}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <p className="text-white text-sm font-medium">Click to view story</p>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white glow-text">{profile.name}</h3>
        <p className="text-gray-400 mt-1">{profile.role}</p>
        <div className="mt-4 flex items-center space-x-4">
          <Mail className="w-4 h-4 text-gray-500" />
          <Linkedin className="w-4 h-4 text-gray-500" />
          <Instagram className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
}