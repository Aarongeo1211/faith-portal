import React from 'react';
import { FaithPage } from './FaithPage';

const islamicData = {
  religion: 'islamic' as const,
  title: 'Islamic Center',
  backgroundImage: 'https://images.unsplash.com/photo-1542324216541-c84c8ba6db04?auto=format&fit=crop&q=80',
  description: "A sanctuary of peace and learning where Muslims gather to worship, learn, and strengthen their connection with Allah. Our center promotes understanding, unity, and spiritual growth in the community.",
  images: [
    'https://images.unsplash.com/photo-1564769625392-651b04498841?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570841398833-43e352b440ca?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80'
  ],
  schedule: [
    'Fajr: 5:30 AM',
    'Dhuhr: 1:30 PM',
    'Asr: 4:45 PM',
    'Maghrib: At Sunset',
    'Isha: 9:00 PM',
    'Jummah: Friday 1:30 PM',
    'Quran Study: Saturday 10:00 AM'
  ],
  location: {
    address: '789 Peace Avenue, Cityville, ST 12345',
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  events: [
    {
      title: 'Ramadan Iftar Gathering',
      date: 'March 11, 2024',
      time: 'Sunset'
    },
    {
      title: 'Eid Prayer',
      date: 'April 10, 2024',
      time: '8:00 AM'
    },
    {
      title: 'Islamic Studies Class',
      date: 'March 16, 2024',
      time: '11:00 AM'
    },
    {
      title: 'Community Dinner',
      date: 'March 23, 2024',
      time: '7:00 PM'
    }
  ],
  contact: {
    phone: '(555) 345-6789',
    email: 'info@islamiccenter.org'
  },
  programs: [
    'Quran Memorization',
    'Arabic Language',
    'Islamic Studies',
    'Youth Development',
    'Sisters Circle',
    'New Muslims Support'
  ],
  services: [
    'Daily Prayers',
    'Friday Sermon',
    'Marriage Services',
    'Funeral Services',
    'Zakat Distribution',
    'Counseling Services'
  ]
};

export default function IslamicPage() {
  return <FaithPage {...islamicData} />;
}