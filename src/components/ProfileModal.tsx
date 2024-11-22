import React, { useEffect, useRef } from 'react';
import { X, Linkedin, Instagram } from 'lucide-react';

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

interface ProfileModalProps {
  profile: Profile;
  onClose: () => void;
}

export default function ProfileModal({ profile, onClose }: ProfileModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div 
        ref={modalRef}
        className="bg-gradient-to-br from-gray-900 to-black rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800"
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-64 object-cover rounded-t-xl"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white glow-text">{profile.name}</h2>
          <p className="text-gray-400 mt-1">{profile.role}</p>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-2">Story</h3>
            <p className="text-gray-400 leading-relaxed">{profile.story}</p>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Email:</span>
              <a href={`mailto:${profile.email}`} className="text-gray-300 hover:text-white">
                {profile.email}
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href={profile.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn Profile</span>
              </a>
              {profile.instagram && (
                <a 
                  href={profile.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}