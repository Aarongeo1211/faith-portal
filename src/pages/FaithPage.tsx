import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ScrollText, MapPin, Calendar, Users, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { InfoPanel } from '../components/InfoPanel';
import { AIChatButton } from '../components/AIChatButton';
import { MotivationalQuote } from '../components/MotivationalQuote';
import { faithThemes } from '../config/config';

interface FaithPageProps {
  religion: 'christian' | 'hindu' | 'islamic';
  title: string;
  backgroundImage: string;
  description: string;
  images: string[];
  schedule: string[];
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  events: Array<{
    title: string;
    date: string;
    time: string;
  }>;
  contact: {
    phone: string;
    email: string;
  };
  ministries?: string[];
  smallGroups?: string[];
  classes?: string[];
  services?: string[];
  programs?: string[];
}

export function FaithPage({
  religion,
  title,
  backgroundImage,
  description,
  images,
  schedule,
  location,
  events,
  contact,
  ministries,
  smallGroups,
  classes,
  services,
  programs
}: FaithPageProps) {
  const navigate = useNavigate();
  const theme = faithThemes[religion];

  const renderPrograms = () => {
    const items = ministries || smallGroups || classes || services || programs;
    const title = ministries ? 'Ministries' :
                 classes ? 'Classes' :
                 services ? 'Services' :
                 programs ? 'Programs' : 'Groups';

    if (!items) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <div className={`bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-${theme.border}`}>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <BookOpen className={theme.text} />
            {title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`p-4 rounded-lg ${theme.hover} border border-${theme.border} backdrop-blur-sm`}
              >
                <p className="text-gray-300">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={`min-h-screen ${theme.secondary} text-gray-100`}>
      {/* Motivational Quote */}
      <MotivationalQuote religion={religion} />

      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.primary} opacity-75`} />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-90" />
        
        <nav className="relative z-10 flex items-center justify-between p-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white"
          >
            {title}
          </motion.h1>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-6 py-3 text-white bg-white/20 hover:bg-white/30 rounded-full transition-all shadow-lg backdrop-blur-sm"
          >
            <Home className="inline-block mr-2" size={20} />
            Home
          </motion.button>
        </nav>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-white leading-relaxed"
          >
            {description}
          </motion.p>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-20 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-${theme.border}`}
          >
            <ScrollText className={theme.text + " w-8 h-8 mb-4"} />
            <h3 className="text-lg font-semibold mb-2 text-white">Next Service</h3>
            <p className="text-gray-300">{schedule[0]}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-${theme.border}`}
          >
            <MapPin className={theme.text + " w-8 h-8 mb-4"} />
            <h3 className="text-lg font-semibold mb-2 text-white">Location</h3>
            <p className="text-gray-300">{location.address}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-${theme.border}`}
          >
            <Calendar className={theme.text + " w-8 h-8 mb-4"} />
            <h3 className="text-lg font-semibold mb-2 text-white">Next Event</h3>
            <p className="text-gray-300">{events[0].title}</p>
            <p className="text-sm text-gray-400 mt-1">{events[0].date}</p>
          </motion.div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold mb-8 text-center text-white"
        >
          Our Community
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${theme.primary} opacity-0 group-hover:opacity-75 transition-opacity duration-300`} />
              <img
                src={image}
                alt={`${religion} community ${index + 1}`}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="px-6 py-2 bg-white/90 rounded-full text-gray-900 font-medium"
                >
                  View Image
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Programs/Services Section */}
      {renderPrograms()}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-${theme.border}`}
        >
          <InfoPanel
            religion={religion}
            schedule={schedule}
            location={location}
            events={events}
            contact={contact}
          />
        </motion.div>
      </div>

      {/* AI Chat Button */}
      <AIChatButton religion={religion} />
    </div>
  );
}