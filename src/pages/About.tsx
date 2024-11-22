import React from 'react';
import { Code, Network, Target, Users, Calendar, Globe, Award } from 'lucide-react';
import TeamMember from '../components/TeamMember';
import image1 from '../assets/Teamimage1.jpg';
import image2 from '../assets/Teamimage2.jpg';
import image3 from '../assets/Teamimage3.jpg';
import image4 from '../assets/Teamimage4.jpg';
import image5 from '../assets/Teamimage5.jpg';

export default function About() {
  const megaEvents = [
    {
      date: "October 15-17, 2023",
      title: "Global Tech Summit 2023",
      description: "3-day conference featuring 50+ industry leaders, 1000+ attendees, and groundbreaking startup launches.",
      stats: "1000+ Attendees • 50 Speakers • 20 Countries"
    },
    {
      date: "July 8-9, 2023",
      title: "Startup Pitch Competition",
      description: "International pitch competition with $500K in prizes, connecting startups with leading VCs.",
      stats: "200 Startups • $500K Prize Pool • 30 VCs"
    },
    {
      date: "March 25, 2023",
      title: "Innovation Hackathon",
      description: "48-hour hackathon focused on AI and sustainability solutions, with participants from top universities.",
      stats: "500 Developers • 48 Hours • 75 Projects"
    },
    {
      date: "January 5-6, 2023",
      title: "Mentor Connect Summit",
      description: "Exclusive mentorship program launch event connecting industry veterans with emerging entrepreneurs.",
      stats: "100 Mentors • 300 Startups • 50 Success Stories"
    }
  ];

  const values = [
    {
      icon: Code,
      title: "Technical Innovation",
      description: "We leverage cutting-edge technologies to build scalable, future-proof solutions that drive business growth."
    },
    {
      icon: Network,
      title: "Global Network",
      description: "Connect with a worldwide community of entrepreneurs, mentors, and investors who share your passion."
    },
    {
      icon: Target,
      title: "Focused Execution",
      description: "We believe in turning ideas into action through structured guidance and measurable outcomes."
    }
  ];

  const technicalTeam = [
    {
      name: "Alex Chen",
      role: "Lead Frontend Engineer",
      image: image1,
      bio: "Architected the frontend using React and TypeScript, implementing responsive design patterns and optimizing performance.",
      expertise: ["React", "TypeScript", "Performance Optimization"],
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "example@email.com"
    },
    {
      name: "Maya Patel",
      role: "UI/UX Engineer",
      image: image2,
      bio: "Designed and implemented the user interface with Tailwind CSS, creating smooth animations and intuitive interactions.",
      expertise: ["Tailwind CSS", "Animation", "UI Design"],
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "example@email.com"
    },
    {
      name: "James Wilson",
      role: "Backend Engineer",
      image: image3,
      bio: "Built the API infrastructure and authentication system, ensuring secure and scalable data management.",
      expertise: ["Node.js", "API Design", "Security"],
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "example@email.com"
    },
    {
      name: "Sofia Rodriguez",
      role: "DevOps Engineer",
      image: image4,
      bio: "Implemented CI/CD pipelines and containerization, maintaining high availability and deployment efficiency.",
      expertise: ["Docker", "CI/CD", "AWS"],
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "example@email.com"
    },
    {
      name: "Marcus Kim",
      role: "Full Stack Engineer",
      image: image5,
      bio: "Developed key features including the mentorship matching system and real-time notifications.",
      expertise: ["React", "Node.js", "WebSocket"],
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "example@email.com"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-10 sm:py-14 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-black" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%)',
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 glow-text">
              Empowering Tomorrow's
              <span className="block mt-1">Tech Leaders</span>
            </h2>
            <p className="text-base sm:text-lg text-white leading-relaxed">
              We're more than just a platform – we're a catalyst for innovation and growth. Our mission is to transform visionary ideas into successful enterprises through cutting-edge technology and expert guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Mega Events Section */}
      <section className="py-10 sm:py-14 bg-black/30 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 glow-text">Mega Events</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {megaEvents.map(({ date, title, description, stats }) => (
              <div key={title} className="relative group">
                <div className="feature-card h-full">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-4 h-4 text-white mr-2" />
                    <div className="text-white font-semibold text-xs sm:text-sm">{date}</div>
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2">{title}</h4>
                  <p className="text-gray-200 text-xs sm:text-sm mb-2">{description}</p>
                  <div className="text-xs text-gray-300 bg-white/5 rounded-lg px-2 py-1 backdrop-blur-sm">
                    {stats}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-10 sm:py-14 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 glow-text">Our Core Values</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="feature-card group">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Icon className="w-5 h-5 mb-2 text-white group-hover:scale-110 transition-transform relative z-10" />
                <h4 className="text-base sm:text-lg font-semibold mb-1.5 text-white relative z-10">{title}</h4>
                <p className="text-gray-200 text-xs sm:text-sm relative z-10">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Team Section */}
      <section className="py-10 sm:py-14 bg-black/30 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 glow-text">Technical Executive Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {technicalTeam.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}