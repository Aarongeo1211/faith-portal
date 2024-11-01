import React from 'react';
import { FaithPage } from './FaithPage';

const hinduData = {
  religion: 'hindu' as const,
  title: 'Hindu Temple & Cultural Center',
  backgroundImage: 'https://images.unsplash.com/photo-1542397284385-6010376c5337?auto=format&fit=crop&q=80',
  description: "Experience the rich traditions of Hinduism through worship, meditation, and cultural celebration. Our temple is a sanctuary for spiritual growth, cultural preservation, and community unity.",
  images: [
    'https://images.unsplash.com/photo-1573390609456-919e3ed0da7e?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555394692-f34f6ad3d54a?auto=format&fit=crop&q=80'
  ],
  schedule: [
    'Morning Aarti: 7:00 AM',
    'Midday Aarti: 12:00 PM',
    'Evening Aarti: 7:00 PM',
    'Bhajan Session: Saturday 6:00 PM',
    'Meditation: Daily 6:30 AM',
    'Yoga Class: Mon-Fri 8:00 AM',
    'Sanskrit Class: Sunday 11:00 AM'
  ],
  location: {
    address: '456 Temple Road, Cityville, ST 12345',
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  events: [
    {
      title: 'Ram Navami Celebration',
      date: 'April 17, 2024',
      time: '10:00 AM'
    },
    {
      title: 'Hanuman Jayanti',
      date: 'April 23, 2024',
      time: '8:00 AM'
    },
    {
      title: 'Yoga Workshop',
      date: 'March 20, 2024',
      time: '9:00 AM'
    },
    {
      title: 'Cultural Dance Program',
      date: 'March 30, 2024',
      time: '5:00 PM'
    }
  ],
  contact: {
    phone: '(555) 234-5678',
    email: 'info@hindutemple.org'
  },
  classes: [
    'Vedic Studies',
    'Classical Dance',
    'Music (Carnatic/Hindustani)',
    'Sanskrit Language',
    'Yoga & Meditation',
    'Childrens Cultural Classes'
  ],
  services: [
    'Puja Services',
    'Wedding Ceremonies',
    'Naming Ceremonies',
    'Grihapravesh',
    'Spiritual Counseling',
    'Youth Programs'
  ]
};

export default function HinduPage() {
  return <FaithPage {...hinduData} />;
}