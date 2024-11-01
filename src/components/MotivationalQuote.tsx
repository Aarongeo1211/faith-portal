import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { faithThemes } from '../config/config';
import type { Religion } from '../types';

interface MotivationalQuoteProps {
  religion: Religion;
}

const quotes = {
  christian: [
    "Faith is taking the first step even when you don't see the whole staircase.",
    "Let your light shine before others.",
    "With God all things are possible.",
    "Be strong and courageous, do not be afraid.",
    "Walk by faith, not by sight."
  ],
  hindu: [
    "The soul is neither born, nor does it die.",
    "You have the right to work, but never to the fruit of work.",
    "Peace comes from within. Do not seek it without.",
    "Truth is one, paths are many.",
    "The best way to find yourself is to lose yourself in the service of others."
  ],
  islamic: [
    "Indeed, with hardship comes ease.",
    "Seek knowledge from the cradle to the grave.",
    "The best among you are those who have the best character.",
    "Be in this world as if you were a stranger.",
    "He who has health has hope, and he who has hope has everything."
  ]
};

const backgrounds = {
  christian: "https://images.unsplash.com/photo-1469122312224-c5846569feb1?auto=format&fit=crop&q=80",
  hindu: "https://images.unsplash.com/photo-1545378889-5d416a53f764?auto=format&fit=crop&q=80",
  islamic: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80"
};

export function MotivationalQuote({ religion }: MotivationalQuoteProps) {
  const theme = faithThemes[religion];
  const randomQuote = quotes[religion][Math.floor(Math.random() * quotes[religion].length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative h-32 overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgrounds[religion]})` }}
      />
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${theme.primary} opacity-90`} />
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <Quote className="w-8 h-8 text-white/80 mx-auto mb-3" />
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-medium text-white"
          >
            {randomQuote}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}