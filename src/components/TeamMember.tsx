import React, { useState } from 'react';
import { Github, Linkedin, Mail, ChevronDown, ChevronUp } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  expertise: string[];
  github?: string;
  linkedin?: string;
  email?: string;
}

export default function TeamMember({
  name,
  role,
  image,
  bio,
  expertise,
  github,
  linkedin,
  email
}: TeamMemberProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden border border-gray-800">
      {/* Image and Hover Content for Larger Screens */}
      <div className="relative overflow-hidden aspect-[3/2]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white text-sm leading-relaxed line-clamp-3">{bio}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {expertise.map((skill) => (
                <span 
                  key={skill}
                  className="text-sm px-2 py-0.5 rounded-full bg-white/10 text-white backdrop-blur-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="text-center mb-2">
          <h4 className="text-lg font-semibold text-white">{name}</h4>
          <p className="text-gray-400 text-sm mt-0.5">{role}</p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={`${name}'s Github`}
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={`${name}'s LinkedIn`}
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={`Email ${name}`}
            >
              <Mail className="w-5 h-5" />
            </a>
          )}
        </div>

        {/* Mobile Expandable Content */}
        <div className="sm:hidden mt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center space-x-1 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {isExpanded && (
            <div className="mt-3 space-y-3 border-t border-gray-800 pt-3">
              <div>
                <h5 className="text-sm font-medium text-white mb-1">Bio</h5>
                <p className="text-sm text-gray-400 leading-relaxed">{bio}</p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-1">Expertise</h5>
                <div className="flex flex-wrap gap-1.5">
                  {expertise.map((skill) => (
                    <span 
                      key={skill}
                      className="text-sm px-2 py-0.5 rounded-full bg-white/10 text-white backdrop-blur-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}